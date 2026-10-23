import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { canServePhoto, driveFetch, driveConfigured } from '@/lib/drive';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const imageCache = { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800', 'X-Content-Type-Options': 'nosniff' };

/** All media passes through the server; never expose service account keys.
 * Enforce image IDs belong to an existing project inside the approved Drive root.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!driveConfigured) return new NextResponse('Drive is not configured', { status: 404 });
  const { id } = await params;
  const slug = req.nextUrl.searchParams.get('project') || '';
  if (!/^[\w-]{5,200}$/.test(id) || !/^[\w-]{1,200}$/.test(slug)) {
    return new NextResponse('Invalid photo request', { status: 400 });
  }
  try {
    if (!(await canServePhoto(slug, id))) return new NextResponse('Not found', { status: 404 });

    // Google supplies a private short-lived thumbnail for HEIC as well. It is
    // retrieved server-side; a browser cannot load private Drive links directly.
    const metadata = await (await driveFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?fields=id,mimeType,name,size,thumbnailLink&supportsAllDrives=true`)).json();
    const heic = /(?:heic|heif)/i.test(metadata.mimeType || '') || /\.(heic|heif)$/i.test(metadata.name || '');
    let bytes: Buffer | undefined;
    if (!heic && Number(metadata.size || 0) <= 45_000_000) {
      const response = await driveFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media&supportsAllDrives=true`);
      bytes = Buffer.from(await response.arrayBuffer());
    }
    if (bytes) {
      try {
        const webp = await sharp(bytes, { limitInputPixels: 150_000_000 })
          .rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82, effort: 3 }).toBuffer();
        return new NextResponse(new Uint8Array(webp), { status: 200, headers: { ...imageCache, 'Content-Type': 'image/webp' } });
      } catch (error) {
        console.error('Failed to convert original image', id, error);
      }
    }
    // Thumbnail fallback for HEIC, extremely large photos, and unsupported codecs.
    if (metadata.thumbnailLink) {
      const thumbnailURL = new URL(metadata.thumbnailLink);
      // Google Drive thumbnailLink may expose a size suffix; request a larger
      // version when available, while keeping the exact Google-owned hostname.
      thumbnailURL.pathname = thumbnailURL.pathname.replace(/=s\d+(?:-[\w-]+)?$/, '=s1600');
      // Private Google thumbnails require an authenticated server request.
      const host = thumbnailURL.hostname.toLowerCase();
      if (!['googleusercontent.com', 'googleapis.com', 'google.com'].some(d => host === d || host.endsWith(`.${d}`))) {
        throw new Error('Untrusted Google thumbnail host');
      }
      // Google Drive docs specify authenticated access for private thumbnails.
      let remote: Response;
      try { remote = await driveFetch(thumbnailURL.toString()); }
      catch { remote = await fetch(thumbnailURL, { cache: 'no-store' }); }
      if (!remote.ok) throw new Error(`Google thumbnail response ${remote.status}`);
      const content = Buffer.from(await remote.arrayBuffer());
      const webp = await sharp(content, { limitInputPixels: 150_000_000 }).webp({ quality: 83 }).toBuffer();
      return new NextResponse(new Uint8Array(webp), { status: 200, headers: { ...imageCache, 'Content-Type': 'image/webp' } });
    }
    return new NextResponse('No usable preview (try converting HEIC to JPEG in Drive)', { status: 422 });
  } catch (error) {
    console.error('Drive image error', id, error);
    return new NextResponse('Unable to load image', { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}

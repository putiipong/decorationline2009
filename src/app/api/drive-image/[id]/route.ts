import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { canServePhoto, driveFetch, driveConfigured } from '@/lib/drive';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const headers = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
  'X-Content-Type-Options': 'nosniff',
  'Content-Type': 'image/webp',
};
const maxBytes = 45_000_000;

async function convertToWebp(bytes: Buffer) {
  return new Uint8Array(await sharp(bytes, { limitInputPixels: 150_000_000 })
    .rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 3 }).toBuffer());
}

async function fromPrivateThumbnail(thumbnailLink: string): Promise<Uint8Array<ArrayBuffer>> {
  const url = new URL(thumbnailLink);
  const host = url.hostname.toLowerCase();
  if (!['googleusercontent.com', 'googleapis.com', 'google.com']
    .some(domain => host === domain || host.endsWith(`.${domain}`))) {
    throw new Error('Invalid Google thumbnail hostname');
  }
  // When possible, ask Drive for a larger generated thumbnail.
  url.pathname = url.pathname.replace(/=s\d+(?:-[\w-]+)?$/, '=s1600');
  let response: Response;
  try { response = await driveFetch(url.toString()); }
  catch { response = await fetch(url, { cache: 'no-store' }); }
  if (!response.ok) throw new Error(`thumbnail HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) throw new Error('thumbnail too large');
  return convertToWebp(bytes);
}

/** File URLs are authorized against visible projects before Google Drive is read.
 * No public Drive sharing or client-side Google auth is needed. */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!driveConfigured) return new NextResponse('Google Drive is not configured. Check /drive-status', { status: 503 });
  const { id } = await params;
  const slug = req.nextUrl.searchParams.get('project') || '';
  if (!/^[\w-]{5,200}$/.test(id) || !/^[\w-]{1,200}$/.test(slug)) {
    return new NextResponse('Invalid image request', { status: 400 });
  }
  try {
    if (!(await canServePhoto(slug, id))) return new NextResponse('Image not in this project', { status: 404 });
    const metadata = await (await driveFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?fields=id,mimeType,name,size,thumbnailLink&supportsAllDrives=true`)).json();
    const heic = /(?:heic|heif)/i.test(metadata.mimeType || '') || /\.(?:heic|heif)$/i.test(metadata.name || '');
    const size = Number(metadata.size || 0);
    // Some Drive folders contain 135-byte Apple NSKeyedArchiver property-list
    // placeholders mislabeled .heic; these are NOT recoverable photographs.
    if (heic && size > 0 && size < 1024) {
      return new NextResponse('Invalid HEIC source: file is under 1 KB; re-export original photo', {
        status: 422, headers: { 'Cache-Control': 'no-store' },
      });
    }

    // For HEIC, a Google-generated thumbnail avoids costly conversion on every request.
    if (heic && metadata.thumbnailLink) {
      try { return new NextResponse(await fromPrivateThumbnail(metadata.thumbnailLink), { headers }); }
      catch (e) { console.warn('HEIC thumbnail unavailable, trying original:', id, e); }
    }

    if (size <= maxBytes) {
      const media = await driveFetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media&supportsAllDrives=true`);
      // Validate advertised length before buffering. Empty/corrupt files get an explicit error.
      const contentLength = Number(media.headers.get('content-length') || 0);
      if (contentLength > maxBytes) throw new Error('Original image exceeds 45 MB');
      const bytes = Buffer.from(await media.arrayBuffer());
      if (!bytes.length || bytes.length > maxBytes) throw new Error('Original image empty or too large');
      try {
        return new NextResponse(await convertToWebp(bytes), { headers });
      } catch (error) {
        if (heic) {
          // sharp/libvips on some Vercel builds cannot decode HEIF.
          // A pure-JS HEIC decoder is our second path, not a silent missing image.
          try {
            const { default: heicConvert } = await import('heic-convert');
            const jpg = Buffer.from(await heicConvert({ buffer: bytes, format: 'JPEG', quality: 0.85 }));
            return new NextResponse(await convertToWebp(jpg), { headers });
          } catch (heicError) {
            console.error('HEIC decoder failed for', id, heicError);
          }
        }
        console.warn('Original image conversion failed for', id, error);
      }
    }

    // Non-HEIC formats also get a Google thumbnail fallback if original fails.
    if (metadata.thumbnailLink) {
      try { return new NextResponse(await fromPrivateThumbnail(metadata.thumbnailLink), { headers }); }
      catch (error) { console.error('Thumbnail fallback failed for', id, error); }
    }
    return new NextResponse('Image listed but cannot be decoded; check source file in Drive', {
      status: 422, headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Drive image error for', id, error);
    return new NextResponse('Failed to retrieve image from Drive', {
      status: 502, headers: { 'Cache-Control': 'no-store' },
    });
  }
}

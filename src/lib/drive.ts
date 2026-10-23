/** Server-only Google Drive integration.
 * Every newly created FIRST-LEVEL folder under DRIVE_ROOT_FOLDER_ID is a project.
 * Images may live in nested folders; pagination is exhaustive (no 24-image limit).
 * No Google credentials or thumbnails are exposed to browser responses.
 */
import 'server-only';
import { createHash, createSign } from 'node:crypto';
import { unstable_cache } from 'next/cache';
import baseProjects from '@/data/projects.json';
import type { Category, Project, PublicProject } from '@/lib/types';

const folderMime = 'application/vnd.google-apps.folder';
const base = baseProjects as Project[];
const refreshSeconds = Math.max(60, Number(process.env.DRIVE_REFRESH_SECONDS || 300) || 300);
const rootFolderId = process.env.DRIVE_ROOT_FOLDER_ID?.trim() || '1awl7cpeVZ3drq3KHL-5vd9DC3X2v2S98';
export const driveConfigured = Boolean(
  (process.env.GOOGLE_SERVICE_ACCOUNT_JSON || (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY)) && rootFolderId
);

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
};
export type DrivePhoto = { id: string; name: string; mimeType: string; modifiedTime?: string };

let bearer: { token: string; validUntil: number } | undefined;
function credentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const v = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    return { email: v.client_email as string, key: String(v.private_key).replace(/\\n/g, '\n') };
  }
  return {
    email: String(process.env.GOOGLE_CLIENT_EMAIL || ''),
    key: String(process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };
}
function b64(data: object) { return Buffer.from(JSON.stringify(data)).toString('base64url'); }
async function getToken() {
  if (bearer && Date.now() < bearer.validUntil) return bearer.token;
  const { email, key } = credentials();
  if (!email || !key) throw new Error('Missing Google Drive service account credentials');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = [b64({ alg: 'RS256', typ: 'JWT' }), b64({
    iss: email, scope: 'https://www.googleapis.com/auth/drive.readonly',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3500,
  })].join('.');
  const sig = createSign('RSA-SHA256').update(unsigned).end().sign(key).toString('base64url');
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Google OAuth ${response.status}`);
  const v = await response.json();
  if (!v.access_token) throw new Error('No access token returned from Google OAuth');
  bearer = { token: String(v.access_token), validUntil: Date.now() + (Math.min(Number(v.expires_in) || 3600, 3500) - 120) * 1000 };
  return bearer.token;
}
export async function driveFetch(url: string) {
  const token = await getToken();
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Google Drive API ${response.status}: ${url.split('?')[0]}`);
  return response;
}

async function listChildren(parent: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;
  do {
    const query = new URLSearchParams({
      q: `'${parent.replace(/'/g, "\\'")}' in parents and trashed = false`,
      fields: 'nextPageToken,files(id,name,mimeType,modifiedTime,size)',
      pageSize: '1000', orderBy: 'name',
      supportsAllDrives: 'true', includeItemsFromAllDrives: 'true',
    });
    if (pageToken) query.set('pageToken', pageToken);
    const data = await (await driveFetch(`https://www.googleapis.com/drive/v3/files?${query}`)).json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken || undefined;
  } while (pageToken);
  return files;
}
function projectId(_name: string, id: string) {
  // Folder IDs do not change on rename, so a newly generated URL stays stable.
  return `project-${createHash('sha256').update(id).digest('hex').slice(0, 12)}`;
}
function categoryFromName(name: string): Category {
  const n = name.toLowerCase();
  if (/highlight|hilight/.test(n)) return 'highlights';
  if (/exterior|facade|outdoor/.test(n)) return 'exterior';
  if (/hotel|intercontinental|resort/.test(n)) return 'hotel';
  if (/swensen|jiancha|panana|sunseed|laoyuan|retail|shop|store|restaurant|cafe|office/.test(n)) return 'commercial';
  return 'residential';
}
function isPhoto(f: DriveFile): boolean {
  // Include logo.* too, because the user asked for ALL images in each project folder.
  return f.mimeType.startsWith('image/') || /\.(heic|heif|jpe?g|png|webp|gif|avif|tiff?|bmp)$/i.test(f.name);
}
function photoUrl(p: DrivePhoto, slug: string) {
  const ver = p.modifiedTime ? `&v=${encodeURIComponent(p.modifiedTime)}` : '';
  return `/api/drive-image/${encodeURIComponent(p.id)}?project=${encodeURIComponent(slug)}${ver}`;
}

async function readProjectsFromDrive(): Promise<Project[]> {
  const top = await listChildren(rootFolderId);
  const known = new Map(base.map(p => [p.folderId, p]));
  const ids = new Set<string>();
  return top.filter(f => f.mimeType === folderMime).map(f => {
    const old = known.get(f.id);
    const id = old?.id || projectId(f.name, f.id);
    if (ids.has(id)) throw new Error('Duplicate project slug: ' + id);
    ids.add(id);
    return {
      id,
      name: f.name, // Reflect folder renames without requiring redeployment.
      category: old?.category || categoryFromName(f.name),
      folderId: f.id,
      photos: [], cover: '', available: false,
    };
  });
}
const cachedProjects = unstable_cache(readProjectsFromDrive, ['dl2009-drive-project-folders'], { revalidate: refreshSeconds });

export async function getProjects(): Promise<Project[]> {
  if (!driveConfigured) return base;
  // Fail visibly if credentials are configured incorrectly, instead of silently
  // showing a static gallery that looks synchronized but isn't.
  return cachedProjects();
}

async function readPhotosFromDrive(folderId: string): Promise<DrivePhoto[]> {
  // Traverse photo subfolders too. No arbitrary 24/80 image truncation.
  // Folder depth has no arbitrary limit, but Google Drive cannot create cycles.
  const seenFolders = new Set<string>();
  const seenPhotos = new Set<string>();
  const photos: DrivePhoto[] = [];
  const queue = [folderId];
  while (queue.length) {
    const folder = queue.shift()!;
    if (seenFolders.has(folder)) continue;
    seenFolders.add(folder);
    const children = await listChildren(folder);
    for (const file of children) {
      if (file.mimeType === folderMime) queue.push(file.id);
      else if (isPhoto(file) && !seenPhotos.has(file.id)) {
        seenPhotos.add(file.id);
        photos.push({ id: file.id, name: file.name, mimeType: file.mimeType, modifiedTime: file.modifiedTime });
      }
    }
  }
  return photos;
}
// Stable function wrapper: project folder ID is a cache key, not a secret.
const cachedPhotos = unstable_cache(readPhotosFromDrive, ['dl2009-all-drive-photos'], { revalidate: refreshSeconds });
export async function getPhotos(project: Project): Promise<DrivePhoto[]> {
  if (!driveConfigured) return [];
  return cachedPhotos(project.folderId);
}
export async function getProjectsWithPhotos(): Promise<PublicProject[]> {
  const all = await getProjects();
  if (!driveConfigured) return all.map(({ folderId: _id, ...p }) => p);
  // Limit concurrent Drive calls to keep API quotas and Vercel compute predictable.
  const output: PublicProject[] = [];
  for (let i = 0; i < all.length; i += 5) {
    const results = await Promise.all(all.slice(i, i + 5).map(async (p) => {
      const images = await getPhotos(p);
      const photos = images.map(img => photoUrl(img, p.id));
      const preferred = images.find(img => !/^logo[. _-]/i.test(img.name)) || images[0];
      const { folderId: _folderId, ...safe } = p;
      return { ...safe, photos, cover: preferred ? photoUrl(preferred, p.id) : '', available: photos.length > 0 };
    }));
    output.push(...results);
  }
  return output;
}
export async function getProjectWithPhotos(slug: string): Promise<PublicProject | undefined> {
  const project = (await getProjects()).find(p => p.id === slug);
  if (!project) return undefined;
  if (!driveConfigured) { const { folderId: _id, ...p } = project; return p; }
  const images = await getPhotos(project);
  const photos = images.map(img => photoUrl(img, project.id));
  const preferred = images.find(img => !/^logo[. _-]/i.test(img.name)) || images[0];
  const { folderId: _folderId, ...safe } = project;
  return { ...safe, photos, cover: preferred ? photoUrl(preferred, project.id) : '', available: photos.length > 0 };
}

/** Ensure an arbitrary file ID can't be used to read other private Drive files. */
export async function canServePhoto(slug: string, imageId: string) {
  const project = (await getProjects()).find(p => p.id === slug);
  if (!project || !driveConfigured) return false;
  const images = await getPhotos(project);
  return images.some(photo => photo.id === imageId);
}

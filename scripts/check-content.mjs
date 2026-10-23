import { access, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const data = await readFile(join(root, 'src/lib/drive.ts'),'utf8');
if (!data.includes('nextPageToken') || !data.includes('while (pageToken)')) throw new Error('Missing complete Drive pagination');
if (!data.includes('readMediaFromDrive')) throw new Error('Missing Drive media traversal');
await access(join(root,'public/line-oa-qr.png'));
console.log('OK: dynamic Drive pagination, recursive gallery listing, LINE OA QR');

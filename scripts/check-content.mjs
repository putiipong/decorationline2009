import { readFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(await readFile(join(root, 'src/data/projects.json'), 'utf8'));
const ids = new Set(), folderIds = new Set();
for (const p of projects) {
  if (!p.id || !p.name || !p.folderId || !Array.isArray(p.photos)) throw new Error(`Malformed project: ${JSON.stringify(p)}`);
  if (ids.has(p.id) || folderIds.has(p.folderId)) throw new Error(`Duplicate project: ${p.name}`);
  ids.add(p.id); folderIds.add(p.folderId);
  for (const photo of p.photos) await access(join(root, 'public', photo));
}
console.log(`OK: ${projects.length} static fallback projects; dynamic Drive project folders are discovered at runtime.`);

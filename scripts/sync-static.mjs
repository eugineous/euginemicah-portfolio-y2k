// Copies the original static site (root *.html, robots.txt, sitemap.xml and
// /assets) into /public so Next serves it unchanged at the same URLs.
import { cp, mkdir, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pub = path.join(root, 'public');

await mkdir(pub, { recursive: true });

for (const f of await readdir(root)) {
  if (f.endsWith('.html') || f === 'robots.txt' || f === 'sitemap.xml') {
    await copyFile(path.join(root, f), path.join(pub, f));
  }
}
if (existsSync(path.join(root, 'assets'))) {
  await cp(path.join(root, 'assets'), path.join(pub, 'assets'), { recursive: true });
}
console.log('[sync-static] static site copied into /public');

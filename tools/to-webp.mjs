import sharp from 'sharp';
import { readdirSync, statSync, rmSync } from 'node:fs';
const dir = 'public/images';
const keep = new Set(['icon.png']); // favicon stays PNG
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.png') || keep.has(f)) continue;
  const out = `${dir}/${f.replace(/\.png$/, '.webp')}`;
  await sharp(`${dir}/${f}`).webp({ quality: 82 }).toFile(out);
  const before = statSync(`${dir}/${f}`).size,
    after = statSync(out).size;
  console.log(`${f}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
  rmSync(`${dir}/${f}`);
}

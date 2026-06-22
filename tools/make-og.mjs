// Generates public/og.png (1200x630): a calm "Quiet"-styled share card.
// Text is converted to SVG paths via fontkit, so no system fonts are needed.
import * as fontkit from 'fontkit';
import sharp from 'sharp';

const W = 1200,
  H = 630;

function textPath(fontPath, text, size, x, baselineY, fill) {
  const font = fontkit.openSync(fontPath);
  const scale = size / font.unitsPerEm;
  const run = font.layout(text);
  let penX = 0;
  const parts = [];
  run.glyphs.forEach((glyph, i) => {
    const d = glyph.path.toSVG();
    if (d) {
      parts.push(
        `<path d="${d}" transform="translate(${x + penX * scale}, ${baselineY}) scale(${scale}, ${-scale})" fill="${fill}"/>`,
      );
    }
    penX += run.positions[i].xAdvance;
  });
  return { svg: parts.join(''), width: penX * scale };
}

const geist500 = 'node_modules/@fontsource/geist-sans/files/geist-sans-latin-500-normal.woff2';
const geist400 = 'node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2';
const mono = 'node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2';

const name = textPath(geist500, 'Sharath Chandra Raparthy', 70, 90, 300, '#ebeae6');
const role = textPath(geist400, 'Research Engineer · Google DeepMind', 30, 90, 360, '#a4a39c');
const tags = textPath(
  mono,
  'Open-Endedness · LLM Reasoning · In-Context RL',
  22,
  90,
  470,
  '#93a6ff',
);
const url = textPath(mono, 'sharathraparthy.github.io', 21, 90, 545, '#6c6b64');

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#121210"/>
  <rect x="90" y="408" width="46" height="3" rx="1.5" fill="#93a6ff"/>
  ${name.svg}${role.svg}${tags.svg}${url.svg}
</svg>`;

const portrait = await sharp('public/images/sharath_sf.jpg')
  .resize(300, 300, { fit: 'cover', position: 'attention' })
  .composite([
    {
      input: Buffer.from('<svg><circle cx="150" cy="150" r="150" fill="#fff"/></svg>'),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: portrait, left: 830, top: 165 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png');

console.log('og.png written');

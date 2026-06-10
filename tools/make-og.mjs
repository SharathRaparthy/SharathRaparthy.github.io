// Generates public/og.png (1200x630): Signal-styled share card.
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

const instrument =
  'node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-700-normal.woff2';
const inter = 'node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2';

const name1 = textPath(instrument, 'Sharath Chandra', 84, 80, 240, '#eceef2');
const name2 = textPath(instrument, 'Raparthy', 84, 80, 340, '#eceef2');
const role = textPath(inter, 'Research Engineer · Google DeepMind', 30, 80, 415, '#a6abb6');
const tags = textPath(
  inter,
  'Open-Endedness · LLM Reasoning · In-Context RL',
  23,
  80,
  470,
  'url(#tag)',
);
const url = textPath(inter, 'sharathraparthy.github.io', 22, 80, 560, '#8d93a1');

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ga" cx="40%" cy="-10%" r="80%">
      <stop offset="0%" stop-color="#6e78ff" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#6e78ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gb" cx="95%" cy="110%" r="70%">
      <stop offset="0%" stop-color="#40bef5" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#40bef5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tag" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8e96ff"/>
      <stop offset="100%" stop-color="#5ed2fa"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0b0d11"/>
  <rect width="${W}" height="${H}" fill="url(#ga)"/>
  <rect width="${W}" height="${H}" fill="url(#gb)"/>
  <circle cx="985" cy="315" r="153" fill="none" stroke="#8e96ff" stroke-opacity="0.5" stroke-width="2"/>
  ${name1.svg}${name2.svg}${role.svg}${tags.svg}${url.svg}
  <rect x="80" y="505" width="56" height="4" rx="2" fill="#8e96ff"/>
</svg>`;

const portrait = await sharp('public/images/sharath_sf.jpg')
  .resize(290, 290, { fit: 'cover', position: 'attention' })
  .composite([
    {
      input: Buffer.from('<svg><circle cx="145" cy="145" r="145" fill="#fff"/></svg>'),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: portrait, left: 840, top: 170 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png');

console.log('og.png written');

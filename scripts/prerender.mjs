// Injects the server-rendered app into dist/index.html so the page shows full
// content even before (or without) JavaScript. Run after both client and SSR
// vite builds.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const { render } = await import('../dist-ssr/entry-prerender.js');

const htmlPath = 'dist/index.html';
const html = readFileSync(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  throw new Error(`prerender: could not find ${marker} in ${htmlPath}`);
}
const body = render();
if (!body.includes('Sharath Chandra Raparthy')) {
  throw new Error('prerender: rendered output is missing expected content');
}
writeFileSync(htmlPath, html.replace(marker, `<div id="root">${body}</div>`));
rmSync('dist-ssr', { recursive: true, force: true });
console.log(`prerender: injected ${body.length} bytes of static HTML into ${htmlPath}`);

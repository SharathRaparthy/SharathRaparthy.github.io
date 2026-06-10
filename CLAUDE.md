# sharathraparthy.github.io — architecture notes

Personal academic site. React is **build-time only**; the browser receives
static HTML plus a small vanilla script. Design system: "Signal"
(graphite surfaces, indigo glow, Instrument Sans + Inter, self-hosted fonts).

## How it builds

`npm run build` = typecheck → Vite client build (`src/site.ts` entry, ~2KB JS)
→ Vite SSR build of `src/entry-prerender.tsx` → `scripts/prerender.mjs`
injects the fully rendered app into `dist/index.html` (sanity-checked).
`index.html` also carries an inline theme script, a watchdog that restores
the prerendered HTML if anything empties `#root`, and a `?debug=1` overlay.

Do not reintroduce client-side React rendering/hydration: a 2026-06 incident
showed browser extensions corrupting hydration, and the legacy "deploy from
branch" Pages mode once served raw sources (Pages source must stay
**GitHub Actions**; see workflow runs of `pages-build-deployment` for history).

## Where things live

- Content: `src/data/news.tsx`, `src/data/papers.tsx` (each paper needs a
  one-line `tldr`), `src/data/abstracts.json` (real arXiv abstracts).
- `src/site.ts`: theme toggle, back-to-top, paper expand + on-device AI
  summary (Chrome Summarizer API; baked TL;DR is the fallback), news
  show-all, active-nav observer, BibTeX copy. Fonts imported here via
  `@fontsource` (self-hosted; no Google CDN).
- `src/lib/bibtex.tsx`: build-time BibTeX generation.
- `tools/make-og.mjs`: regenerates `public/og.png` (fontkit text→paths +
  sharp). `tools/to-webp.mjs`: thumbnail conversion.

## Workflows

- `ci.yml`: lint, format check, tests, build on PRs/branches.
- `deploy.yml`: build + deploy to Pages on push to `master`.
- `probe.yml` (dispatch + weekly): fetches the live site from a runner and
  prints what is actually served — use this before blaming caches.
- `fetch-abstracts.yml` (dispatch): prints abstracts JSON for new papers
  (the arXiv API has **no CORS headers**, so never fetch it from the
  browser; bake abstracts instead). `link-check.yml` (weekly): lychee.

## Adding a paper

1. Entry in `src/data/papers.tsx` (with `tldr`); image as WebP (~760px wide)
   in `public/images/` (PNG only if WebP is larger, e.g. `r-ss.png`).
2. If it has an arXiv id: add it to `fetch-abstracts.yml`, dispatch it, and
   copy the JSON from the run log into `src/data/abstracts.json`.

# sharathraparthy.github.io

Personal academic website of Sharath Chandra Raparthy, built with React, TypeScript, and Vite.

Originally based on [Jon Barron's academic website template](https://github.com/jonbarron/jonbarron_website); the design has since been rewritten and the site migrated to a React frontend.

## Development

```bash
npm install
npm run dev        # local dev server with HMR
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## Content updates

Site content is data-driven:

- News items: `src/data/news.tsx`
- Publications: `src/data/papers.tsx`
- Bio / hero text: `src/components/Hero.tsx`
- Images: `public/images/`

## Deployment

Pushes to `master` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages. (Repository Pages settings must be set to "GitHub Actions" as the source.)

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML ships prerendered content (see scripts/prerender.mjs);
// hydrate it. The dev server serves an empty root, so render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

declare global {
  interface Window {
    __APP_LOADED__?: boolean;
    __errs?: string[];
  }
}
window.__APP_LOADED__ = true;

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

declare global {
  interface Window {
    __APP_LOADED__?: boolean;
    __errs?: string[];
  }
}

const container = document.getElementById('root')!;
// Keep a copy of the prerendered markup so it can be restored if anything
// (a hydration crash, an extension mutating the DOM) empties the root.
const staticHtml = container.innerHTML;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

function clientRender() {
  container.innerHTML = '';
  createRoot(container).render(app);
}

if (container.hasChildNodes()) {
  try {
    hydrateRoot(container, app);
  } catch {
    clientRender();
  }
} else {
  // Dev server serves an empty root.
  clientRender();
}

// Watchdog: content must never disappear. If the root is empty shortly after
// boot (e.g. hydration was corrupted by a translation/dark-mode extension and
// React unmounted), restore the static prerendered HTML.
setTimeout(() => {
  if (container.childElementCount === 0 && staticHtml) {
    window.__errs?.push('watchdog: root was empty, restored static HTML');
    container.innerHTML = staticHtml;
  }
}, 1800);

window.__APP_LOADED__ = true;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

declare global {
  interface Window {
    __APP_LOADED__?: boolean;
    __errs?: string[];
  }
}

// Deliberately NOT hydrating: browser extensions and auto-translators mutate
// the prerendered DOM before React boots, and hydration mismatches can crash
// fatally (unmounting everything — observed in production as a blank page).
// A fresh client render is immune: React owns a clean tree, and the
// prerendered HTML still serves SEO, no-JS visitors, and first paint.
const container = document.getElementById('root')!;
container.innerHTML = '';
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

window.__APP_LOADED__ = true;

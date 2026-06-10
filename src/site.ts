import './styles/global.css';

declare global {
  interface Window {
    __APP_LOADED__?: boolean;
    __errs?: string[];
  }
}

/** Wires up the small interactive bits on top of the static HTML. */
export function initSite(): void {
  document.querySelectorAll<HTMLElement>('.theme-toggle').forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage unavailable (private mode); theme still applies this session.
      }
    });
  });

  const top = document.querySelector<HTMLElement>('.back-to-top');
  if (top && !top.dataset.bound) {
    top.dataset.bound = '1';
    const update = () => top.classList.toggle('visible', window.scrollY > 600);
    update();
    window.addEventListener('scroll', update, { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

if (document.readyState !== 'loading') {
  initSite();
} else {
  document.addEventListener('DOMContentLoaded', initSite);
}

window.__APP_LOADED__ = true;

import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/instrument-sans/latin-500.css';
import '@fontsource/instrument-sans/latin-600.css';
import '@fontsource/instrument-sans/latin-700.css';
import './styles/global.css';

declare global {
  interface Window {
    __APP_LOADED__?: boolean;
    __errs?: string[];
  }
}

/** Chrome's built-in on-device Summarizer API (free, private, no key). */
interface BuiltInSummarizer {
  availability(): Promise<string>;
  create(opts: {
    type?: string;
    format?: string;
    length?: string;
  }): Promise<{ summarize(text: string): Promise<string> }>;
}

function summarizerApi(): BuiltInSummarizer | undefined {
  return (globalThis as { Summarizer?: BuiltInSummarizer }).Summarizer;
}

async function loadPaperExtras(extra: HTMLElement): Promise<void> {
  // The abstract is baked into the HTML at build time (the arXiv API has no
  // CORS headers, so it cannot be fetched from the browser).
  const abstract = extra.querySelector<HTMLElement>('.paper-abstract')?.textContent?.trim() ?? '';
  const aiEl = extra.querySelector<HTMLElement>('.paper-ai');
  const srcEl = extra.querySelector<HTMLElement>('.ai-src');

  // Upgrade the hand-written TL;DR with an on-device AI summary when the
  // browser ships one (Chrome's Summarizer API). Fails quietly otherwise.
  try {
    const api = summarizerApi();
    if (!api || !abstract || !aiEl) return;
    if ((await api.availability()) === 'unavailable') return;
    const summarizer = await api.create({ type: 'tldr', format: 'plain-text', length: 'short' });
    const summary = (await summarizer.summarize(abstract)).trim();
    if (summary) {
      aiEl.textContent = summary;
      if (srcEl) srcEl.textContent = '· AI, summarized on your device';
    }
  } catch {
    // Keep the baked-in summary.
  }
}

/** Wires up the small interactive bits on top of the static HTML. */
export function initSite(): void {
  // Entrance/reveal animations are gated on this class: without JS the page
  // is fully visible and static (hard rule after the 2026-06 blank-page saga).
  document.documentElement.classList.add('js-anim');

  const revealables = document.querySelectorAll<HTMLElement>(
    '.paper-card, .news-item, .highlight-card',
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    revealables.forEach((el) => {
      // Only elements below the fold ever get hidden.
      if (el.getBoundingClientRect().top > window.innerHeight && !el.classList.contains('pre')) {
        el.classList.add('pre');
        io.observe(el);
      }
    });
    // Failsafe: never leave anything hidden.
    setTimeout(() => {
      document.querySelectorAll('.pre:not(.in)').forEach((el) => el.classList.add('in'));
    }, 2500);
  }

  document.querySelectorAll<HTMLElement>('.theme-toggle').forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      const tc = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (tc) tc.content = next === 'dark' ? '#0b0d11' : '#fafafb';
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

  document.querySelectorAll<HTMLElement>('.paper-card').forEach((card) => {
    const btn = card.querySelector<HTMLButtonElement>('.paper-expand');
    const extra = card.querySelector<HTMLElement>('.paper-extra');
    if (!btn || !extra || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      if (open && !extra.dataset.loaded) {
        extra.dataset.loaded = '1';
        void loadPaperExtras(extra);
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.bibtex-copy').forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', async () => {
      const text = btn.previousElementSibling?.textContent ?? '';
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied ✓';
        setTimeout(() => {
          btn.textContent = 'Copy BibTeX';
        }, 1600);
      } catch {
        btn.textContent = 'Select & copy manually';
      }
    });
  });

  const newsToggle = document.querySelector<HTMLButtonElement>('.news-toggle');
  const newsPanel = document.querySelector<HTMLElement>('.news-fade');
  if (newsToggle && newsPanel && !newsToggle.dataset.bound) {
    newsToggle.dataset.bound = '1';
    const fullLabel = newsToggle.textContent ?? 'Show all updates';
    newsToggle.addEventListener('click', () => {
      const open = newsPanel.classList.toggle('expanded');
      newsToggle.setAttribute('aria-expanded', String(open));
      newsToggle.textContent = open ? 'Show fewer' : fullLabel;
    });
  }

  // Highlight the nav link of the section currently in view.
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.header-nav-link')];
  const sections = navLinks
    .map((link) => document.querySelector<HTMLElement>(link.getAttribute('href') ?? ''))
    .filter((el): el is HTMLElement => el !== null);
  if (sections.length && 'IntersectionObserver' in window) {
    const setActive = (id: string) => {
      navLinks.forEach((link) =>
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`),
      );
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
  }
}

if (document.readyState !== 'loading') {
  initSite();
} else {
  document.addEventListener('DOMContentLoaded', initSite);
}

window.__APP_LOADED__ = true;

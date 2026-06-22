import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';
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

/** ⌘K / Ctrl-K command palette: jump to sections, papers, or actions. */
function setupCommandPalette(): void {
  const palette = document.querySelector<HTMLElement>('.cmdk');
  const input = palette?.querySelector<HTMLInputElement>('.cmdk-input');
  const list = palette?.querySelector<HTMLElement>('.cmdk-list');
  const empty = palette?.querySelector<HTMLElement>('.cmdk-empty');
  if (!palette || !input || !list || !empty || palette.dataset.bound) return;
  palette.dataset.bound = '1';

  const items = () => [...list.querySelectorAll<HTMLElement>('.cmdk-item')];
  const visible = () => items().filter((el) => !(el.closest('.cmdk-row') as HTMLElement).hidden);
  let active = -1;
  let lastFocused: HTMLElement | null = null;

  const setActive = (i: number) => {
    const vis = visible();
    active = Math.max(0, Math.min(i, vis.length - 1));
    items().forEach((el) => el.classList.remove('active'));
    vis[active]?.classList.add('active');
    vis[active]?.scrollIntoView?.({ block: 'nearest' });
  };

  const open = () => {
    lastFocused = document.activeElement as HTMLElement;
    palette.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      palette.classList.add('open');
      input.value = '';
      input.focus();
      filter();
    });
  };

  const close = () => {
    palette.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      palette.hidden = true;
    }, 160);
    lastFocused?.focus();
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    items().forEach((el) => {
      const row = el.closest('.cmdk-row') as HTMLElement;
      const text = el.querySelector('.cmdk-label')?.textContent?.toLowerCase() ?? '';
      const ok = q === '' || text.includes(q);
      row.hidden = !ok;
      if (ok) shown += 1;
    });
    empty.hidden = shown > 0;
    setActive(0);
  };

  input.addEventListener('input', filter);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.hidden) open();
      else close();
    } else if (!palette.hidden) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(active + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        visible()[active]?.click();
      }
    }
  });

  document.querySelector('.cmdk-trigger')?.addEventListener('click', open);
  palette.querySelector('[data-cmdk-close]')?.addEventListener('click', close);

  list.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.cmdk-item');
    if (!item) return;
    const action = item.dataset.cmdkAction;
    if (action === 'copy-email') {
      void navigator.clipboard?.writeText('sharathraparthy@gmail.com');
    } else if (action === 'toggle-theme') {
      document.querySelector<HTMLElement>('.theme-toggle')?.click();
    }
    // Links navigate on their own; just close the palette.
    close();
  });

  list.addEventListener('mousemove', (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('.cmdk-item');
    if (!item) return;
    const i = visible().indexOf(item);
    if (i >= 0 && i !== active) setActive(i);
  });
}

/** Wires up the small interactive bits on top of the static HTML. */
export function initSite(): void {
  // Entrance/reveal animations are gated on this class: without JS the page
  // is fully visible and static (hard rule after the 2026-06 blank-page saga).
  document.documentElement.classList.add('js-anim');

  const revealables = document.querySelectorAll<HTMLElement>('.paper-card, .news-item');
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
      if (tc) tc.content = next === 'dark' ? '#121210' : '#faf9f7';
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

  setupCommandPalette();

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

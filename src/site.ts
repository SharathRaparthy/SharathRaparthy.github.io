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

async function fetchArxivAbstract(id: string): Promise<string> {
  const res = await fetch(`https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`arXiv API: ${res.status}`);
  const xml = new DOMParser().parseFromString(await res.text(), 'text/xml');
  const summary = xml.querySelector('entry > summary')?.textContent ?? '';
  return summary.replace(/\s+/g, ' ').trim();
}

async function loadPaperExtras(card: HTMLElement, extra: HTMLElement): Promise<void> {
  const id = card.dataset.arxiv;
  const absEl = extra.querySelector<HTMLElement>('.paper-abstract');
  const aiEl = extra.querySelector<HTMLElement>('.paper-ai');
  const srcEl = extra.querySelector<HTMLElement>('.ai-src');

  let abstract = '';
  if (id && absEl) {
    try {
      abstract = await fetchArxivAbstract(id);
      absEl.textContent = abstract || 'No abstract found.';
    } catch {
      absEl.textContent = 'Could not load the abstract right now — try the paper link above.';
    }
  }

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
        void loadPaperExtras(card, extra);
      }
    });
  });
}

if (document.readyState !== 'loading') {
  initSite();
} else {
  document.addEventListener('DOMContentLoaded', initSite);
}

window.__APP_LOADED__ = true;

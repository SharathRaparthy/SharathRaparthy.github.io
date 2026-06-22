import { papers } from '../data/papers.tsx';

interface Cmd {
  label: string;
  kind: string;
  href?: string;
  external?: boolean;
  action?: string;
  hint?: string;
}

const commands: Cmd[] = [
  { label: 'About', kind: 'Section', href: '#about' },
  { label: 'News', kind: 'Section', href: '#news' },
  { label: 'Research', kind: 'Section', href: '#research' },
  { label: 'Copy email address', kind: 'Action', action: 'copy-email', hint: '⏎' },
  { label: 'Download CV', kind: 'Action', href: '/sharath-raparthy-cv.pdf', external: true },
  { label: 'Toggle light / dark theme', kind: 'Action', action: 'toggle-theme' },
  { label: 'GitHub', kind: 'Profile', href: 'https://github.com/SharathRaparthy', external: true },
  { label: 'X (Twitter)', kind: 'Profile', href: 'https://x.com/sharathraparthy', external: true },
  {
    label: 'Google Scholar',
    kind: 'Profile',
    href: 'https://scholar.google.ca/citations?user=S1R0_UMAAAAJ&hl=en',
    external: true,
  },
  ...papers.map((p): Cmd => ({ label: p.title, kind: 'Paper', href: p.titleHref, external: true })),
];

export default function CommandPalette() {
  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command menu" hidden>
      <div className="cmdk-overlay" data-cmdk-close />
      <div className="cmdk-panel" role="document">
        <input
          className="cmdk-input"
          type="text"
          placeholder="Jump to a section, paper, or action…"
          aria-label="Search commands"
          autoComplete="off"
          spellCheck={false}
        />
        <ul className="cmdk-list" role="listbox" aria-label="Commands">
          {commands.map((c) => {
            const inner = (
              <>
                <span className="cmdk-label">{c.label}</span>
                {c.hint && <kbd className="cmdk-hint">{c.hint}</kbd>}
                <span className="cmdk-kind">{c.kind}</span>
              </>
            );
            const common = { className: 'cmdk-item', role: 'option' as const };
            return (
              <li key={c.label} className="cmdk-row">
                {c.href ? (
                  <a
                    {...common}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <button type="button" {...common} data-cmdk-action={c.action}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <p className="cmdk-empty" hidden>
          No matches.
        </p>
      </div>
    </div>
  );
}

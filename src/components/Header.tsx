const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'news', href: '#news' },
  { label: 'research', href: '#research' },
];

// Markup only: the click behavior is attached by src/site.ts at runtime, and
// the current theme lives in <html data-theme> with icons swapped via CSS, so
// this component is theme-independent and safe to prerender.
export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="header-logo" href="#top" aria-label="Back to top">
          Sharath&nbsp;Raparthy
        </a>
        <nav className="header-nav" aria-label="Site sections">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="header-nav-link">
              {label}
            </a>
          ))}
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle color theme"
            title="Toggle color theme"
          >
            <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
            <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

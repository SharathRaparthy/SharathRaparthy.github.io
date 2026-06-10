import SocialLinks from './SocialLinks.tsx';

const navLinks = [
  { label: 'about', href: '#about', num: '01' },
  { label: 'news', href: '#news', num: '02' },
  { label: 'research', href: '#research', num: '03' },
];

export default function Sidebar() {
  return (
    <aside className="side-panel">
      <div className="side-top">
        <a className="header-logo" href="#top" aria-label="Back to top">
          SR<span className="logo-dot">.</span>
        </a>
        <div className="hero-text">
          <h1 className="hero-name">Sharath Chandra Raparthy</h1>
          <p className="hero-role">
            Research Engineer at <a href="https://deepmind.google/">Google DeepMind</a> —
            Open-Endedness
          </p>
        </div>
        <nav className="header-nav" aria-label="Site sections">
          {navLinks.map(({ label, href, num }) => (
            <a key={label} href={href} className="header-nav-link">
              <span className="nav-num" aria-hidden="true">
                {num}
              </span>
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

      <div className="side-bottom">
        <figure className="hero-photo">
          <img
            src="/images/sharath_sf.jpg"
            alt="Sharath Chandra Raparthy"
            width={480}
            height={480}
            fetchPriority="high"
          />
        </figure>
        <SocialLinks />
      </div>
    </aside>
  );
}

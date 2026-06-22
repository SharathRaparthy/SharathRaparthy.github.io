interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
}

const links: SocialLink[] = [
  { label: 'Email', href: 'mailto:sharathraparthy@gmail.com' },
  { label: 'CV', href: '/sharath-raparthy-cv.pdf', external: true },
  { label: 'GitHub', href: 'https://github.com/SharathRaparthy', external: true },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.ca/citations?user=S1R0_UMAAAAJ&hl=en',
    external: true,
  },
];

export default function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Contact and profiles">
      {links.map(({ label, href, external }) => (
        <a
          key={label}
          className="social-link"
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

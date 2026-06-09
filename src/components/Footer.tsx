import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export default function Footer() {
  const footerRef = useScrollReveal<HTMLElement>();

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="footer-line">
        <span className="footer-prompt">$</span> echo &quot;&copy; {new Date().getFullYear()}{' '}
        Sharath Chandra Raparthy&quot;
      </div>
      <div className="footer-meta">
        Built with React + Vite ·{' '}
        <a href="https://github.com/SharathRaparthy/SharathRaparthy.github.io">source</a>
      </div>
    </footer>
  );
}

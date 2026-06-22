export default function Footer() {
  return (
    <footer className="site-footer">
      <span>&copy; {new Date().getFullYear()} Sharath Chandra Raparthy</span>
      <span className="footer-meta">
        Built with React + Vite ·{' '}
        <a href="https://github.com/SharathRaparthy/SharathRaparthy.github.io">Source</a>
      </span>
    </footer>
  );
}

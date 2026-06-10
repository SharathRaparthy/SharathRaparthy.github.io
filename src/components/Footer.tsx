export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-line">&copy; {new Date().getFullYear()} Sharath Chandra Raparthy</div>
      <div className="footer-meta">
        Built with React + Vite ·{' '}
        <a href="https://github.com/SharathRaparthy/SharathRaparthy.github.io">source</a>
      </div>
    </footer>
  );
}

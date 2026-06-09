import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export default function Footer() {
  const footerRef = useScrollReveal<HTMLElement>();

  return (
    <footer className="site-footer" ref={footerRef}>
      &copy; {new Date().getFullYear()} Sharath Chandra Raparthy
    </footer>
  );
}

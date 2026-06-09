import Hero from './components/Hero.tsx';
import NewsSection from './components/NewsSection.tsx';
import ResearchSection from './components/ResearchSection.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  return (
    <div className="site-container">
      <Hero />
      <NewsSection />
      <ResearchSection />
      <Footer />
    </div>
  );
}

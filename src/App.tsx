import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import NewsSection from './components/NewsSection.tsx';
import ResearchSection from './components/ResearchSection.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';

export default function App() {
  return (
    <>
      <Header />
      <div className="site-container" id="top">
        <Hero />
        <NewsSection />
        <ResearchSection />
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}

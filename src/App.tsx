import Sidebar from './components/Sidebar.tsx';
import About from './components/About.tsx';
import Marquee from './components/Marquee.tsx';
import NewsSection from './components/NewsSection.tsx';
import ResearchSection from './components/ResearchSection.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';

export default function App() {
  return (
    <div className="split" id="top">
      <Sidebar />
      <main className="content">
        <About />
        <Marquee />
        <NewsSection />
        <ResearchSection />
        <Footer />
      </main>
      <BackToTop />
    </div>
  );
}

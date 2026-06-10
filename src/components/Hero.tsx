import SocialLinks from './SocialLinks.tsx';
import { papers } from '../data/papers.tsx';
import { newsItems } from '../data/news.tsx';

export default function Hero() {
  return (
    <section className="hero-section" id="about">
      <div className="bento-card hero-text">
        <div className="topic-chips">
          <span className="topic-chip">Open-endedness</span>
          <span className="topic-chip">LLM reasoning</span>
          <span className="topic-chip">In-context RL</span>
        </div>
        <h1 className="hero-name">Sharath Chandra Raparthy</h1>
        <p className="hero-role">
          Research Engineer at <a href="https://deepmind.google/">Google DeepMind</a> — building
          open-ended systems that keep inventing, learning, and surprising us.
        </p>

        <p className="hero-bio">
          Previously a Member of Technical Staff at <a href="https://www.reka.ai/">Reka AI</a>{' '}
          building general-purpose multimodal agents, and an AI Resident at{' '}
          <a href="https://ai.meta.com/">FAIR (Meta)</a> — core contributor to{' '}
          <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> (tool-use and mathematical
          reasoning) and co-lead of <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>.
        </p>

        <p className="hero-bio">
          Master&apos;s (with thesis) from <a href="https://mila.quebec/en/">Mila</a>, advised by{' '}
          <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>; research internship at{' '}
          <a href="https://www.recursion.com">Recursion</a> applying GFlowNets to drug discovery.
          Off the clock: long runs, cooking, books, a camera.
        </p>

        <SocialLinks />
      </div>

      <div className="hero-side">
        <div className="bento-card hero-photo">
          <img
            src="/images/sharath_sf.jpg"
            alt="Sharath Chandra Raparthy"
            width={480}
            height={480}
            fetchPriority="high"
          />
        </div>
        <div className="bento-card hero-stats">
          <div className="stat">
            <span className="stat-num">{papers.length}</span>
            <span className="stat-label">Publications</span>
          </div>
          <div className="stat">
            <span className="stat-num">{newsItems.length}</span>
            <span className="stat-label">Updates</span>
          </div>
          <div className="stat">
            <span className="stat-num">Llama 3</span>
            <span className="stat-label">Core contributor</span>
          </div>
        </div>
      </div>
    </section>
  );
}

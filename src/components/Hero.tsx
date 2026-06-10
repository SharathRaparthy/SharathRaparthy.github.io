import SocialLinks from './SocialLinks.tsx';

export default function Hero() {
  return (
    <section className="hero-section" id="about">
      <div className="hero-text">
        <img
          className="hero-avatar"
          src="/images/sharath_sf.jpg"
          alt="Sharath Chandra Raparthy"
          width={72}
          height={72}
          fetchPriority="high"
        />
        <p className="hero-badge">
          <span className="badge-dot" aria-hidden="true" />
          Research Engineer at&nbsp;<a href="https://deepmind.google/">Google DeepMind</a>
        </p>

        <h1 className="hero-name">Sharath Chandra Raparthy</h1>

        <p className="hero-lede">
          Building <span className="gradient-text">open-ended systems</span> that keep inventing,
          learning, and surprising us.
        </p>

        <p className="hero-bio">
          Previously at <a href="https://www.reka.ai/">Reka AI</a> building multimodal agents, and
          an AI Resident at <a href="https://ai.meta.com/">FAIR (Meta)</a> — core contributor to{' '}
          <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> and co-lead of{' '}
          <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>. Master&apos;s from{' '}
          <a href="https://mila.quebec/en/">Mila</a> with{' '}
          <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>; GFlowNets for drug
          discovery at <a href="https://www.recursion.com">Recursion</a>. Off the clock: long runs,
          cooking, books, a camera.
        </p>

        <SocialLinks />
      </div>

      <div className="hero-highlights">
        <div className="highlight-card">
          <span className="highlight-kicker">Flagship</span>
          <span className="highlight-title">Llama 3</span>
          <span className="highlight-sub">Core contributor — tool-use &amp; math reasoning</span>
        </div>
        <div className="highlight-card">
          <span className="highlight-kicker">Published at</span>
          <span className="highlight-title">NeurIPS · ICML · ICLR</span>
          <span className="highlight-sub">11 papers, incl. an ICLR Spotlight</span>
        </div>
        <div className="highlight-card">
          <span className="highlight-kicker">Focus</span>
          <span className="highlight-title">Open-Endedness</span>
          <span className="highlight-sub">LLM reasoning · in-context RL</span>
        </div>
      </div>
    </section>
  );
}

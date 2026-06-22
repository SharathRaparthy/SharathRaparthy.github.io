import SocialLinks from './SocialLinks.tsx';

export default function Hero() {
  return (
    <header className="hero-section" id="about">
      <div className="hero-text">
        <div className="hero-head">
          <img
            className="hero-avatar"
            src="/images/sharath_sf.jpg"
            alt="Sharath Chandra Raparthy"
            width={84}
            height={84}
            fetchPriority="high"
          />
          <div>
            <h1 className="hero-name">Sharath Chandra Raparthy</h1>
            <p className="hero-role">
              Research Engineer, <a href="https://deepmind.google/">Google DeepMind</a>
            </p>
          </div>
        </div>

        <p className="hero-bio">
          I work on open-endedness — building systems that keep inventing, learning, and surprising
          us. Previously a Member of Technical Staff at <a href="https://www.reka.ai/">Reka AI</a>,
          and an AI Resident at <a href="https://ai.meta.com/">FAIR (Meta)</a>, where I was a core
          contributor to <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> and co-led{' '}
          <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>.
        </p>
        <p className="hero-bio">
          I hold a Master&apos;s from <a href="https://mila.quebec/en/">Mila</a>, advised by{' '}
          <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>, and worked on GFlowNets
          for drug discovery at <a href="https://www.recursion.com">Recursion</a>. Off the clock:
          long runs, cooking, books, and a camera.
        </p>

        <SocialLinks />
      </div>
    </header>
  );
}

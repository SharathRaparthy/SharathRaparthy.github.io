import SocialLinks from './SocialLinks.tsx';

export default function Hero() {
  return (
    <section className="hero-section" id="about">
      <div className="hero-text">
        <p className="hero-eyebrow">
          Open-endedness <span aria-hidden="true">·</span> LLM reasoning{' '}
          <span aria-hidden="true">·</span> In-context RL
        </p>
        <h1 className="hero-name">Sharath Chandra Raparthy</h1>
        <p className="hero-role">
          Research Engineer at <a href="https://deepmind.google/">Google DeepMind</a>
        </p>

        <p>
          I work on open-endedness — building systems that keep inventing, learning, and surprising
          us. Previously, I was a Member of Technical Staff at{' '}
          <a href="https://www.reka.ai/">Reka AI</a>, building general-purpose multimodal agents,
          and an AI Resident at <a href="https://ai.meta.com/">FAIR (Meta)</a>, where I was a core
          contributor to <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> — shipping tool-use
          and mathematical reasoning — and co-led{' '}
          <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>, a method for
          stress-testing and improving LLM robustness at scale.
        </p>

        <p>
          I hold a Master&apos;s (with thesis) from <a href="https://mila.quebec/en/">Mila</a>,
          advised by <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>, and spent
          time at <a href="https://www.recursion.com">Recursion</a> applying GFlowNets to drug
          discovery. Off the clock: long runs, cooking, books, and a camera.
        </p>

        <SocialLinks />
      </div>

      <figure className="hero-photo">
        <img
          src="/images/sharath_sf.jpg"
          alt="Sharath Chandra Raparthy"
          width={480}
          height={480}
          fetchPriority="high"
        />
        <figcaption className="hero-photo-caption">Google DeepMind — Open-Endedness</figcaption>
      </figure>
    </section>
  );
}

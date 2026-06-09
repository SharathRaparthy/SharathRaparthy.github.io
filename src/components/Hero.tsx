import SocialLinks from './SocialLinks.tsx';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1 className="hero-name">Sharath Chandra Raparthy</h1>

        <p>
          I am a Research Engineer at <a href="https://deepmind.google/">Google DeepMind</a>,
          working in the Open-Endedness team.
        </p>

        <p>
          Previously, I was a Member of Technical Staff at{' '}
          <a href="https://www.reka.ai/">Reka AI</a>, building general-purpose multimodal agents.
          Before that, I was an AI Resident at <a href="https://ai.meta.com/">FAIR (Meta)</a>, where
          I was a core contributor to <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> —
          shipping tool-use and mathematical reasoning capabilities — and co-led{' '}
          <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>, a method for
          stress-testing and improving LLM robustness at scale. My research spans LLM reasoning,
          open-ended learning, and in-context reinforcement learning.
        </p>

        <p>
          I hold a Master&apos;s (with thesis) from <a href="https://mila.quebec/en/">Mila</a>,
          advised by <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>, and spent
          time at <a href="https://www.recursion.com">Recursion</a> applying GFlowNets to drug
          discovery.
        </p>

        <p>
          When not training models, you&apos;ll find me running long distances, cooking, reading, or
          out with a camera.
        </p>

        <SocialLinks />
      </div>

      <div className="hero-photo">
        <img
          src="/images/sharath_sf.jpg"
          alt="Sharath Chandra Raparthy"
          width={180}
          height={180}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

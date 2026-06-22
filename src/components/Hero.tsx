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
              Research Engineer · <a href="https://deepmind.google/">Google DeepMind</a>
            </p>
          </div>
        </div>

        <p className="hero-bio">
          I work on open-endedness — systems that never stop learning, inventing their own
          challenges and improving without a fixed ceiling. Lately I&apos;m most excited about{' '}
          <strong>recursive self-improvement</strong>: learners that get better at getting better.
        </p>
        <p className="hero-bio">
          Before DeepMind I was a Member of Technical Staff at{' '}
          <a href="https://www.reka.ai/">Reka AI</a>, where I drove the core development of{' '}
          <a href="https://reka.ai/products/research">Reka Research</a> — an agent that answers hard
          questions by reasoning over the open web and private documents. I led its supervised
          fine-tuning and helped push it to state-of-the-art accuracy on SimpleQA and Research-Eval,
          ahead of systems from OpenAI, Anthropic, and Perplexity, and worked on the RL fine-tuning
          behind the open-source{' '}
          <a href="https://reka.ai/news/introducing-reka-flash">Reka Flash 3</a>.
        </p>
        <p className="hero-bio">
          Earlier, as an AI Resident at <a href="https://ai.meta.com/">FAIR (Meta)</a>, I was a core
          contributor to <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> — building its
          tool-use and mathematical reasoning — and co-led{' '}
          <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>, an open-ended method for
          red-teaming LLMs. I hold a Master&apos;s from <a href="https://mila.quebec/en/">Mila</a>,
          advised by <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>, and interned
          at <a href="https://www.recursion.com">Recursion</a> on GFlowNets for drug discovery. Off
          the clock: long runs, cooking, books, and a camera.
        </p>

        <SocialLinks />
      </div>
    </header>
  );
}

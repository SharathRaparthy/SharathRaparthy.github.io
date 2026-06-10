import SocialLinks from './SocialLinks.tsx';
import type { OrgLogo } from '../data/news.tsx';

function Org({ href, logo, label }: { href: string; logo: OrgLogo; label: string }) {
  return (
    <a className="org-link" href={href}>
      <img
        className="org-inline"
        src={`/logos/${logo}.png`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
      />
      <span>{label}</span>
    </a>
  );
}

function HighlightLogos({ logos }: { logos: OrgLogo[] }) {
  return (
    <span className="highlight-logos" aria-hidden="true">
      {logos.map((logo) => (
        <img key={logo} src={`/logos/${logo}.png`} alt="" width={20} height={20} loading="lazy" />
      ))}
    </span>
  );
}

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
          Research Engineer at&nbsp;
          <Org href="https://deepmind.google/" logo="deepmind" label="Google DeepMind" />
        </p>

        <h1 className="hero-name">Sharath Chandra Raparthy</h1>

        <p className="hero-lede">
          Building <span className="gradient-text">open-ended systems</span> that keep inventing,
          learning, and surprising us.
        </p>

        <p className="hero-bio">
          Previously at <Org href="https://www.reka.ai/" logo="reka" label="Reka AI" /> building
          multimodal agents, and an AI Resident at{' '}
          <Org href="https://ai.meta.com/" logo="meta" label="FAIR (Meta)" /> — core contributor to{' '}
          <a href="https://arxiv.org/abs/2407.21783">Llama 3</a> and co-lead of{' '}
          <a href="https://arxiv.org/abs/2402.16822">Rainbow Teaming</a>. Master&apos;s from{' '}
          <Org href="https://mila.quebec/en/" logo="mila" label="Mila" /> with{' '}
          <a href="https://sites.google.com/site/irinarish/">Irina Rish</a>; GFlowNets for drug
          discovery at <Org href="https://www.recursion.com" logo="recursion" label="Recursion" />.
          Off the clock: long runs, cooking, books, a camera.
        </p>

        <SocialLinks />
      </div>

      <div className="hero-highlights">
        <div className="highlight-card">
          <HighlightLogos logos={['meta']} />
          <span className="highlight-kicker">Flagship</span>
          <span className="highlight-title">Llama 3</span>
          <span className="highlight-sub">Core contributor — tool-use &amp; math reasoning</span>
        </div>
        <div className="highlight-card">
          <HighlightLogos logos={['neurips', 'icml', 'iclr']} />
          <span className="highlight-kicker">Published at</span>
          <span className="highlight-title">NeurIPS · ICML · ICLR</span>
          <span className="highlight-sub">11 papers, incl. an ICLR Spotlight</span>
        </div>
        <div className="highlight-card">
          <HighlightLogos logos={['deepmind']} />
          <span className="highlight-kicker">Focus</span>
          <span className="highlight-title">Open-Endedness</span>
          <span className="highlight-sub">LLM reasoning · in-context RL</span>
        </div>
      </div>
    </section>
  );
}

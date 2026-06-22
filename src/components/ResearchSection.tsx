import { papers, arxivIdOf } from '../data/papers.tsx';
import abstracts from '../data/abstracts.json';
import PaperCard from './PaperCard.tsx';

const scholarlyData = {
  '@context': 'https://schema.org',
  '@graph': papers.map((paper) => {
    const arxiv = arxivIdOf(paper);
    const abstract = arxiv ? (abstracts as Record<string, string>)[arxiv] : undefined;
    return {
      '@type': 'ScholarlyArticle',
      headline: paper.title,
      url: paper.titleHref,
      ...(arxiv && { sameAs: `https://arxiv.org/abs/${arxiv}` }),
      ...(abstract && { abstract }),
    };
  }),
};

export default function ResearchSection() {
  return (
    <section className="research-section" id="research">
      <h2>Research</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyData) }}
      />
      <p className="section-lead">
        My research is about systems that keep getting better on their own — generating their own
        challenges, reasoning through them, and improving open-endedly, with recursive
        self-improvement as the north star. That thread connects open-ended red-teaming (Rainbow
        Teaming), reinforcement learning for reasoning (GLoRe, Llama 3, Reka Flash 3), research
        agents that reason over the web (Reka Research), in-context and continual RL, and generative
        models for scientific discovery (GFlowNets).
      </p>
      <div className="research-grid">
        {papers.map((paper) => (
          <PaperCard paper={paper} key={paper.title} />
        ))}
      </div>
    </section>
  );
}

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
      <div className="research-grid">
        {papers.map((paper) => (
          <PaperCard paper={paper} key={paper.title} />
        ))}
      </div>
    </section>
  );
}

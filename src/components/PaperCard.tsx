import { arxivIdOf, type Paper } from '../data/papers.tsx';
import abstracts from '../data/abstracts.json';
import { bibtexFor } from '../lib/bibtex.tsx';

export default function PaperCard({ paper }: { paper: Paper }) {
  const arxiv = arxivIdOf(paper);
  const abstract = arxiv ? (abstracts as Record<string, string>)[arxiv] : undefined;

  return (
    <div className="paper-card" data-arxiv={arxiv}>
      <div className="paper-image">
        <img src={paper.image} alt={paper.imageAlt} loading="lazy" />
      </div>
      <div className="paper-content">
        <a href={paper.titleHref} className="paper-title">
          {paper.title}
        </a>
        <div className="paper-authors">{paper.authors}</div>
        <div className="paper-meta">
          <span className="paper-org">
            <img src={`/logos/${paper.org}.png`} alt="" width={28} height={28} loading="lazy" />
            {paper.org === 'meta' ? 'Meta AI' : 'Mila'}
          </span>
          {paper.venue && <div className="paper-venue">{paper.venue}</div>}
        </div>
        <div className="paper-links">
          {paper.links.map(({ label, href }) => (
            <a className="paper-link" href={href} key={label}>
              {label}
            </a>
          ))}
          <button type="button" className="paper-expand" aria-expanded="false">
            TL;DR
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>
        </div>

        <div className="paper-extra">
          <div className="paper-extra-inner">
            <div className="extra-block">
              <span className="extra-chip">
                ✦ TL;DR <em className="ai-src" />
              </span>
              <p className="paper-ai">{paper.tldr}</p>
            </div>
            {abstract && (
              <div className="extra-block">
                <span className="extra-chip">Abstract</span>
                <p className="paper-abstract">{abstract}</p>
              </div>
            )}
            <div className="extra-block">
              <span className="extra-chip">Cite</span>
              <pre className="paper-bibtex">{bibtexFor(paper)}</pre>
              <button type="button" className="bibtex-copy">
                Copy BibTeX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

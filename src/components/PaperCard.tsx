import { arxivIdOf, type Paper } from '../data/papers.tsx';
import abstracts from '../data/abstracts.json';
import { bibtexFor } from '../lib/bibtex.tsx';

export default function PaperCard({ paper }: { paper: Paper }) {
  const arxiv = arxivIdOf(paper);
  const abstract = arxiv ? (abstracts as Record<string, string>)[arxiv] : undefined;

  return (
    <article className="paper-card" data-arxiv={arxiv}>
      <div className="paper-content">
        <a href={paper.titleHref} className="paper-title">
          {paper.title}
        </a>
        <div className="paper-authors">{paper.authors}</div>
        {paper.venue && (
          <div className="paper-venue">
            <img
              className="paper-org"
              src={`/logos/${paper.org}.png`}
              alt={paper.org === 'meta' ? 'Meta AI' : 'Mila'}
              width={16}
              height={16}
              loading="lazy"
            />
            {paper.venue}
          </div>
        )}
        <div className="paper-links">
          {paper.links.map(({ label, href }) => (
            <a className="paper-link" href={href} key={label}>
              {label}
            </a>
          ))}
          <button type="button" className="paper-expand" aria-expanded="false">
            More
          </button>
        </div>

        <div className="paper-extra">
          <div className="paper-extra-inner">
            <div className="extra-block">
              <span className="extra-label">
                Summary <em className="ai-src" />
              </span>
              <p className="paper-ai">{paper.tldr}</p>
            </div>
            {abstract && (
              <div className="extra-block">
                <span className="extra-label">Abstract</span>
                <p className="paper-abstract">{abstract}</p>
              </div>
            )}
            <div className="extra-block">
              <span className="extra-label">Cite</span>
              <pre className="paper-bibtex">{bibtexFor(paper)}</pre>
              <button type="button" className="bibtex-copy">
                Copy BibTeX
              </button>
            </div>
          </div>
        </div>
      </div>

      <a className="paper-thumb" href={paper.titleHref} tabIndex={-1} aria-hidden="true">
        <img src={paper.image} alt="" loading="lazy" />
      </a>
    </article>
  );
}

import type { Paper } from '../data/papers.tsx';
import abstracts from '../data/abstracts.json';

function arxivId(paper: Paper): string | undefined {
  for (const link of paper.links) {
    const m = link.href.match(/arxiv\.org\/abs\/([0-9.]+)/);
    if (m) return m[1];
  }
  return undefined;
}

export default function PaperCard({ paper }: { paper: Paper }) {
  const arxiv = arxivId(paper);
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
        {paper.venue && <div className="paper-venue">{paper.venue}</div>}
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
          </div>
        </div>
      </div>
    </div>
  );
}

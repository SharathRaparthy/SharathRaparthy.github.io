import type { Paper } from '../data/papers.tsx';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export default function PaperCard({ paper }: { paper: Paper }) {
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="paper-card" ref={cardRef}>
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
        </div>
        <p className="paper-description">{paper.description}</p>
      </div>
    </div>
  );
}

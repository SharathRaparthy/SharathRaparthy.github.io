import { papers } from '../data/papers.tsx';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';
import PaperCard from './PaperCard.tsx';

export default function ResearchSection() {
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <section className="research-section">
      <h2 ref={headingRef}>Research</h2>
      {papers.map((paper) => (
        <PaperCard paper={paper} key={paper.title} />
      ))}
    </section>
  );
}

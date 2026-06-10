import { papers } from '../data/papers.tsx';
import PaperCard from './PaperCard.tsx';

export default function ResearchSection() {
  return (
    <section className="research-section" id="research">
      <h2>Research</h2>
      {papers.map((paper) => (
        <PaperCard paper={paper} key={paper.title} />
      ))}
    </section>
  );
}

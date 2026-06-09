import { newsItems } from '../data/news.tsx';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export default function NewsSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className="news-section" ref={sectionRef}>
      <h2>News</h2>
      <div className="news-fade">
        <div className="news-container">
          <ul className="news-list">
            {newsItems.map((item, i) => (
              <li className="news-item" key={i}>
                <span className="news-date">{item.date}</span>
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

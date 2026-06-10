import { newsItems } from '../data/news.tsx';

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <h2>News</h2>
      <div className="news-fade" role="region" aria-label="News updates" tabIndex={0}>
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

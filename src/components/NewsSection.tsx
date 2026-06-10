import { newsItems } from '../data/news.tsx';
import { newsIcons } from '../data/icons.ts';

const VISIBLE = 6;

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <h2>News</h2>
      <div className="news-fade">
        <div className="news-container">
          <ul className="news-list">
            {newsItems.map((item, i) => (
              <li className={i < VISIBLE ? 'news-item' : 'news-item news-hidden'} key={i}>
                <span className="news-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={newsIcons[item.icon]} />
                  </svg>
                </span>
                <div className="news-body">
                  <span className="news-date">{item.date}</span>
                  <span>{item.content}</span>
                </div>
              </li>
            ))}
          </ul>
          {newsItems.length > VISIBLE && (
            <button type="button" className="news-toggle" aria-expanded="false">
              Show all {newsItems.length} updates
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

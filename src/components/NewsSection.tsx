import { newsItems } from '../data/news.tsx';

const VISIBLE = 6;

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <h2>News</h2>
      <div className="news-fade">
        <ul className="news-list">
          {newsItems.map((item, i) => (
            <li className={i < VISIBLE ? 'news-item' : 'news-item news-hidden'} key={i}>
              <span className="news-date">{item.date}</span>
              <span className="news-text">
                <img
                  className="news-logo"
                  src={`/logos/${item.icon}.png`}
                  alt=""
                  width={18}
                  height={18}
                  loading="lazy"
                />
                <span>{item.content}</span>
              </span>
            </li>
          ))}
        </ul>
        {newsItems.length > VISIBLE && (
          <button type="button" className="news-toggle" aria-expanded="false">
            Show all {newsItems.length} updates
          </button>
        )}
      </div>
    </section>
  );
}

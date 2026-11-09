import React from 'react';
import { EVENTS_DATA } from '../data/eventsData';

export default function HomeFeatured({ onNavigate, onBook }) {
  const featured = EVENTS_DATA.slice(0, 6);

  return (
    <section className="home-featured-section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow">Featured Ceremonies</div>
            <h2>Devotional Remedies &amp; Events</h2>
          </div>
          <button className="link" onClick={() => onNavigate('events')}>
            <span>View All 15 Events</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid g3">
          {featured.map((item) => (
            <article className="card" key={item.no}>
              <div className="card-img-wrap">
                <div
                  className="pic"
                  role="img"
                  aria-label={item.name}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
              <div className="body">
                <div>
                  <span className="badge-no">#{item.no}</span>
                  <h3 className="featured-card-title">{item.name}</h3>
                </div>
                <p>{item.desc}</p>
                <div className="tags">
                  {item.duration && (
                    <span className="tag2">
                      <span>{item.duration}</span>
                    </span>
                  )}
                  {item.price && (
                    <span className="tag2 price">
                      <span>₹{item.price}</span>
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn primary featured-book-btn"
                  onClick={() => onBook(`${item.no}. ${item.name}`)}
                >
                  Book Ritual
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="home-featured-footer">
          <button className="btn primary" onClick={() => onNavigate('events')}>
            View All Remedies &amp; Events (15) &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

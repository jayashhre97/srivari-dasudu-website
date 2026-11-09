import React from 'react';

const MONTHLY_EVENTS = [
  {
    id: 1,
    date: 'Ekadashi · Nov 20, 2026',
    badge: 'Upcoming Auspicious Day',
    title: 'Maha Sudarshana & Narasimha Homam',
    image: '/images/cards/event-05-sudarshana.jpg',
    desc: 'Supreme Vaishnava fire offering invoking Lord Sudarshana and Lord Narasimha to shield the family against evil eyes, legal distress, and acute hurdles.',
    location: 'Sri Mudupula Venkanna Mandapam & Live Sankalpam Stream',
    duration: '3.5 hrs',
    bookName: 'Maha Sudarshana Homam'
  },
  {
    id: 2,
    date: 'Purnima · Nov 24, 2026',
    badge: 'Full Moon Consecration',
    title: 'Sri Satyanarayana Swamy Maha Vratam',
    image: '/images/cards/event-03-satyanarayana.jpg',
    desc: 'Sacred katha parayanam of five divine chapters invoking Sri Satyanarayana Swamy for domestic happiness, progeny blessings, and business success.',
    location: 'Temple Mandapam & Remote Devotee Sankalpam',
    duration: '2.5 hrs',
    bookName: 'Satyanarayana Swamy Vratam'
  },
  {
    id: 3,
    date: 'Pradosham · Dec 08, 2026',
    badge: 'Evening Sacred Tithi',
    title: 'Sri Rudra Abhishekam with Chamakam',
    image: '/images/cards/event-06-rudra-abhishekam.jpg',
    desc: 'Sacred eleven-dravya abhishekam with pristine Vedic recitations to pacify Saturn & Rahu-Ketu doshas, granting radiant health and longevity.',
    location: 'Sri Mudupula Venkanna Mandir & Live Telecast',
    duration: '2.0 hrs',
    bookName: 'Rudra Abhishekam'
  }
];

export default function HomeMonthlyEvents({ onNavigate, onBook }) {
  return (
    <section className="temple-section events-section" aria-label="Upcoming Sacred Rituals">
      <div className="wrap">
        <div className="temple-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>Auspicious Tithis &amp; Ceremonies</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">Upcoming Sacred Rituals</h2>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>

            <p className="temple-sec-subtitle">
              Participate in powerful homams, abhishekam offerings, and vratams performed with pure desiya dravyas
              and personalized family gotra sankalpam by certified Vedic purohits.
            </p>
          </div>

          <button className="view-all-gold-btn" onClick={() => onNavigate('events')}>
            <span>View All 15 Rituals</span>
            <span className="arrow-sym">&rarr;</span>
          </button>
        </div>

        <div className="rituals-devotional-grid">
          {MONTHLY_EVENTS.map((event) => (
            <article className="temple-card ritual-card" key={event.id}>
              {/* Corner Carving Motifs */}
              <div className="card-corner corner-tl" />
              <div className="card-corner corner-tr" />
              <div className="card-corner corner-bl" />
              <div className="card-corner corner-br" />

              <div className="ritual-media-wrap">
                <img
                  src={event.image}
                  alt={event.title}
                  className="ritual-photo"
                  loading="lazy"
                />
                <div className="ritual-date-pill">
                  {event.date}
                </div>
                <div className="ritual-cat-badge">
                  {event.badge}
                </div>
              </div>

              <div className="ritual-body">
                <h3 className="ritual-title">{event.title}</h3>
                <p className="ritual-desc">{event.desc}</p>

                <div className="ritual-meta-box">
                  <div className="meta-row">
                    <span className="meta-lbl">Venue:</span>
                    <span className="meta-val">{event.location}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">Duration:</span>
                    <span className="meta-val">{event.duration}</span>
                  </div>
                </div>

                <div className="card-action-bar">
                  <button
                    type="button"
                    className="btn primary ritual-btn"
                    onClick={() => onBook(event.bookName)}
                  >
                    Book Ritual Sankalpam &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

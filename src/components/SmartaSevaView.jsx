import React from 'react';
import { SMARTA_SEVA_HAVANALU } from '../data/smartaSevaData';
import { useLanguage } from '../context/LanguageContext';

export default function SmartaSevaView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();

  const formatBookingLabel = (item) => {
    const title = isEn ? item.nameEn : item.nameTe;
    const costNote = item.cost ? `${item.cost} | ` : '';
    const seatNote = isEn ? 'Limited Seats' : 'పరిమిత సీట్లు';
    return `${title} (${costNote}${seatNote})`;
  };

  return (
    <div className="page-wrapper smartam-page smarta-seva-page">
      {/* 1. Page Hero Banner */}
      <section className="smartam-hero-header" aria-label="Samuhika Havanalu Hero">
        <div className="smartam-hero-bg-overlay" aria-hidden="true" />
        <div className="smartam-hero-frame" aria-hidden="true" />

        <div className="wrap smartam-hero-content">
          <div className="smartam-hero-badge">
            <span className="badge-star">✦</span>
            <span>
              {isEn
                ? 'Monthly Community Fire Rituals • Limited Seats'
                : 'ప్రతి మాస సామూహిక హవనాలు • పరిమిత సీట్లు'}
            </span>
            <span className="badge-star">✦</span>
          </div>

          <h1 className="smartam-hero-title">
            {isEn ? 'Samuhika Havanalu' : 'సామూహిక హవనాలు'}
          </h1>

          <div className="smartam-hero-subtitle">
            {isEn
              ? 'Sacred monthly Samuhika Havanalu performed on Chitta, Moola, Amavasya, and Swathi Nakshatra with personal Gotra Sankalpam and limited devotee seating.'
              : 'చిత్తా, మూలా, అమావాస్య మరియు స్వాతి నక్షత్రాల నాడు భక్తుల గోత్ర నామ సంకల్పంతో నిర్వహించబడే పవిత్ర మాస సామూహిక హవనాలు (పరిమిత సీట్లు మాత్రమే).'}
          </div>

          <div className="smartam-hero-actions">
            <button type="button" className="btn ghost" onClick={() => onNavigate('home')}>
              {t('common.backHome')}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() =>
                onBook(
                  isEn
                    ? 'Samuhika Havanalu (Limited Seats)'
                    : 'సామూహిక హవనాలు (పరిమిత సీట్లు)'
                )
              }
            >
              {isEn ? 'Reserve Limited Seat →' : 'పరిమిత సీటు బుక్ చేయండి →'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Prominent Limited Seats & Monthly Notice Banner */}
      <section className="wrap smartam-vizag-section">
        <div className="smartam-vizag-banner">
          <div className="smartam-vizag-ornament" aria-hidden="true">
            ✦
          </div>
          <div className="smartam-vizag-badge">
            <span className="sparkle">✦</span>
            <span>
              {isEn
                ? 'Limited Seats Available Per Monthly Havanam'
                : 'ప్రతి మాస హవనానికి పరిమిత సీట్లు మాత్రమే'}
            </span>
            <span className="sparkle">✦</span>
          </div>

          <h2 className="smartam-vizag-heading">
            {isEn
              ? 'Advance Seat Reservation Required for Samuhika Havanalu'
              : 'సామూహిక హవనాలకు ముందస్తు సీటు నమోదు తప్పనిసరి'}
          </h2>

          <p className="smartam-vizag-desc">
            {isEn ? (
              <>
                To uphold scriptural sanctity and ensure every participating family receives personal Gotra Sankalpam, seating space near the yagashala, and consecrated prasadam, only <strong>Limited Seats</strong> are allotted for each monthly Samuhika Havanam. Please reserve your seat before slots close.
              </>
            ) : (
              <>
                ప్రతి భక్త కుటుంబానికి వ్యక్తిగత గోత్ర నామ సంకల్పం, యజ్ఞశాల వద్ద ఆసన సౌకర్యం మరియు ప్రసాదం అందేలా చూడటానికి, ప్రతి మాసపు సామూహిక హవనంలో <strong>పరిమిత సీట్లు మాత్రమే</strong> అందుబాటులో ఉంటాయి. సీట్లు నిండకముందే మీ పేరు నమోదు చేసుకోండి.
              </>
            )}
          </p>

          <div className="smarta-seva-schedule-strip" aria-label="Monthly Havanam Summary">
            {SMARTA_SEVA_HAVANALU.map((item) => (
              <div className="smarta-strip-pill" key={item.id}>
                <span className="smarta-strip-star">{isEn ? item.scheduleEn : item.scheduleTe}</span>
                {item.cost && <span className="smarta-strip-cost">{item.cost}</span>}
              </div>
            ))}
          </div>

          <div className="smartam-vizag-actions">
            <button
              type="button"
              className="btn primary smartam-cta-btn"
              onClick={() =>
                onBook(
                  isEn
                    ? 'Samuhika Havanam — Limited Seat Sankalpam Booking'
                    : 'సామూహిక హవనం — పరిమిత సీటు సంకల్ప బుకింగ్'
                )
              }
            >
              {isEn ? 'Book Samuhika Havanam Seat →' : 'సామూహిక హవనం సీటు బుక్ చేయండి →'}
            </button>
            <a
              href="https://wa.me/919876543210?text=Namaskaram%2C%20I%20would%20like%20to%20reserve%20a%20limited%20seat%20for%20Monthly%20Samuhika%20Havanam."
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost smartam-wa-btn"
            >
              {isEn ? 'Enquire Seat Availability on WhatsApp' : 'సీట్ల వివరాల కోసం WhatsApp చేయండి'}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Monthly Samuhika Havanalu Cards */}
      <section className="wrap smartam-cards-section">
        <div className="temple-sec-head seva-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>
                {isEn ? 'Every Month Scheduled Community Seva' : 'ప్రతి మాస సామూహిక వైదిక సేవలు'}
              </span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">
              {isEn
                ? 'Monthly Samuhika Havanalu & Homams'
                : 'ప్రతి మాసం నిర్వహించబడే సామూహిక హవనాలు'}
            </h2>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>
          </div>
        </div>

        <div className="smartam-cards-grid">
          {SMARTA_SEVA_HAVANALU.map((item) => (
            <article className="temple-card smartam-card" key={item.id}>
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              <div className="smartam-card-media">
                <img
                  src={item.image}
                  alt={isEn ? item.nameEn : item.nameTe}
                  className="smartam-card-img"
                  style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                  loading="lazy"
                />
                <span className="smartam-card-badge">
                  {isEn ? `SAMUHIKA SEVA #${item.no}` : `సామూహిక సేవ #${item.no}`}
                </span>
                <span className="smarta-limited-badge">
                  {isEn ? item.limitedSeatsEn : item.limitedSeatsTe}
                </span>
              </div>

              <div className="smartam-card-body">
                <h3 className="smartam-card-title">
                  {isEn ? item.nameEn : item.nameTe}
                </h3>
                <div className="smartam-card-sub">
                  {isEn ? item.scheduleEn : item.scheduleTe}
                </div>

                <div className="smarta-card-price-row">
                  <div className="smarta-price-chip">
                    <span className="smarta-price-lbl">
                      {isEn ? 'Seva Contribution:' : 'సేవా రుసుము:'}
                    </span>
                    <span className="smarta-price-val">
                      {item.cost
                        ? item.cost
                        : isEn
                          ? 'Confirm at Seva Desk'
                          : 'సేవా డెస్క్ వద్ద తెలుసుకోండి'}
                    </span>
                  </div>
                  <span className="smarta-seat-pill">
                    {isEn ? '⏳ Limited Seats' : '⏳ పరిమిత సీట్లు'}
                  </span>
                </div>

                <p className="smartam-card-desc">
                  {isEn ? item.descEn : item.descTe}
                </p>

                <div className="smartam-meta-box">
                  <div className="meta-row">
                    <span className="meta-lbl">{isEn ? 'Frequency:' : 'నిర్వహణ:'}</span>
                    <span className="meta-val">{isEn ? item.scheduleEn : item.scheduleTe}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{isEn ? 'Presiding Deity:' : 'అధిష్టాన దైవం:'}</span>
                    <span className="meta-val">{isEn ? item.deityEn : item.deityTe}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{isEn ? 'Seating Policy:' : 'సీట్ల నియమం:'}</span>
                    <span className="meta-val">{isEn ? item.limitedSeatsEn : item.limitedSeatsTe}</span>
                  </div>
                </div>

                <div className="smartam-rituals-list">
                  <div className="rituals-list-title">
                    {isEn ? 'Seva Highlights:' : 'సేవా విశేషాలు:'}
                  </div>
                  <ul>
                    {(isEn ? item.highlightsEn : item.highlightsTe).map((highlight, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="smartam-card-actions">
                  <button
                    type="button"
                    className="btn primary smartam-book-btn"
                    onClick={() => onBook(formatBookingLabel(item))}
                  >
                    {item.cost
                      ? isEn
                        ? `Reserve Limited Seat (${item.cost}) →`
                        : `సీటు బుక్ చేయండి (${item.cost}) →`
                      : isEn
                        ? 'Reserve Limited Seat →'
                        : 'పరిమిత సీటు బుక్ చేయండి →'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Bottom Callout */}
      <section className="wrap smartam-bottom-cta">
        <div className="smartam-cta-box">
          <div className="cta-star-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="cta-star">✦</span>
            <span className="divider-line" />
          </div>

          <h3 className="smartam-cta-heading">
            {isEn
              ? 'Participate in Monthly Samuhika Havanalu with Your Family Sankalpam'
              : 'మీ కుటుంబ గోత్ర నామ సంకల్పంతో మాస సామూహిక హవనాలలో పాల్గొనండి'}
          </h3>
          <p className="smartam-cta-desc">
            {isEn
              ? 'Seats for Chitta Sudarshana Havanam (₹1,116), Moola Chandi Homam, Amavasya Mahalakshmi Havanam (₹1,116), and Swathi Lakshmi Narasimha Havanam are limited each month. Reserve early to confirm your family sankalpam.'
              : 'చిత్తా సుదర్శన హవనం (₹1,116), మూలా నక్షత్ర చండీ హోమం, అమావాస్య మహాలక్ష్మీ హవనం (₹1,116), మరియు స్వాతి నక్షత్ర లక్ష్మీ నరసింహ హవనం కొరకు ప్రతి నెల పరిమిత సీట్లు మాత్రమే ఉంటాయి.'}
          </p>

          <div className="smartam-cta-buttons">
            <button
              type="button"
              className="btn primary"
              onClick={() =>
                onBook(
                  isEn
                    ? 'Monthly Samuhika Havanam (Limited Seats)'
                    : 'మాస సామూహిక హవనం (పరిమిత సీట్లు)'
                )
              }
            >
              {isEn ? 'Confirm Your Seat →' : 'మీ సీటును నిర్ధారించండి →'}
            </button>
            <button
              type="button"
              className="btn ghost smartam-ghost-btn"
              onClick={() => onNavigate('contact')}
            >
              {isEn ? 'Trust Contact Desk →' : 'ట్రస్ట్ సంప్రదింపు డెస్క్ →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


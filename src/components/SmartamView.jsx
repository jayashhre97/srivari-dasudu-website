import React from 'react';
import { SMARTAM_FUNCTIONS } from '../data/smartamData';
import { useLanguage } from '../context/LanguageContext';

export default function SmartamView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();

  return (
    <div className="page-wrapper smartam-page">
      {/* 1. Page Hero Banner */}
      <section className="smartam-hero-header" aria-label="Smartam Functions Hero">
        <div className="smartam-hero-bg-overlay" aria-hidden="true" />
        <div className="smartam-hero-frame" aria-hidden="true" />

        <div className="wrap smartam-hero-content">
          <div className="smartam-hero-badge">
            <span className="badge-star">✦</span>
            <span>{t('smartam.badge')}</span>
            <span className="badge-star">✦</span>
          </div>

          <h1 className="smartam-hero-title">{t('smartam.title')}</h1>

          <div className="smartam-hero-subtitle">{t('smartam.subtitle')}</div>

          <div className="smartam-hero-actions">
            <button className="btn ghost" onClick={() => onNavigate('home')}>
              {t('common.backHome')}
            </button>
            <button
              className="btn primary"
              onClick={() => onBook('Smartam Ceremony Consultation')}
            >
              {t('nav.bookSeva')} →
            </button>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT VIZAG NOTE BANNER (AS REQUESTED BY USER) */}
      <section className="wrap smartam-vizag-section">
        <div className="smartam-vizag-banner">
          <div className="smartam-vizag-ornament" aria-hidden="true">✦</div>
          <div className="smartam-vizag-badge">
            <span className="sparkle">✦</span>
            <span>
              {isEn
                ? 'Special Purohita Seva in Visakhapatnam'
                : 'విశాఖపట్నం ప్రత్యేక సేవ'}
            </span>
            <span className="sparkle">✦</span>
          </div>

          <h2 className="smartam-vizag-heading">
            {isEn
              ? 'We are available for all auspicious ceremonies in Visakhapatnam'
              : 'విశాఖపట్నంలో అన్ని శుభకార్యాలకు మేము అందుబాటులో ఉంటాము'}
          </h2>

          <p className="smartam-vizag-desc">
            {isEn ? (
              <>
                For marriage, housewarming, Satyanarayana Vratam, barsala, Annaprasana and all Smartha samskaras at your home, function hall, or kalyanamandapam in Visakhapatnam, Founder &amp; Spiritual Guide <strong>Sri N. V. Ram Kishore Acharyulu</strong> and trained Vedic pandits personally conduct the ceremonies with scriptural precision.
              </>
            ) : (
              <>
                మీ ఇంట జరిగే వివాహం, గృహప్రవేశం, సత్యనారాయణ స్వామి వ్రతం, బారసాల, మరియు అన్నప్రాశన వంటి సమస్త స్మార్త సంస్కారాలను శాస్త్రోక్తంగా నిర్వహించడానికి విశాఖపట్నంలోని మీ స్వగృహం, ఫంక్షన్ హాల్ లేదా కల్యాణ మండపానికి వ్యవస్థాపకులు &amp; ఆధ్యాత్మిక గురువు <strong>శ్రీ ఎన్. వి. రామ కిషోర్ ఆచార్యుల వారు</strong> మరియు సుశిక్షితులైన వేద పండితులు స్వయంగా విచ్చేసి పూజా కార్యక్రమాలు జరిపిస్తారు.
              </>
            )}
          </p>

          <div className="smartam-vizag-actions">
            <button
              type="button"
              className="btn primary smartam-cta-btn"
              onClick={() => onBook(isEn ? 'Book ceremony in Visakhapatnam' : 'విశాఖపట్నంలో శుభకార్యం బుకింగ్')}
            >
              {isEn ? 'Book Ceremony in Vizag →' : 'శుభకార్యం బుక్ చేసుకోండి →'}
            </button>
            <a
              href="https://wa.me/919876543210?text=Namaskaram%20Acharyulu%20Garu,%20I%20would%20like%20to%20consult%20about%20a%20ceremony%20in%20Visakhapatnam."
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost smartam-wa-btn"
            >
              {isEn ? 'Contact on WhatsApp' : 'WhatsApp ద్వారా సంప్రదించండి'}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Section Title */}
      <section className="wrap smartam-cards-section">
        <div className="temple-sec-head seva-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>
                {isEn ? 'Sacred Domestic Ceremonies' : 'పవిత్ర గృహ శుభకార్యాలు'}
              </span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">
              {isEn
                ? '5 Essential Auspicious Smartha Functions'
                : 'స్మార్త విధులలో ముఖ్యమైన 5 శుభకార్యాలు'}
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

        {/* 4. The 5 Smartam Cards */}
        <div className="smartam-cards-grid">
          {SMARTAM_FUNCTIONS.map((item) => (
            <article className="temple-card smartam-card" key={item.id}>
              {/* Corner Ornaments */}
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              {/* Media Image Wrap */}
              <div className="smartam-card-media">
                <img
                  src={item.image}
                  alt={item.name}
                  className="smartam-card-img"
                  loading="lazy"
                />
                <span className="smartam-card-badge">SEVA #{item.no}</span>
              </div>

              {/* Card Body */}
              <div className="smartam-card-body">
                <h3 className="smartam-card-title">
                  {isEn
                    ? item.name.replace(/\s*\([\u0C00-\u0C7F\s/]+\)$/u, '').trim()
                    : item.teluguName}
                </h3>
                {isEn && <div className="smartam-card-sub">{item.subtitle}</div>}

                <p className="smartam-card-desc">{item.desc}</p>

                {/* Key Details Meta */}
                <div className="smartam-meta-box">
                  <div className="meta-row">
                    <span className="meta-lbl">{isEn ? 'Presiding Deity:' : 'అధిష్టాన దైవం:'}</span>
                    <span className="meta-val">{item.deity}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{isEn ? 'Duration:' : 'నిడివి:'}</span>
                    <span className="meta-val">{item.duration}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{isEn ? 'Location:' : 'స్థలం:'}</span>
                    <span className="meta-val">{item.location}</span>
                  </div>
                </div>

                {/* Ritual Highlights */}
                <div className="smartam-rituals-list">
                  <div className="rituals-list-title">
                    {isEn ? 'Key Rituals:' : 'కార్యక్రమ విశేషాలు:'}
                  </div>
                  <ul>
                    {item.ritualsList.map((ritual, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{ritual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="smartam-card-actions">
                  <button
                    type="button"
                    className="btn primary smartam-book-btn"
                    onClick={() => onBook(isEn ? `${item.name} (Smartam)` : `${item.teluguName} (స్మార్తం)`)}
                  >
                    {isEn ? 'Enquire about this ceremony →' : 'ఈ శుభకార్యం సంప్రదించండి →'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Bottom Consultation Callout */}
      <section className="wrap smartam-bottom-cta">
        <div className="smartam-cta-box">
          <div className="cta-star-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="cta-star">✦</span>
            <span className="divider-line" />
          </div>

          <h3 className="smartam-cta-heading">
            {isEn
              ? 'Perform your ceremony in Visakhapatnam with scriptural precision'
              : 'విశాఖపట్నంలో మీ శుభకార్యాన్ని శాస్త్రోక్తంగా జరిపించండి'}
          </h3>
          <p className="smartam-cta-desc">
            {isEn
              ? 'Muhurtham guidance, puja materials support, and Agamic Vedic chanting ensure your household ceremonies are completed fully.'
              : 'ముహూర్త నిర్ణయం, పూజా సామగ్రి మార్గదర్శనం, మరియు ఆగమోక్త వేద మంత్రోచ్ఛారణలతో మీ గృహ శుభకార్యాలు సంపూర్ణంగా నిర్వహించబడతాయి.'}
          </p>

          <div className="smartam-cta-buttons">
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook(isEn ? 'Smartam Samskara Booking' : 'స్మార్త సంస్కారాల బుకింగ్')}
            >
              {isEn ? 'Contact Directly →' : 'నేరుగా సంప్రదించండి →'}
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


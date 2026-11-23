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
          <h1 className="smartam-hero-title">{t('smartam.title')}</h1>
          <div className="smartam-hero-subtitle">{t('smartam.subtitle')}</div>
        </div>
      </section>

      {/* 2. PROMINENT VIZAG NOTE BANNER */}
      <section className="wrap smartam-vizag-section">
        <div className="smartam-vizag-banner">
          <div className="smartam-vizag-ornament" aria-hidden="true">✦</div>
          <div className="smartam-vizag-badge">
            <span className="sparkle">✦</span>
            <span>{t('smartam.vizagBadge')}</span>
            <span className="sparkle">✦</span>
          </div>

          <h2 className="smartam-vizag-heading">{t('smartam.vizagHeading')}</h2>

          <p className="smartam-vizag-desc">{t('smartam.vizagDesc')}</p>

          <div className="smartam-vizag-actions">
            <button
              type="button"
              className="btn primary smartam-cta-btn"
              onClick={() => onBook(isEn ? 'Book ceremony in Visakhapatnam' : 'విశాఖపట్నంలో శుభకార్యం బుకింగ్')}
            >
              {t('smartam.bookVizag')}
            </button>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                isEn
                  ? 'Namaskaram Acharyulu Garu, I would like to consult about a ceremony in Visakhapatnam.'
                  : 'నమస్కారం ఆచార్యులు గారు, విశాఖపట్నంలో శుభకార్యం గురించి సంప్రదించాలనుకుంటున్నాను.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost smartam-wa-btn"
            >
              {t('smartam.contactWa')}
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
              <span>{t('smartam.secEyebrow')}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">{t('smartam.secTitle')}</h2>

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
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              <div className={`smartam-card-media ${item.fit === 'contain' ? 'media-contain' : ''}`}>
                <img
                  src={item.image}
                  alt={isEn ? item.name : item.teluguName}
                  className={`smartam-card-img ${item.fit === 'contain' ? 'is-contain' : ''}`}
                  style={{
                    objectPosition: item.imagePosition || 'center',
                    objectFit: item.fit || 'cover'
                  }}
                  loading="lazy"
                />
                <span className="smartam-card-badge">{t('smartam.sevaNo', { no: item.no })}</span>
              </div>

              <div className="smartam-card-body">
                <h3 className="smartam-card-title">
                  {isEn
                    ? item.name.replace(/\s*\([\u0C00-\u0C7F\s/]+\)$/u, '').trim()
                    : item.teluguName}
                </h3>
                {isEn ? (
                  <div className="smartam-card-sub">{item.subtitle}</div>
                ) : (
                  item.subtitleTe && <div className="smartam-card-sub">{item.subtitleTe}</div>
                )}

                <p className="smartam-card-desc">{isEn ? item.desc : item.descTe}</p>

                <div className="smartam-meta-box">
                  <div className="meta-row">
                    <span className="meta-lbl">{t('smartam.deity')}</span>
                    <span className="meta-val">{isEn ? item.deity : item.deityTe}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{t('smartam.duration')}</span>
                    <span className="meta-val">{isEn ? item.duration : item.durationTe}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{t('smartam.location')}</span>
                    <span className="meta-val">{isEn ? item.location : item.locationTe}</span>
                  </div>
                </div>

                <div className="smartam-rituals-list">
                  <div className="rituals-list-title">{t('smartam.keyRituals')}</div>
                  <ul>
                    {(isEn ? item.ritualsList : item.ritualsListTe).map((ritual, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{ritual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="smartam-card-actions">
                  <button
                    type="button"
                    className="btn primary smartam-book-btn"
                    onClick={() => onBook(isEn ? `${item.name} (Smartam)` : `${item.teluguName} (స్మార్తం)`)}
                  >
                    {t('smartam.enquire')}
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

          <h3 className="smartam-cta-heading">{t('smartam.ctaHeading')}</h3>
          <p className="smartam-cta-desc">{t('smartam.ctaDesc')}</p>

          <div className="smartam-cta-buttons">
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook(isEn ? 'Smartam Samskara Booking' : 'స్మార్త సంస్కారాల బుకింగ్')}
            >
              {t('smartam.contactDirect')}
            </button>
            <button
              type="button"
              className="btn ghost smartam-ghost-btn"
              onClick={() => onNavigate('contact')}
            >
              {t('smartam.trustDesk')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

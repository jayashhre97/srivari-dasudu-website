import React from 'react';
import { REMEDIES_DATA } from '../data/remediesData';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryDesc, getCategoryTitle } from '../utils/remedyLocale';

export default function HomeRemedies({ onNavigate }) {
  const { t, isEn } = useLanguage();

  return (
    <section className="temple-section remedies-section" aria-label="Featured Spiritual Remedies">
      <div className="wrap">
        <div className="temple-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>{t('home.remedies.eyebrow')}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">{t('home.remedies.title')}</h2>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z"
                  fill="#C9972D"
                />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>

            <p className="temple-sec-subtitle">{t('home.remedies.subtitle')}</p>
          </div>

          <button type="button" className="view-all-gold-btn" onClick={() => onNavigate('remedies')}>
            <span>{t('home.remedies.viewAll')}</span>
            <span className="arrow-sym">&rarr;</span>
          </button>
        </div>

        <div className="home-remedies-grid">
          {REMEDIES_DATA.slice(0, 4).map((rem) => (
            <article key={rem.id} className="remedy-devotional-card">
              <span className="card-corner corner-tl" aria-hidden="true" />
              <span className="card-corner corner-tr" aria-hidden="true" />
              <span className="card-corner corner-bl" aria-hidden="true" />
              <span className="card-corner corner-br" aria-hidden="true" />

              <div
                className="remedy-card-image-wrap is-clickable"
                onClick={() => onNavigate(`remedy/${rem.id}`)}
              >
                <img
                  src={rem.image}
                  alt={getCategoryTitle(rem, isEn)}
                  className="remedy-card-img"
                  loading="lazy"
                />
                <div className="remedy-img-gradient" aria-hidden="true" />
              </div>

              <div className="remedy-card-content">
                <div className="remedy-title-group">
                  <h3
                    className="remedy-card-heading is-clickable"
                    onClick={() => onNavigate(`remedy/${rem.id}`)}
                  >
                    {getCategoryTitle(rem, isEn)}
                  </h3>
                </div>

                <p className="remedy-card-desc">{getCategoryDesc(rem, isEn)}</p>
                <div className="remedy-card-divider" aria-hidden="true" />

                <div className="remedy-card-actions">
                  <a
                    href={`#/remedy/${rem.id}`}
                    className="btn primary remedy-view-action-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`remedy/${rem.id}`);
                    }}
                  >
                    <span>{t('home.remedies.viewAll')}</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

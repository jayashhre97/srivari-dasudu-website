import React from 'react';
import { REMEDIES_DATA } from '../data/remediesData';
import { useLanguage } from '../context/LanguageContext';

export default function HomeRemedies({ onNavigate }) {
  const { t } = useLanguage();

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
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>

            <p className="temple-sec-subtitle">{t('home.remedies.subtitle')}</p>
          </div>

          <button
            type="button"
            className="view-all-gold-btn"
            onClick={() => onNavigate('remedies')}
          >
            <span>{t('home.remedies.viewAll')}</span>
            <span className="arrow-sym">&rarr;</span>
          </button>
        </div>

        {/* 2-Column Home Remedies Grid Matching Remedies Page Cards */}
        <div className="home-remedies-grid">
          {REMEDIES_DATA.map((rem) => (
            <article key={rem.id} className="remedy-devotional-card">
              {/* 4 Corner Ornaments */}
              <span className="card-corner corner-tl" aria-hidden="true" />
              <span className="card-corner corner-tr" aria-hidden="true" />
              <span className="card-corner corner-bl" aria-hidden="true" />
              <span className="card-corner corner-br" aria-hidden="true" />

              {/* 1. Image Area (16:9 Aspect Ratio) */}
              <div
                className="remedy-card-image-wrap is-clickable"
                onClick={() => onNavigate(`remedy/${rem.id}`)}
              >
                <img
                  src={rem.image}
                  alt={rem.fullTitle}
                  className="remedy-card-img"
                  loading="lazy"
                />
                <div className="remedy-img-gradient" aria-hidden="true" />
                
                {/* Remedy Badge */}
                <div className="remedy-card-badge">
                  <span>{rem.remedyNo}</span>
                </div>

                {/* Play Video Pill Overlay on Image */}
                <div className="remedy-img-play-hint">
                  <span className="play-triangle">▶</span>
                  <span>Watch Video</span>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="remedy-card-content">
                {/* 2. Name */}
                <div className="remedy-title-group">
                  <h3
                    className="remedy-card-heading is-clickable"
                    onClick={() => onNavigate(`remedy/${rem.id}`)}
                  >
                    {rem.title}
                  </h3>
                  <div className="remedy-card-subtitle">
                    ({rem.subtitle})
                  </div>
                </div>

                {/* 3. Description */}
                <p className="remedy-card-desc">
                  {rem.desc}
                </p>

                {/* Fine Gold Divider */}
                <div className="remedy-card-divider" aria-hidden="true" />

                {/* 4. Button: View Remedy (Opens Dedicated Page) */}
                <div className="remedy-card-actions">
                  <a
                    href={`#/remedy/${rem.id}`}
                    className="btn primary remedy-view-action-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`remedy/${rem.id}`);
                    }}
                  >
                    <span className="play-icon-sm">▶</span>
                    <span>View Remedy</span>
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

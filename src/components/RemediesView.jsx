import React, { useState } from 'react';
import LotusDivider from './LotusDivider';
import { REMEDIES_DATA } from '../data/remediesData';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryDesc, getCategoryTitle } from '../utils/remedyLocale';

export default function RemediesView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const displayedRemedies = activeTab === 'all'
    ? REMEDIES_DATA
    : REMEDIES_DATA.filter((rem) => rem.id === activeTab);

  return (
    <div className="page-wrapper remedies-page-wrapper">
      <section className="remedies-hero-header" aria-label="Spiritual Guidance and Remedies Hero">
        <div className="remedies-hero-bg-overlay" aria-hidden="true" />
        <div className="remedies-hero-mandala-left" aria-hidden="true" />
        <div className="remedies-hero-mandala-right" aria-hidden="true" />

        <div className="remedies-hero-corner corner-tl" aria-hidden="true" />
        <div className="remedies-hero-corner corner-tr" aria-hidden="true" />
        <div className="remedies-hero-corner corner-bl" aria-hidden="true" />
        <div className="remedies-hero-corner corner-br" aria-hidden="true" />

        <div className="remedies-container remedies-hero-content">
          <h1 className="remedies-hero-title">{t('remedies.title')}</h1>
          <p className="remedies-hero-desc">{t('remedies.desc')}</p>
        </div>
      </section>

      <section className="remedies-intro-section" aria-label="Sacred Remedies Categories">
        <div className="remedies-container">
          {/* Quick Navigation Category Horizontal Scroll Tabs */}
          <div className="remedies-tabs-container">
            <div className="remedies-tabs-scroll" role="tablist" aria-label="Remedy Categories Quick Navigation">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'all'}
                className={`remedy-tab-pill ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <span>{isEn ? 'All Categories' : 'అన్ని వర్గాలు'}</span>
                <span className="tab-badge">({REMEDIES_DATA.length})</span>
              </button>
              {REMEDIES_DATA.map((rem) => {
                const title = getCategoryTitle(rem, isEn);
                const count = rem.items?.length || 0;
                return (
                  <button
                    key={rem.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === rem.id}
                    className={`remedy-tab-pill ${activeTab === rem.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(rem.id)}
                  >
                    <span>{title}</span>
                    <span className="tab-badge">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="remedies-cards-grid" aria-live="polite">
            {displayedRemedies.map((rem) => (
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
                      <span>{t('remedies.viewAll')}</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="remedies-cta-box" aria-label="Priest Guidance Sankalpam">
            <div className="remedies-cta-frame" aria-hidden="true" />
            <div className="remedies-cta-inner">
              <div className="remedies-cta-eyebrow">
                <span>✦</span>
                <span>{t('remedies.ctaEyebrow')}</span>
                <span>✦</span>
              </div>

              <h3 className="remedies-cta-title">{t('remedies.ctaTitle')}</h3>
              <LotusDivider className="remedies-cta-divider" />
              <p className="remedies-cta-desc">{t('remedies.ctaDesc')}</p>

              <div className="remedies-cta-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => onBook(isEn ? 'General Remedy Consultation & Sankalpam' : 'సాధారణ పరిహార సంప్రదింపు & సంకల్పం')}
                >
                  {t('remedies.consultPriest')}
                </button>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    isEn
                      ? 'Namaskaram Acharyulu Garu, I would like to consult regarding Devotional Remedies and Parayanam.'
                      : 'నమస్కారం ఆచార్యులు గారు, భక్తి పరిహారాలు మరియు పారాయణం గురించి సంప్రదించాలనుకుంటున్నాను.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost remedies-wa-btn"
                >
                  {t('remedies.waEnquiry')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

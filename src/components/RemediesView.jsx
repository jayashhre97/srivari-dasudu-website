import React, { useState } from 'react';
import LotusDivider from './LotusDivider';
import { REMEDIES_DATA, YOUTUBE_CHANNEL_URL } from '../data/remediesData';
import { useLanguage } from '../context/LanguageContext';

export default function RemediesView({ onNavigate, onBook }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Remedies', count: REMEDIES_DATA.length },
    { id: 'health', label: 'Health & Healing', count: REMEDIES_DATA.filter(r => r.category === 'health').length },
    { id: 'prosperity', label: 'Prosperity', count: REMEDIES_DATA.filter(r => r.category === 'prosperity').length },
    { id: 'family', label: 'Family & Marriage', count: REMEDIES_DATA.filter(r => r.category === 'family').length },
    { id: 'peace', label: 'Peace & Protection', count: REMEDIES_DATA.filter(r => r.category === 'peace').length }
  ];

  const filteredRemedies = selectedCategory === 'all'
    ? REMEDIES_DATA
    : REMEDIES_DATA.filter(rem => rem.category === selectedCategory);

  return (
    <div className="page-wrapper remedies-page-wrapper">
      {/* 1. Remedies Hero Section */}
      <section className="remedies-hero-header" aria-label="Spiritual Guidance and Remedies Hero">
        <div className="remedies-hero-bg-overlay" aria-hidden="true" />
        <div className="remedies-hero-mandala-left" aria-hidden="true" />
        <div className="remedies-hero-mandala-right" aria-hidden="true" />

        {/* Decorative corner motifs */}
        <div className="remedies-hero-corner corner-tl" aria-hidden="true" />
        <div className="remedies-hero-corner corner-tr" aria-hidden="true" />
        <div className="remedies-hero-corner corner-bl" aria-hidden="true" />
        <div className="remedies-hero-corner corner-br" aria-hidden="true" />

        <div className="remedies-container remedies-hero-content">
          <div className="remedies-hero-badge">
            <span className="badge-star">✦</span>
            <span>{t('remedies.badge')}</span>
            <span className="badge-star">✦</span>
          </div>

          <h1 className="remedies-hero-title">{t('remedies.title')}</h1>

          <p className="remedies-hero-desc">{t('remedies.desc')}</p>

          <div className="remedies-hero-actions">
            <button
              type="button"
              className="btn ghost remedies-back-btn"
              onClick={() => onNavigate('home')}
            >
              {t('common.backHome')}
            </button>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost remedies-yt-channel-btn"
            >
              <span>📺 YouTube Channel (@Srivari.Dasudu)</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Decorative Section Introduction */}
      <section className="remedies-intro-section" aria-label="Sacred Parayanam Introduction">
        <div className="remedies-container">
          <div className="remedies-intro-header">
            <div className="remedies-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>SACRED PARAYANAM &amp; PRAYASCHITTA</span>
              <span className="eyebrow-accent">✦</span>
            </div>

            <h2 className="remedies-section-title">Choose Your Spiritual Remedy</h2>

            <LotusDivider className="remedies-intro-divider" />

            <p className="remedies-intro-desc">
              Every remedy and parayanam is prescribed in strict accordance with the Agama Shastras and Jyotishya traditions,
              customized to your family's Janma Nakshatra and Gotra Sankalpam for lasting spiritual fulfillment and divine protection.
            </p>
          </div>

          {/* 3. Sacred Purpose Selector */}
          <div className="remedies-filter-container" role="tablist" aria-label="Remedy Categories">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`remedy-filter-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="pill-dot">{isActive ? '●' : '○'}</span>
                  <span className="pill-text">{cat.label}</span>
                  <span className="pill-badge">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* 4. Remedies Cards Collection Grid: Image, Name, Description, and View Remedy Button */}
          <div className="remedies-cards-grid" aria-live="polite">
            {filteredRemedies.map((rem) => (
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

                  {/* 4. Button: View Remedy (Opens in Dedicated Page) */}
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

          {filteredRemedies.length === 0 && (
            <div className="remedies-empty-state">
              <p>No remedies found for the selected category.</p>
              <button
                type="button"
                className="btn ghost"
                onClick={() => setSelectedCategory('all')}
              >
                View All Remedies
              </button>
            </div>
          )}

          {/* 5. Bottom Consultation Call-to-Action Section */}
          <div className="remedies-cta-box" aria-label="Priest Guidance Sankalpam">
            <div className="remedies-cta-frame" aria-hidden="true" />
            <div className="remedies-cta-inner">
              <div className="remedies-cta-eyebrow">
                <span>✦</span>
                <span>VEDIC GUIDANCE &amp; JYOTISHYA PARAYANAM</span>
                <span>✦</span>
              </div>

              <h3 className="remedies-cta-title">
                Need Guidance for Your Sankalpam?
              </h3>

              <LotusDivider className="remedies-cta-divider" />

              <p className="remedies-cta-desc">
                Not sure which Vedic parayanam or spiritual remedy aligns best with your astrological chart and family gotra?
                Consult Chief Priest Sri N. V. Ram Kishore Acharyulu for authentic Agamic guidance and personalized sankalpam.
              </p>

              <div className="remedies-cta-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => onBook('General Remedy Consultation & Sankalpam')}
                >
                  Consult the Priest &rarr;
                </button>
                <a
                  href="https://wa.me/919876543210?text=Namaskaram%20Acharyulu%20Garu,%20I%20would%20like%20to%20consult%20regarding%20Devotional%20Remedies%20and%20Parayanam."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost remedies-wa-btn"
                >
                  WhatsApp Enquiry &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

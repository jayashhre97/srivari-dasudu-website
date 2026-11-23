import React, { useState, useMemo } from 'react';
import { KAMYAMU_HOMAMS } from '../data/kamyamuData';
import { KAMYAMU_PRICE_WITHOUT_SAMAGRI, formatInr } from '../data/kamyamuPricing';
import { useLanguage } from '../context/LanguageContext';

const openKamyamuBooking = (onBook, serviceName) => {
  onBook({ serviceName, pricingType: 'kamyamu' });
};

export default function KamyamuView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredHomams = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return KAMYAMU_HOMAMS;
    return KAMYAMU_HOMAMS.filter((h) => {
      const desc = isEn ? h.desc : h.descTe;
      const fruits = isEn ? h.fruits : h.fruitsTe;
      return (
        h.name.toLowerCase().includes(q) ||
        h.teluguName.toLowerCase().includes(q) ||
        (desc || '').toLowerCase().includes(q) ||
        (fruits || '').toLowerCase().includes(q)
      );
    });
  }, [search, isEn]);

  const handleReset = () => {
    setSearch('');
  };

  const categoryLabel = (cat) => t(`kamyamu.cat.${cat}`);

  return (
    <div className="page-wrapper kamyamu-page">
      <section className="kamyamu-hero-header" aria-label="Kamyamu Homams Hero">
        <div className="kamyamu-hero-bg-overlay" aria-hidden="true" />
        <div className="kamyamu-hero-frame" aria-hidden="true" />

        <div className="wrap kamyamu-hero-content">
          <h1 className="kamyamu-hero-title">{t('kamyamu.title')}</h1>
          <div className="kamyamu-hero-subtitle">{t('kamyamu.subtitle')}</div>
        </div>
      </section>

      <section className="page-section wrap">
        <div className="filter-bar kamyamu-search-bar">
          <div className="search-box-wrap">
            <input
              type="search"
              className="search-in"
              placeholder={t('kamyamu.searchPh')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                aria-label="Clear search query"
                onClick={() => setSearch('')}
              >
                &times;
              </button>
            )}
          </div>
        </div>

        <div className="kamyamu-result-count">
          {t('kamyamu.showing', {
            shown: filteredHomams.length,
            total: KAMYAMU_HOMAMS.length
          })}
        </div>

        <div className="rituals-devotional-grid">
          {filteredHomams.map((item) => (
            <article className="temple-card ritual-card" key={item.no}>
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              <div className="ritual-media-wrap">
                <div
                  className="ritual-photo"
                  role="img"
                  aria-label={isEn ? item.name : item.teluguName}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <span className="ritual-date-pill">{t('kamyamu.homaNo', { no: item.no })}</span>
                <span className="ritual-cat-badge">{categoryLabel(item.category)}</span>
              </div>

              <div className="ritual-body">
                <h3 className="ritual-title">
                  {isEn
                    ? item.name.replace(/\s*\([\u0C00-\u0C7F\s/]+\)$/u, '').trim()
                    : item.teluguName}
                </h3>
                <p className="ritual-desc">{isEn ? item.desc : item.descTe}</p>

                <div className="kamyamu-benefits-pill">
                  <span className="fruits-icon">✦</span>
                  <span className="fruits-text">
                    <strong>{t('kamyamu.benefit')}</strong>{' '}
                    {isEn ? item.fruits : item.fruitsTe}
                  </span>
                </div>

                <div className="ritual-meta-box">
                  {(isEn ? item.duration : item.durationTe) && (
                    <div className="meta-row">
                      <span className="meta-lbl">{t('kamyamu.duration')}</span>
                      <span className="meta-val">{isEn ? item.duration : item.durationTe}</span>
                    </div>
                  )}
                  {(isEn ? item.deity : item.deityTe) && (
                    <div className="meta-row">
                      <span className="meta-lbl">{t('kamyamu.deity')}</span>
                      <span className="meta-val">{isEn ? item.deity : item.deityTe}</span>
                    </div>
                  )}
                </div>

                <div className="kamyamu-price-box kamyamu-price-box--simple">
                  <span className="meta-lbl">{t('kamyamu.dakshina')}</span>
                  <strong className="kamyamu-price-single">
                    {formatInr(KAMYAMU_PRICE_WITHOUT_SAMAGRI)}
                  </strong>
                </div>

                <div className="card-action-bar">
                  <button
                    type="button"
                    className="btn primary ritual-btn"
                    onClick={() =>
                      openKamyamuBooking(
                        onBook,
                        isEn
                          ? `${item.no}. ${item.name} (Kamyamu)`
                          : `${item.no}. ${item.teluguName} (కామ్యము)`
                      )
                    }
                  >
                    {t('kamyamu.book')}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredHomams.length === 0 && (
          <div className="temple-card kamyamu-empty-state">
            <h3 className="kamyamu-empty-title">{t('kamyamu.emptyTitle')}</h3>
            <p className="kamyamu-empty-text">{t('kamyamu.emptyText')}</p>
            <button type="button" className="btn primary" onClick={handleReset}>
              {t('kamyamu.reset')}
            </button>
          </div>
        )}
      </section>

      <section className="wrap smartam-bottom-cta">
        <div className="smartam-cta-box">
          <div className="cta-star-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="cta-star">✦</span>
            <span className="divider-line" />
          </div>

          <h3 className="smartam-cta-heading">{t('kamyamu.ctaHeading')}</h3>
          <p className="smartam-cta-desc">{t('kamyamu.ctaDesc')}</p>

          <div className="smartam-cta-buttons">
            <button
              type="button"
              className="btn primary"
              onClick={() =>
                openKamyamuBooking(
                  onBook,
                  isEn ? 'Kamyamu Homam Sankalpam Booking' : 'కామ్య హోమ సంకల్ప బుకింగ్'
                )
              }
            >
              {t('kamyamu.enquire')}
            </button>
            <button
              type="button"
              className="btn ghost smartam-ghost-btn"
              onClick={() => onNavigate('contact')}
            >
              {t('kamyamu.trustDesk')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect } from 'react';
import { REMEDIES_DATA, YOUTUBE_CHANNEL_URL } from '../data/remediesData';
import { useLanguage } from '../context/LanguageContext';
import {
  getCategoryDesc,
  getCategorySubtitle,
  getCategoryTitle,
  getItemTitle
} from '../utils/remedyLocale';

const CARD_IMAGES = [
  '/images/cards/remedy-2-prosperity.jpg',
  '/images/cards/remedy-3-family.jpg',
  '/images/cards/event-11-lakshmi-ganapathi.jpg',
  '/images/cards/event-14-lakshmi.jpg',
  '/images/cards/remedy-1-health.jpg',
  '/images/family.jpg',
  '/images/cards/remedy-4-peace.jpg',
  '/images/homam.jpg',
  '/images/parayanam.jpg',
  '/images/cards/event-01-homam.jpg'
];

export default function RemedyDetailPage({ remedyId, onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const remedy = REMEDIES_DATA.find((r) => r.id === remedyId) || REMEDIES_DATA[0];
  const items = remedy.items || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [remedyId]);

  const viewRemedy = (item) => onNavigate(`remedy/${remedy.id}/${item.no}`);
  const cardImage = (index) => CARD_IMAGES[index % CARD_IMAGES.length] || remedy.image;
  const categoryTitle = getCategoryTitle(remedy, isEn);

  return (
    <div className="page-wrapper remedy-detail-page-wrapper">
      <section className="remedy-detail-hero" aria-label="Remedy Category Header">
        <div className="remedy-detail-hero-frame" aria-hidden="true" />

        <div className="remedies-container">
          <div className="remedy-detail-header-content">
            <div className="remedy-detail-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>
                {isEn
                  ? `${String(items.length).padStart(2, '0')} Remedies`
                  : `${items.length} పరిహారాలు`}
              </span>
              <span className="eyebrow-accent">✦</span>
            </div>

            <h1 className="remedy-detail-title">{categoryTitle}</h1>
            <div className="remedy-detail-subtitle">({getCategorySubtitle(remedy, isEn)})</div>
            <p className="remedy-detail-lead">{getCategoryDesc(remedy, isEn)}</p>
          </div>
        </div>
      </section>

      <section className="remedy-detail-body-section" aria-label="Category Remedies">
        <div className="remedies-container remedy-detail-inner-wrap">
          <div className="remedy-detail-body-nav">
            <button
              type="button"
              className="btn ghost remedy-nav-back-btn"
              onClick={() => onNavigate('remedies')}
            >
              {t('remedies.backAll')}
            </button>
          </div>

          <div className="remedy-items-section-head">
            <h2>{t('remedies.allInCategory')}</h2>
            <p>{t('remedies.allInCategoryDesc')}</p>
          </div>

          <div className="remedy-items-grid">
            {items.map((item, index) => {
              const title = getItemTitle(item, isEn);
              return (
                <article key={item.no} className="remedy-devotional-card remedy-item-visual-card">
                  <span className="card-corner corner-tl" aria-hidden="true" />
                  <span className="card-corner corner-tr" aria-hidden="true" />
                  <span className="card-corner corner-bl" aria-hidden="true" />
                  <span className="card-corner corner-br" aria-hidden="true" />

                  <div
                    className="remedy-card-image-wrap is-clickable"
                    onClick={() => viewRemedy(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && viewRemedy(item)}
                  >
                    <img
                      src={cardImage(index)}
                      alt={title}
                      className="remedy-card-img"
                      loading="lazy"
                    />
                    <div className="remedy-img-gradient" aria-hidden="true" />
                  </div>

                  <div className="remedy-card-content">
                    <div className="remedy-title-group">
                      <h3
                        className="remedy-card-heading is-clickable"
                        onClick={() => viewRemedy(item)}
                      >
                        {title}
                      </h3>
                    </div>

                    <div className="remedy-card-divider" aria-hidden="true" />

                    <div className="remedy-card-actions">
                      <button
                        type="button"
                        className="btn primary remedy-view-action-btn"
                        onClick={() => viewRemedy(item)}
                      >
                        <span>{t('remedies.viewRemedy')}</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="remedy-detail-support-row">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
            >
              {t('remedies.watchYt')}
            </a>
            <button
              type="button"
              className="btn primary"
              onClick={() =>
                onBook(isEn ? remedy.book : `${categoryTitle} — పరిహార మార్గదర్శనం`)
              }
            >
              {t('remedies.consultCategory')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

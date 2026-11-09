import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function HomeGosevaUpdates({ onNavigate, onBook }) {
  const { t } = useLanguage();

  return (
    <section className="goseva-home-section-80vh" aria-label="Kamadhenu Samrakshana & Cow Protection">
      <div className="wrap goseva-80vh-wrap">
        <div className="goseva-compact-card">
          <div className="goseva-eyebrow-badge">
            <span className="eyebrow-symbol">✦</span>
            <span>{t('home.goseva.eyebrow')}</span>
            <span className="eyebrow-symbol">✦</span>
          </div>

          <h2 className="goseva-compact-title">{t('home.goseva.title')}</h2>
          <div className="goseva-compact-telugu">{t('home.goseva.telugu')}</div>
          <p className="goseva-compact-desc">{t('home.goseva.desc')}</p>

          <div className="goseva-compact-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onNavigate('godhanam')}
            >
              {t('home.goseva.contribute')}
            </button>
            <button
              type="button"
              className="btn ghost goseva-ghost-btn"
              onClick={() => onBook('Maha Go Dhanam Sankalpam')}
            >
              {t('home.goseva.sponsor')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

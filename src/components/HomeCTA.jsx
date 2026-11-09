import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function HomeCTA({ onNavigate, onBook }) {
  const { t } = useLanguage();

  return (
    <section className="home-closing-cta" aria-label="Devotional Surrender Call to Action">
      <div className="cta-mandala-bg" aria-hidden="true" />
      <div className="cta-temple-arch-frame" aria-hidden="true">
        <div className="arch-corner arch-tl" />
        <div className="arch-corner arch-tr" />
        <div className="arch-corner arch-bl" />
        <div className="arch-corner arch-br" />
      </div>

      <div className="wrap cta-content-wrap">
        <h2 className="cta-main-title">{t('home.cta.title')}</h2>

        <div className="temple-lotus-divider" aria-hidden="true">
          <span className="divider-line" />
          <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2C15 7 10 10 7 11C11 13 14 16 17 20C20 16 23 13 27 11C24 10 19 7 17 2Z" fill="#C9972D" />
            <path d="M17 6C16 9 13 11 11 12C13 13 15 15 17 18C19 15 21 13 23 12C21 11 18 9 17 6Z" fill="#E8B94F" />
            <circle cx="17" cy="12" r="2" fill="#FFF8E9" />
          </svg>
          <span className="divider-line" />
        </div>

        <p className="cta-subtitle">{t('home.cta.desc')}</p>

        <div className="cta-buttons-group">
          <button
            type="button"
            className="btn primary cta-btn-glow"
            onClick={() => onBook('Sacred Ritual Booking & Sankalpam')}
          >
            {t('home.cta.book')}
          </button>
          <button
            type="button"
            className="btn ghost cta-btn-outline"
            onClick={() => onNavigate('contact')}
          >
            {t('home.cta.contact')}
          </button>
        </div>
      </div>
    </section>
  );
}

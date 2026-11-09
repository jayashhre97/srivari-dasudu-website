import React from 'react';
import LotusDivider from './LotusDivider';
import { useLanguage } from '../context/LanguageContext';

export default function HomeIntroduction({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <section className="temple-intro-section" aria-label="Introduction to Srivari Dasudu">
      <div className="wrap">
        <div className="temple-intro-container home-short-intro">
          <div className="intro-corner-ornament corner-top-left" aria-hidden="true" />
          <div className="intro-corner-ornament corner-top-right" aria-hidden="true" />
          <div className="intro-corner-ornament corner-bottom-left" aria-hidden="true" />
          <div className="intro-corner-ornament corner-bottom-right" aria-hidden="true" />

          <div className="temple-intro-grid short-grid">
            <div className="intro-portrait-column">
              <div className="emblem-ornate-frame emblem-ornate-frame--compact">
                <div className="emblem-gold-ring ring-outer" />
                <div className="emblem-gold-ring ring-middle" />
                <div className="emblem-image-holder">
                  <img
                    src="/images/logo.jpg"
                    alt="Srivari Dasudu Consecrated Emblem"
                    className="emblem-photo"
                  />
                </div>
              </div>

              <div className="about-priest-badge intro-priest-badge">
                {t('home.intro.badge')}
              </div>
              <div className="intro-temple-line">
                {t('home.intro.templeLine')}
              </div>
            </div>

            <div className="intro-text-column">
              <div className="intro-eyebrow-line">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="intro-diya-icon">
                  <path d="M7 13C7 13 8 16 10 16C12 16 13 13 13 13H7Z" fill="#C9972D" />
                  <path d="M10 5C9 7 8 8 8.5 10C9 11 11 11 11.5 10C12 8 11 7 10 5Z" fill="#E8B94F" />
                  <path d="M8 17H12" stroke="#C9972D" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>{t('home.intro.eyebrow')}</span>
              </div>

              <h2 className="intro-heading intro-heading--tight">{t('home.intro.title')}</h2>
              <div className="intro-telugu-name intro-acharya-line">
                {t('home.intro.acharya')}
              </div>

              <LotusDivider align="start" />

              <p className="intro-body-lead">{t('home.intro.lead')}</p>
              <p className="intro-body-support">{t('home.intro.support')}</p>

              <div className="intro-actions-row">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => onNavigate('about')}
                >
                  {t('home.intro.readStory')}
                </button>
                <button
                  type="button"
                  className="btn ghost intro-btn-secondary"
                  onClick={() => onNavigate('contact')}
                >
                  {t('home.intro.contact')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

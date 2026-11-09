import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <section className="hero" aria-label="Sri Vari Dasudu Sacred Hero Banner">
      {/* 1. Devotional Background Video with Temple Green Overlays */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <video
          className="hero-video"
          poster="/images/hills.jpg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/home_hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      {/* 2. South Indian Temple Ornamental Frame */}
      <div className="hero-ornamental-frame" aria-hidden="true">
        {/* Top Toranam Border Filigree */}
        <div className="hero-edge-filigree top-filigree" />

        {/* 4 Corner Carving Motifs */}
        <div className="hero-corner corner-tl">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 52V12C4 7.58172 7.58172 4 12 4H52" stroke="#C6A04A" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 52V16C10 12.6863 12.6863 10 16 10H52" stroke="#D6B45A" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M4 4C14 6 22 14 24 24M4 4C6 14 14 22 24 24" stroke="#C6A04A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="22" cy="22" r="3" fill="#D6B45A" />
            <path d="M12 4C14 9 18 13 24 15M4 12C9 14 13 18 15 24" stroke="#DCCB9B" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        <div className="hero-corner corner-tr">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52 52V12C52 7.58172 48.4183 4 44 4H4" stroke="#C6A04A" strokeWidth="2" strokeLinecap="round" />
            <path d="M46 52V16C46 12.6863 43.3137 10 40 10H4" stroke="#D6B45A" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M52 4C42 6 34 14 32 24M52 4C50 14 42 22 32 24" stroke="#C6A04A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="34" cy="22" r="3" fill="#D6B45A" />
            <path d="M44 4C42 9 38 13 32 15M52 12C47 14 43 18 41 24" stroke="#DCCB9B" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        <div className="hero-corner corner-bl">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V44C4 48.4183 7.58172 52 12 52H52" stroke="#C6A04A" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 4V40C10 43.3137 12.6863 46 16 46H52" stroke="#D6B45A" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M4 52C14 50 22 42 24 32M4 52C6 42 14 34 24 32" stroke="#C6A04A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="22" cy="34" r="3" fill="#D6B45A" />
            <path d="M12 52C14 47 18 43 24 41M4 44C9 42 13 38 15 32" stroke="#DCCB9B" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        <div className="hero-corner corner-br">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52 4V44C52 48.4183 48.4183 52 44 52H4" stroke="#C6A04A" strokeWidth="2" strokeLinecap="round" />
            <path d="M46 4V40C46 43.3137 43.3137 46 40 46H4" stroke="#D6B45A" strokeWidth="1" strokeOpacity="0.75" />
            <path d="M52 52C42 50 34 42 32 32M52 52C50 42 42 34 32 32" stroke="#C6A04A" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="34" cy="34" r="3" fill="#D6B45A" />
            <path d="M44 52C42 47 38 43 32 41M52 44C47 42 43 38 41 32" stroke="#DCCB9B" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Hanging Brass Oil Lamps (Deepams) */}
        <div className="hero-lamp lamp-left">
          <svg width="36" height="110" viewBox="0 0 36 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="3" r="2.5" stroke="#C6A04A" strokeWidth="1.2" />
            <line x1="18" y1="6" x2="18" y2="58" stroke="#C6A04A" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
            <path d="M10 58C10 56 26 56 26 58L24 64H12L10 58Z" fill="#D6B45A" stroke="#C6A04A" strokeWidth="1" />
            <line x1="18" y1="64" x2="18" y2="72" stroke="#C6A04A" strokeWidth="1.8" />
            <path d="M5 76C5 86 31 86 31 76H5Z" fill="#C6A04A" stroke="#D6B45A" strokeWidth="1.2" />
            <path d="M14 86H22V91H14V86Z" fill="#B58B1E" />
            <path d="M10 91H26V93H10V91Z" fill="#C6A04A" />
            <circle cx="18" cy="98" r="2.5" fill="#D6B45A" />
            <circle cx="18" cy="71" r="6" fill="#F2CF68" fillOpacity="0.4" />
            <path d="M18 62C18 62 21.5 68.5 21.5 71.5C21.5 73.4 19.9 75 18 75C16.1 75 14.5 73.4 14.5 71.5C14.5 68.5 18 62 18 62Z" fill="#F5D77F" stroke="#D6B45A" strokeWidth="0.8" />
            <ellipse cx="18" cy="72" rx="1.5" ry="2" fill="#FFFDF8" />
          </svg>
        </div>

        <div className="hero-lamp lamp-right">
          <svg width="36" height="110" viewBox="0 0 36 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="3" r="2.5" stroke="#C6A04A" strokeWidth="1.2" />
            <line x1="18" y1="6" x2="18" y2="58" stroke="#C6A04A" strokeWidth="1.2" strokeDasharray="2.5 2.5" />
            <path d="M10 58C10 56 26 56 26 58L24 64H12L10 58Z" fill="#D6B45A" stroke="#C6A04A" strokeWidth="1" />
            <line x1="18" y1="64" x2="18" y2="72" stroke="#C6A04A" strokeWidth="1.8" />
            <path d="M5 76C5 86 31 86 31 76H5Z" fill="#C6A04A" stroke="#D6B45A" strokeWidth="1.2" />
            <path d="M14 86H22V91H14V86Z" fill="#B58B1E" />
            <path d="M10 91H26V93H10V91Z" fill="#C6A04A" />
            <circle cx="18" cy="98" r="2.5" fill="#D6B45A" />
            <circle cx="18" cy="71" r="6" fill="#F2CF68" fillOpacity="0.4" />
            <path d="M18 62C18 62 21.5 68.5 21.5 71.5C21.5 73.4 19.9 75 18 75C16.1 75 14.5 73.4 14.5 71.5C14.5 68.5 18 62 18 62Z" fill="#F5D77F" stroke="#D6B45A" strokeWidth="0.8" />
            <ellipse cx="18" cy="72" rx="1.5" ry="2" fill="#FFFDF8" />
          </svg>
        </div>

        {/* Bottom Filigree Edge */}
        <div className="hero-edge-filigree bottom-filigree" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="wrap hero-wrap">
        <h1 className="hero-heading hero-heading--mantra">
          <span className="heading-line">{t('hero.mantra')}</span>
        </h1>

        {/* Small Ornamental Gold Divider with Lotus Motif */}
        <div className="hero-lotus-divider" aria-hidden="true">
          <span className="divider-filigree left-filigree" />
          <span className="lotus-emblem-wrap">
            <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 2C21 2 25 9 25 14C25 17 23.2 18.5 21 18.5C18.8 18.5 17 17 17 14C17 9 21 2 21 2Z" fill="#D6B45A" stroke="#C6A04A" strokeWidth="1" />
              <path d="M20 6C20 6 14 11 14 15C14 17.5 16.2 18.5 18.5 18.5C20 18.5 20 17 20 15V6Z" fill="#C6A04A" fillOpacity="0.9" />
              <path d="M22 6C22 6 28 11 28 15C28 17.5 25.8 18.5 23.5 18.5C22 18.5 22 17 22 15V6Z" fill="#C6A04A" fillOpacity="0.9" />
              <path d="M15 11C15 11 8 14 8 17.5C8 19.5 10.5 20.5 13 19.5C15.5 18.5 16.5 17 16.5 15" stroke="#D6B45A" strokeWidth="1" strokeLinecap="round" />
              <path d="M27 11C27 11 34 14 34 17.5C34 19.5 31.5 20.5 29 19.5C26.5 18.5 25.5 17 25.5 15" stroke="#D6B45A" strokeWidth="1" strokeLinecap="round" />
              <path d="M12 21.5C16 22.5 26 22.5 30 21.5" stroke="#C6A04A" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="21" cy="21.5" r="1.5" fill="#D6B45A" />
            </svg>
          </span>
          <span className="divider-filigree right-filigree" />
        </div>

        {/* Hero Description */}
        <p className="hero-description">{t('hero.desc')}</p>

        {/* Hero Action Buttons */}
        <div className="hero-btn-group">
          <button
            type="button"
            className="btn primary hero-btn-primary"
            onClick={() => onNavigate('remedies')}
          >
            <span>{t('hero.remedies')}</span>
            <span className="btn-arrow">&rarr;</span>
          </button>
          <button
            type="button"
            className="btn ghost hero-btn-ghost"
            onClick={() => onNavigate('kamyamu')}
          >
            <span>{t('hero.homams')}</span>
            <span className="btn-arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}

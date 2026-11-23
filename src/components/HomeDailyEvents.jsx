import React, { useState, useEffect } from 'react';
import { DAILY_SCHEDULE } from '../data/dailySchedule';
import { useLanguage } from '../context/LanguageContext';

export default function HomeDailyEvents({ onNavigate }) {
  const { t, isEn } = useLanguage();
  const [currentHour, setCurrentHour] = useState(() => {
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentHour(d.getHours() + d.getMinutes() / 60);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const homeDailySlots = DAILY_SCHEDULE.slice(0, 4);

  return (
    <section className="temple-section daily-schedule-section" aria-label={t('home.daily.aria')}>
      <div className="wrap">
        <div className="temple-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>{t('home.daily.eyebrow')}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">{t('home.daily.title')}</h2>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>

            <p className="temple-sec-subtitle">{t('home.daily.subtitle')}</p>
          </div>

          <button className="view-all-gold-btn" onClick={() => onNavigate('daily')}>
            <span>{t('home.daily.viewAll')}</span>
            <span className="arrow-sym">&rarr;</span>
          </button>
        </div>

        <div className="temple-timeline-container">
          <div className="temple-timeline-grid">
            {homeDailySlots.map((item) => {
              const isActive = currentHour >= item.startHour && currentHour < item.endHour;
              return (
                <div
                  key={item.id}
                  className={`timeline-entry-card ${isActive ? 'is-active-entry' : ''}`}
                >
                  <div className="card-corner corner-tl" />
                  <div className="card-corner corner-tr" />
                  <div className="card-corner corner-bl" />
                  <div className="card-corner corner-br" />

                  <div className="timeline-badge-bar">
                    <div className="time-plaque">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="time-diya">
                        <path d="M6 12C6 12 7 14.5 9 14.5C11 14.5 12 12 12 12H6Z" fill="#C9972D" />
                        <path d="M9 4.5C8 6.5 7.5 7.5 8 9C8.5 10 9.5 10 10 9C10.5 7.5 10 6.5 9 4.5Z" fill="#E8B94F" />
                      </svg>
                      <span>{item.time}</span>
                    </div>

                    {isActive && (
                      <span className="active-now-tag">
                        <span className="active-pulse-dot" />
                        {t('home.daily.active')}
                      </span>
                    )}
                  </div>

                  <h3 className="timeline-title">{isEn ? item.title : item.titleTe}</h3>
                  <p className="timeline-desc">{isEn ? item.desc : item.descTe}</p>

                  <div className="timeline-card-footer">
                    <button
                      type="button"
                      className="timeline-detail-link"
                      onClick={() => onNavigate('daily')}
                    >
                      {t('home.daily.viewDetails')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

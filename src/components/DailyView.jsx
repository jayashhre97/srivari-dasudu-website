import React, { useState, useEffect } from 'react';
import { DAILY_SCHEDULE } from '../data/dailySchedule';
import { useLanguage } from '../context/LanguageContext';

export default function DailyView({ onNavigate }) {
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

  return (
    <div className="page-wrapper daily-page">
      <div className="page-banner page-banner--hills page-banner--pos-20">
        <div className="wrap">
          <div className="eyebrow">{t('daily.eyebrow')}</div>
          <h1>{t('daily.title')}</h1>
          <p className="page-banner-lead">{t('daily.lead')}</p>
          <button className="btn ghost" onClick={() => onNavigate('home')}>
            {t('common.backHome')}
          </button>
        </div>
      </div>

      <section className="page-section wrap">
        <div className="temple-card daily-full-schedule-card">
          <div className="card-corner corner-tl" />
          <div className="card-corner corner-tr" />
          <div className="card-corner corner-bl" />
          <div className="card-corner corner-br" />

          <div className="daily-schedule-header">
            <h2 className="daily-section-title">{t('daily.sectionTitle')}</h2>
            <div className="daily-section-sub">{t('daily.sectionSub')}</div>
          </div>

          <div className="daily-schedule-list">
            {DAILY_SCHEDULE.map((item) => {
              const isActive = currentHour >= item.startHour && currentHour < item.endHour;
              return (
                <div
                  className={`daily-schedule-row ${isActive ? 'is-active-now' : ''}`}
                  key={item.id}
                >
                  <div className="schedule-time-col">
                    <div className="time-plaque">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12C6 12 7 14.5 9 14.5C11 14.5 12 12 12 12H6Z" fill="#C9972D" />
                        <path d="M9 4.5C8 6.5 7.5 7.5 8 9C8.5 10 9.5 10 10 9C10.5 7.5 10 6.5 9 4.5Z" fill="#E8B94F" />
                      </svg>
                      <span>{item.time}</span>
                    </div>
                    {isActive && (
                      <span className="active-tag-badge">
                        <span className="active-pulse-dot" />
                        {t('daily.activeNow')}
                      </span>
                    )}
                  </div>

                  <div className="schedule-content-col">
                    <h3 className="schedule-item-title">{isEn ? item.title : item.titleTe}</h3>
                    <p className="schedule-item-desc">{isEn ? item.desc : item.descTe}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

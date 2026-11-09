import React, { useState, useEffect } from 'react';
import { DAILY_SCHEDULE } from '../data/dailySchedule';

export default function HomeDailyEvents({ onNavigate }) {
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
    <section className="temple-section daily-schedule-section" aria-label="Daily Devotional Schedule">
      <div className="wrap">
        <div className="temple-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>Nitya Kainkaryam &amp; Temple Timings</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">Daily Devotional Schedule</h2>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>

            <p className="temple-sec-subtitle">
              Follow the eternal five-fold daily kainkaryams performed in honor of Sri Venkateswara Swamy,
              bringing auspicious harmony, morning peace, and evening grace to every home.
            </p>
          </div>

          <button className="view-all-gold-btn" onClick={() => onNavigate('daily')}>
            <span>Complete Daily Schedule</span>
            <span className="arrow-sym">&rarr;</span>
          </button>
        </div>

        <div className="temple-timeline-container">
          <div className="temple-timeline-grid">
            {homeDailySlots.map((item, idx) => {
              const isActive = currentHour >= item.startHour && currentHour < item.endHour;
              return (
                <div
                  key={item.id}
                  className={`timeline-entry-card ${isActive ? 'is-active-entry' : ''}`}
                >
                  {/* Subtle Corner Ornaments */}
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
                        Active Kainkaryam
                      </span>
                    )}
                  </div>

                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>

                  <div className="timeline-card-footer">
                    <button
                      type="button"
                      className="timeline-detail-link"
                      onClick={() => onNavigate('daily')}
                    >
                      View Schedule Details &rarr;
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

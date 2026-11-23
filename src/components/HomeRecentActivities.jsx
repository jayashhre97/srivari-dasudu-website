import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getRecentActivities } from '../utils/adminDataService';

const DEFAULT_ACTIVITIES = [
  {
    id: 'act-gouseva',
    type: 'gouseva',
    categoryEn: 'Gouseva',
    categoryTe: 'గోసేవ',
    image: '/images/goseva/activity-feeding.jpg',
    targetPage: 'goseva'
  },
  {
    id: 'act-kamyamu',
    type: 'kamyamu',
    categoryEn: 'Kamyamu',
    categoryTe: 'కామ్యము',
    image: '/images/cards/event-05-sudarshana.jpg',
    targetPage: 'kamyamu'
  },
  {
    id: 'act-smartam',
    type: 'smartam',
    categoryEn: 'Smartam',
    categoryTe: 'స్మార్తం',
    image: '/images/smartam/house-opening.jpg',
    targetPage: 'smartam'
  },
  {
    id: 'act-remedies',
    type: 'remedies',
    categoryEn: 'Remedies',
    categoryTe: 'పరిహారాలు',
    image: '/images/cards/remedy-1-health.jpg',
    targetPage: 'remedies'
  }
];

export default function HomeRecentActivities({ onNavigate, onBook }) {
  const { isEn } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const [activitiesList, setActivitiesList] = useState(DEFAULT_ACTIVITIES);

  useEffect(() => {
    // Check localStorage first
    const local = localStorage.getItem('srivari_recent_activities');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && parsed.length > 0) setActivitiesList(parsed);
      } catch (e) {}
    }

    // Attempt Firebase fetch asynchronously
    getRecentActivities()
      .then((data) => {
        if (data && data.length > 0) {
          setActivitiesList(data);
          localStorage.setItem('srivari_recent_activities', JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  // Quadruple items to ensure seamless infinite auto-scrolling loop
  const displayActivities = [
    ...activitiesList,
    ...activitiesList,
    ...activitiesList,
    ...activitiesList
  ];

  return (
    <section className="temple-section recent-activities-section" aria-label="Recent Sacred Activities">
      <div className="wrap">
        {/* Clean Centered Title Only */}
        <div className="temple-sec-head recent-act-head-center">
          <h2 className="temple-sec-title">
            {isEn ? 'Recent Dharmic Activities & Sevas' : 'ఇటీవలి ధార్మిక కార్యక్రమాలు & సేవలు'}
          </h2>
        </div>

        {/* Continuous Auto-Scrolling Marquee Track */}
        <div
          className="recent-act-carousel-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className={`recent-act-scroll-track ${isPaused ? 'is-paused' : ''}`}>
            {displayActivities.map((act, idx) => (
              <article key={`${act.id}-${idx}`} className="recent-act-card">
                <span className="card-corner corner-tl" aria-hidden="true" />
                <span className="card-corner corner-tr" aria-hidden="true" />
                <span className="card-corner corner-bl" aria-hidden="true" />
                <span className="card-corner corner-br" aria-hidden="true" />

                {/* Clean image - strictly no text, no icons, no badges on image */}
                <div
                  className="recent-act-media-wrap is-clickable"
                  onClick={() => onNavigate(act.targetPage)}
                >
                  <img
                    src={act.image}
                    alt={isEn ? act.categoryEn : act.categoryTe}
                    className="recent-act-img"
                    loading="lazy"
                  />
                </div>

                {/* Card body: Category Name and View Details button only */}
                <div className="recent-act-body">
                  <h3
                    className="recent-act-title is-clickable"
                    onClick={() => onNavigate(act.targetPage)}
                  >
                    {isEn ? act.categoryEn : act.categoryTe}
                  </h3>

                  <div className="recent-act-actions">
                    <button
                      type="button"
                      className="btn primary recent-act-detail-btn-full"
                      onClick={() => onNavigate(act.targetPage)}
                    >
                      <span>{isEn ? 'View Details' : 'పూర్తి వివరాలు'} &rarr;</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

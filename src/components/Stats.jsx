import React from 'react';

export default function Stats() {
  const statsList = [
    {
      value: '1,500+',
      label: 'Devotees Blessed',
      telugu: 'Divine Grace & Blessings',
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Namaste / Devotees Hands with Halo */}
          <circle cx="18" cy="18" r="16" stroke="#C9972D" strokeWidth="1.2" strokeDasharray="2 3" />
          <path d="M18 7V13M12 9L15 13M24 9L21 13" stroke="#E8B94F" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="18" cy="16" r="3.5" fill="#C9972D" />
          <path d="M12 28C12 23 15 21 18 21C21 21 24 23 24 28" stroke="#073B2A" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 19V25" stroke="#E8B94F" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      value: '15',
      label: 'Sacred Rituals',
      telugu: 'Vedic Fire Rituals & Homams',
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sacred Yajna Kunda / Fire */}
          <circle cx="18" cy="18" r="16" stroke="#C9972D" strokeWidth="1.2" strokeDasharray="2 3" />
          <path d="M10 26H26L23 29H13L10 26Z" fill="#C9972D" stroke="#073B2A" strokeWidth="1.2" />
          <path d="M12 26L14 20H22L24 26" stroke="#C9972D" strokeWidth="1.2" />
          <path d="M18 10C16 13 14 15 15 18C16 19 17 20 18 20C19 20 20 19 21 18C22 15 20 13 18 10Z" fill="#E8B94F" />
          <path d="M18 13C17 15 16 16 16.5 17.5C17 18 17.5 18.5 18 18.5C18.5 18.5 19 18 19.5 17.5C20 16 19 15 18 13Z" fill="#073B2A" />
        </svg>
      )
    },
    {
      value: '60+',
      label: 'Cows Protected',
      telugu: 'Indigenous Desi Cows Protected',
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sacred Kamadhenu Horns & Tilak Symbol */}
          <circle cx="18" cy="18" r="16" stroke="#C9972D" strokeWidth="1.2" strokeDasharray="2 3" />
          <path d="M11 14C12 9 15 7 17 12M25 14C24 9 21 7 19 12" stroke="#C9972D" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 17C14 14 16 13 18 13C20 13 22 14 22 17C22 22 19 25 18 25C17 25 14 22 14 17Z" stroke="#073B2A" strokeWidth="1.5" fill="#FFF8E9" />
          <circle cx="18" cy="18" r="1.5" fill="#E8B94F" />
          <path d="M16 27H20" stroke="#C9972D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      value: '365',
      label: 'Days Nitya Puja',
      telugu: 'Uninterrupted Daily Worship',
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sacred Brass Deepam */}
          <circle cx="18" cy="18" r="16" stroke="#C9972D" strokeWidth="1.2" strokeDasharray="2 3" />
          <path d="M13 22C13 22 14 26 18 26C22 26 23 22 23 22H13Z" fill="#C9972D" stroke="#073B2A" strokeWidth="1.2" />
          <path d="M16 26V29H20V26" stroke="#073B2A" strokeWidth="1.5" />
          <path d="M14 29H22" stroke="#C9972D" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 9C16.5 12 15 14 16 17C16.8 19 19.2 19 20 17C21 14 19.5 12 18 9Z" fill="#E8B94F" />
          <circle cx="18" cy="16" r="1.5" fill="#FFF8E9" />
        </svg>
      )
    },
  ];

  return (
    <section className="temple-stats-section" aria-label="Sacred Statistics & Devotional Impact">
      <div className="wrap">
        <div className="temple-stats-grid">
          {statsList.map((stat, i) => (
            <div key={i} className="temple-plaque">
              {/* Corner Carving Motifs */}
              <div className="plaque-corner plaque-tl" />
              <div className="plaque-corner plaque-tr" />
              <div className="plaque-corner plaque-bl" />
              <div className="plaque-corner plaque-br" />

              <div className="plaque-inner">
                <div className="plaque-icon-wrap">
                  {stat.icon}
                </div>
                <div className="plaque-value">{stat.value}</div>
                <div className="plaque-label">{stat.label}</div>
                <div className="plaque-telugu">{stat.telugu}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

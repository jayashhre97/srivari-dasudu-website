import React, { useState, useMemo } from 'react';
import { KAMYAMU_HOMAMS } from '../data/kamyamuData';
import { useLanguage } from '../context/LanguageContext';

export default function KamyamuView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    return {
      all: KAMYAMU_HOMAMS.length,
      protection: KAMYAMU_HOMAMS.filter(h => h.category === 'protection' || h.category === 'vaishnava').length,
      prosperity: KAMYAMU_HOMAMS.filter(h => h.category === 'prosperity').length,
      health: KAMYAMU_HOMAMS.filter(h => h.category === 'health').length,
      shaiva: KAMYAMU_HOMAMS.filter(h => h.category === 'shaiva').length,
      'graha-shanti': KAMYAMU_HOMAMS.filter(h => h.category === 'graha-shanti').length
    };
  }, []);

  const filterChips = isEn
    ? [
        { id: 'all', label: 'All Homams', count: counts.all },
        { id: 'protection', label: 'Protection & Raksha', count: counts.protection },
        { id: 'prosperity', label: 'Prosperity & Wealth', count: counts.prosperity },
        { id: 'health', label: 'Health & Ayushya', count: counts.health },
        { id: 'graha-shanti', label: 'Graha Shanti', count: counts['graha-shanti'] },
        { id: 'shaiva', label: 'Shaiva Homam & Abhishekam', count: counts.shaiva }
      ]
    : [
        { id: 'all', label: 'అన్ని హోమాలు', count: counts.all },
        { id: 'protection', label: 'రక్షా హోమాలు', count: counts.protection },
        { id: 'prosperity', label: 'లక్ష్మీ / సంపద', count: counts.prosperity },
        { id: 'health', label: 'ఆరోగ్యం / ఆయుష్షు', count: counts.health },
        { id: 'graha-shanti', label: 'నవగ్రహ శాంతి', count: counts['graha-shanti'] },
        { id: 'shaiva', label: 'శైవ విధులు', count: counts.shaiva }
      ];

  const filteredHomams = useMemo(() => {
    const q = search.trim().toLowerCase();
    return KAMYAMU_HOMAMS.filter((h) => {
      const matchesCategory =
        filter === 'all' ||
        (filter === 'protection' && (h.category === 'protection' || h.category === 'vaishnava')) ||
        h.category === filter;

      const matchesQuery =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.teluguName.toLowerCase().includes(q) ||
        h.desc.toLowerCase().includes(q) ||
        h.fruits.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [filter, search]);

  const handleReset = () => {
    setSearch('');
    setFilter('all');
  };

  return (
    <div className="page-wrapper kamyamu-page">
      {/* 1. Kamyamu Hero Banner */}
      <section className="kamyamu-hero-header" aria-label="Kamyamu Homams Hero">
        <div className="kamyamu-hero-bg-overlay" aria-hidden="true" />
        <div className="kamyamu-hero-frame" aria-hidden="true" />

        <div className="wrap kamyamu-hero-content">
          <div className="kamyamu-hero-badge">
            <span className="badge-star">✦</span>
            <span>{t('kamyamu.badge')}</span>
            <span className="badge-star">✦</span>
          </div>

          <h1 className="kamyamu-hero-title">{t('kamyamu.title')}</h1>

          <div className="kamyamu-hero-subtitle">{t('kamyamu.subtitle')}</div>

          <div className="kamyamu-hero-actions">
            <button className="btn ghost" onClick={() => onNavigate('home')}>
              {t('common.backHome')}
            </button>
            <button
              className="btn primary"
              onClick={() => onBook('Kamyamu Homam Sankalpam Consultation')}
            >
              {t('nav.bookSeva')} →
            </button>
          </div>
        </div>
      </section>

      {/* 2. Introduction Card */}
      <section className="wrap kamyamu-intro-section">
        <div className="kamyamu-intro-card">
          <div className="intro-card-icon" aria-hidden="true">🔥</div>
          <div className="intro-card-text">
            <h3 className="intro-card-title">
              {isEn ? 'Significance of Kamya Homams' : 'కామ్య హోమం యొక్క విశిష్టత'}
            </h3>
            <p className="intro-card-para">
              {isEn ? (
                <>
                  In the Vedic tradition, a Homam is a sacred offering to the Divine through Agni. Homams performed with pure offerings, herbs, and Vedic mantras to fulfill a devotee&apos;s special sankalpam (prosperity, health, protection, graha shanti, lineage growth) are called <strong>Kamya Homams</strong>.
                </>
              ) : (
                <>
                  వేద శాస్త్రాలలో హోమం అగ్నిముఖంగా భగవంతునికి సమర్పించే పరమ పవిత్ర సాధనం. భక్తుని విశేష సంకల్పం (ధనప్రాప్తి, ఆరోగ్య రక్షణ, శత్రు నివారణ, గ్రహ శాంతి, వంశాభివృద్ధి) నెరవేరడానికి శాస్త్రోక్తంగా విశుద్ధ ద్రవ్యాలు, మూలికలు మరియు వేద మంత్రాలతో నిర్వహించే హోమాలను <strong>&quot;కామ్య హోమాలు&quot;</strong> అంటారు.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Search & Filter Bar */}
      <section className="page-section wrap">
        <div className="filter-bar">
          <div className="chips">
            {filterChips.map((chip) => (
              <button
                type="button"
                key={chip.id}
                className={`chip ${filter === chip.id ? 'on' : ''}`}
                onClick={() => setFilter(chip.id)}
              >
                <span>{chip.label}</span>
                <span className="count-pill">{chip.count}</span>
              </button>
            ))}
          </div>

          <div className="search-box-wrap">
            <input
              type="search"
              className="search-in"
              placeholder={
                isEn
                  ? 'Search homams by name, deity, or purpose...'
                  : 'హోమం పేరు, దైవం లేదా ఉద్దేశం ద్వారా వెతకండి...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="search-clear-btn"
                aria-label="Clear search query"
                onClick={() => setSearch('')}
              >
                &times;
              </button>
            )}
          </div>
        </div>

        <div className="kamyamu-result-count">
          {isEn ? (
            <>
              Showing <strong>{filteredHomams.length}</strong> of <strong>{KAMYAMU_HOMAMS.length}</strong> Consecrated Vedic Homams
            </>
          ) : (
            <>
              <strong>{KAMYAMU_HOMAMS.length}</strong> హోమాలలో <strong>{filteredHomams.length}</strong> చూపిస్తున్నాం
            </>
          )}
        </div>

        {/* 4. Homam Cards Grid */}
        <div className="rituals-devotional-grid">
          {filteredHomams.map((item) => (
            <article className="temple-card ritual-card" key={item.no}>
              {/* Corner Ornaments */}
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              <div className="ritual-media-wrap">
                <div
                  className="ritual-photo"
                  role="img"
                  aria-label={item.name}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <span className="ritual-date-pill">Homa #{item.no}</span>
                <span className="ritual-cat-badge">{item.category}</span>
              </div>

              <div className="ritual-body">
                <h3 className="ritual-title">
                  {isEn
                    ? item.name.replace(/\s*\([\u0C00-\u0C7F\s/]+\)$/u, '').trim()
                    : item.teluguName}
                </h3>
                <p className="ritual-desc">{item.desc}</p>

                {/* Key Benefits Pill */}
                <div className="kamyamu-benefits-pill">
                  <span className="fruits-icon">✦</span>
                  <span className="fruits-text">
                    <strong>{isEn ? 'Benefit:' : 'ఫలితం:'}</strong> {item.fruits}
                  </span>
                </div>

                <div className="ritual-meta-box">
                  {item.duration && (
                    <div className="meta-row">
                      <span className="meta-lbl">{isEn ? 'Duration:' : 'నిడివి:'}</span>
                      <span className="meta-val">{item.duration}</span>
                    </div>
                  )}
                  {item.deity && (
                    <div className="meta-row">
                      <span className="meta-lbl">{isEn ? 'Deity:' : 'దైవం:'}</span>
                      <span className="meta-val">{item.deity}</span>
                    </div>
                  )}
                  {item.price && (
                    <div className="meta-row">
                      <span className="meta-lbl">{isEn ? 'Seva Dakshina:' : 'సేవా దక్షిణ:'}</span>
                      <span className="meta-val meta-val--price">₹{item.price}</span>
                    </div>
                  )}
                </div>

                <div className="card-action-bar">
                  <button
                    type="button"
                    className="btn primary ritual-btn"
                    onClick={() =>
                      onBook(
                        isEn
                          ? `${item.no}. ${item.name} (Kamyamu)`
                          : `${item.no}. ${item.teluguName} (కామ్యము)`
                      )
                    }
                  >
                    {isEn ? 'Book this Homam Sankalpam →' : 'ఈ హోమ సంకల్పం బుక్ చేయండి →'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredHomams.length === 0 && (
          <div className="temple-card kamyamu-empty-state">
            <h3 className="kamyamu-empty-title">
              {isEn ? 'No homam matched your search' : 'హోమం కనుగొనబడలేదు'}
            </h3>
            <p className="kamyamu-empty-text">
              {isEn
                ? 'Try searching with another keyword or reset the filter to view all 15 Homams.'
                : 'మరో కీవర్డ్‌తో వెతకండి లేదా ఫిల్టర్ రీసెట్ చేసి అన్ని 15 హోమాలు చూడండి.'}
            </p>
            <button type="button" className="btn primary" onClick={handleReset}>
              {isEn ? 'Reset Filter & View All Homams' : 'ఫిల్టర్ రీసెట్ చేసి అన్ని హోమాలు చూడండి'}
            </button>
          </div>
        )}
      </section>

      {/* 5. Direct Sankalpam CTA */}
      <section className="wrap smartam-bottom-cta">
        <div className="smartam-cta-box">
          <div className="cta-star-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="cta-star">✦</span>
            <span className="divider-line" />
          </div>

          <h3 className="smartam-cta-heading">
            {isEn
              ? 'Kamya Homam Sankalpam with your family gotra and names'
              : 'మీ కుటుంబ గోత్ర–నామాలతో కామ్య హోమ సంకల్పం'}
          </h3>
          <p className="smartam-cta-desc">
            {isEn
              ? 'Contact our Founder & Spiritual Guide to perform Homam sankalpam with scriptural precision at home or through Trust seva arrangements.'
              : 'గృహంలో లేదా ట్రస్ట్ సేవా ఏర్పాట్ల ద్వారా శాస్త్రోక్తంగా హోమ సంకల్పం నిర్వహించడానికి వ్యవస్థాపకులు & ఆధ్యాత్మిక గురువును సంప్రదించండి.'}
          </p>

          <div className="smartam-cta-buttons">
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook(isEn ? 'Kamyamu Homam Sankalpam Booking' : 'కామ్య హోమ సంకల్ప బుకింగ్')}
            >
              {isEn ? 'Enquire Homam Sankalpam →' : 'హోమ సంకల్పం సంప్రదించండి →'}
            </button>
            <button
              type="button"
              className="btn ghost smartam-ghost-btn"
              onClick={() => onNavigate('contact')}
            >
              {isEn ? 'Trust Contact Desk →' : 'ట్రస్ట్ సంప్రదింపు డెస్క్ →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


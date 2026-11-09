import React, { useState, useMemo } from 'react';
import { EVENTS_DATA } from '../data/eventsData';

export default function EventsView({ onNavigate, onBook }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    return {
      all: EVENTS_DATA.length,
      homam: EVENTS_DATA.filter(e => e.cat === 'homam').length,
      abhishekam: EVENTS_DATA.filter(e => e.cat === 'abhishekam').length,
      vratam: EVENTS_DATA.filter(e => e.cat === 'vratam').length
    };
  }, []);

  const filterChips = [
    { id: 'all', label: 'All Rituals', count: counts.all },
    { id: 'homam', label: 'Homams', count: counts.homam },
    { id: 'abhishekam', label: 'Abhishekams', count: counts.abhishekam },
    { id: 'vratam', label: 'Marriage & Vratams', count: counts.vratam }
  ];

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EVENTS_DATA.filter((e) => {
      const matchesCategory = filter === 'all' || e.cat === filter;
      const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [filter, search]);

  const handleResetSearch = () => {
    setSearch('');
    setFilter('all');
  };

  return (
    <div className="page-wrapper events-page">
      <div className="page-banner page-banner--homam">
        <div className="wrap">
          <div className="eyebrow">Consecrated Vedic Ceremonies &amp; Homams</div>
          <h1>15 Sacred Vedic Rituals &amp; Homams</h1>
          <p className="page-banner-lead">
            All 15 sacred Vedic ceremonies conducted strictly adhering to Smartha and Vaishnava Agamas by experienced
            Vedic Purohits at your home, venue, or with direct Sankalpam at Sri Mudupula Venkanna Temple.
          </p>
          <button className="btn ghost" onClick={() => onNavigate('home')}>
            &larr; Back to Home
          </button>
        </div>
      </div>

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
              placeholder="Search rituals by name or description..."
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
          Showing <strong>{filteredEvents.length}</strong> of <strong>{EVENTS_DATA.length}</strong> sacred ceremonies
        </div>

        <div className="rituals-devotional-grid">
          {filteredEvents.map((item) => (
            <article className="temple-card ritual-card" key={item.no}>
              <div className="card-corner corner-tl" />
              <div className="card-corner corner-tr" />
              <div className="card-corner corner-bl" />
              <div className="card-corner corner-br" />

              <div className="ritual-media-wrap">
                <div
                  className="ritual-photo"
                  role="img"
                  aria-label={item.name}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <span className="ritual-date-pill">Ritual #{item.no}</span>
                <span className="ritual-cat-badge">{item.cat}</span>
              </div>

              <div className="ritual-body">
                <h3 className="ritual-title">{item.name}</h3>
                <p className="ritual-desc">{item.desc}</p>

                <div className="ritual-meta-box">
                  {item.duration && (
                    <div className="meta-row">
                      <span className="meta-lbl">Duration:</span>
                      <span className="meta-val">{item.duration}</span>
                    </div>
                  )}
                  {item.price && (
                    <div className="meta-row">
                      <span className="meta-lbl">Seva Dakshina:</span>
                      <span className="meta-val meta-val--price">₹{item.price}</span>
                    </div>
                  )}
                </div>

                <div className="card-action-bar">
                  <button
                    type="button"
                    className="btn primary ritual-btn"
                    onClick={() => onBook(`${item.no}. ${item.name}`)}
                  >
                    Book Ritual Sankalpam &rarr;
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="temple-card kamyamu-empty-state">
            <h3 className="kamyamu-empty-title">
              No rituals matched your search
            </h3>
            <p className="kamyamu-empty-text">
              Try searching with another keyword or reset the filter.
            </p>
            <button type="button" className="btn primary" onClick={handleResetSearch}>
              Reset Filter &amp; View All Rituals
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

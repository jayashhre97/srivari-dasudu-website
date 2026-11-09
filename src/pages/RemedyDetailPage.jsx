import React, { useEffect } from 'react';
import LotusDivider from '../components/LotusDivider';
import { REMEDIES_DATA, YOUTUBE_CHANNEL_URL } from '../data/remediesData';

export default function RemedyDetailPage({ remedyId, onNavigate, onBook }) {
  // Find matching remedy, default to first if not found
  const remedy = REMEDIES_DATA.find((r) => r.id === remedyId) || REMEDIES_DATA[0];

  // Scroll to top on mount or remedy change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [remedyId]);

  // Other remedies for quick navigation
  const otherRemedies = REMEDIES_DATA.filter((r) => r.id !== remedy.id);

  return (
    <div className="page-wrapper remedy-detail-page-wrapper">
      {/* 1. Page Header & Breadcrumb Hero */}
      <section className="remedy-detail-hero" aria-label="Remedy Header">
        <div className="remedy-detail-hero-frame" aria-hidden="true" />

        <div className="remedies-container">
          {/* Top Navigation Bar */}
          <div className="remedy-detail-nav-row">
            <button
              type="button"
              className="btn ghost remedy-nav-back-btn"
              onClick={() => onNavigate('remedies')}
            >
              &larr; Back to All Remedies
            </button>

            <div className="remedy-detail-breadcrumb">
              <span onClick={() => onNavigate('home')} className="crumb-link">Home</span>
              <span className="crumb-sep">/</span>
              <span onClick={() => onNavigate('remedies')} className="crumb-link">Remedies</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-active">{remedy.title}</span>
            </div>
          </div>

          <div className="remedy-detail-header-content">
            <div className="remedy-detail-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>{remedy.remedyNo} · SACRED PARAYANAM &amp; PRAYASCHITTA</span>
              <span className="eyebrow-accent">✦</span>
            </div>

            <h1 className="remedy-detail-title">
              {remedy.title}
            </h1>

            <div className="remedy-detail-subtitle">
              ({remedy.subtitle})
            </div>

            <p className="remedy-detail-lead">
              {remedy.desc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container: Video Theater & 4 Structured Sections */}
      <section className="remedy-detail-body-section">
        <div className="remedies-container remedy-detail-inner-wrap">
          
          {/* YouTube Video Theater Card */}
          <div className="remedy-theater-card">
            {/* Corner Ornaments */}
            <span className="card-corner corner-tl" aria-hidden="true" />
            <span className="card-corner corner-tr" aria-hidden="true" />
            <span className="card-corner corner-bl" aria-hidden="true" />
            <span className="card-corner corner-br" aria-hidden="true" />

            {/* Official Channel Bar */}
            <div className="remedy-yt-bar">
              <div className="yt-channel-badge">
                <span className="yt-icon">▶</span>
                <span className="yt-text">
                  Official Devotional Channel: <strong>@Srivari.Dasudu</strong>
                </span>
              </div>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="yt-subscribe-link"
              >
                Visit YouTube Channel &nearr;
              </a>
            </div>

            {/* Auto-Playing YouTube Video Embed */}
            <div className="remedy-video-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${remedy.youtubeId}?autoplay=1&mute=0&rel=0&enablejsapi=1`}
                title={remedy.videoTitle || remedy.fullTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="remedy-video-iframe"
              />
            </div>

            <div className="remedy-video-caption-bar">
              <h3 className="remedy-video-heading">
                {remedy.videoTitle}
              </h3>
              <div className="remedy-video-meta">
                <span>🪔 Guided by Chief Priest Sri N. V. Ram Kishore Acharyulu</span>
                <span>•</span>
                <span>Sri Mudupula Venkanna Temple</span>
              </div>
            </div>
          </div>

          {/* 4 Structured Sections Below the Video */}
          <div className="remedy-four-sections-page">
            
            {/* SECTION 1: Sacred Significance & Scriptural Purpose */}
            <article className="remedy-detail-section-card">
              <div className="detail-sec-header">
                <span className="detail-sec-icon">✦</span>
                <div>
                  <h2 className="detail-sec-title">{remedy.sections.sec1.title}</h2>
                  <div className="detail-sec-telugu">{remedy.sections.sec1.teluguTitle}</div>
                </div>
              </div>
              <LotusDivider align="start" className="detail-sec-divider" />
              <p className="detail-sec-text">
                {remedy.sections.sec1.content}
              </p>
            </article>

            {/* SECTION 2: Vidhi & Daily Parayanam Procedure */}
            <article className="remedy-detail-section-card">
              <div className="detail-sec-header">
                <span className="detail-sec-icon">🪔</span>
                <div>
                  <h2 className="detail-sec-title">{remedy.sections.sec2.title}</h2>
                  <div className="detail-sec-telugu">{remedy.sections.sec2.teluguTitle}</div>
                </div>
              </div>
              <LotusDivider align="start" className="detail-sec-divider" />
              <ul className="detail-sec-steps">
                {remedy.sections.sec2.steps.map((step, idx) => (
                  <li key={idx} className="step-item">
                    <span className="step-number">{idx + 1}</span>
                    <span className="step-content">{step}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* SECTION 3: Presiding Deity, Auspicious Days & Mandala Duration */}
            <article className="remedy-detail-section-card">
              <div className="detail-sec-header">
                <span className="detail-sec-icon">🏛</span>
                <div>
                  <h2 className="detail-sec-title">{remedy.sections.sec3.title}</h2>
                  <div className="detail-sec-telugu">{remedy.sections.sec3.teluguTitle}</div>
                </div>
              </div>
              <LotusDivider align="start" className="detail-sec-divider" />
              <div className="detail-sec-grid">
                <div className="sec-grid-item">
                  <span className="grid-label">Presiding Deity</span>
                  <span className="grid-value">{remedy.sections.sec3.presidingDeity}</span>
                </div>
                <div className="sec-grid-item">
                  <span className="grid-label">Auspicious Days &amp; Tithi</span>
                  <span className="grid-value">{remedy.sections.sec3.auspiciousDays}</span>
                </div>
                <div className="sec-grid-item">
                  <span className="grid-label">Recommended Duration</span>
                  <span className="grid-value">{remedy.sections.sec3.recommendedDuration}</span>
                </div>
                <div className="sec-grid-item">
                  <span className="grid-label">Sacred Naivedyam</span>
                  <span className="grid-value">{remedy.sections.sec3.naivedyam}</span>
                </div>
              </div>
            </article>

            {/* SECTION 4: Sankalpam Guidance & Priest Consultation */}
            <article className="remedy-detail-section-card sec-priest-consult">
              <div className="detail-sec-header">
                <span className="detail-sec-icon">🙏</span>
                <div>
                  <h2 className="detail-sec-title">{remedy.sections.sec4.title}</h2>
                  <div className="detail-sec-telugu">{remedy.sections.sec4.teluguTitle}</div>
                </div>
              </div>
              <LotusDivider align="start" className="detail-sec-divider" />
              <p className="detail-sec-text">
                {remedy.sections.sec4.content}
              </p>

              <div className="sec-consult-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => onBook(remedy.book)}
                >
                  Consult Chief Priest for This Remedy &rarr;
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Namaskaram%20Acharyulu%20Garu,%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(remedy.fullTitle)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost sec-wa-btn"
                >
                  WhatsApp Priest for Guidance &rarr;
                </a>
              </div>
            </article>
          </div>

          {/* 3. Explore Other Sacred Remedies */}
          <div className="remedy-other-section">
            <h3 className="other-remedies-title">
              Explore Other Sacred Remedies
            </h3>
            <div className="other-remedies-grid">
              {otherRemedies.map((other) => (
                <div key={other.id} className="other-remedy-card">
                  <img
                    src={other.image}
                    alt={other.fullTitle}
                    className="other-remedy-thumb"
                  />
                  <div className="other-remedy-info">
                    <span className="other-badge">{other.remedyNo}</span>
                    <h4 className="other-title">{other.title}</h4>
                    <span className="other-subtitle">({other.subtitle})</span>
                    <button
                      type="button"
                      className="other-view-btn"
                      onClick={() => onNavigate(`remedy/${other.id}`)}
                    >
                      View Remedy &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="remedy-detail-back-wrap">
            <button
              type="button"
              className="btn ghost remedy-detail-back-btn"
              onClick={() => onNavigate('remedies')}
            >
              &larr; Back to All Remedies
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}


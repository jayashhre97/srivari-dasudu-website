import React from 'react';
import LotusDivider from '../LotusDivider';
import { GOSEVA_HIGHLIGHTS } from '../../data/gosevaData';

export default function GosevaAbout({ isEn, onScrollTo }) {
  return (
    <section
      id="goseva-about"
      className="goseva-section goseva-about-section"
      aria-labelledby="about-goseva-heading"
    >
      <div className="goseva-container">
        <div className="goseva-about-grid">
          <div className="goseva-about-copy">
            <div className="goseva-sec-eyebrow">
              <span aria-hidden="true">✦</span>
              <span>{isEn ? 'SANATANA GO SAMRAKSHANA' : 'సనాతన గో సంరక్షణ'}</span>
              <span aria-hidden="true">✦</span>
            </div>

            <h2 id="about-goseva-heading" className="goseva-sec-heading">
              {isEn ? 'About Go Seva' : 'గోసేవ గురించి'}
            </h2>

            <LotusDivider align="start" />

            <p className="goseva-about-lead">
              {isEn
                ? 'Go Seva is a sacred service dedicated to protecting and caring for cows. Through feeding, shelter, healthcare and compassion, we aim to support the well-being of Gomatha and preserve our traditional values.'
                : 'గోసేవ అనేది గోవులను రక్షించడానికి మరియు సంరక్షించడానికి అంకితమైన పవిత్ర సేవ. ఆహారం, ఆశ్రయం, వైద్య సంరక్షణ మరియు కరుణ ద్వారా గోమాత సంక్షేమాన్ని మరియు మన సంప్రదాయ విలువలను కాపాడటమే మా లక్ష్యం.'}
            </p>

            <div className="goseva-highlights-grid">
              {GOSEVA_HIGHLIGHTS.map((item) => (
                <article key={item.id} className="goseva-highlight-card">
                  <div className="goseva-highlight-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <h3>{isEn ? item.titleEn : item.titleTe}</h3>
                    <p>{isEn ? item.descEn : item.descTe}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="goseva-about-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => onScrollTo('goseva-monthly-pooja')}
              >
                {isEn ? 'Participate in Monthly Go Pooja →' : 'మాసిక గోపూజలో పాల్గొనండి →'}
              </button>
            </div>
          </div>

          <div className="goseva-about-visual">
            <div className="goseva-photo-frame">
              <span className="card-corner corner-tl" aria-hidden="true" />
              <span className="card-corner corner-tr" aria-hidden="true" />
              <span className="card-corner corner-bl" aria-hidden="true" />
              <span className="card-corner corner-br" aria-hidden="true" />
              <img
                src="/images/kamadhenu-bg.jpg"
                alt="Sacred Gomatha cared for in a traditional temple goshala"
                className="goseva-about-photo"
                loading="lazy"
              />
              <div className="goseva-photo-caption">
                {isEn
                  ? 'Gavo Vishvasya Matarah — Reverence, Care & Shelter for Gomatha'
                  : 'గావో విశ్వస్య మాతరః — గోమాత పట్ల భక్తి, సంరక్షణ & సేవ'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


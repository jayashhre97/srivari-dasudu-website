import React from 'react';

export default function GosevaHero({ isEn }) {
  return (
    <section className="goseva-hero-banner" aria-label="Go Seva Hero Section">
      <div className="goseva-hero-scrim" aria-hidden="true" />
      <div className="card-corner corner-tl" aria-hidden="true" />
      <div className="card-corner corner-tr" aria-hidden="true" />
      <div className="card-corner corner-bl" aria-hidden="true" />
      <div className="card-corner corner-br" aria-hidden="true" />

      <div className="goseva-container goseva-hero-inner">
        <h1 className="goseva-hero-heading">
          {isEn
            ? 'Go Seva – Serve, Protect & Care for Gomatha'
            : 'గోసేవ – గోమాతను సేవించండి, రక్షించండి & పోషించండి'}
        </h1>

        <p className="goseva-hero-text">
          {isEn
            ? 'Join us in protecting and serving Gomatha. Your contribution helps provide food, shelter, healthcare and care for cows.'
            : 'గోమాత రక్షణ మరియు సేవలో మాతో చేరండి. మీ సహాయం గోవులకు ఆహారం, ఆశ్రయం, వైద్యం మరియు సంరక్షణ అందించడానికి తోడ్పడుతుంది.'}
        </p>
      </div>
    </section>
  );
}

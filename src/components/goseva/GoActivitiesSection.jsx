import React from 'react';
import LotusDivider from '../LotusDivider';
import { GOSEVA_ACTIVITIES } from '../../data/gosevaData';

export default function GoActivitiesSection({ isEn }) {
  return (
    <section
      id="goseva-activities"
      className="goseva-section goseva-activities-section"
      aria-labelledby="activities-heading"
    >
      <div className="goseva-container">
        <div className="goseva-section-header">
          <div className="goseva-sec-eyebrow">
            <span aria-hidden="true">✦</span>
            <span>{isEn ? 'DAILY GOSHALA CARE' : 'నిత్య గోశాల సేవలు'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 id="activities-heading" className="goseva-sec-heading">
            {isEn ? 'Go Seva Activities' : 'గోసేవ కార్యక్రమాలు'}
          </h2>
          <LotusDivider />
          <p className="goseva-sec-sub">
            {isEn
              ? 'Every contribution directly supports daily nourishment, safe shelter, attentive veterinary treatment, and hygienic upkeep for Gomatha.'
              : 'ప్రతి సహాయం గోవులకు రోజువారీ పచ్చిగడ్డి, సురక్షిత ఆశ్రయం, వైద్య సంరక్షణ మరియు శుభ్రమైన గోశాల నిర్వహణకు తోడ్పడుతుంది.'}
          </p>
        </div>

        <div className="goseva-activity-cards-grid">
          {GOSEVA_ACTIVITIES.map((activity) => (
            <article key={activity.id} className="temple-card goseva-activity-img-card">
              <div className="goseva-activity-media">
                <img
                  src={activity.image}
                  alt={isEn ? activity.titleEn : activity.titleTe}
                  loading="lazy"
                />
              </div>
              <div className="goseva-activity-content">
                <h3>{isEn ? activity.titleEn : activity.titleTe}</h3>
                <p>{isEn ? activity.descEn : activity.descTe}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


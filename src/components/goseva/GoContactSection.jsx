import React from 'react';
import LotusDivider from '../LotusDivider';
import { GOSEVA_CONTACT_INFO } from '../../data/gosevaData';
import { buildGosevaWhatsAppUrl } from './gosevaHelpers';

export default function GoContactSection({ isEn, onNavigate, onBook }) {
  const quickWaUrl = buildGosevaWhatsAppUrl([
    'Namaskaram Acharyulu Garu,',
    'I would like to connect with Srivari Dasudu regarding Go Seva, Monthly Go Pooja, or Go Products.'
  ]);

  return (
    <section
      id="goseva-contact"
      className="goseva-section goseva-contact-section"
      aria-labelledby="goseva-contact-heading"
    >
      <div className="goseva-container">
        <div className="remedies-cta-box" aria-label="Srivari Dasudu Go Seva Contact and Support">
          <div className="remedies-cta-frame" aria-hidden="true" />
          <div className="remedies-cta-inner">
            <div className="remedies-cta-eyebrow">
              <span aria-hidden="true">✦</span>
              <span>
                {isEn
                  ? 'SRIVARI DASUDU • GO SEVA & GOMATHA SAMRAKSHANA'
                  : 'శ్రీవారి దాసుడు • గోసేవ & గోమాత సంరక్షణ'}
              </span>
              <span aria-hidden="true">✦</span>
            </div>

            <h2 id="goseva-contact-heading" className="remedies-cta-title">
              {isEn
                ? 'Srivari Dasudu — Go Seva Contact & Support'
                : 'శ్రీవారి దాసుడు — గోసేవ సంప్రదింపు & సహాయం'}
            </h2>

            <LotusDivider className="remedies-cta-divider" />

            <p className="remedies-cta-desc">
              {isEn
                ? `Have questions about Go Seva donations, Monthly Go Pooja, or goshala visits? Reach out to ${GOSEVA_CONTACT_INFO.organisationName} under the guidance of Chief Priest Sri N. V. Ram Kishore Acharyulu at ${GOSEVA_CONTACT_INFO.phonePlaceholder} or ${GOSEVA_CONTACT_INFO.emailPlaceholder}.`
                : `గోసేవ విరాళాలు, మాసిక గోపూజ లేదా గోశాల సందర్శన గురించి వివరాల కోసం ప్రధాన అర్చకులు శ్రీ ఎన్. వి. రామ్ కిషోర్ ఆచార్యులు గారి ఆధ్వర్యంలోని ${GOSEVA_CONTACT_INFO.organisationName} సేవా డెస్క్ (${GOSEVA_CONTACT_INFO.phonePlaceholder} · ${GOSEVA_CONTACT_INFO.emailPlaceholder}) ను సంప్రదించండి.`}
            </p>

            <div className="remedies-cta-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => (onBook ? onBook('Go Seva & Gomatha Sankalpam') : onNavigate('contact'))}
              >
                {isEn ? 'Consult & Book Go Seva →' : 'గోసేవ సంప్రదింపు / బుకింగ్ →'}
              </button>
              <a
                href={quickWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost remedies-wa-btn"
              >
                {isEn ? 'WhatsApp Enquiry →' : 'వాట్సాప్ విచారణ →'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

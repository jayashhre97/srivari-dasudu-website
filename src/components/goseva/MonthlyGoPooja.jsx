import React, { useState, useRef } from 'react';
import { MONTHLY_GO_POOJA, GOSEVA_CONTACT_INFO } from '../../data/gosevaData';
import { validateDevoteeFields, buildGosevaWhatsAppUrl } from './gosevaHelpers';

export default function MonthlyGoPooja({ isEn }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gotra: ''
  });
  const [errors, setErrors] = useState({});
  const [bookedRecord, setBookedRecord] = useState(null);
  const nameInputRef = useRef(null);
  const formPanelRef = useRef(null);

  const openRegistrationForm = () => {
    setFormOpen(true);
    setBookedRecord(null);
    setTimeout(() => {
      formPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInputRef.current?.focus();
    }, 80);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateDevoteeFields(form, { isEn, requireEmail: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setBookedRecord({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      gotra: form.gotra.trim()
    });
  };

  const waUrl = bookedRecord
    ? buildGosevaWhatsAppUrl([
        '*Monthly Go Pooja Registration (₹501 / Month)*',
        'Note: Single-month manual registration (No auto-debit)',
        `Name: ${bookedRecord.name}`,
        `Mobile: ${bookedRecord.phone}`,
        `Email: ${bookedRecord.email}`,
        bookedRecord.gotra ? `Gotra: ${bookedRecord.gotra}` : ''
      ])
    : '#';

  const bullets = isEn ? MONTHLY_GO_POOJA.poojaInfoEn : MONTHLY_GO_POOJA.poojaInfoTe;

  return (
    <section
      id="goseva-monthly-pooja"
      className="goseva-section goseva-monthly-section"
      aria-labelledby="monthly-pooja-heading"
    >
      <div className="goseva-container">
        <div className="goseva-monthly-showcase">
          <div className="goseva-monthly-media">
            <img
              src={MONTHLY_GO_POOJA.image}
              alt="Traditional Monthly Go Pooja offered to adorned sacred Gomatha"
              loading="lazy"
              className="goseva-monthly-img"
            />
          </div>

          <div className="goseva-monthly-content">
            <div className="goseva-sec-eyebrow goseva-sec-eyebrow--gold">
              <span aria-hidden="true">✦</span>
              <span>{isEn ? 'FEATURED MONTHLY SEVA' : 'ప్రత్యేక మాసిక సేవ'}</span>
              <span aria-hidden="true">✦</span>
            </div>

            <h2 id="monthly-pooja-heading" className="goseva-monthly-heading">
              {isEn ? MONTHLY_GO_POOJA.headingEn : MONTHLY_GO_POOJA.headingTe}
            </h2>

            <p className="goseva-monthly-desc">
              {isEn ? MONTHLY_GO_POOJA.descriptionEn : MONTHLY_GO_POOJA.descriptionTe}
            </p>

            <div className="goseva-monthly-fee-pill">
              <span className="fee-label">
                {isEn ? 'Sacred Monthly Offering:' : 'మాసిక సేవా సమర్పణ:'}
              </span>
              <strong className="fee-amount">₹501 / Month</strong>
            </div>

            <ul className="goseva-monthly-info-list">
              {bullets.map((line, i) => (
                <li key={i}>
                  <span aria-hidden="true">🪔</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="goseva-monthly-actions">
              <button
                type="button"
                className="btn primary goseva-monthly-btn"
                onClick={openRegistrationForm}
                aria-expanded={formOpen}
              >
                {isEn
                  ? formOpen
                    ? 'Registration Form Open Below ↓'
                    : 'Book Monthly Pooja'
                  : 'మాసిక గోపూజ బుక్ చేయండి'}
              </button>
            </div>
          </div>
        </div>

        {formOpen && (
          <div
            ref={formPanelRef}
            className="goseva-monthly-form-card"
            role="region"
            aria-label="Monthly Go Pooja Registration Form"
          >
            <div className="goseva-monthly-form-head">
              <div>
                <span className="goseva-sec-eyebrow">
                  {isEn ? 'CONTRIBUTION: ₹501 / MONTH' : 'విరాళం: నెలకు ₹501'}
                </span>
                <h3>
                  {isEn
                    ? 'Monthly Go Pooja Registration Form'
                    : 'మాసిక గోపూజ నమోదు ఫారం'}
                </h3>
              </div>
              <button
                type="button"
                className="btn ghost"
                onClick={() => setFormOpen(false)}
                aria-label="Close Monthly Go Pooja form"
              >
                {isEn ? 'Close ✕' : 'మూసివేయండి ✕'}
              </button>
            </div>

            {!bookedRecord ? (
              <form onSubmit={handleSubmit} noValidate className="goseva-form-stack">
                <div className="form-grid-two">
                  <div>
                    <label htmlFor="pooja-name" className="form-field-label">
                      {isEn ? 'Name *' : 'పేరు *'}
                    </label>
                    <input
                      ref={nameInputRef}
                      id="pooja-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={isEn ? 'Enter devotee full name' : 'భక్తుని పూర్తి పేరు'}
                      className="form-input"
                      required
                    />
                    {errors.name && <p className="goseva-field-error">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="pooja-phone" className="form-field-label">
                      {isEn ? 'Mobile Number *' : 'మొబైల్ నంబర్ *'}
                    </label>
                    <input
                      id="pooja-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                      required
                    />
                    {errors.phone && <p className="goseva-field-error">{errors.phone}</p>}
                  </div>
                </div>

                <div className="form-grid-two">
                  <div>
                    <label htmlFor="pooja-email" className="form-field-label">
                      {isEn ? 'Email *' : 'ఈమెయిల్ *'}
                    </label>
                    <input
                      id="pooja-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="devotee@example.com"
                      className="form-input"
                      required
                    />
                    {errors.email && <p className="goseva-field-error">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="pooja-gotra" className="form-field-label">
                      {isEn ? 'Gotra (Optional)' : 'గోత్రం (ఐచ్ఛికం)'}
                    </label>
                    <input
                      id="pooja-gotra"
                      type="text"
                      name="gotra"
                      value={form.gotra}
                      onChange={handleChange}
                      placeholder={isEn ? 'e.g. Bharadwaja Gotram' : 'ఉదా. భరద్వాజ గోత్రం'}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="goseva-gateway-placeholder goseva-gateway-placeholder--light">
                  <span className="goseva-gateway-pill">
                    {isEn ? 'Payment Integration Placeholder' : 'పేమెంట్ ఇంటిగ్రేషన్ ప్లేస్‌హోల్డర్'}
                  </span>
                  <p>
                    {isEn
                      ? `Monthly Contribution: ₹501 (Single manual registration per booking — automatic recurring auto-debit is disabled unless explicitly configured). ${GOSEVA_CONTACT_INFO.paymentGatewayPlaceholderEn}`
                      : `మాసిక విరాళం: ₹501 (ఆటో-డెబిట్ అమలులో లేదు). ${GOSEVA_CONTACT_INFO.paymentGatewayPlaceholderTe}`}
                  </p>
                </div>

                <button type="submit" className="btn primary form-submit-btn">
                  {isEn
                    ? 'Confirm Monthly Go Pooja Booking (₹501 / Month)'
                    : 'మాసిక గోపూజ బుకింగ్ నిర్ధారించండి (₹501 / నెల)'}
                </button>
              </form>
            ) : (
              <div className="form-success-box">
                <div className="success-icon" aria-hidden="true">✓</div>
                <h4 className="success-heading">
                  {isEn ? 'Monthly Go Pooja Request Recorded' : 'మాసిక గోపూజ నమోదు సిద్ధమైంది'}
                </h4>
                <p className="success-para">
                  {isEn
                    ? `Namaskaram ${bookedRecord.name}. Your Monthly Go Pooja registration (₹501 / Month, non-recurring) has been prepared.`
                    : `నమస్కారం ${bookedRecord.name}. మీ ₹501 మాసిక గోపూజ నమోదు వివరాలు సిద్ధంగా ఉన్నాయి.`}
                </p>
                <div className="success-actions">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn primary">
                    {isEn ? 'Proceed via WhatsApp Coordinator →' : 'వాట్సాప్‌లో పూర్తి చేయండి →'}
                  </a>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setBookedRecord(null)}
                  >
                    {isEn ? 'Edit Registration' : 'వివరాలు మార్చండి'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


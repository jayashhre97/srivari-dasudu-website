import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_BASE = 'https://wa.me/919876543210?text=';

const BANK_DETAILS = [
  { labelEn: 'Account Name', labelTe: 'ఖాతా పేరు', value: 'Sri Vari Dasudu Charitable Trust' },
  { labelEn: 'Bank Name', labelTe: 'బ్యాంక్ పేరు', value: 'State Bank of India' },
  { labelEn: 'Account Number', labelTe: 'ఖాతా సంఖ్య', value: '12345678901' },
  { labelEn: 'IFSC Code', labelTe: 'IFSC కోడ్', value: 'SBIN0001234' },
  { labelEn: 'Branch', labelTe: 'శాఖ', value: 'Visakhapatnam Main Branch' },
  { labelEn: 'Account Type', labelTe: 'ఖాతా రకం', value: 'Current Account (Trust)' }
];

const DONATION_OPTIONS = [
  { id: 'goseva', titleTe: 'గోసేవ సహాయం', titleEn: 'Goseva Support', amount: '₹1,116' },
  { id: 'annadanam', titleTe: 'అన్నదానం', titleEn: 'Annadanam Seva', amount: '₹2,516' },
  { id: 'vedic', titleTe: 'వేద పాఠశాల సహాయం', titleEn: 'Vedic School Support', amount: '₹5,116' },
  { id: 'general', titleTe: 'సాధారణ దానం', titleEn: 'General Donation', amount: 'Custom' }
];

const SUBJECTS = {
  en: [
    'General Enquiry',
    'Muhurtham Guidance',
    'Pitru Seva / Shraddha',
    'Homam Booking',
    'Goseva / Donation',
    'Vedic School',
    'Other'
  ],
  te: [
    'సాధారణ విచారణ',
    'ముహూర్త మార్గదర్శనం',
    'పితృ సేవ / శ్రాద్ధం',
    'హోమం బుకింగ్',
    'గోసేవ / దానం',
    'వేద పాఠశాల',
    'ఇతరం'
  ]
};

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  subject: 'General Enquiry',
  message: ''
};

export default function ContactView({ onNavigate, onBook }) {
  const { t, isEn, lang } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const subjects = SUBJECTS[lang] || SUBJECTS.en;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = isEn ? 'Please enter your name' : 'దయచేసి మీ పేరు నమోదు చేయండి';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      next.phone = isEn ? 'Enter a valid 10-digit mobile number' : 'సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = isEn ? 'Enter a valid email address' : 'సరైన ఈమెయిల్ ఇవ్వండి';
    }
    if (!form.message.trim()) {
      next.message = isEn ? 'Please write your enquiry message' : 'దయచేసి మీ సందేశం రాయండి';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const text = [
      'Namaskaram Acharyulu Garu,',
      'I would like to submit an enquiry through the Contact page.',
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email ? `Email: ${form.email.trim()}` : null,
      `Subject: ${form.subject}`,
      `Message: ${form.message.trim()}`
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`${WHATSAPP_BASE}${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleCopy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(''), 1800);
    } catch {
      setCopiedField('');
    }
  };

  const handleDonation = (option) => {
    const label = isEn ? option.titleEn : option.titleTe;
    const text = `Namaskaram Acharyulu Garu, I would like to offer a donation for ${option.titleEn} (${option.amount}). Please guide me with confirmation after transfer.`;
    window.open(`${WHATSAPP_BASE}${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    return label;
  };

  const addressLines = t('contact.addressValue').split('\n');

  return (
    <div className="page-wrapper contact-page">
      <div className="page-banner page-banner--hills page-banner--pos-92">
        <div className="wrap">
          <div className="eyebrow">{t('contact.eyebrow')}</div>
          <h1>{t('contact.title')}</h1>
          <p className="page-banner-lead">{t('contact.lead')}</p>
          <button type="button" className="btn ghost" onClick={() => onNavigate('home')}>
            {t('common.backHome')}
          </button>
        </div>
      </div>

      <section className="page-section wrap contact-main-section">
        <div className="contact-two-column-layout">
          <div className="temple-card contact-info-card">
            <div className="card-corner corner-tl" />
            <div className="card-corner corner-tr" />
            <div className="card-corner corner-bl" />
            <div className="card-corner corner-br" />

            <div className="temple-eyebrow contact-card-eyebrow">
              <span>{t('contact.addressEyebrow')}</span>
            </div>
            <h2 className="contact-card-title">
              {isEn ? t('contact.trustEn') : t('contact.trustTe')}
            </h2>

            <p className="contact-card-lead">{t('contact.addressLead')}</p>

            <div className="contact-details-list">
              <div className="contact-detail-row">
                <div className="detail-icon-box" aria-hidden="true">📍</div>
                <div>
                  <div className="detail-title">{t('contact.address')}</div>
                  <div className="detail-value">
                    {addressLines.map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-box" aria-hidden="true">🙏</div>
                <div>
                  <div className="detail-title">{t('contact.founder')}</div>
                  <div className="detail-value">{t('contact.founderValue')}</div>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-box" aria-hidden="true">📞</div>
                <div>
                  <div className="detail-title">{t('contact.phone')}</div>
                  <div className="detail-value">+91 98765 43210</div>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-box" aria-hidden="true">✉</div>
                <div>
                  <div className="detail-title">{t('contact.email')}</div>
                  <div className="detail-value">seva@srivaridasudu.org</div>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="detail-icon-box" aria-hidden="true">🕉</div>
                <div>
                  <div className="detail-title">{t('contact.hours')}</div>
                  <div className="detail-value">{t('contact.hoursValue')}</div>
                </div>
              </div>
            </div>

            <div className="contact-card-actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => onBook('General Seva Consultation')}
              >
                {t('contact.bookSeva')}
              </button>
              <a
                href={`${WHATSAPP_BASE}${encodeURIComponent('Namaskaram Acharyulu Garu, I would like to consult regarding spiritual services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost contact-secondary-btn"
              >
                {t('contact.whatsappNow')}
              </a>
            </div>
          </div>

          <div className="temple-card contact-enquiry-card">
            <div className="card-corner corner-tl" />
            <div className="card-corner corner-tr" />
            <div className="card-corner corner-bl" />
            <div className="card-corner corner-br" />

            <div className="temple-eyebrow contact-card-eyebrow">
              <span>{t('contact.formEyebrow')}</span>
            </div>
            <h3 className="contact-faq-title">{t('contact.formTitle')}</h3>
            <p className="contact-form-lead">{t('contact.formLead')}</p>

            {submitted ? (
              <div className="contact-form-success">
                <div className="contact-success-icon">✓</div>
                <h4>{t('contact.successTitle')}</h4>
                <p>{t('contact.successText')}</p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ ...INITIAL_FORM, subject: subjects[0] });
                  }}
                >
                  {t('contact.another')}
                </button>
              </div>
            ) : (
              <form className="contact-enquiry-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field-group">
                  <label className="field-label" htmlFor="contact-name">
                    {t('contact.name')} <span className="req">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={`contact-input ${errors.name ? 'has-error' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="contact-form-row">
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="contact-phone">
                      {t('contact.phoneLabel')} <span className="req">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className={`contact-input ${errors.phone ? 'has-error' : ''}`}
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={10}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="contact-email">
                      {t('contact.emailOptional')}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={`contact-input ${errors.email ? 'has-error' : ''}`}
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label" htmlFor="contact-subject">
                    {t('contact.subject')}
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className="contact-input"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field-group">
                  <label className="field-label" htmlFor="contact-message">
                    {t('contact.message')} <span className="req">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`contact-input contact-textarea ${errors.message ? 'has-error' : ''}`}
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="btn primary btn-full contact-submit-btn">
                  {t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="contact-donation-layout">
          <div className="temple-card contact-bank-card">
            <div className="temple-eyebrow contact-card-eyebrow">
              <span>{t('contact.bankEyebrow')}</span>
            </div>
            <h3 className="contact-faq-title">{t('contact.bankTitle')}</h3>
            <p className="contact-form-lead">{t('contact.bankLead')}</p>

            <div className="contact-bank-list">
              {BANK_DETAILS.map((row) => {
                const label = isEn ? row.labelEn : row.labelTe;
                return (
                  <div className="contact-bank-row" key={row.labelEn}>
                    <div>
                      <div className="detail-title">{label}</div>
                      <div className="detail-value">{row.value}</div>
                    </div>
                    <button
                      type="button"
                      className="contact-copy-btn"
                      onClick={() => handleCopy(row.labelEn, row.value)}
                    >
                      {copiedField === row.labelEn ? t('contact.copied') : t('contact.copy')}
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="contact-bank-note">{t('contact.bankNote')}</p>
          </div>

          <div className="temple-card contact-donate-card">
            <div className="temple-eyebrow contact-card-eyebrow">
              <span>{t('contact.donateEyebrow')}</span>
            </div>
            <h3 className="contact-faq-title">{t('contact.donateTitle')}</h3>
            <p className="contact-form-lead">{t('contact.donateLead')}</p>

            <div className="contact-donate-grid">
              {DONATION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="contact-donate-option"
                  onClick={() => handleDonation(opt)}
                >
                  <span className="donate-opt-title">
                    {isEn ? opt.titleEn : opt.titleTe}
                  </span>
                  <span className="donate-opt-amount">{opt.amount}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn primary btn-full contact-submit-btn"
              onClick={() =>
                onBook('Donation / Dana Sankalpam – Sri Vari Dasudu Charitable Trust')
              }
            >
              {t('contact.donateCta')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

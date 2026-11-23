import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const PHONE_DISPLAY = '+91 98765 43210';
const PHONE_DIGITS = '919876543210';
const EMAIL = 'seva@srivaridasudu.org';
const WHATSAPP_BASE = `https://wa.me/${PHONE_DIGITS}?text=`;

const BANK_DETAILS = [
  {
    labelEn: 'Account Name',
    labelTe: 'ఖాతా పేరు',
    valueEn: 'Sri Vari Dasudu Adyatmika Kuteer',
    valueTe: 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం'
  },
  {
    labelEn: 'Bank Name',
    labelTe: 'బ్యాంక్ పేరు',
    valueEn: 'State Bank of India',
    valueTe: 'స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా'
  },
  {
    labelEn: 'Account Number',
    labelTe: 'ఖాతా సంఖ్య',
    valueEn: '12345678901',
    valueTe: '12345678901'
  },
  {
    labelEn: 'IFSC Code',
    labelTe: 'IFSC కోడ్',
    valueEn: 'SBIN0001234',
    valueTe: 'SBIN0001234'
  },
  {
    labelEn: 'Branch',
    labelTe: 'శాఖ',
    valueEn: 'Visakhapatnam Main Branch',
    valueTe: 'విశాఖపట్నం మెయిన్ బ్రాంచ్'
  },
  {
    labelEn: 'Account Type',
    labelTe: 'ఖాతా రకం',
    valueEn: 'Current Account (Trust)',
    valueTe: 'కరెంట్ ఖాతా (ట్రస్ట్)'
  }
];

const DONATION_OPTIONS = [
  { id: 'goseva', titleTe: 'గోసేవ సహాయం', titleEn: 'Gouseva Support', amountEn: '₹1,116', amountTe: '₹1,116' },
  { id: 'annadanam', titleTe: 'అన్నదానం', titleEn: 'Annadanam Seva', amountEn: '₹2,516', amountTe: '₹2,516' },
  { id: 'vedic', titleTe: 'వేద పాఠశాల సహాయం', titleEn: 'Vedic School Support', amountEn: '₹5,116', amountTe: '₹5,116' },
  {
    id: 'general',
    titleTe: 'సాధారణ దానం',
    titleEn: 'General Donation',
    amountEn: 'Custom',
    amountTe: 'ఇష్టమైన మొత్తం'
  }
];

const SUBJECTS = {
  en: [
    'General Enquiry',
    'Muhurtham Guidance',
    'Pitru Seva / Shraddha',
    'Homam Booking',
    'Gouseva / Donation',
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
  subject: '',
  message: ''
};

export default function ContactView({ onBook }) {
  const { t, isEn, lang } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState('');
  const [selectedDonation, setSelectedDonation] = useState('goseva');

  const subjects = SUBJECTS[lang] || SUBJECTS.en;
  const whatsappGreeting = isEn
    ? 'Namaskaram Acharyulu Garu, I would like to consult regarding spiritual services.'
    : 'నమస్కారం ఆచార్యులు గారు, ఆధ్యాత్మిక సేవల గురించి సంప్రదించాలనుకుంటున్నాను.';

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      subject: subjects.includes(prev.subject) ? prev.subject : subjects[0]
    }));
  }, [lang]);

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

  const handleCopy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField(''), 1800);
    } catch {
      setCopiedField('');
    }
  };

  const handleCopyAllBank = () => {
    const block = BANK_DETAILS.map((row) => {
      const label = isEn ? row.labelEn : row.labelTe;
      const value = isEn ? row.valueEn : row.valueTe;
      return `${label}: ${value}`;
    }).join('\n');
    handleCopy('all', block);
  };

  const handleDonationConfirm = () => {
    const option = DONATION_OPTIONS.find((o) => o.id === selectedDonation) || DONATION_OPTIONS[0];
    const label = isEn ? option.titleEn : option.titleTe;
    const amount = isEn ? option.amountEn : option.amountTe;
    const text = isEn
      ? `Namaskaram Acharyulu Garu, I would like to offer a donation for ${label} (${amount}). Please guide me with confirmation after transfer.`
      : `నమస్కారం ఆచార్యులు గారు, నేను ${label} (${amount}) కోసం దానం చేయాలనుకుంటున్నాను. ట్రాన్స్‌ఫర్ తర్వాత నిర్ధారణ మార్గదర్శనం ఇవ్వండి.`;
    window.open(`${WHATSAPP_BASE}${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const addressLines = t('contact.addressValue').split('\n');

  return (
    <div className="page-wrapper contact-page">
      <div className="page-banner page-banner--hills page-banner--pos-92 contact-hero">
        <div className="wrap">
          <h1>{t('contact.title')}</h1>
          <p className="page-banner-lead">{t('contact.lead')}</p>
        </div>
      </div>

      <section className="contact-quick-bar" aria-label={t('contact.quickLabel')}>
        <div className="wrap contact-quick-inner">
          <a className="contact-quick-btn contact-quick-btn--call" href={`tel:+${PHONE_DIGITS}`}>
            <span className="contact-quick-kicker">{t('contact.quickCall')}</span>
            <span className="contact-quick-value">{PHONE_DISPLAY}</span>
          </a>
          <a
            className="contact-quick-btn contact-quick-btn--wa"
            href={`${WHATSAPP_BASE}${encodeURIComponent(whatsappGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-quick-kicker">{t('contact.quickWhatsApp')}</span>
            <span className="contact-quick-value">{t('contact.whatsappNow')}</span>
          </a>
          <a className="contact-quick-btn contact-quick-btn--mail" href={`mailto:${EMAIL}`}>
            <span className="contact-quick-kicker">{t('contact.quickEmail')}</span>
            <span className="contact-quick-value">{EMAIL}</span>
          </a>
          <a className="contact-quick-btn contact-quick-btn--donate" href="#contact-donate">
            <span className="contact-quick-kicker">{t('contact.quickDonate')}</span>
            <span className="contact-quick-value">{t('contact.donateJump')}</span>
          </a>
        </div>
      </section>

      <section className="page-section wrap contact-main-section">
        <div className="contact-two-column-layout">
          <aside className="contact-panel contact-info-card">
            <h2 className="contact-panel-title">{t('contact.reachTitle')}</h2>
            <p className="contact-panel-lead">{t('contact.addressLead')}</p>

            <div className="contact-details-list">
              <div className="contact-detail-row">
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
                <div>
                  <div className="detail-title">{t('contact.founder')}</div>
                  <div className="detail-value">{t('contact.founderValue')}</div>
                </div>
              </div>

              <div className="contact-detail-row">
                <div>
                  <div className="detail-title">{t('contact.phone')}</div>
                  <a className="detail-value detail-link" href={`tel:+${PHONE_DIGITS}`}>
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="contact-detail-row">
                <div>
                  <div className="detail-title">{t('contact.email')}</div>
                  <a className="detail-value detail-link" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="contact-detail-row">
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
            </div>
          </aside>

          <div className="contact-panel contact-enquiry-card">
            <h2 className="contact-panel-title">{t('contact.formTitle')}</h2>
            <p className="contact-panel-lead">{t('contact.formLead')}</p>

            {submitted ? (
              <div className="contact-form-success" role="status">
                <div className="contact-success-icon" aria-hidden="true">
                  ✓
                </div>
                <h3>{t('contact.successTitle')}</h3>
                <p>{t('contact.successText')}</p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ ...INITIAL_FORM, subject: subjects[0] });
                    setErrors({});
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
                    autoComplete="name"
                    placeholder={t('contact.namePlaceholder')}
                    className={`contact-input ${errors.name ? 'has-error' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <span className="error-text" role="alert">
                      {errors.name}
                    </span>
                  )}
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
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="9876543210"
                      className={`contact-input ${errors.phone ? 'has-error' : ''}`}
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={10}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && (
                      <span className="error-text" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group">
                    <label className="field-label" htmlFor="contact-email">
                      {t('contact.emailOptional')}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@email.com"
                      className={`contact-input ${errors.email ? 'has-error' : ''}`}
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <span className="error-text" role="alert">
                        {errors.email}
                      </span>
                    )}
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
                    placeholder={t('contact.messagePlaceholder')}
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && (
                    <span className="error-text" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn primary btn-full contact-submit-btn">
                  {t('contact.submit')}
                </button>
                <p className="contact-form-hint">{t('contact.formHint')}</p>
              </form>
            )}
          </div>
        </div>

        <div id="contact-donate" className="contact-donate-section">
          <div className="contact-donate-header">
            <h2 className="contact-panel-title">{t('contact.donateTitle')}</h2>
            <p className="contact-panel-lead contact-panel-lead--center">{t('contact.donateLead')}</p>
          </div>

          <div className="contact-donation-layout">
            <div className="contact-panel contact-bank-card">
              <div className="contact-panel-head">
                <h3 className="contact-subhead">{t('contact.bankTitle')}</h3>
                <button type="button" className="contact-copy-btn contact-copy-btn--all" onClick={handleCopyAllBank}>
                  {copiedField === 'all' ? t('contact.copied') : t('contact.copyAll')}
                </button>
              </div>
              <p className="contact-panel-lead">{t('contact.bankLead')}</p>

              <div className="contact-bank-list">
                {BANK_DETAILS.map((row) => {
                  const label = isEn ? row.labelEn : row.labelTe;
                  const value = isEn ? row.valueEn : row.valueTe;
                  return (
                    <div className="contact-bank-row" key={row.labelEn}>
                      <div>
                        <div className="detail-title">{label}</div>
                        <div className="detail-value">{value}</div>
                      </div>
                      <button
                        type="button"
                        className="contact-copy-btn"
                        onClick={() => handleCopy(row.labelEn, value)}
                      >
                        {copiedField === row.labelEn ? t('contact.copied') : t('contact.copy')}
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="contact-bank-note">{t('contact.bankNote')}</p>
            </div>

            <div className="contact-panel contact-donate-card">
              <h3 className="contact-subhead">{t('contact.donatePick')}</h3>
              <p className="contact-panel-lead">{t('contact.donatePickLead')}</p>

              <div className="contact-donate-grid" role="radiogroup" aria-label={t('contact.donatePick')}>
                {DONATION_OPTIONS.map((opt) => {
                  const selected = selectedDonation === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={`contact-donate-option${selected ? ' is-selected' : ''}`}
                      onClick={() => setSelectedDonation(opt.id)}
                    >
                      <span className="donate-opt-title">{isEn ? opt.titleEn : opt.titleTe}</span>
                      <span className="donate-opt-amount">{isEn ? opt.amountEn : opt.amountTe}</span>
                    </button>
                  );
                })}
              </div>

              <button type="button" className="btn primary btn-full contact-submit-btn" onClick={handleDonationConfirm}>
                {t('contact.donateCta')}
              </button>
              <button
                type="button"
                className="btn ghost btn-full contact-secondary-btn"
                onClick={() => onBook('Donation / Dana Sankalpam – Sri Vari Dasudu Adyatmika Kuteer')}
              >
                {t('contact.donateBook')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

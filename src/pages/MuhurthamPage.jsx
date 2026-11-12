import React, { useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_BASE = 'https://wa.me/919876543210?text=';

const CEREMONIES = [
  {
    id: 'vivaha',
    titleEn: 'Vivaha Muhurtham',
    titleTe: 'వివాహ ముహూర్తం',
    subtitleEn: 'Sacred Wedding',
    subtitleTe: 'పవిత్ర వివాహం',
    descEn: 'Auspicious wedding dates and timings for a blessed sacred union.',
    descTe: 'ఆశీర్వాదాలతో కూడిన పవిత్ర వివాహానికి శుభ తేదీలు మరియు సమయాలు.',
    image: '/images/cards/event-02-marriage.jpg',
    icon: '💍'
  },
  {
    id: 'gruha',
    titleEn: 'Gruha Pravesam & Shanku Sthapana',
    titleTe: 'గృహప్రవేశం & శంకు స్థాపన',
    subtitleEn: 'Housewarming',
    subtitleTe: 'గృహప్రవేశం',
    descEn: 'Housewarming and foundation ceremonies at the right auspicious moment.',
    descTe: 'శుభ ముహూర్తంలో గృహప్రవేశం మరియు శంకు స్థాపన కార్యక్రమాలు.',
    image: '/images/homam.jpg',
    icon: '🏠'
  },
  {
    id: 'upanayanam',
    titleEn: 'Upanayanam Ceremony',
    titleTe: 'ఉపనయన సంస్కారం',
    subtitleEn: 'Sacred Thread Ceremony',
    subtitleTe: 'యజ్ఞోపవీత సంస్కారం',
    descEn: 'Sacred thread ceremony timed for spiritual initiation and wisdom.',
    descTe: 'ఆధ్యాత్మిక ప్రారంభం మరియు జ్ఞానం కోసం యజ్ఞోపవీత సంస్కార ముహూర్తం.',
    image: '/images/vedic/guru-teaching.jpg',
    icon: '🧵'
  },
  {
    id: 'namakaranam',
    titleEn: 'Namakaranam & Annaprasana',
    titleTe: 'నామకరణం & అన్నప్రాశన',
    subtitleEn: 'Naming & First Food',
    subtitleTe: 'నామకరణం & ప్రథమ అన్నం',
    descEn: 'Naming and first food ceremonies for the newborn with divine blessings.',
    descTe: 'నవజాత శిశువుకు దైవాశీస్సులతో నామకరణం మరియు అన్నప్రాశన ముహూర్తాలు.',
    image: '/images/cards/remedy-3-family.jpg',
    icon: '👶'
  },
  {
    id: 'aksharabhyasam',
    titleEn: 'Aksharabhyasam & Vidhyarambham',
    titleTe: 'అక్షరాభ్యాసం & విద్యారంభం',
    subtitleEn: 'Learning Initiation',
    subtitleTe: 'విద్యా ప్రారంభం',
    descEn: 'Sacred initiation into learning under the grace of Goddess Saraswati.',
    descTe: 'సరస్వతి దేవి అనుగ్రహంతో విద్యా ప్రారంభానికి పవిత్ర ముహూర్తం.',
    image: '/images/vedic/rigveda.jpg',
    icon: '📖'
  },
  {
    id: 'vyaparam',
    titleEn: 'New Business & Vehicle Pooja',
    titleTe: 'నూతన వ్యాపారం & వాహన పూజ',
    subtitleEn: 'Auspicious Beginnings',
    subtitleTe: 'శుభ ప్రారంభాలు',
    descEn: 'Auspicious beginnings for business inaugurations and new vehicles.',
    descTe: 'నూతన వ్యాపారం మరియు వాహనాలకు శుభ ప్రారంభ ముహూర్తాలు.',
    image: '/images/cards/event-14-lakshmi.jpg',
    icon: '🚗'
  }
];

const INITIAL_FORM = {
  ceremonyType: '',
  selectionMode: 'priest',
  preferredDate1: '',
  preferredDate2: '',
  fullName: '',
  phone: '',
  location: '',
  gotram: '',
  nakshatram: '',
  sankalpam: ''
};

export default function MuhurthamPage({ onNavigate }) {
  const { t, isEn } = useLanguage();
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const ceremonyLabel = (item) => (isEn ? item.titleEn : item.titleTe);
  const ceremonySub = (item) => (isEn ? item.subtitleEn : item.subtitleTe);
  const ceremonyDesc = (item) => (isEn ? item.descEn : item.descTe);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const selectCeremony = (ceremonyId) => {
    setForm((prev) => ({ ...prev, ceremonyType: ceremonyId }));
    setErrors((prev) => ({ ...prev, ceremonyType: '' }));
    setTimeout(scrollToForm, 50);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const setSelectionMode = (mode) => {
    setForm((prev) => ({
      ...prev,
      selectionMode: mode,
      preferredDate1: mode === 'priest' ? '' : prev.preferredDate1,
      preferredDate2: mode === 'priest' ? '' : prev.preferredDate2
    }));
    setErrors((prev) => ({ ...prev, preferredDate1: '', preferredDate2: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.ceremonyType) {
      next.ceremonyType = isEn ? 'Please select a Muhurtham type' : 'దయచేసి ముహూర్త రకాన్ని ఎంచుకోండి';
    }
    if (!form.fullName.trim()) {
      next.fullName = isEn ? 'Please enter your full name' : 'దయచేసి పూర్తి పేరు నమోదు చేయండి';
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      next.phone = isEn
        ? 'Enter a valid 10-digit Indian mobile number'
        : 'సరైన 10 అంకెల భారతీయ మొబైల్ నంబర్ ఇవ్వండి';
    }
    if (!form.location.trim()) {
      next.location = isEn ? 'Please enter your location / address' : 'దయచేసి చిరునామా నమోదు చేయండి';
    }
    if (form.selectionMode === 'preferred' && !form.preferredDate1) {
      next.preferredDate1 = isEn
        ? 'Please select Preferred Date 1'
        : 'దయచేసి ప్రాధాన్య తేదీ 1 ఎంచుకోండి';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildPayload = () => {
    const ceremony = CEREMONIES.find((c) => c.id === form.ceremonyType);
    return {
      ceremonyType: ceremony ? ceremony.titleEn : form.ceremonyType,
      muhurthamSelection:
        form.selectionMode === 'priest' ? 'Priest to Suggest Dates' : 'Devotee Preferred Dates',
      preferredDate1: form.selectionMode === 'preferred' ? form.preferredDate1 : null,
      preferredDate2:
        form.selectionMode === 'preferred' && form.preferredDate2 ? form.preferredDate2 : null,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      location: form.location.trim(),
      gotram: form.gotram.trim() || null,
      nakshatram: form.nakshatram.trim() || null,
      specialSankalpam: form.sankalpam.trim() || null
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    const payload = buildPayload();

    try {
      // Integration-ready payload for future backend endpoint:
      // await fetch('/api/muhurtham-request.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const lines = [
        'Namaskaram Acharyulu Garu,',
        'I would like to request an auspicious Muhurtham.',
        '',
        `Ceremony Type: ${payload.ceremonyType}`,
        `Muhurtham Selection: ${payload.muhurthamSelection}`,
        payload.preferredDate1 ? `Preferred Date 1: ${payload.preferredDate1}` : null,
        payload.preferredDate2 ? `Preferred Date 2: ${payload.preferredDate2}` : null,
        `Full Name: ${payload.fullName}`,
        `Phone: ${payload.phone}`,
        `Location: ${payload.location}`,
        payload.gotram ? `Gotram: ${payload.gotram}` : null,
        payload.nakshatram ? `Nakshatram: ${payload.nakshatram}` : null,
        payload.specialSankalpam ? `Special Sankalpam: ${payload.specialSankalpam}` : null
      ].filter(Boolean);

      const url = `${WHATSAPP_BASE}${encodeURIComponent(lines.join('\n'))}`;
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
        throw new Error(
          isEn
            ? 'Unable to open WhatsApp. Please allow pop-ups and try again.'
            : 'WhatsApp తెరవలేకపోయాం. పాప్-అప్‌లను అనుమతించి మళ్లీ ప్రయత్నించండి.'
        );
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err?.message ||
          (isEn
            ? 'Submission failed. Please try again or contact us on WhatsApp.'
            : 'సమర్పణ విఫలమైంది. మళ్లీ ప్రయత్నించండి లేదా WhatsAppలో సంప్రదించండి.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper muhurtham-page">
      {/* Hero */}
      <section className="muh-hero" aria-label="Auspicious Muhurthams Hero">
        <div className="muh-hero-bg" aria-hidden="true" />
        <div className="muh-hero-frame" aria-hidden="true" />
        <div className="wrap muh-hero-content muh-fade-in">
          <div className="muh-hero-badge">
            <span>✦</span>
            <span>{isEn ? 'Sacred Timing & Divine Guidance' : 'పవిత్ర ముహూర్తం & దైవ మార్గదర్శనం'}</span>
            <span>✦</span>
          </div>
          <h1 className="muh-hero-title">
            {isEn ? 'Auspicious Muhurthams' : 'శుభ ముహూర్తాలు'}
          </h1>
          <p className="muh-hero-sub">
            {isEn
              ? 'Every sacred beginning deserves an auspicious moment.'
              : 'ప్రతి పవిత్ర ప్రారంభానికి శుభ ముహూర్తం అవసరం.'}
          </p>
          <p className="muh-hero-desc">
            {isEn
              ? "Seek divine blessings and begin life's important milestones at the right time with guidance from our experienced priests."
              : 'అనుభవజ్ఞులైన ఆచార్యుల మార్గదర్శనంతో జీవిత ముఖ్య మైలురాళ్లను సరైన సమయంలో ప్రారంభించండి.'}
          </p>
          <div className="muh-hero-actions">
            <button type="button" className="btn primary" onClick={scrollToForm}>
              {isEn ? 'Request a Muhurtham' : 'ముహూర్తం అభ్యర్థించండి'}
            </button>
            <button type="button" className="btn ghost muh-btn-ghost" onClick={() => onNavigate('home')}>
              {t('common.backHome')}
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="wrap muh-section" aria-label="Muhurtham Services">
        <div className="muh-section-head">
          <div className="temple-eyebrow">
            <span className="eyebrow-symbol">✦</span>
            <span>{isEn ? 'Sacred Ceremonies' : 'పవిత్ర కార్యక్రమాలు'}</span>
            <span className="eyebrow-symbol">✦</span>
          </div>
          <h2 className="muh-section-title">
            {isEn ? 'Choose Your Muhurtham Service' : 'మీ ముహూర్త సేవను ఎంచుకోండి'}
          </h2>
          <p className="muh-section-lead">
            {isEn
              ? 'Select a ceremony to begin your Muhurtham request.'
              : 'ముహూర్త అభ్యర్థన ప్రారంభించడానికి కార్యక్రమాన్ని ఎంచుకోండి.'}
          </p>
        </div>

        <div className="muh-services-grid">
          {CEREMONIES.map((item) => (
            <article
              key={item.id}
              className={`muh-service-card ${form.ceremonyType === item.id ? 'is-selected' : ''}`}
            >
              <button
                type="button"
                className="muh-service-media"
                onClick={() => selectCeremony(item.id)}
                aria-label={ceremonyLabel(item)}
              >
                <img src={item.image} alt={ceremonyLabel(item)} loading="lazy" />
                <span className="muh-service-icon" aria-hidden="true">
                  {item.icon}
                </span>
              </button>
              <div className="muh-service-body">
                <div className="muh-service-kicker">{ceremonySub(item)}</div>
                <h3 className="muh-service-title">{ceremonyLabel(item)}</h3>
                <p className="muh-service-desc">{ceremonyDesc(item)}</p>
                <button
                  type="button"
                  className="btn primary muh-service-btn"
                  onClick={() => selectCeremony(item.id)}
                >
                  {isEn ? 'Select & Request' : 'ఎంచుకుని అభ్యర్థించండి'} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Info strip */}
      <section className="wrap muh-section muh-info-section" aria-label="Muhurtham Guidance">
        <div className="muh-info-card">
          <div className="muh-info-ornament" aria-hidden="true">✦</div>
          <p>
            {isEn
              ? 'An auspicious Muhurtham is determined by considering the Panchangam, Tithi, Nakshatram and other relevant astrological factors. Our priest will carefully review your details and guide you towards a suitable time for your sacred occasion.'
              : 'శుభ ముహూర్తం పంచాంగం, తిథి, నక్షత్రం మరియు ఇతర జ్యోతిష్య అంశాల ఆధారంగా నిర్ణయించబడుతుంది. మా ఆచార్యులు మీ వివరాలను జాగ్రత్తగా పరిశీలించి సరైన సమయానికి మార్గనిర్దేశం చేస్తారు.'}
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section
        ref={formRef}
        id="muhurtham-booking-form"
        className="wrap muh-section muh-form-section"
        aria-label="Muhurtham Booking Form"
      >
        <div className="muh-form-shell">
          <div className="muh-form-header">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>{isEn ? 'Muhurtham Request' : 'ముహూర్త అభ్యర్థన'}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="muh-section-title">
              {isEn ? 'Request Your Auspicious Muhurtham' : 'మీ శుభ ముహూర్తాన్ని అభ్యర్థించండి'}
            </h2>
            <p className="muh-section-lead">
              {isEn
                ? 'Share your ceremony details with us. Our priest will review your request and guide you towards an auspicious Muhurtham.'
                : 'మీ కార్యక్రమ వివరాలను పంచుకోండి. మా ఆచార్యులు మీ అభ్యర్థనను పరిశీలించి శుభ ముహూర్తానికి మార్గనిర్దేశం చేస్తారు.'}
            </p>
          </div>

          {submitted ? (
            <div className="muh-success-card" role="status">
              <div className="muh-success-icon">✓</div>
              <h3>
                {isEn ? 'Request Ready on WhatsApp' : 'WhatsAppలో అభ్యర్థన సిద్ధం'}
              </h3>
              <p>
                {isEn
                  ? 'WhatsApp has been opened with your Muhurtham request details. Please send the message to confirm with our priest.'
                  : 'మీ ముహూర్త అభ్యర్థన వివరాలతో WhatsApp తెరవబడింది. ఆచార్యులకు సందేశం పంపి నిర్ధారించండి.'}
              </p>
              <button
                type="button"
                className="btn primary"
                onClick={() => {
                  setSubmitted(false);
                  setForm(INITIAL_FORM);
                  setErrors({});
                }}
              >
                {isEn ? 'Submit Another Request' : 'మరో అభ్యర్థన పంపండి'}
              </button>
            </div>
          ) : (
            <form className="muh-form" onSubmit={handleSubmit} noValidate>
              {/* A. Ceremony Details */}
              <fieldset className="muh-fieldset">
                <legend>{isEn ? 'A. Ceremony Details' : 'ఎ. కార్యక్రమ వివరాలు'}</legend>
                <div className="form-field-group">
                  <label className="field-label" htmlFor="ceremonyType">
                    {isEn ? 'Select Muhurtham Type' : 'ముహూర్త రకం ఎంచుకోండి'}{' '}
                    <span className="req">*</span>
                  </label>
                  <select
                    id="ceremonyType"
                    name="ceremonyType"
                    className={`muh-input ${errors.ceremonyType ? 'has-error' : ''}`}
                    value={form.ceremonyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      {isEn ? 'Choose a ceremony...' : 'కార్యక్రమం ఎంచుకోండి...'}
                    </option>
                    {CEREMONIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {ceremonyLabel(c)}
                      </option>
                    ))}
                  </select>
                  {errors.ceremonyType && <span className="error-text">{errors.ceremonyType}</span>}
                </div>
              </fieldset>

              {/* B. Muhurtham Selection */}
              <fieldset className="muh-fieldset">
                <legend>{isEn ? 'B. Muhurtham Selection' : 'బి. ముహూర్త ఎంపిక'}</legend>
                <div className="muh-option-grid">
                  <button
                    type="button"
                    className={`muh-option-card ${form.selectionMode === 'priest' ? 'is-selected' : ''}`}
                    onClick={() => setSelectionMode('priest')}
                    aria-pressed={form.selectionMode === 'priest'}
                  >
                    <span className="muh-option-check" aria-hidden="true">
                      {form.selectionMode === 'priest' ? '✓' : ''}
                    </span>
                    <span className="muh-option-label">
                      {isEn ? 'OPTION 1' : 'ఎంపిక 1'}
                    </span>
                    <strong>
                      {isEn ? 'Priest to Suggest Auspicious Dates' : 'ఆచార్యులు శుభ తేదీలు సూచిస్తారు'}
                    </strong>
                    <p>
                      {isEn
                        ? 'Share your ceremony and personal details. Our priest will consult the Panchangam and recommend suitable auspicious dates and timings.'
                        : 'మీ కార్యక్రమం మరియు వ్యక్తిగత వివరాలు పంచుకోండి. ఆచార్యులు పంచాంగం చూసి సరైన శుభ తేదీలు సూచిస్తారు.'}
                    </p>
                  </button>

                  <button
                    type="button"
                    className={`muh-option-card ${form.selectionMode === 'preferred' ? 'is-selected' : ''}`}
                    onClick={() => setSelectionMode('preferred')}
                    aria-pressed={form.selectionMode === 'preferred'}
                  >
                    <span className="muh-option-check" aria-hidden="true">
                      {form.selectionMode === 'preferred' ? '✓' : ''}
                    </span>
                    <span className="muh-option-label">
                      {isEn ? 'OPTION 2' : 'ఎంపిక 2'}
                    </span>
                    <strong>
                      {isEn ? 'I Have Preferred Dates' : 'నాకు ప్రాధాన్య తేదీలు ఉన్నాయి'}
                    </strong>
                    <p>
                      {isEn
                        ? 'If you have specific dates in mind, share your preferred dates. Our priest will review them and determine their suitability according to the Panchangam.'
                        : 'మీకు నచ్చిన తేదీలు ఉంటే పంచుకోండి. ఆచార్యులు పంచాంగం ప్రకారం వాటి అనుకూలతను పరిశీలిస్తారు.'}
                    </p>
                  </button>
                </div>

                {form.selectionMode === 'priest' ? (
                  <div className="muh-priest-note" role="status">
                    {isEn
                      ? 'No date selection needed. Our priest will suggest suitable auspicious dates after reviewing your details.'
                      : 'తేదీ ఎంపిక అవసరం లేదు. మీ వివరాలు పరిశీలించి ఆచార్యులు సరైన శుభ తేదీలు సూచిస్తారు.'}
                  </div>
                ) : (
                  <div className="muh-date-fields">
                    <p className="muh-date-note">
                      {isEn
                        ? 'Preferred dates must be verified by our priest according to the Panchangam.'
                        : 'ప్రాధాన్య తేదీలను ఆచార్యులు పంచాంగం ప్రకారం తప్పనిసరిగా ధృవీకరిస్తారు.'}
                    </p>
                    <div className="muh-form-row">
                      <div className="form-field-group">
                        <label className="field-label" htmlFor="preferredDate1">
                          {isEn ? 'Preferred Date 1' : 'ప్రాధాన్య తేదీ 1'}{' '}
                          <span className="req">*</span>
                        </label>
                        <input
                          id="preferredDate1"
                          name="preferredDate1"
                          type="date"
                          min={todayStr}
                          className={`muh-input ${errors.preferredDate1 ? 'has-error' : ''}`}
                          value={form.preferredDate1}
                          onChange={handleChange}
                        />
                        {errors.preferredDate1 && (
                          <span className="error-text">{errors.preferredDate1}</span>
                        )}
                      </div>
                      <div className="form-field-group">
                        <label className="field-label" htmlFor="preferredDate2">
                          {isEn ? 'Preferred Date 2 (optional)' : 'ప్రాధాన్య తేదీ 2 (ఐచ్ఛికం)'}
                        </label>
                        <input
                          id="preferredDate2"
                          name="preferredDate2"
                          type="date"
                          min={todayStr}
                          className="muh-input"
                          value={form.preferredDate2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* C. Devotee Details */}
              <fieldset className="muh-fieldset">
                <legend>{isEn ? 'C. Devotee Details' : 'సి. భక్తుల వివరాలు'}</legend>
                <div className="muh-form-row">
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="fullName">
                      {isEn ? 'Full Name' : 'పూర్తి పేరు'} <span className="req">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      className={`muh-input ${errors.fullName ? 'has-error' : ''}`}
                      placeholder={isEn ? 'Enter your full name' : 'మీ పూర్తి పేరు నమోదు చేయండి'}
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="phone">
                      {isEn ? 'Phone / WhatsApp Number' : 'ఫోన్ / WhatsApp నంబర్'}{' '}
                      <span className="req">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                      className={`muh-input ${errors.phone ? 'has-error' : ''}`}
                      placeholder={isEn ? '10-digit mobile number' : '10 అంకెల మొబైల్ నంబర్'}
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label" htmlFor="location">
                    {isEn ? 'Location / Address' : 'స్థలం / చిరునామా'} <span className="req">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="street-address"
                    className={`muh-input ${errors.location ? 'has-error' : ''}`}
                    placeholder={
                      isEn
                        ? 'City, area, or full address'
                        : 'నగరం, ప్రాంతం లేదా పూర్తి చిరునామా'
                    }
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                  {errors.location && <span className="error-text">{errors.location}</span>}
                </div>

                <div className="muh-form-row">
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="gotram">
                      {isEn ? 'Gotram' : 'గోత్రం'}
                    </label>
                    <input
                      id="gotram"
                      name="gotram"
                      type="text"
                      className="muh-input"
                      placeholder={isEn ? 'Optional' : 'ఐచ్ఛికం'}
                      value={form.gotram}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="field-label" htmlFor="nakshatram">
                      {isEn ? 'Nakshatram' : 'నక్షత్రం'}
                    </label>
                    <input
                      id="nakshatram"
                      name="nakshatram"
                      type="text"
                      className="muh-input"
                      placeholder={isEn ? 'Optional' : 'ఐచ్ఛికం'}
                      value={form.nakshatram}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label" htmlFor="sankalpam">
                    {isEn ? 'Special Sankalpam' : 'ప్రత్యేక సంకల్పం'}
                  </label>
                  <textarea
                    id="sankalpam"
                    name="sankalpam"
                    rows={4}
                    className="muh-input muh-textarea"
                    placeholder={
                      isEn
                        ? 'Share any special prayer intentions (optional)'
                        : 'ప్రత్యేక ప్రార్థన ఉద్దేశాలు పంచుకోండి (ఐచ్ఛికం)'
                    }
                    value={form.sankalpam}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              {submitError && (
                <div className="muh-error-banner" role="alert">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="btn primary btn-full muh-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEn
                    ? 'Submitting...'
                    : 'సమర్పిస్తున్నాం...'
                  : isEn
                    ? 'Submit Muhurtham Request via WhatsApp →'
                    : 'WhatsApp ద్వారా ముహూర్త అభ్యర్థన పంపండి →'}
              </button>
              <p className="muh-form-footnote">
                {isEn
                  ? 'Your request opens on WhatsApp for priest confirmation. Backend API endpoint can be connected later at /api/muhurtham-request.'
                  : 'మీ అభ్యర్థన ఆచార్యుల నిర్ధారణ కోసం WhatsAppలో తెరవబడుతుంది. తర్వాత /api/muhurtham-request బ్యాకెండ్‌కు కనెక్ట్ చేయవచ్చు.'}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="wrap muh-section muh-final-cta" aria-label="Final Muhurtham CTA">
        <div className="muh-final-card">
          <h2>
            {isEn
              ? 'Begin Your Sacred Journey with Divine Blessings'
              : 'దైవాశీస్సులతో మీ పవిత్ర యాత్రను ప్రారంభించండి'}
          </h2>
          <p>
            {isEn
              ? 'Let every important milestone in your life begin with an auspicious Muhurtham.'
              : 'జీవితంలోని ప్రతి ముఖ్య మైలురాయి శుభ ముహూర్తంతో ప్రారంభం కావాలి.'}
          </p>
          <button type="button" className="btn primary" onClick={scrollToForm}>
            {isEn ? 'Request Your Muhurtham' : 'మీ ముహూర్తాన్ని అభ్యర్థించండి'}
          </button>
        </div>
      </section>
    </div>
  );
}

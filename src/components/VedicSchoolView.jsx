import React, { useState, useRef } from 'react';
import LotusDivider from './LotusDivider';
import { VEDIC_DATA, VEDIC_CURRICULUM_STEPS, GURUKUL_PILLARS, DAILY_ROUTINE } from '../data/vedicData';
import { useLanguage } from '../context/LanguageContext';

export default function VedicSchoolView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const formRef = useRef(null);

  const VEDA_OPTIONS = isEn
    ? ['Smartham (Starting Track)', 'Rigveda', 'Yajurveda', 'Samaveda', 'Atharvaveda']
    : ['స్మార్తం (ప్రారంభ విభాగం)', 'ఋగ్వేదం', 'యజుర్వేదం', 'సామవేదం', 'అథర్వవేదం'];

  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: '',
    gothram: '',
    fatherName: '',
    motherName: '',
    selectedVeda: isEn ? 'Smartham (Starting Track)' : 'స్మార్తం (ప్రారంభ విభాగం)',
    phone: '',
    nativePlace: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [showRoutine, setShowRoutine] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleEnrollVeda = (vedaIdentifier) => {
    let mappedVeda = isEn ? 'Smartham (Starting Track)' : 'స్మార్తం (ప్రారంభ విభాగం)';
    const lower = (vedaIdentifier || '').toLowerCase();
    if (lower.includes('smar') || lower.includes('స్మార్త')) {
      mappedVeda = isEn ? 'Smartham (Starting Track)' : 'స్మార్తం (ప్రారంభ విభాగం)';
    } else if (lower.includes('rig') || lower.includes('ఋగ్')) {
      mappedVeda = isEn ? 'Rigveda' : 'ఋగ్వేదం';
    } else if (lower.includes('yajur') || lower.includes('యజుర్')) {
      mappedVeda = isEn ? 'Yajurveda' : 'యజుర్వేదం';
    } else if (lower.includes('sama') || lower.includes('సామ')) {
      mappedVeda = isEn ? 'Samaveda' : 'సామవేదం';
    } else if (lower.includes('atharva') || lower.includes('అథర్వ')) {
      mappedVeda = isEn ? 'Atharvaveda' : 'అథర్వవేదం';
    }

    setFormData((prev) => ({
      ...prev,
      selectedVeda: mappedVeda
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.studentName.trim()) {
      errors.studentName = t('vedic.errName');
    }

    const ageNum = parseInt(formData.studentAge, 10);
    if (!formData.studentAge) {
      errors.studentAge = t('vedic.errAgeReq');
    } else if (isNaN(ageNum) || ageNum < 6 || ageNum > 30) {
      errors.studentAge = t('vedic.errAgeRange');
    }

    if (!formData.gothram.trim()) {
      errors.gothram = t('vedic.errGothram');
    }

    if (!formData.fatherName.trim()) {
      errors.fatherName = t('vedic.errFather');
    }

    if (!formData.motherName.trim()) {
      errors.motherName = t('vedic.errMother');
    }

    if (!formData.selectedVeda) {
      errors.selectedVeda = t('vedic.errVeda');
    }

    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      errors.phone = t('vedic.errPhoneReq');
    } else if (phoneClean.length < 10) {
      errors.phone = t('vedic.errPhoneValid');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let enrollmentId = null;
      let record = null;

      try {
        const response = await fetch('/api/enroll.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success) {
            enrollmentId = resData.enrollmentId;
            record = resData.record;
          }
        }
      } catch (apiErr) {
        console.warn('API endpoint not running; proceeding with client confirmation', apiErr);
      }

      if (!enrollmentId) {
        enrollmentId = `SRV-VED-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
        record = {
          ...formData,
          enrollmentId,
          submittedAt: new Date().toISOString()
        };
      }

      try {
        const existing = JSON.parse(localStorage.getItem('srivari_vedic_enrollments') || '[]');
        existing.unshift(record);
        localStorage.setItem('srivari_vedic_enrollments', JSON.stringify(existing));
      } catch (err) {
        console.warn('Local storage error', err);
      }

      setSubmittedData(record);
      setIsSubmitting(false);

      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(t('vedic.submitFail'));
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setFormData({
      studentName: '',
      studentAge: '',
      gothram: '',
      fatherName: '',
      motherName: '',
      selectedVeda: isEn ? 'Smartham (Starting Track)' : 'స్మార్తం (ప్రారంభ విభాగం)',
      phone: '',
      nativePlace: '',
      notes: ''
    });
    setFormErrors({});
    setSubmitError(null);
  };

  return (
    <div className="page-wrapper vedic-school-page">
      <section className="vedic-hero-section" aria-label="Vedic Gurukulam Hero">
        <div className="vedic-hero-bg-overlay" aria-hidden="true" />
        <div className="vedic-hero-frame" aria-hidden="true" />

        <div className="wrap vedic-hero-container">
          <div className="vedic-hero-text">
            <h1 className="vedic-hero-title">{t('vedic.title')}</h1>
            <div className="vedic-hero-telugu">{t('vedic.telugu')}</div>
            <p className="vedic-hero-subtitle">{t('vedic.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="wrap vedic-intro-section" aria-label="Guru Teaching Introduction">
        <div className="vedic-intro-grid">
          <div className="vedic-intro-media">
            <div className="vedic-media-frame">
              <img
                src="/images/vedic/guru-teaching.webp"
                alt="Guru Teaching Vedic Students in Gurukul"
                className="vedic-media-img"
                onError={(e) => {
                  e.target.src = '/images/cards/event-01-homam.jpg';
                }}
              />
              <div className="media-caption-badge">{t('vedic.oralBadge')}</div>
            </div>
          </div>

          <div className="vedic-intro-content">
            <div className="temple-eyebrow align-start">
              <span className="eyebrow-symbol">✦</span>
              <span>{t('vedic.introEyebrow')}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>

            <h2 className="vedic-sec-heading">{t('vedic.introTitle')}</h2>

            <LotusDivider align="start" />

            <p className="vedic-body-text">{t('vedic.introP1')}</p>

            <p className="vedic-body-text">{t('vedic.introP2')}</p>

            <div className="vedic-highlights-row">
              <div className="vedic-highlight-item">
                <span className="hl-icon">🪔</span>
                <div>
                  <strong>{t('vedic.hlFreeTitle')}</strong>
                  <p>{t('vedic.hlFreeDesc')}</p>
                </div>
              </div>
              <div className="vedic-highlight-item">
                <span className="hl-icon">📜</span>
                <div>
                  <strong>{t('vedic.hlCertTitle')}</strong>
                  <p>{t('vedic.hlCertDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="four-vedas-section" className="wrap vedic-four-vedas-section" aria-label="The Four Vedas">
        <div className="temple-sec-head seva-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>{t('vedic.fourEyebrow')}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">{t('vedic.fourTitle')}</h2>
            <div className="temple-sec-subtitle">{t('vedic.fourSub')}</div>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>
          </div>
        </div>

        <div className="vedic-sequence-note" role="note">
          <div className="vedic-sequence-header">
            <span className="vedic-sequence-badge">{t('vedic.seqBadge')}</span>
            <h3 className="vedic-sequence-heading">{t('vedic.seqHeading')}</h3>
          </div>
          <ul className="vedic-sequence-list">
            {VEDIC_CURRICULUM_STEPS.map((step) => (
              <li key={step.id}>
                <span className="vedic-seq-icon" aria-hidden="true">{step.icon}</span>
                <div>
                  <strong>{isEn ? step.titleEn : step.titleTe}:</strong>{' '}
                  <span>{isEn ? step.descEn : step.descTe}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="vedic-cards-grid">
          {VEDIC_DATA.map((veda) => (
            <article className="temple-card veda-card" key={veda.id}>
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              <div className="veda-card-media">
                <img
                  src={veda.image}
                  alt={`${isEn ? veda.name : veda.teluguName} Vedic Education`}
                  className="veda-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = veda.fallbackImage;
                  }}
                />
                <span className="veda-pill-badge">{isEn ? veda.name : veda.teluguName}</span>
              </div>

              <div className="veda-card-body">
                <h3 className="veda-card-title">
                  {isEn ? veda.name : veda.teluguName}
                </h3>
                {(isEn ? veda.subtitle : veda.subtitleTe) && (
                  <div className="veda-card-sub">{isEn ? veda.subtitle : veda.subtitleTe}</div>
                )}

                <p className="veda-card-desc">{isEn ? veda.desc : veda.descTe}</p>

                <div className="veda-curriculum-box">
                  <div className="curriculum-title">{t('vedic.keySyllabus')}</div>
                  <ul>
                    {(isEn ? veda.coreSubjects : veda.coreSubjectsTe).map((sub, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="veda-meta-row">
                  <div>
                    <span className="meta-lbl">{t('vedic.ageGroup')}</span>
                    <span className="meta-val">{isEn ? veda.ageGroup : veda.ageGroupTe}</span>
                  </div>
                  <div>
                    <span className="meta-lbl">{t('vedic.coursePeriod')}</span>
                    <span className="meta-val">{isEn ? veda.duration : veda.durationTe}</span>
                  </div>
                </div>

                <div className="veda-card-actions">
                  <button
                    type="button"
                    className="btn primary veda-enroll-btn"
                    onClick={() => handleEnrollVeda(isEn ? veda.name : veda.teluguName)}
                  >
                    <span>{t('vedic.enrollNow')}</span>
                    <span className="btn-arrow">&rarr;</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap vedic-why-section" aria-label="Why Choose Our Vedic School">
        <div className="vedic-why-banner-wrap">
          <div className="vedic-why-banner">
            <img
              src="/images/vedic/vedic-school-banner.webp"
              alt="Students learning in traditional Gurukul pavilion"
              className="why-banner-bg"
              onError={(e) => {
                e.target.src = '/images/hills.jpg';
              }}
            />
            <div className="why-banner-overlay" />
            <div className="why-banner-content">
              <div className="vedic-hero-badge vedic-hero-badge--tight">
                <span className="badge-star">✦</span>
                <span>{t('vedic.whyBadge')}</span>
                <span className="badge-star">✦</span>
              </div>
              <h2 className="why-banner-title">{t('vedic.whyTitle')}</h2>
              <p className="why-banner-desc">{t('vedic.whyDesc')}</p>
            </div>
          </div>
        </div>

        <div className="vedic-pillars-grid">
          {GURUKUL_PILLARS.map((pillar) => (
            <div className="temple-card pillar-card" key={pillar.id}>
              <div className="pillar-icon">{pillar.icon}</div>
              {isEn ? (
                <>
                  <div className="pillar-telugu">{pillar.teluguTitle}</div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-desc">{pillar.desc}</p>
                </>
              ) : (
                <>
                  <h4 className="pillar-title">{pillar.teluguTitle}</h4>
                  <p className="pillar-desc">{pillar.descTe}</p>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="vedic-routine-toggle-wrap">
          <button
            type="button"
            className="btn ghost vedic-routine-toggle"
            onClick={() => setShowRoutine(!showRoutine)}
          >
            <span>{showRoutine ? t('vedic.hideRoutine') : t('vedic.showRoutine')}</span>
          </button>
        </div>

        {showRoutine && (
          <div className="vedic-routine-container">
            <h3 className="routine-heading">{t('vedic.routineHeading')}</h3>
            <div className="routine-timeline">
              {DAILY_ROUTINE.map((item, idx) => (
                <div className="routine-row" key={idx}>
                  <div className="routine-time">{item.time}</div>
                  <div className="routine-info">
                    <strong>{isEn ? item.title : item.titleTe}</strong>
                    <p>{isEn ? item.desc : item.descTe}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section ref={formRef} id="admission-form" className="wrap vedic-form-section" aria-label="Admission Form">
        <div className="vedic-form-wrapper">
          <div className="form-corner corner-tl" aria-hidden="true" />
          <div className="form-corner corner-tr" aria-hidden="true" />
          <div className="form-corner corner-bl" aria-hidden="true" />
          <div className="form-corner corner-br" aria-hidden="true" />

          <div className="vedic-form-header">
            <div className="form-badge">
              <span className="badge-star">✦</span>
              <span>{t('vedic.formBadge')}</span>
              <span className="badge-star">✦</span>
            </div>

            <h2 className="vedic-form-title">{t('vedic.formTitle')}</h2>

            <p className="vedic-form-desc">{t('vedic.formDesc')}</p>
          </div>

          {submittedData ? (
            <div className="vedic-success-card">
              <div className="success-icon">🎉</div>
              <h3 className="success-heading">{t('vedic.successTitle')}</h3>

              <div className="success-details-box">
                <div className="success-ref">
                  {t('vedic.refNo')} <strong>{submittedData.enrollmentId}</strong>
                </div>
                <div className="success-summary">
                  <div>
                    <strong>{t('vedic.lblStudent')}</strong> {submittedData.studentName} ({submittedData.studentAge} {t('vedic.yrs')})
                  </div>
                  <div>
                    <strong>{t('vedic.lblVeda')}</strong> {submittedData.selectedVeda}
                  </div>
                  <div>
                    <strong>{t('vedic.lblGothram')}</strong> {submittedData.gothram}
                  </div>
                  <div>
                    <strong>{t('vedic.lblFather')}</strong> {submittedData.fatherName} |{' '}
                    <strong>{t('vedic.lblMother')}</strong> {submittedData.motherName}
                  </div>
                  <div>
                    <strong>{t('vedic.lblPhone')}</strong> {submittedData.phone}
                  </div>
                </div>
              </div>

              <p className="success-note">{t('vedic.successNote')}</p>

              <div className="success-actions">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    isEn
                      ? `*Vedic School Enrollment Application*\n` +
                        `*Ref No:* ${submittedData.enrollmentId}\n` +
                        `*Student:* ${submittedData.studentName} (Age: ${submittedData.studentAge})\n` +
                        `*Veda Chosen:* ${submittedData.selectedVeda}\n` +
                        `*Gothram:* ${submittedData.gothram}\n` +
                        `*Father:* ${submittedData.fatherName}\n` +
                        `*Mother:* ${submittedData.motherName}\n` +
                        `*Phone:* ${submittedData.phone}\n` +
                        (submittedData.nativePlace ? `*Native Place:* ${submittedData.nativePlace}\n` : '') +
                        (submittedData.notes ? `*Notes:* ${submittedData.notes}\n` : '') +
                        `Namaste Acharya! We have submitted our Vedic Pathashala admission application.`
                      : `*వేద పాఠశాల ప్రవేశ దరఖాస్తు*\n` +
                        `*సంఖ్య:* ${submittedData.enrollmentId}\n` +
                        `*విద్యార్థి:* ${submittedData.studentName} (వయస్సు: ${submittedData.studentAge})\n` +
                        `*వేదం:* ${submittedData.selectedVeda}\n` +
                        `*గోత్రం:* ${submittedData.gothram}\n` +
                        `*తండ్రి:* ${submittedData.fatherName}\n` +
                        `*తల్లి:* ${submittedData.motherName}\n` +
                        `*ఫోన్:* ${submittedData.phone}\n` +
                        (submittedData.nativePlace ? `*స్వస్థలం:* ${submittedData.nativePlace}\n` : '') +
                        (submittedData.notes ? `*గమనికలు:* ${submittedData.notes}\n` : '') +
                        `నమస్కారం ఆచార్యులు గారు! వేద పాఠశాల ప్రవేశ దరఖాస్తు సమర్పించాము.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary success-wa-btn"
                >
                  <span>{t('vedic.forwardWa')}</span>
                  <span>💬</span>
                </a>

                <button
                  type="button"
                  className="btn ghost vedic-ghost-btn"
                  onClick={handleResetForm}
                >
                  {t('vedic.submitAnother')}
                </button>
              </div>
            </div>
          ) : (
            <form className="vedic-admission-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid-two">
                <div className="form-field-group">
                  <label htmlFor="studentName" className="field-label">
                    {t('vedic.lblStudentName')} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    className={`form-input ${formErrors.studentName ? 'input-error' : ''}`}
                    placeholder={t('vedic.phStudent')}
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.studentName && (
                    <span className="error-text">{formErrors.studentName}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="studentAge" className="field-label">
                    {t('vedic.lblStudentAge')} <span className="req">*</span>
                  </label>
                  <input
                    type="number"
                    id="studentAge"
                    name="studentAge"
                    className={`form-input ${formErrors.studentAge ? 'input-error' : ''}`}
                    placeholder={t('vedic.phAge')}
                    min="6"
                    max="30"
                    value={formData.studentAge}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.studentAge && (
                    <span className="error-text">{formErrors.studentAge}</span>
                  )}
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label htmlFor="gothram" className="field-label">
                    {t('vedic.lblGothramField')} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="gothram"
                    name="gothram"
                    className={`form-input ${formErrors.gothram ? 'input-error' : ''}`}
                    placeholder={t('vedic.phGothram')}
                    value={formData.gothram}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.gothram && (
                    <span className="error-text">{formErrors.gothram}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="selectedVeda" className="field-label">
                    {t('vedic.lblSelectVeda')} <span className="req">*</span>
                  </label>
                  <select
                    id="selectedVeda"
                    name="selectedVeda"
                    className={`form-select ${formErrors.selectedVeda ? 'input-error' : ''}`}
                    value={formData.selectedVeda}
                    onChange={handleInputChange}
                    required
                  >
                    {VEDA_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {formErrors.selectedVeda && (
                    <span className="error-text">{formErrors.selectedVeda}</span>
                  )}
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label htmlFor="fatherName" className="field-label">
                    {t('vedic.lblFatherName')} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    className={`form-input ${formErrors.fatherName ? 'input-error' : ''}`}
                    placeholder={t('vedic.phFather')}
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.fatherName && (
                    <span className="error-text">{formErrors.fatherName}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="motherName" className="field-label">
                    {t('vedic.lblMotherName')} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="motherName"
                    name="motherName"
                    className={`form-input ${formErrors.motherName ? 'input-error' : ''}`}
                    placeholder={t('vedic.phMother')}
                    value={formData.motherName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.motherName && (
                    <span className="error-text">{formErrors.motherName}</span>
                  )}
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label htmlFor="phone" className="field-label">
                    {t('vedic.lblPhoneField')} <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                    placeholder={t('vedic.phPhone')}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="nativePlace" className="field-label">
                    {t('vedic.lblNative')}
                  </label>
                  <input
                    type="text"
                    id="nativePlace"
                    name="nativePlace"
                    className="form-input"
                    placeholder={t('vedic.phNative')}
                    value={formData.nativePlace}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-field-group form-field-group--spaced">
                <label htmlFor="notes" className="field-label">
                  {t('vedic.lblNotes')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  rows="3"
                  placeholder={t('vedic.phNotes')}
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              {submitError && (
                <div className="form-submit-error">
                  ⚠️ {submitError}
                </div>
              )}

              <div className="form-submit-wrap">
                <button
                  type="submit"
                  className="btn primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>{t('vedic.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('vedic.submitEnroll')}</span>
                      <span className="btn-arrow">&rarr;</span>
                    </>
                  )}
                </button>
                <div className="form-security-note">
                  🔒 {t('vedic.securityNote')}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="wrap vedic-footer-contact" aria-label="Gurukul Contact Information">
        <div className="vedic-contact-box">
          <h3 className="contact-box-title">{t('vedic.contactTitle')}</h3>
          <p className="contact-box-sub">{t('vedic.contactSub')}</p>
          <div className="contact-details-grid">
            <div>
              <strong>📍 {t('vedic.contactLoc')}</strong><br />
              {t('vedic.contactLocVal')}
            </div>
            <div>
              <strong>📞 {t('vedic.contactHelp')}</strong><br />
              +91 98765 43210 (9:00 AM – 6:00 PM)
            </div>
            <div>
              <strong>✉ {t('vedic.contactEmail')}</strong><br />
              vedapathashala@srivaridasudu.org
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

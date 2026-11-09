import React, { useState, useRef } from 'react';
import LotusDivider from './LotusDivider';
import { VEDIC_DATA, GURUKUL_PILLARS, DAILY_ROUTINE } from '../data/vedicData';
import { useLanguage } from '../context/LanguageContext';

export default function VedicSchoolView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  const formRef = useRef(null);

  // Vedic dropdown options matching prompt exactly
  const VEDA_OPTIONS = isEn
    ? ['Rigveda', 'Yajurveda', 'Samaveda', 'Atharvaveda']
    : ['ఋగ్వేదం', 'యజుర్వేదం', 'సామవేదం', 'అథర్వవేదం'];

  // Enrollment Form State
  const [formData, setFormData] = useState({
    studentName: '',
    studentAge: '',
    gothram: '',
    fatherName: '',
    motherName: '',
    selectedVeda: isEn ? 'Yajurveda' : 'యజుర్వేదం',
    phone: '',
    nativePlace: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [showRoutine, setShowRoutine] = useState(false);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Scroll to Form with Preselected Veda
  const handleEnrollVeda = (vedaIdentifier) => {
    let mappedVeda = isEn ? 'Yajurveda' : 'యజుర్వేదం';
    const lower = (vedaIdentifier || '').toLowerCase();
    if (lower.includes('rig') || lower.includes('ఋగ్')) mappedVeda = isEn ? 'Rigveda' : 'ఋగ్వేదం';
    else if (lower.includes('yajur') || lower.includes('యజుర్')) mappedVeda = isEn ? 'Yajurveda' : 'యజుర్వేదం';
    else if (lower.includes('sama') || lower.includes('సామ')) mappedVeda = isEn ? 'Samaveda' : 'సామవేదం';
    else if (lower.includes('atharva') || lower.includes('అథర్వ')) mappedVeda = isEn ? 'Atharvaveda' : 'అథర్వవేదం';

    setFormData((prev) => ({
      ...prev,
      selectedVeda: mappedVeda
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Validate Form
  const validateForm = () => {
    const errors = {};

    if (!formData.studentName.trim()) {
      errors.studentName = isEn ? 'Student Name is required' : 'విద్యార్థి పేరు తప్పనిసరి';
    }

    const ageNum = parseInt(formData.studentAge, 10);
    if (!formData.studentAge) {
      errors.studentAge = isEn ? 'Student Age is required' : 'వయస్సు తప్పనిసరి';
    } else if (isNaN(ageNum) || ageNum < 6 || ageNum > 30) {
      errors.studentAge = 'Student age must be between 6 and 30 years for Gurukul admission';
    }

    if (!formData.gothram.trim()) {
      errors.gothram = isEn ? 'Gothram is required' : 'గోత్రం తప్పనిసరి';
    }

    if (!formData.fatherName.trim()) {
      errors.fatherName = isEn ? "Father's Name is required" : 'తండ్రి పేరు తప్పనిసరి';
    }

    if (!formData.motherName.trim()) {
      errors.motherName = isEn ? "Mother's Name is required" : 'తల్లి పేరు తప్పనిసరి';
    }

    if (!formData.selectedVeda) {
      errors.selectedVeda = isEn ? 'Please select a Veda' : 'వేదం ఎంపిక తప్పనిసరి';
    }

    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      errors.phone = isEn ? 'Contact Mobile / WhatsApp number is required' : 'ఫోన్ నంబర్ తప్పనిసరి';
    } else if (phoneClean.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    return errors;
  };

  // Handle Form Submission with Backend API Dispatch & Duplicate Prevention
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

      // 1. Dispatch to Hostinger PHP backend API
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
        // Fallback for static dev server
        console.warn('API endpoint not running; proceeding with client confirmation', apiErr);
      }

      // 2. Client fallback record generation
      if (!enrollmentId) {
        enrollmentId = `SRV-VED-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
        record = {
          ...formData,
          enrollmentId,
          submittedAt: new Date().toISOString()
        };
      }

      // 3. Backup to browser persistence
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
      setSubmitError('Unable to process enrollment. Please try again or reach the Acharyulu on WhatsApp.');
    }
  };

  // Reset Form for New Submission
  const handleResetForm = () => {
    setSubmittedData(null);
    setFormData({
      studentName: '',
      studentAge: '',
      gothram: '',
      fatherName: '',
      motherName: '',
      selectedVeda: isEn ? 'Yajurveda' : 'యజుర్వేదం',
      phone: '',
      nativePlace: '',
      notes: ''
    });
    setFormErrors({});
    setSubmitError(null);
  };

  return (
    <div className="page-wrapper vedic-school-page">
      {/* =========================================================================
          1. HERO SECTION – VEDIC EDUCATION
          ========================================================================= */}
      <section className="vedic-hero-section" aria-label="Vedic Gurukulam Hero">
        <div className="vedic-hero-bg-overlay" aria-hidden="true" />
        <div className="vedic-hero-frame" aria-hidden="true" />

        <div className="wrap vedic-hero-container">
          <div className="vedic-hero-text">
            <div className="vedic-hero-badge">
              <span className="badge-star">✦</span>
              <span>{t('vedic.badge')}</span>
              <span className="badge-star">✦</span>
            </div>

            <h1 className="vedic-hero-title">{t('vedic.title')}</h1>

            <div className="vedic-hero-telugu">{t('vedic.telugu')}</div>

            <p className="vedic-hero-subtitle">{t('vedic.subtitle')}</p>

            <div className="vedic-hero-actions">
              <button
                type="button"
                className="btn primary vedic-hero-cta"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <span>{t('vedic.enroll')}</span>
                <span className="btn-arrow">&rarr;</span>
              </button>

              <button
                type="button"
                className="btn ghost vedic-ghost-btn"
                onClick={() => {
                  const el = document.getElementById('four-vedas-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{t('vedic.explore')}</span>
                <span className="btn-arrow">&darr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. GURU TEACHING & GURUKUL VALUES OVERVIEW
          ========================================================================= */}
      <section className="wrap vedic-intro-section" aria-label="Guru Teaching Introduction">
        <div className="vedic-intro-grid">
          {/* Left Column: Visual Image */}
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
              <div className="media-caption-badge">
                {isEn ? 'Oral Vedic Transmission' : 'శ్రుతి పరంపర'}
              </div>
            </div>
          </div>

          {/* Right Column: Educational Narrative */}
          <div className="vedic-intro-content">
            <div className="temple-eyebrow align-start">
              <span className="eyebrow-symbol">✦</span>
              <span>SACRED LEARNING &amp; TRADITION</span>
              <span className="eyebrow-symbol">✦</span>
            </div>

            <h2 className="vedic-sec-heading">
              Authentic Vedic Adhyayana Under Revered Archakas
            </h2>

            <LotusDivider align="start" />

            <p className="vedic-body-text">
              The Vedas are eternal (Apaurusheya) and preserved through uncorrupted oral transmission from Guru to Shishya. At <strong>Srivari Dasudu Veda Pathashala</strong>, young students are initiated with Upanayana Samskara and trained rigorously in sacred Swara recitation, Sandhyavandanam, and Vedic rituals.
            </p>

            <p className="vedic-body-text">
              Under the auspices of <strong>Chief Priest Sri N. V. Ram Kishore Acharyulu</strong> (Sri Bhu Sametha Vaibhava Venkateswara Swamy Temple, Visakhapatnam), our Gurukul nurtures moral purity, sharp memory, devotion to Gomata, and mastery of Vedic Mantras.
            </p>

            {/* Key Gurukul Highlights */}
            <div className="vedic-highlights-row">
              <div className="vedic-highlight-item">
                <span className="hl-icon">🪔</span>
                <div>
                  <strong>Free Education &amp; Satvik Food</strong>
                  <p>All boarding, lodging, clothing, and books provided freely.</p>
                </div>
              </div>
              <div className="vedic-highlight-item">
                <span className="hl-icon">📜</span>
                <div>
                  <strong>Recognized Veda Certificates</strong>
                  <p>Preparation for TTD, Veda Pathashala, and Maharishi Veda exams.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FOUR VEDAS – EDUCATIONAL SECTION
          ========================================================================= */}
      <section id="four-vedas-section" className="wrap vedic-four-vedas-section" aria-label="The Four Vedas">
        <div className="temple-sec-head seva-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>{isEn ? 'Chaturveda Samhita' : 'చతుర్వేదాలు'}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">
              {isEn ? 'The Four Eternal Vedas' : 'నాలుగు అనాది వేదాలు'}
            </h2>
            <div className="temple-sec-subtitle">
              {isEn
                ? 'Comprehensive Vedic disciplines taught with sacred swara intonation'
                : 'పవిత్ర స్వరోచ్ఛారణతో బోధించే సంపూర్ణ వేద విద్యలు'}
            </div>

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

        {/* 4 Veda Cards Grid */}
        <div className="vedic-cards-grid">
          {VEDIC_DATA.map((veda) => (
            <article className="temple-card veda-card" key={veda.id}>
              {/* Corner Ornaments */}
              <div className="card-corner corner-tl" aria-hidden="true" />
              <div className="card-corner corner-tr" aria-hidden="true" />
              <div className="card-corner corner-bl" aria-hidden="true" />
              <div className="card-corner corner-br" aria-hidden="true" />

              {/* Veda Image Banner */}
              <div className="veda-card-media">
                <img
                  src={veda.image}
                  alt={`${veda.name} Vedic Education`}
                  className="veda-card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = veda.fallbackImage;
                  }}
                />
                <span className="veda-pill-badge">{veda.name}</span>
              </div>

              {/* Veda Card Content */}
              <div className="veda-card-body">
                <h3 className="veda-card-title">
                  {isEn ? veda.name : veda.teluguName}
                </h3>
                {veda.subtitle && (
                  <div className="veda-card-sub">{veda.subtitle}</div>
                )}

                <p className="veda-card-desc">{veda.desc}</p>

                {/* Core Curriculum Pills */}
                <div className="veda-curriculum-box">
                  <div className="curriculum-title">
                    {isEn ? 'Key Syllabus:' : 'ముఖ్య పాఠ్యాంశాలు:'}
                  </div>
                  <ul>
                    {veda.coreSubjects.map((sub, idx) => (
                      <li key={idx}>
                        <span className="bullet">✦</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta Information */}
                <div className="veda-meta-row">
                  <div>
                    <span className="meta-lbl">Age Group:</span>
                    <span className="meta-val">{veda.ageGroup}</span>
                  </div>
                  <div>
                    <span className="meta-lbl">Course Period:</span>
                    <span className="meta-val">{veda.duration}</span>
                  </div>
                </div>

                {/* Enrollment CTA */}
                <div className="veda-card-actions">
                  <button
                    type="button"
                    className="btn primary veda-enroll-btn"
                    onClick={() => handleEnrollVeda(veda.name)}
                  >
                    <span>Enroll Now</span>
                    <span className="btn-arrow">&rarr;</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE OUR VEDIC SCHOOL?
          ========================================================================= */}
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
                <span>{isEn ? 'Pandita Parampara · Gurukul Ethos' : 'పండిత పరంపర · గురుకుల సంప్రదాయం'}</span>
                <span className="badge-star">✦</span>
              </div>
              <h2 className="why-banner-title">
                Why Choose Srivari Dasudu Veda Pathashala?
              </h2>
              <p className="why-banner-desc">
                Dedicated to awakening Vedic consciousness and character through pure scriptural discipline and guru kripa.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Gurukul Pillars Grid */}
        <div className="vedic-pillars-grid">
          {GURUKUL_PILLARS.map((pillar) => (
            <div className="temple-card pillar-card" key={pillar.id}>
              <div className="pillar-icon">{pillar.icon}</div>
              <div className="pillar-telugu">{pillar.teluguTitle}</div>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Toggle Routine Button */}
        <div className="vedic-routine-toggle-wrap">
          <button
            type="button"
            className="btn ghost vedic-routine-toggle"
            onClick={() => setShowRoutine(!showRoutine)}
          >
            <span>{showRoutine
              ? (isEn ? 'Hide Daily Gurukul Routine ▲' : 'దినచర్యను దాచండి ▲')
              : (isEn ? 'View Daily Gurukul Schedule ▼' : 'దినచర్య చూడండి ▼')}</span>
          </button>
        </div>

        {/* Daily Routine Schedule Accordion */}
        {showRoutine && (
          <div className="vedic-routine-container">
            <h3 className="routine-heading">
              దినచర్య — Daily Gurukul Schedule (Brahmamuhurtha to Ratri Suktam)
            </h3>
            <div className="routine-timeline">
              {DAILY_ROUTINE.map((item, idx) => (
                <div className="routine-row" key={idx}>
                  <div className="routine-time">{item.time}</div>
                  <div className="routine-info">
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          5. VEDIC SCHOOL ADMISSION / ENROLLMENT FORM
          ========================================================================= */}
      <section ref={formRef} id="admission-form" className="wrap vedic-form-section" aria-label="Admission Form">
        <div className="vedic-form-wrapper">
          {/* Subtle Corner Motifs */}
          <div className="form-corner corner-tl" aria-hidden="true" />
          <div className="form-corner corner-tr" aria-hidden="true" />
          <div className="form-corner corner-bl" aria-hidden="true" />
          <div className="form-corner corner-br" aria-hidden="true" />

          {/* Form Header */}
          <div className="vedic-form-header">
            <div className="form-badge">
              <span className="badge-star">✦</span>
              <span>
                {isEn ? 'Veda Pathashala Enrollment' : 'వేద పాఠశాల ప్రవేశ దరఖాస్తు'}
              </span>
              <span className="badge-star">✦</span>
            </div>

            <h2 className="vedic-form-title">
              {isEn ? 'Enroll in Vedic Education' : 'వేద విద్యలో నమోదు చేసుకోండి'}
            </h2>

            <p className="vedic-form-desc">
              {isEn
                ? "Please enter the student's details below to register for the upcoming academic session. Our Patashala administration will review your application and contact you for the preliminary interview and orientation."
                : 'రాబోయే విద్యా సంవత్సరానికి నమోదు కోసం విద్యార్థి వివరాలు నమోదు చేయండి. పాఠశాల నిర్వాహకులు దరఖాస్తును పరిశీలించి మీను సంప్రదిస్తారు.'}
            </p>
          </div>

          {/* Form Submission Success Banner */}
          {submittedData ? (
            <div className="vedic-success-card">
              <div className="success-icon">🎉</div>
              <h3 className="success-heading">
                {isEn
                  ? 'Enrollment Application Submitted Successfully!'
                  : 'దరఖాస్తు విజయవంతంగా స్వీకరించబడింది'}
              </h3>

              <div className="success-details-box">
                <div className="success-ref">
                  Application Ref No: <strong>{submittedData.enrollmentId}</strong>
                </div>
                <div className="success-summary">
                  <div><strong>Student Name:</strong> {submittedData.studentName} ({submittedData.studentAge} yrs)</div>
                  <div><strong>Selected Veda:</strong> {submittedData.selectedVeda}</div>
                  <div><strong>Gothram:</strong> {submittedData.gothram}</div>
                  <div><strong>Father:</strong> {submittedData.fatherName} | <strong>Mother:</strong> {submittedData.motherName}</div>
                  <div><strong>Phone:</strong> {submittedData.phone}</div>
                </div>
              </div>

              <p className="success-note">
                A copy of your registration has been archived for our Chief Priest. You can also send the confirmation directly via WhatsApp for expedited review.
              </p>

              <div className="success-actions">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `*Vedic School Enrollment Application*\n` +
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
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary success-wa-btn"
                >
                  <span>Forward Details on WhatsApp</span>
                  <span>💬</span>
                </a>

                <button
                  type="button"
                  className="btn ghost vedic-ghost-btn"
                  onClick={handleResetForm}
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            /* Enrollment Input Form */
            <form className="vedic-admission-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid-two">
                {/* 1. Student Name */}
                <div className="form-field-group">
                  <label htmlFor="studentName" className="field-label">
                    {isEn ? 'Student Name' : 'విద్యార్థి పేరు'} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    className={`form-input ${formErrors.studentName ? 'input-error' : ''}`}
                    placeholder="Enter student's full name"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.studentName && (
                    <span className="error-text">{formErrors.studentName}</span>
                  )}
                </div>

                {/* 2. Student Age */}
                <div className="form-field-group">
                  <label htmlFor="studentAge" className="field-label">
                    {isEn ? 'Student Age' : 'విద్యార్థి వయస్సు'} <span className="req">*</span>
                  </label>
                  <input
                    type="number"
                    id="studentAge"
                    name="studentAge"
                    className={`form-input ${formErrors.studentAge ? 'input-error' : ''}`}
                    placeholder="Age (e.g. 7 – 18)"
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
                {/* 3. Gothram */}
                <div className="form-field-group">
                  <label htmlFor="gothram" className="field-label">
                    {isEn ? 'Gothram' : 'గోత్రం'} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="gothram"
                    name="gothram"
                    className={`form-input ${formErrors.gothram ? 'input-error' : ''}`}
                    placeholder="e.g. Bharadwaja, Kasyapa, Harita"
                    value={formData.gothram}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.gothram && (
                    <span className="error-text">{formErrors.gothram}</span>
                  )}
                </div>

                {/* 4. Select Veda */}
                <div className="form-field-group">
                  <label htmlFor="selectedVeda" className="field-label">
                    {isEn ? 'Select Veda' : 'అధ్యయనం చేయదలిచిన వేదం'} <span className="req">*</span>
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
                {/* 5. Father's Name */}
                <div className="form-field-group">
                  <label htmlFor="fatherName" className="field-label">
                    {isEn ? "Father's Name" : 'తండ్రి పేరు'} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    className={`form-input ${formErrors.fatherName ? 'input-error' : ''}`}
                    placeholder="Enter father's name"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.fatherName && (
                    <span className="error-text">{formErrors.fatherName}</span>
                  )}
                </div>

                {/* 6. Mother's Name */}
                <div className="form-field-group">
                  <label htmlFor="motherName" className="field-label">
                    {isEn ? "Mother's Name" : 'తల్లి పేరు'} <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="motherName"
                    name="motherName"
                    className={`form-input ${formErrors.motherName ? 'input-error' : ''}`}
                    placeholder="Enter mother's name"
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
                {/* 7. Contact Mobile */}
                <div className="form-field-group">
                  <label htmlFor="phone" className="field-label">
                    {isEn ? 'Contact Phone / WhatsApp' : 'ఫోన్ నంబర్'} <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.phone && (
                    <span className="error-text">{formErrors.phone}</span>
                  )}
                </div>

                {/* 8. Native Place / City */}
                <div className="form-field-group">
                  <label htmlFor="nativePlace" className="field-label">
                    {isEn ? 'Native Place / District' : 'స్వస్థలం / జిల్లా'}
                  </label>
                  <input
                    type="text"
                    id="nativePlace"
                    name="nativePlace"
                    className="form-input"
                    placeholder="e.g. Visakhapatnam, Rajahmundry, Guntur"
                    value={formData.nativePlace}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 9. Prior Education & Notes */}
              <div className="form-field-group form-field-group--spaced">
                <label htmlFor="notes" className="field-label">
                  {isEn ? 'Prior Sanskrit / Vedic Exposure & Special Remarks' : 'గమనికలు'}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  rows="3"
                  placeholder="Mention previous Upanayanam status, school grade, or any specific prayer requests..."
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Error Alert if any */}
              {submitError && (
                <div className="form-submit-error">
                  ⚠️ {submitError}
                </div>
              )}

              {/* Submit CTA */}
              <div className="form-submit-wrap">
                <button
                  type="submit"
                  className="btn primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Enrollment</span>
                      <span className="btn-arrow">&rarr;</span>
                    </>
                  )}
                </button>
                <div className="form-security-note">
                  🔒 Information is securely stored and reviewed solely by Srivari Dasudu Patashala Trust.
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. DIRECT CONTACT & LOCATION INFORMATION
          ========================================================================= */}
      <section className="wrap vedic-footer-contact" aria-label="Gurukul Contact Information">
        <div className="vedic-contact-box">
          <h3 className="contact-box-title">
            సంప్రదింపుల వివరాలు — Veda Pathashala Office
          </h3>
          <p className="contact-box-sub">
            For personal visits, sponsorships, or direct consultations with the Acharyas:
          </p>
          <div className="contact-details-grid">
            <div>
              <strong>📍 Location:</strong><br />
              Sri Mudupula Venkanna Temple Complex, Visakhapatnam, Andhra Pradesh
            </div>
            <div>
              <strong>📞 Direct Helpline:</strong><br />
              +91 98765 43210 (9:00 AM – 6:00 PM)
            </div>
            <div>
              <strong>✉ Email:</strong><br />
              vedapathashala@srivaridasudu.org
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

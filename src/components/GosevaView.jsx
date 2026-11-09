import React, { useState, useRef } from 'react';
import LotusDivider from './LotusDivider';
import { useLanguage } from '../context/LanguageContext';

export default function GosevaView({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();
  // Seva options & selection state
  const [selectedSeva, setSelectedSeva] = useState('Go Seva');
  const [selectedAmount, setSelectedAmount] = useState('₹500');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gotram: '',
    prayer: '',
    consent: true
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const formRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToForm = (sevaType) => {
    if (sevaType) {
      setSelectedSeva(sevaType);
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sevaActivities = [
    {
      id: 'nourishment',
      icon: '🌾',
      title: 'Gosala Nourishment',
      desc: 'Supporting daily nutritious Napier grass, sorghum, clean drinking water, and mineral supplements for all resident cows.'
    },
    {
      id: 'care',
      icon: '🩺',
      title: 'Cow Care',
      desc: 'Supporting appropriate veterinary health checkups, preventive vaccinations, medicines, and elderly cow care.'
    },
    {
      id: 'shelter',
      icon: '🏛',
      title: 'Shelter & Protection',
      desc: 'Helping maintain clean, ventilated, covered sheds that shield indigenous cattle from rain, summer heat, and cold winds.'
    },
    {
      id: 'daily',
      icon: '🪔',
      title: 'Daily Go Seva',
      desc: 'Supporting daily grooming, hygiene, and the ongoing welfare needs of the temple goshala in Visakhapatnam.'
    }
  ];

  const sevaOptions = [
    {
      id: 'Go Seva',
      badge: 'POPULAR SEVA',
      title: 'Go Seva',
      telugu: 'గో సంరక్షణ సేవ',
      desc: 'Support the ongoing care, daily maintenance, and holistic nourishment of sacred cows.',
      recommended: '₹500'
    },
    {
      id: 'Fodder Seva',
      badge: 'NITYA SEVA',
      title: 'Fodder Seva',
      telugu: 'పచ్చిగడ్డి & దాణా సేవ',
      desc: 'Contribute toward fresh green fodder, husk, jaggery, and balanced nutritional feed.',
      recommended: '₹250'
    },
    {
      id: 'Go Dhanam Sponsorship',
      badge: 'SACRED SANKALPAM',
      title: 'Go Dhanam Sponsorship',
      telugu: 'మహా గోదాన స్పాన్సర్‌షిప్',
      desc: 'Support an approved Go Dhanam or lifetime cow-care initiative with family gotra sankalpam.',
      recommended: '₹11,000'
    }
  ];

  const presets = [
    { amount: '₹250', label: '1 Day Grass' },
    { amount: '₹500', label: '1 Week Care' },
    { amount: '₹1,100', label: 'Nutrition & Fodder' },
    { amount: '₹2,500', label: '1 Month Fodder' },
    { amount: '₹5,000', label: 'Special Go Seva' },
    { amount: '₹11,000', label: 'Go Dhanam Seva' }
  ];

  const faqs = [
    {
      q: 'What is Go Dhanam Seva?',
      a: 'Go Dhanam is the sacred Hindu tradition of offering and protecting cows (Gomata). Rooted in Vedic scriptures, serving and nurturing cows is revered as an act of profound compassion that removes negative karmas and invites domestic harmony.'
    },
    {
      q: 'How can I contribute to Go Seva?',
      a: 'You can contribute online by selecting your preferred seva (Go Seva, Fodder Seva, or Go Dhanam Sponsorship), filling in your details with Gotra and prayer intention, and submitting the contribution via our verified temple coordinator.'
    },
    {
      q: 'Can I contribute toward cow fodder?',
      a: 'Yes. Fodder Seva allows devotees to sponsor fresh green grass, fodder, and nutritional bran starting from ₹250 for one day or ₹2,500 for a month.'
    },
    {
      q: 'Can I submit a prayer or Sankalpam request?',
      a: 'Absolutely. During contribution, you can enter your family Gotram, Janma Nakshatram, and specific prayer intentions. Chief Priest Sri N. V. Ram Kishore Acharyulu offers prayers during daily goshala kainkaryam.'
    },
    {
      q: 'Will I receive a receipt or confirmation?',
      a: 'Yes. Upon submitting your seva details, you will receive an immediate confirmation summary and direct acknowledgment from our temple seva coordinator via WhatsApp and phone.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? `₹${customAmount}` : selectedAmount;
    const msg =
      `*Go Dhanam Seva Contribution Request*\n` +
      `*Seva:* ${selectedSeva}\n` +
      `*Amount:* ${finalAmount}\n` +
      `*Devotee Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      (formData.email ? `*Email:* ${formData.email}\n` : '') +
      (formData.gotram ? `*Gotram / Nakshatram:* ${formData.gotram}\n` : '') +
      (formData.prayer ? `*Prayer Intention:* ${formData.prayer}\n` : '');

    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setFormSubmitted(true);
  };

  return (
    <div className="page-wrapper godhanam-page-wrapper">
      
      {/* =========================================================================
          SECTION 1 — HERO BANNER
          ========================================================================= */}
      <section className="godhanam-hero" aria-label="Go Dhanam Seva Hero Banner">
        <div className="godhanam-hero-overlay" aria-hidden="true" />
        
        {/* Subtle Decorative Corners */}
        <div className="card-corner corner-tl" aria-hidden="true" />
        <div className="card-corner corner-tr" aria-hidden="true" />
        <div className="card-corner corner-bl" aria-hidden="true" />
        <div className="card-corner corner-br" aria-hidden="true" />

        <div className="godhanam-container godhanam-hero-content">
          <div className="godhanam-eyebrow">
            <span className="eyebrow-accent">✦</span>
            <span>{t('goseva.badge')}</span>
            <span className="eyebrow-accent">✦</span>
          </div>

          <h1 className="godhanam-hero-title">{t('goseva.title')}</h1>

          <div className="godhanam-hero-telugu">{t('goseva.telugu')}</div>

          <p className="godhanam-hero-desc">{t('goseva.desc')}</p>

          <div className="godhanam-hero-actions">
            <button
              type="button"
              className="btn primary godhanam-cta-btn"
              onClick={() => scrollToForm('Go Seva')}
            >
              {t('goseva.contribute')}
            </button>
            <button
              type="button"
              className="btn ghost godhanam-learn-btn"
              onClick={scrollToAbout}
            >
              {t('goseva.learn')}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — ABOUT GO DHANAM SEVA
          ========================================================================= */}
      <section className="godhanam-section" ref={aboutRef} aria-label="About Go Dhanam Seva">
        <div className="godhanam-container">
          <div className="godhanam-about-grid">
            
            {/* Left Column: Meaningful Content */}
            <div className="godhanam-about-text">
              <div className="godhanam-sec-eyebrow">
                <span>✦</span>
                <span>VEDIC SANATANA TRADITION</span>
                <span>✦</span>
              </div>

              <h2 className="godhanam-sec-heading">
                The Sacred Tradition of Go Dhanam
              </h2>

              {/* Gold Divider */}
              <LotusDivider align="start" />

              <div className="godhanam-telugu-shloka">
                “గావో విశ్వస్య మాతరః — గో సంరక్షణేన సర్వదేవతా ప్రీతిః”
              </div>

              <p className="godhanam-body-para">
                In Vedic culture, Gomata is revered as a mother who selflessly sustains life with her sacred gifts. 
                Go Dhanam and Go Seva represent the highest expressions of empathy, humility, and gratitude toward all living beings.
              </p>

              <p className="godhanam-body-para">
                Through our temple goshala at Visakhapatnam, indigenous and rescued cows are sheltered in a peaceful, 
                clean environment where they receive daily green fodder, clean drinking water, regular health checks, 
                and respectful care throughout their natural lives.
              </p>

              <div className="godhanam-about-points">
                <div className="point-item">
                  <span className="point-icon">🪔</span>
                  <span>Promotes compassion and ethical stewardship of indigenous Indian cattle.</span>
                </div>
                <div className="point-item">
                  <span className="point-icon">🌾</span>
                  <span>Daily fresh fodder and clean water provided for 60+ resident cows.</span>
                </div>
                <div className="point-item">
                  <span className="point-icon">🏛</span>
                  <span>Sanctified under the guidance of Chief Priest Sri N. V. Ram Kishore Acharyulu.</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Image */}
            <div className="godhanam-about-media">
              <div className="godhanam-image-frame">
                <span className="card-corner corner-tl" aria-hidden="true" />
                <span className="card-corner corner-tr" aria-hidden="true" />
                <span className="card-corner corner-bl" aria-hidden="true" />
                <span className="card-corner corner-br" aria-hidden="true" />
                <img
                  src="/images/cow.jpg"
                  alt="Sacred Gomata in temple gosala"
                  className="godhanam-about-img"
                  loading="lazy"
                />
                <div className="godhanam-img-caption">
                  <span>Sri Mudupula Venkanna Temple Goshala • Visakhapatnam</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — GO SEVA ACTIVITIES
          ========================================================================= */}
      <section className="godhanam-section godhanam-activities-bg" aria-label="Go Seva Activities">
        <div className="godhanam-container">
          <div className="godhanam-section-header">
            <div className="godhanam-sec-eyebrow">
              <span>✦</span>
              <span>HOW YOUR CONTRIBUTION IS USED</span>
              <span>✦</span>
            </div>
            <h2 className="godhanam-sec-heading">Every Offering Supports a Sacred Purpose</h2>
            
            <LotusDivider />

            <p className="godhanam-sec-sub">
              Every rupee offered toward Go Seva directly supports the physical welfare, nutrition, and healthcare of the cows.
            </p>
          </div>

          <div className="godhanam-activities-grid">
            {sevaActivities.map((act) => (
              <div key={act.id} className="godhanam-activity-card">
                <div className="activity-icon-wrap">
                  <span className="activity-icon">{act.icon}</span>
                </div>
                <h3 className="activity-card-title">{act.title}</h3>
                <p className="activity-card-desc">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — SEVA CONTRIBUTIONS & DONATION FLOW
          ========================================================================= */}
      <section className="godhanam-section" ref={formRef} aria-label="Participate in Go Dhanam Seva">
        <div className="godhanam-container">
          <div className="godhanam-section-header">
            <div className="godhanam-sec-eyebrow">
              <span>✦</span>
              <span>ONLINE GO SEVA PARTICIPATION</span>
              <span>✦</span>
            </div>
            <h2 className="godhanam-sec-heading">Participate in Go Dhanam Seva</h2>

            <LotusDivider />

            <p className="godhanam-sec-sub">
              Choose a seva option below to support our resident cows. All offerings are acknowledged with prayer intentions.
            </p>
          </div>

          {/* 3 Visually Attractive Options */}
          <div className="godhanam-options-grid">
            {sevaOptions.map((opt) => {
              const isSelected = selectedSeva === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`godhanam-option-card ${isSelected ? 'selected' : ''}`}
                >
                  <span className="card-corner corner-tl" aria-hidden="true" />
                  <span className="card-corner corner-tr" aria-hidden="true" />
                  <span className="card-corner corner-bl" aria-hidden="true" />
                  <span className="card-corner corner-br" aria-hidden="true" />

                  <span className="option-badge">{opt.badge}</span>
                  <h3 className="option-title">
                    {isEn ? opt.title : opt.telugu}
                  </h3>
                  <p className="option-desc">{opt.desc}</p>
                  
                  <div className="option-action-row">
                    <button
                      type="button"
                      className={`btn ${isSelected ? 'primary' : 'ghost'} option-select-btn`}
                      onClick={() => {
                        setSelectedSeva(opt.id);
                        setSelectedAmount(opt.recommended);
                      }}
                    >
                      {isSelected ? '✓ Selected' : 'Contribute Now &rarr;'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unified Devotee Contribution Form */}
          <div className="godhanam-form-wrapper">
            <div className="godhanam-form-header">
              <h3 className="form-card-title">Devotee Seva Contribution Form</h3>
              <p className="form-card-subtitle">
                Selected Seva: <strong>{selectedSeva}</strong> • Enter your details for Sankalpam
              </p>
            </div>

            {!formSubmitted ? (
              <form className="godhanam-form" onSubmit={handleFormSubmit}>
                
                {/* Preset Amount Chips */}
                <div className="form-row-block">
                  <label className="form-field-label">Select Contribution Amount *</label>
                  <div className="amount-chips-grid">
                    {presets.map((p, idx) => (
                      <button
                        type="button"
                        key={idx}
                        className={`amount-chip ${selectedAmount === p.amount && !customAmount ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAmount(p.amount);
                          setCustomAmount('');
                        }}
                      >
                        <span className="chip-amt">{p.amount}</span>
                        <span className="chip-lbl">{p.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="custom-amt-input-wrap">
                    <span className="currency-prefix">₹</span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount in Rupees"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount('');
                      }}
                      className="form-input custom-amt-input"
                      min="100"
                    />
                  </div>
                </div>

                {/* Devotee Info */}
                <div className="form-grid-two">
                  <div>
                    <label className="form-field-label">Devotee Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-field-label">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-two">
                  <div>
                    <label className="form-field-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="devotee@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-field-label">Seva Type *</label>
                    <select
                      value={selectedSeva}
                      onChange={(e) => setSelectedSeva(e.target.value)}
                      className="form-input form-select"
                    >
                      <option value="Go Seva">Go Seva (General Care)</option>
                      <option value="Fodder Seva">Fodder Seva (Grass & Feed)</option>
                      <option value="Go Dhanam Sponsorship">Go Dhanam Sponsorship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-field-label">Family Gotram &amp; Nakshatram (For Sankalpam)</label>
                  <input
                    type="text"
                    name="gotram"
                    placeholder="e.g. Kashyapa Gotram, Rohini Nakshatram"
                    value={formData.gotram}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-field-label">Prayer or Sankalpam Intention (Optional)</label>
                  <textarea
                    name="prayer"
                    rows="3"
                    placeholder="Mention any specific prayer intention (e.g. Health, Family Peace, Birthday, Memorial Tithi)..."
                    value={formData.prayer}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="consent-checkbox-wrap">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                    />
                    <span>
                      I consent to sharing these details for my sacred sankalpam and receiving seva acknowledgment via WhatsApp/SMS.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn primary form-submit-btn"
                >
                  Confirm Seva &amp; Proceed via WhatsApp &rarr;
                </button>

                <p className="payment-note-disclaimer">
                  🔒 Payments are verified securely through our temple seva desk and direct WhatsApp confirmation.
                </p>
              </form>
            ) : (
              <div className="form-success-box">
                <div className="success-icon">✓</div>
                <h4 className="success-heading">Go Seva Details Recorded</h4>
                <p className="success-para">
                  Thank you, <strong>{formData.name}</strong>. Your seva request for <strong>{selectedSeva}</strong> ({customAmount ? `₹${customAmount}` : selectedAmount}) has been prepared.
                </p>
                <div className="success-actions">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`*Go Dhanam Seva Inquiry*\nName: ${formData.name}\nPhone: ${formData.phone}\nSeva: ${selectedSeva}\nAmount: ${customAmount ? `₹${customAmount}` : selectedAmount}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary"
                  >
                    Open in WhatsApp to Confirm 📱
                  </a>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Offering
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — HOW IT WORKS & TRUST
          ========================================================================= */}
      <section className="godhanam-section godhanam-steps-bg" aria-label="How It Works and Trust">
        <div className="godhanam-container">
          
          <div className="godhanam-section-header">
            <div className="godhanam-sec-eyebrow">
              <span>✦</span>
              <span>FOUR SIMPLE STEPS</span>
              <span>✦</span>
            </div>
            <h2 className="godhanam-sec-heading">A Simple Way to Participate</h2>

            <LotusDivider />
          </div>

          <div className="godhanam-steps-grid">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h4 className="step-title">Choose Your Seva</h4>
              <p className="step-desc">Select Go Seva, Fodder Seva, or a dedicated Go Dhanam sponsorship.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">2</div>
              <h4 className="step-title">Enter Details</h4>
              <p className="step-desc">Provide your name, contact, Gotra, and optional prayer intention for sankalpam.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">3</div>
              <h4 className="step-title">Complete Contribution</h4>
              <p className="step-desc">Confirm your offering securely through direct WhatsApp temple desk verification.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">4</div>
              <h4 className="step-title">Receive Confirmation</h4>
              <p className="step-desc">Receive acknowledgment, photos of daily goshala kainkaryam, and sankalpam blessings.</p>
            </div>
          </div>

          {/* Compact Trust Box */}
          <div className="godhanam-trust-box">
            <div className="trust-col">
              <span className="trust-icon">🏛</span>
              <div>
                <strong>Temple Affiliation</strong>
                <p>Sri Bhu Sametha Vaibhava Venkateswara Swamy Temple (Mudupula Venkanna), Visakhapatnam.</p>
              </div>
            </div>

            <div className="trust-col">
              <span className="trust-icon">🙏</span>
              <div>
                <strong>Spiritual Guidance</strong>
                <p>Under the direct guidance of Chief Priest Sri N. V. Ram Kishore Acharyulu (Srivari Dasudu).</p>
              </div>
            </div>

            <div className="trust-col">
              <span className="trust-icon">📞</span>
              <div>
                <strong>Verified Support</strong>
                <p>Call or WhatsApp our temple seva desk directly at +91 98765 43210 for inquiries.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — FAQS & FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="godhanam-section" aria-label="Frequently Asked Questions and CTA">
        <div className="godhanam-container">
          
          <div className="godhanam-section-header">
            <div className="godhanam-sec-eyebrow">
              <span>✦</span>
              <span>COMMON QUESTIONS</span>
              <span>✦</span>
            </div>
            <h2 className="godhanam-sec-heading">Frequently Asked Questions</h2>

            <LotusDivider />
          </div>

          {/* Compact Accordion */}
          <div className="godhanam-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-accordion-btn"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-accordion-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Call to Action Section */}
          <div className="godhanam-cta-banner">
            <span className="card-corner corner-tl" aria-hidden="true" />
            <span className="card-corner corner-tr" aria-hidden="true" />
            <span className="card-corner corner-bl" aria-hidden="true" />
            <span className="card-corner corner-br" aria-hidden="true" />

            <div className="godhanam-cta-inner">
              <div className="godhanam-sec-eyebrow godhanam-sec-eyebrow--light">
                <span>✦</span>
                <span>SEVA AS WORSHIP</span>
                <span>✦</span>
              </div>

              <h2 className="godhanam-cta-heading">
                Let Compassion Become Seva
              </h2>

              <p className="godhanam-cta-desc">
                Join us in supporting the care and protection of Gomata through Go Seva.
              </p>

              <div className="godhanam-cta-buttons">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => scrollToForm('Go Seva')}
                >
                  Contribute Now &rarr;
                </button>
                <button
                  type="button"
                  className="btn ghost godhanam-cta-contact"
                  onClick={() => onNavigate('contact')}
                >
                  Contact Us &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

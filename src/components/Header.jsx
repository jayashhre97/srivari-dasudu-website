import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SEVA_OPTIONS = [
  {
    categoryEn: 'Monthly Samuhika Havanalu',
    categoryTe: 'మాస సామూహిక హవనాలు',
    options: [
      { id: 'chitta', labelEn: 'Chitta Nakshatra Monthly Havanam', labelTe: 'చిత్తా నక్షత్ర మాస హవనం' },
      { id: 'moola', labelEn: 'Moola Nakshatra Monthly Havanam', labelTe: 'మూలా నక్షత్ర మాస హవనం' },
      { id: 'swathi', labelEn: 'Swathi Nakshatra Monthly Havanam', labelTe: 'స్వాతి నక్షత్ర మాస హవనం' },
      { id: 'amavasya-havanam', labelEn: 'Amavasya Pitru Tarpana Havanam', labelTe: 'అమావాస్య పితృ తర్పణ హవనం' },
      { id: 'pournami-havanam', labelEn: 'Pournami Sri Sathyanarayana Havanam', labelTe: 'పౌర్ణమి సత్యనారాయణ హవనం' },
    ]
  },
  {
    categoryEn: 'Kamyamu — 15 Sacred Homams',
    categoryTe: 'కామ్యము — 15 పవిత్ర హోమాలు',
    options: [
      { id: 'ganapathi', labelEn: 'Sri Maha Ganapathi Homam', labelTe: 'శ్రీ మహా గణపతి హోమం' },
      { id: 'navagraha', labelEn: 'Sri Navagraha Shanti Homam', labelTe: 'శ్రీ నవగ్రహ శాంతి హోమం' },
      { id: 'ayushya', labelEn: 'Sri Ayushya Homam', labelTe: 'శ్రీ ఆయుష్య హోమం' },
      { id: 'dhanvantari', labelEn: 'Sri Dhanvantari Homam', labelTe: 'శ్రీ ధన్వంతరి హోమం' },
      { id: 'mrityunjaya', labelEn: 'Sri Maha Mrityunjaya Homam', labelTe: 'శ్రీ మహా మృత్యుంజయ హోమం' },
      { id: 'chandi', labelEn: 'Sri Chandi Homam', labelTe: 'శ్రీ చండీ హోమం' },
      { id: 'sudarshana', labelEn: 'Sri Sudarshana Homam', labelTe: 'శ్రీ సుదర్శన హోమం' },
      { id: 'lakshmi-kubera', labelEn: 'Sri Lakshmi Kubera Homam', labelTe: 'శ్రీ లక్ష్మీ కుబేర హోమం' },
      { id: 'santhana-gopala', labelEn: 'Sri Santhana Gopala Homam', labelTe: 'శ్రీ సంతాన గోపాల హోమం' },
      { id: 'swayamvara', labelEn: 'Sri Swayamvara Parvathi Homam', labelTe: 'శ్రీ స్వయంవర పార్వతి హోమం' },
      { id: 'subrahmanya', labelEn: 'Sri Subrahmanya Homam', labelTe: 'శ్రీ సుబ్రహ్మణ్య హోమం' },
      { id: 'saraswathi', labelEn: 'Sri Saraswathi Homam', labelTe: 'శ్రీ సరస్వతీ హోమం' },
      { id: 'rudra', labelEn: 'Sri Rudra Homam', labelTe: 'శ్రీ రుద్ర హోమం' },
      { id: 'hayagreeva', labelEn: 'Sri Hayagreeva Homam', labelTe: 'శ్రీ హయగ్రీవ హోమం' },
      { id: 'vasthu', labelEn: 'Sri Vasthu Homam', labelTe: 'శ్రీ వాస్తు హోమం' },
    ]
  },
  {
    categoryEn: 'Smartam Domestic Ceremonies',
    categoryTe: 'స్మార్తం — గృహ శుభకార్యాలు',
    options: [
      { id: 'gruha-pravesam', labelEn: 'Gruha Pravesam (House Opening)', labelTe: 'గృహ ప్రవేశం' },
      { id: 'barasala', labelEn: 'Bara Shala / Naming Ceremony', labelTe: 'బారసాల / నామకరణం' },
      { id: 'annaprasana', labelEn: 'Anna Prasanna Ceremony', labelTe: 'అన్నప్రాశన' },
      { id: 'vivaham', labelEn: 'Vivaham / Sacred Marriage Rites', labelTe: 'వివాహ సంస్కారాలు' },
      { id: 'upanayanam', labelEn: 'Upanayanam Ceremony', labelTe: 'ఉపనయనం' },
      { id: 'shashti-poorthi', labelEn: 'Shashti Poorthi (60th Birthday)', labelTe: 'షష్టిపూర్తి' },
    ]
  },
  {
    categoryEn: 'Muhurtham Guidance',
    categoryTe: 'ముహూర్త నిర్ణయం',
    options: [
      { id: 'muhurtham-vivaha', labelEn: 'Vivaha (Wedding) Muhurtham', labelTe: 'వివాహ ముహూర్తం' },
      { id: 'muhurtham-gruha', labelEn: 'Gruha Pravesam Muhurtham', labelTe: 'గృహ ప్రవేశ ముహూర్తం' },
      { id: 'muhurtham-general', labelEn: 'Auspicious Muhurtham & Horoscope Consultation', labelTe: 'సకల శుభకార్య ముహూర్తం & జాతక పరిశీలన' },
    ]
  },
  {
    categoryEn: 'Pitru Seva & Tarpana',
    categoryTe: 'పితృ సేవ & తిల తర్పణం',
    options: [
      { id: 'shraddha', labelEn: 'Shraddha Karyam Ceremony', labelTe: 'శ్రాద్ధ కర్మ' },
      { id: 'tarpana', labelEn: 'Amavasya Tila Tarpana', labelTe: 'అమావాస్య తిల తర్పణం' },
      { id: 'pitru-moksha', labelEn: 'Mahalaya Pitru Moksha Seva', labelTe: 'మహాలయ పితృ మోక్ష సేవ' },
    ]
  },
  {
    categoryEn: 'Kamadhenu Gouseva & Godhanam',
    categoryTe: 'గోసేవ & మహాగోదానం',
    options: [
      { id: 'godhanam-seva', labelEn: 'Maha Godhanam (Cow Donation)', labelTe: 'సంపూర్ణ మహాగోదానం' },
      { id: 'goseva-grass', labelEn: 'Desi Cow Daily Grass & Fodder Seva', labelTe: 'నిత్య గోగ్రాస సేవ' },
      { id: 'goshala-care', labelEn: 'Goshala Care & Cow Protection Seva', labelTe: 'గోశాల నిర్వహణ & గో సంరక్షణ' },
    ]
  },
  {
    categoryEn: 'General / Custom Seva',
    categoryTe: 'సాధారణ / విశేష సేవ',
    options: [
      { id: 'custom-seva', labelEn: 'Custom Devotee Vedic Ritual / Seva', labelTe: 'ప్రత్యేక భక్త వైదిక సేవ' },
    ]
  }
];

export default function Header({ activeTab, onSelectTab, onOpenQuickBooking }) {
  const { lang, setLang, t, isEn } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sevaDropdownOpen, setSevaDropdownOpen] = useState(false);
  const [quickBookingOpen, setQuickBookingOpen] = useState(false);
  const [mobileQuickBookingOpen, setMobileQuickBookingOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const quickBookingRef = useRef(null);

  const todayStr = new Date().toISOString().slice(0, 10);
  const [qbFormData, setQbFormData] = useState({
    seva: 'Sri Maha Ganapathi Homam',
    name: '',
    phone: '',
    gotram: '',
    date: todayStr,
    samagri: 'with',
    notes: '',
  });
  const [qbSubmitted, setQbSubmitted] = useState(false);
  const [qbWhatsappUrl, setQbWhatsappUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSevaDropdownOpen(false);
      }
      if (quickBookingRef.current && !quickBookingRef.current.contains(event.target)) {
        setQuickBookingOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSevaDropdownOpen(false);
        setQuickBookingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const sevaSubItems = [
    { id: 'muhurtham', titleKey: 'nav.muhurtham' },
    { id: 'pitru-seva', titleKey: 'nav.pitruSeva' },
    { id: 'smartam', titleKey: 'nav.smartam' },
    { id: 'smarta-seva', titleKey: 'nav.smartaSeva' },
    { id: 'kamyamu', titleKey: 'nav.kamyamu' }
  ];

  const isSevaActive = ['muhurtham', 'pitru-seva', 'smartam', 'smarta-seva', 'kamyamu', 'kamayamu'].includes(activeTab);

  const handleNavClick = (id) => {
    onSelectTab(id);
    setMenuOpen(false);
    setSevaDropdownOpen(false);
    setQuickBookingOpen(false);
  };

  const toggleSevaDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSevaDropdownOpen((prev) => !prev);
  };

  const handleQuickFormSubmit = (e) => {
    e.preventDefault();
    if (!qbFormData.name || !qbFormData.phone || !qbFormData.seva) {
      return;
    }

    const samagriText =
      qbFormData.samagri === 'with'
        ? isEn
          ? 'With Pooja Samagri (Trust to provide)'
          : 'పూజా సామగ్రితో (ట్రస్ట్ అందిస్తుంది)'
        : isEn
          ? 'Without Pooja Samagri (Arranged by devotee)'
          : 'పూజా సామగ్రి లేకుండా (భక్తుడే ఏర్పాటు చేస్తారు)';

    const msg =
      `*🪔 Sri Vari Dasudu Adyatmika Kuteer - Quick Seva Booking*\n` +
      `-----------------------------------------\n` +
      `*Seva / సేవ:* ${qbFormData.seva}\n` +
      `*Devotee Name / పేరు:* ${qbFormData.name}\n` +
      `*WhatsApp Phone:* ${qbFormData.phone}\n` +
      (qbFormData.gotram ? `*Gotram & Nakshatram:* ${qbFormData.gotram}\n` : '') +
      `*Preferred Date / తేదీ:* ${qbFormData.date}\n` +
      `*Pooja Samagri:* ${samagriText}\n` +
      (qbFormData.notes ? `*Special Request / సంకల్పం:* ${qbFormData.notes}\n` : '') +
      `-----------------------------------------\n` +
      `_Namaste Acharyulu Garu, please confirm the auspicious timings and arrangements._`;

    const url = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
    setQbWhatsappUrl(url);
    setQbSubmitted(true);
    window.open(url, '_blank');
  };

  const renderBookingForm = (isMobile = false) => (
    <div className={`qb-booking-form-card ${isMobile ? 'is-mobile' : ''}`}>
      <div className="qb-form-header">
        <div className="qb-form-title-group">
          <div className="qb-form-badge">
            <span>🪔 {isEn ? 'QUICK SEVA REGISTRATION' : 'త్వరిత సేవా నమోదు'}</span>
          </div>
          <h4 className="qb-form-title">
            {isEn ? 'Book Sacred Seva Form' : 'పూజా / సేవా నమోదు ఫారం'}
          </h4>
          <p className="qb-form-subtitle">
            {isEn
              ? 'Select your seva & enter details for auspicious confirmation'
              : 'సేవను ఎంచుకొని వివరాలు నింపండి, ఆచార్యుల వారు నిర్ధారిస్తారు'}
          </p>
        </div>
        {!isMobile && (
          <button
            type="button"
            className="qb-form-close-btn"
            onClick={() => setQuickBookingOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {qbSubmitted ? (
        <div className="qb-form-success">
          <div className="qb-success-icon">✓</div>
          <h4>{isEn ? 'Seva Request Prepared!' : 'సేవా నమోదు వివరాలు సిద్ధమయ్యాయి!'}</h4>
          <p>
            {isEn
              ? `Devotee ${qbFormData.name || ''} for ${qbFormData.seva} on ${qbFormData.date}.`
              : `${qbFormData.name || ''} పేరిట ${qbFormData.seva} (${qbFormData.date}) నమోదు వివరాలు సిద్ధం.`}
          </p>
          <div className="qb-success-actions">
            <a
              href={qbWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qb-btn primary qb-btn-wa"
            >
              <span>💬 {isEn ? 'Send on WhatsApp' : 'WhatsApp లో పంపండి'}</span>
            </a>
            <button
              type="button"
              className="qb-btn ghost"
              onClick={() => {
                setQbSubmitted(false);
                if (!isMobile) setQuickBookingOpen(false);
                else setMobileQuickBookingOpen(false);
              }}
            >
              {isEn ? 'Close' : 'ముగించు'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleQuickFormSubmit} className="qb-form-body">
          {/* Seva dropdown */}
          <div className="qb-field-group">
            <label className="qb-label">
              <span>{isEn ? 'Select Seva to Book *' : 'మీరు బుక్ చేసుకోగోరే సేవ *'}</span>
            </label>
            <div className="qb-select-wrap">
              <select
                className="qb-select"
                value={qbFormData.seva}
                onChange={(e) => setQbFormData({ ...qbFormData, seva: e.target.value })}
                required
              >
                {SEVA_OPTIONS.map((cat, idx) => (
                  <optgroup key={idx} label={isEn ? cat.categoryEn : cat.categoryTe}>
                    {cat.options.map((opt) => (
                      <option key={opt.id} value={isEn ? opt.labelEn : opt.labelTe}>
                        {isEn ? opt.labelEn : opt.labelTe}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Devotee Name & WhatsApp Number */}
          <div className="qb-grid-2">
            <div className="qb-field-group">
              <label className="qb-label">
                <span>{isEn ? 'Devotee Name *' : 'భక్తుని పేరు *'}</span>
              </label>
              <input
                type="text"
                className="qb-input"
                placeholder={isEn ? 'Your Full Name' : 'మీ పూర్తి పేరు'}
                required
                value={qbFormData.name}
                onChange={(e) => setQbFormData({ ...qbFormData, name: e.target.value })}
              />
            </div>

            <div className="qb-field-group">
              <label className="qb-label">
                <span>{isEn ? 'WhatsApp Phone *' : 'వాట్సాప్ నెంబర్ *'}</span>
              </label>
              <input
                type="tel"
                className="qb-input"
                placeholder="+91 98765 43210"
                required
                value={qbFormData.phone}
                onChange={(e) => setQbFormData({ ...qbFormData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Gotram & Preferred Date */}
          <div className="qb-grid-2">
            <div className="qb-field-group">
              <label className="qb-label">
                <span>{isEn ? 'Gotram & Nakshatram' : 'గోత్రం & నక్షత్రం'}</span>
              </label>
              <input
                type="text"
                className="qb-input"
                placeholder={isEn ? 'e.g. Kasyapa / Anuradha' : 'ఉదా: కాశ్యప / అనూరాధ'}
                value={qbFormData.gotram}
                onChange={(e) => setQbFormData({ ...qbFormData, gotram: e.target.value })}
              />
            </div>

            <div className="qb-field-group">
              <label className="qb-label">
                <span>{isEn ? 'Preferred Date *' : 'పూజా తేదీ *'}</span>
              </label>
              <input
                type="date"
                className="qb-input"
                required
                min={todayStr}
                value={qbFormData.date}
                onChange={(e) => setQbFormData({ ...qbFormData, date: e.target.value })}
              />
            </div>
          </div>

          {/* Pooja Samagri Preference */}
          <div className="qb-field-group">
            <label className="qb-label">
              <span>{isEn ? 'Pooja Samagri' : 'పూజా సామగ్రి ఎంపిక'}</span>
            </label>
            <div className="qb-samagri-toggle">
              <button
                type="button"
                className={`qb-toggle-btn ${qbFormData.samagri === 'with' ? 'active' : ''}`}
                onClick={() => setQbFormData({ ...qbFormData, samagri: 'with' })}
              >
                <span>📦 {isEn ? 'With Samagri (Provided)' : 'సామగ్రితో (ట్రస్ట్ అందిస్తుంది)'}</span>
              </button>
              <button
                type="button"
                className={`qb-toggle-btn ${qbFormData.samagri === 'without' ? 'active' : ''}`}
                onClick={() => setQbFormData({ ...qbFormData, samagri: 'without' })}
              >
                <span>🤲 {isEn ? 'Without (Arrange Myself)' : 'సామగ్రి లేకుండా (నేనే తెస్తాను)'}</span>
              </button>
            </div>
          </div>

          {/* Special Requests / Notes */}
          <div className="qb-field-group">
            <label className="qb-label">
              <span>{isEn ? 'Special Sankalpam / Note (Optional)' : 'సంకల్ప కోరిక / వివరాలు (ఐచ్ఛికం)'}</span>
            </label>
            <input
              type="text"
              className="qb-input"
              placeholder={isEn ? 'Any specific sankalpam or prayer...' : 'మీ సంకల్ప వివరాలు లేదా సందేహాలు...'}
              value={qbFormData.notes}
              onChange={(e) => setQbFormData({ ...qbFormData, notes: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div className="qb-form-submit-row">
            <button type="submit" className="qb-submit-btn">
              <span>🪔 {isEn ? 'Confirm & Book Seva (WhatsApp)' : 'సేవను నిర్ధారించి బుక్ చేయండి'}</span>
              <span className="qb-submit-arrow">→</span>
            </button>
          </div>

          <div className="qb-form-footer-hint">
            <span>{isEn ? 'Direct support: ' : 'సహాయం కొరకు: '}</span>
            <a href="tel:+919876543210" className="qb-phone-link">+91 98765 43210</a>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="wrap nav-container">
        <div
          className="brand"
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
        >
          <img
            src="/images/logo.jpg"
            alt={
              isEn
                ? 'Sri Vari Dasudu Adyatmika Kuteer Logo'
                : 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం లోగో'
            }
            className="brand-logo-img"
          />
          <div className="brand-text">
            <span className="brand-title">
              {isEn ? 'Sri Vari Dasudu' : 'శ్రీ వారి దాసుడు'}
            </span>
            <span className="brand-subtitle">
              {isEn ? 'Adyatmika Kuteer' : 'ఆధ్యాత్మిక కుటీరం'}
            </span>
          </div>
        </div>

        <nav className={menuOpen ? 'open' : ''}>
          <ul>
            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                {t('nav.home')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                {t('nav.about')}
              </button>
            </li>

            <li
              className={`nav-dropdown-item ${sevaDropdownOpen ? 'open' : ''}`}
              ref={dropdownRef}
              onMouseEnter={() => setSevaDropdownOpen(true)}
              onMouseLeave={() => setSevaDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-link nav-dropdown-toggle ${isSevaActive ? 'active' : ''}`}
                onClick={toggleSevaDropdown}
                aria-haspopup="true"
                aria-expanded={sevaDropdownOpen}
              >
                <span>{t('nav.ourSeva')}</span>
                <span className="dropdown-caret" aria-hidden="true">
                  {sevaDropdownOpen ? '▲' : '▼'}
                </span>
              </button>

              <div className={`nav-dropdown-menu ${sevaDropdownOpen ? 'show' : ''}`} role="menu">
                {sevaSubItems.map((sub) => {
                  const isActive = activeTab === sub.id || (sub.id === 'godhanam' && activeTab === 'goseva');
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      role="menuitem"
                      className={`nav-dropdown-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(sub.id)}
                    >
                      <span className="dropdown-link-title">{t(sub.titleKey)}</span>
                    </button>
                  );
                })}
              </div>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'remedies' || activeTab === 'remedy-detail' ? 'active' : ''}`}
                onClick={() => handleNavClick('remedies')}
              >
                {t('nav.remedies')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'vedic-school' ? 'active' : ''}`}
                onClick={() => handleNavClick('vedic-school')}
              >
                {t('nav.vedicSchool')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'goseva' || activeTab === 'godhanam' ? 'active' : ''}`}
                onClick={() => handleNavClick('goseva')}
              >
                {t('nav.goseva')}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                {t('nav.contact')}
              </button>
            </li>

            <li className="mobile-nav-cta">
              <button
                type="button"
                className={`btn primary mobile-booking-btn ${mobileQuickBookingOpen ? 'active' : ''}`}
                onClick={() => setMobileQuickBookingOpen((prev) => !prev)}
                aria-expanded={mobileQuickBookingOpen}
              >
                <span>🪔 {t('nav.quickBooking')}</span>
                <span className="dropdown-caret">{mobileQuickBookingOpen ? '▲' : '▼'}</span>
              </button>

              {mobileQuickBookingOpen && renderBookingForm(true)}
            </li>

            <li className="mobile-lang-switcher">
              <div className="lang-switcher" role="group" aria-label="Language">
                <button
                  type="button"
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => setLang('en')}
                  aria-pressed={lang === 'en'}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`lang-btn ${lang === 'te' ? 'active' : ''}`}
                  onClick={() => setLang('te')}
                  aria-pressed={lang === 'te'}
                >
                  తెలుగు
                </button>
              </div>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="lang-switcher desktop-lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'te' ? 'active' : ''}`}
              onClick={() => setLang('te')}
              aria-pressed={lang === 'te'}
            >
              తెలుగు
            </button>
          </div>

          <div className="quick-booking-dropdown-wrapper" ref={quickBookingRef}>
            <button
              type="button"
              className={`nav-cta-btn quick-booking-toggle-btn ${quickBookingOpen ? 'active' : ''}`}
              onClick={() => setQuickBookingOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={quickBookingOpen}
            >
              <span className="cta-icon">🪔</span>
              <span>{t('nav.quickBooking')}</span>
              <span className="dropdown-caret" aria-hidden="true">
                {quickBookingOpen ? '▲' : '▼'}
              </span>
            </button>

            {quickBookingOpen && (
              <div className="quick-booking-menu" role="dialog" aria-label="Quick Seva Booking Form">
                {renderBookingForm(false)}
              </div>
            )}
          </div>

          <button
            type="button"
            className={`burger ${menuOpen ? 'active' : ''}`}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
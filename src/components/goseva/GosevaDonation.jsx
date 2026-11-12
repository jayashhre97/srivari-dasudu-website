import React, { useState } from 'react';
import LotusDivider from '../LotusDivider';
import { DONATION_AMOUNTS, GOSEVA_CONTACT_INFO } from '../../data/gosevaData';
import { validateDevoteeFields, buildGosevaWhatsAppUrl } from './gosevaHelpers';

function UpiQrPlaceholderSvg() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="goseva-qr-svg"
      role="img"
      aria-label="UPI QR Code Placeholder"
    >
      <rect x="4" y="4" width="152" height="152" rx="10" fill="#FFFDF8" stroke="#C9972D" strokeWidth="2.5" />
      <rect x="16" y="16" width="38" height="38" rx="4" fill="none" stroke="#063829" strokeWidth="6" />
      <rect x="26" y="26" width="18" height="18" fill="#063829" />
      <rect x="106" y="16" width="38" height="38" rx="4" fill="none" stroke="#063829" strokeWidth="6" />
      <rect x="116" y="26" width="18" height="18" fill="#063829" />
      <rect x="16" y="106" width="38" height="38" rx="4" fill="none" stroke="#063829" strokeWidth="6" />
      <rect x="26" y="116" width="18" height="18" fill="#063829" />
      <rect x="66" y="20" width="8" height="8" fill="#063829" />
      <rect x="82" y="20" width="8" height="8" fill="#063829" />
      <rect x="66" y="36" width="8" height="16" fill="#063829" />
      <rect x="86" y="40" width="8" height="12" fill="#063829" />
      <rect x="20" y="66" width="16" height="8" fill="#063829" />
      <rect x="44" y="66" width="12" height="8" fill="#063829" />
      <rect x="20" y="82" width="8" height="12" fill="#063829" />
      <rect x="66" y="66" width="28" height="28" rx="4" fill="#F4EAD4" stroke="#C9972D" strokeWidth="2" />
      <text x="80" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#063829">
        UPI
      </text>
      <rect x="106" y="66" width="10" height="10" fill="#063829" />
      <rect x="124" y="66" width="20" height="8" fill="#063829" />
      <rect x="106" y="84" width="16" height="8" fill="#063829" />
      <rect x="132" y="82" width="12" height="14" fill="#063829" />
      <rect x="66" y="106" width="12" height="10" fill="#063829" />
      <rect x="86" y="106" width="10" height="20" fill="#063829" />
      <rect x="106" y="106" width="24" height="10" fill="#063829" />
      <rect x="66" y="128" width="20" height="14" fill="#063829" />
      <rect x="108" y="124" width="14" height="18" fill="#063829" />
      <rect x="130" y="124" width="14" height="18" fill="#063829" />
    </svg>
  );
}

export default function GosevaDonation({ isEn }) {
  const [selectedOption, setSelectedOption] = useState('501');
  const [customAmount, setCustomAmount] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gotram: ''
  });
  const [errors, setErrors] = useState({});
  const [submittedRecord, setSubmittedRecord] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const effectiveAmount =
    selectedOption === 'custom' ? Number(customAmount) || 0 : Number(selectedOption);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAmountChip = (optId) => {
    setSelectedOption(optId);
    if (optId !== 'custom') {
      setCustomAmount('');
    }
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: '' }));
    }
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(GOSEVA_CONTACT_INFO.upiIdPlaceholder);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 1800);
    } catch {
      setCopiedUpi(false);
    }
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateDevoteeFields(form, { isEn, requireEmail: false });
    if (!effectiveAmount || effectiveAmount < 11) {
      nextErrors.amount = isEn
        ? 'Please select an amount or enter a valid custom amount (minimum ₹11).'
        : 'దయచేసి విరాళ మొత్తాన్ని ఎంచుకోండి లేదా కనీసం ₹11 నమోదు చేయండి.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmittedRecord({
      amount: effectiveAmount,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      gotram: form.gotram.trim()
    });
  };

  const waUrl = submittedRecord
    ? buildGosevaWhatsAppUrl([
        '*Go Seva Donation Inquiry — Srivari Dasudu*',
        `Amount: ₹${submittedRecord.amount.toLocaleString('en-IN')}`,
        `Donor Name: ${submittedRecord.name}`,
        `Mobile: ${submittedRecord.phone}`,
        submittedRecord.email ? `Email: ${submittedRecord.email}` : '',
        submittedRecord.gotram ? `Gotra / Purpose: ${submittedRecord.gotram}` : ''
      ])
    : '#';

  return (
    <section
      id="goseva-donate"
      className="goseva-section goseva-donate-section"
      aria-labelledby="donation-heading"
    >
      <div className="goseva-container">
        <div className="goseva-section-header">
          <div className="goseva-sec-eyebrow">
            <span aria-hidden="true">✦</span>
            <span>{isEn ? 'SACRED GO SEVA CONTRIBUTION' : 'పవిత్ర గోసేవ విరాళం'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 id="donation-heading" className="goseva-sec-heading">
            {isEn ? 'Support Go Seva Through Donations' : 'విరాళాల ద్వారా గోసేవకు సహకరించండి'}
          </h2>
          <LotusDivider />
          <p className="goseva-sec-sub">
            {isEn
              ? 'Your generous contribution helps provide nutritious food, medical treatment and safe shelter for cows.'
              : 'మీ ఉదార విరాళం గోవులకు పోషకాహారం, వైద్య చికిత్స మరియు సురక్షిత ఆశ్రయాన్ని అందించడంలో సహాయపడుతుంది.'}
          </p>
        </div>

        <div className="goseva-donate-layout">
          <div className="goseva-donate-form-card">
            <span className="card-corner corner-tl" aria-hidden="true" />
            <span className="card-corner corner-tr" aria-hidden="true" />
            <span className="card-corner corner-bl" aria-hidden="true" />
            <span className="card-corner corner-br" aria-hidden="true" />

            {!submittedRecord ? (
              <form onSubmit={handleDonateSubmit} noValidate className="goseva-form-stack">
                <div>
                  <span className="form-field-label">
                    {isEn ? 'Select Donation Amount *' : 'విరాళ మొత్తాన్ని ఎంచుకోండి *'}
                  </span>
                  <div className="goseva-amount-grid">
                    {DONATION_AMOUNTS.map((opt) => {
                      const active = selectedOption === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`goseva-amt-btn ${active ? 'active' : ''}`}
                          onClick={() => handleAmountChip(opt.id)}
                          aria-pressed={active}
                        >
                          <strong>{opt.label}</strong>
                          <span>{isEn ? opt.noteEn : opt.noteTe}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption === 'custom' && (
                    <div className="custom-amt-input-wrap goseva-custom-wrap">
                      <span className="currency-prefix">₹</span>
                      <input
                        type="number"
                        min="11"
                        name="customAmount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                        }}
                        placeholder={isEn ? 'Enter custom amount (e.g. 2500)' : 'విరాళ మొత్తం నమోదు చేయండి'}
                        className="form-input custom-amt-input"
                        aria-label="Custom Donation Amount"
                      />
                    </div>
                  )}
                  {errors.amount && <p className="goseva-field-error">{errors.amount}</p>}
                </div>

                <div className="form-grid-two">
                  <div>
                    <label htmlFor="donate-name" className="form-field-label">
                      {isEn ? 'Full Name *' : 'పూర్తి పేరు *'}
                    </label>
                    <input
                      id="donate-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFieldChange}
                      placeholder={isEn ? 'Enter your name' : 'మీ పేరు'}
                      className="form-input"
                      required
                    />
                    {errors.name && <p className="goseva-field-error">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="donate-phone" className="form-field-label">
                      {isEn ? 'Mobile Number *' : 'మొబైల్ నంబర్ *'}
                    </label>
                    <input
                      id="donate-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFieldChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                      required
                    />
                    {errors.phone && <p className="goseva-field-error">{errors.phone}</p>}
                  </div>
                </div>

                <div className="form-grid-two">
                  <div>
                    <label htmlFor="donate-email" className="form-field-label">
                      {isEn ? 'Email Address (Optional)' : 'ఈమెయిల్ (ఐచ్ఛికం)'}
                    </label>
                    <input
                      id="donate-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFieldChange}
                      placeholder="devotee@example.com"
                      className="form-input"
                    />
                    {errors.email && <p className="goseva-field-error">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="donate-gotram" className="form-field-label">
                      {isEn ? 'Gotra / Sankalpam (Optional)' : 'గోత్రం / సంకల్పం (ఐచ్ఛికం)'}
                    </label>
                    <input
                      id="donate-gotram"
                      type="text"
                      name="gotram"
                      value={form.gotram}
                      onChange={handleFieldChange}
                      placeholder={isEn ? 'e.g. Kashyapa Gotram' : 'ఉదా. కశ్యప గోత్రం'}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="goseva-gateway-placeholder">
                  <span className="goseva-gateway-pill">
                    {isEn ? 'Payment Gateway Placeholder' : 'పేమెంట్ గేట్‌వే ప్లేస్‌హోల్డర్'}
                  </span>
                  <p>
                    {isEn
                      ? GOSEVA_CONTACT_INFO.paymentGatewayPlaceholderEn
                      : GOSEVA_CONTACT_INFO.paymentGatewayPlaceholderTe}
                  </p>
                </div>

                <button type="submit" className="btn primary form-submit-btn">
                  {isEn
                    ? `Donate Now${effectiveAmount ? ` (₹${effectiveAmount.toLocaleString('en-IN')})` : ''}`
                    : `ఇప్పుడే విరాళం ఇవ్వండి${effectiveAmount ? ` (₹${effectiveAmount.toLocaleString('en-IN')})` : ''}`}
                </button>
              </form>
            ) : (
              <div className="form-success-box">
                <div className="success-icon" aria-hidden="true">✓</div>
                <h3 className="success-heading">
                  {isEn ? 'Donation Pledge Prepared' : 'విరాళ వివరాలు సిద్ధంగా ఉన్నాయి'}
                </h3>
                <p className="success-para">
                  {isEn
                    ? `Thank you, ${submittedRecord.name}. Your Go Seva offering of ₹${submittedRecord.amount.toLocaleString('en-IN')} is ready. You can complete transfer via the UPI QR placeholder or coordinate directly via WhatsApp.`
                    : `ధన్యవాదాలు ${submittedRecord.name}. మీ ₹${submittedRecord.amount.toLocaleString('en-IN')} గోసేవ విరాళ వివరాలు సిద్ధంగా ఉన్నాయి.`}
                </p>
                <div className="success-actions">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary"
                  >
                    {isEn ? 'Confirm via WhatsApp →' : 'వాట్సాప్‌లో నిర్ధారించండి →'}
                  </a>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setSubmittedRecord(null)}
                  >
                    {isEn ? 'Modify Donation' : 'వివరాలు మార్చండి'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="goseva-upi-panel" aria-label="UPI QR Code and Payment Details">
            <div className="goseva-upi-badge">
              {isEn ? 'UPI QR CODE PLACEHOLDER' : 'UPI QR కోడ్ ప్లేస్‌హోల్డర్'}
            </div>
            <h3 className="goseva-upi-title">
              {isEn ? 'Scan & Offer via UPI' : 'UPI ద్వారా స్కాన్ చేసి సహకరించండి'}
            </h3>
            <UpiQrPlaceholderSvg />
            <div className="goseva-upi-id-box">
              <code>{GOSEVA_CONTACT_INFO.upiIdPlaceholder}</code>
              <button type="button" className="btn ghost goseva-copy-btn" onClick={handleCopyUpi}>
                {copiedUpi ? (isEn ? 'Copied!' : 'కాపీ అయింది!') : isEn ? 'Copy UPI' : 'కాపీ'}
              </button>
            </div>
            <ul className="goseva-upi-notes">
              <li>
                {isEn
                  ? 'Replace this QR graphic and UPI ID with verified Srivari Dasudu trust credentials before going live.'
                  : 'లైవ్‌లో పెట్టే ముందు ధృవీకరించబడిన QR కోడ్ మరియు UPI IDని ఇక్కడ చేర్చండి.'}
              </li>
              <li>
                {isEn
                  ? 'Supports UPI, Debit/Credit Card & NetBanking gateway integration.'
                  : 'UPI, కార్డ్ మరియు నెట్ బ్యాంకింగ్ గేట్‌వే ఇంటిగ్రేషన్‌కు అనుకూలం.'}
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}


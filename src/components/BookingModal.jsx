import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  KAMYAMU_PAYMENT,
  KAMYAMU_PRICE_WITH_SAMAGRI,
  KAMYAMU_PRICE_WITHOUT_SAMAGRI,
  buildUpiPayLink,
  formatInr,
  getKamyamuAmount
} from '../data/kamyamuPricing';
import { bookHavanamSlot, getHavanamSlotInfo } from '../utils/havanamSlots';

const SAMAGRI_MODES = [
  {
    id: 'without',
    kickerEn: 'OPTION 1 · WITHOUT POOJA SAMAGRI',
    kickerTe: 'ఎంపిక 1 · పూజా సామగ్రి లేకుండా',
    titleEn: 'Without Pooja Samagri (I Will Arrange Myself)',
    titleTe: 'పూజా సామగ్రి లేకుండా (నేనే ఏర్పాటు చేసుకుంటాను)',
    descEn:
      'Arrange and bring the required Pooja Samagri yourself for the ceremony.',
    descTe: 'పూజకు కావలసిన సామగ్రిని మీరే ఏర్పాటు చేసుకుని తీసుకురండి.',
    noteEn:
      'Without Pooja Samagri: You will arrange the required Pooja Samagri yourself (Acharyulu Garu can share a list if needed).',
    noteTe:
      'పూజా సామగ్రి లేకుండా: కావలసిన పూజా సామగ్రిని మీరే ఏర్పాటు చేసుకుంటారు (అవసరమైతే ఆచార్యులు జాబితా అందిస్తారు).',
    payloadEn: 'Without Pooja Samagri (Devotee Will Arrange)',
    payloadTe: 'పూజా సామగ్రి లేకుండా (భక్తులు ఏర్పాటు చేసుకుంటారు)',
    amount: KAMYAMU_PRICE_WITHOUT_SAMAGRI
  },
  {
    id: 'with',
    kickerEn: 'OPTION 2 · WITH POOJA SAMAGRI',
    kickerTe: 'ఎంపిక 2 · పూజా సామగ్రితో',
    titleEn: 'With Pooja Samagri (We Will Provide)',
    titleTe: 'పూజా సామగ్రితో (మేము అందిస్తాము)',
    descEn: 'Complete authentic Pooja Samagri will be arranged and provided by the Trust.',
    descTe: 'సంపూర్ణ పవిత్ర పూజా సామగ్రిని ట్రస్ట్ ఏర్పాటు చేసి అందిస్తుంది.',
    noteEn:
      'With Pooja Samagri: Complete, authentic Pooja Samagri will be provided by the Trust.',
    noteTe: 'పూజా సామగ్రితో: ట్రస్ట్ ద్వారా సంపూర్ణ పూజా సామగ్రి అందించబడుతుంది.',
    payloadEn: 'With Pooja Samagri (Trust Will Provide)',
    payloadTe: 'పూజా సామగ్రితో (ట్రస్ట్ అందిస్తుంది)',
    amount: KAMYAMU_PRICE_WITH_SAMAGRI
  }
];

const REQUIRED_SAMAGRI_ITEMS = [
  { itemEn: 'Pure Desi Cow Ghee (ఆవు నెయ్యి)', qty: '1 kg' },
  { itemEn: 'Dry Coconuts (ఎండు కొబ్బరి చిప్పలు)', qty: '4 pieces' },
  { itemEn: 'Fresh Pooja Coconuts (పూజా కొబ్బరికాయలు)', qty: '2 pieces' },
  { itemEn: 'Homa Samagri Dravyam (హోమ ద్రవ్యాలు)', qty: '500 g' },
  { itemEn: 'Samidhalu (సమిధలు - మోదుగ/రావి కట్టలు)', qty: '2 bundles' },
  { itemEn: 'Navadhanyalu (నవధాన్యాలు)', qty: '1 set' },
  { itemEn: 'Pasupu & Kumkuma (పసుపు & కుంకుమ)', qty: '100g each' },
  { itemEn: 'Gandham & Akshantalu (గంధం, అక్షతలు)', qty: '1 box' },
  { itemEn: 'Camphor & Agarbatti (కర్పూరం, అగర్‌బత్తి)', qty: '1 pack' },
  { itemEn: 'Betel Leaves & Supari (తమలపాకులు, వక్కలు)', qty: '25 leaves' },
  { itemEn: 'Blouse Piece / Kalasa Vastram (రవికె గుడ్డ)', qty: '2 pieces' },
  { itemEn: 'Fresh Flowers & Garlands (పూలు, పూలదండలు)', qty: '500 g' },
  { itemEn: 'Seasonal Fruits (5 రకాల పండ్లు)', qty: '5 varieties' },
  { itemEn: 'Jaggery / Naivedyam Prasadam (బెల్లం)', qty: '250 g' }
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BookingModal({
  isOpen,
  serviceName,
  pricingType = null,
  havanamId = null,
  onBooked = null,
  onClose
}) {
  const { t, isEn } = useLanguage();
  const isKamyamu = pricingType === 'kamyamu';
  const isSamuhika = pricingType === 'samuhika' || Boolean(havanamId);

  const [step, setStep] = useState('details');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    samagriMode: 'without',
    notes: '',
    paymentMethod: 'upi'
  });
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [copied, setCopied] = useState('');
  const [paying, setPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showSamagriModal, setShowSamagriModal] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);
  const amount = useMemo(
    () => (isKamyamu ? getKamyamuAmount(formData.samagriMode) : 0),
    [isKamyamu, formData.samagriMode]
  );
  const amountLabel = formatInr(amount);
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

  const activeSamagri = SAMAGRI_MODES.find((s) => s.id === formData.samagriMode) || SAMAGRI_MODES[0];

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone: '',
        date: todayStr,
        samagriMode: 'without',
        notes: '',
        paymentMethod: 'upi'
      });
      setStep('details');
      setSubmitted(false);
      setCopied('');
      setPaying(false);
      setPaymentStatus(null);
    }
  }, [isOpen, serviceName, pricingType, havanamId, todayStr]);

  if (!isOpen) return null;

  const samagriLabel = isEn ? activeSamagri.payloadEn : activeSamagri.payloadTe;
  const samuhikaSlots = isSamuhika && havanamId ? getHavanamSlotInfo(havanamId) : null;

  const buildWhatsAppMessage = (paymentNote) => {
    let msg =
      `${t('booking.msgIntro')}\n` +
      `*${t('booking.msgCeremony')}:* ${serviceName}\n` +
      `*${t('booking.msgName')}:* ${formData.name}\n` +
      `*${t('booking.msgPhone')}:* ${formData.phone}`;

    if (!isSamuhika) {
      msg += `\n*${t('booking.msgDate')}:* ${formData.date}`;
    }

    if (isSamuhika && havanamId) {
      const info = getHavanamSlotInfo(havanamId);
      msg += `\n*Slots:* ${info.booked}/${info.max}`;
    }

    if (isKamyamu) {
      msg += `\n*${t('booking.msgSamagri')}:* ${samagriLabel}`;
      msg += `\n*${t('booking.msgAmount')}:* ${amountLabel}`;
      msg += `\n*${t('booking.msgPayMethod')}:* ${paymentNote}`;
    }

    if (formData.notes) {
      msg += `\n*${t('booking.msgNotes')}:* ${formData.notes}`;
    }
    return msg;
  };

  const finishBooking = (paymentNote) => {
    if (isSamuhika && havanamId) {
      const before = getHavanamSlotInfo(havanamId);
      if (before.isFull) {
        setSummary(
          isEn
            ? 'No more slots available for this month.'
            : 'ఈ నెలకు స్లాట్లు అందుబాటులో లేవు.'
        );
        setSubmitted(true);
        setStep('done');
        return;
      }
      bookHavanamSlot(havanamId);
      if (typeof onBooked === 'function') onBooked();
    }

    const msg = buildWhatsAppMessage(paymentNote);
    setSummary(
      isKamyamu
        ? isEn
          ? `${serviceName} on ${formData.date} — ${amountLabel} (${samagriLabel}) for ${formData.name}.`
          : `${serviceName} ${t('booking.summaryOn')} ${formData.date} — ${amountLabel} (${samagriLabel}) ${t('booking.summaryFor')} ${formData.name}.`
        : isSamuhika
          ? isEn
            ? `${serviceName} seat booked for ${formData.name}.`
            : `${serviceName} సీటు ${formData.name} కోసం బుక్ అయింది.`
          : isEn
            ? `${serviceName} on ${formData.date} for ${formData.name}.`
            : `${serviceName} ${t('booking.summaryOn')} ${formData.date} ${t('booking.summaryFor')} ${formData.name}.`
    );
    setWhatsappUrl(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`);
    setSubmitted(true);
    setStep('done');
  };

  const handleDetailsContinue = (e) => {
    e.preventDefault();
    if (isSamuhika && havanamId && getHavanamSlotInfo(havanamId).isFull) {
      setSummary(
        isEn
          ? 'No more slots available for this month.'
          : 'ఈ నెలకు స్లాట్లు అందుబాటులో లేవు.'
      );
      setSubmitted(true);
      setStep('done');
      return;
    }
    if (isKamyamu) {
      setStep('payment');
      return;
    }
    finishBooking(isEn ? 'Confirm via WhatsApp' : 'WhatsApp ద్వారా నిర్ధారణ');
  };

  const handleCopy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(''), 1800);
    } catch {
      setCopied('');
    }
  };

  const handleShareSamagri = () => {
    const listText = REQUIRED_SAMAGRI_ITEMS.map(
      (i, idx) => `${idx + 1}. ${i.itemEn} - ${i.qty}`
    ).join('\n');
    const shareMessage = [
      `*🚩 Sri Vari Dasudu - Required Pooja Samagri List*`,
      `*Ceremony:* ${serviceName || 'Sacred Homam'}`,
      '',
      '*Items to Arrange:*',
      listText,
      '',
      '*(Note: Acharyulu Garu will provide copper homa kundam, kalasam, and primary puja vessels)*',
      '',
      'Adhyatmika Kuteer • Srivari Dasudu'
    ].join('\n');

    if (navigator.share) {
      navigator
        .share({
          title: `Required Pooja Samagri List - ${serviceName || 'Homam'}`,
          text: shareMessage
        })
        .catch(() => {
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`,
            '_blank'
          );
        });
    } else {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`,
        '_blank'
      );
    }
  };

  const openUpiApp = () => {
    const link = buildUpiPayLink({
      amount,
      note: `${serviceName} - ${formData.name}`
    });
    window.location.href = link;
    setPaymentStatus('upi-opened');
  };

  const handleRazorpayPay = async () => {
    setPaying(true);
    try {
      if (!razorpayKey) {
        setPaymentStatus('razorpay-missing');
        setPaying(false);
        return;
      }
      const ok = await loadRazorpayScript();
      if (!ok || !window.Razorpay) {
        setPaymentStatus('razorpay-failed');
        setPaying(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: amount * 100,
        currency: 'INR',
        name: KAMYAMU_PAYMENT.merchantName,
        description: serviceName,
        prefill: {
          name: formData.name,
          contact: formData.phone
        },
        notes: {
          ceremony: serviceName,
          samagri: formData.samagriMode
        },
        theme: { color: '#073B2A' },
        handler: () => {
          setPaymentStatus('paid');
          finishBooking(
            isEn
              ? `Razorpay Paid ${amountLabel}`
              : `Razorpay చెల్లింపు ${amountLabel}`
          );
        },
        modal: {
          ondismiss: () => setPaying(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } finally {
      setPaying(false);
    }
  };

  const confirmAfterManualPay = () => {
    const methodLabel =
      formData.paymentMethod === 'upi'
        ? isEn
          ? `UPI ${amountLabel} (Pending verification)`
          : `UPI ${amountLabel} (నిర్ధారణ పెండింగ్)`
        : formData.paymentMethod === 'bank'
          ? isEn
            ? `Bank Transfer ${amountLabel} (Pending verification)`
            : `బ్యాంక్ బదిలీ ${amountLabel} (నిర్ధారణ పెండింగ్)`
          : isEn
            ? `Card/Netbanking ${amountLabel}`
            : `కార్డు/నెట్‌బ్యాంకింగ్ ${amountLabel}`;
    finishBooking(methodLabel);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className={`modal-dialog ${isKamyamu ? 'booking-modal-wide' : ''}`}>
        <div className="dhead">
          <h3 id="modalTitle">
            {step === 'payment' ? t('booking.paymentTitle') : t('booking.title')}
          </h3>
          <button type="button" className="ib" aria-label={t('booking.close')} onClick={onClose}>
            ✕
          </button>
        </div>

        {isKamyamu && !submitted && (
          <div className="booking-steps" aria-hidden="true">
            <span className={step === 'details' ? 'is-active' : 'is-done'}>1. {t('booking.stepDetails')}</span>
            <span className="booking-steps-sep">→</span>
            <span className={step === 'payment' ? 'is-active' : ''}>2. {t('booking.stepPayment')}</span>
          </div>
        )}

        {submitted ? (
          <div className="dbody done">
            <div className="tick">✓</div>
            <h3 className="booking-success-title">{t('booking.ready')}</h3>
            <p className="booking-success-text">{summary}</p>
            {isKamyamu && (
              <div className="booking-paid-badge">
                {paymentStatus === 'paid'
                  ? t('booking.paymentSuccess')
                  : t('booking.paymentPendingVerify')}
              </div>
            )}
            <div className="booking-success-actions">
              <a
                className="btn primary btn-full booking-wa-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('booking.openWa')}
              </a>
              <button
                type="button"
                className="btn ghost btn-full booking-copy-btn"
                onClick={() => handleCopy('summary', summary)}
              >
                {copied === 'summary' ? t('contact.copied') : t('booking.copy')}
              </button>
            </div>
          </div>
        ) : step === 'payment' ? (
          <div className="dbody booking-payment-body">
            <div className="booking-order-card">
              <div className="booking-order-row">
                <span>{t('booking.msgCeremony')}</span>
                <strong>{serviceName}</strong>
              </div>
              <div className="booking-order-row">
                <span>{t('booking.msgSamagri')}</span>
                <strong>{samagriLabel}</strong>
              </div>
              <div className="booking-order-row booking-order-total">
                <span>{t('booking.selectedAmount')}</span>
                <strong>{amountLabel}</strong>
              </div>
            </div>

            <div className="booking-pay-methods" role="tablist">
              {[
                { id: 'upi', label: t('booking.payUpi') },
                { id: 'card', label: t('booking.payCard') },
                { id: 'bank', label: t('booking.payBank') }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={formData.paymentMethod === m.id}
                  className={`booking-pay-chip ${formData.paymentMethod === m.id ? 'is-active' : ''}`}
                  onClick={() => setFormData((p) => ({ ...p, paymentMethod: m.id }))}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {formData.paymentMethod === 'upi' && (
              <div className="booking-pay-panel">
                <p className="booking-pay-lead">{t('booking.upiLead')}</p>
                <div className="booking-upi-box">
                  <div>
                    <span className="detail-title">UPI ID</span>
                    <div className="detail-value">{KAMYAMU_PAYMENT.upiId}</div>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() => handleCopy('upi', KAMYAMU_PAYMENT.upiId)}
                  >
                    {copied === 'upi' ? t('contact.copied') : t('contact.copy')}
                  </button>
                </div>
                <div className="booking-amount-hero">{amountLabel}</div>
                <button type="button" className="btn primary btn-full" onClick={openUpiApp}>
                  {t('booking.payWithUpi')}
                </button>
                <p className="booking-pay-hint">{t('booking.upiHint')}</p>
              </div>
            )}

            {formData.paymentMethod === 'card' && (
              <div className="booking-pay-panel">
                <p className="booking-pay-lead">{t('booking.cardLead')}</p>
                <div className="booking-secure-row">
                  <span>🔒</span>
                  <span>{t('booking.secureCheckout')}</span>
                </div>
                <div className="booking-amount-hero">{amountLabel}</div>
                <button
                  type="button"
                  className="btn primary btn-full"
                  disabled={paying}
                  onClick={handleRazorpayPay}
                >
                  {paying ? t('common.loading') : t('booking.payRazorpay')}
                </button>
                {!razorpayKey && (
                  <p className="booking-pay-hint">{t('booking.razorpaySetup')}</p>
                )}
                {paymentStatus === 'razorpay-missing' && (
                  <p className="booking-pay-warn">{t('booking.razorpaySetup')}</p>
                )}
              </div>
            )}

            {formData.paymentMethod === 'bank' && (
              <div className="booking-pay-panel">
                <p className="booking-pay-lead">{t('booking.bankLead')}</p>
                <div className="booking-bank-list">
                  {[
                    { k: 'name', label: t('booking.bankAccountName'), v: KAMYAMU_PAYMENT.bank.accountName },
                    { k: 'bank', label: t('booking.bankName'), v: KAMYAMU_PAYMENT.bank.bankName },
                    { k: 'ac', label: t('booking.bankAccountNo'), v: KAMYAMU_PAYMENT.bank.accountNumber },
                    { k: 'ifsc', label: 'IFSC', v: KAMYAMU_PAYMENT.bank.ifsc }
                  ].map((row) => (
                    <div className="booking-upi-box" key={row.k}>
                      <div>
                        <span className="detail-title">{row.label}</span>
                        <div className="detail-value">{row.v}</div>
                      </div>
                      <button
                        type="button"
                        className="contact-copy-btn"
                        onClick={() => handleCopy(row.k, row.v)}
                      >
                        {copied === row.k ? t('contact.copied') : t('contact.copy')}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="booking-amount-hero">{amountLabel}</div>
              </div>
            )}

            <div className="booking-pay-actions">
              <button type="button" className="btn ghost" onClick={() => setStep('details')}>
                {t('booking.backDetails')}
              </button>
              <button type="button" className="btn primary" onClick={confirmAfterManualPay}>
                {t('booking.iHavePaid')}
              </button>
            </div>
          </div>
        ) : (
          <form className="dbody" onSubmit={handleDetailsContinue}>
            <div className="sel">
              <span>🪔</span>
              <span>{serviceName}</span>
            </div>

            <label>
              {t('booking.name')}
              <input
                name="name"
                required
                placeholder={t('booking.namePh')}
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              />
            </label>

            <label>
              {t('booking.phone')}
              <input
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              />
            </label>

            {!isSamuhika && (
              <label>
                {t('booking.date')}
                <input
                  name="date"
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                />
              </label>
            )}

            {isSamuhika && samuhikaSlots && samuhikaSlots.remaining > 0 && (
              <div
                className={`booking-slot-status ${samuhikaSlots.booked > 0 ? 'is-filling' : ''}`}
                role="status"
              >
                <span className="slot-dot" aria-hidden="true" />
                {samuhikaSlots.booked > 0
                  ? isEn
                    ? `Slots are filling fast · ${samuhikaSlots.remaining} left`
                    : `స్లాట్లు వేగంగా భర్తీ అవుతున్నాయి · ${samuhikaSlots.remaining} మిగిలాయి`
                  : isEn
                    ? `${samuhikaSlots.remaining} slots left`
                    : `${samuhikaSlots.remaining} స్లాట్లు మిగిలాయి`}
              </div>
            )}

            {isSamuhika && (
              <div className="booking-samuhika-note">
                <span className="samuhika-note-label">{isEn ? 'Note: ' : 'గమనిక: '}</span>
                <span className="samuhika-note-text">
                  {isEn
                    ? 'Devotees are kindly requested to visit Adhyatmika Kuteer and attend the session in person. Only two persons are permitted.'
                    : 'భక్తులు ఆధ్యాత్మిక కుటీరాన్ని సందర్శించి ప్రత్యక్షంగా పాల్గొనవలసిందిగా మనవి. ఇద్దరు వ్యక్తులకు మాత్రమే అనుమతి కలదు.'}
                </span>
              </div>
            )}

            {isKamyamu && (
              <>
                <fieldset className="booking-fieldset">
                  <legend>{t('booking.samagriLegend')}</legend>
                  <div className="muh-checkbox-grid booking-option-grid">
                    {SAMAGRI_MODES.map((option) => {
                      const checked = formData.samagriMode === option.id;
                      const inputId = `booking-samagri-${option.id}`;
                      return (
                        <label
                          key={option.id}
                          htmlFor={inputId}
                          className={`muh-checkbox-card ${checked ? 'is-selected' : ''}`}
                        >
                          <div className="muh-checkbox-card-top">
                            <span className="muh-option-label">
                              {isEn ? option.kickerEn : option.kickerTe}
                            </span>
                            <input
                              id={inputId}
                              type="checkbox"
                              className="sr-only-checkbox"
                              checked={checked}
                              onChange={() =>
                                setFormData((prev) => ({ ...prev, samagriMode: option.id }))
                              }
                            />
                            <div
                              className={`muh-checkbox-box ${checked ? 'is-checked' : ''}`}
                              aria-hidden="true"
                            >
                              {checked && <span>✓</span>}
                            </div>
                          </div>

                          <div className="muh-checkbox-body">
                            <strong className="muh-checkbox-title">
                              {isEn ? option.titleEn : option.titleTe}
                            </strong>
                            <p className="muh-checkbox-desc">
                              {isEn ? option.descEn : option.descTe}
                            </p>

                            {option.id === 'without' && (
                              <button
                                type="button"
                                className="btn-get-samagri"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setShowSamagriModal(true);
                                }}
                              >
                                <span className="samagri-btn-icon" aria-hidden="true">📋</span>
                                <span>
                                  {isEn
                                    ? 'Click here to get required pooja samagri'
                                    : 'కావలసిన పూజా సామగ్రి వివరాలు ఇక్కడ చూడండి'}
                                </span>
                                <span className="samagri-btn-arrow" aria-hidden="true">→</span>
                              </button>
                            )}

                            <div className="booking-card-price-row">
                              <div className="booking-card-price">{formatInr(option.amount)}</div>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  <div className="muh-priest-note" role="status">
                    {isEn ? activeSamagri.noteEn : activeSamagri.noteTe}
                  </div>
                </fieldset>

                <div className="booking-amount-strip" role="status">
                  <div>
                    <span className="booking-amount-label">{t('booking.selectedAmount')}</span>
                    <strong className="booking-amount-value">{amountLabel}</strong>
                  </div>
                  <span className="booking-amount-note">
                    {formData.samagriMode === 'with'
                      ? t('booking.priceWithSamagri')
                      : t('booking.priceWithoutSamagri')}
                  </span>
                </div>
              </>
            )}

            <label>
              {t('booking.notes')}
              <textarea
                name="notes"
                rows="3"
                placeholder={t('booking.notesPh')}
                value={formData.notes}
                onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
              />
            </label>

            <button
              className="btn primary btn-full booking-submit-btn"
              type="submit"
              disabled={Boolean(isSamuhika && samuhikaSlots?.isFull)}
            >
              {isKamyamu
                ? t('booking.continuePayment')
                : isSamuhika
                  ? isEn
                    ? 'Confirm Seat Booking →'
                    : 'సీటు బుకింగ్ నిర్ధారించండి →'
                  : t('booking.confirm')}
            </button>
          </form>
        )}
      </div>

      {/* Required Pooja Samagri Checklist Popup */}
      {showSamagriModal && (
        <div
          className="samagri-popup-backdrop"
          onClick={() => setShowSamagriModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="samagri-popup-heading"
        >
          <div className="samagri-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="samagri-popup-header">
              <div className="samagri-popup-title">
                <span aria-hidden="true">📋</span>
                <h4 id="samagri-popup-heading">
                  {isEn ? 'Required Pooja Samagri List' : 'కావలసిన పూజా సామగ్రి వివరాలు'}
                </h4>
              </div>
              <button
                type="button"
                className="samagri-popup-close"
                onClick={() => setShowSamagriModal(false)}
                aria-label="Close list"
              >
                ✕
              </button>
            </div>

            <div className="samagri-popup-body">
              <p className="samagri-popup-intro">
                {isEn
                  ? `Standard authentic items required for ${serviceName || 'Sacred Homam'}. Please arrange these sacred items before the ceremony:`
                  : `${serviceName || 'పవిత్ర హోమం'} కొరకు కావలసిన సంప్రదాయ పూజా సామగ్రి. దయచేసి పూజా ప్రారంభానికి ముందే వీటిని సిద్ధం చేసుకోగలరు:`}
              </p>

              <ul className="samagri-items-checklist">
                {REQUIRED_SAMAGRI_ITEMS.map((item, idx) => (
                  <li key={idx} className="samagri-item-row">
                    <span className="samagri-item-bullet" aria-hidden="true">✦</span>
                    <span className="samagri-item-name">{item.itemEn}</span>
                    <span className="samagri-item-qty">{item.qty}</span>
                  </li>
                ))}
              </ul>

              <div className="samagri-popup-note">
                <span aria-hidden="true">ℹ️</span>
                <span>
                  {isEn
                    ? 'Note: Acharyulu Garu will provide copper homa kundam, kalasam, and primary puja vessels at the venue.'
                    : 'గమనిక: హోమ కుండం, కలశం మరియు ప్రధాన పూజా పాత్రలను ఆచార్యుల వారే తీసుకొస్తారు.'}
                </span>
              </div>
            </div>

            <div className="samagri-popup-footer">
              <div className="samagri-footer-left">
                <button
                  type="button"
                  className="btn ghost samagri-copy-btn"
                  onClick={() => {
                    const listText = REQUIRED_SAMAGRI_ITEMS.map(
                      (i, idx) => `${idx + 1}. ${i.itemEn} - ${i.qty}`
                    ).join('\n');
                    navigator.clipboard?.writeText(listText);
                    setCopied('samagri');
                    setTimeout(() => setCopied(''), 2500);
                  }}
                >
                  {copied === 'samagri'
                    ? (isEn ? '✓ Copied' : '✓ కాపీ చేయబడింది')
                    : (isEn ? '📄 Copy List' : '📄 జాబితా కాపీ చేయండి')}
                </button>

                <button
                  type="button"
                  className="btn ghost samagri-share-wa-btn"
                  onClick={handleShareSamagri}
                  title={isEn ? 'Share list via WhatsApp or device apps' : 'వాట్సాప్‌లో జాబితాను షేర్ చేయండి'}
                >
                  <span aria-hidden="true">💬</span>
                  <span>{isEn ? 'Share List' : 'షేర్ చేయండి'}</span>
                </button>
              </div>

              <button
                type="button"
                className="btn primary samagri-done-btn"
                onClick={() => setShowSamagriModal(false)}
              >
                {isEn ? 'Done & Return' : 'పూర్తయింది'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BookingModal({ isOpen, serviceName, onClose }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    mode: 'At My Home / Venue',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);

  // Close on Escape key & disable body scroll
  useEffect(() => {
    if (!isOpen) return;

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
        mode: 'At My Home / Venue',
        notes: '',
      });
      setSubmitted(false);
      setCopied(false);
    }
  }, [isOpen, serviceName, todayStr]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date, mode, notes } = formData;
    const msg =
      `Namaste! I would like to book:\n` +
      `*Ceremony:* ${serviceName}\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Date:* ${date}\n` +
      `*Mode:* ${mode}` +
      (notes ? `\n*Gotram/Notes:* ${notes}` : '');

    setSummary(`${serviceName} on ${date} (${mode}) for ${name}.`);
    setWhatsappUrl(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`);
    setSubmitted(true);
  };

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal-dialog">
        <div className="dhead">
          <h3 id="modalTitle">{t('booking.title')}</h3>
          <button
            type="button"
            className="ib"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {!submitted ? (
          <form className="dbody" onSubmit={handleSubmit}>
            <div className="sel">
              <span>🪔</span>
              <span>{serviceName}</span>
            </div>

            <label>
              Full Name *
              <input
                name="name"
                required
                placeholder="Enter your full name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone / WhatsApp Number *
              <input
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <div className="two">
              <label>
                Preferred Date *
                <input
                  name="date"
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={handleChange}
                />
              </label>

              <label>
                Location / Mode
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                >
                  <option value="At My Home / Venue">At My Home / Venue</option>
                  <option value="At Ashram / Temple">At Ashram / Temple</option>
                  <option value="Online Sankalpam (Remote)">Online Sankalpam (Remote)</option>
                </select>
              </label>
            </div>

            <label>
              Gotram / Nakshatram / Special Sankalpam
              <textarea
                name="notes"
                rows="3"
                placeholder="Enter family gotram, birth stars, or prayer intentions..."
                value={formData.notes}
                onChange={handleChange}
              />
            </label>

            <button className="btn primary btn-full booking-submit-btn" type="submit">
              {t('booking.confirm')}
            </button>
          </form>
        ) : (
          <div className="dbody done">
            <div className="tick">✓</div>
            <h3 className="booking-success-title">{t('booking.ready')}</h3>
            <p className="booking-success-text">{summary}</p>

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
                onClick={handleCopyDetails}
              >
                {copied ? t('contact.copied') : t('booking.copy')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { GOSEVA_CONTACT_INFO } from '../../data/gosevaData';

/**
 * Invoke handler when Escape is pressed while a modal/lightbox is active.
 */
export function useEscapeKey(isActive, onEscape) {
  useEffect(() => {
    if (!isActive) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive, onEscape]);
}

/**
 * Clean 10-digit Indian mobile validation supporting optional +91 / spaces.
 */
export function isValidIndianMobile(rawPhone) {
  const digits = String(rawPhone || '').replace(/\D/g, '');
  const trimmed = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(trimmed);
}

/**
 * Basic email validation when email is required or supplied.
 */
export function isValidEmail(rawEmail) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(rawEmail || '').trim());
}

/**
 * Build WhatsApp deep link for Srivari Dasudu Go Seva desk.
 */
export function buildGosevaWhatsAppUrl(lines) {
  const message = lines.filter(Boolean).join('\n');
  return `https://wa.me/${GOSEVA_CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Validate standard devotee contact fields across donation, monthly pooja, and product checkout forms.
 */
export function validateDevoteeFields(fields, { isEn, requireEmail = false, requireAddress = false }) {
  const errors = {};
  if (!String(fields.name || '').trim()) {
    errors.name = isEn ? 'Please enter your full name.' : 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.';
  }
  if (!isValidIndianMobile(fields.phone)) {
    errors.phone = isEn
      ? 'Please enter a valid 10-digit mobile number.'
      : 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి.';
  }
  const emailTrimmed = String(fields.email || '').trim();
  if (requireEmail && !emailTrimmed) {
    errors.email = isEn ? 'Please enter your email address.' : 'దయచేసి మీ ఈమెయిల్ ఇవ్వండి.';
  } else if (emailTrimmed && !isValidEmail(emailTrimmed)) {
    errors.email = isEn ? 'Please enter a valid email address.' : 'దయచేసి సరైన ఈమెయిల్ ఇవ్వండి.';
  }
  if (requireAddress && !String(fields.address || '').trim()) {
    errors.address = isEn
      ? 'Please enter your delivery address.'
      : 'దయచేసి డెలివరీ చిరునామా ఇవ్వండి.';
  }
  return errors;
}

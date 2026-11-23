import React, { useCallback, useEffect, useState } from 'react';
import { SMARTA_SEVA_HAVANALU } from '../data/smartaSevaData';
import { useLanguage } from '../context/LanguageContext';
import { getHavanamSlotInfo, HAVANAM_MAX_SLOTS } from '../utils/havanamSlots';

const GOOGLE_MAPS_LOCATION_URL = 'https://share.google/wLXyppd4gw1rIU1w1';
const VENUE_FULL_ADDRESS =
  'Bilva Patra Trust / Sri Vari Dasudu Adhyatmika Kuteer, Flat No. 503, Sri Kaustubh Nillayam, Vivekananda Nagar, Yendada, Visakhapatnam, Andhra Pradesh 530045';

function readAllSlotInfo() {
  const map = {};
  SMARTA_SEVA_HAVANALU.forEach((item) => {
    map[item.id] = getHavanamSlotInfo(item.id);
  });
  return map;
}

export default function SmartaSevaView({ onNavigate, onBook }) {
  const { isEn } = useLanguage();
  const [slotsById, setSlotsById] = useState(readAllSlotInfo);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(VENUE_FULL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const refreshSlots = useCallback(() => {
    setSlotsById(readAllSlotInfo());
  }, []);

  useEffect(() => {
    refreshSlots();
    const onStorage = (e) => {
      if (e.key === 'srivari_havanam_slots_v1') refreshSlots();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', refreshSlots);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', refreshSlots);
    };
  }, [refreshSlots]);

  const openBooking = (item) => {
    const info = getHavanamSlotInfo(item.id);
    if (info.isFull) return;
    onBook({
      serviceName: isEn ? item.nameEn : item.nameTe,
      pricingType: 'samuhika',
      havanamId: item.id,
      onBooked: refreshSlots
    });
  };

  return (
    <div className="page-wrapper smartam-page smarta-seva-page">
      <section className="smartam-hero-header" aria-label="Samuhika Havanalu Hero">
        <div className="smartam-hero-bg-overlay" aria-hidden="true" />
        <div className="smartam-hero-frame" aria-hidden="true" />

        <div className="wrap smartam-hero-content">
          <h1 className="smartam-hero-title">
            {isEn ? 'Samuhika Havanalu' : 'సామూహిక హవనాలు'}
          </h1>

          <div className="smartam-hero-subtitle">
            {isEn
              ? 'Sacred monthly Samuhika Havanalu performed on Chitta, Moola, Amavasya, and Swathi Nakshatra with personal Gotra Sankalpam.'
              : 'చిత్తా, మూలా, అమావాస్య మరియు స్వాతి నక్షత్రాల నాడు భక్తుల గోత్ర నామ సంకల్పంతో నిర్వహించబడే పవిత్ర మాస సామూహిక హవనాలు.'}
          </div>
        </div>
      </section>

      <section className="wrap smartam-cards-section">
        <div className="temple-sec-head seva-sec-head">
          <div className="sec-head-content">
            <h2 className="temple-sec-title">
              {isEn
                ? 'Monthly Samuhika Havanalu & Homams'
                : 'ప్రతి మాసం నిర్వహించబడే సామూహిక హవనాలు'}
            </h2>
          </div>
        </div>

        <div className="smartam-cards-grid">
          {SMARTA_SEVA_HAVANALU.map((item) => {
            const slots = slotsById[item.id] || getHavanamSlotInfo(item.id);
            const isFull = slots.isFull;

            return (
              <article className="temple-card smartam-card" key={item.id}>
                <div className="smartam-card-media">
                  <img
                    src={item.image}
                    alt={isEn ? item.nameEn : item.nameTe}
                    className="smartam-card-img"
                    style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                    loading="lazy"
                  />
                </div>

                <div className="smartam-card-body">
                  <h3 className="smartam-card-title">
                    {isEn ? item.nameEn : item.nameTe}
                  </h3>
                  <div className="smartam-card-sub">
                    {isEn ? item.scheduleEn : item.scheduleTe}
                  </div>

                  <div className="smarta-card-price-row">
                    <div className="smarta-price-chip">
                      <span className="smarta-price-lbl">
                        {isEn ? 'Seva Contribution:' : 'సేవా రుసుము:'}
                      </span>
                      <span className="smarta-price-val">
                        {item.cost || (isEn ? 'Confirm at Seva Desk' : 'సేవా డెస్క్ వద్ద తెలుసుకోండి')}
                      </span>
                    </div>
                    {slots.remaining > 0 && (
                      <span className={`smarta-slot-pill ${slots.booked > 0 ? 'is-filling' : ''}`}>
                        <span className="slot-dot" aria-hidden="true" />
                        {slots.booked > 0
                          ? isEn
                            ? `Slots are filling fast · ${slots.remaining} left`
                            : `స్లాట్లు వేగంగా భర్తీ అవుతున్నాయి · ${slots.remaining} మిగిలాయి`
                          : isEn
                            ? `${slots.remaining} slots left`
                            : `${slots.remaining} స్లాట్లు మిగిలాయి`}
                      </span>
                    )}
                  </div>

                  <p className="smartam-card-desc">
                    {isEn ? item.descEn : item.descTe}
                  </p>

                  <div className="samuhika-card-note">
                    <span className="samuhika-note-label">{isEn ? 'Note: ' : 'గమనిక: '}</span>
                    <span className="samuhika-note-text">
                      {isEn
                        ? 'Devotees are kindly requested to visit Adhyatmika Kuteer and attend the session in person. Only two persons are permitted.'
                        : 'భక్తులు ఆధ్యాత్మిక కుటీరాన్ని సందర్శించి ప్రత్యక్షంగా పాల్గొనవలసిందిగా మనవి. ఇద్దరు వ్యక్తులకు మాత్రమే అనుమతి కలదు.'}
                    </span>
                  </div>

                  <div className="smartam-card-actions">
                    <button
                      type="button"
                      className="btn primary smartam-book-btn"
                      disabled={isFull}
                      onClick={() => openBooking(item)}
                    >
                      {isFull
                        ? isEn
                          ? 'No Slots Available'
                          : 'స్లాట్లు లేవు'
                        : isEn
                          ? `Book Seat (${item.cost || '₹1,116'}) →`
                          : `సీటు బుక్ చేయండి (${item.cost || '₹1,116'}) →`}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sacred Havanam Venue & Location Section */}
      <section className="wrap samuhika-venue-section" aria-label="Havanam Venue Location">
        <div className="samuhika-venue-head">
          <div className="temple-eyebrow">
            <span className="eyebrow-symbol">✦</span>
            <span>{isEn ? 'Havanam Venue & Directions' : 'హవన వేదిక & లొకేషన్'}</span>
            <span className="eyebrow-symbol">✦</span>
          </div>
          <h2 className="samuhika-venue-title">
            {isEn ? 'Sacred Venue & Navigation' : 'పవిత్ర హవన వేదిక & మార్గదర్శనం'}
          </h2>
          <p className="samuhika-venue-lead">
            {isEn
              ? 'Devotees attending the sacred Samuhika Havanam in person are welcomed to attend at our serene venue in Visakhapatnam. Easily locate and navigate via Google Maps.'
              : 'సామూహిక హవనాలలో ప్రత్యక్షంగా పాల్గొనే భక్తులు విశాఖపట్నంలోని మా పవిత్ర వేదిక వద్దకు విచ్చేయవచ్చు. Google Maps ద్వారా సులభంగా చేరుకోండి.'}
          </p>
        </div>

        <div className="samuhika-venue-card">
          <div className="samuhika-venue-info">
            <div className="samuhika-venue-badge">
              <span className="venue-pin-icon" aria-hidden="true">📍</span>
              <span>{isEn ? 'In-Person Havanam Venue' : 'ప్రత్యక్ష హవన వేదిక'}</span>
            </div>

            <h3 className="samuhika-venue-name">
              {isEn ? 'Bilva Patra Trust' : 'బిల్వ పత్ర ట్రస్ట్'}
            </h3>
            <div className="samuhika-venue-subname">
              {isEn
                ? 'Sri Vari Dasudu Adhyatmika Kuteer'
                : 'శ్రీ వారి దాసుడు ఆధ్యాత్మిక కుటీరం'}
            </div>

            <div className="samuhika-address-box">
              <div className="samuhika-address-icon" aria-hidden="true">🏛️</div>
              <div className="samuhika-address-text">
                <span className="samuhika-address-label">
                  {isEn ? 'Full Venue Address:' : 'పూర్తి చిరునామా వివరాలు:'}
                </span>
                <p className="addr-strong">Flat No. 503, Sri Kaustubh Nillayam</p>
                <p>Vivekananda Nagar, Yendada</p>
                <p>Visakhapatnam, Andhra Pradesh – 530045</p>
              </div>
            </div>

            <div className="samuhika-venue-highlights">
              <div className="samuhika-highlight-item">
                <span className="highlight-icon" aria-hidden="true">👥</span>
                <div className="highlight-text">
                  <strong>{isEn ? 'In-Person Attendance' : 'ప్రత్యక్ష హాజరు'}</strong>
                  <span>
                    {isEn
                      ? 'Maximum 2 persons permitted per booked slot'
                      : 'ఒక బుకింగ్‌కు గరిష్టంగా ఇద్దరు వ్యక్తులకు మాత్రమే అనుమతి'}
                  </span>
                </div>
              </div>

              <div className="samuhika-highlight-item">
                <span className="highlight-icon" aria-hidden="true">⏱️</span>
                <div className="highlight-text">
                  <strong>{isEn ? 'Punctual Arrival' : 'సమయపాలన'}</strong>
                  <span>
                    {isEn
                      ? 'Kindly reach the venue 15 minutes prior to Sankalpam'
                      : 'సంకల్ప సమయానికి 15 నిమిషాల ముందుగా వేదికకు చేరుకోగలరు'}
                  </span>
                </div>
              </div>

              <div className="samuhika-highlight-item">
                <span className="highlight-icon" aria-hidden="true">🚗</span>
                <div className="highlight-text">
                  <strong>{isEn ? 'Easy Accessibility' : 'సులభ ప్రవేశం'}</strong>
                  <span>
                    {isEn
                      ? 'Convenient road connectivity & devotee parking in Yendada'
                      : 'ఎండడ వద్ద సులభమైన ప్రయాణ మార్గం మరియు భక్తుల పార్కింగ్'}
                  </span>
                </div>
              </div>
            </div>

            <div className="samuhika-venue-actions">
              <a
                href={GOOGLE_MAPS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary samuhika-maps-btn"
              >
                <span>📍</span>
                <span>{isEn ? 'Open in Google Maps ↗' : 'Google Maps లో తెరవండి ↗'}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className={`btn secondary samuhika-copy-btn ${copied ? 'is-copied' : ''}`}
              >
                <span>{copied ? '✓' : '📋'}</span>
                <span>
                  {copied
                    ? isEn
                      ? 'Address Copied!'
                      : 'చిరునామా కాపీ అయింది!'
                    : isEn
                      ? 'Copy Full Address'
                      : 'చిరునామా కాపీ చేయండి'}
                </span>
              </button>
            </div>
          </div>

          <div className="samuhika-venue-map-wrap">
            <div className="samuhika-map-frame-container">
              <iframe
                title="Bilva Patra Trust Havanam Venue Map"
                src="https://maps.google.com/maps?q=Bilva%20Patra%20Trust%2C%20Vivekananda%20Nagar%2C%20Yendada%2C%20Visakhapatnam&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="samuhika-map-overlay-bar">
              <div className="map-overlay-text">
                <span className="map-overlay-pin">📍</span>
                <span className="map-overlay-title">Bilva Patra Trust · Yendada, Vizag</span>
              </div>
              <a
                href={GOOGLE_MAPS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="map-overlay-link"
              >
                {isEn ? 'Directions ↗' : 'దారి చూడండి ↗'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap smartam-bottom-cta">
        <div className="smartam-cta-box">
          <h3 className="smartam-cta-heading">
            {isEn
              ? 'Participate in Monthly Samuhika Havanalu with Your Family Sankalpam'
              : 'మీ కుటుంబ గోత్ర నామ సంకల్పంతో మాస సామూహిక హవనాలలో పాల్గొనండి'}
          </h3>
          <p className="smartam-cta-desc">
            {isEn
              ? 'Each monthly havanam has limited seats only. Advance booking is advised as slots are filling fast.'
              : 'ప్రతి మాస హవనానికి పరిమిత సీట్లు మాత్రమే. స్లాట్లు వేగంగా భర్తీ అవుతున్నందున ముందస్తు నమోదు చేసుకోగలరు.'}
          </p>

          <div className="smartam-cta-buttons">
            <button
              type="button"
              className="btn ghost smartam-ghost-btn"
              onClick={() => onNavigate('contact')}
            >
              {isEn ? 'Contact Help Desk →' : 'హెల్ప్ డెస్క్ సంప్రదించండి →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

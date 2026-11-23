import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const MONTHLY_EVENTS = [
  {
    id: 1,
    dateEn: 'Ekadashi · Nov 20, 2026',
    dateTe: 'ఏకాదశి · నవం 20, 2026',
    badgeEn: 'Upcoming Auspicious Day',
    badgeTe: 'రాబోయే శుభ దినం',
    titleEn: 'Maha Sudarshana & Narasimha Homam',
    titleTe: 'మహా సుదర్శన & నరసింహ హోమం',
    image: '/images/cards/event-05-sudarshana.jpg',
    descEn:
      'Supreme Vaishnava fire offering invoking Lord Sudarshana and Lord Narasimha to shield the family against evil eyes, legal distress, and acute hurdles.',
    descTe:
      'కుటుంబాన్ని దృష్టి దోషం, చట్టపరమైన ఇబ్బందులు మరియు తీవ్ర అడ్డంకుల నుంచి రక్షించేందుకు సుదర్శన మరియు నరసింహ స్వామి అనుగ్రహం కోసం వైష్ణవ హోమం.',
    locationEn: 'Sri Mudupula Venkanna Mandapam & Live Sankalpam Stream',
    locationTe: 'శ్రీ ముడుపుల వెంకన్న మండపం & ప్రత్యక్ష సంకల్ప ప్రసారం',
    duration: '3.5 hrs',
    bookName: 'Maha Sudarshana Homam'
  },
  {
    id: 2,
    dateEn: 'Purnima · Nov 24, 2026',
    dateTe: 'పూర్ణిమ · నవం 24, 2026',
    badgeEn: 'Full Moon Consecration',
    badgeTe: 'పూర్ణిమ కార్యక్రమం',
    titleEn: 'Sri Satyanarayana Swamy Maha Vratam',
    titleTe: 'శ్రీ సత్యనారాయణ స్వామి మహా వ్రతం',
    image: '/images/cards/event-03-satyanarayana.jpg',
    descEn:
      'Sacred katha parayanam of five divine chapters invoking Sri Satyanarayana Swamy for domestic happiness, progeny blessings, and business success.',
    descTe:
      'గృహ సుఖం, సంతాన ఆశీస్సులు మరియు వ్యాపార విజయం కోసం శ్రీ సత్యనారాయణ స్వామి ఐదు అధ్యాయాల కథా పారాయణం.',
    locationEn: 'Temple Mandapam & Remote Devotee Sankalpam',
    locationTe: 'ఆలయ మండపం & దూరస్థ భక్త సంకల్పం',
    duration: '2.5 hrs',
    bookName: 'Satyanarayana Swamy Vratam'
  },
  {
    id: 3,
    dateEn: 'Pradosham · Dec 08, 2026',
    dateTe: 'ప్రదోషం · డిసెం 08, 2026',
    badgeEn: 'Evening Sacred Tithi',
    badgeTe: 'సాయంత్ర పవిత్ర తిథి',
    titleEn: 'Sri Rudra Abhishekam with Chamakam',
    titleTe: 'శ్రీ రుద్రాభిషేకం చమకంతో',
    image: '/images/cards/event-06-rudra-abhishekam.jpg',
    descEn:
      'Sacred eleven-dravya abhishekam with pristine Vedic recitations to pacify Saturn & Rahu-Ketu doshas, granting radiant health and longevity.',
    descTe:
      'శని, రాహు-కేతు దోష శాంతి కోసం పదకొండు ద్రవ్యాలతో రుద్రాభిషేకం — ఆరోగ్యం మరియు ఆయురారోగ్యం కోసం.',
    locationEn: 'Sri Mudupula Venkanna Mandir & Live Telecast',
    locationTe: 'శ్రీ ముడుపుల వెంకన్న మందిరం & ప్రత్యక్ష ప్రసారం',
    duration: '2.0 hrs',
    bookName: 'Rudra Abhishekam'
  }
];

export default function HomeMonthlyEvents({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();

  return (
    <section className="temple-section events-section" aria-label={t('home.events.title')}>
      <div className="wrap">
        <div className="temple-sec-head">
          <div className="sec-head-content">
            <div className="temple-eyebrow">
              <span className="eyebrow-symbol">✦</span>
              <span>{t('home.events.eyebrow')}</span>
              <span className="eyebrow-symbol">✦</span>
            </div>
            <h2 className="temple-sec-title">{t('home.events.title')}</h2>

            <div className="temple-lotus-divider" aria-hidden="true">
              <span className="divider-line" />
              <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2C12 6 8 8 5 9C9 11 11 13 14 17C17 13 19 11 23 9C20 8 16 6 14 2Z" fill="#C9972D" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FFF8E9" />
              </svg>
              <span className="divider-line" />
            </div>

            <p className="temple-sec-subtitle">{t('home.events.subtitle')}</p>
          </div>

          <button type="button" className="view-all-gold-btn" onClick={() => onNavigate('events')}>
            <span>{t('home.events.viewAll')}</span>
            <span className="arrow-sym">&rarr;</span>
          </button>
        </div>

        <div className="rituals-devotional-grid">
          {MONTHLY_EVENTS.map((event) => (
            <article className="temple-card ritual-card" key={event.id}>
              <div className="card-corner corner-tl" />
              <div className="card-corner corner-tr" />
              <div className="card-corner corner-bl" />
              <div className="card-corner corner-br" />

              <div className="ritual-media-wrap">
                <img
                  src={event.image}
                  alt={isEn ? event.titleEn : event.titleTe}
                  className="ritual-photo"
                  loading="lazy"
                />
                <div className="ritual-date-pill">{isEn ? event.dateEn : event.dateTe}</div>
                <div className="ritual-cat-badge">{isEn ? event.badgeEn : event.badgeTe}</div>
              </div>

              <div className="ritual-body">
                <h3 className="ritual-title">{isEn ? event.titleEn : event.titleTe}</h3>
                <p className="ritual-desc">{isEn ? event.descEn : event.descTe}</p>

                <div className="ritual-meta-box">
                  <div className="meta-row">
                    <span className="meta-lbl">{t('home.events.venue')}</span>
                    <span className="meta-val">{isEn ? event.locationEn : event.locationTe}</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-lbl">{t('home.events.duration')}</span>
                    <span className="meta-val">{event.duration}</span>
                  </div>
                </div>

                <div className="card-action-bar">
                  <button
                    type="button"
                    className="btn primary ritual-btn"
                    onClick={() => onBook(event.bookName)}
                  >
                    {t('home.events.book')}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

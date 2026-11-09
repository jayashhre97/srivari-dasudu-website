import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const MUHURTHAM_LIST = [
  {
    id: 'vivaha',
    category: 'Sacred Marriage',
    title: 'Vivaha Muhurtham (Sacred Wedding)',
    desc: 'Comprehensive Kundali matching, Ashtakoota Milan, Guru-Shukra Moudhya verification, Tara Balam, Chandra Balam, and precise Shuddha Lagna calculation to ensure matrimonial bliss and lifelong harmony.',
    significance: 'Accurate timing for Jeelakarra-Bellam, Mangalya Dharana, and Saptapadi.',
    action: 'Book Vivaha Muhurtham'
  },
  {
    id: 'gruha',
    category: 'Home & Construction',
    title: 'Gruha Pravesam & Shanku Sthapana (Housewarming)',
    desc: 'Foundation stone laying (Shanku Sthapana), main doorway installation (Dwarabandha Pratishtha), and new housewarming (Gruha Pravesam) aligned with Vastu Purusha blessings.',
    significance: 'Invokes domestic peace, prosperity, longevity, and positive energy in the new home.',
    action: 'Book Gruha Pravesam Muhurtham'
  },
  {
    id: 'upanayanam',
    category: 'Vedic Initiation',
    title: 'Upanayanam Ceremony (Sacred Thread)',
    desc: 'Gayatri Mahamantra initiation, Yajnopavita Dharana, and entry into Brahmacharyashram calculated during auspicious Uttarayana sunrise periods.',
    significance: 'Bestows sharp intellect, spiritual wisdom, and eligibility for Vedic study.',
    action: 'Book Upanayanam Muhurtham'
  },
  {
    id: 'namakaranam',
    category: 'Child Ceremonies',
    title: 'Namakaranam & Annaprasana (Naming & First Food)',
    desc: 'Auspicious timing for child naming ceremony on the 11th, 21st, or 29th day, and first solid food feeding (Annaprasana) in the 6th month.',
    significance: 'Blessings of Lord Dhanvantari and Goddess Annapurna for robust health and long life.',
    action: 'Book Namakaranam / Annaprasana'
  },
  {
    id: 'aksharabhyasam',
    category: 'Education & Wisdom',
    title: 'Aksharabhyasam & Vidhyarambham (Learning Initiation)',
    desc: 'First initiation into letters and learning with sacred prayers to Goddess Saraswati, Lord Hayagriva, and Lord Ganesha on auspicious tithis.',
    significance: 'Enhances memory retention, academic excellence, and cognitive focus.',
    action: 'Book Aksharabhyasam Muhurtham'
  },
  {
    id: 'vyaparam',
    category: 'Business & Vehicle',
    title: 'New Business & Vehicle Pooja (Inauguration)',
    desc: 'Auspicious timings for new store, office, factory openings, and new vehicle delivery calculated under Dhana Labha and Vijaya Yogas.',
    significance: 'Attracts Ashta Lakshmi blessings, business growth, and travel protection.',
    action: 'Book Business / Vehicle Muhurtham'
  }
];

export default function MuhurthamPage({ onNavigate, onBook }) {
  const { t } = useLanguage();

  return (
    <div className="page-wrapper muhurtham-page">
      <div className="page-banner page-banner--parayanam page-banner--pos-25">
        <div className="wrap">
          <div className="eyebrow">{t('muhurtham.eyebrow')}</div>
          <h1>{t('muhurtham.title')}</h1>
          <p className="page-banner-lead">{t('muhurtham.lead')}</p>
          <div className="page-banner-actions">
            <button type="button" className="btn ghost" onClick={() => onNavigate('home')}>
              {t('common.backHome')}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook('Personalized Muhurtham Calculation Request')}
            >
              {t('muhurtham.cta')}
            </button>
          </div>
        </div>
      </div>

      <section className="page-section wrap">
        <div className="temple-card seva-intro-card">
          <div className="seva-intro-row">
            <div className="seva-intro-main">
              <div className="temple-eyebrow">
                <span>Vedic Muhurtham Shastra</span>
              </div>
              <h2 className="seva-intro-title">Significance of Auspicious Timings</h2>
              <p className="seva-intro-text">
                “Muhurtam chintyate yena tasya sarvam shubham bhavet” — For every sacred human effort to bear divine fruit, starting at the right celestial moment (Shubha Lagna) is paramount. Complete Panchanga Shuddhi (Tithi, Vara, Nakshatra, Yoga, and Karana) shields against doshas and ensures long-lasting prosperity.
              </p>
            </div>
            <div className="seva-req-box seva-req-box--flex">
              <div className="seva-req-title">Information Required for Muhurtham:</div>
              <ul className="seva-req-list">
                <li>Janma Nakshatra and Rashi (Moon Sign)</li>
                <li>Family Gotra</li>
                <li>Exact Date, Time, and Place of Birth</li>
                <li>Preferred date window for the ceremony</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="seva-cards-grid">
          {MUHURTHAM_LIST.map((m) => (
            <article key={m.id} className="temple-card seva-service-card">
              <div>
                <div className="seva-card-badge">{m.category}</div>
                <h3 className="seva-card-title">{m.title}</h3>
                <p className="seva-card-desc">{m.desc}</p>
                <div className="seva-fruit-box">
                  <strong className="seva-fruit-label">Auspicious Result: </strong>
                  <span className="seva-fruit-text">{m.significance}</span>
                </div>
              </div>

              <div className="seva-card-footer">
                <button
                  type="button"
                  className="btn primary btn-full"
                  onClick={() => onBook(`Muhurtham Inquiry: ${m.title}`)}
                >
                  {m.action} &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="page-consult-strip">
          <h3 className="page-consult-title">Direct Muhurtham Consultation with Chief Priest</h3>
          <p className="page-consult-text">
            Receive an authentic personalized Muhurtham Patrika tailored to your family&apos;s gotra, nakshatras, and preferred location by contacting Chief Priest Sri N. V. Ram Kishore Acharyulu directly.
          </p>
          <div className="page-consult-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook('Chief Priest Direct Muhurtham Consultation')}
            >
              Book Muhurtham Appointment &rarr;
            </button>
            <a
              href="https://wa.me/919876543210?text=Namaskaram%20Acharyulu%20Garu,%20I%20would%20like%20to%20consult%20for%20an%20auspicious%20Muhurtham."
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost btn-on-dark"
            >
              Consult on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

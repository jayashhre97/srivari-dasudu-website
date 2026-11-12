import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PITRU_SERVICES = [
  {
    id: 'taddinam',
    title: 'Taddinam (Annual Shraddha Ceremony)',
    subtitle: 'Annual Ancestral Lunar Tithi Shraddha Karma',
    desc: 'Annual sacred rites performed on the departure tithi of parents or ancestors. Performed with consecrated kusha grass, black sesame (tilodakam), Vedic mantras, pinda pradanam, and Brahmana bhojanam to repay ancestral debts and invoke divine blessings.',
    benefits: 'Brings immense ancestral peace, family prosperity, progeny well-being, and domestic harmony.',
    action: 'Book Annual Taddinam Karma'
  },
  {
    id: 'maasikam',
    title: 'Maasikam (Monthly Shraddha Ritual)',
    subtitle: 'Monthly Lunar Tithi Shraddha Vidhi',
    desc: 'Performed every lunar month on the designated departure tithi throughout the first commemorative year. Follows precise Agamic guidelines to ensure spiritual peace and progress for the departed soul.',
    benefits: 'Alleviates soul distress and aids safe transition to higher spiritual realms.',
    action: 'Book Maasikam Seva'
  },
  {
    id: 'samvatsarikam',
    title: 'Samvatsarikam (First Anniversary Shraddha)',
    subtitle: 'First Year Culmination Maha Samskara',
    desc: 'The most sacred and comprehensive ancestral ceremony marking the completion of one year. Includes Shodasha Shraddhas, Sapindikarana vidhi, Maha Sankalpam, and extensive dhanam to permanently unite ancestors with the Pitru Loka.',
    benefits: 'Complete fulfillment of filial duty (Pitru Rina Vimukti) and renewal of family auspicious ceremonies.',
    action: 'Book Samvatsarikam Seva'
  },
  {
    id: 'samasrikalu',
    title: 'Samasrikalu (Annual Ancestral Ceremonies)',
    subtitle: 'Yearly Samvatsarika Pitru Shraddha Vidhi',
    desc: 'Annual ancestral ceremonies (Samasrikalu / Samvatsarikalu) performed every year on the lunar departure tithi of departed parents and elders. Includes Gotra Sankalpam, Tilodaka Tarpanam, Pinda Pradanam, Vedic mantras, and Brahmana Bhojanam.',
    benefits: 'Sustains ancestral blessings, family harmony, progeny well-being, and spiritual fulfillment.',
    action: 'Book Samasrikalu Seva'
  },
  {
    id: 'mahalaya',
    title: 'Mahalaya Pitru Paksham (Fortnight of Ancestors)',
    subtitle: 'Bhadrapada Krishna Paksha Sacred Tarpanams',
    desc: 'A holy 15-day period occurring once a year from Bhadrapada Purnima to Mahalaya Amavasya. Devotees offer sesame tarpanams, sacred shraddha, and annadanam to all generations of departed ancestors.',
    benefits: 'Brings peace to all generations of ancestors and bestows health and wealth.',
    action: 'Book Mahalaya Shraddha Seva'
  },
  {
    id: 'narayana-bali',
    title: 'Narayana Bali & Tila Homam',
    subtitle: 'Vedic Rites for Pitru Dosha Pacification',
    desc: 'Special Vedic fire ceremonies described in the Garuda Purana to alleviate severe Pitru Doshas, ancestral curses, unnatural deaths, or persistent obstacles in marriage and childbearing.',
    benefits: 'Total pacification of ancestral afflictions, spiritual relief, and lasting peace of mind.',
    action: 'Book Narayana Bali & Tila Homam'
  }
];

export default function PitruSevaPage({ onNavigate, onBook }) {
  const { t } = useLanguage();

  return (
    <div className="page-wrapper pitru-page">
      <div className="page-banner page-banner--parayanam page-banner--pos-40">
        <div className="wrap">
          <div className="eyebrow">{t('pitru.eyebrow')}</div>
          <h1>{t('pitru.title')}</h1>
          <p className="page-banner-lead">{t('pitru.lead')}</p>
          <div className="page-banner-actions">
            <button type="button" className="btn ghost" onClick={() => onNavigate('home')}>
              {t('common.backHome')}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook('Pitru Devata Seva Consultation')}
            >
              {t('pitru.cta')}
            </button>
          </div>
        </div>
      </div>

      <section className="page-section wrap">
        <div className="temple-card seva-intro-card">
          <div className="seva-intro-grid">
            <div>
              <div className="temple-eyebrow">
                <span>Pitru Devo Bhava</span>
              </div>
              <h2 className="seva-intro-title">Significance of Ancestral Shraddha</h2>
              <p className="seva-intro-text">
                In Sanatana Dharma, expressing deep gratitude to our departed parents and ancestors through Pitru Yajna is a sacred spiritual duty. When sacred sesame, pure water, and pinda offerings are made with personalized Gotra Sankalpam, the ancestors are deeply pleased and shower their descendants with longevity, good health, progeny, and abundance.
              </p>
              <p className="seva-intro-text seva-intro-text--last">
                Chief Priest <strong>Sri N. V. Ram Kishore Acharyulu</strong> personally supervises every ritual strictly following classical Grihya and Agamic Vidhanas with pure materials.
              </p>
            </div>

            <div className="seva-req-box">
              <h3 className="seva-req-title">Details Required for Shraddha Rites:</h3>
              <ul className="seva-req-list">
                <li><strong>Family Gotra</strong></li>
                <li><strong>Name of Departed Soul &amp; Relationship</strong> (Father / Mother / Grandparent)</li>
                <li><strong>Lunar Tithi or Calendar Date of Departure</strong></li>
                <li><strong>Karta Details</strong> (Name and Nakshatra of person performing the rite)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="seva-cards-grid">
          {PITRU_SERVICES.map((srv) => (
            <article key={srv.id} className="temple-card seva-service-card">
              <div>
                <div className="seva-card-badge">{srv.subtitle}</div>
                <h3 className="seva-card-title">{srv.title}</h3>
                <p className="seva-card-desc">{srv.desc}</p>
                <div className="seva-fruit-box">
                  <strong className="seva-fruit-label">Spiritual Fruit: </strong>
                  <span className="seva-fruit-text">{srv.benefits}</span>
                </div>
              </div>

              <div className="seva-card-footer">
                <button
                  type="button"
                  className="btn primary btn-full"
                  onClick={() => onBook(`Pitru Seva: ${srv.title}`)}
                >
                  {srv.action} &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="page-consult-strip">
          <h3 className="page-consult-title">Direct Consultation for Ancestral Ceremonies</h3>
          <p className="page-consult-text">
            Speak directly with Chief Priest Sri N. V. Ram Kishore Acharyulu regarding lunar tithi determination, samagri arrangements, or conducting shraddha rites at Sri Mudupula Venkanna Temple.
          </p>
          <div className="page-consult-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook('Chief Priest Direct Pitru Karma Consultation')}
            >
              Book Pitru Karma Seva &rarr;
            </button>
            <a
              href="https://wa.me/919876543210?text=Namaskaram%20Acharyulu%20Garu,%20I%20would%20like%20to%20consult%20regarding%20Pitru%20Devata%20Seva%20(Taddinam/Maasikam/Samvatsarikam/Samasrikalu)."
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

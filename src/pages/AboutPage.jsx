import React from 'react';
import LotusDivider from '../components/LotusDivider';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_URL =
  'https://wa.me/919876543210?text=' +
  encodeURIComponent('Namaskaram Acharyulu Garu, I would like to consult regarding spiritual guidance.');

const SPIRITUAL_SERVICES = [
  {
    id: 'vedic-activities',
    titleTe: 'వేద & ఆధ్యాత్మిక కార్యక్రమాలు',
    titleEn: 'Vedic & Spiritual Activities',
    descTe:
      'సనాతన ధర్మ పరిరక్షణార్థం వేద–ఆగమ సంప్రదాయాలు, పూజా విధానాలు, వ్రతాలు, పారాయణాలు మరియు ఆధ్యాత్మిక అవగాహనా కార్యక్రమాలను శ్రీవారి దాసుడు ఛారిటబుల్ ట్రస్ట్ ద్వారా నిర్వహించడం.',
    descEn:
      'Vedic–Agamic traditions, worship methods, vratas, parayanam, and spiritual awareness programs through Sri Vari Dasudu Charitable Trust for Sanatana Dharma protection.',
    linkTe: 'సంప్రదించండి',
    linkEn: 'Contact Us',
    target: 'contact'
  },
  {
    id: 'muhurtham',
    titleTe: 'శుభ ముహూర్త నిర్ణయం',
    titleEn: 'Auspicious Muhurtham Guidance',
    descTe:
      'వివాహం, గృహప్రవేశం, ఉపనయనం, నామకరణం, అక్షరాభ్యాసం, నూతన వ్యాపార మరియు వాహన పూజలకు జాతక-గోత్ర రీత్యా ఖచ్చితమైన వైదిక ముహూర్త నిర్ణయం.',
    descEn:
      'Precise Vedic muhurtham for marriage, housewarming, upanayanam, naming, education initiation, business, and vehicle puja based on horoscope and gotra.',
    linkTe: 'ముహూర్త నిర్ణయం',
    linkEn: 'Muhurtham Guidance',
    target: 'muhurtham'
  },
  {
    id: 'pitru-seva',
    titleTe: 'పితృ దేవత సేవ & శ్రాద్ధ కర్మలు',
    titleEn: 'Pitru Devata Seva & Shraddha',
    descTe:
      'తద్దినం, మాసికం, సంవత్సరీకం, మహాలయ పితృ పక్ష తర్పణము మరియు నారాయణ బలి / తిల హోమాలను శాస్త్రోక్త ఆగమ పద్ధతిలో శ్రద్ధాసక్తులతో నిర్వహించడం.',
    descEn:
      'Taddinam, Maasikam, Samvatsarikam, Mahalaya tarpanams, and Narayana Bali / Tila Homams performed with scriptural Agamic devotion.',
    linkTe: 'శ్రాద్ధ సేవ వివరాలు',
    linkEn: 'Shraddha Details',
    target: 'pitru-seva'
  },
  {
    id: 'goseva',
    titleTe: 'కామధేను గోసేవ',
    titleEn: 'Kamadhenu Goseva',
    descTe:
      'గోమాత సంరక్షణ, నిత్య పోషణ సమర్పణ మరియు గోదాన సంకల్పం ద్వారా ధర్మ సేవ మరియు లక్ష్మీ కటాక్ష సిద్ధికి ట్రస్ట్ చేపట్టిన గోసేవ కార్యక్రమాలు.',
    descEn:
      'Cow protection, daily nourishment offerings, and Go Dhanam sankalpam through Trust Goseva initiatives for dharma and prosperity.',
    linkTe: 'గోసేవ వివరాలు',
    linkEn: 'Goseva Details',
    target: 'goseva'
  },
  {
    id: 'smartam',
    titleTe: 'స్మార్త సంస్కారాలు',
    titleEn: 'Smartha Samskaras',
    descTe:
      'వివాహం, గృహప్రవేశం, సత్యనారాయణ వ్రతం, బారసాల, అన్నప్రాశన వంటి శుభకార్యాలకు శాస్త్రోక్త పౌరోహిత్య మార్గదర్శనం మరియు సేవలు.',
    descEn:
      'Scriptural priesthood guidance for marriage, housewarming, Satyanarayana Vratam, barsala, Annaprasana, and other household ceremonies.',
    linkTe: 'స్మార్త విధుల వివరాలు',
    linkEn: 'Smartam Details',
    target: 'smartam'
  },
  {
    id: 'homams',
    titleTe: 'వైదిక హోమాలు',
    titleEn: 'Vedic Homams',
    descTe:
      'మహా సుదర్శన, నృసింహ, చండీ, రుద్ర మరియు నవగ్రహ శాంతి కామ్య హోమాలను విశుద్ధ ద్రవ్యాలతో, కుటుంబ గోత్ర నామోచ్చారణతో లోకకల్యాణార్థం నిర్వహించడం.',
    descEn:
      'Maha Sudarshana, Narasimha, Chandi, Rudra, and Navagraha Shanti Kamya Homams performed with pure offerings and family gotra sankalpam.',
    linkTe: 'కామ్య హోమాల వివరాలు',
    linkEn: 'Homam Details',
    target: 'kamyamu'
  },
  {
    id: 'parayanam',
    titleTe: 'స్తోత్ర పారాయణం & ఆధ్యాత్మిక మార్గదర్శనం',
    titleEn: 'Stotra Parayanam & Spiritual Guidance',
    descTe:
      'శ్రీ సూక్తం, కనకధార, ఆదిత్య హృదయం, విష్ణు సహస్రనామ పారాయణాల ద్వారా మానసిక ప్రశాంతత, ఆరోగ్యం మరియు సర్వతోముఖాభివృద్ధికి దివ్య మార్గదర్శనం.',
    descEn:
      'Divine guidance through Sri Suktam, Kanakadhara, Aditya Hrudayam, and Vishnu Sahasranama for peace, health, and overall prosperity.',
    linkTe: 'పరిహారాల వివరాలు',
    linkEn: 'Remedy Details',
    target: 'remedies'
  }
];

const LINEAGE_STEPS = [
  {
    step: '01',
    titleTe: 'జన్మ & స్వస్థల విశేషాలు',
    titleEn: 'Birth & Native Heritage',
    descTe:
      'ఆంధ్రప్రదేశ్ తీరప్రాంత ఆధ్యాత్మిక నగరమైన విశాఖపట్నంలో జన్మించారు; పూర్వీకుల స్వస్థలం చారిత్రక రాజమహేంద్రవరం (రాజమండ్రి).',
    descEn:
      'Born in Visakhapatnam, Andhra Pradesh; ancestral native place is historic Rajahmundry (Rajahmundry).'
  },
  {
    step: '02',
    titleTe: 'సంప్రదాయం & సమాశ్రయణం',
    titleEn: 'Sampradaya & Samashrayanam',
    descTe:
      'మధ్వ సంప్రదాయంలో జన్మించి, శ్రీమన్నారాయణునిపై గల అనంత భక్తి, అనురక్తితో శాస్త్రోక్తంగా సమాశ్రయణం చేయించుకుని శ్రీ వైష్ణవ సంప్రదాయాన్ని స్వీకరించారు.',
    descEn:
      'Born in Madhwa tradition and initiated into Sri Vaishnava Sampradaya through scriptural samashrayanam with deep devotion to Srimannarayana.'
  },
  {
    step: '03',
    titleTe: 'ఆధ్యాత్మిక నిబద్ధత',
    titleEn: 'Spiritual Commitment',
    descTe:
      'శ్రీమన్నారాయణ భక్తి, సనాతన ధర్మ పరిరక్షణ, వేద–ఆగమ సంప్రదాయాల ప్రచారం మరియు భక్త కుటుంబాలకు శాస్త్రోక్త ఆధ్యాత్మిక మార్గదర్శనం అందించే దివ్య సంకల్పంతో కృషి చేస్తున్నారు.',
    descEn:
      'Committed to Srimannarayana bhakti, Sanatana Dharma protection, Vedic–Agamic outreach, and scriptural guidance for devotee families.'
  },
  {
    step: '04',
    titleTe: 'శ్రీవారి దాసుడు ఛారిటబుల్ మిషన్',
    titleEn: 'Srivari Dasudu Charitable Mission',
    descTe:
      'శ్రీవారి దాసుడు ఛారిటబుల్ ట్రస్ట్ ద్వారా వైదిక సేవలు, గోసేవ, శ్రాద్ధ కర్మలు, హోమాలు మరియు ఆధ్యాత్మిక అవగాహనను దేశవిదేశాల భక్తులకు చేరవేయడం.',
    descEn:
      'Delivering Vedic services, goseva, shraddha rites, homams, and spiritual awareness to devotees worldwide through Sri Vari Dasudu Charitable Trust.'
  }
];

export default function AboutPage({ onNavigate }) {
  const { t, isEn } = useLanguage();

  return (
    <div className="about-page-wrapper" data-lang-primary={isEn ? 'en' : 'te'}>
      <section className="about-hero-header" aria-label="About Sri Vari Dasudu Charitable Trust">
        <div className="about-hero-frame" aria-hidden="true" />
        <div className="about-page-container about-hero-layer">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <button type="button" className="about-crumb-link" onClick={() => onNavigate('home')}>
              {t('about.breadcrumb.home')}
            </button>
            <span className="about-crumb-sep" aria-hidden="true">/</span>
            <span className="about-crumb-current">{t('about.breadcrumb.about')}</span>
          </nav>

          <div className="about-hero-eyebrow">
            <span>✦</span>
            <span>{t('about.hero.eyebrow')}</span>
            <span>✦</span>
          </div>

          <h1 className="about-hero-title">{t('about.hero.title')}</h1>
          <div className="about-hero-designation">{t('about.hero.desc')}</div>

          <div className="about-hero-actions">
            <button type="button" className="btn primary about-cta-primary" onClick={() => onNavigate('contact')}>
              {t('common.contactUs')}
            </button>
          </div>
        </div>
      </section>

      <section className="about-section" aria-label="Founder Introduction">
        <div className="about-page-container">
          <div className="about-profile-grid">
            <div className="about-profile-media">
              <div className="about-logo-circle">
                <div className="about-logo-inner">
                  <img
                    src="/images/srivaridasudu.jpg"
                    alt="Sri N. V. Ram Kishore Acharyulu (Srivari Dasudu)"
                    className="about-logo-img"
                  />
                </div>
              </div>
              <div className="about-founder-badge">{t('about.founder.badge')}</div>
              <div className="about-trust-affiliation">{t('about.founder.trust')}</div>
            </div>

            <div className="about-profile-content">
              <h2>{isEn ? t('about.founder.nameEn') : t('about.founder.nameTe')}</h2>

              <LotusDivider align="start" />

              <p className="about-profile-intro-para">{t('about.founder.p1')}</p>
              <p className="about-profile-intro-para about-profile-intro-para--spaced">
                {t('about.founder.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" aria-label="Spiritual Message and Mission">
        <div className="about-page-container">
          <div className="about-bio-grid">
            <div className="about-bio-portrait-wrap">
              <div className="about-bio-frame">
                <img
                  src="/images/srivaridasudu.jpg"
                  alt="Sri N. V. Ram Kishore Acharyulu Portrait"
                  className="about-logo-img"
                />
              </div>
              <div className="about-bio-caption-name">
                {isEn ? 'Srivari Dasudu' : 'శ్రీవారి దాసుడు'}
              </div>
              <div className="about-bio-caption-place">{t('about.founder.badge')}</div>
            </div>

            <div className="about-bio-content">
              <div className="about-hero-eyebrow about-section-eyebrow">
                <span>✦</span>
                <span>{t('about.mission.eyebrow')}</span>
                <span>✦</span>
              </div>

              <h3 className="about-bio-heading">{t('about.mission.title')}</h3>
              <LotusDivider align="start" />
              <p className="about-bio-text">{t('about.mission.p1')}</p>
              <p className="about-bio-text">{t('about.mission.p2')}</p>
              <p className="about-bio-text">{t('about.mission.p3')}</p>
              <div className="about-bio-closing-mantra">{t('about.mission.mantra')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" aria-label="Spiritual Services and Responsibilities">
        <div className="about-page-container">
          <div className="about-section-header">
            <div className="about-hero-eyebrow about-section-eyebrow">
              <span>✦</span>
              <span>{t('about.services.eyebrow')}</span>
              <span>✦</span>
            </div>
            <h2 className="about-sec-title">{t('about.services.title')}</h2>
            <LotusDivider />
          </div>

          <div className="about-services-grid">
            {SPIRITUAL_SERVICES.map((srv) => (
              <article key={srv.id} className="about-service-card">
                <div className="about-service-icon-box">
                  <span className="about-service-star">✦</span>
                </div>
                <h3 className="about-service-title">
                  {isEn ? srv.titleEn : srv.titleTe}
                </h3>
                <p className="about-service-desc">
                  {isEn ? srv.descEn : srv.descTe}
                </p>
                <button
                  type="button"
                  className="about-service-link"
                  onClick={() => onNavigate(srv.target)}
                >
                  <span>{isEn ? srv.linkEn : srv.linkTe}</span>
                  <span>&rarr;</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-label="Spiritual Heritage and Guru Parampara">
        <div className="about-page-container">
          <div className="about-section-header">
            <div className="about-hero-eyebrow about-section-eyebrow">
              <span>✦</span>
              <span>{t('about.heritage.eyebrow')}</span>
              <span>✦</span>
            </div>
            <h2 className="about-sec-title">{t('about.heritage.title')}</h2>
            <LotusDivider />
          </div>

          <div className="about-lineage-timeline">
            {LINEAGE_STEPS.map((step) => (
              <div key={step.step} className="about-lineage-node">
                <div className="lineage-step-number">{step.step}</div>
                <h4 className="lineage-node-title">
                  {isEn ? step.titleEn : step.titleTe}
                </h4>
                <p className="lineage-node-desc">
                  {isEn ? step.descEn : step.descTe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--last" aria-label="Contact and Spiritual Guidance">
        <div className="about-page-container">
          <div className="about-consult-strip">
            <h3 className="about-consult-title">{t('about.consult.title')}</h3>
            <p className="about-consult-text">{t('about.consult.text')}</p>
            <div className="about-consult-actions">
              <button
                type="button"
                className="btn primary about-cta-primary"
                onClick={() => onNavigate('contact')}
              >
                {t('common.contactUs')}
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost about-consult-wa"
              >
                {t('about.consult.wa')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

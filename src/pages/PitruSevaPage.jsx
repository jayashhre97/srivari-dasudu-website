import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PITRU_SERVICES = [
  {
    id: 'taddinam',
    title: 'Taddinam (Annual Shraddha Ceremony)',
    titleTe: 'తద్దినం (వార్షిక శ్రాద్ధ కార్యక్రమం)',
    subtitle: 'Annual Ancestral Lunar Tithi Shraddha Karma',
    subtitleTe: 'వార్షిక పితృ చాంద్రమాన తిథి శ్రాద్ధ కర్మ',
    desc: 'Annual sacred rites performed on the departure tithi of parents or ancestors. Performed with consecrated kusha grass, black sesame (tilodakam), Vedic mantras, pinda pradanam, and Brahmana bhojanam to repay ancestral debts and invoke divine blessings.',
    descTe:
      'తల్లిదండ్రులు లేదా పూర్వీకుల మరణ తిథినాడు నిర్వహించే వార్షిక పవిత్ర కర్మలు. కుశ, తిలోదకం, వేద మంత్రాలు, పిండప్రదానం, బ్రాహ్మణ భోజనంతో పితృ రుణం తీర్చి దైవాశీస్సులు పొందడం.',
    benefits: 'Brings immense ancestral peace, family prosperity, progeny well-being, and domestic harmony.',
    benefitsTe: 'పితృ శాంతి, కుటుంబ సంపద, సంతాన శ్రేయస్సు మరియు గృహ శాంతిని కలుగజేస్తుంది.',
    action: 'Book Annual Taddinam Karma',
    actionTe: 'వార్షిక తద్దిన కర్మ బుక్ చేయండి'
  },
  {
    id: 'maasikam',
    title: 'Maasikam (Monthly Shraddha Ritual)',
    titleTe: 'మాసికం (మాస శ్రాద్ధ విధి)',
    subtitle: 'Monthly Lunar Tithi Shraddha Vidhi',
    subtitleTe: 'నెలవారీ చాంద్రమాన తిథి శ్రాద్ధ విధి',
    desc: 'Performed every lunar month on the designated departure tithi throughout the first commemorative year. Follows precise Agamic guidelines to ensure spiritual peace and progress for the departed soul.',
    descTe:
      'మొదటి సంవత్సరం అంతా ప్రతి చాంద్రమాన మరణ తిథినాడు నిర్వహించే కర్మ. పరలోకస్థ ఆత్మకు శాంతి, ఉన్నత లోక ప్రాప్తి కోసం ఆగమ విధానాల ప్రకారం చేస్తారు.',
    benefits: 'Alleviates soul distress and aids safe transition to higher spiritual realms.',
    benefitsTe: 'ఆత్మ క్లేశం తగ్గించి ఉన్నత లోకాలకు సురక్షిత ప్రయాణానికి సహాయపడుతుంది.',
    action: 'Book Maasikam Seva',
    actionTe: 'మాసిక సేవ బుక్ చేయండి'
  },
  {
    id: 'samvatsarikam',
    title: 'Samvatsarikam (First Anniversary Shraddha)',
    titleTe: 'సంవత్సరీకం (మొదటి వార్షికోత్సవ శ్రాద్ధం)',
    subtitle: 'First Year Culmination Maha Samskara',
    subtitleTe: 'మొదటి సంవత్సర సమాప్తి మహా సంస్కారం',
    desc: 'The most sacred and comprehensive ancestral ceremony marking the completion of one year. Includes Shodasha Shraddhas, Sapindikarana vidhi, Maha Sankalpam, and extensive dhanam to permanently unite ancestors with the Pitru Loka.',
    descTe:
      'ఒక సంవత్సరం పూర్తయినప్పుడు చేసే అత్యంత పవిత్రమైన పితృ కర్మ. షోడశ శ్రాద్ధాలు, సపిండీకరణ, మహా సంకల్పం, దానాలతో పితృలోకంతో శాశ్వత సంయోగం కలుగుతుంది.',
    benefits: 'Complete fulfillment of filial duty (Pitru Rina Vimukti) and renewal of family auspicious ceremonies.',
    benefitsTe: 'పితృ రుణ విముక్తి పూర్తి అవుతుంది; కుటుంబ శుభకార్యాలు పునఃప్రారంభమవుతాయి.',
    action: 'Book Samvatsarikam Seva',
    actionTe: 'సంవత్సరీక సేవ బుక్ చేయండి'
  },
  {
    id: 'samasrikalu',
    title: 'Samasrikalu (Annual Ancestral Ceremonies)',
    titleTe: 'సమస్రికాలు (వార్షిక పితృ కర్మలు)',
    subtitle: 'Yearly Samvatsarika Pitru Shraddha Vidhi',
    subtitleTe: 'వార్షిక సంవత్సరిక పితృ శ్రాద్ధ విధి',
    desc: 'Annual ancestral ceremonies (Samasrikalu / Samvatsarikalu) performed every year on the lunar departure tithi of departed parents and elders. Includes Gotra Sankalpam, Tilodaka Tarpanam, Pinda Pradanam, Vedic mantras, and Brahmana Bhojanam.',
    descTe:
      'పరలోకస్థ తల్లిదండ్రులు, పెద్దల చాంద్రమాన మరణ తిథినాడు ప్రతి సంవత్సరం నిర్వహించే సమస్రికాలు / సంవత్సరికాలు. గోత్ర సంకల్పం, తిలోదక తర్పణం, పిండప్రదానం, వేద మంత్రాలు, బ్రాహ్మణ భోజనం ఉంటాయి.',
    benefits: 'Sustains ancestral blessings, family harmony, progeny well-being, and spiritual fulfillment.',
    benefitsTe: 'పితృ అనుగ్రహం, కుటుంబ సామరస్యం, సంతాన శ్రేయస్సు, ఆధ్యాత్మిక పరిపూర్ణతను నిలబెడుతుంది.',
    action: 'Book Samasrikalu Seva',
    actionTe: 'సమస్రికాల సేవ బుక్ చేయండి'
  },
  {
    id: 'mahalaya',
    title: 'Mahalaya Pitru Paksham (Fortnight of Ancestors)',
    titleTe: 'మహాలయ పితృ పక్షం',
    subtitle: 'Bhadrapada Krishna Paksha Sacred Tarpanams',
    subtitleTe: 'భాద్రపద కృష్ణ పక్ష పవిత్ర తర్పణాలు',
    desc: 'A holy 15-day period occurring once a year from Bhadrapada Purnima to Mahalaya Amavasya. Devotees offer sesame tarpanams, sacred shraddha, and annadanam to all generations of departed ancestors.',
    descTe:
      'భాద్రపద పూర్ణిమ నుంచి మహాలయ అమావాస్య వరకు సంవత్సరానికి ఒకసారి వచ్చే 15 రోజుల పవిత్ర కాలం. అన్ని తరాల పితృదేవతలకు తిల తర్పణాలు, శ్రాద్ధం, అన్నదానం అర్పిస్తారు.',
    benefits: 'Brings peace to all generations of ancestors and bestows health and wealth.',
    benefitsTe: 'అన్ని తరాల పితృలకు శాంతి; సంతానానికి ఆరోగ్యం, సంపదలు ప్రసాదిస్తుంది.',
    action: 'Book Mahalaya Shraddha Seva',
    actionTe: 'మహాలయ శ్రాద్ధ సేవ బుక్ చేయండి'
  },
  {
    id: 'narayana-bali',
    title: 'Narayana Bali & Tila Homam',
    titleTe: 'నారాయణ బలి & తిల హోమం',
    subtitle: 'Vedic Rites for Pitru Dosha Pacification',
    subtitleTe: 'పితృ దోష శాంతి కోసం వైదిక కర్మలు',
    desc: 'Special Vedic fire ceremonies described in the Garuda Purana to alleviate severe Pitru Doshas, ancestral curses, unnatural deaths, or persistent obstacles in marriage and childbearing.',
    descTe:
      'గరుడ పురాణంలో చెప్పిన ప్రత్యేక వైదిక హోమాలు. తీవ్ర పితృ దోషాలు, పితృ శాపాలు, అకాల మరణాలు, వివాహ/సంతాన అడ్డంకులు తొలగించడానికి చేస్తారు.',
    benefits: 'Total pacification of ancestral afflictions, spiritual relief, and lasting peace of mind.',
    benefitsTe: 'పితృ పీడల పూర్తి శాంతి, ఆధ్యాత్మిక ఉపశమనం, మనశ్శాంతి కలుగుతాయి.',
    action: 'Book Narayana Bali & Tila Homam',
    actionTe: 'నారాయణ బలి & తిల హోమం బుక్ చేయండి'
  }
];

export default function PitruSevaPage({ onNavigate, onBook }) {
  const { t, isEn } = useLanguage();

  return (
    <div className="page-wrapper pitru-page">
      <div className="page-banner page-banner--parayanam page-banner--pos-40">
        <div className="wrap">
          <h1>{t('pitru.title')}</h1>
          <p className="page-banner-lead">{t('pitru.lead')}</p>
        </div>
      </div>

      <section className="page-section wrap">
        <div className="seva-cards-grid">
          {PITRU_SERVICES.map((srv) => {
            const title = isEn ? srv.title : srv.titleTe;
            const subtitle = isEn ? srv.subtitle : srv.subtitleTe;
            const desc = isEn ? srv.desc : srv.descTe;
            const benefits = isEn ? srv.benefits : srv.benefitsTe;
            const action = isEn ? srv.action : srv.actionTe;

            return (
              <article key={srv.id} className="temple-card seva-service-card">
                <div>
                  <div className="seva-card-badge">{subtitle}</div>
                  <h3 className="seva-card-title">{title}</h3>
                  <p className="seva-card-desc">{desc}</p>
                  <div className="seva-fruit-box">
                    <strong className="seva-fruit-label">{t('pitru.fruitLabel')} </strong>
                    <span className="seva-fruit-text">{benefits}</span>
                  </div>
                </div>

                <div className="seva-card-footer">
                  <button
                    type="button"
                    className="btn primary btn-full"
                    onClick={() => onBook(`${t('pitru.bookPrefix')} ${title}`)}
                  >
                    {action} &rarr;
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="page-consult-strip">
          <h3 className="page-consult-title">{t('pitru.consultTitle')}</h3>
          <p className="page-consult-text">{t('pitru.consultText')}</p>
          <div className="page-consult-actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => onBook(t('pitru.consultBook'))}
            >
              {t('pitru.consultCta')}
            </button>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(t('pitru.waText'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost btn-on-dark"
            >
              {t('pitru.consultWa')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

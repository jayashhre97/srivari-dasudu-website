export const VEDIC_CURRICULUM_STEPS = [
  {
    id: 'start-smartham',
    icon: '🪔',
    badgeEn: '01 · STUDY SEQUENCE',
    badgeTe: '01 · అధ్యయన క్రమం',
    titleEn: 'Vedas Start with Smartham, Then Remaining 4',
    titleTe: 'స్మార్తంతో ప్రారంభమై మిగిలిన 4 వేదాలు',
    descEn:
      'Vedic learning begins with Smartham (Grihya Sutras, Sandhyavandanam, and sacred samskaras), followed by the remaining four Vedas: Rigveda, Yajurveda, Samaveda, and Atharvaveda.',
    descTe:
      'వేద అధ్యయనం ముందుగా స్మార్తం (గృహ్య సూత్రాలు, సంధ్యావందనం, సంస్కార విధులు)తో ప్రారంభమై, ఆ తర్వాత మిగిలిన 4 వేదాలు (ఋగ్వేదం, యజుర్వేదం, సామవేదం, అథర్వవేదం) బోధించబడతాయి.'
  },
  {
    id: 'entrance-exam',
    icon: '📝',
    badgeEn: '02 · ENTRANCE & MID-STUDY EXAM',
    badgeTe: '02 · ప్రవేశ & మధ్యస్థాయి పరీక్ష',
    titleEn: 'Exam to Enter Vedic School & Mid-Study Exam',
    titleTe: 'ప్రవేశ పరీక్ష & అధ్యయన మధ్య పరీక్ష',
    descEn:
      'We conduct an entrance examination to enter the Vedic School—including for students joining in the middle of study—as well as mid-study assessment exams to evaluate Swara accuracy and progress.',
    descTe:
      'వేద పాఠశాలలో ప్రవేశం పొందడానికి (మధ్యలో చేరే విద్యార్థులతో సహా) ప్రవేశ పరీక్ష మరియు అధ్యయన మధ్యలో స్వర శుద్ధి, పురోగతి పరీక్షలు నిర్వహిస్తాము.'
  }
];

export const VEDIC_DATA = [
  {
    id: 'rigveda',
    name: 'Rigveda',
    teluguName: 'ఋగ్వేదం',
    subtitle: 'The Veda of Sacred Hymns & Divine Knowledge',
    subtitleTe: 'పవిత్ర సూక్తాలు & దివ్య జ్ఞాన వేదం',
    desc: 'The oldest of the sacred Vedic scriptures containing 10,552 mantras organized into 10 Mandalas. Devoted to ancient Sanskrit hymns invoking Agni, Indra, Varuna, and the cosmic order (Rta).',
    descTe:
      'పది మండలాలలో 10,552 మంత్రాలు గల అతి ప్రాచీన వేదం. అగ్ని, ఇంద్ర, వరుణ మరియు ఋతం (కాస్మిక క్రమం)ను స్తుతించే సంస్కృత సూక్తాలతో నిండి ఉంది.',
    coreSubjects: [
      'Samhita & Pada Patha Recitation',
      'Gayatri & Purusha Sukta Adhyayana',
      'Vedic Sanskrit Swara Pronunciation',
      'Daily Sandhyavandana Vidhi'
    ],
    coreSubjectsTe: [
      'సంహిత & పద పాఠ పఠనం',
      'గాయత్రీ & పురుష సూక్త అధ్యయనం',
      'వైదిక సంస్కృత స్వరోచ్ఛారణ',
      'నిత్య సంధ్యావందన విధి'
    ],
    ageGroup: '7 – 14 Years',
    ageGroupTe: '7 – 14 సంవత్సరాలు',
    duration: '6 – 8 Years (Complete Adhyayana)',
    durationTe: '6 – 8 సంవత్సరాలు (సంపూర్ణ అధ్యయనం)',
    image: '/images/vedic/rigveda.webp',
    fallbackImage: '/images/cards/event-01-homam.jpg',
    deity: 'Agni Deva & Sri Maha Vishnu',
    deityTe: 'అగ్ని దేవుడు & శ్రీ మహావిష్ణువు',
    keySignificance: 'Foundational knowledge of prayer, cosmic harmony, devotion, and Vedic chant mastery.',
    keySignificanceTe: 'ప్రార్థన, కాస్మిక సామరస్యం, భక్తి మరియు వేద ఘోషణ నైపుణ్యానికి పునాది జ్ఞానం.'
  },
  {
    id: 'yajurveda',
    name: 'Yajurveda',
    teluguName: 'యజుర్వేదం',
    subtitle: 'The Veda of Sacrificial Formulas & Ritual Procedures',
    subtitleTe: 'యజ్ఞ మంత్రాలు & క్రతు విధాన వేదం',
    desc: 'The practical manual for Vedic rites and yajnas, divided into Shukla (Vajasaneyi) and Krishna (Taittiriya) recensions. Teaches the precise sacrificial formulas, prose mantras, and ceremonial rituals.',
    descTe:
      'శుక్ల (వాజసనేయి) మరియు కృష్ణ (తైత్తిరీయ) శాఖలుగా విభజించబడిన యజ్ఞ–క్రతు విధానాల ప్రాయోగిక వేదం. యజ్ఞ మంత్రాలు, గద్య మంత్రాలు మరియు కర్మకాండను బోధిస్తుంది.',
    coreSubjects: [
      'Taittiriya Samhita & Aranyaka',
      'Yajna Kunda Nirmana & Homa Vidhis',
      'Sri Rudram & Chamaka Parayanam',
      'Smartha & Shrauta Samskaras'
    ],
    coreSubjectsTe: [
      'తైత్తిరీయ సంహిత & ఆరణ్యకం',
      'యజ్ఞ కుండ నిర్మాణం & హోమ విధులు',
      'శ్రీ రుద్రం & చమక పారాయణం',
      'స్మార్త & శ్రౌత సంస్కారాలు'
    ],
    ageGroup: '7 – 15 Years',
    ageGroupTe: '7 – 15 సంవత్సరాలు',
    duration: '6 – 8 Years',
    durationTe: '6 – 8 సంవత్సరాలు',
    image: '/images/vedic/yajurveda.webp',
    fallbackImage: '/images/cards/event-04-chandi.jpg',
    deity: 'Yajna Purusha & Lord Sri Rudra',
    deityTe: 'యజ్ఞ పురుషుడు & శ్రీ రుద్రుడు',
    keySignificance: 'Mastery of sacred rituals, homas, and consecration ceremonies across domestic and temple spheres.',
    keySignificanceTe: 'గృహ–దేవాలయ క్షేత్రాలలో హోమాలు, ప్రతిష్ఠలు మరియు పవిత్ర కర్మలలో నైపుణ్యం.'
  },
  {
    id: 'samaveda',
    name: 'Samaveda',
    teluguName: 'సామవేదం',
    subtitle: 'The Veda of Divine Melodies & Sacred Chants',
    subtitleTe: 'దివ్య సామగానం & పవిత్ర ఘోషణ వేదం',
    desc: 'Described by Lord Krishna in the Bhagavad Gita as "Vedanam Samavedo Asmi". Consists of poetic verses from the Rigveda set to sublime musical notations (Gana), creating divine spiritual vibrations.',
    descTe:
      'భగవద్గీతలో శ్రీకృష్ణుడు "వేదానాం సామవేదోస్మి" అని కీర్తించిన వేదం. ఋగ్వేద శ్లోకాలను సామగాన స్వరాలతో ఘోషించి దివ్య కంపనాలను సృష్టిస్తుంది.',
    coreSubjects: [
      'Kauthuma / Jaiminiya Shakha Chanting',
      'Seven Swaras (Saptaswara) Vedic Notes',
      'Chhandogya Upanishad Recitation',
      'Soma Yaga Chanting & Stotras'
    ],
    coreSubjectsTe: [
      'కౌథుమ / జైమినీయ శాఖ ఘోషణ',
      'సప్తస్వర వైదిక స్వరాలు',
      'ఛాందోగ్య ఉపనిషత్ పఠనం',
      'సోమయాగ ఘోషణ & స్తోత్రాలు'
    ],
    ageGroup: '7 – 14 Years',
    ageGroupTe: '7 – 14 సంవత్సరాలు',
    duration: '6 – 7 Years',
    durationTe: '6 – 7 సంవత్సరాలు',
    image: '/images/vedic/samaveda.webp',
    fallbackImage: '/images/cards/event-05-sudarshana.jpg',
    deity: 'Lord Sri Krishna & Goddess Saraswati',
    deityTe: 'శ్రీకృష్ణుడు & సరస్వతీ దేవి',
    keySignificance: 'Sacred musical traditions, spiritual elevation, and divine sonic resonance that soothes the mind.',
    keySignificanceTe: 'పవిత్ర సామగాన పరంపర, ఆధ్యాత్మిక ఉన్నతి మరియు మనస్సును శాంతింపజేసే దివ్య నాదం.'
  },
  {
    id: 'atharvaveda',
    name: 'Atharvaveda',
    teluguName: 'అథర్వవేదం',
    subtitle: 'The Veda of Life Sciences, Healing & Daily Wisdom',
    subtitleTe: 'జీవన విజ్ఞానం, ఆరోగ్యం & నిత్య జ్ఞాన వేదం',
    desc: 'The fourth Veda compiled by Sage Atharvan and Sage Angiras. Imparts ancient teachings on Ayurveda, healing, family protection, environmental harmony, statecraft, and profound philosophical hymns.',
    descTe:
      'అథర్వన్ మరియు అంగిరస మహర్షులు సంకలనం చేసిన నాల్గవ వేదం. ఆయుర్వేదం, రక్షణ, కుటుంబ శాంతి, పర్యావరణ సామరస్యం మరియు తత్త్వ సూక్తాలను బోధిస్తుంది.',
    coreSubjects: [
      'Shaunaka Shakha Samhita Parayanam',
      'Ayurvedic Herbal Lore & Bhaishajya',
      'Shanti & Raksha Mantras',
      'Prashna & Mandukya Upanishad'
    ],
    coreSubjectsTe: [
      'శౌనక శాఖ సంహిత పారాయణం',
      'ఆయుర్వేద మూలికా & భైషజ్య జ్ఞానం',
      'శాంతి & రక్షా మంత్రాలు',
      'ప్రశ్న & మాండూక్య ఉపనిషత్'
    ],
    ageGroup: '8 – 16 Years',
    ageGroupTe: '8 – 16 సంవత్సరాలు',
    duration: '5 – 7 Years',
    durationTe: '5 – 7 సంవత్సరాలు',
    image: '/images/vedic/atharvaveda.webp',
    fallbackImage: '/images/cards/remedy-1-health.jpg',
    deity: 'Sage Atharvan & Lord Dhanvantari',
    deityTe: 'అథర్వన్ మహర్షి & ధన్వంతరి భగవాన్',
    keySignificance: 'Traditional medicine, environmental wisdom, home protection, and holistic spiritual wellness.',
    keySignificanceTe: 'సాంప్రదాయ వైద్యం, పర్యావరణ జ్ఞానం, గృహ రక్షణ మరియు సమగ్ర ఆధ్యాత్మిక ఆరోగ్యం.'
  }
];

export const GURUKUL_PILLARS = [
  {
    id: 1,
    title: 'Guru-Shishya Parampara',
    teluguTitle: 'గురు-శిష్య పరంపర',
    desc: 'Learning directly under consecrated Vedic Acharyas in an intimate, disciplined residential Gurukul setting with pure devotion and mutual respect.',
    descTe:
      'పవిత్ర వేద ఆచార్యుల వద్ద నివాస గురుకుల వాతావరణంలో భక్తి–క్రమశిక్షణతో నేరుగా అధ్యయనం.',
    icon: '🕉️'
  },
  {
    id: 2,
    title: 'Authentic Swara Pronunciation',
    teluguTitle: 'స్వర శుద్ధ వేదాధ్యయనం',
    desc: 'Rigorous oral transmission focusing on Udatta, Anudatta, and Svarita accents, ensuring exact phonetics and divine vibrational potency.',
    descTe:
      'ఉదాత్త, అనుదాత్త, స్వరిత స్వరాలపై దృష్టి సారించి శ్రుతి పరంపర ద్వారా ఖచ్చిత స్వరోచ్ఛారణ.',
    icon: '📜'
  },
  {
    id: 3,
    title: 'Daily Sandhya & Agnihotram',
    teluguTitle: 'నిత్య సంధ్యావందనం & యజ్ఞం',
    desc: 'Daily practice of Trikala Sandhyavandanam, Gayatri Japa, and sacred homa rituals to cultivate spiritual purity and sharp intellect.',
    descTe:
      'త్రికాల సంధ్యావందనం, గాయత్రీ జపం మరియు హోమాలతో ఆధ్యాత్మిక శుద్ధి మరియు తీక్ష్ణ బుద్ధి సాధన.',
    icon: '🔥'
  },
  {
    id: 4,
    title: 'Comprehensive Sanatana Values',
    teluguTitle: 'సనాతన ధర్మ సంస్కారం',
    desc: 'Holistic upbringing combining Vedic knowledge with Sanskrit grammar, Yoga, discipline, cleanliness, and reverence for mother cow.',
    descTe:
      'వేద జ్ఞానంతో పాటు సంస్కృతం, యోగం, క్రమశిక్షణ, శుచిత్వం మరియు గోమాత భక్తితో సమగ్ర సంస్కారం.',
    icon: '🪔'
  },
  {
    id: 5,
    title: 'Preserving Ancient Heritage',
    teluguTitle: 'వేద పరిరక్షణ & ధార్మిక సేవ',
    desc: "Empowering future generations of learned Purohits and Vedic scholars to safeguard Bharat's eternal wisdom and spiritual traditions.",
    descTe:
      'భారత శాశ్వత జ్ఞానం మరియు ధార్మిక పరంపరను కాపాడే పండితులు, పురోహితుల తరాలను తీర్చిదిద్దడం.',
    icon: '🏛️'
  }
];

export const DAILY_ROUTINE = [
  {
    time: '04:30 AM – 05:30 AM',
    title: 'Brahmamuhurta Awakening',
    titleTe: 'బ్రహ్మముహూర్త జాగరణ',
    desc: 'Pratahsmaranam, Snanam, and Tirtha Prokshana',
    descTe: 'ప్రాతఃస్మరణం, స్నానం మరియు తీర్థ ప్రోక్షణ'
  },
  {
    time: '05:30 AM – 07:00 AM',
    title: 'Pratah Sandhyavandanam & Gayatri Japa',
    titleTe: 'ప్రాతః సంధ్యావందనం & గాయత్రీ జపం',
    desc: 'Sun salutations and Vedic morning invocations',
    descTe: 'సూర్యారాధన మరియు వైదిక ప్రాతః మంత్రాలు'
  },
  {
    time: '07:00 AM – 08:30 AM',
    title: 'First Veda Adhyayana Session',
    titleTe: 'మొదటి వేదాధ్యయన సమయం',
    desc: 'Oral recitation and Swara practice with the Guru',
    descTe: 'గురువుతో శ్రుతి పఠనం మరియు స్వర అభ్యాసం'
  },
  {
    time: '08:30 AM – 09:30 AM',
    title: 'Satvik Ahara (Breakfast)',
    titleTe: 'సాత్విక ఆహారం (అల్పాహారం)',
    desc: 'Pure temple-consecrated nutritional morning meal',
    descTe: 'దేవాలయ ప్రసాదంతో పవిత్ర ఉదయ భోజనం'
  },
  {
    time: '09:30 AM – 12:30 PM',
    title: 'Intensive Veda & Bhashya Study',
    titleTe: 'గాఢ వేద & భాష్య అధ్యయనం',
    desc: 'Samhita patha, grammar, and scriptural comprehension',
    descTe: 'సంహిత పాఠం, వ్యాకరణం మరియు శాస్త్రార్థ గ్రహణం'
  },
  {
    time: '12:30 PM – 02:30 PM',
    title: 'Madhyahna Sandhya & Satvik Lunch',
    titleTe: 'మధ్యాహ్న సంధ్య & సాత్విక భోజనం',
    desc: 'Midday rites, nutritious prasadam, and rest',
    descTe: 'మధ్యాహ్న కర్మలు, ప్రసాదం మరియు విశ్రాంతి'
  },
  {
    time: '02:30 PM – 05:00 PM',
    title: 'Sanskrit Grammar & Stotra Parayanam',
    titleTe: 'సంస్కృత వ్యాకరణం & స్తోత్ర పారాయణం',
    desc: 'Ashtadhyayi basics, Upanishad chanting, and writing',
    descTe: 'అష్టాధ్యాయి మూలాలు, ఉపనిషత్ ఘోషణ మరియు లేఖనం'
  },
  {
    time: '05:00 PM – 06:30 PM',
    title: 'Go Seva & Physical Exercise',
    titleTe: 'గోసేవ & శారీరక వ్యాయామం',
    desc: 'Gau Seva at temple goshala, yoga, and meditation',
    descTe: 'గోశాలలో గోసేవ, యోగం మరియు ధ్యానం'
  },
  {
    time: '06:30 PM – 08:00 PM',
    title: 'Sayam Sandhyavandanam & Arati',
    titleTe: 'సాయం సంధ్యావందనం & హారతి',
    desc: 'Evening temple prayer, deeparadhana, and satsang',
    descTe: 'సాయంకాల దేవాలయ ప్రార్థన, దీపారాధన మరియు సత్సంగం'
  },
  {
    time: '08:00 PM – 09:30 PM',
    title: 'Dinner, Revision & Ratri Suktam',
    titleTe: 'రాత్రి భోజనం, పునశ్చరణ & రాత్రి సూక్తం',
    desc: 'Light meal, silent chant revision, and restful sleep',
    descTe: 'లఘు భోజనం, మౌన పఠన పునశ్చరణ మరియు నిద్ర'
  }
];

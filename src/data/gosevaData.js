export const GOSEVA_NAV_SECTIONS = [
  { id: 'goseva-about', labelEn: 'About Gouseva', labelTe: 'గోసేవ గురించి' },
  { id: 'goseva-monthly-pooja', labelEn: 'Monthly Go Pooja', labelTe: 'మాసిక గోపూజ' },
  { id: 'goseva-products', labelEn: 'Go Products', labelTe: 'గో ఉత్పత్తులు' },
  { id: 'goseva-activities', labelEn: 'Activities', labelTe: 'సేవా కార్యక్రమాలు' },
  { id: 'goseva-donate', labelEn: 'Donate', labelTe: 'విరాళాలు' },
  { id: 'goseva-gallery', labelEn: 'Gallery', labelTe: 'చిత్రమాలిక' },
  { id: 'goseva-contact', labelEn: 'Contact', labelTe: 'సంప్రదించండి' }
];

export const GOSEVA_HIGHLIGHTS = [
  {
    id: 'cow-protection',
    icon: '🛡',
    titleEn: 'Cow Protection',
    titleTe: 'గో సంరక్షణ',
    descEn: 'Safe shelter and compassionate care for rescued and indigenous cows.',
    descTe: 'దేశవాళీ మరియు సంరక్షించబడిన గోవులకు సురక్షిత ఆశ్రయం మరియు సేవ.'
  },
  {
    id: 'feeding-healthcare',
    icon: '🌾',
    titleEn: 'Feeding & Healthcare',
    titleTe: 'ఆహారం & వైద్య సేవ',
    descEn: 'Daily green fodder, clean drinking water, and regular veterinary checkups.',
    descTe: 'ప్రతిరోజూ పచ్చిగడ్డి, స్వచ్ఛమైన నీరు మరియు పశువైద్య సంరక్షణ.'
  },
  {
    id: 'spiritual-service',
    icon: '🪔',
    titleEn: 'Spiritual Service',
    titleTe: 'ఆధ్యాత్మిక సేవ',
    descEn: 'Traditional daily worship and monthly Go Pooja preserving Sanatana Dharma.',
    descTe: 'సనాతన ధర్మాన్ని కాపాడే నిత్య గోపూజ మరియు మాసిక గోపూజ సేవలు.'
  }
];

export const DONATION_AMOUNTS = [
  { id: '101', value: 101, label: '₹101', noteEn: 'Daily Grass Seva', noteTe: 'రోజువారీ పచ్చిగడ్డి సేవ' },
  { id: '501', value: 501, label: '₹501', noteEn: 'Nutritious Fodder Seva', noteTe: 'పోషకాహార దాణా సేవ' },
  { id: '1001', value: 1001, label: '₹1,001', noteEn: 'Cow Care & Medical Seva', noteTe: 'గోసంరక్షణ & వైద్య సేవ' },
  { id: 'custom', value: 'custom', label: 'Custom Amount', noteEn: 'Any Seva Contribution', noteTe: 'మీ ఇష్టమైన విరాళం' }
];

export const MONTHLY_GO_POOJA = {
  headingEn: 'Monthly Go Pooja',
  headingTe: 'మాసిక గోపూజ',
  descriptionEn:
    'Participate in the sacred worship of Gomatha every month. Be a part of this spiritual service and support our Gouseva mission.',
  descriptionTe:
    'ప్రతి నెల గోమాత యొక్క పవిత్ర పూజలో పాల్గొనండి. ఈ ఆధ్యాత్మిక సేవలో భాగస్వాములై మా గోసేవ కార్యక్రమానికి సహకరించండి.',
  amountDisplay: '₹501 / Month',
  amountValue: 501,
  image: '/images/goseva/monthly-go-pooja.jpg',
  poojaInfoEn: [
    'Traditional Go Pooja offered on sacred monthly auspicious days (Pournami / Ekadashi) with haldi, kumkum, flower garlands, and aarti.',
    'Devotee name and optional Gotra are included in the monthly Sankalpam.',
    'Monthly contribution is ₹501 per month. Automatic recurring auto-debit is NOT enabled—each month is confirmed manually by the devotee.'
  ],
  poojaInfoTe: [
    'ప్రతి నెల పవిత్ర దినాలలో (పౌర్ణమి / ఏకాదశి) పసుపు, కుంకుమ, పూలమాల మరియు హారతితో సంప్రదాయ గోపూజ నిర్వహించబడుతుంది.',
    'భక్తుల పేరు మరియు గోత్రంతో మాసిక సంకల్పం చెప్పబడుతుంది.',
    'మాసిక విరాళం నెలకు ₹501. ఆటోమేటిక్ రికరింగ్ పేమెంట్ (ఆటో-డెబిట్) అమలులో లేదు — ప్రతి నెలా భక్తుల అంగీకారంతోనే నమోదు చేయబడుతుంది.'
  ]
};

export const GO_PRODUCTS = [
  {
    id: 'pure-cow-ghee',
    nameEn: 'Pure Desi Cow Ghee (A2 Bilona)',
    nameTe: 'స్వచ్ఛమైన దేశవాళీ ఆవు నెయ్యి (బిలోనా)',
    shortDescEn: 'Traditional and natural A2 cow ghee prepared by hand-churning.',
    shortDescTe: 'సంప్రదాయ బిలోనా పద్ధతిలో చిలికిన స్వచ్ఛమైన ఆవు నెయ్యి.',
    detailDescEn:
      'Prepared through traditional Bilona method from indigenous desi cow milk. Suitable for daily homam, deeparadhana lamps, and healthy household culinary use.',
    detailDescTe:
      'దేశవాళీ గోవుల పాలతో సంప్రదాయ పద్ధతిలో తయారు చేసిన నెయ్యి. నిత్య దీపారాధన, హోమాలు మరియు ఆరోగ్యకరమైన ఆహారానికి అత్యంత శ్రేష్ఠమైనది.',
    price: 650,
    priceDisplay: '₹650',
    pricePlaceholder: '₹650',
    unit: '500 ml Jar',
    unitPlaceholder: 'Per 500 ml Jar',
    category: 'Sacred Dairy',
    image: '/images/goseva/product-cow-ghee.jpg',
    featured: true
  },
  {
    id: 'go-dhoop-diyas',
    nameEn: 'Go Dhoop Cones & Panchagavya Diyas',
    nameTe: 'గో ధూపం & పంచగవ్య దీపాలు',
    shortDescEn: 'Natural cow-dung-based pooja products and aromatic dhoop.',
    shortDescTe: 'ఆవు పేడతో తయారు చేసిన సంప్రదాయ పూజా ద్రవ్యాలు మరియు ధూపం.',
    detailDescEn:
      'Handcrafted incense cones and earthen-style diyas blended with pure cow dung, camphor, and natural resins for serene daily temple and home pooja.',
    detailDescTe:
      'స్వచ్ఛమైన ఆవు పేడ, కర్పూరం మరియు సహజ ద్రవ్యాలతో చేతితో తయారు చేసిన ధూప్ కోన్లు మరియు దీపాలు, నిత్య పూజలకు శుభప్రదమైనవి.',
    price: 150,
    priceDisplay: '₹150',
    pricePlaceholder: '₹150',
    unit: 'Box of 30 Cones + 6 Diyas',
    unitPlaceholder: 'Pooja Pack',
    category: 'Pooja Samagri',
    image: '/images/goseva/product-dhoop-diyas.jpg',
    featured: false
  },
  {
    id: 'organic-go-khad',
    nameEn: 'Organic Go Khad (Natural Compost)',
    nameTe: 'సేంద్రీయ గో ఖాద్ (సహజ ఎరువు)',
    shortDescEn: 'Nutrient-rich, aged cow-dung organic manure for plants & farming.',
    shortDescTe: 'మొక్కలు మరియు వ్యవసాయానికి పోషకాలతో కూడిన సహజ సేంద్రీయ ఎరువు.',
    detailDescEn:
      'Well-composted indigenous cow-dung manure crafted at the goshala to naturally enrich soil texture, microbial activity, and plant vitality.',
    detailDescTe:
      'గోశాలలో సహజంగా తయారు చేయబడిన ఆవు పేడ కంపోస్ట్ ఎరువు. ఇంటి తోటలు, తులసి మొక్కలు మరియు పంటలకు అత్యుత్తమమైనది.',
    price: 220,
    priceDisplay: '₹220',
    pricePlaceholder: '₹220',
    unit: '5 kg Eco Bag',
    unitPlaceholder: 'Per 5 kg Bag',
    category: 'Natural Manure',
    image: '/images/goseva/product-go-khad.jpg',
    featured: false
  },
  {
    id: 'panchagavya-products',
    nameEn: 'Traditional Panchagavya & Ark',
    nameTe: 'సంప్రదాయ పంచగవ్య & గో అర్కం',
    shortDescEn: 'Sacred five-fold cow preparations for rituals and natural wellness.',
    shortDescTe: 'ధార్మిక విధులు మరియు సహజ ఆరోగ్యానికి పవిత్ర పంచగవ్య తయారీ.',
    detailDescEn:
      'Authentic traditional Panchagavya preparations crafted respectfully following classical goshala vidhana for sacred household rituals, shuddhi, and agricultural care.',
    detailDescTe:
      'గోశాల సంప్రదాయ పద్ధతుల ప్రకారం శుద్ధంగా తయారు చేసిన పంచగవ్య ఉత్పత్తులు — గృహ శుద్ధి, ధార్మిక విధులు మరియు వ్యవసాయ అవసరాలకు.',
    price: 350,
    priceDisplay: '₹350',
    pricePlaceholder: '₹350',
    unit: '500 ml Bottle',
    unitPlaceholder: '500 ml Bottle',
    category: 'Traditional Go-Based',
    image: '/images/goseva/product-panchagavya.jpg',
    featured: false
  },
  {
    id: 'cow-dung-cakes',
    nameEn: 'Sacred Gomaya Pidakalu (Cow Dung Cakes)',
    nameTe: 'పవిత్ర గోమయ పిడకలు',
    shortDescEn: 'Sun-dried pure desi cow dung cakes for Agnihotra, Homams & Havanalu.',
    shortDescTe: 'అగ్నిహోత్రం, హోమాలు & యజ్ఞాలకు ఎండబెట్టిన పవిత్ర గోమయ పిడకలు.',
    detailDescEn:
      'Carefully sun-dried, clean indigenous cow dung cakes traditionally prepared for Homam, Agnihotra, Yajna, Havanalu, and housewarming ceremonies.',
    detailDescTe:
      'హోమాలు, అగ్నిహోత్రం, యజ్ఞాలు మరియు గృహప్రవేశ శుభకార్యాలలో ఉపయోగించే శుభ్రమైన, ఎండబెట్టిన సంప్రదాయ గోమయ పిడకలు.',
    price: 180,
    priceDisplay: '₹180',
    pricePlaceholder: '₹180',
    unit: 'Pack of 24 Cakes',
    unitPlaceholder: 'Pack of 24 Cakes',
    category: 'Ritual Essentials',
    image: '/images/goseva/product-cow-dung-cakes.jpg',
    featured: false
  }
];

export const GOSEVA_ACTIVITIES = [
  {
    id: 'cow-feeding',
    titleEn: 'Cow Feeding',
    titleTe: 'గో ఆహార సేవ',
    descEn:
      'Fresh green fodder, dry hay, mineral nutrition, and clean drinking water served daily to every resident cow.',
    descTe: 'ప్రతిరోజూ గోవులకు తాజా పచ్చిగడ్డి, దాణా మరియు స్వచ్ఛమైన తాగునీరు అందించడం.',
    image: '/images/goseva/activity-feeding.jpg'
  },
  {
    id: 'cow-shelter',
    titleEn: 'Cow Shelter',
    titleTe: 'గో ఆశ్రయం & వసతి',
    descEn:
      'Spacious, ventilated, weather-protected sheds offering peaceful rest and safety in all seasons.',
    descTe: 'అన్ని కాలాలలో గోవులకు సురక్షితమైన, గాలి వెలుతురు గల ప్రశాంతమైన గోశాల ఆశ్రయం.',
    image: '/images/goseva/activity-shelter.jpg'
  },
  {
    id: 'medical-care',
    titleEn: 'Medical Care',
    titleTe: 'పశువైద్య సంరక్షణ',
    descEn:
      'Regular veterinary checkups, timely treatment, and dedicated care for injured or aged cows.',
    descTe: 'క్రమమైన వైద్య పరీక్షలు, సమయానుకూల చికిత్స మరియు వృద్ధ గోవుల ప్రత్యేక సంరక్షణ.',
    image: '/images/goseva/activity-medical.jpg'
  },
  {
    id: 'cleanliness-maintenance',
    titleEn: 'Cleanliness & Maintenance',
    titleTe: 'పరిశుభ్రత & నిర్వహణ',
    descEn:
      'Daily sanitization of sheds, fresh bedding, clean water troughs, and eco-friendly waste composting.',
    descTe: 'గోశాల నిత్య శుభ్రత, స్వచ్ఛమైన నీటి తొట్టెలు మరియు పర్యావరణహిత నిర్వహణ.',
    image: '/images/goseva/activity-cleanliness.jpg'
  }
];

export const GOSEVA_GALLERY = [
  {
    id: 'gal-feeding',
    category: 'Feeding',
    titleEn: 'Cow Feeding Activities',
    titleTe: 'గోవులకు ఆహార సేవ',
    captionEn: 'Daily green fodder and nutritious feed offered with love at the goshala.',
    captionTe: 'గోశాలలో ప్రతిరోజూ గోమాతలకు పచ్చిగడ్డి మరియు పోషకాహార సమర్పణ.',
    image: '/images/goseva/activity-feeding.jpg'
  },
  {
    id: 'gal-pooja',
    category: 'Pooja',
    titleEn: 'Monthly Go Pooja',
    titleTe: 'మాసిక గోపూజ',
    captionEn: 'Devotees offering garlands, kumkum, and camphor aarti during Monthly Go Pooja.',
    captionTe: 'మాసిక గోపూజలో పూలమాల, కుంకుమ మరియు కర్పూర హారతి సేవ.',
    image: '/images/goseva/monthly-go-pooja.jpg'
  },
  {
    id: 'gal-healthcare',
    category: 'Healthcare',
    titleEn: 'Cow Healthcare',
    titleTe: 'గోవుల వైద్య సంరక్షణ',
    captionEn: 'Preventive checkups and attentive medical support for indigenous cows.',
    captionTe: 'గోవుల ఆరోగ్యానికి క్రమమైన పశువైద్య పరీక్షలు మరియు సంరక్షణ.',
    image: '/images/goseva/activity-medical.jpg'
  },
  {
    id: 'gal-volunteers',
    category: 'Volunteers & Events',
    titleEn: 'Volunteers Participating in Go Seva',
    titleTe: 'గోసేవలో స్వచ్ఛంద సేవకులు',
    captionEn: 'Community volunteers joining hands for feeding, cleaning, and goshala upkeep.',
    captionTe: 'గోశాల శుభ్రత మరియు ఆహార సేవలో పాల్గొంటున్న సేవకులు.',
    image: '/images/goseva/gallery-volunteers.jpg'
  },
  {
    id: 'gal-events',
    category: 'Volunteers & Events',
    titleEn: 'Go Seva Events',
    titleTe: 'గోసేవ ప్రత్యేక కార్యక్రమాలు',
    captionEn: 'Devotional community gatherings celebrating Gomatha worship and cow protection.',
    captionTe: 'గోమాత పూజ మరియు గోసంరక్షణ ఉత్సవాలలో పాల్గొంటున్న భక్తులు.',
    image: '/images/goseva/gallery-events.jpg'
  }
];

// Editable organisation contact & footer placeholders (Srivari Dasudu)
export const GOSEVA_CONTACT_INFO = {
  organisationName: 'Srivari Dasudu',
  organisationSubEn: 'Gouseva & Gomatha Samrakshana',
  organisationSubTe: 'గోసేవ & గోమాత సంరక్షణ',
  phonePlaceholder: '+91 98765 43210',
  emailPlaceholder: 'seva@srivaridasudu.org',
  addressPlaceholder: 'Sri Vari Dasudu Adyatmika Kuteer',
  whatsappNumber: '919876543210',
  footerTaglineEn: 'Together, Let Us Serve and Protect Gomatha.',
  footerTaglineTe: 'కలిసి గోమాతను సేవించి సంరక్షిద్దాం.',
  paymentGatewayPlaceholderEn: 'Razorpay / Cashfree / Bank Gateway Integration Ready (Placeholder Mode)',
  paymentGatewayPlaceholderTe: 'ఆన్‌లైన్ పేమెంట్ గేట్‌వే ఇంటిగ్రేషన్ కోసం సిద్ధం (ప్లేస్‌హోల్డర్)',
  upiIdPlaceholder: 'srivaridasudu.gouseva@upi (Placeholder)',
  socialLinks: [
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/919876543210' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' }
  ]
};


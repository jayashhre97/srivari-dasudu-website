export const GOSEVA_NAV_SECTIONS = [
  { id: 'goseva-about', labelEn: 'About Go Seva', labelTe: 'గోసేవ గురించి' },
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
    'Participate in the sacred worship of Gomatha every month. Be a part of this spiritual service and support our Go Seva mission.',
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
    nameEn: 'Pure Cow Ghee',
    nameTe: 'స్వచ్ఛమైన ఆవు నెయ్యి',
    shortDescEn: 'Traditional and natural cow ghee.',
    shortDescTe: 'సంప్రదాయ మరియు సహజమైన ఆవు నెయ్యి.',
    detailDescEn:
      'Prepared through traditional methods from indigenous cow milk. Suitable for daily homam, deeparadhana lamps, and traditional household culinary use.',
    detailDescTe:
      'దేశవాళీ గోవుల పాలతో సంప్రదాయ పద్ధతిలో తయారు చేసిన నెయ్యి. నిత్య దీపారాధన, హోమాలు మరియు ఇంటి అవసరాలకు అనువైనది.',
    pricePlaceholder: '₹ [Price Placeholder]',
    unitPlaceholder: 'Per 500 ml / 1 L Jar (Editable Price)',
    category: 'Sacred Dairy',
    image: '/images/goseva/product-cow-ghee.jpg',
    featured: true
  },
  {
    id: 'go-dhoop-diyas',
    nameEn: 'Go Dhoop & Diyas',
    nameTe: 'గో ధూపం & దీపాలు',
    shortDescEn: 'Traditional cow-dung-based pooja products.',
    shortDescTe: 'ఆవు పేడతో తయారు చేసిన సంప్రదాయ పూజా ద్రవ్యాలు.',
    detailDescEn:
      'Handcrafted incense cones and earthen-style diyas blended with pure cow dung and natural resins for serene daily temple and home pooja.',
    detailDescTe:
      'స్వచ్ఛమైన ఆవు పేడ మరియు సహజ ద్రవ్యాలతో చేతితో తయారు చేసిన ధూప్ కోన్లు మరియు దీపాలు, నిత్య పూజలకు శుభప్రదమైనవి.',
    pricePlaceholder: '₹ [Price Placeholder]',
    unitPlaceholder: 'Pooja Pack (Editable Price)',
    category: 'Pooja Samagri',
    image: '/images/goseva/product-dhoop-diyas.jpg',
    featured: false
  },
  {
    id: 'organic-go-khad',
    nameEn: 'Organic Go Khad',
    nameTe: 'సేంద్రీయ గో ఖాద్ (ఎరువు)',
    shortDescEn: 'Natural cow-dung-based organic manure.',
    shortDescTe: 'ఆవు పేడతో తయారు చేసిన సహజ సేంద్రీయ ఎరువు.',
    detailDescEn:
      'Well-composted cow-dung manure crafted at the goshala to naturally enrich soil texture for home gardens, tulsi plants, and farming.',
    detailDescTe:
      'గోశాలలో తయారు చేయబడిన సహజ ఆవు పేడ కంపోస్ట్ ఎరువు. ఇంటి తోటలు, తులసి మొక్కలు మరియు వ్యవసాయానికి ఉపయోగకరమైనది.',
    pricePlaceholder: '₹ [Price Placeholder]',
    unitPlaceholder: 'Per 5 kg / 10 kg Bag (Editable Price)',
    category: 'Natural Manure',
    image: '/images/goseva/product-go-khad.jpg',
    featured: false
  },
  {
    id: 'panchagavya-products',
    nameEn: 'Panchagavya Products',
    nameTe: 'పంచగవ్య ఉత్పత్తులు',
    shortDescEn: 'Traditional Go-based products.',
    shortDescTe: 'సంప్రదాయ గో-ఆధారిత ఉత్పత్తులు.',
    detailDescEn:
      'Authentic traditional Panchagavya preparations crafted respectfully following classical goshala practices for sacred household rituals and agricultural care.',
    detailDescTe:
      'గోశాల సంప్రదాయ పద్ధతుల ప్రకారం శుద్ధంగా తయారు చేసిన పంచగవ్య ఉత్పత్తులు — ధార్మిక విధులు మరియు వ్యవసాయ అవసరాలకు.',
    pricePlaceholder: '₹ [Price Placeholder]',
    unitPlaceholder: 'Standard Pack (Editable Price)',
    category: 'Traditional Go-Based',
    image: '/images/goseva/product-panchagavya.jpg',
    featured: false
  },
  {
    id: 'cow-dung-cakes',
    nameEn: 'Cow Dung Cakes',
    nameTe: 'గోమయ పిడకలు',
    shortDescEn: 'Traditional products for religious rituals.',
    shortDescTe: 'ధార్మిక హోమాలు & యజ్ఞాలకు సంప్రదాయ పిడకలు.',
    detailDescEn:
      'Carefully sun-dried, clean cow dung cakes traditionally used for Homam, Agnihotra, Yajna, and housewarming rituals.',
    detailDescTe:
      'హోమాలు, అగ్నిహోత్రం, యజ్ఞాలు మరియు గృహప్రవేశ శుభకార్యాలలో ఉపయోగించే శుభ్రమైన ఎండబెట్టిన ఆవు పేడ పిడకలు.',
    pricePlaceholder: '₹ [Price Placeholder]',
    unitPlaceholder: 'Pack of 12 / 24 Cakes (Editable Price)',
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
  organisationSubEn: 'Go Seva & Gomatha Samrakshana',
  organisationSubTe: 'గోసేవ & గోమాత సంరక్షణ',
  phonePlaceholder: '+91 98765 43210',
  emailPlaceholder: 'seva@srivaridasudu.org',
  addressPlaceholder: 'Sri Vari Dasudu Adyamika Kuteer',
  whatsappNumber: '919876543210',
  footerTagline: 'Together, Let Us Serve and Protect Gomatha.',
  paymentGatewayPlaceholderEn: 'Razorpay / Cashfree / Bank Gateway Integration Ready (Placeholder Mode)',
  paymentGatewayPlaceholderTe: 'ఆన్‌లైన్ పేమెంట్ గేట్‌వే ఇంటిగ్రేషన్ కోసం సిద్ధం (ప్లేస్‌హోల్డర్)',
  upiIdPlaceholder: 'srivaridasudu.goseva@upi (Placeholder)',
  socialLinks: [
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/919876543210' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' }
  ]
};


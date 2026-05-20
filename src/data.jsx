// Mobile accessories catalogue + i18n.
// Wholesale = sold by case/pack with tiered volume pricing.

const CATEGORIES = [
  { id: 'chargers',     en: 'Chargers',           ar: 'شواحن',          tint: '#FBE8D1', ink: '#A04B07', icon: 'charger' },
  { id: 'cables',       en: 'Cables',             ar: 'كابلات',         tint: '#E8E4FB', ink: '#3D1BA1', icon: 'cable' },
  { id: 'powerbanks',   en: 'Power Banks',        ar: 'بنوك طاقة',      tint: '#FFE2BB', ink: '#A04B07', icon: 'powerbank' },
  { id: 'audio',        en: 'Audio',              ar: 'سماعات',         tint: '#E0D7FB', ink: '#3D1BA1', icon: 'headphone' },
  { id: 'cases',        en: 'Cases & Covers',     ar: 'حافظات',         tint: '#F4E8D3', ink: '#7C3D08', icon: 'case' },
  { id: 'screen',       en: 'Screen Protectors',  ar: 'حماية شاشة',     tint: '#FFD9D9', ink: '#9A1F1F', icon: 'screen' },
  { id: 'car',          en: 'Car Accessories',    ar: 'ملحقات السيارة', tint: '#D6E8F4', ink: '#0A4F8A', icon: 'car' },
  { id: 'smart',        en: 'Smart Devices',      ar: 'أجهزة ذكية',     tint: '#D9F1E5', ink: '#0E6B3D', icon: 'watch' },
];

const BRANDS = [
  { id: 'xo',    name: 'XO',         tag: { en: 'Simple is beauty', ar: 'البساطة جمال' }, logo: 'assets/brands/xo.jpg', bg: 'linear-gradient(135deg, #6c1414 0%, #b71c1c 100%)', fg: '#fff', accent: '#fff', count: 38 },
  { id: 'ldnio', name: 'LDNIO',      tag: { en: 'Power that lasts', ar: 'طاقة تدوم' }, logo: 'assets/brands/ldnio.png', bg: 'linear-gradient(135deg, #fff 0%, #ffefdc 100%)', fg: '#1a1a1a', accent: '#ff6a00', count: 42 },
  { id: 'baseus',name: 'Baseus',     tag: { en: 'Engineered every day', ar: 'هندسة لكل يوم' }, logo: null, mark: 'B', bg: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', fg: '#fff', accent: '#44c6e2', count: 56 },
  { id: 'anker', name: 'Anker',      tag: { en: 'Power for the on-the-go', ar: 'طاقة لمن هو في الطريق' }, logo: null, mark: 'A', bg: 'linear-gradient(135deg, #0f1622 0%, #1a2640 100%)', fg: '#fff', accent: '#00b3ff', count: 31 },
];

const PRODUCTS = [
  // Chargers
  { id: 'p01', cat: 'chargers',   brand: 'JQ',    en: 'Fast Wall Charger 20W',         ar: 'شاحن جدار سريع ٢٠ واط',         pack: '20 × unit',   moq: 1, price: 280.00, tiers: [[5,266.00],[20,245.00]], stock: 'high', tag: 'best', sw1: '#2c1184', sw2: '#8b6cdf' },
  { id: 'p02', cat: 'chargers',   brand: 'XO',    en: 'Dual USB-C Charger 35W',        ar: 'شاحن مزدوج USB-C ٣٥ واط',       pack: '12 × unit',   moq: 1, price: 510.00, tiers: [[3,485.00],[12,455.00]], stock: 'high', tag: 'new',  sw1: '#7c1414', sw2: '#d04040' },
  { id: 'p03', cat: 'chargers',   brand: 'LDNIO', en: 'GaN Multi-Port Charger 65W',    ar: 'شاحن متعدد المنافذ ٦٥ واط',     pack: '8 × unit',    moq: 1, price: 860.00, tiers: [[2,820.00],[8,775.00]], stock: 'med',  tag: 'deal', sw1: '#cc5500', sw2: '#ffa040' },
  { id: 'p04', cat: 'chargers',   brand: 'Baseus',en: 'Wireless Charging Pad 15W',     ar: 'شاحن لاسلكي ١٥ واط',            pack: '10 × unit',   moq: 1, price: 470.00, tiers: [[3,448.00],[10,418.00]], stock: 'high', tag: null,   sw1: '#1f2937', sw2: '#4a5568' },

  // Cables
  { id: 'p05', cat: 'cables',     brand: 'JQ',    en: 'USB-C Cable 1m, Braided',       ar: 'كابل USB-C ١ متر مجدول',        pack: '50 × unit',   moq: 1, price: 240.00, tiers: [[5,228.00],[20,210.00]], stock: 'high', tag: 'best', sw1: '#2c1184', sw2: '#a9c0ff' },
  { id: 'p06', cat: 'cables',     brand: 'LDNIO', en: 'Lightning Cable 1.2m',          ar: 'كابل لايتنينغ ١٫٢ متر',         pack: '50 × unit',   moq: 1, price: 220.00, tiers: [[5,210.00],[20,194.00]], stock: 'high', tag: null,   sw1: '#cc5500', sw2: '#ffd9a8' },
  { id: 'p07', cat: 'cables',     brand: 'XO',    en: 'Multi-Tip 3-in-1 Cable',        ar: 'كابل ٣ في ١',                   pack: '40 × unit',   moq: 1, price: 285.00, tiers: [[5,272.00],[20,251.00]], stock: 'med',  tag: 'deal', sw1: '#7c1414', sw2: '#e89090' },
  { id: 'p08', cat: 'cables',     brand: 'Anker', en: 'USB-C to USB-C 2m',             ar: 'USB-C إلى USB-C ٢ متر',         pack: '30 × unit',   moq: 1, price: 340.00, tiers: [[3,325.00],[12,302.00]], stock: 'high', tag: null,   sw1: '#0f1622', sw2: '#5680b4' },

  // Power Banks
  { id: 'p09', cat: 'powerbanks', brand: 'LDNIO', en: 'Power Bank 10000mAh',           ar: 'بنك طاقة ١٠٬٠٠٠ ملي أمبير',     pack: '6 × unit',    moq: 1, price: 720.00, tiers: [[2,690.00],[6,648.00]], stock: 'high', tag: 'best', sw1: '#cc5500', sw2: '#ffa040' },
  { id: 'p10', cat: 'powerbanks', brand: 'JQ',    en: 'Slim Power Bank 5000mAh',       ar: 'بنك طاقة نحيف ٥٠٠٠ ملي',        pack: '10 × unit',   moq: 1, price: 480.00, tiers: [[3,458.00],[12,425.00]], stock: 'med',  tag: 'new',  sw1: '#2c1184', sw2: '#7a5cd6' },
  { id: 'p11', cat: 'powerbanks', brand: 'Baseus',en: 'Power Bank 20000mAh, PD 22.5W', ar: 'بنك طاقة ٢٠٬٠٠٠ ملي أمبير',     pack: '4 × unit',    moq: 1, price: 1280.00,tiers: [[2,1225.00],[4,1150.00]],stock: 'low',  tag: 'deal', sw1: '#1f2937', sw2: '#6b7280' },

  // Audio
  { id: 'p12', cat: 'audio',      brand: 'XO',    en: 'Wireless Earbuds X8',           ar: 'سماعات لاسلكية X8',            pack: '8 × unit',    moq: 1, price: 690.00, tiers: [[2,660.00],[8,615.00]], stock: 'high', tag: 'best', sw1: '#7c1414', sw2: '#f0c0c0' },
  { id: 'p13', cat: 'audio',      brand: 'JQ',    en: 'In-Ear Wired Headphones',       ar: 'سماعة سلكية داخل الأذن',        pack: '24 × unit',   moq: 1, price: 165.00, tiers: [[5,158.00],[20,146.00]], stock: 'high', tag: null,   sw1: '#2c1184', sw2: '#c8b8ff' },
  { id: 'p14', cat: 'audio',      brand: 'Anker', en: 'Bluetooth Speaker Compact',     ar: 'مكبر صوت بلوتوث',              pack: '6 × unit',    moq: 1, price: 825.00, tiers: [[2,790.00],[6,738.00]], stock: 'med',  tag: 'new',  sw1: '#0f1622', sw2: '#4a90e2' },
  { id: 'p15', cat: 'audio',      brand: 'LDNIO', en: 'Over-Ear Headphones',           ar: 'سماعات فوق الأذن',             pack: '6 × unit',    moq: 1, price: 920.00, tiers: [[2,880.00],[6,820.00]], stock: 'low',  tag: 'deal', sw1: '#cc5500', sw2: '#ffd9a8' },

  // Cases & Covers
  { id: 'p16', cat: 'cases',      brand: 'JQ',    en: 'Silicone Case iPhone 15',       ar: 'حافظة سيليكون آيفون ١٥',        pack: '30 × unit',   moq: 1, price: 195.00, tiers: [[5,186.00],[20,172.00]], stock: 'high', tag: null,   sw1: '#2c1184', sw2: '#b9a9e8' },
  { id: 'p17', cat: 'cases',      brand: 'XO',    en: 'Clear Case Galaxy S24',         ar: 'حافظة شفافة جالاكسي S24',       pack: '30 × unit',   moq: 1, price: 175.00, tiers: [[5,166.00],[20,154.00]], stock: 'high', tag: 'best', sw1: '#7c1414', sw2: '#e8c0c0' },

  // Screen Protectors
  { id: 'p18', cat: 'screen',     brand: 'JQ',    en: 'Tempered Glass iPhone',         ar: 'زجاج مقوى آيفون',              pack: '50 × unit',   moq: 1, price: 145.00, tiers: [[10,138.00],[40,128.00]], stock: 'high', tag: 'deal', sw1: '#9a1f1f', sw2: '#ffb8b8' },
  { id: 'p19', cat: 'screen',     brand: 'XO',    en: 'Privacy Screen Protector',      ar: 'حماية شاشة خصوصية',            pack: '40 × unit',   moq: 1, price: 185.00, tiers: [[10,176.00],[40,162.00]], stock: 'med',  tag: 'new',  sw1: '#7c1414', sw2: '#f4d4d4' },

  // Car Accessories
  { id: 'p20', cat: 'car',        brand: 'LDNIO', en: 'Car Charger Dual USB-C 36W',    ar: 'شاحن سيارة USB-C ٣٦ واط',       pack: '15 × unit',   moq: 1, price: 320.00, tiers: [[3,305.00],[12,282.00]], stock: 'high', tag: null,   sw1: '#0a4f8a', sw2: '#7fb3e0' },
  { id: 'p21', cat: 'car',        brand: 'Baseus',en: 'Magnetic Phone Mount',          ar: 'حامل هاتف مغناطيسي',           pack: '12 × unit',   moq: 1, price: 280.00, tiers: [[3,266.00],[12,248.00]], stock: 'high', tag: 'best', sw1: '#1f2937', sw2: '#9ca3af' },
  { id: 'p22', cat: 'car',        brand: 'JQ',    en: 'FM Bluetooth Transmitter',      ar: 'مرسل بلوتوث FM',                pack: '10 × unit',   moq: 1, price: 380.00, tiers: [[3,362.00],[10,338.00]], stock: 'med',  tag: null,   sw1: '#2c1184', sw2: '#9080d4' },

  // Smart Devices
  { id: 'p23', cat: 'smart',      brand: 'XO',    en: 'Smart Watch Sport',             ar: 'ساعة ذكية رياضية',             pack: '5 × unit',    moq: 1, price: 1450.00,tiers: [[2,1390.00],[5,1305.00]],stock: 'med',  tag: 'new',  sw1: '#7c1414', sw2: '#e89090' },
  { id: 'p24', cat: 'smart',      brand: 'Anker', en: 'Smart Tracker Tag (4-pack)',    ar: 'بطاقة تتبع ذكية (٤ قطع)',      pack: '8 × pack',    moq: 1, price: 680.00, tiers: [[2,650.00],[8,610.00]], stock: 'low',  tag: 'deal', sw1: '#0f1622', sw2: '#5680b4' },
];

const ORDERS = [
  {
    id: 'ORD-2026-0418',
    placed: '2026-05-12',
    status: 'in_transit',
    items: [
      { pid: 'p01', qty: 12 },
      { pid: 'p05', qty: 8 },
      { pid: 'p09', qty: 4 },
    ],
    total: 8924.00,
    eta: '2026-05-19',
    notes: 'Deliver to back entrance, ask for Khaled.',
  },
  {
    id: 'ORD-2026-0402',
    placed: '2026-05-08',
    status: 'delivered',
    items: [
      { pid: 'p12', qty: 6 },
      { pid: 'p18', qty: 30 },
      { pid: 'p21', qty: 5 },
    ],
    total: 12380.00,
    eta: '2026-05-10',
  },
  {
    id: 'ORD-2026-0376',
    placed: '2026-05-02',
    status: 'delivered',
    items: [
      { pid: 'p06', qty: 12 },
      { pid: 'p18', qty: 30 },
    ],
    total: 6990.00,
    eta: '2026-05-05',
  },
  {
    id: 'ORD-2026-0341',
    placed: '2026-04-22',
    status: 'cancelled',
    items: [
      { pid: 'p11', qty: 8 },
    ],
    total: 9800.00,
    eta: null,
  },
];

// translation strings
const I18N = {
  en: {
    appName: 'Jeel Qadem',
    appTag: 'Mobile accessories wholesale.',

    // auth
    welcome: 'Welcome back',
    signInSub: 'Sign in to your business account',
    email: 'Business email',
    password: 'Password',
    signIn: 'Sign in',
    forgot: 'Forgot password?',
    noAccount: 'New to Jeel Qadem?',
    register: 'Register your business',

    // nav
    home: 'Home', browse: 'Browse', cart: 'Cart', orders: 'Orders', account: 'Account',

    // home
    helloBiz: 'Hello, Al Madina Electronics',
    creditTerms: 'Credit terms: NET 14',
    searchPh: 'Search accessories, brands, models',
    shopByCat: 'Shop by category',
    seeAll: 'See all',
    featured: 'Trending this week',
    deals: 'Volume deals',
    reorder: 'Quick reorder',
    saveVol: 'Save with volume',
    ourBrands: 'Our brands',
    shopBrand: 'Shop the brand',

    // product
    perCase: 'per case',
    perUnit: 'per unit',
    inStock: 'In stock',
    lowStock: 'Low stock',
    casePack: 'Case pack',
    minOrder: 'Min. order',
    addToBasket: 'Add to basket',
    viewBasket: 'View basket',
    pricing: 'Volume pricing',
    casesAbbr: 'cases',
    save: 'save',
    youSave: 'You save',
    description: 'About this item',
    productSpec: 'Specification',
    deliverIn: 'Delivers in 2–4 days',

    // cart
    yourBasket: 'Your basket',
    empty: 'Your basket is empty',
    emptyHint: 'Browse the catalog to add items.',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery',
    free: 'Free',
    estVAT: 'VAT (est.)',
    total: 'Total',
    placeOrder: 'Place order',
    deliveryTo: 'Deliver to',
    paymentMethod: 'Payment',
    payOnDelivery: 'Pay on delivery (NET 14)',
    items: 'items',
    item: 'item',
    remove: 'Remove',
    note: 'Note for driver',
    notePh: 'Add delivery notes…',

    // confirm
    orderPlaced: 'Order placed',
    orderPlacedSub: 'We’ve received your order and will confirm shortly via WhatsApp.',
    orderRef: 'Order ref',
    estDelivery: 'Estimated delivery',
    backToHome: 'Back to home',
    trackOrder: 'Track this order',

    // orders
    allOrders: 'All orders', filterAll: 'All', filterOpen: 'Open', filterDelivered: 'Delivered',
    placed: 'Placed', delivered: 'Delivered', inTransit: 'In transit', confirmed: 'Confirmed',
    processing: 'Processing', cancelled: 'Cancelled',
    expected: 'Expected', reorderBtn: 'Reorder',
    status_received: 'Order received',
    status_confirmed: 'Confirmed by Jeel Qadem',
    status_packed: 'Packed at warehouse',
    status_intransit: 'Out for delivery',
    status_delivered: 'Delivered',

    // browse
    filters: 'Filters', sortBy: 'Sort', priceAsc: 'Price ↑', priceDesc: 'Price ↓', popular: 'Popular',
    results: 'results',
    allCategories: 'All categories',

    // account
    business: 'Al Madina Electronics',
    businessNo: 'Reg. 4421-LY',
    profileBiz: 'Business profile',
    addresses: 'Delivery addresses',
    creditSettings: 'Credit & payment',
    notifs: 'Notifications',
    help: 'Help & support',
    signOut: 'Sign out',
    creditLimit: 'Credit limit',
    creditUsed: 'Used',
    creditOf: 'of',

    bestSeller: 'Best seller', newTag: 'New', dealTag: 'Deal',
    currency: 'LYD',
    products: 'products',
  },
  ar: {
    appName: 'الجيل القادم',
    appTag: 'جملة ملحقات الهاتف.',

    welcome: 'مرحباً بعودتك',
    signInSub: 'سجّل الدخول إلى حساب نشاطك التجاري',
    email: 'البريد الإلكتروني للنشاط',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    forgot: 'نسيت كلمة المرور؟',
    noAccount: 'جديد على الجيل القادم؟',
    register: 'سجّل نشاطك',

    home: 'الرئيسية', browse: 'تصفّح', cart: 'السلة', orders: 'الطلبات', account: 'الحساب',

    helloBiz: 'أهلاً، المدينة للإلكترونيات',
    creditTerms: 'سداد آجل ١٤ يوم',
    searchPh: 'ابحث عن ملحقات وعلامات وموديلات',
    shopByCat: 'تسوّق حسب الفئة',
    seeAll: 'عرض الكل',
    featured: 'الأكثر طلباً هذا الأسبوع',
    deals: 'عروض الكميات',
    reorder: 'إعادة طلب سريع',
    saveVol: 'وفّر بالكمية',
    ourBrands: 'علاماتنا',
    shopBrand: 'تسوّق العلامة',

    perCase: 'للكرتون',
    perUnit: 'للقطعة',
    inStock: 'متوفّر',
    lowStock: 'كمية محدودة',
    casePack: 'الكرتون',
    minOrder: 'الحد الأدنى',
    addToBasket: 'أضف إلى السلة',
    viewBasket: 'عرض السلة',
    pricing: 'تسعير الكميات',
    casesAbbr: 'كرتون',
    save: 'وفّر',
    youSave: 'وفّرت',
    description: 'تفاصيل المنتج',
    productSpec: 'المواصفات',
    deliverIn: 'التوصيل خلال ٢–٤ أيام',

    yourBasket: 'سلتك',
    empty: 'السلة فارغة',
    emptyHint: 'تصفّح المنتجات لإضافة عناصر.',
    subtotal: 'المجموع الفرعي',
    deliveryFee: 'التوصيل',
    free: 'مجاني',
    estVAT: 'الضريبة (تقديرية)',
    total: 'الإجمالي',
    placeOrder: 'إتمام الطلب',
    deliveryTo: 'التوصيل إلى',
    paymentMethod: 'الدفع',
    payOnDelivery: 'الدفع عند التوصيل (آجل ١٤ يوم)',
    items: 'عناصر',
    item: 'عنصر',
    remove: 'حذف',
    note: 'ملاحظة للسائق',
    notePh: 'أضف ملاحظات التوصيل…',

    orderPlaced: 'تم استلام الطلب',
    orderPlacedSub: 'سنؤكد طلبك قريباً عبر واتساب.',
    orderRef: 'رقم الطلب',
    estDelivery: 'التوصيل المتوقّع',
    backToHome: 'العودة إلى الرئيسية',
    trackOrder: 'تتبّع الطلب',

    allOrders: 'كل الطلبات', filterAll: 'الكل', filterOpen: 'مفتوحة', filterDelivered: 'مُسلَّمة',
    placed: 'بُدأ', delivered: 'تم التوصيل', inTransit: 'قيد التوصيل', confirmed: 'مؤكد',
    processing: 'قيد التحضير', cancelled: 'مُلغى',
    expected: 'متوقع', reorderBtn: 'إعادة طلب',
    status_received: 'تم استلام الطلب',
    status_confirmed: 'مؤكد من الجيل القادم',
    status_packed: 'جُهِّز في المستودع',
    status_intransit: 'خرج للتوصيل',
    status_delivered: 'تم التوصيل',

    filters: 'فلاتر', sortBy: 'ترتيب', priceAsc: 'السعر ↑', priceDesc: 'السعر ↓', popular: 'الأكثر طلباً',
    results: 'نتيجة',
    allCategories: 'كل الفئات',

    business: 'المدينة للإلكترونيات',
    businessNo: 'سجل ٤٤٢١-LY',
    profileBiz: 'ملف النشاط التجاري',
    addresses: 'عناوين التوصيل',
    creditSettings: 'الائتمان والدفع',
    notifs: 'الإشعارات',
    help: 'المساعدة والدعم',
    signOut: 'تسجيل الخروج',
    creditLimit: 'سقف الائتمان',
    creditUsed: 'المستخدم',
    creditOf: 'من',

    bestSeller: 'الأكثر مبيعاً', newTag: 'جديد', dealTag: 'عرض',
    currency: 'د.ل',
    products: 'منتج',
  }
};

// helpers
function tieredPriceFor(product, qty) {
  let price = product.price;
  for (const [minQty, p] of product.tiers) {
    if (qty >= minQty) price = p;
  }
  return price;
}

function nextTier(product, qty) {
  for (const [minQty, p] of product.tiers) {
    if (qty < minQty) return { minQty, p, savePerCase: product.price - p };
  }
  return null;
}

function fmtLYD(v, lang = 'en') {
  const num = Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num;
}

function findProduct(id) { return PRODUCTS.find(p => p.id === id); }

Object.assign(window, { CATEGORIES, BRANDS, PRODUCTS, ORDERS, I18N, tieredPriceFor, nextTier, fmtLYD, findProduct });

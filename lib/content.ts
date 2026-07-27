export const SITE = {
  entity: 'PT Arkano Advance Technology',
  years: '2022 - 2026',
  origin: 'https://bangjamin.com',
  email: 'hello@bangjamin.com',
  phone: '021-30944567',
  phoneAlt: '021-50886100',
  whatsapp: '+62 812-8626-1100',
  whatsappHref: 'https://wa.me/6281286261100',
  playStore: 'https://play.google.com/store/apps/details?id=com.bangjamin.app',
  apkDownload: 'https://storage.googleapis.com/app-release-bangjamin/bangjamin.apk',
  instagram: 'https://www.instagram.com/bangjamin.id',
  facebook: 'https://www.facebook.com/bangjamin.id',
} as const;

export type ProductKey = 'kendaraan' | 'hewan' | 'kesehatan' | 'perjalanan';

export type Product = {
  key: ProductKey;
  status: 'available' | 'comingSoon';
  href: string | null;
  emoji: string;
};

export const PRODUCTS: Product[] = [
  { key: 'kendaraan', status: 'available', href: '/purchase/category', emoji: '🚗' },
  { key: 'hewan', status: 'comingSoon', href: null, emoji: '🐾' },
  { key: 'kesehatan', status: 'comingSoon', href: null, emoji: '❤️' },
  { key: 'perjalanan', status: 'comingSoon', href: null, emoji: '✈️' },
];

export const TESTIMONIALS = ['theo', 'agustina', 'randy', 'sarjan'] as const;

export const INSURERS: { slug: string; name: string }[] = [
  { slug: 'mtwi', name: 'MTWI' },
  { slug: 'zurich', name: 'Zurich' },
  { slug: 'mega', name: 'Mega' },
  { slug: 'artarindo', name: 'Artarindo' },
  { slug: 'staco', name: 'Staco' },
  { slug: 'sahabat', name: 'Sahabat' },
  { slug: 'tugu', name: 'Tugu' },
  { slug: 'reliance', name: 'Reliance' },
  { slug: 'sinarmas', name: 'Sinarmas' },
  { slug: 'tob', name: 'TOB' },
  { slug: 'brins', name: 'BRINS' },
  { slug: 'zurich-syariah', name: 'Zurich Syariah' },
  { slug: 'mega-syariah', name: 'Mega Syariah' },
  { slug: 'raksa', name: 'Raksa' },
  { slug: 'mag', name: 'MAG' },
  { slug: 'oona', name: 'Oona' },
];

export const ABOUT_STATS = [
  { value: '20.000++', key: 'statsPartners' },
  { value: '60.000.000++', key: 'statsPolicies' },
  { value: '10.000++', key: 'statsCustomers' },
] as const;

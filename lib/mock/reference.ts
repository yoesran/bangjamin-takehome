export type WheelerType = 'fourWheeler' | 'twoWheeler';
export type Brand = { id: string; name: string; image: string };
export type Region = { code: string; tier: 1 | 2 | 3 };

export const REGIONS: Region[] = [
  { code: 'A', tier: 2 },
  { code: 'AA', tier: 3 },
  { code: 'AB', tier: 3 },
  { code: 'AD', tier: 3 },
  { code: 'AE', tier: 3 },
  { code: 'AG', tier: 3 },
  { code: 'B', tier: 2 },
  { code: 'BA', tier: 1 },
  { code: 'BB', tier: 1 },
  { code: 'BD', tier: 1 },
  { code: 'BE', tier: 1 },
  { code: 'BG', tier: 1 },
  { code: 'BH', tier: 1 },
  { code: 'BK', tier: 1 },
  { code: 'BL', tier: 1 },
  { code: 'BM', tier: 1 },
  { code: 'BN', tier: 1 },
  { code: 'BP', tier: 1 },
  { code: 'D', tier: 2 },
  { code: 'DA', tier: 3 },
  { code: 'DB', tier: 3 },
  { code: 'DC', tier: 3 },
  { code: 'DD', tier: 3 },
  { code: 'DE', tier: 3 },
  { code: 'DF', tier: 3 },
  { code: 'DG', tier: 3 },
  { code: 'DH', tier: 3 },
  { code: 'DK', tier: 3 },
  { code: 'DL', tier: 3 },
  { code: 'DM', tier: 3 },
  { code: 'DN', tier: 3 },
  { code: 'DP', tier: 3 },
  { code: 'DR', tier: 3 },
  { code: 'DT', tier: 3 },
  { code: 'DW', tier: 3 },
  { code: 'E', tier: 2 },
  { code: 'EA', tier: 3 },
  { code: 'EB', tier: 3 },
  { code: 'ED', tier: 3 },
  { code: 'F', tier: 2 },
  { code: 'G', tier: 3 },
  { code: 'H', tier: 3 },
  { code: 'K', tier: 3 },
  { code: 'KB', tier: 3 },
  { code: 'KH', tier: 3 },
  { code: 'KT', tier: 3 },
  { code: 'KU', tier: 3 },
  { code: 'L', tier: 3 },
  { code: 'M', tier: 3 },
  { code: 'N', tier: 3 },
  { code: 'P', tier: 3 },
  { code: 'PA', tier: 3 },
  { code: 'PB', tier: 3 },
  { code: 'R', tier: 3 },
  { code: 'S', tier: 3 },
  { code: 'T', tier: 2 },
  { code: 'W', tier: 3 },
  { code: 'Z', tier: 2 },
];

export const BRANDS_4W: Brand[] = [
  {
    id: '62c58a4d5d93d959485f627c',
    name: 'TOYOTA',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/toyota.png',
  },
  {
    id: '62c58a4d5d93d959485f6095',
    name: 'HONDA',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/honda.jpeg',
  },
  {
    id: '62c58a4d5d93d959485f5fac',
    name: 'DAIHATSU',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/daihatsu.png',
  },
  {
    id: '62c58a4c5d93d959485f5e31',
    name: 'SUZUKI',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/suzuki.jpeg',
  },
  {
    id: '62c58a4d5d93d959485f6213',
    name: 'MITSUBISHI',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/mitsubishi.png',
  },
  {
    id: '62c58a4c5d93d959485f5c98',
    name: 'NISSAN',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/nissan.gif',
  },
  {
    id: '62c58a4d5d93d959485f63fb',
    name: 'WULING',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/wuling.png',
  },
  {
    id: '62c58a4d5d93d959485f61ae',
    name: 'HYUNDAI',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/hyundai.jpg',
  },
  {
    id: '62c58a4d5d93d959485f5f56',
    name: 'BMW',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/BMW.png',
  },
  {
    id: '69d37cb11116f07f963c6468',
    name: 'MERCEDES BENZ',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/mercedes-benz.png',
  },
  {
    id: '62c58a4d5d93d959485f5f02',
    name: 'MAZDA',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/mazda.png',
  },
  {
    id: '62c58a4c5d93d959485f5e11',
    name: 'ISUZU',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/isuzu.jpeg',
  },
  {
    id: '62c58a4c5d93d959485f5dc7',
    name: 'KIA',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/kia.png',
  },
  {
    id: '65d33d4f464bc41c3cd8b830',
    name: 'BYD',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/byd-logo.jpeg',
  },
];
export const BRANDS_2W: Brand[] = [
  {
    id: '640173f3085743c00ba1b54f',
    name: 'HONDA',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/hondamotorcycle.png',
  },
  {
    id: '62c58a4e5d93d959485f654f',
    name: 'YAMAHA',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/yamaha.png',
  },
  {
    id: '62c58a4c5d93d959485f5e31',
    name: 'SUZUKI',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/suzuki.jpeg',
  },
  {
    id: '62c58a4e5d93d959485f64e0',
    name: 'KAWASAKI',
    image: 'https://storage.googleapis.com/bangjamin-public-bucket/brand-logos/kawasaki.png',
  },
];

export const brandsFor = (w: WheelerType): Brand[] => (w === 'twoWheeler' ? BRANDS_2W : BRANDS_4W);

export const YEARS: number[] = Array.from({ length: 2026 - 2005 + 1 }, (_, i) => 2026 - i);

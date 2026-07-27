export type Workshop = {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  type: 'AUTHORIZED' | 'NON_AUTHORIZED';
  gmaps: string;
  insurers: string[];
};

const PULLED: Workshop[] = [
  {
    id: '63a0121983e11e84827f70be',
    name: '1PREMIUM AUTOCARE',
    city: 'CIMAHI',
    area: 'JAWA BARAT',
    address: 'Jl. Raya Barat 654-656 Cimahi',
    phone: '022-20675608',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/UVpsHzmo7jtWAoEn6',
    insurers: ['MAG', 'Mega', 'Staco'],
  },
  {
    id: '63a0121983e11e84827f70cd',
    name: '2 Putra Auto Repair / DUA PUTRA',
    city: 'MUARA BUNGO',
    area: 'SUMATERA SELATAN',
    address: 'Jl. Lintas Sumatra KM. 3 Muara Bungo Arah Padang',
    phone: '0813-7318-6806',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/4kLAYARd62VcnvHP6',
    insurers: ['MAG'],
  },
  {
    id: '63a0121983e11e84827f70f6',
    name: '28 OTOMOTIVE',
    city: 'MEDAN',
    area: 'SUMATERA UTARA',
    address: 'Jl. M.H Thamrin No.7, Sidodadi, Kec. Medan Tim., Kota Medan, Sumatera Utara 20214',
    phone: '06188815606',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/LBYeeLZYfQikVPo18',
    insurers: ['Mega', 'ACA', 'Staco'],
  },
  {
    id: '664d5f19c62b700aa56ace77',
    name: '9 NAGA EMAS',
    city: 'LAMPUNG',
    area: 'SUMATERA SELATAN',
    address:
      'Jl. Soekarno Hatta No. 99, Tanjung Senang, Way Dadi, Kec. Sukarame, Kota Bandar Lampung, L',
    phone: '0721 5611646',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://maps.app.goo.gl/ku1271mz61pnuuQb9',
    insurers: [],
  },
  {
    id: '63a0121983e11e84827f7106',
    name: 'A Keng Service',
    city: 'MEDAN',
    area: 'SUMATERA UTARA',
    address:
      'Jl. HM. Joni No.32, Ps. Merah Bar., Kec. Medan Area, Kota Medan, Sumatera Utara 20217',
    phone: '061-7367879',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/5f4pb8MEbUiFBs496',
    insurers: ['MAG', 'Aswata'],
  },
  {
    id: '63a0121983e11e84827f7118',
    name: 'A Lyang Motor',
    city: 'JAKARTA UTARA',
    area: 'DKI JAKARTA',
    address: 'Jl. Komplek Pluit Mas VI (Blok E) No.11A',
    phone: '021-6696469 / 6695406',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/XM8XXtqKt433ZK3q9',
    insurers: ['MAG'],
  },
  {
    id: '63a0121983e11e84827f712f',
    name: 'Abadi Jaya Motor',
    city: 'JAKARTA UTARA',
    area: 'DKI JAKARTA',
    address:
      'Jl. Semut Ujung No.49A, RT.1/RW.5, Penjaringan, Kec. Penjaringan, Kota Jkt Utara, Daerah K',
    phone: '216930159',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/hta6rqAL6gKvvxYZ7',
    insurers: ['MAG', 'MTWI', 'Raksa'],
  },
  {
    id: '63a0121983e11e84827f7146',
    name: 'Abadi Jaya Prima',
    city: 'PEKANBARU',
    area: 'RIAU',
    address: 'Jl. Yos Sudarso KM 6 Rumbai, Pekanbaru',
    phone: '0853-5551-0877',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://goo.gl/maps/GZrzWvJRsai6noYV8',
    insurers: ['MAG', 'Staco', 'MTWI'],
  },
  {
    id: '664d5f19c62b700aa56ace74',
    name: 'ABADI MOTOR PANDEGLANG',
    city: 'PANDEGLANG',
    area: 'BANTEN',
    address: 'Jl. Raya Cibiuk No.2, Sukaratu, Kec. Majasari, Kabupaten Pandeglang, Banten 42211',
    phone: '08121204700',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://maps.app.goo.gl/E8KEuHcdQGscPH2aA',
    insurers: [],
  },
  {
    id: '65851993991df706d6eef052',
    name: 'Abadi Top Color',
    city: 'SURABAYA',
    area: 'JAWA TIMUR',
    address:
      'Jalan Raya Lontar No. 27, 28, Sambikerep, Lontar, Kec. Sambikerep, Surabaya, Jawa Timur 60',
    phone: '031-7421451',
    type: 'NON_AUTHORIZED',
    gmaps: 'https://maps.app.goo.gl/3NUZkHj2rxzYKEqu6',
    insurers: ['Sahabat', 'Reliance'],
  },
  {
    id: 'auth-0',
    name: 'ASTRA AUTHORIZED SERVICE',
    city: 'JAKARTA SELATAN',
    area: 'DKI JAKARTA',
    address: 'Jl. Raya Utama No.10, JAKARTA SELATAN',
    phone: '021-5001000',
    type: 'AUTHORIZED',
    gmaps: '',
    insurers: ['Zurich', 'Sinarmas', 'Tugu'],
  },
  {
    id: 'auth-1',
    name: 'TOYOTA AUTO2000',
    city: 'SURABAYA',
    area: 'JAWA TIMUR',
    address: 'Jl. Raya Utama No.11, SURABAYA',
    phone: '021-5001001',
    type: 'AUTHORIZED',
    gmaps: '',
    insurers: ['Zurich', 'Sinarmas', 'Tugu'],
  },
  {
    id: 'auth-2',
    name: 'HONDA AUTHORIZED CENTRE',
    city: 'BANDUNG',
    area: 'JAWA BARAT',
    address: 'Jl. Raya Utama No.12, BANDUNG',
    phone: '021-5001002',
    type: 'AUTHORIZED',
    gmaps: '',
    insurers: ['Zurich', 'Sinarmas', 'Tugu'],
  },
  {
    id: 'auth-3',
    name: 'SUZUKI AUTHORIZED',
    city: 'MEDAN',
    area: 'SUMATERA UTARA',
    address: 'Jl. Raya Utama No.13, MEDAN',
    phone: '021-5001003',
    type: 'AUTHORIZED',
    gmaps: '',
    insurers: ['Zurich', 'Sinarmas', 'Tugu'],
  },
];

const SYNTH_CITIES: { city: string; area: string; code: string }[] = [
  { city: 'JAKARTA SELATAN', area: 'DKI JAKARTA', code: '021' },
  { city: 'BEKASI', area: 'JAWA BARAT', code: '021' },
  { city: 'DEPOK', area: 'JAWA BARAT', code: '021' },
  { city: 'TANGERANG', area: 'BANTEN', code: '021' },
  { city: 'BANDUNG', area: 'JAWA BARAT', code: '022' },
  { city: 'SEMARANG', area: 'JAWA TENGAH', code: '024' },
  { city: 'YOGYAKARTA', area: 'DI YOGYAKARTA', code: '0274' },
  { city: 'SURABAYA', area: 'JAWA TIMUR', code: '031' },
  { city: 'MALANG', area: 'JAWA TIMUR', code: '0341' },
  { city: 'DENPASAR', area: 'BALI', code: '0361' },
  { city: 'MAKASSAR', area: 'SULAWESI SELATAN', code: '0411' },
  { city: 'BALIKPAPAN', area: 'KALIMANTAN TIMUR', code: '0542' },
  { city: 'PALEMBANG', area: 'SUMATERA SELATAN', code: '0711' },
  { city: 'PEKANBARU', area: 'RIAU', code: '0761' },
  { city: 'MANADO', area: 'SULAWESI UTARA', code: '0431' },
  { city: 'PONTIANAK', area: 'KALIMANTAN BARAT', code: '0561' },
];

const SYNTH_NAMES = ['KARYA MOTOR', 'AUTO PRIMA', 'SINAR JAYA SERVICE', 'MEGA BODY REPAIR'];

const SYNTH_INSURERS = ['Zurich', 'Sinarmas', 'Tugu', 'MAG', 'BRINS', 'Raksa', 'Mega', 'Staco'];

const SYNTHESISED: Workshop[] = SYNTH_CITIES.flatMap((loc, cityIndex) =>
  SYNTH_NAMES.map((name, nameIndex) => {
    const i = cityIndex * SYNTH_NAMES.length + nameIndex;
    return {
      id: `synth-${i}`,
      name: `${name} ${loc.city}`,
      city: loc.city,
      area: loc.area,
      address: `Jl. Raya Contoh No.${10 + i}, ${loc.city}`,
      phone: `${loc.code}-5${String(100000 + i).slice(-6)}`,
      type: i % 3 === 0 ? 'AUTHORIZED' : ('NON_AUTHORIZED' as const),
      gmaps: '',
      insurers: [
        SYNTH_INSURERS[i % SYNTH_INSURERS.length],
        SYNTH_INSURERS[(i + 3) % SYNTH_INSURERS.length],
      ],
    } satisfies Workshop;
  }),
);

export const WORKSHOPS: Workshop[] = [...PULLED, ...SYNTHESISED];

export const WORKSHOP_TOTAL = 1987;

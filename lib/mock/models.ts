export type Model = { id: string; modelName: string; basePrice: number };

const FOUR: Record<string, Model[]> = {
  '62c58a4d5d93d959485f627c': [
    { id: 'toyota-agya', modelName: 'Agya', basePrice: 175000000 },
    { id: 'toyota-calya', modelName: 'Calya', basePrice: 175000000 },
    { id: 'toyota-avanza', modelName: 'Avanza', basePrice: 250000000 },
    { id: 'toyota-veloz', modelName: 'Veloz', basePrice: 300000000 },
    { id: 'toyota-rush', modelName: 'Rush', basePrice: 290000000 },
    { id: 'toyota-raize', modelName: 'Raize', basePrice: 260000000 },
    { id: 'toyota-yaris', modelName: 'Yaris', basePrice: 320000000 },
    { id: 'toyota-vios', modelName: 'Vios', basePrice: 385000000 },
    { id: 'toyota-innova-zenix', modelName: 'Innova Zenix', basePrice: 450000000 },
    { id: 'toyota-fortuner', modelName: 'Fortuner', basePrice: 560000000 },
    { id: 'toyota-corolla-cross', modelName: 'Corolla Cross', basePrice: 570000000 },
    { id: 'toyota-camry', modelName: 'Camry', basePrice: 900000000 },
    { id: 'toyota-hilux', modelName: 'Hilux', basePrice: 400000000 },
  ],
  '62c58a4d5d93d959485f6095': [
    { id: 'honda-brio', modelName: 'Brio', basePrice: 180000000 },
    { id: 'honda-mobilio', modelName: 'Mobilio', basePrice: 240000000 },
    { id: 'honda-br-v', modelName: 'BR-V', basePrice: 300000000 },
    { id: 'honda-wr-v', modelName: 'WR-V', basePrice: 290000000 },
    { id: 'honda-hr-v', modelName: 'HR-V', basePrice: 380000000 },
    { id: 'honda-city', modelName: 'City', basePrice: 385000000 },
    { id: 'honda-civic', modelName: 'Civic', basePrice: 620000000 },
    { id: 'honda-cr-v', modelName: 'CR-V', basePrice: 750000000 },
    { id: 'honda-accord', modelName: 'Accord', basePrice: 900000000 },
  ],
  '62c58a4d5d93d959485f5fac': [
    { id: 'daihatsu-ayla', modelName: 'Ayla', basePrice: 140000000 },
    { id: 'daihatsu-sigra', modelName: 'Sigra', basePrice: 175000000 },
    { id: 'daihatsu-xenia', modelName: 'Xenia', basePrice: 240000000 },
    { id: 'daihatsu-rocky', modelName: 'Rocky', basePrice: 260000000 },
    { id: 'daihatsu-terios', modelName: 'Terios', basePrice: 290000000 },
    { id: 'daihatsu-gran-max', modelName: 'Gran Max', basePrice: 180000000 },
    { id: 'daihatsu-luxio', modelName: 'Luxio', basePrice: 225000000 },
  ],
  '62c58a4c5d93d959485f5e31': [
    { id: 'suzuki-ignis', modelName: 'Ignis', basePrice: 200000000 },
    { id: 'suzuki-baleno', modelName: 'Baleno', basePrice: 280000000 },
    { id: 'suzuki-ertiga', modelName: 'Ertiga', basePrice: 260000000 },
    { id: 'suzuki-xl7', modelName: 'XL7', basePrice: 300000000 },
    { id: 'suzuki-jimny', modelName: 'Jimny', basePrice: 450000000 },
    { id: 'suzuki-carry', modelName: 'Carry', basePrice: 180000000 },
  ],
  '62c58a4d5d93d959485f6213': [
    { id: 'mitsubishi-xpander', modelName: 'Xpander', basePrice: 290000000 },
    { id: 'mitsubishi-xpander-cross', modelName: 'Xpander Cross', basePrice: 340000000 },
    { id: 'mitsubishi-triton', modelName: 'Triton', basePrice: 400000000 },
    { id: 'mitsubishi-pajero-sport', modelName: 'Pajero Sport', basePrice: 620000000 },
    { id: 'mitsubishi-outlander-phev', modelName: 'Outlander PHEV', basePrice: 1400000000 },
  ],
  '62c58a4c5d93d959485f5c98': [
    { id: 'nissan-magnite', modelName: 'Magnite', basePrice: 240000000 },
    { id: 'nissan-livina', modelName: 'Livina', basePrice: 280000000 },
    { id: 'nissan-kicks-e-power', modelName: 'Kicks e-Power', basePrice: 480000000 },
    { id: 'nissan-serena', modelName: 'Serena', basePrice: 550000000 },
    { id: 'nissan-x-trail', modelName: 'X-Trail', basePrice: 650000000 },
  ],
  '62c58a4d5d93d959485f63fb': [
    { id: 'wuling-confero', modelName: 'Confero', basePrice: 190000000 },
    { id: 'wuling-alvez', modelName: 'Alvez', basePrice: 280000000 },
    { id: 'wuling-cortez', modelName: 'Cortez', basePrice: 300000000 },
    { id: 'wuling-almaz-rs', modelName: 'Almaz RS', basePrice: 370000000 },
    { id: 'wuling-air-ev', modelName: 'Air EV', basePrice: 250000000 },
  ],
  '62c58a4d5d93d959485f61ae': [
    { id: 'hyundai-stargazer', modelName: 'Stargazer', basePrice: 280000000 },
    { id: 'hyundai-creta', modelName: 'Creta', basePrice: 380000000 },
    { id: 'hyundai-santa-fe', modelName: 'Santa Fe', basePrice: 750000000 },
    { id: 'hyundai-ioniq-5', modelName: 'Ioniq 5', basePrice: 820000000 },
    { id: 'hyundai-palisade', modelName: 'Palisade', basePrice: 1100000000 },
  ],
  '62c58a4d5d93d959485f5f56': [
    { id: 'bmw-320i', modelName: '320i', basePrice: 950000000 },
    { id: 'bmw-x1', modelName: 'X1', basePrice: 900000000 },
    { id: 'bmw-520i', modelName: '520i', basePrice: 1300000000 },
    { id: 'bmw-x3', modelName: 'X3', basePrice: 1400000000 },
    { id: 'bmw-x5', modelName: 'X5', basePrice: 1900000000 },
  ],
  '69d37cb11116f07f963c6468': [
    { id: 'mercedes-benz-a200', modelName: 'A200', basePrice: 900000000 },
    { id: 'mercedes-benz-c200', modelName: 'C200', basePrice: 1200000000 },
    { id: 'mercedes-benz-glc-300', modelName: 'GLC 300', basePrice: 1500000000 },
    { id: 'mercedes-benz-e300', modelName: 'E300', basePrice: 1600000000 },
    { id: 'mercedes-benz-gle-450', modelName: 'GLE 450', basePrice: 2200000000 },
  ],
  '62c58a4d5d93d959485f5f02': [
    { id: 'mazda-mazda2', modelName: 'Mazda2', basePrice: 380000000 },
    { id: 'mazda-mazda3', modelName: 'Mazda3', basePrice: 560000000 },
    { id: 'mazda-cx-3', modelName: 'CX-3', basePrice: 480000000 },
    { id: 'mazda-cx-5', modelName: 'CX-5', basePrice: 700000000 },
    { id: 'mazda-cx-9', modelName: 'CX-9', basePrice: 950000000 },
  ],
  '62c58a4c5d93d959485f5e11': [
    { id: 'isuzu-traga', modelName: 'Traga', basePrice: 220000000 },
    { id: 'isuzu-panther', modelName: 'Panther', basePrice: 300000000 },
    { id: 'isuzu-d-max', modelName: 'D-Max', basePrice: 500000000 },
    { id: 'isuzu-mu-x', modelName: 'MU-X', basePrice: 700000000 },
  ],
  '62c58a4c5d93d959485f5dc7': [
    { id: 'kia-sonet', modelName: 'Sonet', basePrice: 280000000 },
    { id: 'kia-seltos', modelName: 'Seltos', basePrice: 400000000 },
    { id: 'kia-sportage', modelName: 'Sportage', basePrice: 700000000 },
    { id: 'kia-carnival', modelName: 'Carnival', basePrice: 900000000 },
    { id: 'kia-ev6', modelName: 'EV6', basePrice: 1300000000 },
  ],
  '65d33d4f464bc41c3cd8b830': [
    { id: 'byd-dolphin', modelName: 'Dolphin', basePrice: 400000000 },
    { id: 'byd-m6', modelName: 'M6', basePrice: 400000000 },
    { id: 'byd-atto-3', modelName: 'Atto 3', basePrice: 500000000 },
    { id: 'byd-seal', modelName: 'Seal', basePrice: 700000000 },
  ],
};
const TWO: Record<string, Model[]> = {
  '640173f3085743c00ba1b54f': [
    { id: 'honda-beat', modelName: 'BeAT', basePrice: 18000000 },
    { id: 'honda-scoopy', modelName: 'Scoopy', basePrice: 22000000 },
    { id: 'honda-vario-160', modelName: 'Vario 160', basePrice: 26000000 },
    { id: 'honda-pcx-160', modelName: 'PCX 160', basePrice: 33000000 },
    { id: 'honda-adv-160', modelName: 'ADV 160', basePrice: 37000000 },
    { id: 'honda-cbr250rr', modelName: 'CBR250RR', basePrice: 65000000 },
  ],
  '62c58a4e5d93d959485f654f': [
    { id: 'yamaha-mio-m3', modelName: 'Mio M3', basePrice: 18000000 },
    { id: 'yamaha-lexi', modelName: 'Lexi', basePrice: 25000000 },
    { id: 'yamaha-aerox-155', modelName: 'Aerox 155', basePrice: 28000000 },
    { id: 'yamaha-nmax', modelName: 'NMAX', basePrice: 32000000 },
    { id: 'yamaha-xsr-155', modelName: 'XSR 155', basePrice: 37000000 },
    { id: 'yamaha-r15', modelName: 'R15', basePrice: 40000000 },
  ],
  '62c58a4c5d93d959485f5e31': [
    { id: 'suzuki-nex-ii', modelName: 'Nex II', basePrice: 17000000 },
    { id: 'suzuki-address', modelName: 'Address', basePrice: 20000000 },
    { id: 'suzuki-gsx-r150', modelName: 'GSX-R150', basePrice: 35000000 },
    { id: 'suzuki-burgman-street', modelName: 'Burgman Street', basePrice: 47000000 },
  ],
  '62c58a4e5d93d959485f64e0': [
    { id: 'kawasaki-w175', modelName: 'W175', basePrice: 32000000 },
    { id: 'kawasaki-klx-150', modelName: 'KLX 150', basePrice: 33000000 },
    { id: 'kawasaki-ninja-250', modelName: 'Ninja 250', basePrice: 68000000 },
  ],
};

export const modelsForBrand = (brandId: string): Model[] => FOUR[brandId] ?? TWO[brandId] ?? [];

export const findModel = (brandId: string, modelId: string): Model | undefined =>
  modelsForBrand(brandId).find((m) => m.id === modelId);

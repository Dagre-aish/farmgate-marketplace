import { MandiPriceRecord } from '../types';

export const MANDI_RECORDS: MandiPriceRecord[] = [
  // WHEAT
  {
    id: 'mandi_w1',
    commodityId: 'wheat',
    commodityName: 'Wheat (Lokwan)',
    mandiName: 'Indore Mandi',
    district: 'Indore',
    state: 'Madhya Pradesh',
    distanceKm: 28,
    modalPrice: 2680,
    minPrice: 2520,
    maxPrice: 2850,
    dailyChangePct: 1.8,
    arrivalVolumeTonnes: 450,
    arrivalTrend: 'steady',
    mspBenchmark: 2275,
    updatedAt: 'Today, 08:30 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2540, volume: 520 },
      { date: '2026-08-19', price: 2570, volume: 490 },
      { date: '2026-08-20', price: 2600, volume: 470 },
      { date: '2026-08-21', price: 2620, volume: 460 },
      { date: '2026-08-22', price: 2640, volume: 440 },
      { date: '2026-08-23', price: 2660, volume: 430 },
      { date: '2026-08-24', price: 2680, volume: 450 }
    ]
  },
  {
    id: 'mandi_w2',
    commodityId: 'wheat',
    commodityName: 'Wheat (Sharbati)',
    mandiName: 'Khanna Grain Market',
    district: 'Ludhiana',
    state: 'Punjab',
    distanceKm: 65,
    modalPrice: 2790,
    minPrice: 2640,
    maxPrice: 2950,
    dailyChangePct: 2.3,
    arrivalVolumeTonnes: 620,
    arrivalTrend: 'rising',
    mspBenchmark: 2275,
    updatedAt: 'Today, 09:15 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2650, volume: 580 },
      { date: '2026-08-19', price: 2680, volume: 590 },
      { date: '2026-08-20', price: 2710, volume: 600 },
      { date: '2026-08-21', price: 2730, volume: 610 },
      { date: '2026-08-22', price: 2750, volume: 630 },
      { date: '2026-08-23', price: 2770, volume: 620 },
      { date: '2026-08-24', price: 2790, volume: 620 }
    ]
  },
  {
    id: 'mandi_w3',
    commodityId: 'wheat',
    commodityName: 'Wheat (Desi)',
    mandiName: 'Neemuch Mandi',
    district: 'Neemuch',
    state: 'Madhya Pradesh',
    distanceKm: 85,
    modalPrice: 2610,
    minPrice: 2480,
    maxPrice: 2740,
    dailyChangePct: -0.6,
    arrivalVolumeTonnes: 310,
    arrivalTrend: 'falling',
    mspBenchmark: 2275,
    updatedAt: 'Today, 07:45 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2620, volume: 380 },
      { date: '2026-08-19', price: 2630, volume: 360 },
      { date: '2026-08-20', price: 2640, volume: 340 },
      { date: '2026-08-21', price: 2630, volume: 330 },
      { date: '2026-08-22', price: 2620, volume: 320 },
      { date: '2026-08-23', price: 2620, volume: 310 },
      { date: '2026-08-24', price: 2610, volume: 310 }
    ]
  },

  // ONION
  {
    id: 'mandi_o1',
    commodityId: 'onion',
    commodityName: 'Onion (Red Nasik)',
    mandiName: 'Lasalgaon Mandi',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 22,
    modalPrice: 2450,
    minPrice: 1900,
    maxPrice: 2850,
    dailyChangePct: 5.8,
    arrivalVolumeTonnes: 1450,
    arrivalTrend: 'rising',
    mspBenchmark: 1800,
    updatedAt: 'Today, 10:00 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2100, volume: 1100 },
      { date: '2026-08-19', price: 2180, volume: 1150 },
      { date: '2026-08-20', price: 2240, volume: 1220 },
      { date: '2026-08-21', price: 2310, volume: 1300 },
      { date: '2026-08-22', price: 2380, volume: 1390 },
      { date: '2026-08-23', price: 2420, volume: 1420 },
      { date: '2026-08-24', price: 2450, volume: 1450 }
    ]
  },
  {
    id: 'mandi_o2',
    commodityId: 'onion',
    commodityName: 'Onion (Garva)',
    mandiName: 'Azadpur Mandi',
    district: 'North Delhi',
    state: 'Delhi',
    distanceKm: 240,
    modalPrice: 2950,
    minPrice: 2300,
    maxPrice: 3400,
    dailyChangePct: 4.2,
    arrivalVolumeTonnes: 2100,
    arrivalTrend: 'steady',
    mspBenchmark: 1800,
    updatedAt: 'Today, 08:00 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2700, volume: 1950 },
      { date: '2026-08-19', price: 2750, volume: 2000 },
      { date: '2026-08-20', price: 2800, volume: 2050 },
      { date: '2026-08-21', price: 2860, volume: 2080 },
      { date: '2026-08-22', price: 2900, volume: 2100 },
      { date: '2026-08-23', price: 2920, volume: 2120 },
      { date: '2026-08-24', price: 2950, volume: 2100 }
    ]
  },
  {
    id: 'mandi_o3',
    commodityId: 'onion',
    commodityName: 'Onion (Pimpalgaon)',
    mandiName: 'Pimpalgaon Baswant',
    district: 'Nashik',
    state: 'Maharashtra',
    distanceKm: 34,
    modalPrice: 2490,
    minPrice: 2050,
    maxPrice: 2920,
    dailyChangePct: 6.1,
    arrivalVolumeTonnes: 980,
    arrivalTrend: 'rising',
    mspBenchmark: 1800,
    updatedAt: 'Today, 09:30 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2150, volume: 820 },
      { date: '2026-08-19', price: 2210, volume: 860 },
      { date: '2026-08-20', price: 2280, volume: 900 },
      { date: '2026-08-21', price: 2350, volume: 930 },
      { date: '2026-08-22', price: 2420, volume: 960 },
      { date: '2026-08-23', price: 2460, volume: 970 },
      { date: '2026-08-24', price: 2490, volume: 980 }
    ]
  },

  // TOMATO
  {
    id: 'mandi_t1',
    commodityId: 'tomato',
    commodityName: 'Tomato (Hybrid 1057)',
    mandiName: 'Kolar APMC',
    district: 'Kolar',
    state: 'Karnataka',
    distanceKm: 42,
    modalPrice: 1650,
    minPrice: 1200,
    maxPrice: 2100,
    dailyChangePct: -8.5,
    arrivalVolumeTonnes: 2800,
    arrivalTrend: 'rising',
    mspBenchmark: 1400,
    updatedAt: 'Today, 06:30 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2400, volume: 1600 },
      { date: '2026-08-19', price: 2250, volume: 1850 },
      { date: '2026-08-20', price: 2100, volume: 2100 },
      { date: '2026-08-21', price: 1950, volume: 2400 },
      { date: '2026-08-22', price: 1800, volume: 2600 },
      { date: '2026-08-23', price: 1720, volume: 2750 },
      { date: '2026-08-24', price: 1650, volume: 2800 }
    ]
  },
  {
    id: 'mandi_t2',
    commodityId: 'tomato',
    commodityName: 'Tomato (Desi)',
    mandiName: 'Madanapalle Market',
    district: 'Annamayya',
    state: 'Andhra Pradesh',
    distanceKm: 78,
    modalPrice: 1580,
    minPrice: 1100,
    maxPrice: 1950,
    dailyChangePct: -11.2,
    arrivalVolumeTonnes: 3200,
    arrivalTrend: 'rising',
    mspBenchmark: 1400,
    updatedAt: 'Today, 07:15 AM',
    priceHistory: [
      { date: '2026-08-18', price: 2300, volume: 1900 },
      { date: '2026-08-19', price: 2150, volume: 2200 },
      { date: '2026-08-20', price: 2000, volume: 2500 },
      { date: '2026-08-21', price: 1850, volume: 2800 },
      { date: '2026-08-22', price: 1700, volume: 3000 },
      { date: '2026-08-23', price: 1620, volume: 3100 },
      { date: '2026-08-24', price: 1580, volume: 3200 }
    ]
  },

  // SOYBEAN
  {
    id: 'mandi_s1',
    commodityId: 'soybean',
    commodityName: 'Soybean (Yellow)',
    mandiName: 'Dewas Mandi',
    district: 'Dewas',
    state: 'Madhya Pradesh',
    distanceKm: 38,
    modalPrice: 5120,
    minPrice: 4850,
    maxPrice: 5350,
    dailyChangePct: 1.4,
    arrivalVolumeTonnes: 410,
    arrivalTrend: 'steady',
    mspBenchmark: 4892,
    updatedAt: 'Today, 09:45 AM',
    priceHistory: [
      { date: '2026-08-18', price: 4980, volume: 440 },
      { date: '2026-08-19', price: 5010, volume: 430 },
      { date: '2026-08-20', price: 5040, volume: 420 },
      { date: '2026-08-21', price: 5070, volume: 410 },
      { date: '2026-08-22', price: 5090, volume: 405 },
      { date: '2026-08-23', price: 5110, volume: 415 },
      { date: '2026-08-24', price: 5120, volume: 410 }
    ]
  },
  {
    id: 'mandi_s2',
    commodityId: 'soybean',
    commodityName: 'Soybean (JS 9560)',
    mandiName: 'Kota Mandi',
    district: 'Kota',
    state: 'Rajasthan',
    distanceKm: 145,
    modalPrice: 5240,
    minPrice: 4950,
    maxPrice: 5480,
    dailyChangePct: 2.1,
    arrivalVolumeTonnes: 380,
    arrivalTrend: 'falling',
    mspBenchmark: 4892,
    updatedAt: 'Today, 10:15 AM',
    priceHistory: [
      { date: '2026-08-18', price: 5050, volume: 480 },
      { date: '2026-08-19', price: 5090, volume: 460 },
      { date: '2026-08-20', price: 5120, volume: 430 },
      { date: '2026-08-21', price: 5160, volume: 410 },
      { date: '2026-08-22', price: 5200, volume: 395 },
      { date: '2026-08-23', price: 5220, volume: 385 },
      { date: '2026-08-24', price: 5240, volume: 380 }
    ]
  },

  // COTTON
  {
    id: 'mandi_c1',
    commodityId: 'cotton',
    commodityName: 'Cotton (Shankar-6)',
    mandiName: 'Rajkot APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    distanceKm: 55,
    modalPrice: 7650,
    minPrice: 7200,
    maxPrice: 8100,
    dailyChangePct: 1.1,
    arrivalVolumeTonnes: 540,
    arrivalTrend: 'steady',
    mspBenchmark: 7121,
    updatedAt: 'Today, 08:50 AM',
    priceHistory: [
      { date: '2026-08-18', price: 7450, volume: 590 },
      { date: '2026-08-19', price: 7490, volume: 570 },
      { date: '2026-08-20', price: 7530, volume: 560 },
      { date: '2026-08-21', price: 7580, volume: 550 },
      { date: '2026-08-22', price: 7610, volume: 545 },
      { date: '2026-08-23', price: 7630, volume: 540 },
      { date: '2026-08-24', price: 7650, volume: 540 }
    ]
  },

  // RED CHILLI
  {
    id: 'mandi_rc1',
    commodityId: 'chilli_red',
    commodityName: 'Red Chilli (Teja)',
    mandiName: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    distanceKm: 18,
    modalPrice: 18400,
    minPrice: 16500,
    maxPrice: 21200,
    dailyChangePct: 3.4,
    arrivalVolumeTonnes: 850,
    arrivalTrend: 'falling',
    mspBenchmark: 16500,
    updatedAt: 'Today, 07:00 AM',
    priceHistory: [
      { date: '2026-08-18', price: 17100, volume: 1100 },
      { date: '2026-08-19', price: 17350, volume: 1050 },
      { date: '2026-08-20', price: 17600, volume: 990 },
      { date: '2026-08-21', price: 17900, volume: 940 },
      { date: '2026-08-22', price: 18150, volume: 900 },
      { date: '2026-08-23', price: 18300, volume: 870 },
      { date: '2026-08-24', price: 18400, volume: 850 }
    ]
  },

  // BASMATI PADDY
  {
    id: 'mandi_p1',
    commodityId: 'paddy_basmati',
    commodityName: 'Basmati Paddy (Pusa 1121)',
    mandiName: 'Karnal Grain Market',
    district: 'Karnal',
    state: 'Haryana',
    distanceKm: 48,
    modalPrice: 4120,
    minPrice: 3850,
    maxPrice: 4400,
    dailyChangePct: 2.2,
    arrivalVolumeTonnes: 720,
    arrivalTrend: 'rising',
    mspBenchmark: 3600,
    updatedAt: 'Today, 09:10 AM',
    priceHistory: [
      { date: '2026-08-18', price: 3880, volume: 610 },
      { date: '2026-08-19', price: 3930, volume: 640 },
      { date: '2026-08-20', price: 3980, volume: 670 },
      { date: '2026-08-21', price: 4020, volume: 690 },
      { date: '2026-08-22', price: 4070, volume: 710 },
      { date: '2026-08-23', price: 4100, volume: 715 },
      { date: '2026-08-24', price: 4120, volume: 720 }
    ]
  },

  // MUSTARD
  {
    id: 'mandi_m1',
    commodityId: 'mustard',
    commodityName: 'Mustard (42% Oil)',
    mandiName: 'Alwar Mandi',
    district: 'Alwar',
    state: 'Rajasthan',
    distanceKm: 52,
    modalPrice: 6050,
    minPrice: 5750,
    maxPrice: 6300,
    dailyChangePct: 1.5,
    arrivalVolumeTonnes: 390,
    arrivalTrend: 'falling',
    mspBenchmark: 5650,
    updatedAt: 'Today, 08:20 AM',
    priceHistory: [
      { date: '2026-08-18', price: 5820, volume: 490 },
      { date: '2026-08-19', price: 5870, volume: 460 },
      { date: '2026-08-20', price: 5920, volume: 440 },
      { date: '2026-08-21', price: 5960, volume: 420 },
      { date: '2026-08-22', price: 6000, volume: 405 },
      { date: '2026-08-23', price: 6030, volume: 395 },
      { date: '2026-08-24', price: 6050, volume: 390 }
    ]
  },

  // TUR DAL
  {
    id: 'mandi_td1',
    commodityId: 'tur_dal',
    commodityName: 'Tur / Arhar (Maruti)',
    mandiName: 'Gulbarga (Kalaburagi) APMC',
    district: 'Kalaburagi',
    state: 'Karnataka',
    distanceKm: 32,
    modalPrice: 9400,
    minPrice: 8900,
    maxPrice: 9850,
    dailyChangePct: 0.9,
    arrivalVolumeTonnes: 260,
    arrivalTrend: 'falling',
    mspBenchmark: 7550,
    updatedAt: 'Today, 10:30 AM',
    priceHistory: [
      { date: '2026-08-18', price: 9150, volume: 320 },
      { date: '2026-08-19', price: 9200, volume: 305 },
      { date: '2026-08-20', price: 9260, volume: 290 },
      { date: '2026-08-21', price: 9310, volume: 280 },
      { date: '2026-08-22', price: 9350, volume: 270 },
      { date: '2026-08-23', price: 9380, volume: 265 },
      { date: '2026-08-24', price: 9400, volume: 260 }
    ]
  },

  // POTATO
  {
    id: 'mandi_pt1',
    commodityId: 'potato',
    commodityName: 'Potato (Pukhraj)',
    mandiName: 'Agra Mandi',
    district: 'Agra',
    state: 'Uttar Pradesh',
    distanceKm: 45,
    modalPrice: 1540,
    minPrice: 1300,
    maxPrice: 1780,
    dailyChangePct: 2.8,
    arrivalVolumeTonnes: 1650,
    arrivalTrend: 'steady',
    mspBenchmark: 1250,
    updatedAt: 'Today, 08:40 AM',
    priceHistory: [
      { date: '2026-08-18', price: 1420, volume: 1720 },
      { date: '2026-08-19', price: 1450, volume: 1700 },
      { date: '2026-08-20', price: 1470, volume: 1680 },
      { date: '2026-08-21', price: 1500, volume: 1660 },
      { date: '2026-08-22', price: 1520, volume: 1650 },
      { date: '2026-08-23', price: 1530, volume: 1650 },
      { date: '2026-08-24', price: 1540, volume: 1650 }
    ]
  }
];

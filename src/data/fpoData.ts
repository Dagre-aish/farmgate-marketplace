import { FPOBatchPool, FPODemandForecast } from '../types';

export const FPO_POOLS: FPOBatchPool[] = [
  {
    id: 'fpo_pool_1',
    fpoName: 'Sahyadri Farmers Producer Co. Ltd.',
    district: 'Nashik',
    state: 'Maharashtra',
    commodityId: 'onion',
    commodityName: 'Onion (Red Garva - Uniform Lot)',
    targetLotSizeQuintals: 2500,
    currentPooledQuintals: 1850,
    participatingFarmersCount: 68,
    expectedProcurementPricePerQtl: 2620,
    transportSavingsPct: 42,
    status: 'COLLECTING',
    matchedBuyer: 'Reliance Retail Fresh'
  },
  {
    id: 'fpo_pool_2',
    fpoName: 'Malwa Krishi Vikas FPC',
    district: 'Indore',
    state: 'Madhya Pradesh',
    commodityId: 'wheat',
    commodityName: 'Wheat (Sharbati Gold Grade A)',
    targetLotSizeQuintals: 5000,
    currentPooledQuintals: 4600,
    participatingFarmersCount: 115,
    expectedProcurementPricePerQtl: 2820,
    transportSavingsPct: 38,
    status: 'READY_FOR_RFQ',
    matchedBuyer: 'ITC Agri Business Division'
  },
  {
    id: 'fpo_pool_3',
    fpoName: 'Guntur Mirchi Rythu Sangham',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    commodityId: 'chilli_red',
    commodityName: 'Red Chilli (Teja Hot Stemless)',
    targetLotSizeQuintals: 800,
    currentPooledQuintals: 720,
    participatingFarmersCount: 42,
    expectedProcurementPricePerQtl: 19500,
    transportSavingsPct: 45,
    status: 'CONTRACTED',
    matchedBuyer: 'Bharat Spices Export Consortium'
  },
  {
    id: 'fpo_pool_4',
    fpoName: 'Nimar Nimar Soybean Federation',
    district: 'Dewas',
    state: 'Madhya Pradesh',
    commodityId: 'soybean',
    commodityName: 'Soybean (Cleaned & Graded)',
    targetLotSizeQuintals: 3000,
    currentPooledQuintals: 2100,
    participatingFarmersCount: 84,
    expectedProcurementPricePerQtl: 5320,
    transportSavingsPct: 35,
    status: 'COLLECTING'
  }
];

export const FPO_DEMAND_FORECASTS: FPODemandForecast[] = [
  {
    commodityId: 'wheat',
    commodityName: 'Wheat (Flour Mill & Bread Grade)',
    currentMonthDemandMT: 18500,
    projectedMonth1DemandMT: 24200,
    projectedMonth2DemandMT: 28900,
    projectedMonth3DemandMT: 32000,
    confidenceScore: 94,
    keyCorporateBuyers: ['ITC Foods (Aashirvaad)', 'Britannia Industries', 'Patanjali Agro', 'Parle Products'],
    priceBandMin: 2700,
    priceBandMax: 2980,
    recommendedSowingOrHoldingStrategy: 'Hold Grade A lots in WDRA certified warehouses. Peak demand surge expected in 45-60 days with +₹200/qtl margin.'
  },
  {
    commodityId: 'onion',
    commodityName: 'Onion (Rabi Crop Cold Store Grade)',
    currentMonthDemandMT: 12000,
    projectedMonth1DemandMT: 15400,
    projectedMonth2DemandMT: 19800,
    projectedMonth3DemandMT: 22500,
    confidenceScore: 89,
    keyCorporateBuyers: ['Reliance Fresh', 'Mother Dairy / Safal', 'BigBasket', 'Zepto Wholesale'],
    priceBandMin: 2400,
    priceBandMax: 3200,
    recommendedSowingOrHoldingStrategy: 'High price volatility. Aggregate in ventilated onion chawls. Sell in staggered tranches of 25% every 10 days.'
  },
  {
    commodityId: 'soybean',
    commodityName: 'Soybean (High Oil & Non-GMO)',
    currentMonthDemandMT: 9800,
    projectedMonth1DemandMT: 13500,
    projectedMonth2DemandMT: 17200,
    projectedMonth3DemandMT: 21000,
    confidenceScore: 91,
    keyCorporateBuyers: ['Adani Wilmar', 'Ruchi Soya / Patanjali', 'Kriti Nutrients', 'Vippy Industries'],
    priceBandMin: 5200,
    priceBandMax: 5650,
    recommendedSowingOrHoldingStrategy: 'Global edible oil import duties rising. Hold dry lots (<10% moisture) for crushing peak in Oct-Nov.'
  },
  {
    commodityId: 'tomato',
    commodityName: 'Tomato (Puree & Table Variety)',
    currentMonthDemandMT: 14000,
    projectedMonth1DemandMT: 11000,
    projectedMonth2DemandMT: 8500,
    projectedMonth3DemandMT: 16000,
    confidenceScore: 86,
    keyCorporateBuyers: ['Dabur (Real Foods)', 'Kissan / HUL', 'Reliance Fresh', 'Swiggy Instamart'],
    priceBandMin: 1400,
    priceBandMax: 2100,
    recommendedSowingOrHoldingStrategy: 'High arrival volume currently depressing spot prices. Sell now for table consumption or execute direct buyback contracts with puree processors.'
  },
  {
    commodityId: 'chilli_red',
    commodityName: 'Red Chilli (High SHU & ASTA Color)',
    currentMonthDemandMT: 4500,
    projectedMonth1DemandMT: 5800,
    projectedMonth2DemandMT: 7100,
    projectedMonth3DemandMT: 8400,
    confidenceScore: 93,
    keyCorporateBuyers: ['MDH Spices', 'Everest Masala', 'Eastern Condiments', 'US & ASEAN Importers'],
    priceBandMin: 18000,
    priceBandMax: 22500,
    recommendedSowingOrHoldingStrategy: 'Store in certified cold storages at 4-6°C to prevent color loss. Forward contract with spice extractors at guaranteed base price.'
  }
];

export type CommodityCategory = 'Cereals' | 'Pulses' | 'Vegetables' | 'Oilseeds' | 'Cash Crops' | 'Spices' | 'Fruits';

export interface Commodity {
  id: string;
  name: string;
  hindiName: string;
  category: CommodityCategory;
  standardUnit: string; // 'Quintal' (100 kg)
  msp: number; // Minimum Support Price in INR/Quintal (or standard benchmark)
  perishabilityDays: number; // Shelf life days without specialized storage
  ambientWeightLossPerMonthPct: number;
  warehouseCostPerMonth: number; // INR/quintal
  coldStorageCostPerMonth?: number; // INR/quintal
  icon: string;
  image: string;
  description: string;
}

export interface MandiPriceRecord {
  id: string;
  commodityId: string;
  commodityName: string;
  mandiName: string;
  district: string;
  state: string;
  distanceKm: number;
  modalPrice: number; // INR/quintal
  minPrice: number;
  maxPrice: number;
  dailyChangePct: number;
  arrivalVolumeTonnes: number;
  arrivalTrend: 'rising' | 'steady' | 'falling';
  mspBenchmark: number;
  updatedAt: string;
  priceHistory: { date: string; price: number; volume: number }[];
}

export type StorageType = 'ambient_shed' | 'state_warehouse' | 'wdra_accredited' | 'cold_storage';

export interface SellVsHoldPrediction {
  commodityId: string;
  currentPrice: number;
  projectedPrice7d: number;
  projectedPrice15d: number;
  projectedPrice30d: number;
  recommendation: 'SELL_NOW' | 'HOLD_SHORT' | 'HOLD_MEDIUM' | 'PLEDGE_WAREHOUSE';
  confidencePct: number;
  headline: string;
  keyDrivers: string[];
  riskFactor: 'LOW' | 'MEDIUM' | 'HIGH';
  storageRecommendation: StorageType;
  financialAnalysis: {
    currentTotalValue: number;
    projectedTotalValue7d: number;
    projectedTotalValue15d: number;
    storageCost7d: number;
    storageCost15d: number;
    weightLossCost7d: number;
    weightLossCost15d: number;
    netGain7d: number;
    netGain15d: number;
    roiPct15d: number;
  };
  warehouseLoanEligibility?: {
    eligible: boolean;
    maxLoanLTVPct: number; // e.g. 75%
    loanAmount: number;
    interestRateAnnualPct: number; // e.g. 7%
    tenureDays: number;
  };
}

export interface BuyerProfile {
  id: string;
  name: string;
  email: string;
  type: 'Corporate Processor' | 'FMCG Conglomerate' | 'Retail Chain' | 'Flour/Oil Mill' | 'Agro Exporter' | 'Institutional Canteen';
  logo: string;
  verified: boolean;
  kycTier: 'Gold' | 'Platinum' | 'Enterprise';
  rating: number;
  dealsCompleted: number;
  escrowGuaranteed: boolean;
  escrowBalanceINR: number;
  location: string;
  operatingStates: string[];
  gstin?: string;
}

export interface Bid {
  id: string;
  listingId: string;
  commodityName: string;
  bidderId: string;
  bidderName: string;
  bidderLogo: string;
  bidderKycTier: 'Gold' | 'Platinum' | 'Enterprise';
  bidPricePerQuintal: number;
  bidQuantityQuintals: number;
  deliveryTerms: string;
  paymentTerms: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED' | 'WITHDRAWN';
  createdAt: string;
}

export interface BuyerRFQ {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerLogo: string;
  commodityId: string;
  commodityName: string;
  requiredQuantityQuintals: number;
  fulfilledQuantityQuintals: number;
  targetPricePerQuintal: number;
  paymentTerms: string; // '100% Escrow on Dispatch, Release on Assaying'
  qualityRequirements: {
    grade: 'Grade A' | 'Grade B' | 'Fair Average Quality (FAQ)';
    maxMoisturePct: number;
    maxForeignMatterPct: number;
    grainSizeMm?: number;
    organicCertified?: boolean;
  };
  deliveryLocation: string;
  deliveryDeadline: string;
  bidsCount: number;
  status: 'OPEN' | 'PARTIALLY_FILLED' | 'CLOSED';
  createdAt: string;
}

export interface FarmerListing {
  id: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  district: string;
  state: string;
  fpoAffiliated?: string;
  commodityId: string;
  commodityName: string;
  quantityQuintals: number;
  askingPricePerQuintal: number;
  minAcceptablePrice: number;
  harvestDate: string;
  storageCondition: StorageType;
  qualityAssay: {
    grade: 'Grade A' | 'Grade B' | 'FAQ';
    moisturePct: number;
    foreignMatterPct: number;
    photos: string[];
  };
  bidsCount?: number;
  highestBidPricePerQtl?: number;
  auctionEndDate?: string;
  auctionTimeSlot?: string;
  auctionDurationHours?: number;
  status: 'AVAILABLE' | 'UNDER_NEGOTIATION' | 'ESCROW_LOCKED' | 'SOLD';
  createdAt: string;
}

export type EscrowStep = 
  | 'CONTRACT_CREATED'
  | 'ESCROW_FUNDED'
  | 'LOGISTICS_DISPATCHED'
  | 'QUALITY_ASSAYED'
  | 'PAYOUT_RELEASED';

export interface EscrowTransaction {
  id: string;
  rfqId?: string;
  listingId?: string;
  bidId?: string;
  commodityName: string;
  quantityQuintals: number;
  agreedPricePerQuintal: number;
  totalGrossAmount: number;
  platformFeePct: number; // 1.5%
  platformFeeAmount: number;
  transportFee: number;
  netFarmerPayout: number;
  buyerName: string;
  buyerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerUPIorBank: string;
  currentStep: EscrowStep;
  stepTimestamps: {
    contractCreated?: string;
    escrowFunded?: string;
    dispatched?: string;
    assayed?: string;
    payoutReleased?: string;
  };
  logistics: {
    transporterName: string;
    vehicleNumber: string;
    driverPhone: string;
    weighbridgeSlipNo: string;
    grossWeightTonnes: number;
    tareWeightTonnes: number;
    netWeightTonnes: number;
  };
  qualityReport: {
    grade: 'Grade A' | 'Grade B' | 'FAQ';
    measuredMoisturePct: number;
    measuredForeignMatterPct: number;
    passed: boolean;
    assayRemarks: string;
  };
}

export interface FPOBatchPool {
  id: string;
  fpoName: string;
  district: string;
  state: string;
  commodityId: string;
  commodityName: string;
  targetLotSizeQuintals: number;
  currentPooledQuintals: number;
  participatingFarmersCount: number;
  expectedProcurementPricePerQtl: number;
  transportSavingsPct: number;
  status: 'COLLECTING' | 'READY_FOR_RFQ' | 'CONTRACTED';
  matchedBuyer?: string;
}

export interface FPODemandForecast {
  commodityId: string;
  commodityName: string;
  currentMonthDemandMT: number;
  projectedMonth1DemandMT: number;
  projectedMonth2DemandMT: number;
  projectedMonth3DemandMT: number;
  confidenceScore: number;
  keyCorporateBuyers: string[];
  priceBandMin: number;
  priceBandMax: number;
  recommendedSowingOrHoldingStrategy: string;
}

export type AppLanguage = 'en' | 'hi' | 'mr' | 'pa' | 'te';
export type UserRole = 'FARMER' | 'BUYER' | 'FPO_ADMIN' | 'INVESTOR_PITCH';

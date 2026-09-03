export interface PitchMetric {
  title: string;
  value: string;
  subtext: string;
  trend: string;
  isPositive: boolean;
}

export interface CompetitorBenchmark {
  parameter: string;
  farmgate: string;
  dehaat: string;
  ninjacart: string;
  traditionalMandi: string;
}

export const SIH_PROBLEM_STATEMENT = {
  code: 'SIH26132',
  title: 'Farmgate — Price Discovery & Direct-Buyer Marketplace',
  coreIssue: '140M+ Indian smallholders sell to the first local trader who arrives at the farmgate because they lack real-time visibility into regional mandi prices, price forecasting, and access to institutional bulk buyers.',
  middlemanCut: '30% - 45% of final consumer price lost in unorganized middleman tiers (Kachha Arhatiya, Pucca Arhatiya, Dalal, Transporters).',
  farmgateSolution: 'Pairing farmers & FPOs directly with verified corporate bulk buyers, streaming real-time transparent mandi price tickers, and delivering an explainable Sell Now vs Hold AI decision engine with digital escrow protection.'
};

export const UNIT_ECONOMICS = {
  avgTradeValue: 285000, // INR per transaction (approx 100 quintals)
  takeRateCommissionPct: 1.5, // 1.5% commission on completed trades
  avgTakeRateCommissionINR: 4275,
  fpoSaaSSubscriptionMonthly: 3999, // INR/month for demand forecast & corporate contract suite
  logisticsTakeRatePct: 2.0,
  grossMarginPct: 78.5,
  farmerPriceRealizationIncreasePct: 24.8, // +24.8% net income boost to farmers
  buyerProcurementCostSavingsPct: 12.5, // -12.5% cost reduction to bulk buyers
  paymentSettlementTimeHours: 4 // Compared to 15-45 days in traditional unorganized mandis
};

export const PITCH_METRICS: PitchMetric[] = [
  {
    title: 'Farmer Realization Uplift',
    value: '+24.8%',
    subtext: 'Direct vs local middleman distress sale',
    trend: 'Verified across 1,800+ pilot trades',
    isPositive: true
  },
  {
    title: 'Platform Take Rate',
    value: '1.5% - 2.0%',
    subtext: 'Escrow-backed commission on GMV',
    trend: 'DeHaat / Ninjacart proven model',
    isPositive: true
  },
  {
    title: 'Payment Settlement Time',
    value: '< 4 Hours',
    subtext: 'Digital Escrow + instant UPI/IMPS',
    trend: 'vs 15-45 days informal credit',
    isPositive: true
  },
  {
    title: 'FPO SaaS ARR Potential',
    value: '₹14.4 Cr',
    subtext: '3,000 FPOs @ ₹3,999/mo subscription',
    trend: '10,000+ target FPOs under PM-FPO Scheme',
    isPositive: true
  }
];

export const COMPETITOR_BENCHMARKS: CompetitorBenchmark[] = [
  {
    parameter: 'Price Discovery & Tickers',
    farmgate: 'Real-time multi-mandi arbitrage + transport net margin calculator',
    dehaat: 'Regional input center price list',
    ninjacart: 'Internal daily dynamic buying price',
    traditionalMandi: 'Opaque chalkboard / auction cartels'
  },
  {
    parameter: 'Sell vs Hold Decision AI',
    farmgate: 'Built-in EMA + ARIMA seasonality + perishability & warehouse loan simulator',
    dehaat: 'Manual field agronomist advice',
    ninjacart: 'Focuses on immediate 12h fresh produce fulfillment',
    traditionalMandi: 'Traders exploit farmer urgency to force distress sales'
  },
  {
    parameter: 'Direct Bulk Buyers',
    farmgate: 'Open RFQ marketplace for FMCG, Processors, Exporters & Retailers',
    dehaat: 'DeHaat proprietary procurement',
    ninjacart: 'Ninjacart B2B retailer supply',
    traditionalMandi: 'Restricted APMC commission agent license monopoly'
  },
  {
    parameter: 'Escrow & Trade Security',
    farmgate: 'Digital Escrow milestones + digital assaying grade verification',
    dehaat: 'Credit & input linkage',
    ninjacart: 'Centralized collection centers',
    traditionalMandi: 'Unsecured ledger (khata), bad debts & delayed cheques'
  },
  {
    parameter: 'FPO Demand Forecast Tier',
    farmgate: 'Paid SaaS tier with 90-day corporate procurement forecasting',
    dehaat: 'Physical DeHaat Center franchisee',
    ninjacart: 'Internal demand matching only',
    traditionalMandi: 'No forward demand visibility'
  }
];

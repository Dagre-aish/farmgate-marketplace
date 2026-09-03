import { MandiPriceRecord, BuyerRFQ } from '../types';

export interface ArbitrageOpportunity {
  mandiId: string;
  mandiName: string;
  state: string;
  distanceKm: number;
  modalPrice: number;
  estimatedTransportCostPerQtl: number;
  mandiCessAndLoadingPerQtl: number;
  netFarmerRealizationPerQtl: number;
  gainVsLocalTraderPerQtl: number;
  totalGainForLotINR: number;
  totalTransportCost?: number;
  netFarmerPayoutMandi?: number;
  extraFarmerProfit?: number;
  extraProfitPct?: number;
  bestOptionTag?: 'BEST_MANDI' | 'LOCAL_DISTRESS' | 'DIRECT_BUYER';
}

export function calculateMandiArbitrage(
  mandiInput: MandiPriceRecord | MandiPriceRecord[],
  villageTraderOfferPerQtl: number,
  quantityQuintals: number = 100,
  transportCostPerKmPerQtl: number = 1.8
): any {
  const mandiRecords = Array.isArray(mandiInput) ? mandiInput : [mandiInput];
  
  const opportunities = mandiRecords.map((mandi) => {
    if (!mandi) return null;
    const distanceKm = mandi.distanceKm || 25;
    const modalPrice = mandi.modalPrice || 2500;
    
    // Transport freight calculation
    const estimatedTransportCostPerQtl = Math.round(distanceKm * transportCostPerKmPerQtl);
    
    // APMC Mandi cess (approx 1.5%) + loading/unloading ₹15/qtl
    const mandiCessAndLoadingPerQtl = Math.round((modalPrice * 0.015) + 15);
    
    // Net realization at farmer hand
    const netFarmerRealizationPerQtl = modalPrice - estimatedTransportCostPerQtl - mandiCessAndLoadingPerQtl;
    
    // Gain vs Village trader
    const gainVsLocalTraderPerQtl = netFarmerRealizationPerQtl - villageTraderOfferPerQtl;
    const totalGainForLotINR = gainVsLocalTraderPerQtl * quantityQuintals;

    return {
      mandiId: mandi.id,
      mandiName: mandi.mandiName,
      state: mandi.state,
      distanceKm: distanceKm,
      modalPrice: modalPrice,
      estimatedTransportCostPerQtl,
      mandiCessAndLoadingPerQtl,
      netFarmerRealizationPerQtl,
      gainVsLocalTraderPerQtl,
      totalGainForLotINR,
      totalTransportCost: (estimatedTransportCostPerQtl + mandiCessAndLoadingPerQtl) * quantityQuintals,
      netFarmerPayoutMandi: netFarmerRealizationPerQtl * quantityQuintals,
      extraFarmerProfit: Math.max(0, totalGainForLotINR),
      extraProfitPct: villageTraderOfferPerQtl > 0 ? Math.round((gainVsLocalTraderPerQtl / villageTraderOfferPerQtl) * 100) : 0
    };
  }).filter((x): x is ArbitrageOpportunity => x !== null);

  if (!Array.isArray(mandiInput)) {
    return opportunities[0] || {
      mandiId: 'mandi_default',
      mandiName: 'APMC Mandi',
      state: 'MP',
      distanceKm: 25,
      modalPrice: 2500,
      estimatedTransportCostPerQtl: 45,
      mandiCessAndLoadingPerQtl: 52,
      netFarmerRealizationPerQtl: 2403,
      gainVsLocalTraderPerQtl: 103,
      totalGainForLotINR: 10300,
      totalTransportCost: 4500,
      netFarmerPayoutMandi: 240300,
      extraFarmerProfit: 10300,
      extraProfitPct: 4
    };
  }

  return opportunities.sort((a, b) => b.netFarmerRealizationPerQtl - a.netFarmerRealizationPerQtl);
}

export interface DirectBuyerVsMandiComparison {
  buyerRfq: BuyerRFQ;
  directPricePerQtl: number;
  platformFeePerQtl: number; // 1.5%
  netRealizationPerQtl: number;
  gainVsVillageTraderPerQtl: number;
  gainVsBestMandiPerQtl: number;
  totalAdditionalIncomeINR: number;
}

export function compareDirectBuyerToMandi(
  buyerRfq: BuyerRFQ,
  bestMandiNetPrice: number,
  villageTraderOffer: number,
  quantityQuintals: number = 100
): DirectBuyerVsMandiComparison {
  const directPricePerQtl = buyerRfq.targetPricePerQuintal;
  const platformFeePerQtl = Math.round(directPricePerQtl * 0.015);
  const netRealizationPerQtl = directPricePerQtl - platformFeePerQtl;
  
  const gainVsVillageTraderPerQtl = netRealizationPerQtl - villageTraderOffer;
  const gainVsBestMandiPerQtl = netRealizationPerQtl - bestMandiNetPrice;
  const totalAdditionalIncomeINR = gainVsVillageTraderPerQtl * quantityQuintals;

  return {
    buyerRfq,
    directPricePerQtl,
    platformFeePerQtl,
    netRealizationPerQtl,
    gainVsVillageTraderPerQtl,
    gainVsBestMandiPerQtl,
    totalAdditionalIncomeINR
  };
}

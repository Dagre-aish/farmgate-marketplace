import { MandiPriceRecord, BuyerRFQ } from '../types';
import { COMMODITIES } from '../data/commodities';
import { MANDI_RECORDS } from '../data/mandiData';
import { INITIAL_BUYER_RFQS } from '../data/buyerData';
import { calculateSellVsHoldPrediction } from './predictionEngine';

export interface VoiceNLPResponse {
  query: string;
  matchedIntent: 'PRICE_QUERY' | 'SELL_VS_HOLD' | 'BUYER_RFQ' | 'WAREHOUSE_LOAN' | 'ARBITRAGE' | 'FPO_QUERY' | 'GENERAL_HELP';
  spokenResponseHindi: string;
  spokenResponseEnglish: string;
  detectedCommodityId?: string;
  detectedMandiName?: string;
  actionTab: 'mandi' | 'advisor' | 'marketplace' | 'fpo';
  actionLabel: string;
  dataHighlight?: string;
}

// Commodity synonym mapping across Hindi, Hinglish, Marathi, and English
const COMMODITY_SYNONYMS: Record<string, string[]> = {
  wheat: ['wheat', 'गेहूं', 'गेंहू', 'gehu', 'gehun', 'sharbati', 'lokwan', 'कनक'],
  onion: ['onion', 'प्याज', 'कांदा', 'pyaj', 'pyaaz', 'kanda', 'lasalgaon onion'],
  tomato: ['tomato', 'टमाटर', 'tamatar', 'tamate', 'hybrid tomato'],
  soybean: ['soybean', 'सोयाबीन', 'soya', 'soyabean', 'soya bean'],
  cotton: ['cotton', 'कपास', 'रूई', 'ruii', 'kapas', 'shankar cotton'],
  chilli_red: ['chilli', 'chili', 'मिर्च', 'लाल मिर्च', 'mirchi', 'lal mirch', 'guntur teja', 'teja'],
  mustard: ['mustard', 'सरसों', 'राई', 'sarso', 'sarson', 'rai', 'rapeseed'],
  paddy_basmati: ['basmati', 'paddy', 'धान', 'चावल', 'dhan', 'chawal', 'rice', '1121', 'pusa'],
  potato: ['potato', 'आलू', 'बटाटा', 'aalu', 'aloo', 'batata'],
  tur_dal: ['tur', 'arhar', 'तुवर', 'अरहर', 'दाल', 'dal', 'tuvar', 'pigeon pea'],
  maize: ['maize', 'corn', 'मक्का', 'makka', 'bhutta'],
  chana: ['chana', 'gram', 'चना', 'छोला', 'desi chana', 'chickpea']
};

// Mandi synonym mapping
const MANDI_SYNONYMS: Record<string, string[]> = {
  'Indore Mandi': ['indore', 'इंदौर', 'indor'],
  'Khanna Grain Market': ['khanna', 'खन्ना', 'punjab', 'ludhiana'],
  'Lasalgaon Mandi': ['lasalgaon', 'लासलगांव', 'nashik', 'नासिक'],
  'Azadpur Mandi': ['azadpur', 'आजादपुर', 'delhi', 'दिल्ली'],
  'Guntur Mirchi Yard': ['guntur', 'गुंटूर', 'andhra'],
  'Kolar APMC': ['kolar', 'कोलार', 'bangalore', 'bengaluru'],
  'Agra Mandi': ['agra', 'आगरा', 'up', 'uttar pradesh'],
  'Dewas Mandi': ['dewas', 'देवास'],
  'Kota Mandi': ['kota', 'कोटा', 'rajasthan'],
  'Rajkot APMC': ['rajkot', 'राजकोट', 'gujarat'],
  'Alwar Mandi': ['alwar', 'अलवर'],
  'Neemuch Mandi': ['neemuch', 'नीमच']
};

export function processVoiceQuery(
  rawText: string,
  preferredLanguage: 'hi' | 'en' = 'hi'
): VoiceNLPResponse {
  const text = rawText.toLowerCase().trim();

  // 1. Extract Commodity
  let detectedCommodityId: string | undefined = undefined;
  for (const [commodityId, synonyms] of Object.entries(COMMODITY_SYNONYMS)) {
    if (synonyms.some((syn) => text.includes(syn))) {
      detectedCommodityId = commodityId;
      break;
    }
  }

  // 2. Extract Mandi
  let detectedMandiName: string | undefined = undefined;
  for (const [mandiName, synonyms] of Object.entries(MANDI_SYNONYMS)) {
    if (synonyms.some((syn) => text.includes(syn))) {
      detectedMandiName = mandiName;
      break;
    }
  }

  const commodity = COMMODITIES.find((c) => c.id === detectedCommodityId) || COMMODITIES[0];
  const mandi = (detectedMandiName
    ? MANDI_RECORDS.find((m) => m.mandiName.toLowerCase().includes(detectedMandiName!.toLowerCase()))
    : MANDI_RECORDS.find((m) => m.commodityId === (detectedCommodityId || 'wheat'))) || MANDI_RECORDS[0];

  // 3. Detect Intent

  // Intent: Sell vs Hold Advice
  if (
    text.includes('बेच') || text.includes('रोक') || text.includes('सलाह') ||
    text.includes('sell') || text.includes('hold') || text.includes('advice') ||
    text.includes('prediction') || text.includes('kab') || text.includes('when')
  ) {
    const prediction = calculateSellVsHoldPrediction(commodity, mandi, 100, 'wdra_accredited');

    let hindiReply = '';
    let engReply = '';

    if (prediction.recommendation === 'SELL_NOW') {
      hindiReply = `एआई मॉडल सलाह: ${commodity.name} को अभी बेचना उचित है। वर्तमान भाव ₹${mandi.modalPrice} प्रति क्विंटल है। आगामी दिनों में आवक बढ़ने से भाव पर दबाव आ सकता है।`;
      engReply = `AI Recommendation: Sell ${commodity.name} now. Current spot price is ₹${mandi.modalPrice}/quintal at ${mandi.mandiName}. Price pressure expected from incoming harvest arrivals.`;
    } else if (prediction.recommendation === 'PLEDGE_WAREHOUSE') {
      hindiReply = `एआई मॉडल सलाह: ${commodity.name} को गोदाम में रोक कर रखें। 15 दिनों में प्रति क्विंटल ₹${prediction.projectedPrice15d - mandi.modalPrice} की बढ़ोतरी अनुमानित है। आप इस पर 75% तक e-NWR लोन भी ले सकते हैं।`;
      engReply = `AI Recommendation: Hold ${commodity.name} in WDRA certified warehouse. Price is projected to increase by ₹${prediction.projectedPrice15d - mandi.modalPrice}/quintal in 15 days. You can also avail a 75% e-NWR pledge loan.`;
    } else {
      hindiReply = `एआई मॉडल सलाह: ${commodity.name} को 7 से 14 दिन रोक कर रखें। थोक खरीदारों की मांग बढ़ने से शुद्ध मुनाफा बढ़ सकता है।`;
      engReply = `AI Recommendation: Hold ${commodity.name} for 7-14 days to capture upcoming buyer demand and higher realization.`;
    }

    return {
      query: rawText,
      matchedIntent: 'SELL_VS_HOLD',
      spokenResponseHindi: hindiReply,
      spokenResponseEnglish: engReply,
      detectedCommodityId: commodity.id,
      detectedMandiName: mandi.mandiName,
      actionTab: 'advisor',
      actionLabel: `View ${commodity.name} AI Prediction`,
      dataHighlight: `${prediction.recommendation.replace('_', ' ')} • Projected ₹${prediction.projectedPrice15d}/qtl`
    };
  }

  // Intent: Buyer RFQs / Corporate Direct Demand
  if (
    text.includes('खरीदार') || text.includes('कंपनी') || text.includes('आईटीसी') || text.includes('रिलायंस') ||
    text.includes('buyer') || text.includes('order') || text.includes('rfq') || text.includes('itc') ||
    text.includes('reliance') || text.includes('adani') || text.includes('bigbasket')
  ) {
    const matchingRfq = INITIAL_BUYER_RFQS.find(
      (r) => r.commodityId === (detectedCommodityId || 'wheat')
    ) || INITIAL_BUYER_RFQS[0];

    const hindiReply = `${matchingRfq.buyerName} द्वारा ${matchingRfq.commodityName} की ₹${matchingRfq.targetPricePerQuintal} प्रति क्विंटल पर ${matchingRfq.requiredQuantityQuintals} क्विंटल की सीधी मांग उपलब्ध है। भुगतान 100% एस्क्रो सुरक्षित है।`;
    const engReply = `${matchingRfq.buyerName} has an active bulk RFQ for ${matchingRfq.requiredQuantityQuintals} quintals of ${matchingRfq.commodityName} at ₹${matchingRfq.targetPricePerQuintal}/quintal with 100% digital escrow payment.`;

    return {
      query: rawText,
      matchedIntent: 'BUYER_RFQ',
      spokenResponseHindi: hindiReply,
      spokenResponseEnglish: engReply,
      detectedCommodityId: matchingRfq.commodityId,
      actionTab: 'marketplace',
      actionLabel: `View ${matchingRfq.buyerName} RFQ`,
      dataHighlight: `Target Price ₹${matchingRfq.targetPricePerQuintal}/qtl • ${matchingRfq.requiredQuantityQuintals} qtl demand`
    };
  }

  // Intent: Warehouse Loan / e-NWR
  if (
    text.includes('लोन') || text.includes('कर्ज') || text.includes('वेयरहाउस') || text.includes('रसीद') ||
    text.includes('loan') || text.includes('enwr') || text.includes('pledge') || text.includes('storage loan')
  ) {
    const lotValuation = mandi.modalPrice * 100;
    const loanAmount = Math.round(lotValuation * 0.75);

    const hindiReply = `डब्लूडीआरए मान्यता प्राप्त गोदाम में 100 क्विंटल ${commodity.name} रखने पर 75% मूल्य यानी ₹${loanAmount.toLocaleString('en-IN')} का त्वरित बैंक लोन 7% वार्षिक ब्याज पर उपलब्ध है।`;
    const engReply = `By depositing 100 quintals of ${commodity.name} in a WDRA warehouse, you are eligible for an instant e-NWR pledge loan of ₹${loanAmount.toLocaleString('en-IN')} (75% LTV) at 7% annual interest.`;

    return {
      query: rawText,
      matchedIntent: 'WAREHOUSE_LOAN',
      spokenResponseHindi: hindiReply,
      spokenResponseEnglish: engReply,
      detectedCommodityId: commodity.id,
      actionTab: 'advisor',
      actionLabel: 'Apply for e-NWR Loan',
      dataHighlight: `₹${loanAmount.toLocaleString('en-IN')} instant loan @ 7% p.a.`
    };
  }

  // Intent: Arbitrage / Profit / Middleman comparison
  if (
    text.includes('मुनाफा') || text.includes('बिचौलिया') || text.includes('आर्बिट्राज') ||
    text.includes('profit') || text.includes('middleman') || text.includes('arbitrage')
  ) {
    const hindiReply = `फार्मगेट आर्बिट्राज कैलकुलेटर के अनुसार, गांव के स्थानीय दलाल की तुलना में पंजीकृत थोक खरीदार या सीधे मंडी में बेचने पर किसानों को औसतन 24.8% अधिक शुद्ध मुनाफा मिलता है।`;
    const engReply = `According to the Farmgate Arbitrage Calculator, farmers earn an average of 24.8% higher net realization by selling directly to verified bulk buyers compared to local village middlemen.`;

    return {
      query: rawText,
      matchedIntent: 'ARBITRAGE',
      spokenResponseHindi: hindiReply,
      spokenResponseEnglish: engReply,
      detectedCommodityId: commodity.id,
      actionTab: 'mandi',
      actionLabel: 'Open Mandi Arbitrage Calculator',
      dataHighlight: '+24.8% Higher Realization'
    };
  }

  // Intent: FPO & Group Pooling
  if (text.includes('fpo') || text.includes('समूह') || text.includes('संगठन') || text.includes('pool') || text.includes('group')) {
    const hindiReply = `FPO संगठन हब में किसान मिलकर 500 से 5000 क्विंटल का संयुक्त लॉट बना सकते हैं, जिससे भाड़े में 40% की बचत और कॉर्पोरेट कंपनियों से बेहतर दर मिलती है।`;
    const engReply = `In the FPO Hub, farmers can aggregate lots into full truckloads, saving up to 40% on freight and securing premium pricing from corporate processors.`;

    return {
      query: rawText,
      matchedIntent: 'FPO_QUERY',
      spokenResponseHindi: hindiReply,
      spokenResponseEnglish: engReply,
      actionTab: 'fpo',
      actionLabel: 'Explore FPO Enterprise Hub',
      dataHighlight: 'Save 40% Freight via Pooling'
    };
  }

  // Default Intent: Price Query
  const mspDelta = mandi.modalPrice - mandi.mspBenchmark;
  const isAboveMsp = mspDelta >= 0;

  const hindiReply = `${mandi.mandiName} में ${mandi.commodityName} का आज का मॉडल भाव ₹${mandi.modalPrice.toLocaleString('en-IN')} प्रति क्विंटल है। न्यूनतम भाव ₹${mandi.minPrice} और अधिकतम भाव ₹${mandi.maxPrice} है, जो सरकारी एमएसपी (₹${mandi.mspBenchmark}) से ${isAboveMsp ? `₹${mspDelta} अधिक` : `₹${Math.abs(mspDelta)} कम`} है।`;
  const engReply = `In ${mandi.mandiName}, the modal price for ${mandi.commodityName} today is ₹${mandi.modalPrice.toLocaleString('en-IN')}/quintal (Range: ₹${mandi.minPrice} - ₹${mandi.maxPrice}), which is ${isAboveMsp ? `₹${mspDelta} above` : `₹${Math.abs(mspDelta)} below`} the Govt MSP benchmark of ₹${mandi.mspBenchmark}.`;

  return {
    query: rawText,
    matchedIntent: 'PRICE_QUERY',
    spokenResponseHindi: hindiReply,
    spokenResponseEnglish: engReply,
    detectedCommodityId: commodity.id,
    detectedMandiName: mandi.mandiName,
    actionTab: 'mandi',
    actionLabel: `View ${mandi.mandiName} Details`,
    dataHighlight: `₹${mandi.modalPrice.toLocaleString('en-IN')}/qtl (${mandi.dailyChangePct >= 0 ? '+' : ''}${mandi.dailyChangePct}%)`
  };
}

import { AppLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  navMandiPrices: string;
  navSellOrHold: string;
  navMarketplace: string;
  navBiddingArena: string;
  navFPOSuite: string;
  navPitchDeck: string;
  roleFarmer: string;
  roleBuyer: string;
  roleFPO: string;
  rolePitch: string;
  liveMandiTicker: string;
  searchPlaceholder: string;
  sellNow: string;
  holdShort: string;
  pledgeWarehouse: string;
  directBuyers: string;
  escrowGuaranteed: string;
  createListing: string;
  postRFQ: string;
  voiceSearch: string;
  arbitrageFinder: string;
  netRealization: string;
  villageTraderPrice: string;
  additionalIncome: string;
  commissionFee: string;
  instantPayout: string;
  warehouseReceiptLoan: string;
  fpoDemandForecast: string;
  switchLanguage: string;
  
  // Additional comprehensive UI keys
  modalPrice: string;
  minPrice: string;
  maxPrice: string;
  dailyArrivals: string;
  mspBenchmark: string;
  viewArbitrage: string;
  selectForAI: string;
  allCrops: string;
  cereals: string;
  pulses: string;
  vegetables: string;
  oilseeds: string;
  spices: string;
  cashCrops: string;
  
  // Bidding Panel Keys
  liveBiddingFloor: string;
  currentTopBid: string;
  totalBids: string;
  escrowLocked: string;
  placeQuickBid: string;
  submitBid: string;
  leadingBidder: string;
  auctionClosesIn: string;
  acceptAndLockEscrow: string;
  
  // Advisor Keys
  aiDecisionStudio: string;
  holdingSimulator: string;
  whatIfHoldingDays: string;
  projectedPrice: string;
  storageCost: string;
  weightLossCost: string;
  netROIGain: string;
  applyEnwrLoan: string;
  
  // Marketplace & FPO Keys
  buyerOrders: string;
  farmerLots: string;
  requiredLot: string;
  targetPrice: string;
  maxMoisture: string;
  maxForeignMatter: string;
  deliveryLocation: string;
  fulfillOrder: string;
  placeBindingBid: string;
  instantBuy: string;
  fpoBatchPools: string;
  pooledQuantity: string;
  transportSavings: string;
  
  // Escrow & Auth Keys
  buyerLogin: string;
  escrowVault: string;
  tradeAgreement: string;
  weighbridgeSpecs: string;
  qualityAssayPassed: string;
  releasePayout: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    appName: 'Farmgate',
    tagline: 'Price Discovery & Direct-Buyer Agritech Marketplace',
    navMandiPrices: 'Mandi Discovery',
    navSellOrHold: 'AI Sell vs Hold',
    navMarketplace: 'Direct Bulk Buyers',
    navBiddingArena: 'Live Bidding Arena',
    navFPOSuite: 'FPO Enterprise',
    navPitchDeck: 'Pitch & Economics',
    roleFarmer: 'Farmer / Producer',
    roleBuyer: 'Bulk Enterprise Buyer',
    roleFPO: 'FPO Collective Admin',
    rolePitch: 'SIH26132 Pitch Mode',
    liveMandiTicker: 'LIVE APMC MANDI TICKER',
    searchPlaceholder: 'Search crop, mandi, buyer (e.g., Sharbati Wheat, Azadpur, ITC)...',
    sellNow: 'Sell Now',
    holdShort: 'Hold & Wait',
    pledgeWarehouse: 'Pledge in Warehouse (e-NWR Loan)',
    directBuyers: 'Verified Direct Buyers',
    escrowGuaranteed: '100% Escrow Protected',
    createListing: '+ List Crop Lot',
    postRFQ: '+ Post Bulk RFQ',
    voiceSearch: 'Voice Price Inquiry',
    arbitrageFinder: 'Mandi Arbitrage & Net Realization Calculator',
    netRealization: 'Net Farmer Realization',
    villageTraderPrice: 'Local Middleman Offer',
    additionalIncome: 'Extra Farmer Profit',
    commissionFee: '1.5% Platform Fee',
    instantPayout: 'Instant Escrow Settlement (<4h)',
    warehouseReceiptLoan: '75% e-NWR Warehouse Loan',
    fpoDemandForecast: 'FPO Demand Forecasts (90-Day Forward)',
    switchLanguage: 'Language',
    
    modalPrice: 'Modal Price',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    dailyArrivals: 'Daily Arrivals',
    mspBenchmark: 'Govt MSP Baseline',
    viewArbitrage: 'Calculate Net Margin',
    selectForAI: 'Analyze in AI Advisor',
    allCrops: 'All Crops',
    cereals: 'Cereals & Grains',
    pulses: 'Pulses & Dal',
    vegetables: 'Vegetables',
    oilseeds: 'Oilseeds',
    spices: 'Spices',
    cashCrops: 'Cash Crops',
    
    liveBiddingFloor: 'Real-Time Corporate Bidding Floor',
    currentTopBid: 'Current Highest Corporate Bid',
    totalBids: 'Total Bids',
    escrowLocked: 'Escrow Locked',
    placeQuickBid: 'One-Click Quick Bidding',
    submitBid: 'Submit Live Bid',
    leadingBidder: 'Leading Corporate Bidder',
    auctionClosesIn: 'Auction Closes In',
    acceptAndLockEscrow: 'Accept & Lock Escrow',
    
    aiDecisionStudio: 'AI "Sell Now vs Hold" Advisory Studio',
    holdingSimulator: 'What-If Holding Simulator',
    whatIfHoldingDays: 'Days to Hold',
    projectedPrice: 'Projected Price',
    storageCost: 'Storage Cost',
    weightLossCost: 'Moisture Weight Loss',
    netROIGain: 'Net ROI Profit Gain',
    applyEnwrLoan: 'Apply for 75% e-NWR Loan',
    
    buyerOrders: 'Corporate Buy Orders (RFQs)',
    farmerLots: 'Farmer Harvest Lots',
    requiredLot: 'Required Lot',
    targetPrice: 'Target Buyer Price',
    maxMoisture: 'Max Moisture',
    maxForeignMatter: 'Max Foreign Matter',
    deliveryLocation: 'Delivery Location',
    fulfillOrder: 'Fulfill Lot / Send Quote',
    placeBindingBid: 'Place Binding Corporate Bid',
    instantBuy: 'Instant Buy at Asking Price',
    fpoBatchPools: 'FPO Smallholder Batch Pools',
    pooledQuantity: 'Pooled Quantity',
    transportSavings: 'Logistics Savings',
    
    buyerLogin: 'Buyer Login / Select Entity',
    escrowVault: 'Escrow Vault',
    tradeAgreement: '5-Stage Smart Escrow Contract',
    weighbridgeSpecs: 'Digital Weighbridge Slip Specs',
    qualityAssayPassed: 'Digital Spectroscopy Passed',
    releasePayout: 'Release Direct UPI / Bank Payout'
  },
  hi: {
    appName: 'फार्मगेट (Farmgate)',
    tagline: 'मंडी भाव खोज एवं डायरेक्ट थोक खरीदार मंच',
    navMandiPrices: 'मंडी भाव',
    navSellOrHold: 'AI बेचें या रोकें',
    navMarketplace: 'थोक खरीदार (Direct RFQ)',
    navBiddingArena: 'लाइव बोली ऑक्शन',
    navFPOSuite: 'FPO संगठन हब',
    navPitchDeck: 'पिच व यूनिट इकोनॉमिक्स',
    roleFarmer: 'किसान / उत्पादक',
    roleBuyer: 'थोक कॉर्पोरेट खरीदार',
    roleFPO: 'FPO प्रबंधक',
    rolePitch: 'SIH26132 पिच मोड',
    liveMandiTicker: 'लाइव APMC मंडी भाव टिकर',
    searchPlaceholder: 'फसल, मंडी या खरीदार खोजें (जैसे गेहूं, आजादपुर, ITC)...',
    sellNow: 'अभी बेचें',
    holdShort: 'फसल रोक कर रखें',
    pledgeWarehouse: 'गोदाम में रखें + e-NWR लोन लें',
    directBuyers: 'सत्यापित थोक खरीदार',
    escrowGuaranteed: '100% एस्क्रो सुरक्षित भुगतान',
    createListing: '+ फसल लॉट बेचें',
    postRFQ: '+ थोक मांग (RFQ) डालें',
    voiceSearch: 'आवाज से भाव पूछें',
    arbitrageFinder: 'मंडी आर्बिट्राज एवं शुद्ध मुनाफा कैलकुलेटर',
    netRealization: 'किसान का शुद्ध मुनाफा',
    villageTraderPrice: 'गांव के बिचौलिए का भाव',
    additionalIncome: 'अतिरिक्त किसान मुनाफा',
    commissionFee: '1.5% प्लेटफॉर्म शुल्क',
    instantPayout: 'त्वरित एस्क्रो भुगतान (4 घंटे में)',
    warehouseReceiptLoan: '75% वेयरहाउस रसीद लोन',
    fpoDemandForecast: 'FPO मांग पूर्वानुमान (90 दिन)',
    switchLanguage: 'भाषा',
    
    modalPrice: 'मॉडल भाव',
    minPrice: 'न्यूनतम भाव',
    maxPrice: 'अधिकतम भाव',
    dailyArrivals: 'दैनिक आवक',
    mspBenchmark: 'सरकारी एमएसपी दर',
    viewArbitrage: 'शुद्ध मुनाफा गणना करें',
    selectForAI: 'AI सलाह देखें',
    allCrops: 'सभी फसलें',
    cereals: 'अनाज एवं खाद्यान्न',
    pulses: 'दालें एवं दलहन',
    vegetables: 'सब्जियां',
    oilseeds: 'तिलहन',
    spices: 'मसाले',
    cashCrops: 'नकदी फसलें',
    
    liveBiddingFloor: 'लाइव कॉर्पोरेट बोली मंच',
    currentTopBid: 'वर्तमान उच्चतम बोली',
    totalBids: 'कुल बोलियां',
    escrowLocked: 'एस्क्रो सुरक्षित',
    placeQuickBid: 'त्वरित बोली लगाएं',
    submitBid: 'बोली सबमिट करें',
    leadingBidder: 'प्रमुख कॉर्पोरेट खरीदार',
    auctionClosesIn: 'ऑक्शन समाप्त होने में समय',
    acceptAndLockEscrow: 'स्वीकार करें एवं एस्क्रो लॉक करें',
    
    aiDecisionStudio: 'AI "बेचें या रोकें" निर्णय केंद्र',
    holdingSimulator: 'फसल रोकने की होल्डिंग सिमुलेटर',
    whatIfHoldingDays: 'रोकने के दिन',
    projectedPrice: 'अनुमानित भाव',
    storageCost: 'भंडारण खर्च',
    weightLossCost: 'नमी वजन घटत',
    netROIGain: 'शुद्ध अतिरिक्त मुनाफा',
    applyEnwrLoan: '75% e-NWR लोन हेतु आवेदन करें',
    
    buyerOrders: 'कॉर्पोरेट थोक ऑर्डर्स (RFQs)',
    farmerLots: 'किसान फसल लॉट',
    requiredLot: 'आवश्यक मात्रा',
    targetPrice: 'खरीदार का लक्ष्य भाव',
    maxMoisture: 'अधिकतम नमी',
    maxForeignMatter: 'अधिकतम कचरा %',
    deliveryLocation: 'डिलीवरी स्थान',
    fulfillOrder: 'आर्डर पूरा करें / रेट भेजें',
    placeBindingBid: 'कॉर्पोरेट बोली सबमिट करें',
    instantBuy: 'किसान भाव पर तुरंत खरीदें',
    fpoBatchPools: 'FPO किसान समूह लॉट',
    pooledQuantity: 'एकत्रित मात्रा',
    transportSavings: 'भाड़ा बचत',
    
    buyerLogin: 'खरीदार लॉगिन / कंपनी चुनें',
    escrowVault: 'एस्क्रो वॉलेट',
    tradeAgreement: '5-स्तरीय स्मार्ट एस्क्रो अनुबंध',
    weighbridgeSpecs: 'डिजिटल धर्मकांटा slip विवरण',
    qualityAssay: 'डिजिटल गुणवत्ता जांच उत्तीर्ण',
    releasePayout: 'सीधा बैंक / UPI भुगतान जारी करें',
    qualityAssayPassed: 'डिजिटल गुणवत्ता जांच उत्तीर्ण'
  },
  mr: {
    appName: 'फार्मगेट (Farmgate)',
    tagline: 'बाजारभाव शोध आणि थेट खरेदीदार बाजारपेठ',
    navMandiPrices: 'बाजारभाव शोध',
    navSellOrHold: 'AI विका की साठवा',
    navMarketplace: 'थेट खरेदीदार (RFQ)',
    navBiddingArena: 'थेट लिलाव स्पर्धा',
    navFPOSuite: 'FPO डॅशबोर्ड',
    navPitchDeck: 'पिच आणि नफा गणित',
    roleFarmer: 'शेतकरी / उत्पादक',
    roleBuyer: 'थेट कंपनी खरेदीदार',
    roleFPO: 'FPO व्यवस्थापक',
    rolePitch: 'SIH26132 पिच',
    liveMandiTicker: 'थेट APMC बाजारभाव टिकर',
    searchPlaceholder: 'पीक, बाजार किंवा खरेदीदार शोधा (उदा. कांदा, लासलगाव, रिलायन्स)...',
    sellNow: 'आत्ताच विका',
    holdShort: 'साठवून ठेवा',
    pledgeWarehouse: 'गोदामात ठेवा + तारण कर्ज',
    directBuyers: 'प्रमाणित थेट खरेदीदार',
    escrowGuaranteed: '१००% एस्क्रो सुरक्षित',
    createListing: '+ पीक विक्री नोंदणी',
    postRFQ: '+ मागणी नोंदवा',
    voiceSearch: 'आवाजाने भाव विचारा',
    arbitrageFinder: 'बाजार नफा कॅल्क्युलेटर',
    netRealization: 'शेतकऱ्याला मिळणारा निव्वळ दर',
    villageTraderPrice: 'स्थानिक दलालाचा दर',
    additionalIncome: 'अतिरिक्त नफा',
    commissionFee: '१.५% कमिशन',
    instantPayout: 'त्वरित बँक खात्यात जमा (४ तासांत)',
    warehouseReceiptLoan: '७५% गोदामावर कर्ज (e-NWR)',
    fpoDemandForecast: 'FPO मागणी अंदाज (९० दिवस)',
    switchLanguage: 'भाषा',
    
    modalPrice: 'सरासरी भाव (Modal)',
    minPrice: 'कमीतकमी भाव',
    maxPrice: 'जास्तीत जास्त भाव',
    dailyArrivals: 'दैनंदिन आवक (क्विंटल)',
    mspBenchmark: 'शासकीय हमीभाव (MSP)',
    viewArbitrage: 'निव्वळ नफा मोजा',
    selectForAI: 'AI सल्ला पहा',
    allCrops: 'सर्व पिके',
    cereals: 'धान्य आणि अन्नधान्य',
    pulses: 'डाळी आणि कडधान्ये',
    vegetables: 'भाज्या व भाजीपाला',
    oilseeds: 'गळित धान्य (तिलहन)',
    spices: 'मसाले पिके',
    cashCrops: 'नगदी पिके',
    
    liveBiddingFloor: 'थेट कॉर्पोरेट लिलाव मंच',
    currentTopBid: 'सध्याची सर्वोच्च बोली',
    totalBids: 'एकूण बोल्या',
    escrowLocked: 'एस्क्रोमध्ये रक्कम सुरक्षित',
    placeQuickBid: 'एका क्लिकवर बोली लावा',
    submitBid: 'बोली सादर करा',
    leadingBidder: 'प्रमुख कंपनी खरेदीदार',
    auctionClosesIn: 'लिलाव संपण्यास वेळ',
    acceptAndLockEscrow: 'बोली स्वीकारा आणि एस्क्रो लॉक करा',
    
    aiDecisionStudio: 'AI "विका की साठवा" सल्ला केंद्र',
    holdingSimulator: 'साठवणूक नफा सिमुलेटर',
    whatIfHoldingDays: 'साठवणुकीचे दिवस',
    projectedPrice: 'अंदाजित बाजारभाव',
    storageCost: 'गोदाम भाडे खर्च',
    weightLossCost: 'वजन घट नुकसान',
    netROIGain: 'निव्वळ अतिरिक्त नफा',
    applyEnwrLoan: '७५% गोदाम पावती कर्जासाठी अर्ज करा',
    
    buyerOrders: 'कंपनी खरेदी मागण्या (RFQs)',
    farmerLots: 'शेतकरी पीक लॉट',
    requiredLot: 'आवश्यक प्रमाण (क्विंटल)',
    targetPrice: 'खरेदीदाराचा अपेक्षित दर',
    maxMoisture: 'जास्तीत जास्त ओलावा %',
    maxForeignMatter: 'कचरा / भेसळ %',
    deliveryLocation: 'मालाची डिलिव्हरी जागा',
    fulfillOrder: 'मागणी पूर्ण करा / दर पाठवा',
    placeBindingBid: 'अधिकृत बोली लावा',
    instantBuy: 'शेतकऱ्याच्या दराने थेट खरेदी करा',
    fpoBatchPools: 'FPO शेतकरी गट एकत्रित लॉट',
    pooledQuantity: 'एकत्रित प्रमाण',
    transportSavings: 'वाहतूक खर्च बचत',
    
    buyerLogin: 'खरेदीदार लॉगिन / कंपनी निवडा',
    escrowVault: 'एस्क्रो वॉलेट',
    tradeAgreement: '५-टक्केनिहाय डिजिटल एस्क्रो करार',
    weighbridgeSpecs: 'डिजिटल वजन पावती तपशील',
    qualityAssayPassed: 'डिजिटल गुणवत्ता तपासणी मंजूर',
    releasePayout: 'थेट UPI / बँक खात्यात पैसे जमा करा'
  },
  pa: {
    appName: 'ਫਾਰਮਗੇਟ (Farmgate)',
    tagline: 'ਮੰਡੀ ਭਾਅ ਖੋਜ ਅਤੇ ਸਿੱਧੇ ਖਰੀਦਦਾਰ ਮੰਚ',
    navMandiPrices: 'ਮੰਡੀ ਭਾਅ',
    navSellOrHold: 'AI ਵੇਚੋ ਜਾਂ ਰੋਕੋ',
    navMarketplace: 'ਸਿੱਧੇ ਖਰੀਦਦਾਰ',
    navBiddingArena: 'ਲਾਈਵ ਬੋਲੀ ਅਖਾੜਾ',
    navFPOSuite: 'FPO ਐਂਟਰਪ੍ਰਾਈਜ਼',
    navPitchDeck: 'ਪਿੱਚ ਅਤੇ ਮਾਡਲ',
    roleFarmer: 'ਕਿਸਾਨ / ਉਤਪਾਦਕ',
    roleBuyer: 'ਕਾਰਪੋਰੇਟ ਖਰੀਦਦਾਰ',
    roleFPO: 'FPO ਪ੍ਰਬੰਧਕ',
    rolePitch: 'SIH26132 ਪਿੱਚ',
    liveMandiTicker: 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ ਟਿਕਰ',
    searchPlaceholder: 'ਫਸਲ, ਮੰਡੀ ਜਾਂ ਖਰੀਦਦਾਰ ਲੱਭੋ (ਜਿਵੇਂ ਕਣਕ, ਖੰਨਾ ਮੰਡੀ, ITC)...',
    sellNow: 'ਹੁਣੇ ਵੇਚੋ',
    holdShort: 'ਰੋਕ ਕੇ ਰੱਖੋ',
    pledgeWarehouse: 'ਗੋਦਾਮ ਵਿੱਚ ਰੱਖੋ + ਕਰਜ਼ਾ ਲਵੋ',
    directBuyers: 'ਵੈਰੀਫਾਈਡ ਬਲਕ ਖਰੀਦਦਾਰ',
    escrowGuaranteed: '100% ਐਸਕਰੋ ਸੁਰੱਖਿਅਤ',
    createListing: '+ ਫਸਲ ਵੇਚਣ ਲਈ ਪਾਓ',
    postRFQ: '+ ਨਵੀਂ ਮੰਗ ਪਾਓ',
    voiceSearch: 'ਬੋਲ ਕੇ ਭਾਅ ਪੁੱਛੋ',
    arbitrageFinder: 'ਮੰਡੀ ਮੁਨਾਫਾ ਕੈਲਕੁਲੇਟਰ',
    netRealization: 'ਕਿਸਾਨ ਨੂੰ ਸ਼ੁੱਧ ਭਾਅ',
    villageTraderPrice: 'ਪਿੰਡ ਦੇ ਵਿਚੋਲੇ ਦਾ ਭਾਅ',
    additionalIncome: 'ਵਾਧੂ ਮੁਨਾਫਾ',
    commissionFee: '1.5% ਪਲੇਟਫਾਰਮ ਫੀਸ',
    instantPayout: 'ਤੁਰੰਤ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਭੁਗਤਾਨ',
    warehouseReceiptLoan: '75% ਵੇਅਰਹਾਊਸ ਕਰਜ਼ਾ',
    fpoDemandForecast: 'FPO ਮੰਗ ਅਨੁਮਾਨ',
    switchLanguage: 'ਭਾਸ਼ਾ',
    
    modalPrice: 'ਮਾਡਲ ਭਾਅ',
    minPrice: 'ਘੱਟੋ ਘੱਟ ਭਾਅ',
    maxPrice: 'ਵੱਧ ਤੋਂ ਵੱਧ ਭਾਅ',
    dailyArrivals: 'ਰੋਜ਼ਾਨਾ ਆਮਦ',
    mspBenchmark: 'ਸਰਕਾਰੀ ਐਮ.ਐਸ.ਪੀ.',
    viewArbitrage: 'ਸ਼ੁੱਧ ਮੁਨਾਫਾ ਗਿਣੋ',
    selectForAI: 'AI ਸਲਾਹ ਵੇਖੋ',
    allCrops: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
    cereals: 'ਅਨਾਜ',
    pulses: 'ਦਾਲਾਂ',
    vegetables: 'ਸਬਜ਼ੀਆਂ',
    oilseeds: 'ਤੇਲਬੀਜ',
    spices: 'ਮਸਾਲੇ',
    cashCrops: 'ਨਕਦੀ ਫਸਲਾਂ',
    
    liveBiddingFloor: 'ਲਾਈਵ ਕਾਰਪੋਰੇਟ ਬੋਲੀ ਮੰਚ',
    currentTopBid: 'ਮੌਜੂਦਾ ਸਭ ਤੋਂ ਵੱਡੀ ਬੋਲੀ',
    totalBids: 'ਕੁਲ ਬੋਲੀਆਂ',
    escrowLocked: 'ਐਸਕਰੋ ਸੁਰੱਖਿਅਤ',
    placeQuickBid: 'ਤੁਰੰਤ ਬੋਲੀ ਲਗਾਓ',
    submitBid: 'ਬੋਲੀ ਸਬਮਿਟ ਕਰੋ',
    leadingBidder: 'ਮੁੱਖ ਕਾਰਪੋਰੇਟ ਖਰੀਦਦਾਰ',
    auctionClosesIn: 'ਬੋਲੀ ਖਤਮ ਹੋਣ ਵਿੱਚ ਸਮਾਂ',
    acceptAndLockEscrow: 'ਬੋਲੀ ਮਨਜ਼ੂਰ ਕਰੋ ਅਤੇ ਐਸਕਰੋ ਲਾਕ ਕਰੋ',
    
    aiDecisionStudio: 'AI "ਵੇਚੋ ਜਾਂ ਰੋਕੋ" ਫੈਸਲਾ ਕੇਂਦਰ',
    holdingSimulator: 'ਫਸਲ ਰੋਕਣ ਦਾ ਮੁਨਾਫਾ ਸਿਮੂਲੇਟਰ',
    whatIfHoldingDays: 'ਰੋਕਣ ਦੇ ਦਿਨ',
    projectedPrice: 'ਅਨੁਮਾਨਿਤ ਭਾਅ',
    storageCost: 'ਗੋਦਾਮ ਖਰਚਾ',
    weightLossCost: 'ਨਮੀ ਘਾਟਾ',
    netROIGain: 'ਸ਼ੁੱਧ ਵਾਧੂ ਮੁਨਾਫਾ',
    applyEnwrLoan: '75% ਗੋਦਾਮ ਰਸੀਦ ਕਰਜ਼ੇ ਲਈ ਅਰਜ਼ੀ ਦੇਵੋ',
    
    buyerOrders: 'ਕਾਰਪੋਰੇਟ ਖਰੀਦ ਮੰਗਾਂ (RFQs)',
    farmerLots: 'ਕਿਸਾਨ ਫਸਲ ਲੋਟ',
    requiredLot: 'ਲੋੜੀਂਦੀ ਮਾਤਰਾ',
    targetPrice: 'ਖਰੀਦਦਾਰ ਦਾ ਭਾਅ',
    maxMoisture: 'ਵੱਧ ਤੋਂ ਵੱਧ ਨਮੀ',
    maxForeignMatter: 'ਕਚਰਾ %',
    deliveryLocation: 'ਡਿਲੀਵਰੀ ਸਥਾਨ',
    fulfillOrder: 'ਆਰਡਰ ਪੂਰਾ ਕਰੋ',
    placeBindingBid: 'ਬੋਲੀ ਪਾਓ',
    instantBuy: 'ਕਿਸਾਨ ਭਾਅ ਤੇ ਤੁਰੰਤ ਖਰੀਦੋ',
    fpoBatchPools: 'FPO ਕਿਸਾਨ ਸਮੂਹ',
    pooledQuantity: 'ਇਕੱਠੀ ਮਾਤਰਾ',
    transportSavings: 'ਕਿਰਾਇਆ ਬੱਚਤ',
    
    buyerLogin: 'ਖਰੀਦਦਾਰ ਲੌਗਇਨ',
    escrowVault: 'ਐਸਕਰੋ ਵਾਲਟ',
    tradeAgreement: '5-ਪੜਾਅ ਐਸਕਰੋ ਇਕਰਾਰਨਾਮਾ',
    weighbridgeSpecs: 'ਡਿਜੀਟਲ ਕੰਡਾ ਪਰਚੀ',
    qualityAssayPassed: 'ਗੁਣਵੱਤਾ ਜਾਂਚ ਪਾਸ',
    releasePayout: 'ਤੁਰੰਤ ਬੈਂਕ ਭੁਗਤਾਨ ਜਾਰੀ ਕਰੋ'
  },
  te: {
    appName: 'ఫామ్‌గేట్ (Farmgate)',
    tagline: 'ధరల గుర్తింపు & ప్రత్యక్ష కొనుగోలుదారుల వేదిక',
    navMandiPrices: 'మార్కెట్ ధరలు',
    navSellOrHold: 'AI అమ్మాలా లేదా దాచాలా',
    navMarketplace: 'బల్క్ కొనుగోలుదారులు',
    navBiddingArena: 'లైవ్ బిడ్డింగ్ వేదిక',
    navFPOSuite: 'FPO సూట్',
    navPitchDeck: 'పిచ్ మరియు బిజినెస్ మోడల్',
    roleFarmer: 'రైతు / ఉత్పత్తిదారు',
    roleBuyer: 'కార్పొరేట్ కొనుగోలుదారు',
    roleFPO: 'FPO అడ్మిన్',
    rolePitch: 'SIH26132 పిచ్',
    liveMandiTicker: 'లైవ్ మార్కెట్ ధరలు',
    searchPlaceholder: 'పంట, మార్కెట్ లేదా కొనుగోలుదారుని శోధించండి (ఉదా. మిర్చి, గుంటూరు)...',
    sellNow: 'ఇప్పుడే అమ్మండి',
    holdShort: 'వేచి ఉండండి',
    pledgeWarehouse: 'గోదాములో నిల్వ + లోన్ పొందండి',
    directBuyers: 'ధృవీకరించబడిన కొనుగోలుదారులు',
    escrowGuaranteed: '100% ఎస్క్రో భద్రత',
    createListing: '+ పంట లాట్ అమ్మండి',
    postRFQ: '+ కొత్త ఆర్డర్ పోస్ట్ చేయండి',
    voiceSearch: 'వాయిస్ ద్వారా ధర తెలుసుకోండి',
    arbitrageFinder: 'మార్కెట్ లాభాల కాలిక్యులేటర్',
    netRealization: 'రైతు నికర ఆదాయం',
    villageTraderPrice: 'స్థానిక దళారి ధర',
    additionalIncome: 'అదనపు రైతు లాభం',
    commissionFee: '1.5% ప్లాట్‌ఫారమ్ ఫీజు',
    instantPayout: 'తక్షణ చెల్లింపు (<4 గంటల్లో)',
    warehouseReceiptLoan: '75% గోదాము రసీదు రుణం',
    fpoDemandForecast: 'FPO డిమాండ్ అంచనాలు',
    switchLanguage: 'భాష',
    
    modalPrice: 'సగటు ధర (Modal)',
    minPrice: 'కనీస ధర',
    maxPrice: 'గరిష్ట ధర',
    dailyArrivals: 'రోజువారీ దిగుమతి',
    mspBenchmark: 'ప్రభుత్వ మద్దతు ధర (MSP)',
    viewArbitrage: 'లాభం లెక్కించండి',
    selectForAI: 'AI సలహా చూడండి',
    allCrops: 'అన్ని పంటలు',
    cereals: 'ధాన్యాలు',
    pulses: 'పప్పుధాన్యాలు',
    vegetables: 'కూరగాయలు',
    oilseeds: 'నూనె గింజలు',
    spices: 'సుగంధ ద్రవ్యాలు',
    cashCrops: 'వాణిజ్య పంటలు',
    
    liveBiddingFloor: 'లైవ్ కార్పొరేట్ బిడ్డింగ్ రంగాన్ని',
    currentTopBid: 'ప్రస్తుత అత్యధిక బిడ్',
    totalBids: 'మొత్తం బిడ్లు',
    escrowLocked: 'ఎస్క్రో సురక్షితం',
    placeQuickBid: 'త్వరిత బిడ్ వేయండి',
    submitBid: 'బిడ్ సమర్పించండి',
    leadingBidder: 'ప్రధాన కొనుగోలుదారు',
    auctionClosesIn: 'వేలం ముగిసే సమయం',
    acceptAndLockEscrow: 'బిడ్ అంగీకరించి ఎస్క్రో లాక్ చేయండి',
    
    aiDecisionStudio: 'AI సలహా కేంద్రం',
    holdingSimulator: 'నిల్వ లాభాల సిమ్యులేటర్',
    whatIfHoldingDays: 'నిల్వ ఉండే రోజులు',
    projectedPrice: 'అంచనా వేసిన ధర',
    storageCost: 'గోదాము అద్దె',
    weightLossCost: 'తేమ తగ్గుదల నష్టం',
    netROIGain: 'నికర అదనపు లాభం',
    applyEnwrLoan: '75% గోదాము రసీదు రుణం పొందండి',
    
    buyerOrders: 'కార్పొరేట్ ఆర్డర్లు (RFQs)',
    farmerLots: 'రైతు పంట లాట్లు',
    requiredLot: 'కావలసిన పరిమాణం',
    targetPrice: 'కొనుగోలుదారు ధర',
    maxMoisture: 'గరిష్ట తేమ %',
    maxForeignMatter: 'చెత్త %',
    deliveryLocation: 'డెలివరీ ప్రాంతం',
    fulfillOrder: 'ఆర్డర్ పూర్తీ చేయండి',
    placeBindingBid: 'బిడ్ వేయండి',
    instantBuy: 'రైతు ధరకు వెంటనే కొనండి',
    fpoBatchPools: 'FPO రైతు గ్రూపులు',
    pooledQuantity: 'సేకరించిన పరిమాణం',
    transportSavings: 'రవాణా ఆదా',
    
    buyerLogin: 'లాగిన్ చేయండి',
    escrowVault: 'ఎస్క్రో వాలెట్',
    tradeAgreement: '5-దశల ఎస్క్రో ఒప్పందం',
    weighbridgeSpecs: 'డిజిటల్ వెయింగ్ స్లిప్',
    qualityAssayPassed: 'నాణ్యత తనిఖీ పూర్తయింది',
    releasePayout: 'తక్షణ బ్యాంక్ చెల్లింపు విడుదల చేయండి'
  }
};

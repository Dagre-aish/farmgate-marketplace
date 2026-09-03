import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Warehouse, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  HelpCircle, 
  ArrowRight, 
  Coins, 
  Sparkles,
  Building,
  Scale,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Percent
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  ReferenceLine 
} from 'recharts';
import { Commodity, MandiPriceRecord, StorageType, AppLanguage } from '../types';
import { COMMODITIES } from '../data/commodities';
import { calculateSellVsHoldPrediction } from '../services/predictionEngine';
import { TRANSLATIONS } from '../services/i18n';

interface SellOrHoldAdvisorProps {
  mandiRecords: MandiPriceRecord[];
  selectedCommodityId?: string;
  onDirectMarketplace: (commodityId: string) => void;
  onOpenNewListing: (commodityId: string) => void;
  language?: AppLanguage;
}

export const SellOrHoldAdvisor: React.FC<SellOrHoldAdvisorProps> = ({
  mandiRecords,
  selectedCommodityId,
  onDirectMarketplace,
  onOpenNewListing,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];

  const [activeCommodityId, setActiveCommodityId] = useState<string>(
    selectedCommodityId || 'wheat'
  );
  const [harvestQuantity, setHarvestQuantity] = useState<number>(150);
  const [selectedStorage, setSelectedStorage] = useState<StorageType>('wdra_accredited');
  const [holdingDaysSlider, setHoldingDaysSlider] = useState<number>(14);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loanApplied, setLoanApplied] = useState<boolean>(false);

  const selectedCommodity = useMemo(() => {
    return COMMODITIES.find((c) => c.id === activeCommodityId) || COMMODITIES[0];
  }, [activeCommodityId]);

  const matchingMandi = useMemo(() => {
    return mandiRecords.find((m) => m.commodityId === activeCommodityId) || mandiRecords[0];
  }, [mandiRecords, activeCommodityId]);

  // AI Prediction
  const prediction = useMemo(() => {
    return calculateSellVsHoldPrediction(
      selectedCommodity,
      matchingMandi,
      harvestQuantity,
      selectedStorage
    );
  }, [selectedCommodity, matchingMandi, harvestQuantity, selectedStorage]);

  // Dynamic Simulator projection
  const currentLotValuation = matchingMandi.modalPrice * harvestQuantity;
  const holdingDayRate = (prediction.projectedPrice30d - matchingMandi.modalPrice) / 30;
  const simulatedPricePerQtl = Math.round(matchingMandi.modalPrice + holdingDayRate * holdingDaysSlider);
  const simulatedGrossValue = simulatedPricePerQtl * harvestQuantity;
  const simulatedStorageCost = Math.round((selectedCommodity.warehouseCostPerMonth / 30) * holdingDaysSlider * harvestQuantity);
  const simulatedWeightLoss = Math.round((currentLotValuation * (selectedCommodity.ambientWeightLossPerMonthPct / 100) / 30) * holdingDaysSlider);
  const simulatedNetGain = (simulatedGrossValue - simulatedStorageCost - simulatedWeightLoss) - currentLotValuation;

  // Chart data
  const simulationChartData = useMemo(() => {
    const points = [];
    for (let day = 0; day <= 30; day += 5) {
      const priceAtDay = Math.round(matchingMandi.modalPrice + holdingDayRate * day);
      const grossVal = priceAtDay * harvestQuantity;
      const sCost = Math.round((selectedCommodity.warehouseCostPerMonth / 30) * day * harvestQuantity);
      const wLoss = Math.round((currentLotValuation * (selectedCommodity.ambientWeightLossPerMonthPct / 100) / 30) * day);
      const netGain = (grossVal - sCost - wLoss) - currentLotValuation;

      points.push({
        day: `Day ${day}`,
        price: priceAtDay,
        netGain: Math.max(0, netGain),
        storageCost: sCost + wLoss
      });
    }
    return points;
  }, [matchingMandi, holdingDayRate, harvestQuantity, selectedCommodity, currentLotValuation]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <BrainCircuit className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Factor Agritech Time-Series Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.aiDecisionStudio}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Prevents distress sales by calculating arrival volume spikes, crop perishability degradation, daily warehouse rent, and e-NWR loan eligibility.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="text-emerald-400 font-bold block">Current Crop Analysis:</span>
            <div className="flex justify-between text-slate-300">
              <span>Selected Crop:</span>
              <strong className="text-white">{selectedCommodity.name}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Benchmark APMC Mandi:</span>
              <strong className="text-white">{matchingMandi.mandiName}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Commodity Switcher Ribbon */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
          Select Crop for Predictive Decision Analysis:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {COMMODITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCommodityId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeCommodityId === c.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main AI Prediction Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recommendation Main Box (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border-2 border-emerald-500/40 shadow-xl space-y-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-xl text-slate-900">{selectedCommodity.name}</h2>
                <span className="text-xs text-slate-500">({matchingMandi.mandiName})</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Government MSP Baseline: <strong className="text-slate-800 font-mono">₹{matchingMandi.mspBenchmark}/qtl</strong>
              </p>
            </div>

            {/* Recommendation Badge */}
            <div className={`px-4 py-2 rounded-xl text-center shadow-xs shrink-0 ${
              prediction.recommendation === 'SELL_NOW'
                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
            }`}>
              <span className="text-[10px] uppercase font-bold tracking-wider block text-slate-600">AI Recommendation</span>
              <span className="font-black text-sm block">
                {prediction.recommendation === 'SELL_NOW' && t.sellNow}
                {prediction.recommendation === 'HOLD_SHORT' && t.holdShort}
                {prediction.recommendation === 'PLEDGE_WAREHOUSE' && t.pledgeWarehouse}
              </span>
            </div>
          </div>

          {/* Key Headline & Confidence Score */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>AI Confidence Score: {prediction.confidencePct}%</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Risk: {prediction.riskFactor}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              "{prediction.headline}"
            </p>
          </div>

          {/* Key Decision Drivers */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Key Decision Drivers:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prediction.keyDrivers.map((driver, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{driver}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onOpenNewListing(selectedCommodity.id)}
              className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all text-center shadow-sm"
            >
              {t.createListing} (₹{matchingMandi.modalPrice}/qtl)
            </button>
            <button
              onClick={() => onDirectMarketplace(selectedCommodity.id)}
              className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-all text-center border border-slate-200"
            >
              {t.buyerOrders}
            </button>
          </div>
        </div>

        {/* e-NWR Warehouse Receipt Loan Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-amber-400/40 pb-3">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-slate-950" />
              <h3 className="font-extrabold text-base text-slate-950">{t.warehouseReceiptLoan}</h3>
            </div>
            <span className="bg-slate-950 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded">
              75% LTV @ 7% p.a.
            </span>
          </div>

          <p className="text-xs text-slate-950 leading-relaxed font-medium">
            Deposit harvest in a WDRA accredited warehouse to get an instant 75% loan from SBI or Bank of Baroda. Avoid distress sales while holding for higher prices!
          </p>

          <div className="bg-slate-950/90 text-white p-4 rounded-xl space-y-2 border border-slate-800 font-mono text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Lot Value ({harvestQuantity} qtl):</span>
              <span className="font-bold text-white">₹{currentLotValuation.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Max Bank Loan (75% LTV):</span>
              <span className="font-black text-amber-400 text-sm">
                ₹{Math.round(currentLotValuation * 0.75).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-slate-400 text-[10px]">
              <span>Annual Interest Rate:</span>
              <span>7.0% p.a. (NABARD Subvention)</span>
            </div>
          </div>

          <button
            onClick={() => {
              setShowLoanModal(true);
              setLoanApplied(true);
            }}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{loanApplied ? 'Loan Application Submitted' : t.applyEnwrLoan}</span>
          </button>
        </div>

      </div>

      {/* Interactive What-If Holding Simulator */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">{t.holdingSimulator}</h3>
            <p className="text-xs text-slate-500">
              Drag holding duration slider to see net profit after daily storage fees and weight loss
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">{t.whatIfHoldingDays}:</span>
            <span className="font-black text-emerald-700 text-sm font-mono">{holdingDaysSlider} Days</span>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={holdingDaysSlider}
            onChange={(e) => setHoldingDaysSlider(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Day 0 (Sell Today)</span>
            <span>Day 15</span>
            <span>Day 30 (Max Storage)</span>
          </div>
        </div>

        {/* Dynamic Simulator Results Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">{t.projectedPrice}</span>
            <span className="font-black text-slate-900 text-sm">₹{simulatedPricePerQtl}/qtl</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">{t.storageCost}</span>
            <span className="font-bold text-rose-700">₹{simulatedStorageCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block font-sans">{t.weightLossCost}</span>
            <span className="font-bold text-amber-700">₹{simulatedWeightLoss.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-800 font-bold block font-sans">{t.netROIGain}</span>
            <span className="font-black text-emerald-900 text-sm">+₹{Math.max(0, simulatedNetGain).toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Dual Axis Chart */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={simulationChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis yAxisId="left" stroke="#10b981" fontSize={11} domain={['dataMin - 50', 'dataMax + 50']} />
              <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line yAxisId="left" type="monotone" dataKey="price" name="Projected Price (₹/qtl)" stroke="#10b981" strokeWidth={3} />
              <Bar yAxisId="right" dataKey="netGain" name="Net ROI Gain (₹)" fill="#059669" radius={[4, 4, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  TrendingUp, 
  MapPin, 
  Truck, 
  ShieldAlert, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Calculator,
  ChevronRight,
  Info,
  Clock,
  CircleDollarSign
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { Commodity, MandiPriceRecord, CommodityCategory, AppLanguage } from '../types';
import { COMMODITIES } from '../data/commodities';
import { MANDI_RECORDS } from '../data/mandiData';
import { calculateMandiArbitrage } from '../services/arbitrageCalculator';
import { TRANSLATIONS } from '../services/i18n';

interface MandiPriceHubProps {
  mandiRecords: MandiPriceRecord[];
  onSelectForAdvisor: (commodityId: string) => void;
  onDirectMarketplace: (commodityId: string) => void;
  language?: AppLanguage;
}

export const MandiPriceHub: React.FC<MandiPriceHubProps> = ({
  mandiRecords = MANDI_RECORDS,
  onSelectForAdvisor,
  onDirectMarketplace,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory | 'All'>('All');
  const [selectedMandiId, setSelectedMandiId] = useState<string>(
    mandiRecords.length > 0 ? mandiRecords[0].id : 'mandi_1'
  );
  const [villageTraderPrice, setVillageTraderPrice] = useState<number>(2300);
  const [lotQuantity, setLotQuantity] = useState<number>(100);
  const [transportRatePerKm, setTransportRatePerKm] = useState<number>(1.8);

  const categoryLabels: Record<string, string> = {
    All: t.allCrops,
    Cereals: t.cereals,
    Pulses: t.pulses,
    Vegetables: t.vegetables,
    Oilseeds: t.oilseeds,
    Spices: t.spices
  };

  const categories: (CommodityCategory | 'All')[] = [
    'All',
    'Cereals',
    'Vegetables',
    'Oilseeds',
    'Pulses',
    'Spices'
  ];

  // Safe active mandi resolution (never undefined)
  const activeMandi = useMemo(() => {
    const records = mandiRecords.length > 0 ? mandiRecords : MANDI_RECORDS;
    return records.find((m) => m.id === selectedMandiId) || records[0] || MANDI_RECORDS[0];
  }, [mandiRecords, selectedMandiId]);

  // Filtered mandi records
  const filteredRecords = useMemo(() => {
    const records = mandiRecords.length > 0 ? mandiRecords : MANDI_RECORDS;
    return records.filter((record) => {
      const matchesSearch = 
        (record.commodityName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.mandiName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.district || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.state || '').toLowerCase().includes(searchQuery.toLowerCase());

      const commodity = COMMODITIES.find((c) => c.id === record.commodityId);
      const matchesCategory = 
        selectedCategory === 'All' || (commodity && commodity.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [mandiRecords, searchQuery, selectedCategory]);

  const activeCommodity = useMemo(() => {
    return COMMODITIES.find((c) => c.id === activeMandi.commodityId) || COMMODITIES[0];
  }, [activeMandi]);

  // Arbitrage calculation with safe fallbacks
  const arbitrage = useMemo(() => {
    return calculateMandiArbitrage(
      activeMandi,
      villageTraderPrice,
      lotQuantity,
      transportRatePerKm
    );
  }, [activeMandi, villageTraderPrice, lotQuantity, transportRatePerKm]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/50 text-emerald-200 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Real-Time APMC Mandi Feeds • e-NAM Benchmarks</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.navMandiPrices} & Arbitrage Intelligence
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Compare live daily APMC modal prices across 3,000+ mandis. Eliminate middleman discounts by calculating net realization after freight & APMC cess.
            </p>
          </div>

          <div className="lg:col-span-4 bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/30 space-y-2 text-xs">
            <span className="text-emerald-300 font-bold block">{t.liveMandiTicker} Summary:</span>
            <div className="flex justify-between text-slate-200">
              <span>Tracked APMC Mandis:</span>
              <strong className="text-white font-mono">{mandiRecords.length} Active</strong>
            </div>
            <div className="flex justify-between text-slate-200">
              <span>Government MSP Baselines:</span>
              <strong className="text-emerald-400 font-mono">100% Updated</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((mandi) => {
          const isSelected = mandi.id === activeMandi.id;
          const mspDelta = (mandi.modalPrice || 0) - (mandi.mspBenchmark || 0);
          const isAboveMsp = mspDelta >= 0;

          return (
            <div
              key={mandi.id}
              onClick={() => {
                setSelectedMandiId(mandi.id);
                setVillageTraderPrice(Math.round((mandi.modalPrice || 2500) * 0.85));
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900">{mandi.commodityName}</h3>
                    {language !== 'en' && activeCommodity?.hindiName && (
                      <span className="text-[11px] text-slate-500 font-medium">({activeCommodity.hindiName})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{mandi.mandiName}, {mandi.district}</span>
                  </div>
                </div>

                <span className={`inline-flex items-center text-xs font-extrabold px-2 py-0.5 rounded-full ${
                  (mandi.dailyChangePct || 0) >= 0 ? 'text-emerald-800 bg-emerald-100' : 'text-rose-800 bg-rose-100'
                }`}>
                  {(mandi.dailyChangePct || 0) >= 0 ? '+' : ''}{mandi.dailyChangePct || 0}%
                </span>
              </div>

              {/* Price Row */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 grid grid-cols-3 gap-2 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">{t.modalPrice}</span>
                  <span className="font-extrabold text-sm text-slate-900">₹{(mandi.modalPrice || 0).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">{t.minPrice}</span>
                  <span className="font-semibold text-xs text-slate-600">₹{mandi.minPrice || 0}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-sans">{t.maxPrice}</span>
                  <span className="font-semibold text-xs text-slate-600">₹{mandi.maxPrice || 0}</span>
                </div>
              </div>

              {/* MSP comparison */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-500">{t.mspBenchmark}: <strong className="text-slate-700 font-mono">₹{mandi.mspBenchmark || 0}</strong></span>
                <span className={`font-bold text-[11px] ${isAboveMsp ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isAboveMsp ? `+₹${mspDelta} above MSP` : `-₹${Math.abs(mspDelta)} below MSP`}
                </span>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectForAdvisor(mandi.commodityId);
                  }}
                  className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-1.5 px-2 rounded-lg text-[11px] transition-colors text-center"
                >
                  {t.selectForAI}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDirectMarketplace(mandi.commodityId);
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-1.5 px-2 rounded-lg text-[11px] transition-colors text-center"
                >
                  {t.directBuyers}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Selected Mandi Deep-Dive & Mandi Arbitrage Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        
        {/* 7-Day Trend Chart Box (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900">
                  {activeMandi.commodityName} Price Trend ({activeMandi.mandiName})
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Daily APMC modal prices vs. Government MSP baseline (₹{activeMandi.mspBenchmark}/qtl)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ₹{activeMandi.modalPrice}/qtl
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeMandi.priceHistory || []}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }} 
                  formatter={(val: any) => [`₹${val}/quintal`, 'Modal Price']}
                />
                <ReferenceLine y={activeMandi.mspBenchmark} stroke="#ef4444" strokeDasharray="4 4" label={{ value: `MSP ₹${activeMandi.mspBenchmark}`, fill: '#ef4444', fontSize: 11 }} />
                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#priceGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mandi Arbitrage Net Realization Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 p-5 rounded-2xl shadow-lg border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{t.arbitrageFinder}</h3>
              <p className="text-[11px] text-slate-400">
                Compare local village trader offer vs. Mandi net margin
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">{t.villageTraderPrice} (₹/qtl)</label>
              <input
                type="number"
                value={villageTraderPrice}
                onChange={(e) => setVillageTraderPrice(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Lot Size (Quintals)</label>
                <input
                  type="number"
                  value={lotQuantity}
                  onChange={(e) => setLotQuantity(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Distance ({activeMandi.distanceKm || 25} km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={transportRatePerKm}
                  onChange={(e) => setTransportRatePerKm(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Results Ledger */}
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>{t.villageTraderPrice}:</span>
                <span>₹{(villageTraderPrice * lotQuantity).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gross Mandi Price ({activeMandi.mandiName}):</span>
                <span className="text-white">₹{((activeMandi.modalPrice || 0) * lotQuantity).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Logistics Freight & APMC Cess:</span>
                <span className="text-rose-400">-₹{(arbitrage?.totalTransportCost || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 border-t border-slate-700 pt-1.5 text-xs">
                <span>{t.netRealization}:</span>
                <span>₹{(arbitrage?.netFarmerPayoutMandi || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Additional Income Highlight */}
            <div className="bg-emerald-950/80 border border-emerald-500/40 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">{t.additionalIncome}:</span>
                <span className="text-base font-black text-white font-mono">+₹{(arbitrage?.extraFarmerProfit || 0).toLocaleString('en-IN')}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-300 bg-emerald-900 px-2.5 py-1 rounded-lg">
                +{arbitrage?.extraProfitPct || 0}%
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

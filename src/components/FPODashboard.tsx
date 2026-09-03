import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Lock, 
  Unlock, 
  Sparkles, 
  Building2, 
  Truck, 
  ShieldCheck, 
  CheckCircle, 
  PlusCircle, 
  Layers, 
  ArrowUpRight,
  PieChart,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { FPOBatchPool, FPODemandForecast, AppLanguage } from '../types';
import { FPO_POOLS, FPO_DEMAND_FORECASTS } from '../data/fpoData';
import { TRANSLATIONS } from '../services/i18n';

interface FPODashboardProps {
  language?: AppLanguage;
}

export const FPODashboard: React.FC<FPODashboardProps> = ({
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];

  const [pools, setPools] = useState<FPOBatchPool[]>(FPO_POOLS);
  const [isProSubscriber, setIsProSubscriber] = useState<boolean>(true);
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number>(0);
  const [showJoinPoolModal, setShowJoinPoolModal] = useState<boolean>(false);
  const [selectedPoolForJoin, setSelectedPoolForJoin] = useState<FPOBatchPool | null>(null);
  const [contributeQuantity, setContributeQuantity] = useState<number>(25);

  const activeForecast = FPO_DEMAND_FORECASTS[selectedForecastIndex];

  // Chart data for 3-month forward demand projection
  const demandForecastChartData = FPO_DEMAND_FORECASTS.map((f) => ({
    name: f.commodityName.split(' ')[0],
    Current: f.currentMonthDemandMT,
    'Month +1': f.projectedMonth1DemandMT,
    'Month +2': f.projectedMonth2DemandMT,
    'Month +3': f.projectedMonth3DemandMT
  }));

  const handleJoinPool = (pool: FPOBatchPool) => {
    setSelectedPoolForJoin(pool);
    setShowJoinPoolModal(true);
  };

  const handleConfirmPoolContribution = () => {
    if (!selectedPoolForJoin) return;

    setPools((prev) =>
      prev.map((p) => {
        if (p.id === selectedPoolForJoin.id) {
          const updatedCurrent = p.currentPooledQuintals + contributeQuantity;
          return {
            ...p,
            currentPooledQuintals: updatedCurrent,
            participatingFarmersCount: p.participatingFarmersCount + 1,
            status: updatedCurrent >= p.targetLotSizeQuintals ? 'READY_FOR_RFQ' : p.status
          };
        }
        return p;
      })
    );

    setShowJoinPoolModal(false);
    setSelectedPoolForJoin(null);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>FPO Collective Aggregation & Enterprise SaaS Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.navFPOSuite} & {t.fpoDemandForecast}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Consolidate smallholder harvests into full truckload (FTL) batch pools to save 40% on freight. FPO admins gain access to paid 90-day institutional demand forecasts (₹3,999/mo).
            </p>
          </div>

          <div className="lg:col-span-4 bg-amber-950/60 p-4 rounded-xl border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-300 font-bold">FPO Pro Subscription:</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">
                ₹3,999 / Month
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Institutional demand foresight, priority corporate bidding, and bulk escrow tools.
            </p>
          </div>
        </div>
      </div>

      {/* FPO Smallholder Batch Pools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg text-slate-900">{t.fpoBatchPools}</h2>
          <span className="text-xs text-slate-500">Save up to 40% on freight via batch aggregation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pools.map((pool) => {
            const progressPct = Math.min(100, Math.round((pool.currentPooledQuintals / pool.targetLotSizeQuintals) * 100));

            return (
              <div 
                key={pool.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{pool.fpoName}</h3>
                      <p className="text-xs text-slate-500">{pool.district}, {pool.state}</p>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                      pool.status === 'READY_FOR_RFQ'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {pool.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Commodity Pool:</span>
                      <strong className="text-slate-900">{pool.commodityName}</strong>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-500 font-sans font-medium">Expected Price:</span>
                      <strong className="text-emerald-700">₹{pool.expectedProcurementPricePerQtl}/qtl</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Farmers Participating:</span>
                      <strong className="text-slate-800">{pool.participatingFarmersCount} Farmers</strong>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                      <span>{t.pooledQuantity}:</span>
                      <span>{pool.currentPooledQuintals} / {pool.targetLotSizeQuintals} qtl ({progressPct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }}></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinPool(pool)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
                  <span>Join Pool / Contribute Lots</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 90-Day Forward Institutional Demand Forecasts (FPO Pro Feature) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg text-slate-900">{t.fpoDemandForecast}</h2>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
                PRO FEATURE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Institutional corporate procurement foresight for Patanjali, ITC, Reliance Fresh & Adani Wilmar
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Select Commodity:</span>
            <select
              value={selectedForecastIndex}
              onChange={(e) => setSelectedForecastIndex(Number(e.target.value))}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {FPO_DEMAND_FORECASTS.map((f, idx) => (
                <option key={f.commodityId} value={idx}>{f.commodityName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Forecast Deep-Dive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800 font-mono text-xs">
              <div className="flex justify-between text-amber-400 font-bold font-sans">
                <span>{activeForecast.commodityName} Demand Trend</span>
                <span>Confidence: {activeForecast.confidenceScore}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">Current Month Demand</span>
                  <span className="font-bold text-white text-xs">{activeForecast.currentMonthDemandMT} MT</span>
                </div>
                <div className="bg-slate-800 p-2 rounded">
                  <span className="text-slate-400 block text-[10px]">3-Month Projected Demand</span>
                  <span className="font-bold text-emerald-400 text-xs">{activeForecast.projectedMonth3DemandMT} MT</span>
                </div>
              </div>
              <div className="pt-1 text-slate-300 font-sans text-[11px]">
                Expected Price Band: <strong className="text-amber-300 font-mono">₹{activeForecast.priceBandMin} - ₹{activeForecast.priceBandMax}/qtl</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-800 block">Sowing & Holding Strategy Advice:</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                "{activeForecast.recommendedSowingOrHoldingStrategy}"
              </p>
            </div>
          </div>

          {/* Bar Chart Projection */}
          <div className="lg:col-span-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandForecastChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Current" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Month +3" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Join Pool Modal */}
      {showJoinPoolModal && selectedPoolForJoin && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Contribute Lot to FPO Pool</h3>
              <button onClick={() => setShowJoinPoolModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900">{selectedPoolForJoin.fpoName}</div>
                <div className="text-amber-800 text-[11px]">{selectedPoolForJoin.commodityName}</div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Quantity to Contribute (Quintals)
                </label>
                <input
                  type="number"
                  value={contributeQuantity}
                  onChange={(e) => setContributeQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setShowJoinPoolModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">Cancel</button>
              <button onClick={handleConfirmPoolContribution} className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold shadow-xs">Confirm Contribution</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

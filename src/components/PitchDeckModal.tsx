import React, { useState } from 'react';
import { 
  Presentation, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Layers, 
  Target, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Building,
  Scale
} from 'lucide-react';
import { 
  SIH_PROBLEM_STATEMENT, 
  PITCH_METRICS, 
  UNIT_ECONOMICS, 
  COMPETITOR_BENCHMARKS 
} from '../data/pitchData';

interface PitchDeckModalProps {
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ onClose }) => {
  const [activeSlide, setActiveSlide] = useState<'problem_solution' | 'business_model' | 'comparables' | 'unit_calc'>('problem_solution');
  const [monthlyTradesCount, setMonthlyTradesCount] = useState<number>(1200);
  const [avgTradeValueINR, setAvgTradeValueINR] = useState<number>(285000);
  const [fpoSubscribers, setFpoSubscribers] = useState<number>(450);

  // Live Unit Economics Calculator
  const totalMonthlyGMV = monthlyTradesCount * avgTradeValueINR;
  const transactionCommissionMonthly = totalMonthlyGMV * 0.015; // 1.5% take rate
  const fpoSaaSRevenueMonthly = fpoSubscribers * 3999;
  const totalMonthlyRevenue = transactionCommissionMonthly + fpoSaaSRevenueMonthly;
  const annualRunRateARR = totalMonthlyRevenue * 12;
  const farmerExtraIncomeMonthly = totalMonthlyGMV * 0.248; // +24.8% extra realization

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 my-8 max-h-[92vh] flex flex-col justify-between">
        
        {/* Pitch Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/20">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-slate-900">
                  Farmgate — SIH26132 Pitch Deck
                </h2>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                  DEHAAT / NINJACART COMPARABLE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Price Discovery, AI "Sell vs. Hold" & Direct Bulk-Buyer Agritech Marketplace
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1.5 rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Slide Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveSlide('problem_solution')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeSlide === 'problem_solution' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Problem & Solution
          </button>
          <button
            onClick={() => setActiveSlide('business_model')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeSlide === 'business_model' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Monetization Model
          </button>
          <button
            onClick={() => setActiveSlide('comparables')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeSlide === 'comparables' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Competitor Benchmarks
          </button>
          <button
            onClick={() => setActiveSlide('unit_calc')}
            className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeSlide === 'unit_calc' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4. Live Unit Economics Calculator
          </button>
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          
          {/* SLIDE 1: Problem & Solution */}
          {activeSlide === 'problem_solution' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                    The Problem (SIH26132)
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Smallholders sell to the first local trader who shows up due to complete price blindness.
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>30%–45% price gap captured by multi-tier middleman cartels.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>No visibility into mandi arrival flushes vs price peaks.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>Zero direct access to institutional bulk buyers (ITC, Reliance, FMCG).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    The Farmgate Solution
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    Real-time price discovery + AI Sell vs Hold + Direct bulk buyer escrow.
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Live APMC Price Discovery with transport net margin arbitrage.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>AI "Sell Now vs. Hold" model factoring perishability & e-NWR loans.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>100% digital escrow trade settlement with instant UPI payout (&lt;4 hrs).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pitch Highlights Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PITCH_METRICS.map((metric, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-0.5">
                    <div className="text-lg font-black text-emerald-700 font-mono">{metric.value}</div>
                    <div className="text-xs font-bold text-slate-800">{metric.title}</div>
                    <div className="text-[10px] text-slate-500">{metric.subtext}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 2: Monetization Model */}
          {activeSlide === 'business_model' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 w-fit">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">1. Transaction Take Rate</h4>
                  <p className="text-xs text-slate-600">
                    <strong>1.5% commission</strong> deducted automatically on all completed escrow trade settlements between bulk buyers and farmers/FPOs.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700 w-fit">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">2. FPO SaaS Subscription</h4>
                  <p className="text-xs text-slate-600">
                    <strong>₹3,999/month</strong> paid tier for FPOs and aggregators providing 90-day forward institutional demand forecasting and batch allocation.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700 w-fit">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">3. Digital Assaying & Logistics</h4>
                  <p className="text-xs text-slate-600">
                    <strong>₹15–₹25/quintal</strong> partner fee for digital spectroscopy assaying certifications, e-NWR warehouse facilitation, and freight routing.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2 text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                  Unit Economics Benchmark (DeHaat / Ninjacart Playbook)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                  <div>Avg Lot: <span className="font-bold text-white">100 Quintals</span></div>
                  <div>Avg GMV: <span className="font-bold text-white">₹2,85,000</span></div>
                  <div>Take Rate (1.5%): <span className="font-bold text-emerald-400">₹4,275 / trade</span></div>
                  <div>Gross Margin: <span className="font-bold text-emerald-400">78.5%</span></div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Competitor Benchmarks */}
          {activeSlide === 'comparables' && (
            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-2.5">Dimension</th>
                      <th className="p-2.5 bg-emerald-50 text-emerald-900 border-x border-emerald-200">Farmgate (SIH26132)</th>
                      <th className="p-2.5">DeHaat</th>
                      <th className="p-2.5">Ninjacart</th>
                      <th className="p-2.5">Traditional Mandis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {COMPETITOR_BENCHMARKS.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-800">{comp.parameter}</td>
                        <td className="p-2.5 bg-emerald-50/60 font-semibold text-emerald-900 border-x border-emerald-200">
                          {comp.farmgate}
                        </td>
                        <td className="p-2.5 text-slate-600">{comp.dehaat}</td>
                        <td className="p-2.5 text-slate-600">{comp.ninjacart}</td>
                        <td className="p-2.5 text-rose-700">{comp.traditionalMandi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SLIDE 4: Live Unit Economics Calculator */}
          {activeSlide === 'unit_calc' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Monthly Trades Executed
                  </label>
                  <input
                    type="number"
                    value={monthlyTradesCount}
                    onChange={(e) => setMonthlyTradesCount(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Avg Trade Value (₹)
                  </label>
                  <input
                    type="number"
                    value={avgTradeValueINR}
                    onChange={(e) => setAvgTradeValueINR(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subscribed FPOs (@ ₹3,999/mo)
                  </label>
                  <input
                    type="number"
                    value={fpoSubscribers}
                    onChange={(e) => setFpoSubscribers(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                  />
                </div>
              </div>

              {/* Projected Revenue Dashboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-0.5">
                  <span className="text-slate-500 text-[10px] block">Monthly GMV</span>
                  <span className="font-black text-sm text-slate-900">
                    ₹{(totalMonthlyGMV / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-0.5">
                  <span className="text-slate-500 text-[10px] block">Monthly Platform Revenue</span>
                  <span className="font-black text-sm text-emerald-800">
                    ₹{(totalMonthlyRevenue / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="bg-emerald-900 text-white p-3 rounded-xl space-y-0.5">
                  <span className="text-emerald-300 text-[10px] block">Annual Run Rate (ARR)</span>
                  <span className="font-black text-sm text-amber-300">
                    ₹{(annualRunRateARR / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 space-y-0.5">
                  <span className="text-slate-500 text-[10px] block">Farmer Extra Income / Mo</span>
                  <span className="font-black text-sm text-blue-900">
                    ₹{(farmerExtraIncomeMonthly / 10000000).toFixed(2)} Cr
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <div className="text-slate-500 text-[11px]">
            Smart India Hackathon • SIH26132 • Agritech & Price Discovery
          </div>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-xl shadow-xs transition-all"
          >
            Explore Live Platform
          </button>
        </div>

      </div>
    </div>
  );
};

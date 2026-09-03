import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle2, Lock, Sparkles, UserCheck, DollarSign, Wallet } from 'lucide-react';
import { BuyerProfile } from '../types';
import { BUYER_PROFILES } from '../data/buyerData';

interface BuyerAuthModalProps {
  onClose: () => void;
  activeBuyer: BuyerProfile | null;
  onSelectBuyer: (buyer: BuyerProfile) => void;
}

export const BuyerAuthModal: React.FC<BuyerAuthModalProps> = ({
  onClose,
  activeBuyer,
  onSelectBuyer
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(
    activeBuyer ? activeBuyer.id : BUYER_PROFILES[0].id
  );

  // New Buyer Form state
  const [showCustomSignup, setShowCustomSignup] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('Patanjali Foods Procurement');
  const [email, setEmail] = useState<string>('procurement@patanjali.org');
  const [buyerType, setBuyerType] = useState<BuyerProfile['type']>('Corporate Processor');
  const [location, setLocation] = useState<string>('Haridwar Industrial Estate, UK');
  const [gstin, setGstin] = useState<string>('05AAACP1029L1ZQ');
  const [escrowDeposit, setEscrowDeposit] = useState<number>(2500000);

  const handleSelectExisting = (profile: BuyerProfile) => {
    onSelectBuyer(profile);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBuyer: BuyerProfile = {
      id: `buyer_${Date.now()}`,
      name: companyName,
      email,
      type: buyerType,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
      verified: true,
      kycTier: 'Platinum',
      rating: 5.0,
      dealsCompleted: 1,
      escrowGuaranteed: true,
      escrowBalanceINR: escrowDeposit,
      location,
      operatingStates: ['Uttarakhand', 'Uttar Pradesh', 'Madhya Pradesh'],
      gstin
    };

    onSelectBuyer(newBuyer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Bulk Buyer & Enterprise Login
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  VERIFIED KYC TIER
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Log in to place binding bids, post procurement RFQs, and fund escrow
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Currently Active Session Pill if any */}
        {activeBuyer && (
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src={activeBuyer.logo} 
                alt={activeBuyer.name} 
                className="w-9 h-9 rounded-lg object-cover border border-slate-200 shadow-xs"
              />
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                  Active Logged-in Buyer Session
                </span>
                <span className="font-bold text-xs text-slate-900">{activeBuyer.name}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Escrow Balance</span>
              <span className="font-black text-xs text-emerald-800 font-mono">
                ₹{activeBuyer.escrowBalanceINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* View Mode Toggle: Verified Accounts vs New Corporate Signup */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setShowCustomSignup(false)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              !showCustomSignup ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Select Verified Corporate Account ({BUYER_PROFILES.length})
          </button>
          <button
            onClick={() => setShowCustomSignup(true)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              showCustomSignup ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Register New Buyer Entity
          </button>
        </div>

        {!showCustomSignup ? (
          /* List of Verified Enterprise Buyers */
          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
            {BUYER_PROFILES.map((profile) => {
              const isCurrentSelected = activeBuyer?.id === profile.id;

              return (
                <div
                  key={profile.id}
                  onClick={() => handleSelectExisting(profile)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isCurrentSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={profile.logo} 
                      alt={profile.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-slate-900">{profile.name}</h4>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                          {profile.kycTier}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {profile.type} • {profile.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block font-mono">Escrow Vault</span>
                    <span className="font-bold text-xs text-slate-900 font-mono">
                      ₹{(profile.escrowBalanceINR / 100000).toFixed(1)} Lakhs
                    </span>
                    <button
                      className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded transition-all block w-full text-center ${
                        isCurrentSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {isCurrentSelected ? 'Active Session' : 'Login as Buyer'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Custom Buyer Registration Form */
          <form onSubmit={handleCustomSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Entity Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Buyer Category</label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                >
                  <option value="Corporate Processor">Corporate Processor</option>
                  <option value="FMCG Conglomerate">FMCG Conglomerate</option>
                  <option value="Retail Chain">Retail Chain</option>
                  <option value="Flour/Oil Mill">Flour/Oil Mill</option>
                  <option value="Agro Exporter">Agro Exporter</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company GSTIN Number</label>
                <input
                  type="text"
                  required
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Escrow Deposit (₹)</label>
                <input
                  type="number"
                  value={escrowDeposit}
                  onChange={(e) => setEscrowDeposit(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCustomSignup(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-sm"
              >
                Register & Authenticate Session
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Escrow Protected B2B Sourcing</span>
          </span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

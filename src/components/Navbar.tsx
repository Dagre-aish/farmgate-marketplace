import React, { useState } from 'react';
import { 
  TrendingUp, 
  Store, 
  BrainCircuit, 
  Users, 
  Presentation, 
  Mic, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Building2,
  Wallet,
  Gavel,
  Radio,
  UserCheck,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { AppLanguage, UserRole, MandiPriceRecord, BuyerProfile } from '../types';
import { TRANSLATIONS } from '../services/i18n';
import { UserAccount } from '../services/firebaseAuth';

interface NavbarProps {
  activeTab: 'mandi' | 'advisor' | 'marketplace' | 'bidding' | 'fpo';
  setActiveTab: (tab: 'mandi' | 'advisor' | 'marketplace' | 'bidding' | 'fpo') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  activeBuyer: BuyerProfile | null;
  authUser?: UserAccount | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onOpenBuyerAuth: () => void;
  onOpenVoice: () => void;
  onOpenPitch: () => void;
  onOpenNewListing: () => void;
  mandiRecords: MandiPriceRecord[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  language,
  setLanguage,
  activeBuyer,
  authUser,
  onOpenAuth,
  onLogout,
  onOpenBuyerAuth,
  onOpenVoice,
  onOpenPitch,
  onOpenNewListing,
  mandiRecords
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Live Mandi Ticker Ribbon */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 overflow-hidden flex items-center border-b border-slate-800">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400 shrink-0 mr-4 pl-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{t.liveMandiTicker}</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none font-mono text-[11px]">
          {mandiRecords.slice(0, 8).map((mandi) => (
            <div key={mandi.id} className="flex items-center gap-1.5">
              <span className="text-slate-300 font-sans font-semibold">{mandi.commodityName} ({mandi.mandiName})</span>
              <span className="text-white font-bold">₹{mandi.modalPrice}</span>
              <span className={`flex items-center text-[10px] font-extrabold px-1 rounded ${
                mandi.dailyChangePct >= 0 ? 'text-emerald-400 bg-emerald-950' : 'text-rose-400 bg-rose-950'
              }`}>
                {mandi.dailyChangePct >= 0 ? '▲' : '▼'} {Math.abs(mandi.dailyChangePct)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('bidding')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xl shadow-md border border-emerald-400/30">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-slate-900 tracking-tight">{t.appName}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  SIH26132
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('bidding')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'bidding'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Gavel className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.navBiddingArena}</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('mandi')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'mandi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.navMandiPrices}</span>
            </button>

            <button
              onClick={() => setActiveTab('advisor')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'advisor'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>{t.navSellOrHold}</span>
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t.navMarketplace}</span>
            </button>

            <button
              onClick={() => setActiveTab('fpo')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'fpo'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.navFPOSuite}</span>
            </button>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Multilingual Speech Voice Search Button */}
            <button
              onClick={onOpenVoice}
              className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all flex items-center gap-1.5 text-xs font-bold shadow-2xs"
              title="Voice Search APMC Prices"
            >
              <Mic className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span className="hidden lg:inline">{t.voiceSearch}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as AppLanguage)}
                className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs border border-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="en">🇬🇧 English</option>
                <option value="hi">🇮🇳 हिन्दी</option>
                <option value="mr">🇮🇳 मराठी</option>
                <option value="pa">🇮🇳 ਪੰਜਾਬੀ</option>
                <option value="te">🇮🇳 తెలుగు</option>
              </select>
            </div>

            {/* Firebase Auth Account Badge */}
            {authUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-800 text-xs font-bold"
                >
                  {authUser.photoURL ? (
                    <img src={authUser.photoURL} alt={authUser.displayName} className="w-7 h-7 rounded-xl object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
                      {authUser.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left hidden sm:block">
                    <span className="block text-xs leading-tight font-extrabold">{authUser.displayName}</span>
                    <span className="text-[9px] text-emerald-400 font-mono block leading-none">{authUser.role}</span>
                  </div>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in space-y-1">
                    <div className="p-2 border-b border-slate-100 text-xs">
                      <span className="font-bold text-slate-900 block">{authUser.displayName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{authUser.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-emerald-100" />
                <span>Sign In / Sign Up</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

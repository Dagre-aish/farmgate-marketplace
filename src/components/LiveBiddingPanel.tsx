import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Radio, 
  Building2, 
  UserCheck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  DollarSign, 
  Star,
  Cloud
} from 'lucide-react';
import { FarmerListing, BuyerProfile, Bid, AppLanguage } from '../types';
import { TRANSLATIONS } from '../services/i18n';
import confetti from 'canvas-confetti';

interface LiveBiddingPanelProps {
  farmerListings: FarmerListing[];
  bids: Bid[];
  activeBuyer: BuyerProfile | null;
  onOpenBuyerAuth: () => void;
  onSubmitBid: (newBid: Bid) => void;
  onAcceptBid: (bid: Bid) => void;
  language?: AppLanguage;
}

export const LiveBiddingPanel: React.FC<LiveBiddingPanelProps> = ({
  farmerListings,
  bids,
  activeBuyer,
  onOpenBuyerAuth,
  onSubmitBid,
  onAcceptBid,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];

  // Selected Lot for Main Stage Arena Focus
  const [selectedLotId, setSelectedLotId] = useState<string>(
    farmerListings.length > 0 ? farmerListings[0].id : 'list_1'
  );

  // Live Countdown Timer (in seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(342);

  const activeListing = farmerListings.find((l) => l.id === selectedLotId) || farmerListings[0];
  const activeBids = bids.filter((b) => b.listingId === activeListing.id);
  const highestBid = activeBids.length > 0 
    ? activeBids.reduce((prev, curr) => (curr.bidPricePerQuintal > prev.bidPricePerQuintal ? curr : prev))
    : null;

  const currentTopPrice = highestBid ? highestBid.bidPricePerQuintal : activeListing.askingPricePerQuintal;
  const [customBidInput, setCustomBidInput] = useState<number>(currentTopPrice + 20);

  useEffect(() => {
    setCustomBidInput(currentTopPrice + 20);
  }, [currentTopPrice, selectedLotId]);

  // Live Countdown Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const handlePlaceQuickBid = (increment: number) => {
    const bidValue = currentTopPrice + increment;
    placeBid(bidValue);
  };

  const placeBid = (price: number) => {
    if (!activeBuyer) {
      onOpenBuyerAuth();
      return;
    }

    const newBid: Bid = {
      id: `bid_${Date.now()}`,
      listingId: activeListing.id,
      commodityName: activeListing.commodityName,
      bidderId: activeBuyer.id,
      bidderName: activeBuyer.name,
      bidderLogo: activeBuyer.logo,
      bidderKycTier: activeBuyer.kycTier,
      bidPricePerQuintal: price,
      bidQuantityQuintals: activeListing.quantityQuintals,
      deliveryTerms: 'Direct Farmgate Pick-up (Buyer Freight Guaranteed)',
      paymentTerms: '100% Digital Escrow Locked',
      status: 'PENDING',
      createdAt: 'Just Now'
    };

    onSubmitBid(newBid);

    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 }
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Live Bidding Top Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-2xl text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>FIREBASE CLOUD FIRESTORE REAL-TIME BIDDING ARENA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{t.liveBiddingFloor}</span>
              <span className="text-emerald-400 text-sm font-mono font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                100% Escrow Backed
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Connected live to Firebase Cloud Firestore. Bids placed by any corporate buyer or farmer sync instantly across all devices worldwide.
            </p>
          </div>

          {/* Quick Real-Time Metrics */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">{t.totalBids}</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{bids.length} Bids</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">{t.escrowLocked}</span>
              <span className="text-lg font-black text-amber-400 font-mono">₹4.2 Cr</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>Firebase Sync</span>
              </span>
              <span className="text-xs font-bold text-white bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40 block mt-0.5">
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN STAGE: Live Bidding Arena Focus Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Bidding Main Stage (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border-2 border-emerald-500/40 shadow-xl p-5 sm:p-6 space-y-5">
          
          {/* Main Stage Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Gavel className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-lg text-slate-900">{activeListing.commodityName}</h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                    {activeListing.qualityAssay.grade}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Farmer: <strong className="text-slate-800">{activeListing.farmerName}</strong> ({activeListing.district}, {activeListing.state}) • Lot #{activeListing.id.slice(-4)}
                </p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="bg-slate-900 text-slate-100 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
              <div className="space-y-0 text-right">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider block leading-tight">{t.auctionClosesIn}</span>
                <span className="font-mono font-black text-base text-rose-400">{formatTimer(timeLeftSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Current Highest Bid Highlight Card */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white p-5 rounded-2xl shadow-lg border border-emerald-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.currentTopBid}</span>
              </span>
              <div className="text-3xl font-black font-mono text-white flex items-baseline gap-2">
                <span>₹{currentTopPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-400 font-normal font-sans">/ quintal</span>
              </div>
              <p className="text-xs text-slate-300">
                Total Lot Valuation: <strong className="text-emerald-300 font-mono">₹{(currentTopPrice * activeListing.quantityQuintals).toLocaleString('en-IN')}</strong> ({activeListing.quantityQuintals} qtl)
              </p>
            </div>

            {highestBid ? (
              <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 flex items-center gap-3 shrink-0">
                <img 
                  src={highestBid.bidderLogo} 
                  alt={highestBid.bidderName} 
                  className="w-10 h-10 rounded-xl object-cover border border-slate-600"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">{highestBid.bidderName}</span>
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-1 rounded">
                      {highestBid.bidderKycTier}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{t.leadingBidder} • Escrow Locked</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-xs text-slate-300 border border-slate-700">
                Opening Bid at Farmer Asking Price: <strong className="text-emerald-400 font-mono">₹{activeListing.askingPricePerQuintal}/qtl</strong>
              </div>
            )}
          </div>

          {/* Real-time Interactive Quick Bidding Buttons */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>{t.placeQuickBid}:</span>
              </span>

              {activeBuyer ? (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span>Bidding as: <strong className="text-slate-900">{activeBuyer.name}</strong></span>
                  <button onClick={onOpenBuyerAuth} className="text-[10px] text-emerald-700 font-bold underline">
                    Switch Profile
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onOpenBuyerAuth}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  {t.buyerLogin}
                </button>
              )}
            </div>

            {/* Quick Increment Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[10, 20, 50, 100].map((inc) => {
                const targetPrice = currentTopPrice + inc;

                return (
                  <button
                    key={inc}
                    onClick={() => handlePlaceQuickBid(inc)}
                    className="p-3 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 rounded-xl text-center transition-all shadow-2xs group active:scale-95"
                  >
                    <span className="text-[10px] text-slate-500 group-hover:text-emerald-700 font-bold block">
                      +₹{inc} / quintal
                    </span>
                    <span className="text-sm font-black text-slate-900 group-hover:text-emerald-900 font-mono block">
                      ₹{targetPrice.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Bid Price Input */}
            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  value={customBidInput}
                  onChange={(e) => setCustomBidInput(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter custom bid price..."
                />
              </div>
              <button
                onClick={() => placeBid(customBidInput)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0 active:scale-95"
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>{t.submitBid}</span>
              </button>
            </div>
          </div>

          {/* Live Ticker Feed of Incoming Bids */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Real-Time Live Bidding Log Stream ({activeBids.length})</span>
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Cloud className="w-3 h-3 text-emerald-600" />
                <span>Firebase Synced</span>
              </span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {activeBids.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">No bids placed on this lot yet. Be the first corporate buyer to bid!</p>
              ) : (
                activeBids.map((b) => (
                  <div
                    key={b.id}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 flex items-center justify-between text-xs transition-all animate-in fade-in"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={b.bidderLogo} alt={b.bidderName} className="w-7 h-7 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">{b.bidderName}</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1 rounded">
                            {b.bidderKycTier}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{b.createdAt}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-slate-900 font-mono text-xs block">
                        ₹{b.bidPricePerQuintal.toLocaleString('en-IN')}/qtl
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        Escrow Guaranteed
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action: Lock Trade / Accept Top Offer */}
          {highestBid && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Accept Top Corporate Offer</span>
                <span className="text-[11px] text-emerald-700 font-mono">
                  ₹{highestBid.bidPricePerQuintal}/qtl • Total ₹{(highestBid.bidPricePerQuintal * activeListing.quantityQuintals).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => onAcceptBid(highestBid)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>{t.acceptAndLockEscrow}</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Other Active Auction Lots (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs text-slate-600 uppercase tracking-wider block">
            All Live Auction Lots ({farmerListings.length})
          </h3>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {farmerListings.map((list) => {
              const listBids = bids.filter((b) => b.listingId === list.id);
              const topBid = listBids.length > 0 
                ? listBids.reduce((prev, curr) => (curr.bidPricePerQuintal > prev.bidPricePerQuintal ? curr : prev))
                : null;
              
              const topPrice = topBid ? topBid.bidPricePerQuintal : list.askingPricePerQuintal;
              const isSelected = list.id === selectedLotId;

              return (
                <div
                  key={list.id}
                  onClick={() => setSelectedLotId(list.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{list.commodityName}</h4>
                      <p className="text-[10px] text-slate-500">
                        {list.farmerName} • {list.district}
                      </p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-emerald-300">
                      {list.qualityAssay.grade}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-sans">Asking Price</span>
                      <span className="font-bold text-slate-700">₹{list.askingPricePerQuintal}/qtl</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-emerald-700 font-bold block font-sans">Current Top Bid</span>
                      <span className="font-black text-emerald-800">₹{topPrice.toLocaleString('en-IN')}/qtl</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{list.quantityQuintals} Quintals</span>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {listBids.length} Live Bids
                    </span>
                  </div>

                  <button
                    className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Currently in Bidding Arena' : 'Enter Auction Floor'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

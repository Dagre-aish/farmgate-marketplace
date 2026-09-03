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
  Cloud,
  Lock,
  AlertCircle
} from 'lucide-react';
import { FarmerListing, BuyerProfile, Bid, AppLanguage, UserRole } from '../types';
import { TRANSLATIONS } from '../services/i18n';
import confetti from 'canvas-confetti';

interface LiveBiddingPanelProps {
  farmerListings: FarmerListing[];
  bids: Bid[];
  userRole?: UserRole;
  activeBuyer: BuyerProfile | null;
  onOpenBuyerAuth: () => void;
  onSubmitBid: (newBid: Bid) => void;
  onAcceptBid: (bid: Bid) => void;
  language?: AppLanguage;
}

export const LiveBiddingPanel: React.FC<LiveBiddingPanelProps> = ({
  farmerListings,
  bids,
  userRole = 'FARMER',
  activeBuyer,
  onOpenBuyerAuth,
  onSubmitBid,
  onAcceptBid,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

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
    if (userRole === 'FARMER') return;
    const bidValue = currentTopPrice + increment;
    placeBid(bidValue);
  };

  const placeBid = (price: number) => {
    if (userRole === 'FARMER') {
      alert('Farmers view live corporate bids. Only verified Corporate Buyers can place bids on crop lots.');
      return;
    }

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
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
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
              Connected live to Firebase Cloud Firestore. Bids placed by corporate buyers sync instantly across all devices.
            </p>
          </div>

          {/* Quick Real-Time Metrics */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shrink-0">
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

      {/* Role Permission Alert Notice */}
      {userRole === 'FARMER' ? (
        <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-amber-950 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-extrabold text-amber-900 block">🌾 Farmer View Mode Active</span>
              <span className="text-[11px] text-amber-800">
                You can monitor all live corporate bids in real time and click <strong>"Accept Top Corporate Bid & Lock Escrow"</strong> to execute trade settlement. <em>(Only Corporate Buyers can place bids).</em>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-emerald-950 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-extrabold text-emerald-950 block">🏢 Corporate Buyer Bidding Mode Active</span>
              <span className="text-[11px] text-emerald-900">
                Placing a bid creates a legally binding corporate commitment locked in escrow. <em>(Submitted bids cannot be deleted or removed).</em>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Active Lot Bidding Stage & Available Crop Lots Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Main Live Bidding Arena Stage */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            
            {/* Arena Header */}
            <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                    LIVE AUCTION
                  </span>
                  <span className="text-slate-400 text-xs font-mono">Lot ID: #{activeListing.id}</span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{activeListing.commodityName}</span>
                  <span className="text-xs font-normal text-slate-400">({activeListing.quantityQuintals} Quintals)</span>
                </h2>
              </div>

              {/* Countdown Clock */}
              <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-rose-500 animate-spin" />
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase leading-tight">{t.closingIn}</span>
                  <span className="text-lg font-black text-rose-400 font-mono leading-none">{formatTimer(timeLeftSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Arena Body Details */}
            <div className="p-6 space-y-6">
              
              {/* Farmer Seller Profile & Location */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
                    {activeListing.farmerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{activeListing.farmerName}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-300">
                        VERIFIED FARMER
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeListing.village}, {activeListing.district}, {activeListing.state}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">{t.askingPrice}</span>
                  <span className="text-base font-black text-slate-900 font-mono">₹{activeListing.askingPricePerQuintal} / qtl</span>
                </div>
              </div>

              {/* Live Top Price Spotlight */}
              <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-xs text-emerald-300 font-extrabold tracking-wider uppercase block mb-1 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>{t.highestBidPrice}</span>
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">₹{currentTopPrice}</span>
                    <span className="text-xs text-emerald-400 font-bold font-mono">/ quintal</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Total Lot Value: <strong className="text-amber-400 font-mono">₹{(currentTopPrice * activeListing.quantityQuintals).toLocaleString('en-IN')}</strong>
                  </p>
                </div>

                {/* Accept Bid Button for Farmer */}
                {highestBid && (
                  <button
                    onClick={() => onAcceptBid(highestBid)}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 border border-emerald-300"
                  >
                    <span>{t.acceptTopBid}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Corporate Bidding Controls */}
              {userRole === 'BUYER' ? (
                <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>{t.quickBidButtons}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Instant Firebase Push</span>
                  </div>

                  {/* Quick Increment Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100].map((inc) => (
                      <button
                        key={inc}
                        onClick={() => handlePlaceQuickBid(inc)}
                        className="py-3 px-2 bg-white hover:bg-emerald-600 hover:text-white text-slate-900 border border-slate-300 hover:border-emerald-600 font-black text-xs rounded-xl shadow-xs transition-all flex flex-col items-center justify-center gap-0.5 active:scale-95 group"
                      >
                        <span className="text-emerald-600 group-hover:text-white font-mono">+₹{inc}</span>
                        <span className="text-[9px] text-slate-400 group-hover:text-emerald-100 font-mono">₹{currentTopPrice + inc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Bid Input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        min={currentTopPrice + 1}
                        value={customBidInput}
                        onChange={(e) => setCustomBidInput(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter custom bid per quintal"
                      />
                    </div>
                    <button
                      onClick={() => placeBid(customBidInput)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <Gavel className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.placeCustomBid}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <span className="font-bold block text-amber-950">Farmer Account Active</span>
                    <span className="text-[11px] text-amber-800">
                      Bidding is reserved for verified Corporate Buyers. As a Farmer, you can review incoming corporate bids in real-time above and lock escrow payout.
                    </span>
                  </div>
                </div>
              )}

              {/* Real-time Incoming Bids Feed */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>{t.liveIncomingBidsFeed}</span>
                  </h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">
                    {activeBids.length} Offers Received
                  </span>
                </div>

                {activeBids.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
                    No bids submitted for this lot yet. Be the first corporate buyer to place a bid!
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {activeBids.map((bid, index) => (
                      <div
                        key={bid.id}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                          index === 0
                            ? 'bg-emerald-50/70 border-emerald-300 shadow-xs ring-1 ring-emerald-400/30'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={bid.bidderLogo || 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=200'}
                            alt={bid.bidderName}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{bid.bidderName}</span>
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-emerald-300">
                                {bid.bidderKycTier || 'TIER_1_VERIFIED'}
                              </span>
                              {index === 0 && (
                                <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded">
                                  HIGHEST BID
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 block leading-tight font-mono">
                              {bid.createdAt} • Non-Removable Binding Bid
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base font-black text-emerald-700 font-mono block">
                            ₹{bid.bidPricePerQuintal} / qtl
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono block">
                            Total: ₹{(bid.bidPricePerQuintal * bid.bidQuantityQuintals).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Right 1 Col: Select Other Live Crop Lots */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
              <Gavel className="w-4 h-4 text-emerald-600" />
              <span>Select Active Crop Auction</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono font-bold">{farmerListings.length} Lots</span>
          </div>

          <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
            {farmerListings.map((listing) => {
              const lotBids = bids.filter((b) => b.listingId === listing.id);
              const topBid = lotBids.length > 0
                ? Math.max(...lotBids.map((b) => b.bidPricePerQuintal))
                : listing.askingPricePerQuintal;

              return (
                <div
                  key={listing.id}
                  onClick={() => setSelectedLotId(listing.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedLotId === listing.id
                      ? 'bg-emerald-900 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      selectedLotId === listing.id
                        ? 'bg-emerald-800 text-emerald-200 border border-emerald-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{listing.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      {lotBids.length} Bids Placed
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm mb-1">{listing.commodityName}</h4>
                  <p className={`text-xs mb-3 ${selectedLotId === listing.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {listing.quantityQuintals} Quintals • {listing.farmerName} ({listing.district})
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/20">
                    <div>
                      <span className={`text-[9px] font-bold block uppercase ${selectedLotId === listing.id ? 'text-slate-300' : 'text-slate-400'}`}>
                        Top Price
                      </span>
                      <span className={`text-sm font-black font-mono ${selectedLotId === listing.id ? 'text-emerald-300' : 'text-slate-900'}`}>
                        ₹{topBid} / qtl
                      </span>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                      selectedLotId === listing.id
                        ? 'bg-emerald-400 text-slate-950 font-black'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      <span>Focus Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

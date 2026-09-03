import React, { useState, useMemo } from 'react';
import { 
  Store, 
  Search, 
  ShieldCheck, 
  CheckCircle, 
  Building2, 
  Tag, 
  Calendar, 
  MapPin, 
  Filter, 
  Layers, 
  ArrowUpRight, 
  Sparkles, 
  PlusCircle, 
  FileText,
  UserCheck,
  Scale,
  DollarSign,
  Gavel,
  CheckCircle2
} from 'lucide-react';
import { BuyerRFQ, FarmerListing, CommodityCategory, UserRole, Bid, BuyerProfile, AppLanguage } from '../types';
import { COMMODITIES } from '../data/commodities';
import { TRANSLATIONS } from '../services/i18n';

interface MarketplaceProps {
  buyerRfqs: BuyerRFQ[];
  farmerListings: FarmerListing[];
  bids: Bid[];
  userRole: UserRole;
  activeBuyer: BuyerProfile | null;
  onInitiateEscrow: (tradeData: {
    rfq?: BuyerRFQ;
    listing?: FarmerListing;
    agreedPrice: number;
    quantity: number;
    farmerName: string;
    buyerName: string;
  }) => void;
  onOpenNewListing: () => void;
  onOpenNewRFQ: () => void;
  onOpenPlaceBid: (listing: FarmerListing) => void;
  onOpenListingBids: (listing: FarmerListing) => void;
  onOpenBuyerAuth: () => void;
  language?: AppLanguage;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  buyerRfqs,
  farmerListings,
  bids,
  userRole,
  activeBuyer,
  onInitiateEscrow,
  onOpenNewListing,
  onOpenNewRFQ,
  onOpenPlaceBid,
  onOpenListingBids,
  onOpenBuyerAuth,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];

  const [viewMode, setViewMode] = useState<'BUYER_RFQS' | 'FARMER_LISTINGS'>('BUYER_RFQS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory | 'All'>('All');

  const filteredRfqs = useMemo(() => {
    return buyerRfqs.filter((rfq) => {
      const matchesSearch = 
        rfq.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfq.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfq.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase());

      const commodity = COMMODITIES.find((c) => c.id === rfq.commodityId);
      const matchesCategory = 
        selectedCategory === 'All' || (commodity && commodity.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [buyerRfqs, searchQuery, selectedCategory]);

  const filteredListings = useMemo(() => {
    return farmerListings.filter((list) => {
      const matchesSearch = 
        list.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.district.toLowerCase().includes(searchQuery.toLowerCase());

      const commodity = COMMODITIES.find((c) => c.id === list.commodityId);
      const matchesCategory = 
        selectedCategory === 'All' || (commodity && commodity.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [farmerListings, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.escrowGuaranteed}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.navMarketplace}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Connect directly with corporate buyers (ITC, Reliance Fresh, Adani Wilmar, BigBasket). All trades are backed by 5-Stage Digital Escrow settlement.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Logged-in Buyer Profile:</span>
              {activeBuyer ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{activeBuyer.name}</span>
                </span>
              ) : (
                <button
                  onClick={onOpenBuyerAuth}
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  {t.buyerLogin}
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onOpenNewListing}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all text-center shadow-xs"
              >
                {t.createListing}
              </button>
              <button
                onClick={onOpenNewRFQ}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold py-2 px-3 rounded-xl text-xs transition-all text-center border border-slate-700"
              >
                {t.postRFQ}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('BUYER_RFQS')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              viewMode === 'BUYER_RFQS'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>{t.buyerOrders} ({buyerRfqs.length})</span>
          </button>

          <button
            onClick={() => setViewMode('FARMER_LISTINGS')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              viewMode === 'FARMER_LISTINGS'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Tag className="w-4 h-4 text-emerald-400" />
            <span>{t.farmerLots} ({farmerListings.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Main Grid View */}
      {viewMode === 'BUYER_RFQS' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRfqs.map((rfq) => (
            <div
              key={rfq.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={rfq.buyerLogo} alt={rfq.buyerName} className="w-9 h-9 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{rfq.buyerName}</h3>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded border border-emerald-300">
                        {rfq.kycTier} Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between font-sans">
                    <span className="text-slate-500">Required Commodity:</span>
                    <strong className="text-slate-900">{rfq.commodityName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">{t.requiredLot}:</span>
                    <strong className="text-slate-800">{rfq.quantityQuintals} Quintals</strong>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span className="font-sans text-slate-500">{t.targetPrice}:</span>
                    <span>₹{rfq.targetPricePerQuintal}/qtl</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 font-sans">{t.deliveryLocation}:</span>
                    <span className="text-slate-700 font-sans">{rfq.deliveryLocation}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1">
                  <div>Quality Specs: <strong className="text-slate-700">Moisture ≤ {rfq.qualitySpecs.maxMoisturePct}% • Foreign Matter ≤ {rfq.qualitySpecs.maxForeignMatterPct}%</strong></div>
                  <div>Payment Terms: <strong className="text-emerald-700">{rfq.paymentTerms}</strong></div>
                </div>
              </div>

              <button
                onClick={() => onInitiateEscrow({
                  rfq,
                  agreedPrice: rfq.targetPricePerQuintal,
                  quantity: rfq.quantityQuintals,
                  farmerName: 'Rameshwar Patidar',
                  buyerName: rfq.buyerName
                })}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>{t.fulfillOrder}</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((list) => {
            const listBids = bids.filter((b) => b.listingId === list.id);
            const topBid = listBids.length > 0 
              ? listBids.reduce((prev, curr) => (curr.bidPricePerQuintal > prev.bidPricePerQuintal ? curr : prev))
              : null;
            const currentHighestPrice = topBid ? topBid.bidPricePerQuintal : list.askingPricePerQuintal;

            return (
              <div
                key={list.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{list.commodityName}</h3>
                      <p className="text-xs text-slate-500">
                        {list.farmerName} • {list.district}, {list.state}
                      </p>
                    </div>

                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                      {list.qualityAssay.grade}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Farmer Asking Price:</span>
                      <strong className="text-slate-900">₹{list.askingPricePerQuintal}/qtl</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span className="text-slate-500 font-sans">Highest Active Bid:</span>
                      <span>₹{currentHighestPrice.toLocaleString('en-IN')}/qtl</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-sans">Lot Quantity:</span>
                      <span className="text-slate-800 font-bold">{list.quantityQuintals} Quintals</span>
                    </div>
                  </div>

                  {/* Quality Assay Card */}
                  <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t.qualityAssayPassed}</span>
                    </div>
                    <span className="text-[10px] text-emerald-700">Moisture: {list.qualityAssay.moisturePct}%</span>
                  </div>
                </div>

                {/* Bidding & Direct Buy Action Buttons */}
                <div className="space-y-2 pt-1">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenPlaceBid(list)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>{t.placeBindingBid}</span>
                    </button>

                    <button
                      onClick={() => onOpenListingBids(list)}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-2 rounded-xl text-xs transition-all border border-amber-300 shrink-0"
                    >
                      <span>{listBids.length} Bids</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onInitiateEscrow({
                      listing: list,
                      agreedPrice: list.askingPricePerQuintal,
                      quantity: list.quantityQuintals,
                      farmerName: list.farmerName,
                      buyerName: activeBuyer ? activeBuyer.name : 'Reliance Retail Fresh'
                    })}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all shadow-xs text-center"
                  >
                    {t.instantBuy}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

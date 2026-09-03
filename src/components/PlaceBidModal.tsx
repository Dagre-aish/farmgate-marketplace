import React, { useState } from 'react';
import { Gavel, ShieldCheck, CheckCircle2, Building2, AlertCircle, DollarSign, Wallet } from 'lucide-react';
import { FarmerListing, BuyerProfile, Bid } from '../types';

interface PlaceBidModalProps {
  listing: FarmerListing;
  activeBuyer: BuyerProfile;
  onClose: () => void;
  onSubmitBid: (newBid: Bid) => void;
  onOpenAuthModal: () => void;
}

export const PlaceBidModal: React.FC<PlaceBidModalProps> = ({
  listing,
  activeBuyer,
  onClose,
  onSubmitBid,
  onOpenAuthModal
}) => {
  const [bidPrice, setBidPrice] = useState<number>(
    listing.askingPricePerQuintal
  );
  const [bidQuantity, setBidQuantity] = useState<number>(listing.quantityQuintals);
  const [deliveryTerms, setDeliveryTerms] = useState<string>(
    'Direct Farmgate Pick-up (Buyer bears logistics freight)'
  );
  const [paymentTerms, setPaymentTerms] = useState<string>(
    '100% Digital Escrow Funded • Release within 4 hours of Digital Assaying'
  );

  const totalBidValueINR = bidPrice * bidQuantity;
  const platformFeeINR = Math.round(totalBidValueINR * 0.015); // 1.5% take rate
  const netFarmerPayoutINR = totalBidValueINR - platformFeeINR;

  const hasSufficientEscrow = activeBuyer.escrowBalanceINR >= totalBidValueINR;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBid: Bid = {
      id: `bid_${Date.now()}`,
      listingId: listing.id,
      commodityName: listing.commodityName,
      bidderId: activeBuyer.id,
      bidderName: activeBuyer.name,
      bidderLogo: activeBuyer.logo,
      bidderKycTier: activeBuyer.kycTier,
      bidPricePerQuintal: bidPrice,
      bidQuantityQuintals: bidQuantity,
      deliveryTerms,
      paymentTerms,
      status: 'PENDING',
      createdAt: 'Just now'
    };

    onSubmitBid(newBid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Submit Binding Corporate Bid
              </h3>
              <p className="text-xs text-slate-500">
                Place counter-offer or match asking price for harvest lot #{listing.id.slice(-4)}
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

        {/* Listing Overview Pill */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">{listing.commodityName}</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300">
              {listing.qualityAssay.grade}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Farmer: <strong className="text-slate-800">{listing.farmerName}</strong> ({listing.district}, {listing.state})</span>
            <span>Quantity: <strong className="text-slate-800">{listing.quantityQuintals} qtl</strong></span>
          </div>
          <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/80">
            <span>Farmer Asking Price:</span>
            <span className="font-bold text-emerald-700 font-mono">₹{listing.askingPricePerQuintal}/qtl</span>
          </div>
        </div>

        {/* Active Bidder Identity Pill */}
        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <img 
              src={activeBuyer.logo} 
              alt={activeBuyer.name} 
              className="w-9 h-9 rounded-lg object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs">{activeBuyer.name}</span>
                <span className="bg-emerald-200 text-emerald-900 text-[9px] font-bold px-1 rounded">
                  {activeBuyer.kycTier}
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">Bidding Entity Authenticated</span>
            </div>
          </div>

          <button
            onClick={onOpenAuthModal}
            className="text-[10px] bg-white border border-emerald-300 text-emerald-800 font-bold px-2 py-1 rounded hover:bg-emerald-100"
          >
            Switch Profile
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Your Bid Price (₹/Quintal)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  required
                  value={bidPrice}
                  onChange={(e) => setBidPrice(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Quantity to Commit (Quintals)
              </label>
              <input
                type="number"
                required
                max={listing.quantityQuintals}
                value={bidQuantity}
                onChange={(e) => setBidQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Logistics & Delivery Terms
            </label>
            <select
              value={deliveryTerms}
              onChange={(e) => setDeliveryTerms(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
            >
              <option value="Direct Farmgate Pick-up (Buyer bears logistics freight)">
                Direct Farmgate Pick-up (Buyer bears freight)
              </option>
              <option value="Delivery to Buyer Processing Plant (Farmer delivers)">
                Delivery to Buyer Processing Plant (Farmer delivers)
              </option>
              <option value="WDRA Accredited Warehouse Gate Handover">
                WDRA Accredited Warehouse Gate Handover
              </option>
            </select>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Total Contract Value ({bidQuantity} qtl @ ₹{bidPrice}):</span>
              <span className="font-bold text-slate-900">₹{totalBidValueINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>Platform Take Rate (1.5% Escrow Commission):</span>
              <span>-₹{platformFeeINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-800 pt-1 border-t border-slate-200 text-xs">
              <span>Net Farmer Realization Payout:</span>
              <span className="text-sm">₹{netFarmerPayoutINR.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Escrow Balance Check */}
          {!hasSufficientEscrow && (
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-amber-800 text-[11px]">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Your Escrow balance (₹{activeBuyer.escrowBalanceINR.toLocaleString('en-IN')}) is below bid value.</span>
              </div>
              <button
                type="button"
                onClick={() => activeBuyer.escrowBalanceINR += 5000000}
                className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300"
              >
                + Top-up Vault
              </button>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Gavel className="w-4 h-4" />
              <span>Submit Binding Corporate Bid</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

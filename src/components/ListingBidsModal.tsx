import React from 'react';
import { Gavel, ShieldCheck, CheckCircle2, Building, ArrowRight, DollarSign, UserCheck, Star } from 'lucide-react';
import { FarmerListing, Bid } from '../types';

interface ListingBidsModalProps {
  listing: FarmerListing;
  bids: Bid[];
  onClose: () => void;
  onAcceptBid: (bid: Bid) => void;
  onRejectBid: (bidId: string) => void;
}

export const ListingBidsModal: React.FC<ListingBidsModalProps> = ({
  listing,
  bids,
  onClose,
  onAcceptBid,
  onRejectBid
}) => {
  const listingBids = bids.filter((b) => b.listingId === listing.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Incoming Corporate Bids ({listingBids.length})
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  {listing.commodityName}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Lot #{listing.id.slice(-4)} • {listing.quantityQuintals} Quintals • Asking ₹{listing.askingPricePerQuintal}/qtl
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

        {/* Bids List */}
        {listingBids.length === 0 ? (
          <div className="text-center py-8 space-y-2 bg-slate-50 rounded-xl border border-slate-200">
            <Gavel className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700">No Bids Placed Yet</p>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
              Verified corporate buyers are evaluating your harvest grade. Bids will appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {listingBids.map((bid) => {
              const priceDelta = bid.bidPricePerQuintal - listing.askingPricePerQuintal;
              const isAboveAsking = priceDelta >= 0;

              return (
                <div 
                  key={bid.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 shadow-sm transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={bid.bidderLogo} 
                        alt={bid.bidderName} 
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-slate-900">{bid.bidderName}</h4>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                            {bid.bidderKycTier}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-amber-400" /> 4.9 Rating
                          </span>
                          <span>•</span>
                          <span>Placed {bid.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-slate-900 font-mono">
                        ₹{bid.bidPricePerQuintal.toLocaleString('en-IN')}
                        <span className="text-[10px] font-normal text-slate-500">/qtl</span>
                      </div>
                      <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isAboveAsking ? 'text-emerald-700 bg-emerald-100' : 'text-slate-600 bg-slate-100'
                      }`}>
                        {isAboveAsking ? `+₹${priceDelta}/qtl above asking` : `-₹${Math.abs(priceDelta)}/qtl`}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1 font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Lot Value ({bid.bidQuantityQuintals} qtl):</span>
                      <span className="font-bold text-slate-900">₹{(bid.bidQuantityQuintals * bid.bidPricePerQuintal).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[10px]">
                      <span>Delivery Terms:</span>
                      <span className="text-slate-700 font-sans font-medium">{bid.deliveryTerms}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => onRejectBid(bid.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-lg text-xs font-semibold"
                    >
                      Decline Bid
                    </button>
                    <button
                      onClick={() => onAcceptBid(bid)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Accept Bid & Lock Escrow</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">
            Accepting a bid immediately generates a binding e-Agreement and locks funds in Escrow.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

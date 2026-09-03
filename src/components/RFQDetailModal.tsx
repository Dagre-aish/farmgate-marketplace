import React, { useState } from 'react';
import { Building2, PlusCircle, ShieldCheck } from 'lucide-react';
import { BuyerRFQ } from '../types';
import { COMMODITIES } from '../data/commodities';

interface RFQDetailModalProps {
  onClose: () => void;
  onAddRFQ: (newRfq: BuyerRFQ) => void;
}

export const RFQDetailModal: React.FC<RFQDetailModalProps> = ({
  onClose,
  onAddRFQ
}) => {
  const [buyerName, setBuyerName] = useState<string>('ITC Agri Business Division');
  const [commodityId, setCommodityId] = useState<string>('wheat');
  const [quantity, setQuantity] = useState<number>(1000);
  const [targetPrice, setTargetPrice] = useState<number>(2800);
  const [grade, setGrade] = useState<'Grade A' | 'Grade B' | 'Fair Average Quality (FAQ)'>('Grade A');
  const [moisture, setMoisture] = useState<number>(11.5);
  const [foreignMatter, setForeignMatter] = useState<number>(1.0);
  const [location, setLocation] = useState<string>('Indore Processing Center, MP');
  const [deadline, setDeadline] = useState<string>('Within 7 Days');

  const selectedCommodity = COMMODITIES.find((c) => c.id === commodityId) || COMMODITIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRfq: BuyerRFQ = {
      id: `rfq_${Date.now()}`,
      buyerId: `buyer_${Date.now()}`,
      buyerName,
      buyerLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
      commodityId: selectedCommodity.id,
      commodityName: selectedCommodity.name,
      requiredQuantityQuintals: quantity,
      fulfilledQuantityQuintals: 0,
      targetPricePerQuintal: targetPrice,
      paymentTerms: '100% Escrow Funded. Released within 4 hours of Digital Assaying',
      qualityRequirements: {
        grade,
        maxMoisturePct: moisture,
        maxForeignMatterPct: foreignMatter
      },
      deliveryLocation: location,
      deliveryDeadline: deadline,
      bidsCount: 0,
      status: 'OPEN',
      createdAt: 'Today'
    };

    onAddRFQ(newRfq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Post Corporate Procurement RFQ</h3>
              <p className="text-xs text-slate-500">Verified institutional buy contract backed by digital escrow</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Company / Buyer Entity Name</label>
            <input
              type="text"
              required
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Commodity Demanded</label>
              <select
                value={commodityId}
                onChange={(e) => setCommodityId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              >
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Total Demand (Quintals)</label>
              <input
                type="number"
                min="10"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Price (₹/qtl)</label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Quality Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
              >
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
                <option value="Fair Average Quality (FAQ)">Fair Average Quality (FAQ)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Delivery Hub Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Delivery Timeline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Escrow Protection Mandatory</span>
            </div>
            <p className="text-[11px] text-emerald-900/80">
              Upon farmer acceptance, the total contract value (₹{(quantity * targetPrice).toLocaleString('en-IN')}) will be deposited into the ICICI/SBI virtual escrow account prior to dispatch.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
            >
              Publish Buyer RFQ
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

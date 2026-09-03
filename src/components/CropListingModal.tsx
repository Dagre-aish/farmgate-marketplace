import React, { useState } from 'react';
import { PlusCircle, Upload, CheckCircle2, ShieldCheck, Sparkles, Scale, Clock, Calendar } from 'lucide-react';
import { FarmerListing, StorageType } from '../types';
import { COMMODITIES } from '../data/commodities';
import { pushListingToFirebase } from '../services/firebaseService';

interface CropListingModalProps {
  onClose: () => void;
  onAddListing: (newListing: FarmerListing) => void;
  defaultCommodityId?: string;
}

export const CropListingModal: React.FC<CropListingModalProps> = ({
  onClose,
  onAddListing,
  defaultCommodityId = 'wheat'
}) => {
  const [farmerName, setFarmerName] = useState<string>('Devendra Choudhary');
  const [phone, setPhone] = useState<string>('+91 98270 55123');
  const [village, setVillage] = useState<string>('Depalpur');
  const [district, setDistrict] = useState<string>('Indore');
  const [state, setState] = useState<string>('Madhya Pradesh');
  const [fpo, setFpo] = useState<string>('Malwa Krishi Vikas FPC');
  const [commodityId, setCommodityId] = useState<string>(defaultCommodityId);
  const [quantity, setQuantity] = useState<number>(120);
  const [askingPrice, setAskingPrice] = useState<number>(2740);
  const [minPrice, setMinPrice] = useState<number>(2650);
  const [storage, setStorage] = useState<StorageType>('wdra_accredited');
  const [grade, setGrade] = useState<'Grade A' | 'Grade B' | 'FAQ'>('Grade A');
  const [moisture, setMoisture] = useState<number>(11.2);
  const [foreignMatter, setForeignMatter] = useState<number>(0.8);

  // Auction Date & Time Slot Settings
  const [auctionEndDate, setAuctionEndDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [auctionTimeSlot, setAuctionTimeSlot] = useState<string>('Evening (4 PM - 7 PM)');
  const [auctionDurationHours, setAuctionDurationHours] = useState<number>(48);

  const selectedCommodity = COMMODITIES.find((c) => c.id === commodityId) || COMMODITIES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newListing: FarmerListing = {
      id: `list_${Date.now()}`,
      farmerName,
      farmerPhone: phone,
      village,
      district,
      state,
      fpoAffiliated: fpo || undefined,
      commodityId: selectedCommodity.id,
      commodityName: selectedCommodity.name,
      quantityQuintals: quantity,
      askingPricePerQuintal: askingPrice,
      minAcceptablePrice: minPrice,
      harvestDate: new Date().toISOString().split('T')[0],
      storageCondition: storage,
      qualityAssay: {
        grade,
        moisturePct: moisture,
        foreignMatterPct: foreignMatter,
        photos: [selectedCommodity.image]
      },
      bidsCount: 0,
      highestBidPricePerQtl: askingPrice,
      auctionEndDate,
      auctionTimeSlot,
      auctionDurationHours,
      status: 'AVAILABLE',
      createdAt: 'Just Now'
    };

    // Save to Firebase Firestore & Broadcast across open browser windows
    await pushListingToFirebase(newListing);

    onAddListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">List Harvest Lot for Corporate Bidding</h3>
              <p className="text-xs text-slate-500">Pair your crop directly with verified corporate bulk buyers</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Farmer Full Name</label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Mobile (WhatsApp/SMS)</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Village</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Harvest Crop</label>
              <select
                value={commodityId}
                onChange={(e) => setCommodityId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
              >
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Available Quantity (Quintals)</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Initial Starting Price (₹/qtl)</label>
              <input
                type="number"
                value={askingPrice}
                onChange={(e) => setAskingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Storage Condition</label>
              <select
                value={storage}
                onChange={(e) => setStorage(e.target.value as StorageType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="wdra_accredited">WDRA Warehouse</option>
                <option value="state_warehouse">State Warehouse (SWC)</option>
                <option value="ambient_shed">Farm Ambient Shed</option>
                <option value="cold_storage">Cold Storage</option>
              </select>
            </div>
          </div>

          {/* Auction Timing & Date Slot Settings */}
          <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 space-y-2.5">
            <span className="font-extrabold text-emerald-950 block text-[11px] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Auction Expiry & Time Slot Settings</span>
            </span>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Closing Date</label>
                <input
                  type="date"
                  value={auctionEndDate}
                  onChange={(e) => setAuctionEndDate(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Time Slot</label>
                <select
                  value={auctionTimeSlot}
                  onChange={(e) => setAuctionTimeSlot(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  <option value="24 Hours Express">24 Hours Express</option>
                  <option value="48 Hours Standard">48 Hours Standard</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Duration</label>
                <select
                  value={auctionDurationHours}
                  onChange={(e) => setAuctionDurationHours(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value={24}>24 Hours</option>
                  <option value={48}>48 Hours</option>
                  <option value={72}>72 Hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assaying specs */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block text-[11px]">Quality Assaying Specs</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block">Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                  <option value="FAQ">FAQ</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block">Moisture %</label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block">Foreign Matter %</label>
                <input
                  type="number"
                  step="0.1"
                  value={foreignMatter}
                  onChange={(e) => setForeignMatter(Number(e.target.value))}
                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <span>Publish to Live Bidding Floor & Firebase</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

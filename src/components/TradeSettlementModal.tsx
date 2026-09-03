import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  FileCheck2, 
  Coins, 
  ArrowRight, 
  Building, 
  UserCheck, 
  Download, 
  Share2,
  Lock,
  QrCode,
  Sparkles
} from 'lucide-react';
import { EscrowTransaction, EscrowStep } from '../types';

interface TradeSettlementModalProps {
  transaction: EscrowTransaction;
  onUpdateStep: (newStep: EscrowStep) => void;
  onClose: () => void;
}

export const TradeSettlementModal: React.FC<TradeSettlementModalProps> = ({
  transaction,
  onUpdateStep,
  onClose
}) => {
  const [upiId, setUpiId] = useState<string>('rameshwar.patidar@oksbi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const steps: { id: EscrowStep; label: string; icon: any; desc: string }[] = [
    { 
      id: 'CONTRACT_CREATED', 
      label: '1. e-Agreement', 
      icon: FileCheck2,
      desc: 'Digital contract signed with grade specs' 
    },
    { 
      id: 'ESCROW_FUNDED', 
      label: '2. Escrow Funded', 
      icon: Lock,
      desc: 'Buyer deposits 100% funds in ICICI/SBI Escrow' 
    },
    { 
      id: 'LOGISTICS_DISPATCHED', 
      label: '3. Farmgate Dispatch', 
      icon: Truck,
      desc: 'Vehicle loaded & weighbridge slip generated' 
    },
    { 
      id: 'QUALITY_ASSAYED', 
      label: '4. Quality Assayed', 
      icon: ShieldCheck,
      desc: 'Digital moisture & grade check verified' 
    },
    { 
      id: 'PAYOUT_RELEASED', 
      label: '5. Instant Payout', 
      icon: Coins,
      desc: 'Funds released directly to Farmer UPI' 
    }
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === transaction.currentStep);

  const handleNextStep = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (currentStepIndex < steps.length - 1) {
        const nextStep = steps[currentStepIndex + 1].id;
        onUpdateStep(nextStep);

        if (nextStep === 'PAYOUT_RELEASED') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Digital Escrow Trade Settlement
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Contract #{transaction.id.slice(-6)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                100% Guaranteed Settlement • 1.5% Platform Take Rate Commission
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1 rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* 5-Step Stepper Ribbon */}
        <div className="grid grid-cols-5 gap-1 text-center">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="space-y-1">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isCurrent
                      ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 font-black'
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <div className={`text-[10px] font-bold truncate ${
                  isCurrent ? 'text-emerald-800 font-black' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Step-Specific Interactive Details */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 text-xs">
          
          {/* Trade Parties & Lot Info */}
          <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200">
            <div>
              <span className="text-slate-400 text-[10px] block font-medium">Farmer / Producer</span>
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                {transaction.farmerName}
              </span>
              <span className="text-[11px] text-slate-500">{transaction.farmerPhone}</span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] block font-medium">Enterprise Buyer</span>
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                {transaction.buyerName}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">100% Escrow Funded</span>
            </div>
          </div>

          {/* Stage Details */}
          {transaction.currentStep === 'CONTRACT_CREATED' && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>e-Agreement Generated & Digitally Signed</span>
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Smart contract generated for {transaction.quantityQuintals} Quintals of {transaction.commodityName} at ₹{transaction.agreedPricePerQuintal}/quintal. Buyer escrow deposit required to initiate loading.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <span>Contract Hash: <code className="text-slate-600 font-mono">0x9f8b...32a1</code></span>
                <span className="text-emerald-700 font-bold">Legally Binding e-Sign</span>
              </div>
            </div>
          )}

          {transaction.currentStep === 'ESCROW_FUNDED' && (
            <div className="space-y-2">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Escrow Account Funded: ₹{transaction.totalGrossAmount.toLocaleString('en-IN')}</span>
              </h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                The buyer has deposited 100% of the contract value into the Reserve Bank of India compliant escrow virtual account. The seller is protected against payment default.
              </p>
              <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-800 text-[11px]">
                ✓ Bank UTR: <code>ICICR26132984019</code> • Safe to dispatch logistics vehicle
              </div>
            </div>
          )}

          {transaction.currentStep === 'LOGISTICS_DISPATCHED' && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Logistics & Weighbridge Slip Verification</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
                <div>Transporter: <span className="font-bold text-slate-800">{transaction.logistics.transporterName}</span></div>
                <div>Vehicle: <span className="font-bold text-slate-800">{transaction.logistics.vehicleNumber}</span></div>
                <div>Gross Wt: <span className="font-bold">{transaction.logistics.grossWeightTonnes} MT</span></div>
                <div>Net Harvest: <span className="font-bold text-emerald-700">{transaction.logistics.netWeightTonnes} MT ({transaction.quantityQuintals} qtl)</span></div>
              </div>
            </div>
          )}

          {transaction.currentStep === 'QUALITY_ASSAYED' && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Digital Quality Assaying Certificate Passed</span>
              </h4>
              <div className="bg-white p-3 rounded-lg border border-emerald-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800">Grade Verified: {transaction.qualityReport.grade}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">PASSED 100%</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>Moisture: <span className="font-bold">{transaction.qualityReport.measuredMoisturePct}%</span> (Max allowed 12.0%)</div>
                  <div>Foreign Matter: <span className="font-bold">{transaction.qualityReport.measuredForeignMatterPct}%</span> (Max allowed 1.0%)</div>
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  Digital spectroscopy assay conducted at destination gate. Assayer ID: AGY-IND-884
                </p>
              </div>
            </div>
          )}

          {transaction.currentStep === 'PAYOUT_RELEASED' && (
            <div className="space-y-3 text-center py-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-extrabold text-base text-emerald-900">
                  ₹{transaction.netFarmerPayout.toLocaleString('en-IN')} Paid Instantly!
                </h4>
                <p className="text-slate-600 text-[11px]">
                  Funds credited directly to {transaction.farmerName}'s UPI ({upiId}) in under 4 hours.
                </p>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 font-mono">
                IMPS Reference: <code>IMPS26132{Math.floor(Math.random() * 900000 + 100000)}</code>
              </div>
            </div>
          )}

          {/* Financial Breakdown & Commission Ledger */}
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-slate-600">
              <span>Gross Trade Value ({transaction.quantityQuintals} qtl @ ₹{transaction.agreedPricePerQuintal}):</span>
              <span className="font-bold text-slate-800">₹{transaction.totalGrossAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Platform Take Rate (1.5% Commission):</span>
              <span className="text-amber-700">-₹{transaction.platformFeeAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-800 pt-1 border-t border-slate-100 text-xs">
              <span>Net Farmer Realization:</span>
              <span className="text-sm">₹{transaction.netFarmerPayout.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
          >
            {transaction.currentStep === 'PAYOUT_RELEASED' ? 'Close Window' : 'Cancel'}
          </button>

          {transaction.currentStep !== 'PAYOUT_RELEASED' && (
            <button
              onClick={handleNextStep}
              disabled={isProcessing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <span>
                {isProcessing ? 'Processing...' : `Advance Stage: ${steps[currentStepIndex + 1]?.label || 'Done'}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

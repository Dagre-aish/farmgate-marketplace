import React, { useState, useEffect } from 'react';
import { 
  MandiPriceRecord, 
  BuyerRFQ, 
  FarmerListing, 
  EscrowTransaction, 
  EscrowStep, 
  AppLanguage, 
  UserRole,
  BuyerProfile,
  Bid
} from './types';
import { MANDI_RECORDS } from './data/mandiData';
import { INITIAL_BUYER_RFQS, INITIAL_FARMER_LISTINGS, BUYER_PROFILES, INITIAL_BIDS } from './data/buyerData';
import { Navbar } from './components/Navbar';
import { MandiPriceHub } from './components/MandiPriceHub';
import { SellOrHoldAdvisor } from './components/SellOrHoldAdvisor';
import { Marketplace } from './components/Marketplace';
import { LiveBiddingPanel } from './components/LiveBiddingPanel';
import { FPODashboard } from './components/FPODashboard';
import { TradeSettlementModal } from './components/TradeSettlementModal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { CropListingModal } from './components/CropListingModal';
import { RFQDetailModal } from './components/RFQDetailModal';
import { BuyerAuthModal } from './components/BuyerAuthModal';
import { PlaceBidModal } from './components/PlaceBidModal';
import { ListingBidsModal } from './components/ListingBidsModal';
import { UserAuthModal } from './components/UserAuthModal';
import { subscribeToRealtimeBids, subscribeToRealtimeListings, pushBidToFirebase } from './services/firebaseService';
import { subscribeToAuth, logoutUser, UserAccount } from './services/firebaseAuth';

export function App() {
  const [activeTab, setActiveTab] = useState<'mandi' | 'advisor' | 'marketplace' | 'bidding' | 'fpo'>('bidding');
  const [userRole, setUserRole] = useState<UserRole>('FARMER');
  const [language, setLanguage] = useState<AppLanguage>('en');

  // Firebase Auth State
  const [authUser, setAuthUser] = useState<UserAccount | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Core Datasets State
  const [mandiRecords, setMandiRecords] = useState<MandiPriceRecord[]>(MANDI_RECORDS);
  const [buyerRfqs, setBuyerRfqs] = useState<BuyerRFQ[]>(INITIAL_BUYER_RFQS);
  const [farmerListings, setFarmerListings] = useState<FarmerListing[]>(INITIAL_FARMER_LISTINGS);
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);

  // Active Logged-In Buyer Session
  const [activeBuyer, setActiveBuyer] = useState<BuyerProfile | null>(BUYER_PROFILES[0]); // Default to ITC Agri Business

  // Selected Commodity for AI Advisor
  const [advisorCommodityId, setAdvisorCommodityId] = useState<string>('wheat');

  // Modals State
  const [activeEscrowTransaction, setActiveEscrowTransaction] = useState<EscrowTransaction | null>(null);
  const [showPitchModal, setShowPitchModal] = useState<boolean>(false);
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);
  const [showNewListingModal, setShowNewListingModal] = useState<boolean>(false);
  const [showNewRFQModal, setShowNewRFQModal] = useState<boolean>(false);
  const [showBuyerAuthModal, setShowBuyerAuthModal] = useState<boolean>(false);

  // Bidding Modals State
  const [selectedListingForBid, setSelectedListingForBid] = useState<FarmerListing | null>(null);
  const [selectedListingBidsView, setSelectedListingBidsView] = useState<FarmerListing | null>(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribeAuth = subscribeToAuth((user) => {
      setAuthUser(user);
      if (user) {
        setUserRole(user.role);
        setActiveBuyer({
          id: user.uid,
          name: user.displayName,
          logo: user.photoURL || 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=200',
          email: user.email || 'buyer@corp.com',
          gstin: user.gstin || '23AAAAA0000A1Z5',
          kycTier: 'TIER_1_VERIFIED',
          escrowBalanceINR: user.escrowBalanceINR || 500000,
          commoditiesOfInterest: ['Wheat', 'Basmati Rice', 'Soybean']
        });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Firebase Realtime Bids & Listings Subscriptions
  useEffect(() => {
    const unsubscribeBids = subscribeToRealtimeBids((updatedBids) => {
      setBids(updatedBids);
    }, INITIAL_BIDS);

    const unsubscribeListings = subscribeToRealtimeListings((updatedListings) => {
      setFarmerListings(updatedListings);
    }, INITIAL_FARMER_LISTINGS);

    return () => {
      unsubscribeBids();
      unsubscribeListings();
    };
  }, []);

  // Quick navigation handlers
  const handleSelectForAdvisor = (commodityId: string) => {
    setAdvisorCommodityId(commodityId);
    setActiveTab('advisor');
  };

  const handleDirectMarketplace = (commodityId: string) => {
    setActiveTab('marketplace');
  };

  // Escrow Trade Lifecycle Handler
  const handleInitiateEscrow = (tradeData: {
    rfq?: BuyerRFQ;
    listing?: FarmerListing;
    agreedPrice: number;
    quantity: number;
    farmerName: string;
    buyerName: string;
  }) => {
    const grossAmount = tradeData.agreedPrice * tradeData.quantity;
    const platformFee = Math.round(grossAmount * 0.015); // 1.5% take rate
    const netPayout = grossAmount - platformFee;

    const newTransaction: EscrowTransaction = {
      id: `escrow_${Date.now()}`,
      rfqId: tradeData.rfq?.id,
      listingId: tradeData.listing?.id,
      commodityName: tradeData.rfq?.commodityName || tradeData.listing?.commodityName || 'Lokwan Wheat',
      quantityQuintals: tradeData.quantity,
      agreedPricePerQuintal: tradeData.agreedPrice,
      totalGrossAmount: grossAmount,
      platformFeePct: 1.5,
      platformFeeAmount: platformFee,
      transportFee: 0, // Direct farmgate pick-up by corporate buyer
      netFarmerPayout: netPayout,
      buyerName: tradeData.buyerName,
      buyerId: tradeData.rfq?.buyerId || activeBuyer?.id || 'buyer_corp_1',
      farmerName: authUser ? authUser.displayName : tradeData.farmerName,
      farmerPhone: '+91 98261 44521',
      farmerUPIorBank: 'farmer.patidar@oksbi',
      currentStep: 'CONTRACT_CREATED',
      stepTimestamps: {
        contractCreated: 'Just Now'
      },
      logistics: {
        transporterName: 'Farmgate Agri-Logistics Network',
        vehicleNumber: 'MP-09-HG-4421',
        driverPhone: '+91 98930 11200',
        weighbridgeSlipNo: `WB-${Math.floor(Math.random() * 90000 + 10000)}`,
        grossWeightTonnes: Number(((tradeData.quantity * 100 + 4500) / 1000).toFixed(2)),
        tareWeightTonnes: 4.5,
        netWeightTonnes: Number(((tradeData.quantity * 100) / 1000).toFixed(2))
      },
      qualityReport: {
        grade: 'Grade A',
        measuredMoisturePct: 11.2,
        measuredForeignMatterPct: 0.8,
        passed: true,
        assayRemarks: 'Digital Spectroscopy Passed: Grade A Premium Milling'
      }
    };

    setActiveEscrowTransaction(newTransaction);
  };

  const handleUpdateEscrowStep = (newStep: EscrowStep) => {
    if (!activeEscrowTransaction) return;

    setActiveEscrowTransaction({
      ...activeEscrowTransaction,
      currentStep: newStep,
      stepTimestamps: {
        ...activeEscrowTransaction.stepTimestamps,
        ...(newStep === 'ESCROW_FUNDED' ? { escrowFunded: 'Just Now' } : {}),
        ...(newStep === 'LOGISTICS_DISPATCHED' ? { dispatched: 'Just Now' } : {}),
        ...(newStep === 'QUALITY_ASSAYED' ? { assayed: 'Just Now' } : {}),
        ...(newStep === 'PAYOUT_RELEASED' ? { payoutReleased: 'Just Now' } : {})
      }
    });
  };

  const handleAddFarmerListing = (newListing: FarmerListing) => {
    setFarmerListings([newListing, ...farmerListings]);
  };

  const handleAddBuyerRFQ = (newRfq: BuyerRFQ) => {
    setBuyerRfqs([newRfq, ...buyerRfqs]);
  };

  // Submit Bid Handler -> Pushes to Firebase Firestore
  const handleSubmitBid = (newBid: Bid) => {
    setBids((prevBids) => [newBid, ...prevBids]);

    // Push to Firebase Firestore & BroadcastChannel
    pushBidToFirebase(newBid);

    // Update listing bid count and highest bid
    setFarmerListings((prevListings) => prevListings.map((list) => {
      if (list.id === newBid.listingId) {
        const currentCount = list.bidsCount || 0;
        const currentHighest = list.highestBidPricePerQtl || 0;

        return {
          ...list,
          bidsCount: currentCount + 1,
          highestBidPricePerQtl: Math.max(currentHighest, newBid.bidPricePerQuintal)
        };
      }
      return list;
    }));
  };

  // Accept Bid Handler -> Launches Escrow
  const handleAcceptBid = (bid: Bid) => {
    const matchingListing = farmerListings.find((l) => l.id === bid.listingId);

    handleInitiateEscrow({
      listing: matchingListing,
      agreedPrice: bid.bidPricePerQuintal,
      quantity: bid.bidQuantityQuintals,
      farmerName: matchingListing?.farmerName || 'Rameshwar Patidar',
      buyerName: bid.bidderName
    });

    setSelectedListingBidsView(null);
  };

  const handleRejectBid = (bidId: string) => {
    setBids(bids.filter((b) => b.id !== bidId));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        language={language}
        setLanguage={setLanguage}
        activeBuyer={activeBuyer}
        authUser={authUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={() => logoutUser()}
        onOpenBuyerAuth={() => setShowBuyerAuthModal(true)}
        onOpenVoice={() => setShowVoiceModal(true)}
        onOpenPitch={() => setShowPitchModal(true)}
        onOpenNewListing={() => {
          if (userRole === 'BUYER') {
            setShowNewRFQModal(true);
          } else {
            setShowNewListingModal(true);
          }
        }}
        mandiRecords={mandiRecords}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'bidding' && (
          <LiveBiddingPanel
            farmerListings={farmerListings}
            bids={bids}
            userRole={userRole}
            activeBuyer={activeBuyer}
            authUser={authUser}
            onOpenBuyerAuth={() => setShowAuthModal(true)}
            onOpenNewListing={() => setShowNewListingModal(true)}
            onSubmitBid={handleSubmitBid}
            onAcceptBid={handleAcceptBid}
            language={language}
          />
        )}

        {activeTab === 'mandi' && (
          <MandiPriceHub
            mandiRecords={mandiRecords}
            onSelectForAdvisor={handleSelectForAdvisor}
            onDirectMarketplace={handleDirectMarketplace}
            language={language}
          />
        )}

        {activeTab === 'advisor' && (
          <SellOrHoldAdvisor
            mandiRecords={mandiRecords}
            selectedCommodityId={advisorCommodityId}
            onDirectMarketplace={handleDirectMarketplace}
            onOpenNewListing={(commodityId) => {
              setAdvisorCommodityId(commodityId);
              setShowNewListingModal(true);
            }}
            language={language}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            buyerRfqs={buyerRfqs}
            farmerListings={farmerListings}
            bids={bids}
            userRole={userRole}
            activeBuyer={activeBuyer}
            onInitiateEscrow={handleInitiateEscrow}
            onOpenNewListing={() => setShowNewListingModal(true)}
            onOpenNewRFQ={() => setShowNewRFQModal(true)}
            onOpenPlaceBid={(listing) => {
              if (!authUser) {
                setShowAuthModal(true);
              } else {
                setSelectedListingForBid(listing);
              }
            }}
            onOpenListingBids={(listing) => setSelectedListingBidsView(listing)}
            onOpenBuyerAuth={() => setShowAuthModal(true)}
            language={language}
          />
        )}

        {activeTab === 'fpo' && (
          <FPODashboard language={language} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              🌾
            </div>
            <span className="font-bold text-slate-200 text-sm">Farmgate</span>
            <span className="text-slate-500">•</span>
            <span>SIH26132 Price Discovery & Direct Agritech Marketplace</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>DeHaat & Ninjacart Comparable Unit Economics</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Escrow Protected</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {showAuthModal && (
        <UserAuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(user) => {
            setAuthUser(user);
            setUserRole(user.role);
          }}
          initialRole={userRole}
          language={language}
        />
      )}

      {activeEscrowTransaction && (
        <TradeSettlementModal
          transaction={activeEscrowTransaction}
          onUpdateStep={handleUpdateEscrowStep}
          onClose={() => setActiveEscrowTransaction(null)}
        />
      )}

      {showPitchModal && (
        <PitchDeckModal onClose={() => setShowPitchModal(false)} />
      )}

      {showVoiceModal && (
        <VoiceAssistantModal
          onClose={() => setShowVoiceModal(false)}
          onNavigateToTab={(tab) => {
            if (tab === 'mandi' || tab === 'advisor' || tab === 'marketplace' || tab === 'fpo') {
              setActiveTab(tab);
            }
            setShowVoiceModal(false);
          }}
          onSelectCommodity={(commodityId) => {
            setAdvisorCommodityId(commodityId);
          }}
        />
      )}

      {showNewListingModal && (
        <CropListingModal
          defaultCommodityId={advisorCommodityId}
          onClose={() => setShowNewListingModal(false)}
          onAddListing={handleAddFarmerListing}
        />
      )}

      {showNewRFQModal && (
        <RFQDetailModal
          onClose={() => setShowNewRFQModal(false)}
          onAddRFQ={handleAddBuyerRFQ}
        />
      )}

      {showBuyerAuthModal && (
        <BuyerAuthModal
          onClose={() => setShowBuyerAuthModal(false)}
          activeBuyer={activeBuyer}
          onSelectBuyer={(buyer) => {
            setActiveBuyer(buyer);
            setUserRole('BUYER');
          }}
        />
      )}

      {selectedListingForBid && activeBuyer && (
        <PlaceBidModal
          listing={selectedListingForBid}
          activeBuyer={activeBuyer}
          onClose={() => setSelectedListingForBid(null)}
          onSubmitBid={handleSubmitBid}
          onOpenAuthModal={() => setShowAuthModal(true)}
        />
      )}

      {selectedListingBidsView && (
        <ListingBidsModal
          listing={selectedListingBidsView}
          bids={bids}
          onClose={() => setSelectedListingBidsView(null)}
          onAcceptBid={handleAcceptBid}
          onRejectBid={handleRejectBid}
        />
      )}

    </div>
  );
}

export default App;

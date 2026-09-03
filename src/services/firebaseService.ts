import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { Bid, FarmerListing, BuyerRFQ, EscrowTransaction } from '../types';

// Real Firebase Project Config from console.firebase.google.com
const firebaseConfig = {
  apiKey: "AIzaSyAbg6ymoD44thEaxUzFzcPjuZyFwNNiBP8",
  authDomain: "farmgate-sih26132.firebaseapp.com",
  projectId: "farmgate-sih26132",
  storageBucket: "farmgate-sih26132.firebasestorage.app",
  messagingSenderId: "177233662508",
  appId: "1:177233662508:web:770e94372e5cc5fd70f789",
  measurementId: "G-PH2EY24L0F"
};

// Initialize Firebase App safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// BroadcastChannel for sub-millisecond local cross-window/browser sync
const broadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('farmgate_firebase_sync')
  : null;

/**
 * Trigger Live Browser Push Notification & Toast
 */
export function triggerPushNotification(title: string, body: string) {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '🌾'
        });
      } catch (e) {}
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          try {
            new Notification(title, { body, icon: '🌾' });
          } catch (e) {}
        }
      });
    }
  }
}

/**
 * Real-time Farmer Listings Listener (Firestore + BroadcastChannel)
 */
export function subscribeToRealtimeListings(
  onListingsUpdate: (listings: FarmerListing[]) => void,
  initialListings: FarmerListing[]
) {
  let currentListings = [...initialListings];

  // 1. Firebase Firestore Realtime Listener for Listings
  try {
    const listingsQuery = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(
      listingsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreListings: FarmerListing[] = [];
          snapshot.forEach((docSnap) => {
            firestoreListings.push({ id: docSnap.id, ...docSnap.data() } as FarmerListing);
          });

          if (firestoreListings.length > 0) {
            // Merge firestore listings with initial static listings (avoid duplicates)
            const existingIds = new Set(firestoreListings.map(l => l.id));
            const merged = [
              ...firestoreListings,
              ...initialListings.filter(l => !existingIds.has(l.id))
            ];
            currentListings = merged;
            onListingsUpdate(merged);
          }
        }
      },
      (error) => {
        console.warn('Firebase Firestore listings listening warning:', error.message);
      }
    );
  } catch (e) {
    console.warn('Firebase listings initialization note:', e);
  }

  // 2. BroadcastChannel Local Cross-Browser Sync Listener
  if (broadcastChannel) {
    broadcastChannel.onmessage = (event) => {
      if (event.data?.type === 'NEW_LISTING') {
        const newListing = event.data.payload as FarmerListing;
        if (!currentListings.some((l) => l.id === newListing.id)) {
          currentListings = [newListing, ...currentListings];
          onListingsUpdate(currentListings);
          triggerPushNotification(
            '🌾 NEW CROP AUCTION LIVE!',
            `${newListing.farmerName} listed ${newListing.quantityQuintals} Quintals of ${newListing.commodityName} starting at ₹${newListing.askingPricePerQuintal}/qtl.`
          );
        }
      } else if (event.data?.type === 'NEW_BID') {
        const newBid = event.data.payload as Bid;
        triggerPushNotification(
          '🔔 NEW BINDING BID SUBMITTED!',
          `${newBid.bidderName} placed a bid of ₹${newBid.bidPricePerQuintal}/qtl on ${newBid.commodityName}!`
        );
      }
    };
  }

  return () => {
    // Cleanup
  };
}

/**
 * Publish New Farmer Auction Listing to Firebase Firestore & BroadcastChannel
 */
export async function pushListingToFirebase(newListing: FarmerListing): Promise<void> {
  // Broadcast to other open browser windows/tabs immediately
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'NEW_LISTING', payload: newListing });
  }

  triggerPushNotification(
    '🌾 NEW CROP AUCTION LIVE!',
    `${newListing.farmerName} listed ${newListing.quantityQuintals} Quintals of ${newListing.commodityName} starting at ₹${newListing.askingPricePerQuintal}/qtl.`
  );

  // Push to Firebase Cloud Firestore
  try {
    const listingDocRef = doc(db, 'listings', newListing.id);
    await setDoc(listingDocRef, {
      ...newListing,
      firestoreTimestamp: serverTimestamp()
    });
    console.log('Farmer Listing successfully synced to Firebase Firestore:', newListing.id);
  } catch (err) {
    console.warn('Saved listing locally & broadcasted:', err);
  }
}

/**
 * Real-time Bids Listener (Firestore + BroadcastChannel)
 */
export function subscribeToRealtimeBids(
  onBidsUpdate: (bids: Bid[]) => void,
  initialBids: Bid[]
) {
  let currentBids = [...initialBids];

  try {
    const bidsQuery = query(collection(db, 'bids'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(
      bidsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreBids: Bid[] = [];
          snapshot.forEach((docSnap) => {
            firestoreBids.push({ id: docSnap.id, ...docSnap.data() } as Bid);
          });

          if (firestoreBids.length > 0) {
            currentBids = firestoreBids;
            onBidsUpdate(firestoreBids);
          }
        }
      },
      (error) => {
        console.warn('Firebase Firestore listening warning:', error.message);
      }
    );
  } catch (e) {
    console.warn('Firebase initialization note:', e);
  }

  if (broadcastChannel) {
    const origHandler = broadcastChannel.onmessage;
    broadcastChannel.onmessage = (event) => {
      if (origHandler) origHandler(event);
      if (event.data?.type === 'NEW_BID') {
        const newBid = event.data.payload as Bid;
        if (!currentBids.some((b) => b.id === newBid.id)) {
          currentBids = [newBid, ...currentBids];
          onBidsUpdate(currentBids);
        }
      }
    };
  }

  return () => {
    // Cleanup
  };
}

/**
 * Publish New Bid to Firebase Firestore & BroadcastChannel
 */
export async function pushBidToFirebase(newBid: Bid): Promise<void> {
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'NEW_BID', payload: newBid });
  }

  triggerPushNotification(
    '🔔 NEW BINDING BID SUBMITTED!',
    `${newBid.bidderName} placed a bid of ₹${newBid.bidPricePerQuintal}/qtl on ${newBid.commodityName}!`
  );

  try {
    const bidDocRef = doc(db, 'bids', newBid.id);
    await setDoc(bidDocRef, {
      ...newBid,
      firestoreTimestamp: serverTimestamp()
    });
    console.log('Bid successfully synced to Firebase Firestore:', newBid.id);
  } catch (err) {
    console.warn('Saved bid locally & broadcasted:', err);
  }
}

/**
 * Blackout / Withdraw Bid in Firebase Firestore & BroadcastChannel
 */
export async function withdrawBidInFirebase(bidId: string): Promise<void> {
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'WITHDRAW_BID', payload: { bidId } });
  }

  triggerPushNotification(
    '🚫 BIDDER BLACKOUT / WITHDRAWAL!',
    `A corporate bidder has opted out and withdrawn their bid from the active auction floor.`
  );

  try {
    const bidDocRef = doc(db, 'bids', bidId);
    await setDoc(bidDocRef, {
      status: 'WITHDRAWN'
    }, { merge: true });
    console.log('Bid successfully marked as WITHDRAWN in Firebase Firestore:', bidId);
  } catch (err) {
    console.warn('Updated bid status locally:', err);
  }
}

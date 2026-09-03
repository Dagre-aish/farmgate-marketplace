import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  addDoc, 
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
 * Real-time Bids Listener (Firestore + BroadcastChannel)
 */
export function subscribeToRealtimeBids(
  onBidsUpdate: (bids: Bid[]) => void,
  initialBids: Bid[]
) {
  let currentBids = [...initialBids];

  // 1. Firebase Firestore Realtime Snapshot Listener
  try {
    const bidsQuery = query(collection(db, 'bids'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(
      bidsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreBids: Bid[] = [];
          snapshot.forEach((doc) => {
            firestoreBids.push({ id: doc.id, ...doc.data() } as Bid);
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

  // 2. BroadcastChannel Local Cross-Browser Sync Listener
  if (broadcastChannel) {
    broadcastChannel.onmessage = (event) => {
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
    // Unsubscribe cleanup
  };
}

/**
 * Publish New Bid to Firebase Firestore & BroadcastChannel
 */
export async function pushBidToFirebase(newBid: Bid): Promise<void> {
  // Broadcast to other open browser windows/tabs immediately
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'NEW_BID', payload: newBid });
  }

  // Push to Firebase Cloud Firestore
  try {
    const bidDocRef = doc(db, 'bids', newBid.id);
    await setDoc(bidDocRef, {
      ...newBid,
      firestoreTimestamp: serverTimestamp()
    });
    console.log('Bid successfully synced to Firebase Firestore project farmgate-sih26132:', newBid.id);
  } catch (err) {
    console.warn('Saved bid locally & broadcasted:', err);
  }
}

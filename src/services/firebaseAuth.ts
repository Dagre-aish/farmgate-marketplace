import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User 
} from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { UserRole } from '../types';

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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export interface UserAccount {
  uid: string;
  email: string | null;
  displayName: string;
  role: UserRole;
  photoURL?: string | null;
  phoneNumber?: string | null;
  kycStatus?: string;
  escrowBalanceINR?: number;
  gstin?: string;
  district?: string;
  state?: string;
  upiId?: string;
}

/**
 * Subscribe to Firebase Auth State Changes
 */
export function subscribeToAuth(callback: (user: UserAccount | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
    if (firebaseUser) {
      let role: UserRole = 'FARMER';
      let escrowBalanceINR = 250000;
      let gstin = '';
      let district = '';

      try {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          if (data.role) role = data.role as UserRole;
          if (data.escrowBalanceINR !== undefined) escrowBalanceINR = data.escrowBalanceINR;
          if (data.gstin) gstin = data.gstin;
          if (data.district) district = data.district;
        }
      } catch (err) {
        console.warn('Firestore user fetch note:', err);
      }

      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Agri User',
        role: role,
        photoURL: firebaseUser.photoURL,
        phoneNumber: firebaseUser.phoneNumber,
        kycStatus: 'TIER_1_VERIFIED',
        escrowBalanceINR,
        gstin,
        district
      });
    } else {
      callback(null);
    }
  });
}

/**
 * Sign Up with Email and Password & Detailed Role Profile
 */
export async function signUpWithEmail(
  email: string, 
  password: string, 
  displayName: string,
  role: UserRole,
  extraProfileData: {
    gstin?: string;
    district?: string;
    state?: string;
    landholdingAcres?: number;
    upiId?: string;
  } = {}
): Promise<UserAccount> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (displayName) {
    await updateProfile(user, { displayName });
  }

  const escrowBalanceINR = role === 'BUYER' ? 500000 : 50000;

  // Save role and detailed profile data to Firestore
  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.email?.split('@')[0],
      role: role,
      escrowBalanceINR,
      ...extraProfileData,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Saved user auth credentials locally:', err);
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: displayName || user.email?.split('@')[0] || 'Agri User',
    role: role,
    kycStatus: 'TIER_1_VERIFIED',
    escrowBalanceINR,
    ...extraProfileData
  };
}

/**
 * Sign In with Email and Password
 */
export async function signInWithEmail(email: string, password: string): Promise<UserAccount> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  let role: UserRole = 'FARMER';
  let escrowBalanceINR = 250000;
  let gstin = '';

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      if (data.role) role = data.role as UserRole;
      if (data.escrowBalanceINR !== undefined) escrowBalanceINR = data.escrowBalanceINR;
      if (data.gstin) gstin = data.gstin;
    }
  } catch (e) {}

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'Agri User',
    role: role,
    photoURL: user.photoURL,
    kycStatus: 'TIER_1_VERIFIED',
    escrowBalanceINR,
    gstin
  };
}

/**
 * Sign In / Sign Up with Google OAuth 1-Click Popup
 */
export async function signInWithGoogle(defaultRole: UserRole = 'FARMER'): Promise<UserAccount> {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  let role: UserRole = defaultRole;
  let escrowBalanceINR = 500000;

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      if (data.role) role = data.role as UserRole;
      if (data.escrowBalanceINR !== undefined) escrowBalanceINR = data.escrowBalanceINR;
    } else {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: defaultRole,
        escrowBalanceINR: defaultRole === 'BUYER' ? 500000 : 50000,
        createdAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.warn('Google sign in profile sync note:', err);
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'Agri User',
    role: role,
    photoURL: user.photoURL,
    kycStatus: 'TIER_1_VERIFIED',
    escrowBalanceINR
  };
}

/**
 * Sign Out
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

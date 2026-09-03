import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Building2,
  Users,
  Wheat,
  FileText,
  MapPin,
  Landmark
} from 'lucide-react';
import { UserRole, AppLanguage } from '../types';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, UserAccount } from '../services/firebaseAuth';
import { TRANSLATIONS } from '../services/i18n';

interface UserAuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  initialRole?: UserRole;
  language?: AppLanguage;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  onClose,
  onSuccess,
  initialRole = 'FARMER',
  language = 'en'
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [mode, setMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
  const [role, setRole] = useState<UserRole>(initialRole);
  
  // Basic Auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Role-Specific Profile Details
  const [displayName, setDisplayName] = useState('');
  const [gstin, setGstin] = useState('');
  const [district, setDistrict] = useState('Sehore');
  const [state, setState] = useState('Madhya Pradesh');
  const [landholdingAcres, setLandholdingAcres] = useState<number>(5.5);
  const [upiId, setUpiId] = useState('farmer.patidar@oksbi');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (mode === 'SIGN_UP') {
        if (!email || !password) {
          throw new Error('Please fill in email and password.');
        }
        if (!displayName) {
          throw new Error(role === 'BUYER' ? 'Please enter Company Name.' : 'Please enter Name.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }

        const extraProfileData = {
          gstin: role === 'BUYER' ? gstin : undefined,
          district: role === 'FARMER' ? district : undefined,
          state: role === 'FARMER' ? state : undefined,
          landholdingAcres: role === 'FARMER' ? landholdingAcres : undefined,
          upiId: role === 'FARMER' ? upiId : undefined
        };

        const user = await signUpWithEmail(email, password, displayName, role, extraProfileData);
        onSuccess(user);
        onClose();
      } else {
        if (!email || !password) {
          throw new Error('Please fill in both email and password.');
        }
        const user = await signInWithEmail(email, password);
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      let message = err.message || 'Authentication failed. Please try again.';

      if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        message = 'Your Vercel domain is not authorized in Firebase Console yet! Go to console.firebase.google.com -> Authentication -> Settings -> Authorized domains -> Add your Vercel URL.';
      } else if (err.code === 'auth/configuration-not-found' || err.message?.includes('configuration-not-found')) {
        message = 'Firebase Auth is not enabled yet in your Firebase Console! Please go to console.firebase.google.com -> Authentication -> Click "Get Started" and enable Email/Password & Google.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password credentials.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'An account with this email already exists. Try signing in instead.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use at least 6 characters.';
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const user = await signInWithGoogle(role);
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      let message = err.message || 'Google Sign In failed. Please try again.';
      if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        message = 'Your Vercel domain is not authorized in Firebase Console yet! Go to console.firebase.google.com -> Authentication -> Settings -> Authorized domains -> Add your Vercel URL.';
      } else if (err.code === 'auth/configuration-not-found' || err.message?.includes('configuration-not-found')) {
        message = 'Firebase Auth is not enabled yet in your Firebase Console! Please go to console.firebase.google.com -> Authentication -> Click "Get Started" and enable Email/Password & Google.';
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden animate-in fade-in zoom-in-95 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900">
                {mode === 'SIGN_IN' ? 'Firebase Sign In' : 'Create Farmgate Profile'}
              </h2>
              <p className="text-[11px] text-slate-500">
                Secured by Firebase Authentication & 100% Escrow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center">
          <button
            type="button"
            onClick={() => {
              setMode('SIGN_IN');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'SIGN_IN'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('SIGN_UP');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'SIGN_UP'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Select Account Role:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'FARMER' as UserRole, label: 'Farmer / Producer', icon: '🌾' },
              { id: 'BUYER' as UserRole, label: 'Corporate Buyer', icon: '🏢' },
              { id: 'FPO' as UserRole, label: 'FPO Admin', icon: '👥' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  role === r.id
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className="text-base block">{r.icon}</span>
                <span className="text-[10px] block leading-tight">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Role Rules Banner */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-600">
          {role === 'FARMER' && (
            <span className="text-emerald-800 font-semibold">
              🌾 <strong>Farmer Access:</strong> Can list harvest lots, set asking price & time slots, view live auction bids, and accept top corporate offers. <em>(Farmers view bids, but cannot bid on lots).</em>
            </span>
          )}
          {role === 'BUYER' && (
            <span className="text-emerald-800 font-semibold">
              🏢 <strong>Corporate Buyer Access:</strong> Can place binding corporate bids backed by escrow. <em>(Bids are legally binding and cannot be deleted once submitted).</em>
            </span>
          )}
          {role === 'FPO' && (
            <span className="text-amber-900 font-semibold">
              👥 <strong>FPO Admin Access:</strong> Can aggregate smallholder farmer lots into batch pools and access 90-day forward demand forecasts.
            </span>
          )}
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold py-2.5 px-4 border border-slate-300 rounded-xl text-xs transition-all shadow-2xs flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google Account</span>
        </button>

        <div className="relative flex items-center justify-center">
          <hr className="w-full border-slate-200" />
          <span className="bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
            or fill details
          </span>
        </div>

        {/* Role-Specific Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Sign Up Fields */}
          {mode === 'SIGN_UP' && (
            <>
              {role === 'BUYER' ? (
                <>
                  <div>
                    <label className="block text-slate-600 font-semibold text-xs mb-1">Company Name</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Reliance Retail Fresh, ITC Agri Business"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold text-xs mb-1">Corporate GSTIN Number</label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        placeholder="e.g. 23AAAAA0000A1Z5"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </>
              ) : role === 'FARMER' ? (
                <>
                  <div>
                    <label className="block text-slate-600 font-semibold text-xs mb-1">Farmer Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Rameshwar Patidar"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-semibold text-xs mb-1">District</label>
                      <input
                        type="text"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="e.g. Sehore"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold text-xs mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Madhya Pradesh"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-semibold text-xs mb-1">Land (Acres)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={landholdingAcres}
                        onChange={(e) => setLandholdingAcres(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold text-xs mb-1">UPI ID for Escrow Payout</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="farmer@oksbi"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 font-mono"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-slate-600 font-semibold text-xs mb-1">FPO Collective Name</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Sehore Krishi Vikas Producer Co."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-slate-600 font-semibold text-xs mb-1">
              {role === 'BUYER' ? 'Corporate Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold text-xs mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Processing...' : mode === 'SIGN_IN' ? 'Sign In to Farmgate' : 'Complete Profile Setup'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

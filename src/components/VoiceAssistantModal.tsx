import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight,
  RefreshCw,
  Send,
  Globe,
  Radio,
  AlertCircle,
  TrendingUp,
  VolumeX
} from 'lucide-react';
import { 
  createSpeechRecognizer, 
  speakText, 
  stopSpeaking, 
  isSpeechRecognitionSupported 
} from '../services/speechService';
import { processVoiceQuery, VoiceNLPResponse } from '../services/voiceNLPService';

interface VoiceAssistantModalProps {
  onClose: () => void;
  onNavigateToTab: (tab: 'mandi' | 'advisor' | 'marketplace' | 'fpo') => void;
  onSelectCommodity?: (commodityId: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  onClose,
  onNavigateToTab,
  onSelectCommodity
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<string>('hi-IN');
  const [transcript, setTranscript] = useState<string>('');
  const [interimText, setInterimText] = useState<string>('');
  const [manualQuery, setManualQuery] = useState<string>('');
  const [lastNLPResult, setLastNLPResult] = useState<VoiceNLPResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasSpeechSupport, setHasSpeechSupport] = useState<boolean>(true);
  const [isSpeakingResponse, setIsSpeakingResponse] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setHasSpeechSupport(isSpeechRecognitionSupported());
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);

  const sampleQuickQueries = [
    {
      hindi: 'इंदौर मंडी में गेहूं का आज का भाव क्या है?',
      eng: "What is today's wheat price in Indore Mandi?",
      lang: 'hi-IN'
    },
    {
      hindi: 'क्या मुझे आज प्याज बेचना चाहिए या रोकना चाहिए?',
      eng: 'Should I sell my onion today or hold it?',
      lang: 'hi-IN'
    },
    {
      hindi: 'आईटीसी या रिलायंस का क्या ऑर्डर है?',
      eng: 'Show me ITC or Reliance bulk buyer orders',
      lang: 'hi-IN'
    },
    {
      hindi: 'सोयाबीन वेयरहाउस रसीद पर कितना लोन मिलेगा?',
      eng: 'How much loan can I get on soybean warehouse receipt?',
      lang: 'hi-IN'
    },
    {
      hindi: 'गुंटूर में लाल मिर्च का भाव क्या है?',
      eng: "What is red chilli price in Guntur Mandi?",
      lang: 'hi-IN'
    }
  ];

  const handleProcessAndAnswer = (queryText: string) => {
    if (!queryText.trim()) return;

    setErrorMessage('');
    const isHindi = selectedVoiceLang.startsWith('hi') || selectedVoiceLang.startsWith('mr') || selectedVoiceLang.startsWith('pa');
    const result = processVoiceQuery(queryText, isHindi ? 'hi' : 'en');
    setLastNLPResult(result);

    const spokenText = isHindi ? result.spokenResponseHindi : result.spokenResponseEnglish;
    setIsSpeakingResponse(true);
    speakText(spokenText, selectedVoiceLang);

    if (result.detectedCommodityId && onSelectCommodity) {
      onSelectCommodity(result.detectedCommodityId);
    }
  };

  const startListening = () => {
    setErrorMessage('');
    setTranscript('');
    setInterimText('');
    stopSpeaking();

    if (!hasSpeechSupport) {
      setErrorMessage('Speech recognition is not natively supported in this browser. You can type your query below.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognizer = createSpeechRecognizer(
        (payload) => {
          if (payload.isFinal) {
            setTranscript(payload.transcript);
            setInterimText('');
            setIsListening(false);
            handleProcessAndAnswer(payload.transcript);
          } else {
            setInterimText(payload.transcript);
          }
        },
        (error) => {
          setIsListening(false);
          setErrorMessage(error);
        },
        () => {
          setIsListening(false);
        },
        selectedVoiceLang
      );

      if (recognizer) {
        recognitionRef.current = recognizer;
        recognizer.start();
        setIsListening(true);
      }
    } catch (e: any) {
      console.error('Error starting speech recognition:', e);
      setIsListening(false);
      setErrorMessage(e?.message || 'Could not start microphone');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;
    setTranscript(manualQuery);
    handleProcessAndAnswer(manualQuery);
    setManualQuery('');
  };

  const handleSelectQuickPrompt = (prompt: { hindi: string; eng: string; lang: string }) => {
    const textToUse = selectedVoiceLang.startsWith('hi') ? prompt.hindi : prompt.eng;
    setTranscript(textToUse);
    handleProcessAndAnswer(textToUse);
  };

  const handleNavigateFromVoice = () => {
    if (!lastNLPResult) return;
    stopSpeaking();
    onNavigateToTab(lastNLPResult.actionTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">
                  Farmer Voice AI (किसान वाणी)
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  REAL-TIME SPEECH
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Ask live mandi prices, sell vs hold recommendations & buyer RFQs
              </p>
            </div>
          </div>

          <button 
            onClick={() => { stopSpeaking(); stopListening(); onClose(); }}
            className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Voice Language Selector Bar */}
        <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
          <span className="font-semibold text-slate-600 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Spoken Language:</span>
          </span>

          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'hi-IN', label: 'हिन्दी (Hindi)' },
              { id: 'en-IN', label: 'English' },
              { id: 'mr-IN', label: 'मराठी (Marathi)' },
              { id: 'pa-IN', label: 'ਪੰਜਾਬੀ (Punjabi)' },
              { id: 'te-IN', label: 'తెలుగు (Telugu)' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedVoiceLang(lang.id)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap ${
                  selectedVoiceLang === lang.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Microphone Pulse Center */}
        <div className="text-center py-3 space-y-3 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100 p-4">
          <div className="relative inline-block">
            {isListening && (
              <>
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60"></span>
                <span className="animate-pulse absolute -inset-2 rounded-full bg-emerald-500/20"></span>
              </>
            )}
            
            <button
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all shadow-xl active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-500 to-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                  : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-emerald-500/30'
              }`}
              title={isListening ? 'Click to stop listening' : 'Click to speak'}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
              {isListening ? (
                <>
                  <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span className="text-rose-600">सुन रहा हूँ... बोलिए (Listening live...)</span>
                </>
              ) : (
                <span>माइक दबाएं और बोलें (Tap Mic to Speak)</span>
              )}
            </p>
            
            {/* Real-time transcribed text / interim live text */}
            {(interimText || transcript) && (
              <div className="mt-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-medium text-emerald-900 max-w-md mx-auto animate-in fade-in">
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block mb-0.5">
                  {interimText ? 'Transcribing...' : 'Spoken Query:'}
                </span>
                "{interimText || transcript}"
              </div>
            )}
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Speech Notice</span>
              <p className="text-[11px] leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Assistant Response Box with Audio Output */}
        {lastNLPResult ? (
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-3 border border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>AI Voice Answer:</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const isHindi = selectedVoiceLang.startsWith('hi') || selectedVoiceLang.startsWith('mr') || selectedVoiceLang.startsWith('pa');
                    speakText(isHindi ? lastNLPResult.spokenResponseHindi : lastNLPResult.spokenResponseEnglish, selectedVoiceLang);
                  }}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-md text-slate-200 font-medium transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-emerald-400" />
                  <span>Replay Audio</span>
                </button>
                <button
                  onClick={stopSpeaking}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-md text-slate-400 hover:text-slate-200"
                  title="Stop Audio"
                >
                  <VolumeX className="w-3 h-3" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {selectedVoiceLang.startsWith('hi') || selectedVoiceLang.startsWith('mr') || selectedVoiceLang.startsWith('pa')
                ? lastNLPResult.spokenResponseHindi
                : lastNLPResult.spokenResponseEnglish}
            </p>

            {/* Direct Action Link based on NLP extracted intent */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              {lastNLPResult.dataHighlight && (
                <span className="text-[11px] font-mono font-bold text-emerald-400">
                  {lastNLPResult.dataHighlight}
                </span>
              )}
              <button
                onClick={handleNavigateFromVoice}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 ml-auto shadow-xs"
              >
                <span>{lastNLPResult.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs space-y-1 border border-slate-800">
            <span className="text-emerald-400 font-bold block text-[11px]">💡 What You Can Ask:</span>
            <p className="text-slate-300 text-[11px]">
              "इंदौर में गेहूं का भाव क्या है?", "क्या आज प्याज बेचना चाहिए?", "ITC का गेहूं का क्या रेट है?", "वेयरहाउस लोन कैसे मिलेगा?"
            </p>
          </div>
        )}

        {/* Popular Quick Prompts */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
            Sample Voice Questions (Click to Ask):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {sampleQuickQueries.slice(0, 4).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuickPrompt(q)}
                className="text-left p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-xs transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-slate-700 block truncate group-hover:text-emerald-900 text-[11px]">
                  {selectedVoiceLang.startsWith('hi') ? q.hindi : q.eng}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Fallback Text Input (Type your query) */}
        <form onSubmit={handleManualSubmit} className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <input
            type="text"
            placeholder="या यहाँ प्रश्न टाइप करें (Or type crop / mandi question)..."
            value={manualQuery}
            onChange={(e) => setManualQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1 shadow-xs shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </form>

      </div>
    </div>
  );
};

// Web Speech API wrapper for Speech Recognition & Synthesis

export interface SpeechRecognitionResultPayload {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export function createSpeechRecognizer(
  onResult: (payload: SpeechRecognitionResultPayload) => void,
  onError: (error: string) => void,
  onEnd: () => void,
  lang: string = 'hi-IN'
): any {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    return null;
  }

  try {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      let confidence = 0.9;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result[0].confidence) {
          confidence = result[0].confidence;
        }

        if (result.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      if (currentTranscript.trim()) {
        onResult({
          transcript: currentTranscript,
          isFinal: Boolean(finalTranscript),
          confidence
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error event:', event);
      if (event.error === 'no-speech') {
        onError('No speech detected. Please speak clearly into your microphone.');
      } else if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        onError('Microphone permission denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'network') {
        onError('Network error during speech recognition. Please check your internet connection.');
      } else {
        onError(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      onEnd();
    };

    return recognition;
  } catch (err: any) {
    console.error('Failed to initialize speech recognition:', err);
    onError(err?.message || 'Failed to initialize speech recognizer');
    return null;
  }
}

export function speakText(text: string, lang: string = 'hi-IN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.log('Speech synthesis not supported');
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick best available voice for language
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const matchVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(lang.split('-')[0]));
      if (matchVoice) {
        utterance.voice = matchVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis failed', e);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

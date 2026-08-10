import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useRobotVoice — Clean browser-native Web Speech API SpeechSynthesis hook.
 * Features:
 * - Natural English voice selection (high quality Google/Microsoft/Apple voices)
 * - Rate (0.95), Pitch (1.0), Volume control
 * - Non-overlapping speech queue management with cancellation
 * - LocalStorage persistent Mute toggle (🔊 / 🔇)
 * - Speech reactive amplitude callbacks for 3D core pulsation
 * - Speech subtitle caption state for accessibility
 */
export function useRobotVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('bbh_robot_muted') === 'true';
    } catch {
      return false;
    }
  });
  const [currentCaption, setCurrentCaption] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const speechAnimRef = useRef(null);
  const speechAmplitudeRef = useRef(0);

  // Load and automatically pick British English Male voice
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const maleKeywords = [
        'male',
        'george',
        'oliver',
        'arthur',
        'daniel',
        'brian',
        'ryan',
        'uk male',
        'british male',
        'google uk english male',
        'microsoft george',
        'microsoft oliver',
        'en-gb-b',
        'en-gb-d',
        'en-gb-f',
        'en-gb-g',
        'en-gb-w',
      ];

      // 1. Prefer explicit British Male voice
      const britishMale = voices.find((v) => {
        const lang = v.lang.toLowerCase();
        const name = v.name.toLowerCase();
        const isBritish = lang.includes('en-gb') || lang.includes('en_gb') || lang.includes('uk');
        return isBritish && maleKeywords.some((kw) => name.includes(kw));
      });

      // 2. Fallback to any British English voice
      const anyBritish = voices.find((v) => {
        const lang = v.lang.toLowerCase();
        return lang.includes('en-gb') || lang.includes('en_gb');
      });

      // 3. Fallback to any English male voice
      const anyEnglishMale = voices.find((v) => {
        const lang = v.lang.toLowerCase();
        const name = v.name.toLowerCase();
        return lang.startsWith('en') && maleKeywords.some((kw) => name.includes(kw));
      });

      // 4. Fallback to any English voice
      const anyEnglish = voices.find((v) => v.lang.toLowerCase().startsWith('en'));

      const chosenVoice = britishMale || anyBritish || anyEnglishMale || anyEnglish || voices[0];
      setSelectedVoice(chosenVoice);
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Mute Toggle handler
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('bbh_robot_muted', String(next));
      } catch {
        // Ignore localStorage error
      }
      if (next && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentCaption('');
      }
      return next;
    });
  }, []);

  // Stop speech
  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentCaption('');
    speechAmplitudeRef.current = 0;
    if (speechAnimRef.current) {
      cancelAnimationFrame(speechAnimRef.current);
    }
  }, []);

  // Simulated speech amplitude generator for R3F chest core pulsation
  const startSpeechAmplitudeSimulation = useCallback(() => {
    const animate = () => {
      speechAmplitudeRef.current = 0.5 + Math.random() * 0.5;
      speechAnimRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  // Main Speak function
  const speak = useCallback(
    (text, onEndCallback) => {
      if (!speechSupported || isMuted || !text) {
        if (onEndCallback) onEndCallback();
        return;
      }

      // Cancel ongoing speech to prevent overlap (Rule #3)
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.lang = 'en-GB';

      utterance.rate = 0.95;
      utterance.pitch = 0.88; // Deep British male voice pitch tuning
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentCaption(text);
        startSpeechAmplitudeSimulation();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentCaption('');
        speechAmplitudeRef.current = 0;
        if (speechAnimRef.current) {
          cancelAnimationFrame(speechAnimRef.current);
        }
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        console.warn('Robot SpeechSynthesis error:', e);
        setIsSpeaking(false);
        setCurrentCaption('');
        speechAmplitudeRef.current = 0;
        if (speechAnimRef.current) {
          cancelAnimationFrame(speechAnimRef.current);
        }
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    },
    [speechSupported, isMuted, selectedVoice, startSpeechAmplitudeSimulation]
  );

  return {
    speak,
    stop,
    isSpeaking,
    isMuted,
    toggleMute,
    currentCaption,
    speechSupported,
    speechAmplitudeRef,
  };
}

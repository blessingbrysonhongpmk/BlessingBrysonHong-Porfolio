import { useState, useEffect, useRef, useCallback } from 'react';

export const PORTFOLIO_INTENTS = [
  {
    id: 'work',
    label: 'Projects Archive',
    keywords: ['work', 'project', 'projects', 'build', 'portfolio'],
    speechResponse: "Displaying project archives, sir.",
    targetHash: '#work',
  },
  {
    id: 'about',
    label: 'Core Profile',
    keywords: ['about', 'who', 'profile', 'student', 'background'],
    speechResponse: "Accessing core profile data, sir.",
    targetHash: '#about',
  },
  {
    id: 'journey',
    label: 'System Timeline',
    keywords: ['journey', 'timeline', 'experience', 'education', 'learning'],
    speechResponse: "Loading chronological engineering record, sir.",
    targetHash: '#journey',
  },
  {
    id: 'contact',
    label: 'Comms Channel',
    keywords: ['contact', 'hire', 'email', 'touch', 'message'],
    speechResponse: "Opening communications channel, sir.",
    targetHash: '#contact',
  },
];

/**
 * useRobotRecognition — Hook for SpeechRecognition voice commands & query intent matching.
 */
export function useRobotRecognition({ onIntentRecognized }) {
  const [isListening, setIsListening] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setRecognitionSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onstart = () => {
        setIsListening(true);
        setTranscript('Listening...');
      };

      recog.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setTranscript(`"${text}"`);

        // Match Intent
        const matched = PORTFOLIO_INTENTS.find((intent) =>
          intent.keywords.some((kw) => text.includes(kw))
        );

        if (matched && onIntentRecognized) {
          onIntentRecognized(matched);
        } else if (text.includes('stop')) {
          if (onIntentRecognized) onIntentRecognized({ id: 'stop' });
        }
      };

      recog.onerror = (e) => {
        console.warn('SpeechRecognition error:', e.error);
        setIsListening(false);
        setTranscript('');
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    } else {
      setRecognitionSupported(false);
    }
  }, [onIntentRecognized]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setIsListening(false);
  }, [isListening]);

  return {
    isListening,
    startListening,
    stopListening,
    recognitionSupported,
    transcript,
  };
}

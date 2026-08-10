import { useState, useCallback, useEffect, useRef } from 'react';
import { useRobotVoice } from './useRobotVoice';
import { useRobotRecognition } from './useRobotRecognition';

export const GREETING_VOICE_LINE =
  "Systems online. Interface operational. Welcome, sir.";

/**
 * useRobotController — Central State Machine for AI Character Robot Scene.
 * Manages states: IDLE, AWARE, INITIALIZING, SPEAKING, LISTENING, THINKING, RESPONDING, SCROLLING.
 */
export function useRobotController() {
  const [robotState, setRobotState] = useState('IDLE');
  const initTimerRef = useRef(null);
  const hasSpokenRef = useRef(false);

  const {
    speak,
    stop: stopVoice,
    isSpeaking,
    isMuted,
    toggleMute,
    currentCaption,
    speechSupported,
    speechAmplitudeRef,
  } = useRobotVoice();

  // Intent handler callback
  const handleIntentRecognized = useCallback(
    (intent) => {
      if (intent.id === 'stop') {
        stopVoice();
        setRobotState('IDLE');
        return;
      }

      setRobotState('THINKING');

      // 400 - 800ms Thinking transition sequence
      setTimeout(() => {
        setRobotState('RESPONDING');
        if (intent.targetHash) {
          const el = document.querySelector(intent.targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        speak(intent.speechResponse, () => {
          setRobotState('IDLE');
        });
      }, 600);
    },
    [speak, stopVoice]
  );

  const {
    isListening,
    startListening,
    stopListening,
    recognitionSupported,
    transcript,
  } = useRobotRecognition({ onIntentRecognized: handleIntentRecognized });

  // Trigger Activation Sequence (0ms -> 600ms)
  const initializeSystem = useCallback(() => {
    if (robotState === 'INITIALIZING' || isSpeaking) return;

    setRobotState('INITIALIZING');

    initTimerRef.current = setTimeout(() => {
      setRobotState('SPEAKING');
      speak(GREETING_VOICE_LINE, () => {
        setRobotState('IDLE');
      });
    }, 600);
  }, [robotState, isSpeaking, speak]);

  // Automatic Speech Trigger on Load / First Interaction (No button click needed)
  useEffect(() => {
    if (hasSpokenRef.current) return;

    const triggerAutoSpeak = () => {
      if (hasSpokenRef.current) return;
      hasSpokenRef.current = true;

      window.removeEventListener('pointerdown', triggerAutoSpeak);
      window.removeEventListener('mousemove', triggerAutoSpeak);
      window.removeEventListener('keydown', triggerAutoSpeak);
      window.removeEventListener('touchstart', triggerAutoSpeak);
      window.removeEventListener('scroll', triggerAutoSpeak);

      initializeSystem();
    };

    const autoTimer = setTimeout(() => {
      triggerAutoSpeak();
    }, 400);

    window.addEventListener('pointerdown', triggerAutoSpeak, { once: true });
    window.addEventListener('mousemove', triggerAutoSpeak, { once: true });
    window.addEventListener('keydown', triggerAutoSpeak, { once: true });
    window.addEventListener('touchstart', triggerAutoSpeak, { once: true });
    window.addEventListener('scroll', triggerAutoSpeak, { once: true });

    return () => {
      clearTimeout(autoTimer);
      if (initTimerRef.current) clearTimeout(initTimerRef.current);
      window.removeEventListener('pointerdown', triggerAutoSpeak);
      window.removeEventListener('mousemove', triggerAutoSpeak);
      window.removeEventListener('keydown', triggerAutoSpeak);
      window.removeEventListener('touchstart', triggerAutoSpeak);
      window.removeEventListener('scroll', triggerAutoSpeak);
    };
  }, [initializeSystem]);

  // Visitor awareness trigger
  const handleMouseEnterHero = useCallback(() => {
    if (robotState === 'IDLE') {
      setRobotState('AWARE');
    }
  }, [robotState]);

  const handleMouseLeaveHero = useCallback(() => {
    if (robotState === 'AWARE') {
      setRobotState('IDLE');
    }
  }, [robotState]);

  return {
    robotState,
    setRobotState,
    initializeSystem,
    handleMouseEnterHero,
    handleMouseLeaveHero,
    isSpeaking,
    isMuted,
    toggleMute,
    currentCaption,
    speechSupported,
    speechAmplitudeRef,
    isListening,
    startListening,
    stopListening,
    recognitionSupported,
    transcript,
    handleIntentRecognized,
  };
}

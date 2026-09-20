import { useState, useEffect, useRef } from 'react';
import './MacWelcomeLoader.css';

const GREETINGS = [
  { text: 'Hello', lang: 'en' },
  { text: 'Hola', lang: 'es' },
  { text: 'Bonjour', lang: 'fr' },
  { text: 'Hallo', lang: 'de' },
  { text: 'Ciao', lang: 'it' },
  { text: 'Olá', lang: 'pt' },
  { text: 'こんにちは', lang: 'ja' },
  { text: '안녕하세요', lang: 'ko' },
  { text: '你好', lang: 'zh' },
  { text: 'Hello', lang: 'en' },
];

export function MacWelcomeLoader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState('active'); // 'active' | 'fading-out' | 'dismissed'
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Check if user already saw welcome animation in this session
    const hasSeenWelcome = sessionStorage.getItem('bbh_welcome_seen');
    const forcePreview = window.location.search.includes('welcome=true');

    if (hasSeenWelcome && !forcePreview) {
      if (onComplete) onComplete();
      setStatus('dismissed');
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('bbh_welcome_seen', 'true');
        if (onComplete) onComplete();
        setStatus('dismissed');
      }, 500);
      return () => clearTimeout(timer);
    }

    // Lock scroll during welcome loader
    document.body.style.overflow = 'hidden';

    let timer;
    let wordIndex = 0;

    const advanceGreeting = () => {
      wordIndex++;

      if (wordIndex < GREETINGS.length) {
        setCurrentIndex(wordIndex);

        // If it's the final "Hello", linger for 550ms before dissolving
        const isFinal = wordIndex === GREETINGS.length - 1;
        const delay = isFinal ? 550 : 270;

        timer = setTimeout(() => {
          if (isFinal) {
            // Initiate transition into portfolio
            setStatus('fading-out');
            sessionStorage.setItem('bbh_welcome_seen', 'true');

            // Signal Hero and background to start their choreographed reveal
            if (onComplete) onComplete();

            // After backdrop dissolve completes, unmount cleanly
            setTimeout(() => {
              setStatus('dismissed');
              document.body.style.overflow = '';
            }, 750);
          } else {
            advanceGreeting();
          }
        }, delay);
      }
    };

    // First greeting displays for 320ms, then advances
    timer = setTimeout(advanceGreeting, 320);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (status === 'dismissed') return null;

  const currentItem = GREETINGS[currentIndex];
  const isFinalWord = currentIndex === GREETINGS.length - 1;

  return (
    <aside
      className={`mac-welcome-overlay ${status === 'fading-out' ? 'is-fading-out' : ''}`}
      aria-label="Welcome screen"
      role="status"
      aria-live="polite"
    >
      {/* Soft atmospheric ambient backlight (micro-detail) */}
      <div className="mac-welcome-glow" aria-hidden="true" />
      <div className="mac-welcome-grain" aria-hidden="true" />

      {/* Central Typography Anchor */}
      <div className="mac-welcome-stage">
        <h1
          key={currentIndex}
          className={`mac-welcome-word ${isFinalWord ? 'mac-welcome-word--final' : ''}`}
          lang={currentItem.lang}
        >
          {currentItem.text}
        </h1>
      </div>
    </aside>
  );
}

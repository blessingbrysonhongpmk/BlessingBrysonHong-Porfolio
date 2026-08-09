import { useState, useEffect } from 'react';
import './Loader.css';

export function Loader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // loading → fading → done

  useEffect(() => {
    const minDisplay = setTimeout(() => {
      setPhase('fading');
    }, 1400);

    return () => clearTimeout(minDisplay);
  }, []);

  useEffect(() => {
    if (phase === 'fading') {
      const fadeOut = setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 600);
      return () => clearTimeout(fadeOut);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`loader ${phase === 'fading' ? 'loader--fading' : ''}`} role="progressbar" aria-label="Loading portfolio">
      <div className="loader__content">
        <div className="loader__mark">
          <span className="loader__letter" style={{ '--i': 0 }}>B</span>
          <span className="loader__letter" style={{ '--i': 1 }}>B</span>
          <span className="loader__letter" style={{ '--i': 2 }}>H</span>
        </div>
        <div className="loader__line">
          <div className="loader__line-fill" />
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import './PortfolioLoader.css';

export function PortfolioLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const startTime = performance.now();
    const targetDuration = 500; // Swift 500ms reveal

    const updateBootState = (time) => {
      const elapsed = time - startTime;
      const pct = Math.min(100, Math.floor((elapsed / targetDuration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        setIsFading(true);
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 250);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(updateBootState);
    };

    animationFrameRef.current = requestAnimationFrame(updateBootState);

    const failsafe = setTimeout(() => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setProgress(100);
      setIsFading(true);
      setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 200);
    }, 1000);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`portfolio-loader ${isFading ? 'loader--fading' : ''}`}
      role="progressbar"
      aria-label="Loading Portfolio"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="loader-brand-box">
        <div className="loader-brand-header">
          <span className="loader-brand-name">BLESSING BRYSON</span>
          <span className="loader-brand-role">AI &amp; DATA SCIENCE ENGINEER</span>
        </div>
        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

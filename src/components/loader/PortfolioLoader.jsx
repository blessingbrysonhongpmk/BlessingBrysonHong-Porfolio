import { useState, useEffect, useRef } from 'react';
import './PortfolioLoader.css';

const TECHNICAL_TAGS = ['DATA', 'MODEL', 'LEARN', 'BUILD', 'DEPLOY'];

const CHECKS_LIST = [
  { key: 'core', label: 'CORE' },
  { key: 'data', label: 'DATA' },
  { key: 'interface', label: 'INTERFACE' },
  { key: 'engine', label: '3D ENGINE' },
  { key: 'experience', label: 'EXPERIENCE' },
];

export function PortfolioLoader({ onComplete }) {
  const [phase, setPhase] = useState(1); // 1 to 8
  const [progress, setProgress] = useState(0);
  const [activeTags, setActiveTags] = useState([]);
  const [resolvedChecks, setResolvedChecks] = useState([]);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const animationFrameRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase(7);
      setProgress(100);
      setResolvedChecks(CHECKS_LIST.map((c) => c.key));
      const timer = setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  // Main system boot sequence state driver (target total ~1.8s - 2.2s)
  useEffect(() => {
    const startTime = performance.now();
    const targetDuration = 1800; // 1.8s fast boot target

    const updateBootState = (time) => {
      const elapsed = time - startTime;
      const pct = Math.min(100, Math.floor((elapsed / targetDuration) * 100));
      setProgress(pct);

      // Phase transitions based on progress / timing
      if (pct < 15) {
        setPhase(1); // Wake
      } else if (pct < 35) {
        setPhase(2); // Neural Core
      } else if (pct < 55) {
        setPhase(3); // Data Stream
        const tagCount = Math.min(TECHNICAL_TAGS.length, Math.floor(((pct - 35) / 20) * TECHNICAL_TAGS.length) + 1);
        setActiveTags(TECHNICAL_TAGS.slice(0, tagCount));
      } else if (pct < 75) {
        setPhase(4); // Profile
        setActiveTags(TECHNICAL_TAGS);
      } else if (pct < 95) {
        setPhase(5); // System Checks
        const checkCount = Math.min(CHECKS_LIST.length, Math.floor(((pct - 75) / 20) * CHECKS_LIST.length) + 1);
        setResolvedChecks(CHECKS_LIST.slice(0, checkCount).map((c) => c.key));
      } else if (pct < 100) {
        setPhase(6); // Final progress resolution
        setResolvedChecks(CHECKS_LIST.map((c) => c.key));
      } else {
        setPhase(7); // Activation (100%)
        setResolvedChecks(CHECKS_LIST.map((c) => c.key));

        // Trigger Phase 8 — Transition to Hero
        setTimeout(() => {
          setPhase(8);
          setIsFading(true);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 600);
        }, 350);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(updateBootState);
    };

    animationFrameRef.current = requestAnimationFrame(updateBootState);

    // Hard failsafe timer (3.5s limit so loader never blocks user)
    const failsafeTimer = setTimeout(() => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setProgress(100);
      setPhase(8);
      setIsFading(true);
      setTimeout(() => {
        setIsDone(true);
        onComplete?.();
      }, 500);
    }, 3500);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(failsafeTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`portfolio-loader ${isFading ? 'loader--fading' : ''} phase-${phase}`}
      role="progressbar"
      aria-label="System Initialization"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background Digital Grid & Ambient Pulse */}
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-scan-line" aria-hidden="true" />

      {/* ── Center Computational AI Core ── */}
      <div className="loader-core-wrap">
        <div className="core-red-point" />
        <div className="core-wave wave-1" />
        <div className="core-wave wave-2" />
        
        {/* Abstract Neural Nodes (Phase 2+) */}
        <div className="neural-nodes-group">
          <span className="node node-1" />
          <span className="node node-2" />
          <span className="node node-3" />
          <span className="node node-4" />
          <span className="node node-5" />
          <svg className="node-lines-svg" viewBox="0 0 200 200">
            <line x1="100" y1="100" x2="40" y2="50" className="neural-line" />
            <line x1="100" y1="100" x2="160" y2="40" className="neural-line" />
            <line x1="100" y1="100" x2="165" y2="150" className="neural-line" />
            <line x1="100" y1="100" x2="35" y2="140" className="neural-line" />
            <line x1="100" y1="100" x2="100" y2="25" className="neural-line" />
          </svg>
        </div>

        {/* Orbiting Technical Stream Tags (Phase 3+) */}
        <div className="tags-orbit">
          {activeTags.map((tag, idx) => (
            <span key={tag} className={`orbit-tag tag-pos-${idx + 1}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── System HUD & Profile Readout ── */}
      <div className="loader-hud-content">
        
        {/* Top Identifier */}
        <div className="hud-top-label">
          <span className="hud-sys-tag">BBH // SYSTEM</span>
          <span className="hud-status-badge">
            {phase < 7 ? 'INITIALIZING...' : 'SYSTEM ONLINE'}
          </span>
        </div>

        {/* Center Profile Identity Reveal (Phase 4+) */}
        <div className={`hud-identity-block ${phase >= 4 ? 'is-visible' : ''}`}>
          <span className="identity-prefix">IDENTITY:</span>
          <h1 className="identity-name">BLESSING BRYSON HONG</h1>
          <p className="identity-sub">AI &amp; DATA SCIENCE ENGINEERING STUDENT</p>
        </div>

        {/* System Check Resolution Panel (Phase 5+) */}
        <div className={`hud-checks-panel ${phase >= 5 ? 'is-visible' : ''}`}>
          {CHECKS_LIST.map((c) => {
            const isResolved = resolvedChecks.includes(c.key);
            return (
              <div key={c.key} className="check-row">
                <span className="check-label">{c.label}</span>
                <span className="check-dots">................</span>
                <span className={`check-state ${isResolved ? 'is-ready' : ''}`}>
                  {isResolved ? '✓ READY' : 'WAIT'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar & Readout (Phase 6+) */}
        <div className="hud-progress-block">
          <div className="progress-text-row">
            <span className="progress-title">
              {phase >= 7 ? 'ENTERING WORKSPACE' : 'INITIALIZING SYSTEM'}
            </span>
            <span className="progress-percent">{progress}%</span>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

      </div>
    </div>
  );
}

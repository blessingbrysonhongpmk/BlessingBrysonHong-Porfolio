import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { RobotHUD } from '../robot/RobotHUD';
import './Hero.css';

export function Hero({ robotCtrl }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="hero"
      ref={sectionRef}
      aria-label="Introduction"
      onMouseEnter={robotCtrl?.handleMouseEnterHero}
      onMouseLeave={robotCtrl?.handleMouseLeaveHero}
    >
      {/* Background Grid Environment */}
      <div className="hero__environment" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* Grid Container (Strict Left Text Safe Zone & Right Visual Anchor) */}
      <div className="hero__container">
        {/* Left Column: Protected Text Safe Zone (Layer 3 z-index) */}
        <div className={`hero__interface ${isRevealed ? 'hero__interface--visible' : ''}`}>
          
          {/* System Index Tag */}
          <div className="hero__sys-index hero__reveal-item hero__reveal-item--1">
            <span className="sys-dot" />
            <span className="sys-label">BBH // SYSTEM</span>
          </div>

          {/* Official Full Name Headline */}
          <h1 className="hero__name hero__reveal-item hero__reveal-item--2">
            <span className="name-line name-line--pmk">P M K</span>
            <span className="name-line">BLESSING</span>
            <span className="name-line">BRYSON HONG</span>
          </h1>

          {/* Role & Descriptor */}
          <div className="hero__role-badge hero__reveal-item hero__reveal-item--3">
            <span className="role-main">AI &amp; DATA SCIENCE</span>
            <span className="role-sep">—</span>
            <span className="role-sub">ENGINEERING STUDENT</span>
          </div>

          {/* Controlled Personal Statement */}
          <p className="hero__statement hero__reveal-item hero__reveal-item--4">
            &ldquo;I learn by building — moving from data and software into intelligent systems.&rdquo;
          </p>

          {/* Direction Tag */}
          <div className="hero__direction-tag hero__reveal-item hero__reveal-item--5">
            <span className="direction-label">DIRECTION:</span>
            <span className="direction-value">BUILDING TOWARDS AI ENGINEERING</span>
          </div>

          {/* CTA Actions Group */}
          <div className="hero__actions hero__reveal-item hero__reveal-item--6">
            <a
              href="#work"
              className="hero__cta hero__cta--primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>VIEW WORK</span>
              <ArrowRight size={14} className="cta-icon" />
            </a>

            <a
              href="#contact"
              className="hero__cta hero__cta--outline"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>

          {/* Status Line */}
          <div className="hero__status hero__reveal-item hero__reveal-item--7">
            <span className="status-indicator" />
            <span className="status-text">CURRENTLY / BUILDING <span className="status-highlight">2026</span></span>
          </div>

        </div>

        {/* Right Column: Visual Chamber Region for 3D Robot & HUD Controls */}
        <div className="hero__visual-zone" aria-hidden="true">
          {robotCtrl && (
            <RobotHUD
              robotState={robotCtrl.robotState}
              onInitialize={robotCtrl.initializeSystem}
              isSpeaking={robotCtrl.isSpeaking}
              isMuted={robotCtrl.isMuted}
              onToggleMute={robotCtrl.toggleMute}
              currentCaption={robotCtrl.currentCaption}
              isListening={robotCtrl.isListening}
              onStartListening={robotCtrl.startListening}
              recognitionSupported={robotCtrl.recognitionSupported}
              onSelectIntent={robotCtrl.handleIntentRecognized}
              transcript={robotCtrl.transcript}
            />
          )}
        </div>
      </div>
    </section>
  );
}

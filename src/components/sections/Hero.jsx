import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './Hero.css';

const TECHNICAL_AXIS_STEPS = ['DATA', 'LEARN', 'BUILD', 'DEPLOY', 'IMPACT'];

export function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Non-blocking 800-1200ms sequential reveal
    const timer = setTimeout(() => setIsRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const about = document.querySelector('#about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={sectionRef} aria-label="Introduction">
      {/* Background Technical Grid System */}
      <div className="hero__environment" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* Far-Right Technical Axis Navigation Rail */}
      <div className="hero__far-right-axis" aria-hidden="true">
        {TECHNICAL_AXIS_STEPS.map((step) => (
          <div key={step} className="axis-step">
            <span className="axis-dot" />
            <span className="axis-text">{step}</span>
          </div>
        ))}
      </div>

      {/* Asymmetric Split Content Layout */}
      <div className="container hero__container">
        <div className={`hero__interface ${isRevealed ? 'hero__interface--visible' : ''}`}>
          
          {/* Technical System Index */}
          <div className="hero__sys-index">
            <span className="sys-dot" />
            <span className="sys-label">BBH / 01</span>
          </div>

          {/* Editorial Headline Name */}
          <h1 className="hero__name">
            P M K Blessing Bryson Hong
          </h1>

          {/* Role & Descriptor */}
          <div className="hero__role-badge">
            <span className="role-main">AI & DATA SCIENCE</span>
            <span className="role-sep">—</span>
            <span className="role-sub">ENGINEERING STUDENT</span>
          </div>

          {/* Personal Controlled Statement */}
          <p className="hero__statement">
            "I learn by building — moving from data and software into intelligent systems."
          </p>

          {/* Technical Direction Tag */}
          <div className="hero__direction-tag">
            <span className="direction-label">DIRECTION:</span>
            <span className="direction-value">BUILDING TOWARDS AI ENGINEERING</span>
          </div>

          {/* Precision CTA Controls */}
          <div className="hero__actions">
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
              <div className="cta-sweep" />
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

          {/* Technical Status Line with Progress Accent */}
          <div className="hero__status-block">
            <div className="hero__status-line">
              <span className="status-indicator">CURRENTLY / BUILDING</span>
              <span className="status-year">2026</span>
            </div>
            <div className="status-progress-bar">
              <div className="status-progress-fill" />
            </div>
          </div>

          {/* Reference Signature Scroll Hint */}
          <button
            className={`hero__scroll-explore ${isRevealed ? 'hero__scroll-explore--visible' : ''}`}
            onClick={handleScrollDown}
            aria-label="Scroll to explore About section"
          >
            <span className="scroll-icon-wrap">
              <ArrowDown size={12} />
            </span>
            <span className="scroll-text">SCROLL TO EXPLORE</span>
          </button>

        </div>
      </div>
    </section>
  );
}

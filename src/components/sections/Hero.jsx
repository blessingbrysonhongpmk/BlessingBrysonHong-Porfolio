import { useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { getLenis } from '../../utils/scrollOrchestrator';
import './Hero.css';

export function Hero() {
  const { profile } = PORTFOLIO_DATA;
  const heroRef = useRef(null);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: -70, duration: 1.0 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="hero-section"
      ref={heroRef}
      aria-label="Introduction and Identity"
    >
      <div className="container hero-container">
        <div className="hero-editorial-grid">
          
          {/* ── Left Column: Editorial Typography & CTAs ── */}
          <div className="hero-content-col">
            
            {/* Top: Availability / Status Line */}
            <div className="hero-status-row">
              <div className="hero-status-pill">
                <span className="hero-status-dot" aria-hidden="true" />
                <span className="hero-status-text">AVAILABLE FOR 2026 OPPORTUNITIES</span>
              </div>
            </div>

            {/* Eyebrow Label */}
            <div className="hero-eyebrow-wrap">
              <span className="hero-eyebrow">AI &amp; DATA SCIENCE ENGINEER</span>
            </div>

            {/* Identity Prefix & Monumental Heading */}
            <div className="hero-heading-block">
              <span className="hero-identity-prefix" aria-label="Prefix initials">P M K</span>
              <h1 className="hero-heading">
                <span className="hero-heading-line">BLESSING</span>
                <span className="hero-heading-line">BRYSON</span>
                <span className="hero-heading-line hero-heading-line--accent">HONG</span>
              </h1>
            </div>

            {/* Supporting Copy (Max 2 lines on desktop) */}
            <p className="hero-copy">
              Building intelligent systems at the intersection of AI, data, and full-stack engineering.
            </p>

            {/* Compact Premium CTAs */}
            <div className="hero-cta-group">
              <a
                href="#work"
                className="hero-btn hero-btn--primary"
                onClick={(e) => handleScrollTo(e, '#work')}
              >
                <span>VIEW MY WORK</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>

              <a
                href="#contact"
                className="hero-btn hero-btn--secondary"
                onClick={(e) => handleScrollTo(e, '#contact')}
              >
                <span>LET&apos;S CONNECT</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Personal Information */}
            <div className="hero-personal-info" aria-label="Personal Details">
              <span className="info-item">India</span>
              <span className="info-sep">•</span>
              <span className="info-item">III Year • B.Tech AI &amp; Data Science</span>
              <span className="info-sep">•</span>
              <span className="info-item info-item--accent">AI / ML • Full Stack</span>
            </div>

          </div>

          {/* ── Right Column: Refined Editorial Portrait Frame ── */}
          <div className="hero-visual-col">
            <div className="hero-portrait-frame">
              <div className="portrait-image-container">
                <img
                  src={profile.avatar}
                  alt={profile.fullName || profile.name}
                  className="portrait-img"
                  loading="eager"
                />
                <div className="portrait-gradient-sheen" />
              </div>

              {/* Subtle Floating Identity Tag */}
              <div className="portrait-badge">
                <span className="badge-pulse-dot" />
                <span className="badge-text">AI &amp; DS • ENGINEERING</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

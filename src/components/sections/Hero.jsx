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
      {/* ── Refined Architectural Background Layer ── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__grid" />
        <div className="hero-bg__radial-magenta" />
        <div className="hero-bg__radial-cyan" />
        <div className="hero-bg__calm-center" />

        {/* Subtle Geometric / Architectural Edge Accents */}
        <div className="hero-bg__axis-line hero-bg__axis-line--v" />
        <div className="hero-bg__axis-line hero-bg__axis-line--h" />
        <div className="hero-bg__corner hero-bg__corner--tl">
          <span className="hero-bg__crosshair">+</span>
          <span className="hero-bg__coord">SYS.01 // 2026</span>
        </div>
        <div className="hero-bg__corner hero-bg__corner--tr">
          <span className="hero-bg__crosshair">+</span>
          <span className="hero-bg__coord">LAT 13.0827° N</span>
        </div>
        <div className="hero-bg__hairline hero-bg__hairline--top" />
      </div>

      <div className="container hero-container">
        <div className="hero-editorial-grid">

          {/* ── Left Column: Typography, Hierarchy & CTAs ── */}
          <div className="hero-content-col">

            {/* 1. Availability Badge */}
            <div className="hero-status-row">
              <div className="hero-status-pill">
                <span className="hero-status-dot" aria-hidden="true" />
                <span className="hero-status-text">AVAILABLE FOR 2026 OPPORTUNITIES</span>
              </div>
            </div>

            {/* 2. Role Label */}
            <div className="hero-eyebrow-row">
              <span className="hero-role-label">AI &amp; DATA SCIENCE + FULL STACK DEVELOPER</span>
            </div>

            {/* 3. Primary Integrated Headline */}
            <h1 className="hero-heading">
              <span className="hero-heading-line hero-heading-line--lead">
                <span className="hero-monogram-tag" aria-label="PMK Monogram">PMK</span>
                <span className="hero-heading-sep" aria-hidden="true">·</span>
                <span>BLESSING</span>
              </span>
              <span className="hero-heading-line">BRYSON</span>
              <span className="hero-heading-line hero-heading-line--accent">HONG</span>
            </h1>

            {/* 4. Short Description */}
            <p className="hero-copy">
              Building intelligent systems at the intersection of AI, data, and full-stack engineering.
            </p>

            {/* 5. Compact CTAs */}
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
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>

            {/* 6. Supporting Metadata Row (Desktop Placement) */}
            <div className="hero-personal-info hero-personal-info--desktop" aria-label="Personal Details">
              <span className="info-item">India</span>
              <span className="info-sep">•</span>
              <span className="info-item">III Year</span>
              <span className="info-sep">•</span>
              <span className="info-item">B.Tech AI &amp; Data Science</span>
              <span className="info-sep">•</span>
              <span className="info-item info-item--accent">AI / ML</span>
              <span className="info-sep">•</span>
              <span className="info-item info-item--cyan">Full Stack</span>
            </div>

          </div>

          {/* ── Right Column: Framed Editorial Portrait & Subtle Identity Tags ── */}
          <div className="hero-visual-col">
            <div className="hero-portrait-frame">

              {/* Corner Technical Bracket Accents */}
              <div className="frame-corner frame-corner--tl" aria-hidden="true" />
              <div className="frame-corner frame-corner--tr" aria-hidden="true" />
              <div className="frame-corner frame-corner--bl" aria-hidden="true" />
              <div className="frame-corner frame-corner--br" aria-hidden="true" />

              <div className="portrait-image-container">
                <img
                  src={profile.avatar}
                  alt="Blessing Bryson Hong"
                  className="portrait-img"
                  loading="eager"
                />
                <div className="portrait-gradient-sheen" aria-hidden="true" />
              </div>

              {/* Controlled Subtle Technical Details (Max 4 subtle tags) */}
              <div className="portrait-tech-strip">
                <span className="tech-strip-tag">AI / ML</span>
                <span className="tech-strip-dot" aria-hidden="true">•</span>
                <span className="tech-strip-tag">DATA SCIENCE</span>
                <span className="tech-strip-dot" aria-hidden="true">•</span>
                <span className="tech-strip-tag">FULL STACK</span>
                <span className="tech-strip-dot" aria-hidden="true">•</span>
                <span className="tech-strip-tag tech-strip-tag--cyan">PYTHON</span>
              </div>
            </div>

            {/* Supporting Metadata for Mobile (matches stack order requirement) */}
            <div className="hero-personal-info hero-personal-info--mobile" aria-label="Personal Details">
              <span className="info-item">India</span>
              <span className="info-sep">•</span>
              <span className="info-item">III Year</span>
              <span className="info-sep">•</span>
              <span className="info-item">B.Tech AI &amp; DS</span>
              <span className="info-sep">•</span>
              <span className="info-item info-item--accent">AI / ML</span>
              <span className="info-sep">•</span>
              <span className="info-item info-item--cyan">Full Stack</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

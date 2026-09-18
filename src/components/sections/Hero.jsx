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
        <div className="hero-bg__radial-crimson" />
        <div className="hero-bg__radial-ambient" />
        <div className="hero-bg__calm-center" />

        {/* Engineering Geometric Guides */}
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
        <div className="hero-bg__hairline--top" />
      </div>

      <div className="container hero-container">
        <div className="hero-editorial-grid">

          {/* ── Left Column: Typography, Hierarchy & CTAs ── */}
          <div className="hero-content-col">

            {/* 1. Status Pill & Monogram Lockup */}
            <div className="hero-badge-row">
              <div className="hero-status-pill">
                <span className="hero-status-dot" aria-hidden="true" />
                <span className="hero-status-text">AVAILABLE FOR 2026 OPPORTUNITIES</span>
              </div>
              <div className="hero-identity-tag">
                <span className="hero-identity-monogram">PMK</span>
                <span className="hero-identity-dot">·</span>
                <span className="hero-identity-label">IDENTITY</span>
              </div>
            </div>

            {/* 2. Role Eyebrow */}
            <div className="hero-role-row">
              <span className="hero-role-label">AI &amp; DATA SCIENCE + FULL STACK DEVELOPER</span>
            </div>

            {/* 3. Primary Stacked Headline */}
            <h1 className="hero-heading">
              <span className="hero-heading-line">BLESSING</span>
              <span className="hero-heading-line">BRYSON</span>
              <span className="hero-heading-line hero-heading-line--accent">HONG</span>
            </h1>

            {/* 4. Short Description */}
            <p className="hero-copy">
              Building intelligent systems at the intersection of AI, data, and full-stack engineering.
            </p>

            {/* 5. CTAs */}
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

            {/* 6. Supporting Metadata Tags (Clean Pills, No Dangling Dots) */}
            <div className="hero-meta-tags" aria-label="Personal Details">
              <span className="meta-tag">India</span>
              <span className="meta-tag">III Year B.Tech</span>
              <span className="meta-tag meta-tag--focus">AI &amp; Data Science</span>
              <span className="meta-tag meta-tag--accent">AI / ML</span>
              <span className="meta-tag meta-tag--cyan">Full Stack</span>
            </div>

          </div>

          {/* ── Right Column: Framed Editorial Portrait ── */}
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

              {/* Technical Strip Docked at Bottom of Frame */}
              <div className="portrait-tech-strip">
                <span className="tech-strip-tag">AI / ML</span>
                <span className="tech-strip-sep" aria-hidden="true">·</span>
                <span className="tech-strip-tag">DATA SCIENCE</span>
                <span className="tech-strip-sep" aria-hidden="true">·</span>
                <span className="tech-strip-tag">FULL STACK</span>
                <span className="tech-strip-sep" aria-hidden="true">·</span>
                <span className="tech-strip-tag tech-strip-tag--highlight">PYTHON</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

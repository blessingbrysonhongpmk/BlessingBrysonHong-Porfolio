import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { getLenis } from '../../utils/scrollOrchestrator';
import './Hero.css';

export function Hero({ onOpenContact }) {
  const { profile } = PORTFOLIO_DATA;
  const heroRef = useRef(null);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.querySelector('#work');
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
      {/* ── Subtle Architectural Ambient Layer ── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__grid" />
        <div className="hero-bg__radial-crimson" />
        <div className="hero-bg__axis-line hero-bg__axis-line--v" />
        <div className="hero-bg__corner hero-bg__corner--tl">
          <span className="hero-bg__crosshair">+</span>
          <span>SYS.01 // 2026</span>
        </div>
        <div className="hero-bg__corner hero-bg__corner--tr">
          <span className="hero-bg__crosshair">+</span>
          <span>LAT 13.0827° N</span>
        </div>
      </div>

      <div className="container hero-container">
        <div className="hero-editorial-grid">

          {/* ── Left Column: Identity, Typography & Actions ── */}
          <div className="hero-content-col">

            {/* Availability & Academic Status */}
            <div className="hero-badge-row">
              <div className="hero-status-pill">
                <span className="hero-status-dot" aria-hidden="true" />
                <span className="hero-status-text">AVAILABLE FOR 2026 ROLES</span>
              </div>
              <span className="hero-degree-pill">III YEAR — B.TECH AI &amp; DATA SCIENCE</span>
            </div>

            {/* Role Eyebrow */}
            <div className="hero-role-row">
              <span className="hero-role-label">AI &amp; DATA SCIENCE + FULL STACK DEVELOPER</span>
            </div>

            {/* Primary Stacked Name */}
            <h1 className="hero-heading">
              <span className="hero-heading-lead">P M K</span>
              <span className="hero-heading-line">BLESSING</span>
              <span className="hero-heading-line">BRYSON</span>
              <span className="hero-heading-line hero-heading-line--accent">HONG</span>
            </h1>

            {/* One Focused Sentence */}
            <p className="hero-copy">
              Building intelligent systems across AI, data, and full-stack engineering.
            </p>

            {/* Two Clear Actions */}
            <div className="hero-cta-group">
              <a
                href="#work"
                className="hero-btn hero-btn--primary"
                onClick={handleScrollToWork}
              >
                <span>VIEW WORK</span>
                <ArrowDown size={14} className="btn-icon" />
              </a>

              <button
                type="button"
                className="hero-btn hero-btn--secondary"
                onClick={onOpenContact}
              >
                <span>CONTACT ME</span>
                <ArrowUpRight size={14} className="btn-icon" />
              </button>
            </div>

          </div>

          {/* ── Right Column: Compact Profile Frame ── */}
          <div className="hero-visual-col">
            <div className="hero-portrait-frame">
              {/* Subtle Technical Corner Accents */}
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

              {/* Monogram Dock */}
              <div className="portrait-brand-dock">
                <span className="dock-name">BLESSING BRYSON HONG</span>
                <span className="dock-dot">·</span>
                <span className="dock-tag">2026 PORTFOLIO</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

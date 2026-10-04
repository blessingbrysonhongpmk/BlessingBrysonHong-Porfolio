import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { scrollToElement } from '../../utils/scrollOrchestrator';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './Hero.css';

export function Hero({ onOpenContact, isRevealed = true }) {
  const { content } = usePortfolioContent();
  const profile = content?.profile || {};

  // Parse display name into lines for editorial typography
  const rawName = profile.name || profile.fullName || 'BLESSING BRYSON HONG';
  const nameParts = rawName.trim().split(/\s+/);
  const firstName = nameParts[0] || 'BLESSING';
  const middleName = nameParts.length > 2 ? nameParts[1] : '';
  const lastName = nameParts.length > 2 ? nameParts.slice(2).join(' ') : (nameParts[1] || 'HONG');

  const brandMark = profile.brand ? `${profile.brand}.` : 'BBH.';
  const monogram = profile.monogram || 'P M K';
  const quoteText = profile.quoteText || 'Commit your work to the Lord.';
  const quoteCite = profile.quoteCite || '— Proverbs 16:3';
  const roleText = profile.heroRole || profile.role || 'AI & DATA SCIENCE + FULL STACK DEVELOPER';
  const eduText = profile.education || 'B.Tech AI & Data Science · III Year';
  const avatarSrc = profile.avatar || '/profile.jpeg';

  // Gentle spatial depth response on portrait (desktop only)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleVisualMove = (e) => {
    if (window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 5, ry: x * 5 });
  };

  const handleVisualLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    scrollToElement('#projects', -70);
  };

  return (
    <section
      id="home"
      className={`hero-section ${isRevealed ? 'is-revealed' : 'is-concealed'}`}
      aria-label="Introduction"
    >
      <div className="container hero-container">
        <div className="hero-layout">
          {/* Content Column (First on Desktop & First on Mobile) */}
          <div className="hero-content">
            {/* 1. Editorial Typography Lockup: BBH Mark + PMK Mark + BLESSING / BRYSON HONG */}
            <div className="hero-identity">
              <span className="hero-brand-mark" aria-hidden="true">{brandMark}</span>
              <span className="hero-pmk-mark" aria-hidden="true">{monogram}</span>
              <h1 className="hero-name" aria-label={rawName}>
                <span className="hero-name-line hero-name-line--primary">{firstName}</span>
                <span className="hero-name-line hero-name-line--secondary">
                  {middleName ? <span className="hero-name-word">{middleName}{' '}</span> : null}
                  <span className="hero-name-accent">{lastName}</span>
                </span>
              </h1>
            </div>

            {/* 2. Small, Tasteful Quote Directly Below Name */}
            {quoteText && (
              <figure className="hero-quote">
                <blockquote className="hero-quote__text">
                  &ldquo;{quoteText}&rdquo;
                </blockquote>
                {quoteCite && <figcaption className="hero-quote__cite">{quoteCite}</figcaption>}
              </figure>
            )}

            {/* 3. Role & Education */}
            <div className="hero-role-wrap">
              <span className="hero-role">{roleText}</span>
              {eduText && (
                <div className="hero-edu-line">
                  <span className="hero-edu-primary">{eduText}</span>
                </div>
              )}
            </div>

            {/* 4. Primary CTA Actions */}
            <div className="hero-actions">
              <a
                href="#projects"
                className="hero-btn hero-btn--primary"
                onClick={handleScrollToWork}
                id="hero-view-work-btn"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown size={15} />
              </a>

              <button
                type="button"
                className="hero-btn hero-btn--secondary"
                onClick={onOpenContact}
                id="hero-contact-btn"
              >
                <span>CONTACT ME</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* 5. Portrait Visual Column */}
          <div
            className="hero-visual"
            onMouseMove={handleVisualMove}
            onMouseLeave={handleVisualLeave}
          >
            <div className="hero-ambient-glow" aria-hidden="true" />

            {/* Profile Card Container: Anchors all card decorations */}
            <div className="hero-card-container">
              {/* Subtle Playing Card desk backing */}
              <div className="hero-card-frame" aria-hidden="true">
                <span className="hero-card-pip hero-card-pip--tl">♠</span>
                <span className="hero-card-pip hero-card-pip--br">♠</span>
              </div>

              {/* Environmental Chess Pieces */}
              <span className="hero-chess-king" aria-hidden="true">♔</span>
              <span className="hero-chess-knight" aria-hidden="true">♘</span>

              <div
                className="hero-image-stage"
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
              >
                <img
                  src={avatarSrc}
                  alt={rawName}
                  className="hero-image"
                  loading="eager"
                />
                <div className="hero-image-rim" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

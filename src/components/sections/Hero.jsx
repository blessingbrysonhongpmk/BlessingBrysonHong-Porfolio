import { useState } from 'react';
import { scrollToElement } from '../../utils/scrollOrchestrator';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './Hero.css';

export function Hero({ onOpenContact }) {
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
    <section id="home" className="hero-section" aria-label="Introduction">
      <div className="container hero-container">
        <div className="hero-layout">
          {/* Content Column (First on Desktop & First on Mobile) */}
          <div className="hero-content">
            {/* 1. Name: BLESSING BRYSON UP and HONG P M K DOWN */}
            <h1 className="hero-name">
              <span className="hero-name-line">BLESSING BRYSON</span>
              <span className="hero-name-line hero-name-line--secondary">
                HONG <span className="hero-name-suffix">P M K</span>
              </span>
            </h1>

            {/* 2. Small, Tasteful Bible Quote Directly Below Name */}
            <figure className="hero-quote">
              <blockquote className="hero-quote__text">
                &ldquo;Commit your work to the Lord.&rdquo;
              </blockquote>
              <figcaption className="hero-quote__cite">— Proverbs 16:3</figcaption>
            </figure>

            {/* 3. Small Role */}
            <div className="hero-role-wrap">
              <span className="hero-role">AI &amp; DATA SCIENCE + FULL STACK DEVELOPER</span>
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
            <div
              className="hero-image-frame"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              <img
                src="/profile.jpeg"
                alt="Blessing Bryson Hong"
                className="hero-image"
                loading="eager"
              />
              <div className="hero-image-rim" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

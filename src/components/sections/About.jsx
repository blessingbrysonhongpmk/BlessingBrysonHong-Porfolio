import { ArrowRight } from 'lucide-react';
import './About.css';

export function About({ onOpenAbout }) {
  return (
    <section id="about" className="about-preview-section" aria-label="About Preview">
      <div className="container about-preview-container">
        
        {/* Section Index Marker */}
        <div className="section-kicker">
          <span className="section-kicker__num">01</span>
          <span className="section-kicker__label">ABOUT</span>
          <div className="section-kicker__line" />
        </div>

        {/* Compact Editorial Content */}
        <div className="about-preview-content">
          <div className="about-preview-lead-col">
            <h2 className="about-preview-heading">
              AI &amp; Data Science student focused on building practical software, intelligent systems, and full-stack products.
            </h2>

            <div className="about-preview-tags">
              <span className="about-preview-tag">B.Tech AI &amp; DS (III Year)</span>
              <span className="about-preview-tag">Predictive Machine Learning</span>
              <span className="about-preview-tag">Full-Stack Architecture</span>
              <span className="about-preview-tag">Open for 2026 Roles</span>
            </div>
          </div>

          <div className="about-preview-action-col">
            <button
              type="button"
              className="about-preview-btn"
              onClick={onOpenAbout}
              id="about-read-more-btn"
              aria-label="Read full biography and technical dossier"
            >
              <span>READ MORE</span>
              <ArrowRight size={15} className="about-preview-btn__icon" />
            </button>
            <span className="about-preview-hint">Education · Principles · Journey</span>
          </div>
        </div>

      </div>
    </section>
  );
}

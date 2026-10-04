import { useEffect } from 'react';
import {
  X,
  GraduationCap,
  Sparkles,
  Compass,
  Award,
  Terminal,
  ArrowUpRight,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './AboutDetailModal.css';

export function AboutDetailModal({ onClose }) {
  const { content } = usePortfolioContent();
  const { profile, education, achievements, aboutPreview } = content;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="detail-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="detail-modal-card about-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <header className="detail-modal-header">
          <div className="detail-modal-meta">
            <span className="meta-pill meta-pill--year">
              <Sparkles size={11} />
              <span>Overview</span>
            </span>
            <span className="meta-pill meta-pill--cat">
              <span>Background &amp; Principles</span>
            </span>
          </div>

          <button className="detail-modal-close" onClick={onClose} aria-label="Close About Modal">
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="detail-modal-body">
          {/* Hero Bio */}
          <div className="case-study-hero">
            <h2 id="about-modal-title" className="case-study-title">
              About {profile.name}
            </h2>
            <p className="case-study-tagline">
              {profile.fullBio || profile.shortBio}
            </p>
          </div>

          {/* 1. Academic Foundation */}
          <section className="case-card">
            <div className="case-card-header">
              <GraduationCap size={16} className="text-primary" />
              <h3>Academic Credentials &amp; Foundation</h3>
            </div>
            {(education || []).map((edu, idx) => (
              <div key={idx} className="about-edu-row">
                <div className="about-edu-top">
                  <h4 className="about-edu-degree">{edu.degree}</h4>
                  <span className="about-edu-period">{edu.period}</span>
                </div>
                <p className="about-edu-inst">{edu.institution} · <strong>{edu.status}</strong></p>
                {edu.focus && <p className="about-edu-focus"><strong>Curriculum Focus:</strong> {edu.focus}</p>}
              </div>
            ))}
          </section>

          {/* 2. Engineering Principles & Development Focus */}
          <section className="case-study-grid-2">
            <div className="case-card">
              <div className="case-card-header">
                <Compass size={15} className="text-secondary" />
                <h3>Development Focus</h3>
              </div>
              <ul className="features-list">
                {(aboutPreview?.developmentFocus || []).map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={13} className="text-secondary" />
                    <span><strong>{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="case-card">
              <div className="case-card-header">
                <Terminal size={15} className="text-accent" />
                <h3>Engineering Principles</h3>
              </div>
              <ul className="features-list">
                {(aboutPreview?.engineeringPrinciples || []).map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={13} className="text-accent" />
                    <span><strong>{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Verified Achievements & Milestones */}
          {achievements && achievements.length > 0 && (
            <section className="case-card">
              <div className="case-card-header">
                <Award size={16} className="text-primary" />
                <h3>Key Milestones &amp; Achievements</h3>
              </div>
              <div className="about-achievements-grid">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="about-ach-card">
                    <div className="about-ach-header">
                      <span className="about-ach-category">{ach.category}</span>
                      <span className="about-ach-year">{ach.year}</span>
                    </div>
                    <h4 className="about-ach-title">{ach.title}</h4>
                    <span className="about-ach-result">{ach.result}</span>
                    <p className="about-ach-desc">{ach.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. Career Direction & Goals */}
          <section className="case-card case-card--goal">
            <div className="case-card-header">
              <Target size={16} className="text-accent" />
              <h3>Current Direction &amp; 2026 Goals</h3>
            </div>
            <p>{profile.currentDirection}</p>
            <div className="about-cta-footer">
              <a
                href="#contact"
                className="case-study-btn case-study-btn--primary"
                onClick={onClose}
              >
                <span>Get In Touch</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

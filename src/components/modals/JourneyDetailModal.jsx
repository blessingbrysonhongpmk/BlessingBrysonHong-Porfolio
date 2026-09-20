import { useEffect } from 'react';
import { X, Briefcase, Calendar, CheckCircle2, Award, Clock } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './JourneyDetailModal.css';

export function JourneyDetailModal({ onClose }) {
  const { content } = usePortfolioContent();
  const { journey, experience, education, achievements } = content;

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
      aria-labelledby="journey-modal-title"
    >
      <div className="detail-modal-card journey-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <header className="detail-modal-header">
          <div className="detail-modal-meta">
            <span className="meta-pill meta-pill--year">
              <Calendar size={11} />
              <span>2024 — Present</span>
            </span>
            <span className="meta-pill meta-pill--cat">
              <span>Experience &amp; Timeline</span>
            </span>
          </div>

          <button className="detail-modal-close" onClick={onClose} aria-label="Close Journey Modal">
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="detail-modal-body">
          <div className="case-study-hero">
            <h2 id="journey-modal-title" className="case-study-title">
              Experience &amp; Milestones
            </h2>
            <p className="case-study-tagline">
              Chronology covering academic foundations at St. Xavier&apos;s Catholic College of Engineering (SXCCE), internship at Nexus Spark, industry internships, and technical milestones.
            </p>
          </div>

          {/* 1. Official Experience & Internships */}
          <section className="case-card">
            <div className="case-card-header">
              <Briefcase size={16} className="text-primary" />
              <h3>Work Experience &amp; Internships</h3>
            </div>

            <div className="journey-deep-exp-stack">
              {experience.map((exp) => (
                <div key={exp.id} className="journey-deep-exp-item">
                  <div className="journey-exp-top">
                    <div>
                      <h4 className="journey-exp-company">{exp.company}</h4>
                      <span className="journey-exp-role">{exp.role} · {exp.location}</span>
                    </div>
                    <span className="journey-exp-period">{exp.period}</span>
                  </div>

                  <p className="journey-exp-desc">{exp.description}</p>

                  {exp.highlights && (
                    <ul className="features-list">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={13} className="text-primary" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 2. Chronological Milestones */}
          <section className="case-card">
            <div className="case-card-header">
              <Clock size={16} className="text-secondary" />
              <h3>Chronological Milestones</h3>
            </div>

            <div className="journey-timeline-deep-list">
              {journey.map((item, idx) => (
                <div key={idx} className={`journey-timeline-deep-item ${item.isNext ? 'is-future' : ''}`}>
                  <div className="timeline-deep-node">
                    <span className="timeline-deep-dot" />
                  </div>
                  <div className="timeline-deep-content">
                    <div className="timeline-deep-top">
                      <span className="timeline-deep-year">{item.year}</span>
                      <span className="timeline-deep-tag">{item.tag}</span>
                    </div>
                    <h4 className="timeline-deep-title">{item.milestone}</h4>
                    <p className="timeline-deep-details">{item.details}</p>
                    {item.keyHighlights && (
                      <div className="timeline-deep-highlights">
                        {item.keyHighlights.map((kh, kidx) => (
                          <span key={kidx} className="timeline-highlight-pill">{kh}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Academic Qualifications */}
          <section className="case-card">
            <div className="case-card-header">
              <Award size={16} className="text-accent" />
              <h3>Academic Institution</h3>
            </div>
            {education.map((edu, idx) => (
              <div key={idx} className="about-edu-row">
                <div className="about-edu-top">
                  <h4 className="about-edu-degree">{edu.degree}</h4>
                  <span className="about-edu-period">{edu.period}</span>
                </div>
                <p className="about-edu-inst">{edu.institution} · <strong>{edu.status}</strong></p>
                {edu.focus && <p className="about-edu-focus"><strong>Core Subjects:</strong> {edu.focus}</p>}
              </div>
            ))}
          </section>

          {/* 4. Verified Achievements & Competitions */}
          {achievements && achievements.length > 0 && (
            <section className="case-card">
              <div className="case-card-header">
                <Award size={16} className="text-primary" />
                <h3>Verified Honors &amp; Achievements</h3>
              </div>
              <div className="achievements-modal-grid">
                {achievements.map((ach, idx) => (
                  <div key={idx} className="achievement-modal-card">
                    <div className="achievement-modal-top">
                      <span className="achievement-modal-year">{ach.year}</span>
                      <span className="achievement-modal-result">{ach.result}</span>
                    </div>
                    <h4 className="achievement-modal-title">{ach.title}</h4>
                    <span className="achievement-modal-cat">{ach.category}</span>
                    <p className="achievement-modal-desc">{ach.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

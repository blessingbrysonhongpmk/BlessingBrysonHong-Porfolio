import { ArrowRight } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './Journey.css';

export function Journey({ onOpenJourney, onOpenAchievements }) {
  const { content } = usePortfolioContent();
  const achievements = content.achievementsSummary || [];

  return (
    <section id="journey" className="journey-section" aria-label="Experience & Achievements">
      <div className="container journey-container">
        {/* ── 1. Experience Timeline ── */}
        <div className="journey-block">
          <div className="journey-header">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Work &amp; Internships</h2>
            <p className="section-subtitle">
              Professional software development and industry internships.
            </p>
          </div>

          <div className="experience-timeline" role="list">
            {/* CURRENT: Nesus Park */}
            <div
              className="timeline-entry timeline-entry--current"
              onClick={onOpenJourney}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenJourney();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Current: Nesus Park — Software Developer"
            >
              <div className="timeline-entry__year-badge">
                <span className="timeline-dot" aria-hidden="true" />
                <span className="timeline-year-text">CURRENT</span>
              </div>
              <div className="timeline-entry__content">
                <div className="timeline-entry__header">
                  <h3 className="timeline-entry__company">Nesus Park</h3>
                  <span className="timeline-entry__role">Software Developer</span>
                </div>
                <p className="timeline-entry__desc">Working on company projects.</p>
              </div>
            </div>

            {/* 2026: Agile Info Park */}
            <div
              className="timeline-entry"
              onClick={onOpenJourney}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenJourney();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="2026: Agile Info Park — Internship Full Stack Development"
            >
              <div className="timeline-entry__year-badge">
                <span className="timeline-dot timeline-dot--muted" aria-hidden="true" />
                <span className="timeline-year-text">2026</span>
              </div>
              <div className="timeline-entry__content">
                <div className="timeline-entry__header">
                  <h3 className="timeline-entry__company">Agile Info Park</h3>
                  <span className="timeline-entry__role">Internship</span>
                </div>
                <p className="timeline-entry__desc">Full Stack Development using Python and Django.</p>
              </div>
            </div>

            {/* 2025: AK Info Park */}
            <div
              className="timeline-entry"
              onClick={onOpenJourney}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenJourney();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="2025: AK Info Park — Internship Data Science"
            >
              <div className="timeline-entry__year-badge">
                <span className="timeline-dot timeline-dot--muted" aria-hidden="true" />
                <span className="timeline-year-text">2025</span>
              </div>
              <div className="timeline-entry__content">
                <div className="timeline-entry__header">
                  <h3 className="timeline-entry__company">AK Info Park</h3>
                  <span className="timeline-entry__role">Internship</span>
                </div>
                <p className="timeline-entry__desc">Data Science using Python.</p>
              </div>
            </div>
          </div>

          <div className="journey-action">
            <button
              type="button"
              className="journey-btn"
              onClick={onOpenJourney}
              id="journey-view-btn"
              aria-label="View complete journey details"
            >
              <span>VIEW FULL JOURNEY DETAILS</span>
              <ArrowRight size={14} className="journey-btn__arrow" />
            </button>
          </div>
        </div>

        {/* ── 2. Achievements Overview ── */}
        <div className="achievements-block">
          <div className="achievements-header">
            <span className="section-label">Achievements</span>
            <h2 className="section-title">Credentials &amp; Milestones</h2>
            <p className="section-subtitle">
              Verified recognitions across competitions, presentations, and client delivery.
            </p>
          </div>

          <div className="achievements-compact-grid" role="list">
            {achievements.map((ach) => (
              <div
                key={ach.label}
                className="achievement-item"
                onClick={() => onOpenAchievements && onOpenAchievements(ach.label)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onOpenAchievements) onOpenAchievements(ach.label);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View achievements for ${ach.label}`}
              >
                <div className="achievement-item__top">
                  <h4 className="achievement-item__title">{ach.label}</h4>
                  <ArrowRight size={14} className="achievement-item__arrow" />
                </div>
                <p className="achievement-item__detail">{ach.detail}</p>
              </div>
            ))}
          </div>

          <div className="achievements-action">
            <button
              type="button"
              className="journey-btn"
              onClick={() => onOpenAchievements && onOpenAchievements('ALL')}
              id="achievements-view-all-btn"
              aria-label="View all achievement details"
            >
              <span>EXPLORE ALL ACHIEVEMENTS</span>
              <ArrowRight size={14} className="journey-btn__arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

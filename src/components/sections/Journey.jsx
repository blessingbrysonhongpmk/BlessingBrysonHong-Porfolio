import { ArrowRight, Trophy, Milestone } from 'lucide-react';
import './Journey.css';

const MILESTONES = [
  {
    year: '2024',
    title: 'Started B.Tech AI & DS',
    desc: 'Foundations in Python, discrete mathematics, and linear algebra.',
  },
  {
    year: '2025',
    title: 'Full-Stack Systems & Dual Internships',
    desc: 'Data science at Pantech ProLabs & full-stack development at Corizo.',
  },
  {
    year: '2026',
    title: 'Hackathons, Client Engineering & AI Systems',
    desc: 'Production deployment for Devi Devan, Smart Canteen ML & campus AI.',
  },
];

const ACHIEVEMENTS_SUMMARY = [
  { label: 'Technical Competitions', detail: 'State & University Engineering Challenges' },
  { label: 'Paper Presentations', detail: 'Machine Learning & Predictive Modeling' },
  { label: 'Hackathons', detail: 'Rapid Prototyping & AI Hackathons' },
  { label: 'Client Delivery', detail: 'Production Web Systems & Commercial Deployments' },
];

export function Journey({ onOpenJourney }) {
  return (
    <section id="journey" className="journey-preview-section" aria-label="Journey and Achievements Preview">
      <div className="container journey-preview-container">
        
        {/* Section Kicker */}
        <div className="section-kicker">
          <span className="section-kicker__num">04</span>
          <span className="section-kicker__label">JOURNEY &amp; ACHIEVEMENTS</span>
          <div className="section-kicker__line" />
        </div>

        {/* Header Block */}
        <div className="journey-preview-header">
          <div className="journey-preview-header__text">
            <h2 className="journey-preview-title">
              Engineering <span className="text-gradient-crimson">Trajectory</span>
            </h2>
            <p className="journey-preview-subtitle">
              Progressive timeline and verified competitive recognition. Click any block to view the full chronological narrative and dual internship dossiers.
            </p>
          </div>
        </div>

        {/* ── 2-Column Split: Milestones & Achievements ── */}
        <div className="trajectory-split-grid">
          
          {/* Column A: Milestones Preview */}
          <div className="trajectory-card">
            <div className="trajectory-card__top">
              <div className="trajectory-card__icon-box">
                <Milestone size={16} className="text-primary" />
              </div>
              <h3 className="trajectory-card__title">MILESTONES</h3>
            </div>

            <div className="milestones-stream">
              {MILESTONES.map((m) => (
                <div key={m.year} className="milestone-preview-item">
                  <span className="milestone-preview-year">{m.year}</span>
                  <div className="milestone-preview-body">
                    <h4 className="milestone-preview-heading">{m.title}</h4>
                    <p className="milestone-preview-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="trajectory-action-btn"
              onClick={onOpenJourney}
              id="journey-view-btn"
              aria-label="View complete detailed engineering journey and internships"
            >
              <span>VIEW COMPLETE JOURNEY</span>
              <ArrowRight size={14} className="action-btn-arrow" />
            </button>
          </div>

          {/* Column B: Achievements Preview */}
          <div className="trajectory-card">
            <div className="trajectory-card__top">
              <div className="trajectory-card__icon-box">
                <Trophy size={16} className="text-accent" />
              </div>
              <h3 className="trajectory-card__title">ACHIEVEMENTS</h3>
            </div>

            <div className="achievements-stream">
              {ACHIEVEMENTS_SUMMARY.map((a) => (
                <div key={a.label} className="achievement-preview-item">
                  <span className="achievement-preview-pip" />
                  <div className="achievement-preview-body">
                    <h4 className="achievement-preview-label">{a.label}</h4>
                    <span className="achievement-preview-detail">{a.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="trajectory-action-btn"
              onClick={onOpenJourney}
              id="achievements-view-btn"
              aria-label="View full achievements and credentials dossier"
            >
              <span>VIEW ALL ACHIEVEMENTS</span>
              <ArrowRight size={14} className="action-btn-arrow" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

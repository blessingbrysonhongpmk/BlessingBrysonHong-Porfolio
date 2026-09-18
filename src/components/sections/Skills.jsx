import { ArrowRight, Cpu, Layers, Database, Layout, Server } from 'lucide-react';
import './Skills.css';

const DOMAIN_PREVIEWS = [
  {
    id: 'ai-ml',
    title: 'AI / ML',
    summary: 'Predictive modeling, regression pipelines & computer vision',
    icon: Cpu,
  },
  {
    id: 'full-stack',
    title: 'Full Stack',
    summary: 'End-to-end web architectures, client-server sync & state',
    icon: Layers,
  },
  {
    id: 'data',
    title: 'Data Science',
    summary: 'Exploratory data analysis, Pandas, NumPy & metrics',
    icon: Database,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    summary: 'Modern React, Vite, responsive design & design tokens',
    icon: Layout,
  },
  {
    id: 'backend',
    title: 'Backend & Cloud',
    summary: 'Django REST, Node.js, SQL modeling & Firebase cloud',
    icon: Server,
  },
];

export function Skills({ onOpenSkills }) {
  return (
    <section id="skills" className="skills-preview-section" aria-label="Skills Preview">
      <div className="container skills-preview-container">
        
        {/* Section Kicker */}
        <div className="section-kicker">
          <span className="section-kicker__num">03</span>
          <span className="section-kicker__label">SKILLS</span>
          <div className="section-kicker__line" />
        </div>

        {/* Header Block */}
        <div className="skills-preview-header">
          <div className="skills-preview-header__text">
            <h2 className="skills-preview-title">
              Technical <span className="text-gradient-crimson">Capabilities</span>
            </h2>
            <p className="skills-preview-subtitle">
              High-level domain focus. Click to inspect the full categorized skills matrix with verified readiness levels.
            </p>
          </div>

          <button
            type="button"
            className="skills-preview-btn"
            onClick={onOpenSkills}
            id="skills-explore-btn"
            aria-label="Open detailed skills and technology matrix"
          >
            <span>EXPLORE ALL SKILLS</span>
            <ArrowRight size={14} className="skills-btn-icon" />
          </button>
        </div>

        {/* ── Compact Domain Cards (5 Disciplines) ── */}
        <div className="skills-domain-grid" role="list">
          {DOMAIN_PREVIEWS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                role="button"
                tabIndex={0}
                className="skills-domain-card"
                onClick={onOpenSkills}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSkills();
                  }
                }}
                aria-label={`Inspect ${domain.title} skills`}
              >
                <div className="domain-card__top">
                  <span className="domain-card__icon-box">
                    <Icon size={16} className="domain-card__icon" />
                  </span>
                  <span className="domain-card__title">{domain.title}</span>
                </div>
                <p className="domain-card__summary">{domain.summary}</p>
                <div className="domain-card__footer">
                  <span className="domain-card__action">Details →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

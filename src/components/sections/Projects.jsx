import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import './Projects.css';

export function Projects({ onSelectProject }) {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="work" className="work-preview-section" aria-label="Selected Engineering Work">
      <div className="container work-preview-container">

        {/* Section Marker */}
        <div className="section-kicker">
          <span className="section-kicker__num">02</span>
          <span className="section-kicker__label">SELECTED WORK</span>
          <div className="section-kicker__line" />
        </div>

        {/* Section Header */}
        <div className="work-preview-header">
          <div className="work-preview-header__text">
            <h2 className="work-preview-title">
              Engineered <span className="text-gradient-crimson">Systems</span>
            </h2>
            <p className="work-preview-subtitle">
              Selected production software, machine learning forecasting, and full-stack systems. Click any project to open the comprehensive case study.
            </p>
          </div>
          <span className="work-preview-count">{projects.length} CASE STUDIES</span>
        </div>

        {/* ── Editorial Project List (Compact & Scannable) ── */}
        <div className="editorial-project-list" role="list" aria-label="Project Case Studies">
          {projects.map((project, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                className="editorial-project-row"
                onClick={() => onSelectProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                id={`project-row-${project.id}`}
                aria-label={`View case study for ${project.name}`}
              >
                {/* Left Edge Accent Line */}
                <div className="project-row__accent-line" aria-hidden="true" />

                {/* Project Index */}
                <span className="project-row__num">{num}</span>

                {/* Project Core Identity */}
                <div className="project-row__identity">
                  <div className="project-row__title-row">
                    <h3 className="project-row__name">{project.name}</h3>
                    <span className="project-row__category-tag">{project.category}</span>
                  </div>
                  <p className="project-row__desc">
                    {project.oneLiner || project.description}
                  </p>
                </div>

                {/* Project Metadata & Year */}
                <div className="project-row__meta">
                  <span className="project-row__year">{project.year || '2026'}</span>
                </div>

                {/* Interactive Action Trigger */}
                <div className="project-row__action">
                  <span className="project-row__action-label">View Case Study</span>
                  <span className="project-row__arrow-circle">
                    <ArrowUpRight size={14} className="project-row__arrow-icon" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

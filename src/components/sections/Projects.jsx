import { useMemo } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './Projects.css';

export function Projects({ onSelectProject }) {
  const { content } = usePortfolioContent();
  const projects = useMemo(() => content.projects || [], [content.projects]);

  return (
    <section id="projects" className="work-section" aria-label="Projects">
      <span id="work" className="sr-only" aria-hidden="true" />

      <div className="container work-container">
        {/* Simple Confident Heading */}
        <div className="work-header">
          <h2 className="work-title">PROJECTS</h2>
        </div>

        {/* Balanced 2-Column Editorial Grid (Desktop: 2 per row | Mobile: 1 per row) */}
        <div className="work-grid" role="list">
          {projects.map((project, index) => {
            const num = String(index + 1).padStart(2, '0');
            const description = project.oneLiner || project.tagline || project.description;
            const category = project.category || 'Engineering';
            const year = project.year || '2026';

            // Distinctive project-specific themes adhering to one unified design system:
            // 01 SMART CANTEEN AI: Red + Deep Purple
            // 02 DEVI DEVAN INDUSTRIES: Deep Green + Black
            // 03 ALUMINIUM FABRICATION PORTAL: Grey + White + Metallic
            const themeClass =
              project.id === 'smart-canteen-ai'
                ? 'project-card--canteen'
                : project.id === 'devi-devan-industries'
                ? 'project-card--devidevan'
                : project.id === 'aluminium-fabrication'
                ? 'project-card--aluminium'
                : 'project-card--default';

            return (
              <article
                key={project.id}
                className={`project-card desk-card ${themeClass}`}
                onClick={() => onSelectProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View project: ${project.name}`}
              >
                {/* Subtle project-specific ambient lighting layer */}
                <div className="project-card__ambient" aria-hidden="true" />

                {/* 1. Number with subtle card suit accent */}
                <div className="project-card__num-wrap">
                  <span className="project-card__pip" aria-hidden="true">
                    {index === 0 ? '♠' : index === 1 ? '♦' : index === 2 ? '♣' : '♥'}
                  </span>
                  <span className="project-card__num">{num}</span>
                </div>

                {/* 2. Project Image */}
                <div className="project-card__thumb-stage">
                  <div className="project-card__thumb-glow" aria-hidden="true" />
                  <div className="project-card__thumb-wrap">
                    <img
                      src={project.image || '/profile.jpeg'}
                      alt={project.name}
                      className="project-card__thumb"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Block */}
                <div className="project-card__body">
                  {/* 3. Project Name */}
                  <h3 className="project-card__name">{project.name}</h3>

                  {/* 4. One Short Description */}
                  <p className="project-card__desc">{description}</p>

                  {/* 5. Category • Year */}
                  <div className="project-card__meta">
                    <span className="project-card__cat">{category}</span>
                    <span className="project-card__sep" aria-hidden="true">•</span>
                    <span className="project-card__year">{year}</span>
                  </div>

                  {/* 6. View Project CTA */}
                  <div className="project-card__cta">
                    <span className="project-card__cta-label">VIEW PROJECT</span>
                    <span className="project-card__cta-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

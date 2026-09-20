import { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './Projects.css';

export function Projects({ onSelectProject }) {
  const { content } = usePortfolioContent();
  const projects = useMemo(() => content.projects || [], [content.projects]);

  return (
    <section id="projects" className="work-section" aria-label="Projects">
      <span id="work" className="sr-only" aria-hidden="true" />

      <div className="container work-container">
        {/* Simple Confident Heading — Straight to the work */}
        <div className="work-header">
          <h2 className="work-title">PROJECTS</h2>
        </div>

        {/* Compact Editorial Project Showcase */}
        <div className="work-list" role="list">
          {projects.map((project, index) => {
            const num = String(index + 1).padStart(2, '0');
            const description = project.oneLiner || project.tagline || project.description;
            const category = project.category || 'Engineering';
            const year = project.year || '2026';

            return (
              <article
                key={project.id}
                className="project-row"
                onClick={() => onSelectProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View case study for ${project.name}`}
              >
                {/* 1. Numbering (Desktop) */}
                <span className="project-row__num" aria-hidden="true">
                  {num}
                </span>

                {/* 2. Small Immediate Thumbnail */}
                <div className="project-row__thumb-wrap">
                  <img
                    src={project.image || '/profile.jpeg'}
                    alt={project.name}
                    className="project-row__thumb"
                    loading="lazy"
                  />
                </div>

                {/* 3. Content Column */}
                <div className="project-row__content">
                  <h3 className="project-row__name">{project.name}</h3>
                  <p className="project-row__desc">{description}</p>
                  <div className="project-row__bottom">
                    <div className="project-row__meta">
                      <span className="project-row__num-mobile" aria-hidden="true">{num} · </span>
                      <span className="project-row__cat">{category}</span>
                      <span className="project-row__sep" aria-hidden="true">•</span>
                      <span className="project-row__year">{year}</span>
                    </div>
                    <ArrowUpRight size={15} className="project-row__arrow-mobile" aria-hidden="true" />
                  </div>
                </div>

                {/* 4. Desktop Arrow */}
                <div className="project-row__arrow-wrap" aria-hidden="true">
                  <ArrowUpRight size={18} className="project-row__arrow" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


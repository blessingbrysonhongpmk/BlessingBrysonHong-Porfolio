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
        <div className="work-header mb-4 mb-md-5">
          <h2 className="work-title">PROJECTS</h2>
        </div>

        {/* Compact Editorial Project Showcase with Bootstrap Layout */}
        <div className="work-list d-flex flex-column gap-3" role="list">
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
                <div className="row g-2 g-sm-3 g-md-4 align-items-center flex-nowrap w-100 m-0">
                  {/* 1. Numbering — visible on tablet/desktop */}
                  <div className="col-auto d-none d-md-block p-0">
                    <span className="project-row__num" aria-hidden="true">
                      {num}
                    </span>
                  </div>

                  {/* 2. Compact Thumbnail */}
                  <div className="col-auto p-0">
                    <div className="project-row__thumb-wrap">
                      <img
                        src={project.image || '/profile.jpeg'}
                        alt={project.name}
                        className="project-row__thumb"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* 3. Content Column — takes remaining space without clipping */}
                  <div className="col min-w-0 p-0 ps-2 ps-sm-3 ps-md-3">
                    <div className="project-row__content">
                      <h3 className="project-row__name">{project.name}</h3>
                      <p className="project-row__desc">{description}</p>
                      <div className="project-row__meta d-flex align-items-center gap-1 gap-sm-2">
                        <span className="project-row__num-mobile d-md-none" aria-hidden="true">
                          {num} ·{' '}
                        </span>
                        <span className="project-row__cat">{category}</span>
                        <span className="project-row__sep" aria-hidden="true">•</span>
                        <span className="project-row__year">{year}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Action Arrow */}
                  <div className="col-auto p-0 ms-auto">
                    <div className="project-row__arrow-wrap" aria-hidden="true">
                      <ArrowUpRight size={18} className="project-row__arrow" />
                    </div>
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

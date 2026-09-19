import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './Projects.css';

export function Projects({ onSelectProject }) {
  const { content } = usePortfolioContent();
  const projects = useMemo(() => content.projects || [], [content.projects]);

  // Dynamic Categories
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="work-section" aria-label="Featured Projects">
      <span id="work" className="sr-only" aria-hidden="true" />

      <div className="container work-container">
        {/* Section Header */}
        <div className="work-header">
          <div className="work-header__top">
            <span className="section-label">Projects</span>
            <span className="work-header__count">{projects.length} Projects</span>
          </div>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">
            Machine learning models, full-stack applications, and commercial client websites.
          </p>

          {/* Minimal Domain Filter Pills */}
          <div className="work-filters" role="tablist" aria-label="Filter projects">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`work-filter-pill ${isActive ? 'work-filter-pill--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Editorial Project Previews */}
        <div className="work-list" role="list">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-item"
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
              {/* 1. Small Thumbnail Image (Immediately Visible) */}
              <div className="project-item__thumb-wrap">
                <img
                  src={project.image || '/profile.jpeg'}
                  alt={project.name}
                  className="project-item__thumb"
                  loading="lazy"
                />
              </div>

              {/* 2. Middle Content Column */}
              <div className="project-item__content">
                <div className="project-item__title-row">
                  <h3 className="project-item__name">{project.name}</h3>
                </div>

                {/* 3. One-line Description */}
                <p className="project-item__desc">
                  {project.oneLiner || project.tagline || project.description}
                </p>

                {/* 4. Category · Year */}
                <div className="project-item__meta">
                  <span className="project-item__cat">{project.category}</span>
                  <span className="project-item__dot" aria-hidden="true">·</span>
                  <span className="project-item__year">{project.year || '2026'}</span>
                </div>
              </div>

              {/* 5. Right Arrow Action */}
              <div className="project-item__action" aria-hidden="true">
                <span className="project-item__action-label">Case Study</span>
                <ArrowRight size={16} className="project-item__arrow" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

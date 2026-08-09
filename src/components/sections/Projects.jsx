import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ExternalLink, Wrench, Zap, Globe } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import './Projects.css';

const STATUS_CONFIG = {
  Live: { label: 'Live', className: 'status--live' },
  Complete: { label: 'Complete', className: 'status--complete' },
  Building: { label: 'Building...', className: 'status--building' },
  Prototype: { label: 'Prototype', className: 'status--prototype' },
};

export function Projects() {
  const { projects, projectCategories } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <Section id="work" title="Selected Work" subtitle="Projects">
      {/* Category filter */}
      <div className="projects__filters" role="tablist" aria-label="Filter projects by category">
        {projectCategories.map(cat => (
          <button
            key={cat}
            className={`projects__filter ${activeCategory === cat ? 'projects__filter--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            role="tab"
            aria-selected={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project list */}
      <div className="projects__grid">
        {filtered.map((project) => (
          <article
            key={project.id}
            className={`project-card ${project.isFlagship ? 'project-card--flagship' : ''} ${hoveredProject === project.id ? 'project-card--hovered' : ''}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Accent bar */}
            <div className="project-card__accent" style={{ '--project-color': project.color }} />

            <div className="project-card__content">
              {/* Header */}
              <div className="project-card__header">
                <div className="project-card__meta">
                  <span className={`project-card__status ${STATUS_CONFIG[project.status]?.className || ''}`}>
                    {project.status === 'Building' && <Wrench size={10} />}
                    {project.status === 'Live' && <Zap size={10} />}
                    {STATUS_CONFIG[project.status]?.label || project.status}
                  </span>
                  <span className="project-card__category">{project.category}</span>
                </div>
                <h3 className="project-card__name">{project.name}</h3>
                <p className="project-card__role">{project.role}</p>
              </div>

              {/* Description */}
              <p className="project-card__description">{project.description}</p>

              {/* Tech */}
              <div className="project-card__tech">
                {project.technologies.map(tech => (
                  <span key={tech} className="project-card__tech-tag">{tech}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="project-card__actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link project-card__link--primary"
                  >
                    Visit Live Website
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link project-card__link--outline"
                  >
                    View on GitHub
                    <GithubIcon size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Flagship Digital Frame Visual */}
            {project.isFlagship && (
              <div className="project-card__preview-frame">
                <div className="preview-frame__bar">
                  <span className="preview-frame__dot preview-frame__dot--red" />
                  <span className="preview-frame__dot preview-frame__dot--yellow" />
                  <span className="preview-frame__dot preview-frame__dot--green" />
                  <span className="preview-frame__url">
                    <Globe size={11} /> devidevanindustries.com
                  </span>
                </div>
                <div className="preview-frame__screen">
                  <div className="preview-frame__content">
                    <span className="preview-frame__brand">DEVI DEVAN INDUSTRIES</span>
                    <span className="preview-frame__sub">Real-world Client Site</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="preview-frame__cta"
                    >
                      Visit devidevanindustries.com <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}

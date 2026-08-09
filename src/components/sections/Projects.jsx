import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ExternalLink, Wrench, Zap, Globe, Eye, Cpu, BarChart2 } from 'lucide-react';
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
    <Section id="work" title="Selected Work" subtitle="Case Artifacts">
      {/* Category filters */}
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

      {/* Project case artifacts grid */}
      <div className="projects__grid">
        {filtered.map((project, index) => {
          const artifactIndex = String(index + 1).padStart(2, '0');
          const isSmartCanteen = project.id === 'smart-canteen-ai';
          const isDeviDevan = project.id === 'devi-devan-industries';
          const isCampusSafety = project.id === 'campus-safety-ai';

          return (
            <article
              key={project.id}
              className={`project-card ${project.isFlagship ? 'project-card--flagship' : ''} ${hoveredProject === project.id ? 'project-card--hovered' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Top Accent Line */}
              <div className="project-card__accent" style={{ '--project-color': project.color }} />

              <div className="project-card__content">
                {/* Header Meta */}
                <div className="project-card__header">
                  <div className="project-card__meta">
                    <span className="project-card__index">{artifactIndex}</span>
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

                {/* Specific Artifact Visualizations */}
                {/* 1. Smart Canteen AI Demand Curve Visualization */}
                {isSmartCanteen && (
                  <div className="project-artifact-viz smart-canteen-viz">
                    <div className="viz-header">
                      <BarChart2 size={12} className="text-accent" />
                      <span>DATA → PREDICTION → PREPARATION</span>
                    </div>
                    <svg viewBox="0 0 300 80" className="canteen-svg-curve">
                      <path d="M 10 60 Q 60 10, 110 45 T 210 20 T 290 55" className="canteen-path-line" />
                      <circle cx="110" cy="45" r="4" className="canteen-dot dot--active" />
                      <circle cx="210" cy="20" r="4" className="canteen-dot dot--peak" />
                      <text x="205" y="12" className="canteen-text">Peak Demand</text>
                    </svg>
                    <span className="viz-footer-tag">Predicts daily food demand to minimize waste</span>
                  </div>
                )}

                {/* 2. Campus Safety AI Computer Vision Visualization */}
                {isCampusSafety && (
                  <div className="project-artifact-viz campus-safety-viz">
                    <div className="viz-header">
                      <Eye size={12} className="text-accent" />
                      <span>CAM-01 [LIVE DETECTION GRID]</span>
                    </div>
                    <div className="cv-bounding-box">
                      <span className="cv-label">DETECTION REGION: ACTIVE</span>
                      <div className="cv-corners">
                        <span className="corner top-left" />
                        <span className="corner top-right" />
                        <span className="corner bottom-left" />
                        <span className="corner bottom-right" />
                      </div>
                    </div>
                    <span className="viz-footer-tag">EXPERIMENTAL AI PROTOTYPE · NOT PRODUCTION</span>
                  </div>
                )}

                {/* Technologies */}
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

              {/* Flagship Devi Devan Client Frame Visual */}
              {isDeviDevan && (
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
                      <span className="preview-frame__sub">Real-world Client Project (React + Vite)</span>
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
          );
        })}
      </div>
    </Section>
  );
}

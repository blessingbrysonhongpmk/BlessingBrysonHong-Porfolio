import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ProjectModal } from '../ui/ProjectModal';
import { ExternalLink, Wrench, Zap, Globe, Eye, BarChart2, Info, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
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
  const [selectedProject, setSelectedProject] = useState(null);

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
          const isTwoColumnTarget = isSmartCanteen || isDeviDevan;

          if (isTwoColumnTarget) {
            return (
              <article
                key={project.id}
                className={`project-card project-card--case-study ${hoveredProject === project.id ? 'project-card--hovered' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project)}
              >
                {/* Top Accent Line */}
                <div className="project-card__accent" style={{ '--project-color': project.color }} />

                <div className="case-study__container">
                  {/* LEFT: PROJECT VISUAL / PREVIEW */}
                  <div className="case-study__visual-col" onClick={(e) => e.stopPropagation()}>
                    {isSmartCanteen && (
                      <div className="visual-frame visual-frame--canteen">
                        <div className="visual-frame__topbar">
                          <div className="topbar__left">
                            <BarChart2 size={13} className="text-accent" />
                            <span className="topbar__title">SMART CANTEEN AI DASHBOARD</span>
                          </div>
                          <div className="topbar__right">
                            <span className="status-dot status-dot--green" />
                            <span className="topbar__badge">ML PREDICTION MODEL</span>
                          </div>
                        </div>

                        <div className="canteen-viz-body">
                          {/* Top Metrics Row */}
                          <div className="canteen-metrics-row">
                            <div className="canteen-stat">
                              <span className="stat__label">DAILY FORECAST</span>
                              <span className="stat__val">420 <span className="stat__unit">meals/day</span></span>
                            </div>
                            <div className="canteen-stat">
                              <span className="stat__label">WASTE REDUCTION</span>
                              <span className="stat__val stat__val--green">-34% <span className="stat__unit">est. waste</span></span>
                            </div>
                            <div className="canteen-stat">
                              <span className="stat__label">MODEL ACCURACY</span>
                              <span className="stat__val">94.2% <span className="stat__unit">R² score</span></span>
                            </div>
                          </div>

                          {/* Forecast Curve Chart */}
                          <div className="canteen-chart-wrapper">
                            <div className="chart-header">
                              <span>FOOD DEMAND PREDICTION CURVE</span>
                              <span className="chart-legend">
                                <span className="legend-item"><span className="legend-dot actual" /> Actual</span>
                                <span className="legend-item"><span className="legend-dot forecast" /> Forecast</span>
                              </span>
                            </div>
                            <svg viewBox="0 0 380 110" className="canteen-chart-svg">
                              <defs>
                                <linearGradient id="canteenGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                                </linearGradient>
                              </defs>
                              {/* Background grid lines */}
                              <line x1="0" y1="25" x2="380" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                              <line x1="0" y1="55" x2="380" y2="55" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                              <line x1="0" y1="85" x2="380" y2="85" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                              
                              {/* Filled Gradient Path */}
                              <path d="M 15 85 Q 75 25, 135 60 T 255 20 T 365 70 L 365 105 L 15 105 Z" fill="url(#canteenGradient)" />
                              
                              {/* Forecast Curved Line */}
                              <path d="M 15 85 Q 75 25, 135 60 T 255 20 T 365 70" className="canteen-line-path" />
                              
                              {/* Data Points */}
                              <circle cx="75" cy="25" r="4" className="chart-dot" />
                              <circle cx="135" cy="60" r="4" className="chart-dot" />
                              <circle cx="255" cy="20" r="5" className="chart-dot chart-dot--peak" />
                              <circle cx="365" cy="70" r="4" className="chart-dot" />
                              
                              {/* Peak Callout Badge */}
                              <g transform="translate(210, 2)">
                                <rect x="0" y="0" width="90" height="16" rx="4" fill="rgba(34, 197, 94, 0.25)" stroke="#22C55E" strokeWidth="1" />
                                <text x="45" y="11" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold" fontFamily="monospace">PEAK DEMAND</text>
                              </g>
                            </svg>
                          </div>

                          {/* Technical Environment Tags */}
                          <div className="visual-footer-bar">
                            <span className="env-pill"><Activity size={10} /> Python & ML Pipeline</span>
                            <span className="env-pill"><TrendingUp size={10} /> Streamlit Analytics UI</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isDeviDevan && (
                      <div className="visual-frame visual-frame--devidevan">
                        {/* Browser Window Bar */}
                        <div className="visual-frame__topbar">
                          <div className="browser-controls">
                            <span className="dot dot--red" />
                            <span className="dot dot--yellow" />
                            <span className="dot dot--green" />
                          </div>
                          <div className="browser-url-bar">
                            <Globe size={11} className="text-accent" />
                            <span className="url-text">devidevanindustries.com</span>
                            <span className="badge-live-ssl">LIVE CLIENT SITE</span>
                          </div>
                        </div>

                        {/* Browser Website Mockup Viewport */}
                        <div className="devidevan-mockup-viewport">
                          <div className="mockup-header-nav">
                            <span className="mockup-logo">DEVI DEVAN INDUSTRIES</span>
                            <div className="mockup-links">
                              <span>SERVICES</span>
                              <span>CAPABILITIES</span>
                              <span>CONTACT</span>
                            </div>
                          </div>

                          <div className="mockup-hero-box">
                            <span className="mockup-badge">CLIENT WEB PROJECT</span>
                            <h4 className="mockup-hero-heading">Industrial Steel & Metal Fabrication</h4>
                            <p className="mockup-hero-subtext">Precision engineering, custom fabrication, and high-performance metalwork.</p>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mockup-visit-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Visit devidevanindustries.com</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>

                          <div className="mockup-cards-row">
                            <div className="mockup-card-item">
                              <ShieldCheck size={12} className="text-accent" />
                              <span>Custom Fabrication</span>
                            </div>
                            <div className="mockup-card-item">
                              <Wrench size={12} className="text-accent" />
                              <span>Structural Assembly</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RIGHT: PROJECT INFORMATION / DETAILS */}
                  <div className="case-study__info-col">
                    {/* 01 / 02 + STATUS + CATEGORY */}
                    <div className="project-card__meta">
                      <span className="project-card__index">{artifactIndex}</span>
                      <span className={`project-card__status ${STATUS_CONFIG[project.status]?.className || ''}`}>
                        {project.status === 'Building' && <Wrench size={10} />}
                        {project.status === 'Live' && <Zap size={10} />}
                        {STATUS_CONFIG[project.status]?.label || project.status}
                      </span>
                      <span className="project-card__category">{project.category}</span>
                    </div>

                    {/* TITLE */}
                    <h3 className="project-card__name">{project.name}</h3>

                    {/* ROLE */}
                    <p className="project-card__role">{project.role}</p>

                    {/* DESCRIPTION */}
                    <p className="project-card__description">{project.description}</p>

                    {/* TECHNOLOGIES */}
                    <div className="project-card__tech">
                      {project.technologies.map(tech => (
                        <span key={tech} className="project-card__tech-tag">{tech}</span>
                      ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="project-card__actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="project-card__link project-card__link--detail"
                        onClick={() => setSelectedProject(project)}
                      >
                        <span>View Details</span>
                        <Info size={13} />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__link project-card__link--primary"
                        >
                          <span>Visit Live</span>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card__link project-card__link--outline"
                        >
                          <span>GitHub</span>
                          <GithubIcon size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          }

          {/* Standard Project Cards */}
          return (
            <article
              key={project.id}
              className={`project-card ${hoveredProject === project.id ? 'project-card--hovered' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card__accent" style={{ '--project-color': project.color }} />

              <div className="project-card__content">
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

                <p className="project-card__description">{project.description}</p>

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

                <div className="project-card__tech">
                  {project.technologies.map(tech => (
                    <span key={tech} className="project-card__tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-card__actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="project-card__link project-card__link--detail"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>View Details</span>
                    <Info size={13} />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link project-card__link--primary"
                    >
                      <span>Visit Live</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card__link project-card__link--outline"
                    >
                      <span>GitHub</span>
                      <GithubIcon size={13} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
}

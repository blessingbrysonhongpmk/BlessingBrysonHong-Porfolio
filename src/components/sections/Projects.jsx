import { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ProjectModal } from '../ui/ProjectModal';
import { getLenis } from '../../utils/scrollOrchestrator';
import {
  ExternalLink,
  Info,
  Zap,
  CheckCircle2,
  Globe,
  BarChart2,
  Eye,
  Sliders,
  Filter,
} from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import './Projects.css';

export function Projects() {
  const { projects } = PORTFOLIO_DATA;
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || '');
  const sectionRef = useRef(null);
  const projectRefs = useRef({});

  const categories = [
    'All',
    'Data Science / Machine Learning',
    'Client Web Project',
    'Web Development Project',
    'AI Prototype',
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Set up IntersectionObserver to update active project indicator on scroll
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-project-id');
          if (id) {
            setActiveProjectId(id);
          }
          entry.target.classList.add('is-in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.15,
    });

    const cardElements = document.querySelectorAll('.showcase-card');
    cardElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const scrollToProject = useCallback((e, projectId) => {
    e.preventDefault();
    const target = document.getElementById(`project-${projectId}`);
    if (target) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, { offset: -90, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveProjectId(projectId);
    }
  }, []);

  // Helper to render interactive visual stage for any project
  const renderVisualStage = (project) => {
    const isSmartCanteen = project.id === 'smart-canteen-ai';
    const isDeviDevan = project.id === 'devi-devan-industries';
    const isAluminium = project.id === 'aluminium-fabrication';
    const isCampusSafety = project.id === 'campus-safety-ai';

    return (
      <div className="showcase-card__visual-stage">
        {/* Visual 1: Smart Canteen ML Forecast Graph */}
        {isSmartCanteen && (
          <div className="stage-frame stage-frame--canteen">
            <div className="stage-topbar">
              <div className="topbar-left">
                <BarChart2 size={13} className="text-accent" />
                <span className="stage-topbar-title">DEMAND_FORECAST_ENGINE.PY</span>
              </div>
              <div className="topbar-right">
                <span className="topbar-badge">ACCURACY: 94.2% R²</span>
              </div>
            </div>

            <div className="canteen-visual-content">
              <div className="metric-cards-grid">
                <div className="stage-metric">
                  <span className="stage-metric-label">DAILY RUN RATE</span>
                  <span className="stage-metric-val">420 <small>meals</small></span>
                </div>
                <div className="stage-metric">
                  <span className="stage-metric-label">WASTE REDUCTION</span>
                  <span className="stage-metric-val text-accent">-34% <small>est.</small></span>
                </div>
                <div className="stage-metric">
                  <span className="stage-metric-label">PIPELINE</span>
                  <span className="stage-metric-val">Python / Streamlit</span>
                </div>
              </div>

              <div className="chart-canvas-wrapper">
                <svg viewBox="0 0 400 130" className="canteen-svg-graph" aria-label="ML Demand Prediction Graph">
                  <defs>
                    <linearGradient id={`canteenGrad-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="65" x2="400" y2="65" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                  <path d="M 20 100 Q 80 30, 140 70 T 260 25 T 380 75 L 380 125 L 20 125 Z" fill={`url(#canteenGrad-${project.id})`} />
                  <path d="M 20 100 Q 80 30, 140 70 T 260 25 T 380 75" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" className="canteen-line-anim" />
                  
                  <circle cx="140" cy="70" r="4" fill="#10B981" />
                  <circle cx="260" cy="25" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" className="canteen-peak-ping" />
                  <circle cx="380" cy="75" r="4" fill="#10B981" />

                  <g transform="translate(210, 8)">
                    <rect x="0" y="0" width="100" height="18" rx="4" fill="rgba(56, 189, 248, 0.2)" stroke="#38BDF8" strokeWidth="1" />
                    <text x="50" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">PEAK LUNCH SURGE</text>
                  </g>
                </svg>
              </div>

              <div className="stage-footer">
                <span className="footer-tag">Regression Prediction</span>
                <span className="footer-tag">Feature Importance</span>
                <span className="footer-tag">Historical Trend Analysis</span>
              </div>
            </div>
          </div>
        )}

        {/* Visual 2: Devi Devan Production Client Site Mockup */}
        {isDeviDevan && (
          <div className="stage-frame stage-frame--browser">
            <div className="stage-topbar">
              <div className="browser-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="browser-address-bar">
                <Globe size={11} className="text-primary" />
                <span>devidevanindustries.com</span>
                <span className="ssl-secure">SSL LIVE</span>
              </div>
            </div>

            <div className="browser-viewport-content">
              <div className="mock-client-nav">
                <span className="client-logo">DEVI DEVAN INDUSTRIES</span>
                <div className="client-nav-links">
                  <span>SERVICES</span>
                  <span>FABRICATION</span>
                  <span>CONTACT</span>
                </div>
              </div>

              <div className="mock-client-hero">
                <span className="client-eyebrow">INDUSTRIAL FABRICATION &amp; STEELWORK</span>
                <h4 className="client-hero-title">Custom Heavy Industrial Metal Fabrication</h4>
                <p className="client-hero-desc">End-to-end engineering, automated precision sizing, and enterprise production delivery.</p>
                
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="client-visit-pill"
                  >
                    <span>Launch Production Site</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              <div className="mock-client-specs">
                <div className="spec-capsule">
                  <CheckCircle2 size={12} className="text-accent" />
                  <span>100% Client Deployed</span>
                </div>
                <div className="spec-capsule">
                  <Zap size={12} className="text-secondary" />
                  <span>React &amp; Vite Architecture</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual 3: Aluminium Fabrication Configurator Portal */}
        {isAluminium && (
          <div className="stage-frame stage-frame--portal">
            <div className="stage-topbar">
              <div className="topbar-left">
                <Sliders size={13} className="text-secondary" />
                <span className="stage-topbar-title">ALUMINIUM CONFIGURATOR ENGINE</span>
              </div>
              <div className="topbar-right">
                <span className="topbar-badge">DJANGO REST INTEGRATION</span>
              </div>
            </div>

            <div className="portal-viewport-content">
              <div className="portal-mockup-body">
                <div className="portal-schematic-box">
                  <span className="schematic-label">ARCHITECTURAL WINDOW ASSEMBLY</span>
                  <div className="schematic-wireframe">
                    <div className="wireframe-pane wireframe-pane--left" />
                    <div className="wireframe-pane wireframe-pane--right" />
                  </div>
                  <span className="schematic-dims">WIDTH: 2400mm × HEIGHT: 1800mm</span>
                </div>

                <div className="portal-spec-readout">
                  <div className="readout-row">
                    <span className="readout-key">PROFILE</span>
                    <span className="readout-val">Thermal Break 60mm</span>
                  </div>
                  <div className="readout-row">
                    <span className="readout-key">GLAZING</span>
                    <span className="readout-val">Double Glazed Argon</span>
                  </div>
                  <div className="readout-row">
                    <span className="readout-key">BACKEND</span>
                    <span className="readout-val">Django REST API</span>
                  </div>
                </div>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-visit-link"
                >
                  <span>Open Live Portal</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Visual 4: Campus Safety AI Computer Vision Stream */}
        {isCampusSafety && (
          <div className="stage-frame stage-frame--cv">
            <div className="stage-topbar">
              <div className="topbar-left">
                <Eye size={13} className="text-primary" />
                <span className="stage-topbar-title">CAM_FEED_01 // CV_INFERENCE</span>
              </div>
              <div className="topbar-right">
                <span className="topbar-badge">
                  <span className="rec-blinking-dot" />
                  ANOMALY DETECTOR: ACTIVE
                </span>
              </div>
            </div>

            <div className="cv-viewport-content">
              <div className="cv-hud-canvas">
                <div className="cv-overlay-reticle" />
                <div className="cv-bounding-box-demo">
                  <span className="bbox-label">REGION_01: SAFETY ZONE [CLEAR]</span>
                  <div className="bbox-corners">
                    <span className="corner tl" />
                    <span className="corner tr" />
                    <span className="corner bl" />
                    <span className="corner br" />
                  </div>
                </div>

                <div className="cv-telemetry-strip">
                  <span>MODEL: CNN PYTORCH</span>
                  <span>FPS: 30.0</span>
                  <span>LATENCY: 14ms</span>
                </div>
              </div>

              <div className="cv-bottom-info">
                <span className="cv-subtext">Computer vision frame sampling for automated hazard alerts on campus.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="work" className="work-section" ref={sectionRef} aria-label="Selected Engineering Work">
      <div className="container work-container">
        
        {/* Section Marker */}
        <div className="work-header-meta">
          <span className="section-index-num">02</span>
          <span className="section-index-title">FEATURED CASE STUDIES</span>
          <div className="section-index-line" />
        </div>

        {/* Section Headline */}
        <div className="work-intro-block">
          <div className="work-intro-header-row">
            <div>
              <h2 className="work-title">
                Engineered <span className="text-gradient-crimson">Systems &amp; Work</span>
              </h2>
              <p className="work-subtitle">
                Production-grade applications spanning ML demand forecasting, client enterprise platforms, full-stack portals, and computer vision prototypes.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="work-category-filters" role="tablist" aria-label="Filter projects by category">
              <div className="filter-pill-label">
                <Filter size={11} />
                <span>FILTER</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-filter-btn ${activeCategory === cat ? 'category-filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={activeCategory === cat}
                >
                  {cat === 'All' ? `All (${projects.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Quick-Navigation Rail */}
          <nav className="work-quick-nav" aria-label="Quick jump to project">
            <div className="quick-nav-track">
              {filteredProjects.map((p, idx) => (
                <a
                  key={p.id}
                  href={`#project-${p.id}`}
                  className={`quick-nav-item ${activeProjectId === p.id ? 'quick-nav-item--active' : ''}`}
                  onClick={(e) => scrollToProject(e, p.id)}
                >
                  <span className="quick-nav-num">0{idx + 1}</span>
                  <span className="quick-nav-name">{p.name}</span>
                  {activeProjectId === p.id && <span className="quick-nav-indicator" />}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* ── Editorial Case Study Stream ── */}
        <div className="projects-showcase-stream">
          {filteredProjects.map((project, index) => {
            const projectNum = String(index + 1).padStart(2, '0');
            const totalNum = String(filteredProjects.length).padStart(2, '0');
            const isActive = activeProjectId === project.id;

            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                data-project-id={project.id}
                className={`showcase-card ${isActive ? 'showcase-card--active' : ''}`}
                style={{ '--project-theme': project.color }}
                ref={(el) => (projectRefs.current[project.id] = el)}
              >
                {/* Active Highlight Bar */}
                <div className="showcase-card__glow-bar" />

                <div className="showcase-card__layout">
                  {/* ── Column A: Editorial Information ── */}
                  <div className="showcase-card__info-pane">
                    
                    {/* Index, Category & Live Status */}
                    <div className="project-meta-row">
                      <span className="project-index-badge">{projectNum} // {totalNum}</span>
                      <span className="project-category-pill">{project.category}</span>
                      <span className="project-status-pill">
                        <span className="status-live-dot" />
                        {project.status}
                      </span>
                    </div>

                    {/* Title & Role */}
                    <div className="project-title-group">
                      <h3 className="project-display-title">{project.name}</h3>
                      <p className="project-role-badge">{project.role}</p>
                    </div>

                    {/* Editorial Description */}
                    <p className="project-description-text">
                      {project.description}
                    </p>

                    {/* Challenge & Solution Summary */}
                    <div className="project-insights-card">
                      <div className="insight-row">
                        <span className="insight-label">CHALLENGE:</span>
                        <p className="insight-text">{project.problem}</p>
                      </div>
                      <div className="insight-row">
                        <span className="insight-label">OUTCOME:</span>
                        <p className="insight-text">{project.result}</p>
                      </div>
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="project-tech-matrix">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>

                    {/* Action Triggers */}
                    <div className="project-actions-strip">
                      <button
                        className="project-action-btn project-action-btn--primary"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`Open interactive case study for ${project.name}`}
                      >
                        <Info size={14} />
                        <span>VIEW CASE STUDY</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-btn project-action-btn--ghost"
                        >
                          <span>VISIT LIVE</span>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-btn project-action-btn--ghost"
                        >
                          <GithubIcon size={14} />
                          <span>SOURCE CODE</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── Column B: Visual Engineering Stage ── */}
                  {renderVisualStage(project)}
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Project Specs & Simulator Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

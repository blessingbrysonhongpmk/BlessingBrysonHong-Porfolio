import { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
  FlaskConical,
  LayoutGrid,
  Video,
  Calendar,
  Tag,
  Target,
  AlertTriangle,
  Lightbulb,
  Award,
} from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { SmartCanteenSimulator } from '../ui/SmartCanteenSimulator';
import { IndustrialEstimator } from '../ui/IndustrialEstimator';
import { AluminiumCustomizer } from '../ui/AluminiumCustomizer';
import { CampusSafetySimulator } from '../ui/CampusSafetySimulator';
import './ProjectDetailModal.css';

export function ProjectDetailModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('case-study'); // 'case-study' | 'simulator' | 'video'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="detail-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <header className="detail-modal-header">
          <div className="detail-modal-meta">
            <span className="meta-pill meta-pill--year">
              <Calendar size={11} />
              <span>{project.year || '2026'}</span>
            </span>
            <span className="meta-pill meta-pill--cat">
              <Tag size={11} />
              <span>{project.category}</span>
            </span>
            <span className="meta-pill meta-pill--status">
              <span className="status-dot-pulse" />
              <span>{project.status}</span>
            </span>
          </div>

          <div className="detail-modal-tabs">
            <button
              className={`tab-btn ${activeTab === 'case-study' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('case-study')}
            >
              <LayoutGrid size={13} />
              <span>Case Study</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'simulator' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('simulator')}
            >
              <FlaskConical size={13} />
              <span>Live Simulator</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'video' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <Video size={13} />
              <span>Video Demo</span>
            </button>
          </div>

          <button className="detail-modal-close" onClick={onClose} aria-label="Close Case Study">
            <X size={18} />
          </button>
        </header>

        {/* Modal Scrollable Body */}
        <div className="detail-modal-body">
          {/* Headline & Summary */}
          <div className="case-study-hero">
            <h2 id="modal-title" className="case-study-title">
              {project.name}
            </h2>
            <p className="case-study-tagline">
              {project.tagline || project.description}
            </p>

            {/* Direct Action Links */}
            <div className="case-study-links-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-btn case-study-btn--primary"
                >
                  <span>VISIT LIVE DEMO</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-btn case-study-btn--ghost"
                >
                  <GithubIcon size={14} />
                  <span>SOURCE CODE (GITHUB)</span>
                </a>
              )}
            </div>
          </div>

          {/* TAB 1: Complete Case Study Narrative */}
          {activeTab === 'case-study' && (
            <div className="case-study-content">
              {/* Problem & Goal Grid */}
              <section className="case-study-grid-2">
                <div className="case-card case-card--problem">
                  <div className="case-card-header">
                    <AlertTriangle size={15} className="text-primary" />
                    <h3>The Problem</h3>
                  </div>
                  <p>{project.problem}</p>
                </div>

                <div className="case-card case-card--goal">
                  <div className="case-card-header">
                    <Target size={15} className="text-accent" />
                    <h3>Intended Goal</h3>
                  </div>
                  <p>{project.goal || project.result}</p>
                </div>
              </section>

              {/* Solution & Engineering Contributions */}
              <section className="case-card case-card--solution">
                <div className="case-card-header">
                  <Lightbulb size={16} className="text-secondary" />
                  <h3>Engineered Solution</h3>
                </div>
                <p className="lead-p">{project.solution || project.approach}</p>
                <div className="role-callout">
                  <strong>My Role &amp; Contribution:</strong> {project.contribution || project.role}
                </div>
              </section>

              {/* Architecture & Flow */}
              {project.architecture && (
                <section className="case-card case-card--architecture">
                  <div className="case-card-header">
                    <Cpu size={16} className="text-primary" />
                    <h3>System Architecture &amp; Data Flow</h3>
                  </div>
                  <div className="architecture-diagram-box">
                    <code>{project.architecture}</code>
                  </div>
                </section>
              )}

              {/* Technology Stack Matrix */}
              <section className="case-card">
                <div className="case-card-header">
                  <Layers size={16} className="text-secondary" />
                  <h3>Technology Stack</h3>
                </div>
                <div className="tech-pills-wrap">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge-capsule">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Key Features */}
              {project.keyFeatures && (
                <section className="case-card">
                  <div className="case-card-header">
                    <ShieldCheck size={16} className="text-accent" />
                    <h3>Key Features</h3>
                  </div>
                  <ul className="features-list">
                    {project.keyFeatures.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={13} className="text-accent" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Challenges & Implementation */}
              {(project.challenges || project.implementation) && (
                <section className="case-study-grid-2">
                  {project.challenges && (
                    <div className="case-card">
                      <div className="case-card-header">
                        <AlertTriangle size={14} className="text-primary" />
                        <h3>Engineering Challenges</h3>
                      </div>
                      <p>{project.challenges}</p>
                    </div>
                  )}

                  {project.implementation && (
                    <div className="case-card">
                      <div className="case-card-header">
                        <Cpu size={14} className="text-secondary" />
                        <h3>Implementation Mechanics</h3>
                      </div>
                      <p>{project.implementation}</p>
                    </div>
                  )}
                </section>
              )}

              {/* Outcome & Learnings */}
              <section className="case-study-grid-2">
                <div className="case-card case-card--outcome">
                  <div className="case-card-header">
                    <Award size={15} className="text-accent" />
                    <h3>Measured Outcome</h3>
                  </div>
                  <p>{project.result}</p>
                </div>

                {project.learnings && (
                  <div className="case-card case-card--learnings">
                    <div className="case-card-header">
                      <Lightbulb size={15} className="text-secondary" />
                      <h3>Key Learnings</h3>
                    </div>
                    <p>{project.learnings}</p>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TAB 2: Live Interactive Simulator */}
          {activeTab === 'simulator' && (
            <div className="simulator-tab-pane">
              {project.id === 'smart-canteen-ai' && <SmartCanteenSimulator />}
              {project.id === 'devi-devan-industries' && <IndustrialEstimator />}
              {project.id === 'aluminium-fabrication' && <AluminiumCustomizer />}
              {project.id === 'campus-safety-ai' && <CampusSafetySimulator />}
            </div>
          )}

          {/* TAB 3: Video Demo */}
          {activeTab === 'video' && (
            <div className="video-tab-pane">
              <div className="video-wrapper">
                <iframe
                  src={project.videoUrl}
                  title={project.videoTitle || project.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                />
              </div>
              <div className="video-meta">
                <h4>{project.videoTitle}</h4>
                <p>{project.videoDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

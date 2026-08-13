import { useState, useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, ShieldCheck, FlaskConical, LayoutGrid, Video, Play } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { SmartCanteenSimulator } from './SmartCanteenSimulator';
import { IndustrialEstimator } from './IndustrialEstimator';
import { AluminiumCustomizer } from './AluminiumCustomizer';
import { CampusSafetySimulator } from './CampusSafetySimulator';
import './ProjectModal.css';

export function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'video' | 'simulator'

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
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-category-tag">
            <span className="cat-dot" style={{ backgroundColor: project.color || '#DC143C' }} />
            <span>{project.category}</span>
          </div>

          <div className="modal-header-tabs">
            <button
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <LayoutGrid size={12} />
              <span>Overview</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <Video size={12} />
              <span>Video Demo</span>
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
              onClick={() => setActiveTab('simulator')}
            >
              <FlaskConical size={12} />
              <span>Live Simulator</span>
            </button>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Project Detail">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="modal-title" className="modal-project-title">
            {project.name}
          </h2>

          {activeTab === 'overview' ? (
            <>
              <p className="modal-lead-description">
                {project.description}
              </p>

              {/* Structured Detail Grid */}
              <div className="modal-sections-grid">
                <div className="modal-section-box">
                  <div className="box-title">
                    <ShieldCheck size={14} className="box-icon" />
                    <span>PROBLEM STATEMENT</span>
                  </div>
                  <p className="box-text">{project.problem || project.description}</p>
                </div>

                <div className="modal-section-box">
                  <div className="box-title">
                    <Cpu size={14} className="box-icon" />
                    <span>ENGINEERING APPROACH</span>
                  </div>
                  <p className="box-text">{project.approach || 'Built with modular architecture and clean data processing flows.'}</p>
                </div>

                <div className="modal-section-box">
                  <div className="box-title">
                    <Layers size={14} className="box-icon" />
                    <span>MY CONTRIBUTION</span>
                  </div>
                  <p className="box-text">{project.contribution || 'Full architecture design, implementation, testing, and deployment.'}</p>
                </div>

                <div className="modal-section-box">
                  <div className="box-title">
                    <CheckCircle2 size={14} className="box-icon" />
                    <span>OUTCOME &amp; RESULT</span>
                  </div>
                  <p className="box-text">{project.result || 'Successfully built and validated for production.'}</p>
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div className="modal-tech-block">
                <span className="tech-label">TECHNOLOGY STACK:</span>
                <div className="tech-tags-list">
                  {(project.technologies || []).map((tech) => (
                    <span key={tech} className="modal-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : activeTab === 'video' ? (
            <div className="modal-video-container">
              <div className="video-player-frame">
                {project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    title={project.videoTitle || project.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="modal-video-iframe"
                  />
                ) : (
                  <div className="video-placeholder">
                    <Video size={48} className="placeholder-icon" />
                    <p>System Video Demonstration Stream Active</p>
                  </div>
                )}
              </div>
              <div className="video-details-box">
                <h4>🎬 {project.videoTitle || `${project.name} Video Walkthrough`}</h4>
                <p>{project.videoDescription || 'Technical demonstration video showing system architecture, workflow execution, and interactive performance metrics.'}</p>
              </div>
            </div>
          ) : (
            <div className="modal-simulator-wrapper">
              {project.id === 'smart-canteen-ai' && <SmartCanteenSimulator />}
              {project.id === 'devi-devan-industries' && <IndustrialEstimator />}
              {project.id === 'aluminium-fabrication' && <AluminiumCustomizer />}
              {project.id === 'campus-safety-ai' && <CampusSafetySimulator />}
            </div>
          )}
        </div>

        {/* Modal Footer Links */}
        <div className="modal-footer">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn modal-link-btn--primary"
            >
              <span>VISIT LIVE PROJECT</span>
              <ExternalLink size={14} />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn modal-link-btn--outline"
            >
              <span>VIEW SOURCE CODE</span>
              <GithubIcon size={14} />
            </a>
          )}

          {!project.liveUrl && !project.githubUrl && (
            <span className="modal-private-repo-tag">
              INTERNAL ACADEMIC / INDUSTRIAL REPOSITORY
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

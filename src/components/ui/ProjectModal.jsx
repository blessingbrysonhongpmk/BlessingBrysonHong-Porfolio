import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import './ProjectModal.css';

export function ProjectModal({ project, onClose }) {
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

          <button className="modal-close-btn" onClick={onClose} aria-label="Close Project Detail">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="modal-title" className="modal-project-title">
            {project.name}
          </h2>

          <p className="modal-lead-description">
            {project.description}
          </p>

          {/* Structured Detail Grid */}
          <div className="modal-sections-grid">
            
            {/* Problem Statement */}
            <div className="modal-section-box">
              <div className="box-title">
                <ShieldCheck size={14} className="box-icon" />
                <span>PROBLEM STATEMENT</span>
              </div>
              <p className="box-text">{project.problem || project.description}</p>
            </div>

            {/* Engineering Approach */}
            <div className="modal-section-box">
              <div className="box-title">
                <Cpu size={14} className="box-icon" />
                <span>ENGINEERING APPROACH</span>
              </div>
              <p className="box-text">{project.approach || 'Built with modular architecture and clean data processing flows.'}</p>
            </div>

            {/* My Contribution */}
            <div className="modal-section-box">
              <div className="box-title">
                <Layers size={14} className="box-icon" />
                <span>MY CONTRIBUTION</span>
              </div>
              <p className="box-text">{project.contribution || 'Full architecture design, implementation, testing, and deployment.'}</p>
            </div>

            {/* Outcome & Impact */}
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

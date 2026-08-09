import React from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { Button } from './Button';
import './ProjectCard.css';

export function ProjectCard({ project }) {
  const { name, status, role, technologies, description, liveUrl, githubUrl, isFlagship } = project;

  return (
    <div className={`project-card ${isFlagship ? 'flagship' : ''}`}>
      <div className="project-card-header">
        <h3 className="project-name">{name}</h3>
        <span className="project-status">{status}</span>
      </div>
      
      <p className="project-role">{role}</p>
      <p className="project-description">{description}</p>
      
      <div className="project-tech">
        {technologies.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>

      <div className="project-actions">
        {liveUrl && (
          <Button href={liveUrl} target="_blank" rel="noopener noreferrer" variant="primary">
            Visit Live Website <ExternalLink size={16} />
          </Button>
        )}
        {githubUrl && (
          <Button href={githubUrl} target="_blank" rel="noopener noreferrer" variant="outline">
            View on GitHub <Code size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { ProjectEditorModal } from './ProjectEditorModal';
import { Plus, Edit3, Trash2, Search, ExternalLink } from 'lucide-react';

export function AdminProjects() {
  const { draftContent, updateProject, addProject, deleteProject } = usePortfolioContent();
  const projects = draftContent.projects || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const categories = ['ALL', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'ALL' || project.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSaveProject = (projectData) => {
    if (isCreating) {
      addProject(projectData);
      setIsCreating(false);
    } else {
      updateProject(projectData.id, projectData);
      setEditingProject(null);
    }
  };

  const handleDelete = (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.name}" from your portfolio?`)) {
      deleteProject(project.id);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Portfolio Projects</h2>
          <p className="admin-page-header__desc">
            Manage your {projects.length} real projects shown on the public site. Click &quot;Edit&quot; to modify descriptions, tech stacks, links, and case study narrative.
          </p>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={() => setIsCreating(true)}
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Search & Filter Strip */}
      <div className="admin-card" style={{ padding: '14px 20px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
            <Search size={16} color="#64748b" />
            <input
              type="text"
              placeholder="Search by project name, tech, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
              style={{ padding: '8px 12px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>FILTER:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`admin-btn ${selectedCategory === cat ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div>
        {filteredProjects.length === 0 ? (
          <div className="admin-card" style={{ textAlign: 'center', padding: '48px 24px', color: '#64748b' }}>
            <p>No projects found matching your search.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <div key={project.id} className="admin-project-item">
              <div className="admin-project-item__info">
                <div className="admin-project-item__title">
                  <span style={{ color: project.color || '#FF3B5C', fontSize: '0.9rem' }}>0{index + 1}.</span>
                  <span>{project.name}</span>
                  {project.isFlagship && (
                    <span className="admin-pill" style={{ background: 'rgba(255,59,92,0.15)', color: '#FF5472', border: '1px solid rgba(255,59,92,0.3)' }}>
                      ★ Flagship
                    </span>
                  )}
                </div>

                <div className="admin-project-item__tagline">
                  {project.oneLiner || project.tagline || project.description}
                </div>

                <div className="admin-project-item__meta">
                  <span className="admin-pill admin-pill--cat">{project.category}</span>
                  <span className="admin-pill admin-pill--status">{project.status}</span>
                  <span className="admin-pill">{project.year || '2026'}</span>
                  {project.technologies && project.technologies.length > 0 && (
                    <span className="admin-pill" style={{ color: '#94a3b8' }}>
                      {project.technologies.slice(0, 4).join(', ')}{project.technologies.length > 4 ? ` +${project.technologies.length - 4}` : ''}
                    </span>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-pill"
                      style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => setEditingProject(project)}
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  style={{ color: '#ef4444' }}
                  onClick={() => handleDelete(project)}
                  title="Delete Project"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Editor Modal */}
      {(editingProject || isCreating) && (
        <ProjectEditorModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setEditingProject(null);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
}

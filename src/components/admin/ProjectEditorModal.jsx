import { useState } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';

export function ProjectEditorModal({ project, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: project?.id || `project-${Date.now()}`,
    name: project?.name || '',
    tagline: project?.tagline || '',
    oneLiner: project?.oneLiner || '',
    year: project?.year || '2026',
    category: project?.category || 'Web Development',
    status: project?.status || 'Complete',
    statusLabel: project?.statusLabel || '',
    role: project?.role || '',
    color: project?.color || '#10B981',
    isFlagship: Boolean(project?.isFlagship),
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    videoUrl: project?.videoUrl || '',
    videoTitle: project?.videoTitle || '',
    videoDescription: project?.videoDescription || '',
    image: project?.image || '',
    description: project?.description || '',
    problem: project?.problem || '',
    goal: project?.goal || '',
    solution: project?.solution || '',
    contribution: project?.contribution || '',
    architecture: project?.architecture || '',
    challenges: project?.challenges || '',
    implementation: project?.implementation || '',
    result: project?.result || '',
    learnings: project?.learnings || '',
    technologies: Array.isArray(project?.technologies) ? [...project.technologies] : [],
    keyFeatures: Array.isArray(project?.keyFeatures) ? [...project.keyFeatures] : [],
  });

  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'narrative' | 'tech-features' | 'media'

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAddTech = () => {
    if (!newTech.trim()) return;
    if (!formData.technologies.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));
    }
    setNewTech('');
  };

  const handleRemoveTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, newFeature.trim()],
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Project Name is required');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <h3 className="admin-modal-header__title">
              {project ? `Edit: ${project.name}` : 'Create New Project'}
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Project ID: <code>{formData.id}</code>
            </span>
          </div>

          <button className="admin-btn admin-btn--ghost" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Tab navigation */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#090a10' }}>
          <button
            type="button"
            className={`admin-btn ${activeTab === 'general' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={() => setActiveTab('general')}
          >
            General &amp; Metadata
          </button>
          <button
            type="button"
            className={`admin-btn ${activeTab === 'narrative' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={() => setActiveTab('narrative')}
          >
            Case Study Narrative
          </button>
          <button
            type="button"
            className={`admin-btn ${activeTab === 'tech-features' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={() => setActiveTab('tech-features')}
          >
            Tech &amp; Features
          </button>
          <button
            type="button"
            className={`admin-btn ${activeTab === 'media' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
            onClick={() => setActiveTab('media')}
          >
            Links &amp; Demo Media
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div className="admin-modal-body">
            {/* TAB 1: General & Metadata */}
            {activeTab === 'general' && (
              <div>
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Project Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="admin-input"
                      placeholder="e.g. SMART CANTEEN AI"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                      className="admin-input"
                      placeholder="e.g. Data Science / ML, Client Production"
                    />
                  </div>
                </div>

                <div className="admin-grid-3">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => handleFieldChange('year', e.target.value)}
                      className="admin-input"
                      placeholder="2026"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <input
                      type="text"
                      value={formData.status}
                      onChange={(e) => handleFieldChange('status', e.target.value)}
                      className="admin-input"
                      placeholder="Complete, Live, Prototype"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Theme Color</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => handleFieldChange('color', e.target.value)}
                        style={{ background: 'none', border: 'none', width: '36px', height: '36px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => handleFieldChange('color', e.target.value)}
                        className="admin-input"
                        placeholder="#10B981"
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Role &amp; Contribution Label</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. ML Pipeline & Full-Stack Developer"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleFieldChange('tagline', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. ML-based food demand prediction & waste reduction system"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">One-Liner (Compact Card Description)</label>
                  <input
                    type="text"
                    value={formData.oneLiner}
                    onChange={(e) => handleFieldChange('oneLiner', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Machine learning demand forecasting to eliminate institutional food waste."
                  />
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
                  <input
                    type="checkbox"
                    id="isFlagship"
                    checked={formData.isFlagship}
                    onChange={(e) => handleFieldChange('isFlagship', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="isFlagship" style={{ fontSize: '0.85rem', color: '#f1f5f9', cursor: 'pointer' }}>
                    Mark as Flagship Project (Highlighted)
                  </label>
                </div>
              </div>
            )}

            {/* TAB 2: Case Study Narrative */}
            {activeTab === 'narrative' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Overview Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">The Problem</label>
                    <textarea
                      rows={3}
                      value={formData.problem}
                      onChange={(e) => handleFieldChange('problem', e.target.value)}
                      className="admin-textarea"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Intended Goal</label>
                    <textarea
                      rows={3}
                      value={formData.goal}
                      onChange={(e) => handleFieldChange('goal', e.target.value)}
                      className="admin-textarea"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Engineered Solution</label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => handleFieldChange('solution', e.target.value)}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">My Role &amp; Contribution</label>
                  <textarea
                    rows={3}
                    value={formData.contribution}
                    onChange={(e) => handleFieldChange('contribution', e.target.value)}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">System Architecture &amp; Data Flow</label>
                  <input
                    type="text"
                    value={formData.architecture}
                    onChange={(e) => handleFieldChange('architecture', e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Input → Processing → Model Inference → Output"
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Challenges Overcome</label>
                    <textarea
                      rows={3}
                      value={formData.challenges}
                      onChange={(e) => handleFieldChange('challenges', e.target.value)}
                      className="admin-textarea"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Implementation Mechanics</label>
                    <textarea
                      rows={3}
                      value={formData.implementation}
                      onChange={(e) => handleFieldChange('implementation', e.target.value)}
                      className="admin-textarea"
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Measured Result / Outcome</label>
                    <textarea
                      rows={3}
                      value={formData.result}
                      onChange={(e) => handleFieldChange('result', e.target.value)}
                      className="admin-textarea"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Key Engineering Learnings</label>
                    <textarea
                      rows={3}
                      value={formData.learnings}
                      onChange={(e) => handleFieldChange('learnings', e.target.value)}
                      className="admin-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Tech & Features */}
            {activeTab === 'tech-features' && (
              <div>
                {/* Tech Stack */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Technologies ({formData.technologies.length})</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech();
                        }
                      }}
                      className="admin-input"
                      placeholder="Add technology (e.g. PyTorch, React, Vite) and press Enter"
                    />
                    <button type="button" onClick={handleAddTech} className="admin-btn admin-btn--ghost">
                      <Plus size={16} />
                      Add
                    </button>
                  </div>

                  <div className="admin-chips-wrap">
                    {formData.technologies.map((tech, i) => (
                      <span key={i} className="admin-chip">
                        <span>{tech}</span>
                        <button type="button" onClick={() => handleRemoveTech(i)} className="admin-chip__remove">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="admin-form-group" style={{ marginTop: '28px' }}>
                  <label className="admin-form-label">Key Features ({formData.keyFeatures.length})</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                      className="admin-input"
                      placeholder="Add feature bullet point..."
                    />
                    <button type="button" onClick={handleAddFeature} className="admin-btn admin-btn--ghost">
                      <Plus size={16} />
                      Add
                    </button>
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          background: '#090b10',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>• {feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(i)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Links & Media */}
            {activeTab === 'media' && (
              <div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Live Production URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
                    className="admin-input"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                    className="admin-input"
                    placeholder="https://github.com/blessingbrysonhongpmk/repo"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Video Demo URL (Embed / YouTube)</label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
                    className="admin-input"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Video Title</label>
                    <input
                      type="text"
                      value={formData.videoTitle}
                      onChange={(e) => handleFieldChange('videoTitle', e.target.value)}
                      className="admin-input"
                      placeholder="Demo Title"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Video Description</label>
                    <input
                      type="text"
                      value={formData.videoDescription}
                      onChange={(e) => handleFieldChange('videoDescription', e.target.value)}
                      className="admin-input"
                      placeholder="Walkthrough description"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Project Image / Thumbnail URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => handleFieldChange('image', e.target.value)}
                    className="admin-input"
                    placeholder="/project-thumbnail.png"
                  />
                  <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                    Leave empty if no thumbnail is needed.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn--success">
              <Check size={16} />
              Save Project to Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

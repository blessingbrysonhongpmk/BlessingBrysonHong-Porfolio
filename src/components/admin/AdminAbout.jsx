import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2, X, Save, CheckCircle2 } from 'lucide-react';

export function AdminAbout() {
  const { draftContent, updateDraft, publishContent, isDirty } = usePortfolioContent();
  const about = draftContent.aboutPreview || {};
  const profile = draftContent.profile || {};

  const [newTag, setNewTag] = useState('');

  const handleFieldChange = (field, val) => {
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const handleProfileChange = (field, val) => {
    updateDraft('profile', (prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const handleSave = async () => {
    await publishContent();
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    const currentTags = about.tags || [];
    if (!currentTags.includes(newTag.trim())) {
      updateDraft('aboutPreview', (prev) => ({
        ...prev,
        tags: [...currentTags, newTag.trim()],
      }));
    }
    setNewTag('');
  };

  const handleRemoveTag = (index) => {
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((_, i) => i !== index),
    }));
  };

  const handleUpdateFocus = (index, field, val) => {
    const list = [...(about.developmentFocus || [])];
    list[index] = { ...list[index], [field]: val };
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      developmentFocus: list,
    }));
  };

  const handleAddFocus = () => {
    const list = [...(about.developmentFocus || []), { title: 'New Focus Area', desc: 'Description of development focus' }];
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      developmentFocus: list,
    }));
  };

  const handleRemoveFocus = (index) => {
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      developmentFocus: (prev.developmentFocus || []).filter((_, i) => i !== index),
    }));
  };

  const handleUpdatePrinciple = (index, field, val) => {
    const list = [...(about.engineeringPrinciples || [])];
    list[index] = { ...list[index], [field]: val };
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      engineeringPrinciples: list,
    }));
  };

  const handleAddPrinciple = () => {
    const list = [...(about.engineeringPrinciples || []), { title: 'New Principle', desc: 'Description of engineering principle' }];
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      engineeringPrinciples: list,
    }));
  };

  const handleRemovePrinciple = (index) => {
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      engineeringPrinciples: (prev.engineeringPrinciples || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">About &amp; Philosophy</h2>
          <p className="admin-page-header__desc">
            Edit your statement, introduction, education card, core principles, and focus areas.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className={`admin-btn ${isDirty ? 'admin-btn--success' : 'admin-btn--primary'}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {isDirty ? <Save size={15} /> : <CheckCircle2 size={15} />}
          <span>{isDirty ? 'Save & Publish Live' : 'Saved Live'}</span>
        </button>
      </div>

      {/* Main Narrative & Statement */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Main About Statement &amp; Introduction</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Large Headline Statement</label>
          <textarea
            rows={2}
            value={about.statement || ''}
            onChange={(e) => handleFieldChange('statement', e.target.value)}
            className="admin-textarea"
            placeholder="e.g. I’m a third-year B.Tech Artificial Intelligence & Data Science student at St. Xavier's Catholic College of Engineering."
          />
          <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            Large highlighted heading at the top of the About card.
          </span>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Introduction Paragraph</label>
          <textarea
            rows={3}
            value={(about.paragraphs && about.paragraphs[0]) || ''}
            onChange={(e) => {
              const prev = about.paragraphs || [];
              const next = [e.target.value, ...prev.slice(1)];
              handleFieldChange('paragraphs', next);
            }}
            className="admin-textarea"
            placeholder="e.g. I’m currently working as an intern at Nex-X Spark, where I get to work on real-world software projects..."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Current Role / Status Pill</label>
          <input
            type="text"
            value={profile.currentDirection || ''}
            onChange={(e) => handleProfileChange('currentDirection', e.target.value)}
            className="admin-input"
            placeholder="e.g. Nex-X Spark — Intern"
          />
          <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            Displays in the CURRENTLY pill inside the About card.
          </span>
        </div>
      </div>

      {/* Verified Education Card */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Education Card</h3>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Degree Title</label>
            <input
              type="text"
              value={about.degree || profile.education || ''}
              onChange={(e) => handleFieldChange('degree', e.target.value)}
              className="admin-input"
              placeholder="e.g. B.Tech — Artificial Intelligence & Data Science"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Period / Academic Year</label>
            <input
              type="text"
              value={about.degreePeriod || ''}
              onChange={(e) => handleFieldChange('degreePeriod', e.target.value)}
              className="admin-input"
              placeholder="e.g. 2024 — 2028 · III Year (Current)"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">College / Institution</label>
          <input
            type="text"
            value={about.institution || profile.institution || ''}
            onChange={(e) => handleFieldChange('institution', e.target.value)}
            className="admin-input"
            placeholder="e.g. St. Xavier's Catholic College of Engineering (SXCCE)"
          />
        </div>
      </div>

      {/* Badges / Credential Tags */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Credential Tags &amp; Badges</h3>
        </div>

        <div className="admin-form-group">
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add badge tag (e.g. Full-Stack Architecture)..."
              className="admin-input"
            />
            <button type="button" onClick={handleAddTag} className="admin-btn admin-btn--ghost">
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="admin-chips-wrap">
            {(about.tags || []).map((tag, i) => (
              <span key={i} className="admin-chip">
                <span>{tag}</span>
                <button type="button" onClick={() => handleRemoveTag(i)} className="admin-chip__remove">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Development Focus */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Development Focus</h3>
          <button type="button" onClick={handleAddFocus} className="admin-btn admin-btn--ghost" style={{ fontSize: '0.78rem' }}>
            <Plus size={14} />
            Add Focus Item
          </button>
        </div>

        {(about.developmentFocus || []).map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f59e0b' }}>Focus #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleRemoveFocus(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                title="Remove focus item"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="admin-form-group" style={{ marginBottom: '8px' }}>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleUpdateFocus(idx, 'title', e.target.value)}
                placeholder="Title (e.g. Machine Learning Pipelines)"
                className="admin-input"
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <textarea
                rows={2}
                value={item.desc || ''}
                onChange={(e) => handleUpdateFocus(idx, 'desc', e.target.value)}
                placeholder="Description of this development focus"
                className="admin-textarea"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Principles */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Engineering Principles</h3>
          <button type="button" onClick={handleAddPrinciple} className="admin-btn admin-btn--ghost" style={{ fontSize: '0.78rem' }}>
            <Plus size={14} />
            Add Principle
          </button>
        </div>

        {(about.engineeringPrinciples || []).map((principle, idx) => (
          <div
            key={idx}
            style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#38bdf8' }}>Principle #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleRemovePrinciple(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                title="Remove principle"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="admin-form-group" style={{ marginBottom: '8px' }}>
              <input
                type="text"
                value={principle.title || ''}
                onChange={(e) => handleUpdatePrinciple(idx, 'title', e.target.value)}
                placeholder="Principle Title"
                className="admin-input"
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <textarea
                rows={2}
                value={principle.desc || ''}
                onChange={(e) => handleUpdatePrinciple(idx, 'desc', e.target.value)}
                placeholder="Principle Description"
                className="admin-textarea"
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleSave}
          className="admin-btn admin-btn--success"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', fontSize: '0.95rem' }}
        >
          <Save size={16} />
          <span>Save &amp; Publish About Changes</span>
        </button>
      </div>
    </div>
  );
}

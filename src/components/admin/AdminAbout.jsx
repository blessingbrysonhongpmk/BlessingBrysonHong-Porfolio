import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2, X } from 'lucide-react';

export function AdminAbout() {
  const { draftContent, updateDraft } = usePortfolioContent();
  const about = draftContent.aboutPreview || {};

  const [newTag, setNewTag] = useState('');

  const handleHeadingChange = (heading) => {
    updateDraft('aboutPreview', (prev) => ({
      ...prev,
      heading,
    }));
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
            Edit your editorial introduction, highlights, core engineering principles, and focus areas.
          </p>
        </div>
      </div>

      {/* About Section Heading & Tags */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">About Preview Section</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Editorial Heading</label>
          <textarea
            rows={2}
            value={about.heading || ''}
            onChange={(e) => handleHeadingChange(e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Badges / Credential Tags</label>
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
              background: '#090b10',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f87171' }}>Focus Area {idx + 1}</span>
              <button
                type="button"
                onClick={() => handleRemoveFocus(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="admin-grid-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdateFocus(idx, 'title', e.target.value)}
                className="admin-input"
                placeholder="Title (e.g. Intelligent Model Serving)"
              />
              <input
                type="text"
                value={item.desc}
                onChange={(e) => handleUpdateFocus(idx, 'desc', e.target.value)}
                className="admin-input"
                placeholder="Description of focus area"
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

        {(about.engineeringPrinciples || []).map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#090b10',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>Principle {idx + 1}</span>
              <button
                type="button"
                onClick={() => handleRemovePrinciple(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="admin-grid-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdatePrinciple(idx, 'title', e.target.value)}
                className="admin-input"
                placeholder="Title (e.g. Small Surface, Deep Content)"
              />
              <input
                type="text"
                value={item.desc}
                onChange={(e) => handleUpdatePrinciple(idx, 'desc', e.target.value)}
                className="admin-input"
                placeholder="Description of engineering principle"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

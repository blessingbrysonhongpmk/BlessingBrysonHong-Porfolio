import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';

export function AdminAchievements() {
  const { draftContent, updateDraft, showToast } = usePortfolioContent();
  const achievements = draftContent.achievements || [];

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Client Production',
    event: '',
    year: '2026',
    result: '100% Deployed & Live',
    role: '',
    description: '',
    keyHighlights: '',
    link: '',
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Extract unique categories
  const categories = Array.from(new Set(achievements.map((a) => a.category).filter(Boolean)));

  const handleEdit = (item) => {
    setEditingId(item.id);
    setIsAddingNew(false);
    setFormData({
      title: item.title || '',
      category: item.category || categories[0] || 'General',
      event: item.event || '',
      year: item.year || '2026',
      result: item.result || '',
      role: item.role || '',
      description: item.description || '',
      keyHighlights: (item.keyHighlights || []).join('\n'),
      link: item.link || '',
    });
  };

  const handleStartAdd = () => {
    setIsAddingNew(true);
    setEditingId(null);
    setFormData({
      title: '',
      category: categories[0] || 'Client Production',
      event: '',
      year: '2026',
      result: '',
      role: '',
      description: '',
      keyHighlights: '',
      link: '',
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    const cleanHighlights = formData.keyHighlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    if (isAddingNew) {
      const newId = `ach-${Date.now()}`;
      const newItem = {
        ...formData,
        id: newId,
        keyHighlights: cleanHighlights,
      };
      updateDraft('achievements', [...achievements, newItem]);
      showToast('Achievement added to draft', 'success');
      setIsAddingNew(false);
    } else if (editingId) {
      const updated = achievements.map((item) => {
        if (item.id !== editingId) return item;
        return {
          ...item,
          ...formData,
          keyHighlights: cleanHighlights,
        };
      });
      updateDraft('achievements', updated);
      showToast('Achievement updated in draft', 'success');
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this achievement from draft?')) {
      const updated = achievements.filter((item) => item.id !== id);
      updateDraft('achievements', updated);
      showToast('Achievement removed', 'info');
      if (editingId === id) setEditingId(null);
    }
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;
    const list = [...achievements];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    updateDraft('achievements', list);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const cleanCat = newCategoryName.trim();
    if (!cleanCat) return;
    setFormData((prev) => ({ ...prev, category: cleanCat }));
    setNewCategoryName('');
    showToast(`New category '${cleanCat}' ready to use`, 'info');
  };

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2 className="admin-section__title">Achievements & Milestones</h2>
          <p className="admin-section__desc">
            Manage verified client delivery, research presentations, prototypes, and engineering credentials.
          </p>
        </div>

        {!isAddingNew && !editingId && (
          <button type="button" className="admin-btn admin-btn--primary" onClick={handleStartAdd}>
            <Plus size={15} />
            <span>Add Achievement</span>
          </button>
        )}
      </div>

      {/* ── Editor Form (When Adding or Editing) ── */}
      {(isAddingNew || editingId) && (
        <form className="admin-card" onSubmit={handleSave} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f5f5f7' }}>
              {isAddingNew ? 'Add New Achievement' : 'Edit Achievement'}
            </h3>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={() => {
                setIsAddingNew(false);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div className="admin-field">
              <label className="admin-field__label">Achievement Title *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Commercial Enterprise Client Delivery"
                required
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Category *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  className="admin-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Event / Context *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.event}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                placeholder="e.g. Devi Devan Industries — Production Launch"
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Year</label>
              <input
                type="text"
                className="admin-input"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Result / Outcome *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                placeholder="e.g. 100% Deployed & Live / Presenter"
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label">Role</label>
              <input
                type="text"
                className="admin-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Sole Full-Stack Developer"
              />
            </div>
          </div>

          <div className="admin-field" style={{ marginBottom: '16px' }}>
            <label className="admin-field__label">Detailed Description</label>
            <textarea
              className="admin-textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Comprehensive description of the achievement, impact, and verification..."
            />
          </div>

          <div className="admin-field" style={{ marginBottom: '16px' }}>
            <label className="admin-field__label">Key Highlights (one per line)</label>
            <textarea
              className="admin-textarea"
              rows={3}
              value={formData.keyHighlights}
              onChange={(e) => setFormData({ ...formData, keyHighlights: e.target.value })}
              placeholder="Shipped live production platform to custom domain&#10;Built automated quotation flows"
            />
          </div>

          <div className="admin-field" style={{ marginBottom: '16px' }}>
            <label className="admin-field__label">Proof / Live Deployment URL (Optional)</label>
            <input
              type="url"
              className="admin-input"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://devidevanindustries.com"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="admin-btn admin-btn--primary">
              <CheckCircle2 size={15} />
              <span>{isAddingNew ? 'Add to Draft' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── Add Custom Category Input ── */}
      <form onSubmit={handleAddCategory} className="admin-card" style={{ marginBottom: '20px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>Create New Category:</span>
        <input
          type="text"
          className="admin-input"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="e.g. Hackathons, Awards, Seminars"
          style={{ maxWidth: '320px' }}
        />
        <button type="submit" className="admin-btn admin-btn--ghost">
          <Plus size={14} />
          <span>Add Category</span>
        </button>
      </form>

      {/* ── List of Current Achievements ── */}
      <div className="admin-list">
        {achievements.map((item, index) => (
          <div key={item.id || index} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  style={{ padding: '2px 4px' }}
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  style={{ padding: '2px 4px' }}
                  onClick={() => handleMove(index, 1)}
                  disabled={index === achievements.length - 1}
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#e11d48', padding: '2px 6px', background: 'rgba(225,29,72,0.1)', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.year}</span>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>• {item.result}</span>
                </div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#f5f5f7', fontWeight: 600 }}>{item.title}</h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.event}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => handleEdit(item)}
                title="Edit achievement"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                style={{ color: '#ef4444' }}
                onClick={() => handleDelete(item.id)}
                title="Delete achievement"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

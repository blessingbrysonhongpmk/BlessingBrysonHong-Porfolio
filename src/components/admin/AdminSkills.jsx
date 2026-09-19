import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';

export function AdminSkills() {
  const { draftContent, updateDraft, isValidSkillName, showToast } = usePortfolioContent();
  const skillCategories = draftContent.skillCategories || [];
  const domainPreviews = draftContent.domainPreviews || [];

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillStatus, setNewSkillStatus] = useState('Working Knowledge');
  const [newSkillDesc, setNewSkillDesc] = useState('');
  const [targetCategory, setTargetCategory] = useState(skillCategories[0]?.category || 'LANGUAGES');
  const [skillError, setSkillError] = useState('');

  // Domain preview changes
  const handleDomainChange = (index, field, val) => {
    const list = [...domainPreviews];
    list[index] = { ...list[index], [field]: val };
    updateDraft('domainPreviews', list);
  };

  // Skill item changes
  const handleSkillChange = (categoryName, skillIndex, field, val) => {
    if (field === 'name' && !isValidSkillName(val)) {
      setSkillError('Java, C#, and REST APIs are strictly prohibited in this portfolio.');
      return;
    }
    setSkillError('');

    const updatedCategories = skillCategories.map((cat) => {
      if (cat.category !== categoryName) return cat;
      const skills = [...cat.skills];
      skills[skillIndex] = { ...skills[skillIndex], [field]: val };
      return { ...cat, skills };
    });

    updateDraft('skillCategories', updatedCategories);
  };

  const handleRemoveSkill = (categoryName, skillIndex) => {
    const updatedCategories = skillCategories.map((cat) => {
      if (cat.category !== categoryName) return cat;
      return {
        ...cat,
        skills: cat.skills.filter((_, i) => i !== skillIndex),
      };
    });
    updateDraft('skillCategories', updatedCategories);
    showToast('Skill removed', 'info');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const cleanName = newSkillName.trim();
    if (!cleanName) return;

    if (!isValidSkillName(cleanName)) {
      setSkillError('Java, C#, and REST APIs are strictly prohibited in this portfolio.');
      return;
    }

    const updatedCategories = skillCategories.map((cat) => {
      if (cat.category !== targetCategory) return cat;
      return {
        ...cat,
        skills: [
          ...cat.skills,
          {
            name: cleanName,
            status: newSkillStatus,
            description: newSkillDesc.trim(),
          },
        ],
      };
    });

    updateDraft('skillCategories', updatedCategories);
    setNewSkillName('');
    setNewSkillDesc('');
    setSkillError('');
    showToast(`Added ${cleanName} to ${targetCategory}`, 'success');
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Skills &amp; Capabilities Matrix</h2>
          <p className="admin-page-header__desc">
            Manage your verified technologies, readiness ratings, and high-level domain previews.
          </p>
        </div>

        <div className="admin-status-pill admin-status-pill--synced">
          <ShieldCheck size={14} />
          <span>Java, C# &amp; REST APIs Excluded</span>
        </div>
      </div>

      {skillError && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} />
          <span>{skillError}</span>
        </div>
      )}

      {/* Add New Skill Form */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Add Technology / Skill</h3>
        </div>

        <form onSubmit={handleAddSkill}>
          <div className="admin-grid-3">
            <div className="admin-form-group">
              <label className="admin-form-label">Category</label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="admin-select"
              >
                {skillCategories.map((c) => (
                  <option key={c.category} value={c.category}>
                    {c.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Skill Name *</label>
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => {
                  setNewSkillName(e.target.value);
                  setSkillError('');
                }}
                className="admin-input"
                placeholder="e.g. Scikit-learn, Docker"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Proficiency Status</label>
              <select
                value={newSkillStatus}
                onChange={(e) => setNewSkillStatus(e.target.value)}
                className="admin-select"
              >
                <option value="Comfortable">Comfortable</option>
                <option value="Working Knowledge">Working Knowledge</option>
                <option value="Exploring">Exploring</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Skill Description</label>
            <input
              type="text"
              value={newSkillDesc}
              onChange={(e) => setNewSkillDesc(e.target.value)}
              className="admin-input"
              placeholder="e.g. Model training, hyperparameter tuning, metrics evaluation"
            />
          </div>

          <button type="submit" className="admin-btn admin-btn--primary">
            <Plus size={16} />
            <span>Add Skill to Matrix</span>
          </button>
        </form>
      </div>

      {/* Domain Previews (Homepage cards) */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">High-Level Domain Previews (5 Core Disciplines)</h3>
        </div>

        <div className="admin-grid-2">
          {domainPreviews.map((domain, idx) => (
            <div
              key={domain.id || idx}
              style={{
                background: '#090b10',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '14px',
              }}
            >
              <div className="admin-form-group" style={{ marginBottom: '10px' }}>
                <label className="admin-form-label">Domain Title</label>
                <input
                  type="text"
                  value={domain.title}
                  onChange={(e) => handleDomainChange(idx, 'title', e.target.value)}
                  className="admin-input"
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: '0' }}>
                <label className="admin-form-label">Summary</label>
                <input
                  type="text"
                  value={domain.summary}
                  onChange={(e) => handleDomainChange(idx, 'summary', e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Skills Deep Matrix */}
      {skillCategories.map((group) => (
        <div key={group.category} className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">{group.category} ({group.skills.length})</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {group.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                style={{
                  background: '#090b10',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(group.category, sIdx, 'name', e.target.value)}
                  className="admin-input"
                  style={{ width: '220px', fontWeight: 600 }}
                />

                <select
                  value={skill.status}
                  onChange={(e) => handleSkillChange(group.category, sIdx, 'status', e.target.value)}
                  className="admin-select"
                  style={{ width: '180px' }}
                >
                  <option value="Comfortable">Comfortable</option>
                  <option value="Working Knowledge">Working Knowledge</option>
                  <option value="Exploring">Exploring</option>
                </select>

                <input
                  type="text"
                  value={skill.description}
                  onChange={(e) => handleSkillChange(group.category, sIdx, 'description', e.target.value)}
                  className="admin-input"
                  style={{ flex: 1 }}
                  placeholder="Skill context &amp; usage description"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(group.category, sIdx)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                  title="Remove Skill"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

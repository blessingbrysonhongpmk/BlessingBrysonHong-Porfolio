import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2 } from 'lucide-react';

export function AdminSocials() {
  const { draftContent, updateDraft, showToast } = usePortfolioContent();
  const socials = draftContent.socials || [];

  const handleUpdateSocial = (index, field, val) => {
    const list = [...socials];
    list[index] = { ...list[index], [field]: val };
    updateDraft('socials', list);
  };

  const handleAddSocial = () => {
    const list = [
      ...socials,
      { platform: 'Twitter / X', url: 'https://x.com', icon: 'message-circle', label: '@handle' },
    ];
    updateDraft('socials', list);
    showToast('New social channel added', 'info');
  };

  const handleRemoveSocial = (index) => {
    const list = socials.filter((_, i) => i !== index);
    updateDraft('socials', list);
    showToast('Social channel removed', 'info');
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Social Links &amp; Channels</h2>
          <p className="admin-page-header__desc">
            Manage your verified social media endpoints, display handles, and profile links.
          </p>
        </div>

        <button type="button" onClick={handleAddSocial} className="admin-btn admin-btn--primary">
          <Plus size={16} />
          <span>Add Channel</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Configured Social Endpoints ({socials.length})</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {socials.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: '#090b10',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Channel {idx + 1}: {s.platform}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(idx)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  title="Remove channel"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group" style={{ marginBottom: '0' }}>
                  <label className="admin-form-label">Platform Name</label>
                  <input
                    type="text"
                    value={s.platform}
                    onChange={(e) => handleUpdateSocial(idx, 'platform', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: '0' }}>
                  <label className="admin-form-label">Profile URL</label>
                  <input
                    type="url"
                    value={s.url}
                    onChange={(e) => handleUpdateSocial(idx, 'url', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: '0' }}>
                  <label className="admin-form-label">Display Handle / Label</label>
                  <input
                    type="text"
                    value={s.label || ''}
                    onChange={(e) => handleUpdateSocial(idx, 'label', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { usePortfolioContent } from '../../context/PortfolioContext';
import { Zap, CheckCircle2, Save } from 'lucide-react';

export function AdminHero() {
  const { draftContent, updateDraft, publishContent, isDirty } = usePortfolioContent();
  const profile = draftContent.profile || {};

  const handleChange = (field, value) => {
    updateDraft('profile', prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await publishContent();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Hero Section</h2>
          <p className="admin-page-header__desc">
            Edit the big headline, quote, tagline, role, and details shown in the Hero section at the top of your portfolio.
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

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Main Headline &amp; Name</h3>
          <Zap size={16} style={{ color: '#f59e0b' }} />
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Display Name (Hero)</label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={e => handleChange('name', e.target.value)}
              className="admin-input"
              placeholder="e.g. Blessing Bryson Hong"
            />
            <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Shown as the animated title (first word bold, remaining words accented).
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Full Name / Alternate</label>
            <input
              type="text"
              value={profile.fullName || ''}
              onChange={e => handleChange('fullName', e.target.value)}
              className="admin-input"
              placeholder="e.g. P M K BLESSING BRYSON HONG"
            />
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Brand Monogram (Top-Left Badge)</label>
            <input
              type="text"
              value={profile.brand || ''}
              onChange={e => handleChange('brand', e.target.value)}
              className="admin-input"
              placeholder="e.g. BBH"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Initials / Monogram (e.g. P M K)</label>
            <input
              type="text"
              value={profile.monogram || ''}
              onChange={e => handleChange('monogram', e.target.value)}
              className="admin-input"
              placeholder="e.g. P M K"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Hero Role / Specialty Label</label>
          <input
            type="text"
            value={profile.heroRole || ''}
            onChange={e => handleChange('heroRole', e.target.value)}
            className="admin-input"
            placeholder="e.g. AI & DATA SCIENCE + FULL STACK DEVELOPER"
          />
          <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            The uppercase specialty badge shown below your name.
          </span>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Education / Academic Status</label>
          <input
            type="text"
            value={profile.education || ''}
            onChange={e => handleChange('education', e.target.value)}
            className="admin-input"
            placeholder="e.g. B.Tech AI & Data Science · III Year"
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Quote &amp; Statement</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Quote Text (displayed under name)</label>
          <input
            type="text"
            value={profile.quoteText || ''}
            onChange={e => handleChange('quoteText', e.target.value)}
            className="admin-input"
            placeholder="e.g. Commit your work to the Lord."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Quote Citation / Source</label>
          <input
            type="text"
            value={profile.quoteCite || ''}
            onChange={e => handleChange('quoteCite', e.target.value)}
            className="admin-input"
            placeholder="e.g. — Proverbs 16:3"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Hero Tagline / Statement</label>
          <input
            type="text"
            value={profile.heroStatement || ''}
            onChange={e => handleChange('heroStatement', e.target.value)}
            className="admin-input"
            placeholder="e.g. Building practical software with AI, data, and full-stack development."
          />
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Profile Image Path / URL</label>
            <input
              type="text"
              value={profile.avatar || ''}
              onChange={e => handleChange('avatar', e.target.value)}
              className="admin-input"
              placeholder="/profile.jpeg"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Availability Status</label>
            <input
              type="text"
              value={profile.availability || ''}
              onChange={e => handleChange('availability', e.target.value)}
              className="admin-input"
              placeholder="e.g. Open to Opportunities"
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Bio &amp; Summary</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Short Bio</label>
          <textarea
            rows={2}
            value={profile.shortBio || ''}
            onChange={e => handleChange('shortBio', e.target.value)}
            className="admin-textarea"
            placeholder="Short single-line bio."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Full Bio</label>
          <textarea
            rows={4}
            value={profile.fullBio || ''}
            onChange={e => handleChange('fullBio', e.target.value)}
            className="admin-textarea"
            placeholder="Your complete biography."
          />
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleSave}
          className="admin-btn admin-btn--success"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', fontSize: '0.95rem' }}
        >
          <Save size={16} />
          <span>Save &amp; Publish Hero Changes</span>
        </button>
      </div>
    </div>
  );
}

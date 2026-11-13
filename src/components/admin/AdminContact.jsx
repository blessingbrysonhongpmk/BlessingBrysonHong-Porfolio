import { usePortfolioContent } from '../../context/PortfolioContext';
import { Save, CheckCircle2 } from 'lucide-react';

export function AdminContact() {
  const { draftContent, updateDraft } = usePortfolioContent();
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
          <h2 className="admin-page-header__title">Contact Section</h2>
          <p className="admin-page-header__desc">
            Edit email, availability status, and contact information displayed in the Contact section and footer.
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
          <h3 className="admin-card__title">Contact Details</h3>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Primary Email Address</label>
            <input
              type="email"
              value={profile.email || ''}
              onChange={e => handleChange('email', e.target.value)}
              className="admin-input"
              placeholder="your@email.com"
            />
            <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Used in the Contact section and mailto links across the site.
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Location / City</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={e => handleChange('location', e.target.value)}
              className="admin-input"
              placeholder="e.g. Kanyakumari, Tamil Nadu, India"
            />
          </div>
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
          <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            Shown as a badge in the Contact section and Hero section.
          </span>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Academic &amp; Institution Info</h3>
        </div>
        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Academic Status</label>
            <input
              type="text"
              value={profile.education || ''}
              onChange={e => handleChange('education', e.target.value)}
              className="admin-input"
              placeholder="e.g. III YEAR — B.TECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Institution Name</label>
            <input
              type="text"
              value={profile.institution || ''}
              onChange={e => handleChange('institution', e.target.value)}
              className="admin-input"
              placeholder="e.g. St. Xavier's Catholic College of Engineering (SXCCE)"
            />
          </div>
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
          <span>Save &amp; Publish Contact Changes</span>
        </button>
      </div>
    </div>
  );
}

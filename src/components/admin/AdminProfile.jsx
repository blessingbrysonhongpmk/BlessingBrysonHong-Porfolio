import { usePortfolioContent } from '../../context/PortfolioContext';

export function AdminProfile() {
  const { draftContent, updateDraft } = usePortfolioContent();
  const profile = draftContent.profile || {};

  const handleChange = (field, value) => {
    updateDraft('profile', (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Site Profile &amp; Identity</h2>
          <p className="admin-page-header__desc">
            Edit your core personal branding, role, credentials, and hero statements across the site.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Primary Identity</h3>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Display Name</label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Full Legal Name</label>
            <input
              type="text"
              value={profile.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-form-label">Brand Monogram</label>
            <input
              type="text"
              value={profile.brand || ''}
              onChange={(e) => handleChange('brand', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Primary Email</label>
            <input
              type="email"
              value={profile.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Professional Role</label>
            <input
              type="text"
              value={profile.role || ''}
              onChange={(e) => handleChange('role', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Availability Status</label>
            <input
              type="text"
              value={profile.availability || ''}
              onChange={(e) => handleChange('availability', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Academic Status</label>
            <input
              type="text"
              value={profile.education || ''}
              onChange={(e) => handleChange('education', e.target.value)}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Institution</label>
            <input
              type="text"
              value={profile.institution || ''}
              onChange={(e) => handleChange('institution', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Avatar / Profile Image Path</label>
          <input
            type="text"
            value={profile.avatar || ''}
            onChange={(e) => handleChange('avatar', e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Editorial Statements &amp; Bio</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Hero Tagline Statement</label>
          <input
            type="text"
            value={profile.heroStatement || ''}
            onChange={(e) => handleChange('heroStatement', e.target.value)}
            className="admin-input"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Short Bio (Preview Sections)</label>
          <textarea
            rows={2}
            value={profile.shortBio || ''}
            onChange={(e) => handleChange('shortBio', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Full Bio (Deep Dossier Modal)</label>
          <textarea
            rows={4}
            value={profile.fullBio || ''}
            onChange={(e) => handleChange('fullBio', e.target.value)}
            className="admin-textarea"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Current Direction &amp; Goals</label>
          <textarea
            rows={3}
            value={profile.currentDirection || ''}
            onChange={(e) => handleChange('currentDirection', e.target.value)}
            className="admin-textarea"
          />
        </div>
      </div>
    </div>
  );
}

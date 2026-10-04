import { usePortfolioContent } from '../../context/PortfolioContext';
import { Zap } from 'lucide-react';

export function AdminHero() {
  const { draftContent, updateDraft } = usePortfolioContent();
  const profile = draftContent.profile || {};

  const handleChange = (field, value) => {
    updateDraft('profile', prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Hero Section</h2>
          <p className="admin-page-header__desc">
            Edit the big headline, tagline, role, and CTA text shown in the Hero section at the top of your portfolio.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Main Headline &amp; Role</h3>
          <Zap size={16} style={{ color: '#f59e0b' }} />
        </div>

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
            Shown as the large animated name in the hero section.
          </span>
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
            The uppercase specialty label shown below your name.
          </span>
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
          <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
            The one-liner statement shown in the hero section below the role.
          </span>
        </div>

        <div className="admin-grid-2">
          <div className="admin-form-group">
            <label className="admin-form-label">Professional Role (Short)</label>
            <input
              type="text"
              value={profile.role || ''}
              onChange={e => handleChange('role', e.target.value)}
              className="admin-input"
              placeholder="e.g. Software Developer"
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
          <h3 className="admin-card__title">Bio &amp; Description</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Short Bio (displayed in preview sections)</label>
          <textarea
            rows={2}
            value={profile.shortBio || ''}
            onChange={e => handleChange('shortBio', e.target.value)}
            className="admin-textarea"
            placeholder="Short single-line bio for preview cards and sections."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Full Bio (shown in About deep modal)</label>
          <textarea
            rows={5}
            value={profile.fullBio || ''}
            onChange={e => handleChange('fullBio', e.target.value)}
            className="admin-textarea"
            placeholder="Your complete biography shown in the About detail modal."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Current Direction &amp; Goals</label>
          <textarea
            rows={3}
            value={profile.currentDirection || ''}
            onChange={e => handleChange('currentDirection', e.target.value)}
            className="admin-textarea"
            placeholder="Describe your current focus, ongoing work, and future goals."
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Contact &amp; Location Info</h3>
        </div>
        <div className="admin-grid-3">
          <div className="admin-form-group">
            <label className="admin-form-label">Primary Email</label>
            <input
              type="email"
              value={profile.email || ''}
              onChange={e => handleChange('email', e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={e => handleChange('location', e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Brand Monogram (Navbar)</label>
            <input
              type="text"
              value={profile.brand || ''}
              onChange={e => handleChange('brand', e.target.value)}
              className="admin-input"
              placeholder="e.g. BBH"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

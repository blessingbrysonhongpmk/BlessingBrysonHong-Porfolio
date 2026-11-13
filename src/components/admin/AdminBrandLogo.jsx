import { useState, useRef } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import {
  Sparkles,
  Image as ImageIcon,
  Type,
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  Sun,
  Moon,
} from 'lucide-react';
import './AdminBrandLogo.css';

const POPULAR_GLYPHS = ['♔', '♚', '⚡', '★', '✦', '◈', '♠', '♛', '🚀', '💡', '💻', '◆', '⬡', '⚔'];

export function AdminBrandLogo() {
  const { draftContent, updateDraft, publishContent, isDirty, showToast } = usePortfolioContent();
  const profile = draftContent.profile || {};
  const fileInputRef = useRef(null);
  const faviconInputRef = useRef(null);
  const [previewTheme, setPreviewTheme] = useState('dark');

  const handleChange = (field, value) => {
    updateDraft('profile', (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('Image file too large. Please select an image under 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        handleChange('logoImage', dataUrl);
        showToast('Logo image uploaded to draft! Remember to Publish Live.', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        handleChange('favicon', dataUrl);
        showToast('Favicon uploaded to draft!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogoImage = () => {
    handleChange('logoImage', '');
    showToast('Removed custom logo image. Switched to glyph logo.', 'info');
  };

  const handleRemoveFavicon = () => {
    handleChange('favicon', '');
    showToast('Removed custom favicon.', 'info');
  };

  const handleSave = async () => {
    await publishContent();
  };

  const currentGlyph = profile.logoGlyph || '♔';
  const currentBrand = profile.brand || 'BBH';
  const hasImageLogo = Boolean(profile.logoImage);

  return (
    <div className="admin-brand-root">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Brand, Logo &amp; Identity</h2>
          <p className="admin-page-header__desc">
            Customize the official website logo, brand markings, glyphs, and browser identity.
            Changes reflect live immediately across the Navbar, Hero, and Footer.
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

      {/* ── Live Visual Previews ── */}
      <div className="admin-card">
        <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} style={{ color: 'var(--color-accent, #c92a2a)' }} />
            <h3 className="admin-card__title">Live Header &amp; Footer Preview</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              className={`admin-btn ${previewTheme === 'dark' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setPreviewTheme('dark')}
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Moon size={13} /> Dark Mode
            </button>
            <button
              type="button"
              className={`admin-btn ${previewTheme === 'light' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setPreviewTheme('light')}
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Sun size={13} /> Light Mode
            </button>
          </div>
        </div>

        <div className={`admin-brand-preview-stage ${previewTheme === 'light' ? 'admin-brand-preview--light' : 'admin-brand-preview--dark'}`}>
          <div className="admin-brand-preview-box">
            <span className="admin-brand-preview-label">Navbar Brand Lockup:</span>
            <div className="admin-brand-preview-navbar">
              {hasImageLogo ? (
                <img
                  src={profile.logoImage}
                  alt={currentBrand}
                  className="admin-brand-preview-img"
                />
              ) : (
                <span className="admin-brand-preview-glyph">{currentGlyph}</span>
              )}
              <span className="admin-brand-preview-name">
                {currentBrand}
                <span className="admin-brand-preview-dot">.</span>
              </span>
            </div>
          </div>

          <div className="admin-brand-preview-box">
            <span className="admin-brand-preview-label">Footer Brand Lockup:</span>
            <div className="admin-brand-preview-footer">
              <div className="admin-brand-preview-footer-brand">
                {hasImageLogo ? (
                  <img
                    src={profile.logoImage}
                    alt={currentBrand}
                    className="admin-brand-preview-img-sm"
                  />
                ) : (
                  <span className="admin-brand-preview-glyph">{currentGlyph}</span>
                )}
                <span className="admin-brand-preview-name">
                  {currentBrand}
                  <span className="admin-brand-preview-dot">.</span>
                </span>
                <span className="admin-brand-preview-fullname">
                  {profile.fullName || profile.name || 'P M K BLESSING BRYSON HONG'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        {/* ── Brand Text Details ── */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">
              <Type size={16} /> Brand Text &amp; Monogram
            </h3>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Brand Monogram Text (Navbar &amp; Footer)</label>
            <input
              type="text"
              value={profile.brand || ''}
              onChange={(e) => handleChange('brand', e.target.value)}
              className="admin-input"
              placeholder="e.g. BBH"
            />
            <span className="admin-field-hint">
              The short brand mark displayed next to the logo glyph or image (e.g. <strong>BBH.</strong>).
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Hero Monogram / Sub-brand (e.g. P M K)</label>
            <input
              type="text"
              value={profile.monogram || ''}
              onChange={(e) => handleChange('monogram', e.target.value)}
              className="admin-input"
              placeholder="e.g. P M K"
            />
            <span className="admin-field-hint">
              Displayed as a subtle badge above your headline in the Hero section.
            </span>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Full Brand / Legal Name</label>
            <input
              type="text"
              value={profile.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="admin-input"
              placeholder="e.g. P M K BLESSING BRYSON HONG"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Browser Tab Title</label>
            <input
              type="text"
              value={profile.siteTitle || ''}
              onChange={(e) => handleChange('siteTitle', e.target.value)}
              className="admin-input"
              placeholder="e.g. P M K Blessing Bryson Hong | Portfolio"
            />
            <span className="admin-field-hint">
              Displayed on the browser window or tab title.
            </span>
          </div>
        </div>

        {/* ── Logo Options: Glyph vs Image ── */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">
              <ImageIcon size={16} /> Logo Asset &amp; Symbol
            </h3>
          </div>

          {/* Glyph Selection */}
          <div className="admin-form-group">
            <label className="admin-form-label">Brand Logo Glyph / Symbol</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={profile.logoGlyph || ''}
                onChange={(e) => handleChange('logoGlyph', e.target.value)}
                className="admin-input"
                style={{ width: '80px', textAlign: 'center', fontSize: '1.25rem' }}
                placeholder="♔"
                maxLength={4}
              />
              <span className="admin-field-hint" style={{ alignSelf: 'center' }}>
                Used when no custom image logo is uploaded.
              </span>
            </div>

            <div className="admin-glyph-picker">
              {POPULAR_GLYPHS.map((glyph) => (
                <button
                  key={glyph}
                  type="button"
                  className={`admin-glyph-btn ${profile.logoGlyph === glyph ? 'admin-glyph-btn--active' : ''}`}
                  onClick={() => handleChange('logoGlyph', glyph)}
                  title={`Select ${glyph}`}
                >
                  {glyph}
                </button>
              ))}
            </div>
          </div>

          {/* Image Logo Upload */}
          <div className="admin-form-group" style={{ marginTop: '18px' }}>
            <label className="admin-form-label">Custom Image / SVG Logo (Optional)</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/svg+xml,image/png,image/jpeg,image/webp"
              style={{ display: 'none' }}
            />

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={() => fileInputRef.current?.click()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Upload size={14} />
                <span>Upload Logo File (SVG / PNG)</span>
              </button>

              {hasImageLogo && (
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={handleRemoveLogoImage}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ef4444' }}
                >
                  <Trash2 size={14} />
                  <span>Remove Image</span>
                </button>
              )}
            </div>

            <input
              type="text"
              value={profile.logoImage || ''}
              onChange={(e) => handleChange('logoImage', e.target.value)}
              className="admin-input"
              placeholder="Or paste an image URL (e.g. /logo.svg or https://...)"
            />
            <span className="admin-field-hint">
              If an image logo is provided, it replaces the glyph in the Navbar and Footer.
            </span>
          </div>

          {/* Favicon */}
          <div className="admin-form-group" style={{ marginTop: '18px' }}>
            <label className="admin-form-label">Browser Favicon</label>
            <input
              type="file"
              ref={faviconInputRef}
              onChange={handleFaviconUpload}
              accept="image/x-icon,image/svg+xml,image/png"
              style={{ display: 'none' }}
            />

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => faviconInputRef.current?.click()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Upload size={14} />
                <span>Upload Favicon</span>
              </button>

              {profile.favicon && (
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={handleRemoveFavicon}
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <input
              type="text"
              value={profile.favicon || ''}
              onChange={(e) => handleChange('favicon', e.target.value)}
              className="admin-input"
              placeholder="Favicon path or URL"
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button
          type="button"
          onClick={handleSave}
          className="admin-btn admin-btn--success"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.95rem' }}
        >
          <Save size={16} />
          <span>Save &amp; Publish Brand &amp; Logo Live</span>
        </button>
      </div>
    </div>
  );
}


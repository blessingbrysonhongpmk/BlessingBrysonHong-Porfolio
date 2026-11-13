import { useRef } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Upload, RotateCcw, Camera, Check } from 'lucide-react';
import './ProfileImageUploader.css';

const DEFAULT_AVATAR = '/profile.jpeg';

export function ProfileImageUploader({ className = '' }) {
  const { draftContent, updateDraft, showToast } = usePortfolioContent();
  const profile = draftContent.profile || {};
  const fileInputRef = useRef(null);

  const currentAvatar = profile.avatar || DEFAULT_AVATAR;
  const isDefault = currentAvatar === DEFAULT_AVATAR;

  const handleAvatarChange = (newVal) => {
    updateDraft('profile', (prev) => ({
      ...prev,
      avatar: newVal,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      showToast('Image file too large. Please select an image under 3MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        handleAvatarChange(dataUrl);
        showToast('Profile photo updated in draft! Click Save & Publish to apply live.', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    handleAvatarChange(DEFAULT_AVATAR);
    showToast('Reset profile image to original photo (/profile.jpeg)', 'info');
  };

  return (
    <div className={`profile-uploader-card ${className}`}>
      <div className="profile-uploader-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Camera size={18} style={{ color: 'var(--color-accent, #c92a2a)' }} />
          <h4 className="profile-uploader-title">Profile Photo / Avatar Management</h4>
        </div>
        <span className={`profile-uploader-badge ${isDefault ? 'profile-uploader-badge--default' : 'profile-uploader-badge--custom'}`}>
          {isDefault ? 'Original Photo' : 'Custom Photo'}
        </span>
      </div>

      <div className="profile-uploader-body">
        {/* Preview Frame */}
        <div className="profile-uploader-preview-wrap">
          <div className="profile-uploader-frame">
            <img
              src={currentAvatar}
              alt={profile.name || 'Profile Avatar'}
              className="profile-uploader-img"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_AVATAR;
              }}
            />
            <button
              type="button"
              className="profile-uploader-overlay-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Change Profile Photo"
            >
              <Camera size={18} />
              <span>Change</span>
            </button>
          </div>
          <span className="profile-uploader-preview-note">Hero Portrait Preview</span>
        </div>

        {/* Controls */}
        <div className="profile-uploader-controls">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp,image/jpg"
            style={{ display: 'none' }}
          />

          <div className="profile-uploader-btn-group">
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={() => fileInputRef.current?.click()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Upload size={14} />
              <span>Upload New Photo from Device</span>
            </button>

            {!isDefault && (
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={handleResetToDefault}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title="Revert back to original authentic photo"
              >
                <RotateCcw size={14} />
                <span>Reset to Original</span>
              </button>
            )}
          </div>

          <div className="admin-form-group" style={{ marginTop: '12px', marginBottom: 0 }}>
            <label className="admin-form-label" style={{ fontSize: '0.78rem' }}>
              Photo URL / File Path
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={profile.avatar || ''}
                onChange={(e) => handleAvatarChange(e.target.value)}
                className="admin-input"
                placeholder="/profile.jpeg or paste image URL"
                style={{ fontSize: '0.82rem' }}
              />
              {isDefault && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#10b981', flexShrink: 0 }}>
                  <Check size={14} /> Original
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
              You can upload any photo directly from your computer or phone. Changes immediately reflect in the Hero section once published.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

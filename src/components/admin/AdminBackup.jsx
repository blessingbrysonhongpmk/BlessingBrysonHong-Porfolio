import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Download, Upload, RotateCcw, AlertTriangle } from 'lucide-react';

export function AdminBackup() {
  const { exportData, importData, resetToDefault } = usePortfolioContent();
  const [importText, setImportText] = useState('');

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const success = importData(importText.trim());
    if (success) {
      setImportText('');
    }
  };

  const handleResetConfirm = () => {
    if (
      window.confirm(
        'WARNING: This will reset all your portfolio content back to the original authentic data. Any unsaved edits will be discarded. Continue?'
      )
    ) {
      resetToDefault();
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Data Backup &amp; Reset</h2>
          <p className="admin-page-header__desc">
            Export backups, restore previous configurations, or safely revert to the original portfolio content.
          </p>
        </div>
      </div>

      <div className="admin-grid-2">
        {/* Export Card */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title">Export Database (JSON)</h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
            Download a full JSON snapshot of your current portfolio content, including all projects, skills, narrative case studies, and profile details.
          </p>
          <button type="button" onClick={exportData} className="admin-btn admin-btn--primary">
            <Download size={16} />
            <span>Download JSON Backup</span>
          </button>
        </div>

        {/* Reset Card */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h3 className="admin-card__title" style={{ color: '#ef4444' }}>
              <AlertTriangle size={18} />
              Reset to Original Data
            </h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px' }}>
            Reverts all portfolio content to the original authentic dataset. Removes any local storage overrides and restores the factory state.
          </p>
          <button
            type="button"
            onClick={handleResetConfirm}
            className="admin-btn admin-btn--ghost"
            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            <RotateCcw size={16} />
            <span>Reset to Original Baseline</span>
          </button>
        </div>
      </div>

      {/* Import JSON */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Restore / Import Data</h3>
        </div>

        <form onSubmit={handleImportSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Paste JSON Content</label>
            <textarea
              rows={6}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="admin-textarea"
              placeholder='Paste exported {"profile": ..., "projects": ...} JSON content here'
            />
          </div>

          <button type="submit" disabled={!importText.trim()} className="admin-btn admin-btn--success">
            <Upload size={16} />
            <span>Import JSON into Draft</span>
          </button>
        </form>
      </div>
    </div>
  );
}

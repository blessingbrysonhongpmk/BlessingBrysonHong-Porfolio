import { useState, useEffect, useCallback } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import {
  LIGHT_DEFAULTS,
  DARK_DEFAULTS,
  APPEARANCE_STORAGE_KEY,
  applyAppearanceTokens,
  loadSavedAppearance,
} from '../../utils/appearanceTokens';
import { RotateCcw, Sun, Moon, CheckCircle2, Save } from 'lucide-react';

function ColorRow({ label, desc, value, onChange, onReset, defaultVal }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '42px', height: '42px', border: '2px solid rgba(255,255,255,0.12)', borderRadius: '8px', cursor: 'pointer', padding: '2px', background: 'none', flexShrink: 0 }}
        title={`Pick ${label}`}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>{label}</div>
        {desc && <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{desc}</div>}
      </div>
      <input
        type="text"
        value={value}
        onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) onChange(e.target.value); }}
        style={{ width: '90px', fontFamily: 'monospace', fontSize: '0.78rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '5px 8px', color: '#f8fafc' }}
      />
      {value !== defaultVal && (
        <button type="button" onClick={onReset} title="Reset to default" style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}>
          <RotateCcw size={13} />
        </button>
      )}
    </div>
  );
}

export function AdminAppearance() {
  const { showToast, updateDraft, publishContent, isDirty } = usePortfolioContent();

  const saved = loadSavedAppearance();
  const [light, setLight] = useState(saved?.light || { ...LIGHT_DEFAULTS });
  const [dark,  setDark]  = useState(saved?.dark  || { ...DARK_DEFAULTS  });
  const [preview, setPreview] = useState('light');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (saved) {
      applyAppearanceTokens(saved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLight = (key, val) => {
    setLight(prev => {
      const next = { ...prev, [key]: val };
      applyAppearanceTokens({ light: next, dark });
      localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify({ light: next, dark }));
      updateDraft('appearance', { light: next, dark });
      return next;
    });
  };

  const updateDarkColor = (key, val) => {
    setDark(prev => {
      const next = { ...prev, [key]: val };
      applyAppearanceTokens({ light, dark: next });
      localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify({ light, dark: next }));
      updateDraft('appearance', { light, dark: next });
      return next;
    });
  };

  const handleApply = useCallback(async () => {
    applyAppearanceTokens({ light, dark });
    localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify({ light, dark }));
    updateDraft('appearance', { light, dark });
    await publishContent();
    setApplied(true);
    showToast('Appearance saved and published live!', 'success');
    setTimeout(() => setApplied(false), 2500);
  }, [light, dark, publishContent, showToast, updateDraft]);

  const handleReset = useCallback((mode) => {
    if (mode === 'light') {
      const nextLight = { ...LIGHT_DEFAULTS };
      setLight(nextLight);
      applyAppearanceTokens({ light: nextLight, dark });
      localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify({ light: nextLight, dark }));
      updateDraft('appearance', { light: nextLight, dark });
    } else {
      const nextDark = { ...DARK_DEFAULTS };
      setDark(nextDark);
      applyAppearanceTokens({ light, dark: nextDark });
      localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify({ light, dark: nextDark }));
      updateDraft('appearance', { light, dark: nextDark });
    }
    showToast(`${mode === 'light' ? 'Light' : 'Dark'} mode colors reset to defaults`, 'info');
  }, [dark, light, showToast, updateDraft]);

  const handleResetAll = useCallback(() => {
    setLight({ ...LIGHT_DEFAULTS });
    setDark({ ...DARK_DEFAULTS });
    applyAppearanceTokens({ light: LIGHT_DEFAULTS, dark: DARK_DEFAULTS });
    localStorage.removeItem(APPEARANCE_STORAGE_KEY);
    updateDraft('appearance', { light: LIGHT_DEFAULTS, dark: DARK_DEFAULTS });
    showToast('All appearance settings reset to original defaults.', 'info');
  }, [showToast, updateDraft]);

  const tokens = preview === 'light' ? light : dark;
  const updateToken = preview === 'light' ? updateLight : updateDarkColor;
  const defaults = preview === 'light' ? LIGHT_DEFAULTS : DARK_DEFAULTS;

  const colorFields = [
    { key: 'accent',        label: 'Primary Accent Color',  desc: 'Buttons, links, borders, highlights' },
    { key: 'accentHover',   label: 'Accent Hover Color',    desc: 'Accent on hover / focus states' },
    { key: 'bg',            label: 'Page Background',       desc: 'Main site background' },
    { key: 'bgAlt',         label: 'Alt Background',        desc: 'Subtle alt background zones' },
    { key: 'surface',       label: 'Card / Surface Color',  desc: 'Cards, panels, floating elements' },
    { key: 'text',          label: 'Primary Text',          desc: 'Main heading and body text' },
    { key: 'textSecondary', label: 'Secondary Text',        desc: 'Subtitles, labels, subtext' },
    { key: 'textMuted',     label: 'Muted Text',            desc: 'Captions, metadata, de-emphasized text' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Appearance &amp; Theme Colors</h2>
          <p className="admin-page-header__desc">
            Customize colors for Light and Dark modes. Changes take effect instantly in real-time.
          </p>
        </div>
        <button
          type="button"
          className={`admin-btn ${applied ? 'admin-btn--success' : (isDirty ? 'admin-btn--success' : 'admin-btn--primary')}`}
          onClick={handleApply}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          {applied ? <CheckCircle2 size={15} /> : <Save size={15} />}
          <span>{applied ? 'Saved Live!' : (isDirty ? 'Save & Publish Live' : 'Publish Colors')}</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Editing Mode</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className={`admin-btn ${preview === 'light' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setPreview('light')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Sun size={13} /> Light Mode
            </button>
            <button
              type="button"
              className={`admin-btn ${preview === 'dark' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
              onClick={() => setPreview('dark')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Moon size={13} /> Dark Mode
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={() => handleReset(preview)}
              style={{ fontSize: '0.78rem' }}
              title={`Reset ${preview} mode to defaults`}
            >
              <RotateCcw size={13} /> Reset Mode
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: tokens.accent, boxShadow: `0 0 12px ${tokens.accent}` }} />
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Active Accent: </span>
            <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#f8fafc', fontWeight: 600 }}>{tokens.accent}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: tokens.bg, border: '1px solid rgba(255,255,255,0.1)' }} title="Background" />
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: tokens.surface, border: '1px solid rgba(255,255,255,0.1)' }} title="Surface" />
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: tokens.text, border: '1px solid rgba(255,255,255,0.1)' }} title="Text" />
          </div>
        </div>

        {colorFields.map(field => (
          <ColorRow
            key={field.key}
            label={field.label}
            desc={field.desc}
            value={tokens[field.key] || defaults[field.key]}
            onChange={val => updateToken(field.key, val)}
            onReset={() => updateToken(field.key, defaults[field.key])}
            defaultVal={defaults[field.key]}
          />
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={handleResetAll}
          style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
        >
          <RotateCcw size={14} /> Reset All to Defaults
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="admin-btn admin-btn--success"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 24px', fontSize: '0.95rem' }}
        >
          <Save size={16} />
          <span>Save &amp; Publish Appearance</span>
        </button>
      </div>
    </div>
  );
}

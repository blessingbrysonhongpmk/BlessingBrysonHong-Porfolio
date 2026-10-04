import { useState, useEffect, useCallback } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Palette, RotateCcw, Eye, Sun, Moon, CheckCircle2 } from 'lucide-react';

// ── Default token values for both modes ──────────────────────────────────────
const LIGHT_DEFAULTS = {
  accent:          '#8B0000',
  accentHover:     '#6B0000',
  bg:              '#EAE6DC',
  bgAlt:           '#DFD9CD',
  surface:         '#FFFFFF',
  text:            '#0E1116',
  textSecondary:   '#2D3442',
  textMuted:       '#535C6D',
};

const DARK_DEFAULTS = {
  accent:          '#8B0000',
  accentHover:     '#A80D0D',
  bg:              '#050608',
  bgAlt:           '#0A0C10',
  surface:         '#0C1015',
  text:            '#F4F3EF',
  textSecondary:   '#9AA1AF',
  textMuted:       '#858C98',
};

const STORAGE_KEY = 'bbh_appearance_v1';

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function hexToRgb(hex) {
  if (!hex) return null;
  const m = hex.replace('#','').match(/../g);
  if (!m || m.length < 3) return null;
  return m.slice(0,3).map(h => parseInt(h, 16)).join(', ');
}

function applyTokens(light, dark) {
  const root = document.documentElement;
  root.style.setProperty('--color-accent',          light.accent);
  root.style.setProperty('--color-accent-hover',    light.accentHover);
  root.style.setProperty('--color-primary',         light.accent);
  root.style.setProperty('--color-primary-hover',   light.accentHover);
  root.style.setProperty('--color-bg',              light.bg);
  root.style.setProperty('--color-bg-alt',          light.bgAlt);
  root.style.setProperty('--color-surface',         light.surface);
  root.style.setProperty('--color-text',            light.text);
  root.style.setProperty('--color-text-secondary',  light.textSecondary);
  root.style.setProperty('--color-text-muted',      light.textMuted);

  const la = hexToRgb(light.accent);
  if (la) {
    root.style.setProperty('--color-accent-soft',  `rgba(${la},0.08)`);
    root.style.setProperty('--color-accent-muted', `rgba(${la},0.16)`);
    root.style.setProperty('--color-accent-glow',  `rgba(${la},0.24)`);
    root.style.setProperty('--color-glow-crimson', `rgba(${la},0.08)`);
  }

  let styleEl = document.getElementById('bbh-appearance-dark');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'bbh-appearance-dark';
    document.head.appendChild(styleEl);
  }
  const da = hexToRgb(dark.accent);
  styleEl.textContent = `
    [data-theme="dark"] {
      --color-accent:         ${dark.accent};
      --color-accent-hover:   ${dark.accentHover};
      --color-primary:        ${dark.accent};
      --color-primary-hover:  ${dark.accentHover};
      --color-bg:             ${dark.bg};
      --color-bg-alt:         ${dark.bgAlt};
      --color-surface:        ${dark.surface};
      --color-text:           ${dark.text};
      --color-text-secondary: ${dark.textSecondary};
      --color-text-muted:     ${dark.textMuted};
      ${da ? `
      --color-accent-soft:    rgba(${da},0.16);
      --color-accent-muted:   rgba(${da},0.28);
      --color-accent-glow:    rgba(${da},0.42);
      --color-glow-crimson:   rgba(${da},0.22);
      ` : ''}
    }
  `;
}

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
  const { showToast, updateDraft } = usePortfolioContent();

  const saved = loadSaved();
  const [light, setLight] = useState(saved?.light || { ...LIGHT_DEFAULTS });
  const [dark,  setDark]  = useState(saved?.dark  || { ...DARK_DEFAULTS  });
  const [preview, setPreview] = useState('light');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (saved) applyTokens(saved.light, saved.dark);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLight = (key, val) => setLight(prev => ({ ...prev, [key]: val }));
  const updateDarkColor = (key, val) => setDark(prev => ({ ...prev, [key]: val }));

  const handleApply = useCallback(() => {
    applyTokens(light, dark);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ light, dark }));
    updateDraft('siteSettings', prev => ({ ...(prev || {}), appearance: { light, dark } }));
    setApplied(true);
    showToast('Appearance applied! Click Publish Live to save permanently.', 'success');
    setTimeout(() => setApplied(false), 2500);
  }, [light, dark, showToast, updateDraft]);

  const handleReset = useCallback((mode) => {
    if (mode === 'light') setLight({ ...LIGHT_DEFAULTS });
    else setDark({ ...DARK_DEFAULTS });
    showToast(`${mode === 'light' ? 'Light' : 'Dark'} mode colors reset to defaults`, 'info');
  }, [showToast]);

  const handleResetAll = useCallback(() => {
    setLight({ ...LIGHT_DEFAULTS });
    setDark({ ...DARK_DEFAULTS });
    applyTokens(LIGHT_DEFAULTS, DARK_DEFAULTS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('All appearance settings reset to original defaults.', 'info');
  }, [showToast]);

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
            Customize colors for Light and Dark modes. Changes are live — click Apply to confirm.
          </p>
        </div>
        <button type="button" className={`admin-btn ${applied ? 'admin-btn--success' : 'admin-btn--primary'}`} onClick={handleApply} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {applied ? <CheckCircle2 size={15} /> : <Palette size={15} />}
          <span>{applied ? 'Applied!' : 'Apply Colors'}</span>
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Editing Mode</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className={`admin-btn ${preview === 'light' ? 'admin-btn--primary' : 'admin-btn--ghost'}`} onClick={() => setPreview('light')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sun size={13} /> Light Mode
            </button>
            <button type="button" className={`admin-btn ${preview === 'dark' ? 'admin-btn--primary' : 'admin-btn--ghost'}`} onClick={() => setPreview('dark')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Moon size={13} /> Dark Mode
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 12px' }}>
          Editing <strong style={{ color: preview === 'light' ? '#f59e0b' : '#818cf8' }}>{preview === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}</strong> colors.
        </p>

        {colorFields.map(f => (
          <ColorRow
            key={`${preview}-${f.key}`}
            label={f.label}
            desc={f.desc}
            value={tokens[f.key] || defaults[f.key]}
            defaultVal={defaults[f.key]}
            onChange={val => updateToken(f.key, val)}
            onReset={() => updateToken(f.key, defaults[f.key])}
          />
        ))}

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => handleReset(preview)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={13} /> Reset {preview === 'light' ? 'Light' : 'Dark'} to Default
          </button>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={handleResetAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f87171' }}>
            <RotateCcw size={13} /> Reset All Colors
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="admin-card">
        <div className="admin-card__header">
          <h3 className="admin-card__title">Live Color Preview</h3>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{preview} mode</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px', padding: '4px 0 16px' }}>
          {colorFields.map(f => (
            <div key={f.key} style={{ textAlign: 'center' }}>
              <div style={{ width: '100%', height: '40px', borderRadius: '8px', background: tokens[f.key], border: '1px solid rgba(255,255,255,0.1)', marginBottom: '5px' }} />
              <div style={{ fontSize: '0.62rem', color: '#94a3b8', lineHeight: 1.3 }}>{f.label}</div>
              <div style={{ fontSize: '0.58rem', color: '#64748b', fontFamily: 'monospace' }}>{tokens[f.key]}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px', borderRadius: '10px', background: tokens.bg, border: `2px solid ${tokens.accent}` }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: tokens.text, marginBottom: '4px' }}>
            Preview — {preview === 'light' ? 'Light' : 'Dark'} Mode
          </div>
          <div style={{ fontSize: '0.8rem', color: tokens.textSecondary, marginBottom: '6px' }}>Secondary text in your chosen palette</div>
          <div style={{ fontSize: '0.72rem', color: tokens.textMuted, marginBottom: '12px' }}>Muted metadata text</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ background: tokens.accent, color: '#fff', padding: '5px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>Primary Button</span>
            <span style={{ background: tokens.surface, color: tokens.text, border: `1px solid ${tokens.accent}`, padding: '5px 12px', borderRadius: '6px', fontSize: '0.78rem' }}>Outlined</span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="admin-card" style={{ borderLeft: '3px solid #f59e0b' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Eye size={18} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '6px' }}>How color changes work</div>
            <ul style={{ fontSize: '0.77rem', color: '#94a3b8', lineHeight: 1.8, paddingLeft: '16px' }}>
              <li>Click <strong>Apply Colors</strong> — changes appear live on the site instantly.</li>
              <li>Saved in browser storage so they persist on refresh.</li>
              <li>Click <strong>Publish Live</strong> (top bar) to save permanently to Firebase.</li>
              <li>Accent color auto-generates soft/muted/glow variants used across the UI.</li>
              <li>Edit Light and Dark modes independently using the mode switcher.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

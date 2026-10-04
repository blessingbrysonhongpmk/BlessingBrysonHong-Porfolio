// ── Default token values for both modes ──────────────────────────────────────
export const LIGHT_DEFAULTS = {
  accent:          '#8B0000',
  accentHover:     '#6B0000',
  bg:              '#EAE6DC',
  bgAlt:           '#DFD9CD',
  surface:         '#FFFFFF',
  text:            '#0E1116',
  textSecondary:   '#2D3442',
  textMuted:       '#535C6D',
};

export const DARK_DEFAULTS = {
  accent:          '#8B0000',
  accentHover:     '#A80D0D',
  bg:              '#050608',
  bgAlt:           '#0A0C10',
  surface:         '#0C1015',
  text:            '#F4F3EF',
  textSecondary:   '#9AA1AF',
  textMuted:       '#858C98',
};

export const APPEARANCE_STORAGE_KEY = 'bbh_appearance_v1';

export function hexToRgb(hex) {
  if (!hex) return null;
  const m = hex.replace('#', '').match(/../g);
  if (!m || m.length < 3) return null;
  return m.slice(0, 3).map(h => parseInt(h, 16)).join(', ');
}

export function loadSavedAppearance() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(APPEARANCE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function applyAppearanceTokens(appearance) {
  if (typeof document === 'undefined') return;
  const light = appearance?.light || LIGHT_DEFAULTS;
  const dark  = appearance?.dark  || DARK_DEFAULTS;

  const root = document.documentElement;
  if (light) {
    if (light.accent) {
      root.style.setProperty('--color-accent', light.accent);
      root.style.setProperty('--color-primary', light.accent);
      const la = hexToRgb(light.accent);
      if (la) {
        root.style.setProperty('--color-accent-soft', `rgba(${la},0.08)`);
        root.style.setProperty('--color-accent-muted', `rgba(${la},0.16)`);
        root.style.setProperty('--color-accent-glow', `rgba(${la},0.24)`);
        root.style.setProperty('--color-glow-crimson', `rgba(${la},0.08)`);
      }
    }
    if (light.accentHover) {
      root.style.setProperty('--color-accent-hover', light.accentHover);
      root.style.setProperty('--color-primary-hover', light.accentHover);
    }
    if (light.bg) root.style.setProperty('--color-bg', light.bg);
    if (light.bgAlt) root.style.setProperty('--color-bg-alt', light.bgAlt);
    if (light.surface) root.style.setProperty('--color-surface', light.surface);
    if (light.text) root.style.setProperty('--color-text', light.text);
    if (light.textSecondary) root.style.setProperty('--color-text-secondary', light.textSecondary);
    if (light.textMuted) root.style.setProperty('--color-text-muted', light.textMuted);
  }

  if (dark) {
    let styleEl = document.getElementById('bbh-appearance-dark');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'bbh-appearance-dark';
      document.head.appendChild(styleEl);
    }
    const da = hexToRgb(dark.accent);
    styleEl.textContent = `
      [data-theme="dark"] {
        ${dark.accent ? `--color-accent: ${dark.accent}; --color-primary: ${dark.accent};` : ''}
        ${dark.accentHover ? `--color-accent-hover: ${dark.accentHover}; --color-primary-hover: ${dark.accentHover};` : ''}
        ${dark.bg ? `--color-bg: ${dark.bg};` : ''}
        ${dark.bgAlt ? `--color-bg-alt: ${dark.bgAlt};` : ''}
        ${dark.surface ? `--color-surface: ${dark.surface};` : ''}
        ${dark.text ? `--color-text: ${dark.text};` : ''}
        ${dark.textSecondary ? `--color-text-secondary: ${dark.textSecondary};` : ''}
        ${dark.textMuted ? `--color-text-muted: ${dark.textMuted};` : ''}
        ${da ? `
        --color-accent-soft: rgba(${da},0.16);
        --color-accent-muted: rgba(${da},0.28);
        --color-accent-glow: rgba(${da},0.42);
        --color-glow-crimson: rgba(${da},0.22);
        ` : ''}
      }
    `;
  }
}

// Auto-apply saved appearance if available in browser
if (typeof window !== 'undefined') {
  const initial = loadSavedAppearance();
  if (initial) {
    applyAppearanceTokens(initial);
  }
}

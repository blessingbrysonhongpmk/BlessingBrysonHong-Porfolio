import { useState, useMemo } from 'react';
import { Layers, Wind, Maximize2, Sparkles, ExternalLink } from 'lucide-react';
import './Simulators.css';

const ALUMINIUM_SYSTEMS = [
  { id: 'window', label: 'Thermal Sliding Window', baseWeight: 14.5 },
  { id: 'curtain', label: 'Structural Glazed Curtain Wall', baseWeight: 22.0 },
  { id: 'partition', label: 'Acoustic Glass Partition', baseWeight: 18.2 },
  { id: 'louver', label: 'Heavy Architectural Louver', baseWeight: 12.8 },
];

const ANODIZED_COLORS = [
  { id: 'silver', label: 'Titanium Silver', hex: '#CBD5E1', borderHex: '#94A3B8' },
  { id: 'gold', label: 'Anodized Gold', hex: '#EAB308', borderHex: '#CA8A04' },
  { id: 'black', label: 'Matt Charcoal Black', hex: '#334155', borderHex: '#1E293B' },
  { id: 'bronze', label: 'Architectural Bronze', hex: '#9A3412', borderHex: '#7C2D12' },
];

export function AluminiumCustomizer() {
  const [system, setSystem] = useState('curtain');
  const [color, setColor] = useState('silver');
  const [width, setWidth] = useState(2400); // mm
  const [height, setHeight] = useState(2800); // mm

  const stats = useMemo(() => {
    const sysObj = ALUMINIUM_SYSTEMS.find(s => s.id === system) || ALUMINIUM_SYSTEMS[0];
    const colorObj = ANODIZED_COLORS.find(c => c.id === color) || ANODIZED_COLORS[0];

    const areaSqM = ((width * height) / 1000000).toFixed(2);
    const weightKg = Math.round(areaSqM * sysObj.baseWeight);
    const windLoadKPa = (2.2 + (height > 2500 ? 0.6 : 0.2)).toFixed(1);
    const acousticDb = Math.min(46, Math.round(34 + (areaSqM * 1.2)));

    return {
      areaSqM,
      weightKg,
      windLoadKPa,
      acousticDb,
      colorObj,
      sysLabel: sysObj.label,
    };
  }, [system, color, width, height]);

  return (
    <div className="simulator-box simulator-box--aluminium">
      <div className="simulator-header">
        <div className="simulator-title-group">
          <div className="simulator-icon-badge simulator-icon-badge--blue">
            <Maximize2 size={16} />
          </div>
          <div>
            <h4 className="simulator-title">ALUMINIUM FABRICATION SYSTEM CONFIGURATOR</h4>
            <p className="simulator-subtitle">Architectural Framing &amp; Structural Glazing Specification Engine</p>
          </div>
        </div>
        <div className="simulator-status-badge simulator-status-badge--blue">
          <span className="live-pulse-dot live-pulse-dot--blue" />
          <span>CATALOG PORTAL LIVE</span>
        </div>
      </div>

      <div className="simulator-grid">
        {/* CONTROLS */}
        <div className="simulator-controls-col">
          <div className="control-group">
            <span className="control-label"><Layers size={12} /> Architectural System</span>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="simulator-select"
            >
              {ALUMINIUM_SYSTEMS.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <span className="control-label"><Sparkles size={12} /> Frame Anodization Finish</span>
            <div className="color-swatch-row">
              {ANODIZED_COLORS.map(c => (
                <button
                  key={c.id}
                  className={`color-swatch-btn ${color === c.id ? 'active' : ''}`}
                  onClick={() => setColor(c.id)}
                  title={c.label}
                  style={{ '--swatch-color': c.hex }}
                >
                  <span className="swatch-dot" />
                  <span className="swatch-name">{c.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-row-dual">
            <div className="control-group">
              <div className="control-label-row">
                <span className="control-label">Width (mm)</span>
                <span className="control-val">{width}mm</span>
              </div>
              <input
                type="range"
                min="800"
                max="5000"
                step="100"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="simulator-slider simulator-slider--blue"
              />
            </div>

            <div className="control-group">
              <div className="control-label-row">
                <span className="control-label">Height (mm)</span>
                <span className="control-val">{height}mm</span>
              </div>
              <input
                type="range"
                min="1000"
                max="4000"
                step="100"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="simulator-slider simulator-slider--blue"
              />
            </div>
          </div>
        </div>

        {/* OUTPUT METRICS & ELEVATION VIEW */}
        <div className="simulator-output-col">
          <div className="sim-metrics-grid">
            <div className="sim-metric-card sim-metric-card--blue">
              <span className="sim-metric-label">SURFACE AREA</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num text-blue">{stats.areaSqM}</span>
                <span className="sim-metric-unit">m²</span>
              </div>
              <span className="sim-metric-sub">Frame Weight: {stats.weightKg} kg</span>
            </div>

            <div className="sim-metric-card sim-metric-card--dark">
              <span className="sim-metric-label">STRUCTURAL WIND RATING</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num">{stats.windLoadKPa}</span>
                <span className="sim-metric-unit">kPa</span>
              </div>
              <span className="sim-metric-sub">Sound Proofing: {stats.acousticDb} dB</span>
            </div>
          </div>

          {/* ELEVATION ARCHITECTURAL DRAWING */}
          <div className="elevation-drawing-box">
            <div className="elevation-topbar">
              <span>ELEVATION ARCHITECTURAL RENDER</span>
              <span className="elevation-scale-tag">{width}W × {height}H mm</span>
            </div>

            <svg viewBox="0 0 380 90" className="elevation-svg">
              <defs>
                <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                  <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Glass Panes */}
              <rect x="50" y="15" width="135" height="60" fill="url(#glassReflection)" stroke={stats.colorObj.borderHex} strokeWidth="2" />
              <rect x="195" y="15" width="135" height="60" fill="url(#glassReflection)" stroke={stats.colorObj.borderHex} strokeWidth="2" />

              {/* Glass Reflection Glare Line */}
              <line x1="60" y1="20" x2="140" y2="65" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <line x1="205" y1="20" x2="285" y2="65" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

              {/* Frame Outer Border */}
              <rect x="44" y="9" width="292" height="72" fill="none" stroke={stats.colorObj.hex} strokeWidth="3" rx="2" />

              {/* Center Mullion Beam */}
              <rect x="187" y="9" width="6" height="72" fill={stats.colorObj.hex} />
            </svg>
          </div>

          <div className="industrial-footer-row">
            <span className="fab-time-pill"><Wind size={11} /> Wind Tested ASTM E330</span>
            <a
              href="https://alumunium-fabrication-company.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="live-site-link"
            >
              <span>Visit Live Portal</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

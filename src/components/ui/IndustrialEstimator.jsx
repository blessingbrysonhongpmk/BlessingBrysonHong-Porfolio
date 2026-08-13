import { useState, useMemo } from 'react';
import { Wrench, ShieldCheck, HardHat, ExternalLink, Layers, Scale, Clock } from 'lucide-react';
import './Simulators.css';

const STRUCTURE_TYPES = [
  { id: 'ibeam', label: 'I-Beam Structural Frame', multiplier: 1.4 },
  { id: 'truss', label: 'Roof Steel Truss Assembly', multiplier: 1.1 },
  { id: 'gate', label: 'Industrial Heavy Gate', multiplier: 0.9 },
  { id: 'fence', label: 'Perimeter Steel Enclosure', multiplier: 0.75 },
];

const FINISHES = [
  { id: 'crimson', label: 'Crimson Protective Primer', color: '#DC143C' },
  { id: 'galvanized', label: 'Galvanized Zinc Coat', color: '#38BDF8' },
  { id: 'matte', label: 'Industrial Matte Black', color: '#64748B' },
];

export function IndustrialEstimator() {
  const [structure, setStructure] = useState('ibeam');
  const [length, setLength] = useState(14);
  const [gauge, setGauge] = useState(8); // mm
  const [finish, setFinish] = useState('crimson');

  const stats = useMemo(() => {
    const structObj = STRUCTURE_TYPES.find(s => s.id === structure) || STRUCTURE_TYPES[0];
    const finishObj = FINISHES.find(f => f.id === finish) || FINISHES[0];

    const weightPerMeter = gauge * 4.25 * structObj.multiplier;
    const totalWeight = Math.round(length * weightPerMeter);
    const loadCapacity = ((totalWeight * 2.85) / 1000).toFixed(1);
    const fabDays = Math.max(2, Math.ceil(length / 3.5) + (gauge > 8 ? 2 : 1));
    const safetyFactor = (2.4 + (gauge * 0.1)).toFixed(1);

    return {
      totalWeight,
      loadCapacity,
      fabDays,
      safetyFactor,
      finishColor: finishObj.color,
      structLabel: structObj.label,
    };
  }, [structure, length, gauge, finish]);

  return (
    <div className="simulator-box simulator-box--industrial">
      <div className="simulator-header">
        <div className="simulator-title-group">
          <div className="simulator-icon-badge simulator-icon-badge--crimson">
            <Wrench size={16} />
          </div>
          <div>
            <h4 className="simulator-title">DEVI DEVAN INDUSTRIAL FABRICATION CALCULATOR</h4>
            <p className="simulator-subtitle">Custom Steel Structure &amp; Load Spec Estimator Engine</p>
          </div>
        </div>
        <div className="simulator-status-badge simulator-status-badge--crimson">
          <span className="live-pulse-dot live-pulse-dot--red" />
          <span>CLIENT PORTAL ONLINE</span>
        </div>
      </div>

      <div className="simulator-grid">
        {/* CONTROLS */}
        <div className="simulator-controls-col">
          <div className="control-group">
            <span className="control-label"><HardHat size={12} /> Structural Fabrication Type</span>
            <select
              value={structure}
              onChange={(e) => setStructure(e.target.value)}
              className="simulator-select"
            >
              {STRUCTURE_TYPES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <span className="control-label"><Scale size={12} /> Span Length</span>
              <span className="control-val">{length} meters</span>
            </div>
            <input
              type="range"
              min="3"
              max="40"
              step="1"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="simulator-slider simulator-slider--crimson"
            />
            <div className="slider-ticks">
              <span>3m (Compact)</span>
              <span>20m (Medium)</span>
              <span>40m (Industrial)</span>
            </div>
          </div>

          <div className="control-row-dual">
            <div className="control-group">
              <span className="control-label"><Layers size={12} /> Steel Gauge Thickness</span>
              <select
                value={gauge}
                onChange={(e) => setGauge(Number(e.target.value))}
                className="simulator-select"
              >
                <option value={4}>4mm (Light Structural)</option>
                <option value={8}>8mm (Standard Heavy)</option>
                <option value={12}>12mm (Extra Heavy Duty)</option>
              </select>
            </div>

            <div className="control-group">
              <span className="control-label"><ShieldCheck size={12} /> Surface Coating Finish</span>
              <select
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="simulator-select"
              >
                {FINISHES.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT METRICS & BLUEPRINT PREVIEW */}
        <div className="simulator-output-col">
          <div className="sim-metrics-grid">
            <div className="sim-metric-card sim-metric-card--crimson">
              <span className="sim-metric-label">TOTAL STRUCTURAL WEIGHT</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num text-crimson">{stats.totalWeight}</span>
                <span className="sim-metric-unit">kg</span>
              </div>
              <span className="sim-metric-sub">Est. Material Mass</span>
            </div>

            <div className="sim-metric-card sim-metric-card--dark">
              <span className="sim-metric-label">SAFE LOAD CAPACITY</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num">{stats.loadCapacity}</span>
                <span className="sim-metric-unit">Tons</span>
              </div>
              <span className="sim-metric-sub">Safety Factor: {stats.safetyFactor}x</span>
            </div>
          </div>

          {/* BLUEPRINT SVG GRAPHIC */}
          <div className="industrial-blueprint-box">
            <div className="blueprint-topbar">
              <span>CAD STRUCTURAL PREVIEW</span>
              <span className="blueprint-tag" style={{ color: stats.finishColor }}>
                ● {stats.structLabel}
              </span>
            </div>

            <svg viewBox="0 0 380 90" className="blueprint-svg">
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />

              {/* Top Support Beam */}
              <rect x="30" y="25" width="320" height="12" rx="2" fill="none" stroke={stats.finishColor} strokeWidth="2" />
              {/* Internal Cross-Bracing Trusses */}
              <line x1="30" y1="25" x2="90" y2="37" stroke={stats.finishColor} strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="90" y1="25" x2="150" y2="37" stroke={stats.finishColor} strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="150" y1="25" x2="210" y2="37" stroke={stats.finishColor} strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="210" y1="25" x2="270" y2="37" stroke={stats.finishColor} strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="270" y1="25" x2="350" y2="37" stroke={stats.finishColor} strokeWidth="1.5" strokeDasharray="4 2" />

              {/* Vertical Support Columns */}
              <rect x="40" y="37" width="14" height="40" fill="rgba(255,255,255,0.1)" stroke={stats.finishColor} strokeWidth="1.5" />
              <rect x="326" y="37" width="14" height="40" fill="rgba(255,255,255,0.1)" stroke={stats.finishColor} strokeWidth="1.5" />

              {/* Dimension Arrow Line */}
              <line x1="30" y1="82" x2="350" y2="82" stroke="#94A3B8" strokeWidth="1" />
              <polyline points="35,79 30,82 35,85" fill="none" stroke="#94A3B8" strokeWidth="1" />
              <polyline points="345,79 350,82 345,85" fill="none" stroke="#94A3B8" strokeWidth="1" />
              <text x="190" y="80" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontFamily="monospace">
                SPAN LENGTH: {length} METERS ({gauge}mm GAUGE)
              </text>
            </svg>
          </div>

          <div className="industrial-footer-row">
            <span className="fab-time-pill"><Clock size={11} /> Est. Lead Time: <strong>{stats.fabDays} Working Days</strong></span>
            <a
              href="https://devidevanindustries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="live-site-link"
            >
              <span>Visit Client Website</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

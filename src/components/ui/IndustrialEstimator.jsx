import { useState, useMemo } from 'react';
import { Droplet, ShieldCheck, Package, ExternalLink, Scale, Clock, Sparkles } from 'lucide-react';
import './Simulators.css';

const OIL_GRADES = [
  { id: 'extra-virgin', label: 'Cold-Pressed Virgin Coconut Oil', copraFactor: 1.62, yieldPct: 62, purity: '99.9%' },
  { id: 'traditional', label: 'Traditional Roasted Coconut Oil', copraFactor: 1.55, yieldPct: 64.5, purity: '99.5%' },
  { id: 'pure-edible', label: 'Pure Edible Cooking Coconut Oil', copraFactor: 1.50, yieldPct: 66, purity: '99.2%' },
];

const PACKAGING_TYPES = [
  { id: 'glass', label: '1L Food-Grade Glass Jars', unitLitres: 1 },
  { id: 'tin', label: '5L Protective Tin Cans', unitLitres: 5 },
  { id: 'bulk-can', label: '15L Wholesale Metal Cans', unitLitres: 15 },
  { id: 'barrel', label: '200L Industrial HDPE Drums', unitLitres: 200 },
];

export function IndustrialEstimator() {
  const [gradeId, setGradeId] = useState('extra-virgin');
  const [litres, setLitres] = useState(250);
  const [packId, setPackId] = useState('tin');

  const stats = useMemo(() => {
    const grade = OIL_GRADES.find(g => g.id === gradeId) || OIL_GRADES[0];
    const pack = PACKAGING_TYPES.find(p => p.id === packId) || PACKAGING_TYPES[0];

    const copraKg = Math.round(litres * grade.copraFactor);
    const coconutsCount = Math.round(copraKg * 6.8); // avg ~6.8 mature coconuts per kg copra
    const units = Math.ceil(litres / pack.unitLitres);
    const leadDays = Math.max(2, Math.ceil(litres / 200) + 1);

    return {
      copraKg,
      coconutsCount,
      units,
      leadDays,
      yieldPct: grade.yieldPct,
      purity: grade.purity,
      packLabel: pack.label,
      gradeLabel: grade.label,
    };
  }, [gradeId, litres, packId]);

  return (
    <div className="simulator-box simulator-box--industrial">
      <div className="simulator-header">
        <div className="simulator-title-group">
          <div className="simulator-icon-badge simulator-icon-badge--crimson">
            <Droplet size={16} />
          </div>
          <div>
            <h4 className="simulator-title">DEVI DEVAN COCONUT OIL BATCH &amp; YIELD ESTIMATOR</h4>
            <p className="simulator-subtitle">Cold-Pressed Extraction &amp; Bulk Commercial Order Calculator</p>
          </div>
        </div>
        <div className="simulator-status-badge simulator-status-badge--crimson">
          <span className="live-pulse-dot live-pulse-dot--red" />
          <span>PRODUCTION LINE ONLINE</span>
        </div>
      </div>

      <div className="simulator-grid">
        {/* CONTROLS */}
        <div className="simulator-controls-col">
          <div className="control-group">
            <span className="control-label"><Sparkles size={12} /> Coconut Oil Grade</span>
            <select
              value={gradeId}
              onChange={(e) => setGradeId(e.target.value)}
              className="simulator-select"
            >
              {OIL_GRADES.map(g => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <div className="control-label-row">
              <span className="control-label"><Scale size={12} /> Required Batch Volume</span>
              <span className="control-val">{litres} Litres</span>
            </div>
            <input
              type="range"
              min="25"
              max="1500"
              step="25"
              value={litres}
              onChange={(e) => setLitres(Number(e.target.value))}
              className="simulator-slider simulator-slider--crimson"
            />
            <div className="slider-ticks">
              <span>25L (Sample)</span>
              <span>500L (Commercial)</span>
              <span>1500L (Industrial)</span>
            </div>
          </div>

          <div className="control-group">
            <span className="control-label"><Package size={12} /> Commercial Packaging Type</span>
            <select
              value={packId}
              onChange={(e) => setPackId(e.target.value)}
              className="simulator-select"
            >
              {PACKAGING_TYPES.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* OUTPUT METRICS & PROCESS FLOW */}
        <div className="simulator-output-col">
          <div className="sim-metrics-grid">
            <div className="sim-metric-card sim-metric-card--crimson">
              <span className="sim-metric-label">RAW COPRA REQUIRED</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num text-crimson">{stats.copraKg.toLocaleString()}</span>
                <span className="sim-metric-unit">kg</span>
              </div>
              <span className="sim-metric-sub">≈ {stats.coconutsCount.toLocaleString()} Fresh Coconuts</span>
            </div>

            <div className="sim-metric-card sim-metric-card--dark">
              <span className="sim-metric-label">PACKAGED UNITS</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num">{stats.units.toLocaleString()}</span>
                <span className="sim-metric-unit">units</span>
              </div>
              <span className="sim-metric-sub">Purity: {stats.purity} · Yield: {stats.yieldPct}%</span>
            </div>
          </div>

          {/* EXTRACTION PROCESS FLOW DIAGRAM */}
          <div className="industrial-blueprint-box">
            <div className="blueprint-topbar">
              <span>EXTRACTION &amp; REFINEMENT PIPELINE</span>
              <span className="blueprint-tag" style={{ color: '#F59E0B' }}>
                ● 100% Pure &amp; Natural
              </span>
            </div>

            <svg viewBox="0 0 380 90" className="blueprint-svg">
              <pattern id="gridPatternOil" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#gridPatternOil)" />

              {/* Step 1: Mature Copra */}
              <rect x="15" y="24" width="70" height="36" rx="4" fill="rgba(255,255,255,0.06)" stroke="#94A3B8" strokeWidth="1" />
              <text x="50" y="42" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="600" fontFamily="sans-serif">Sun-Dried</text>
              <text x="50" y="53" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Copra Prep</text>

              {/* Arrow 1 */}
              <line x1="87" y1="42" x2="105" y2="42" stroke="#FF3B5C" strokeWidth="1.5" />
              <polygon points="105,39 110,42 105,45" fill="#FF3B5C" />

              {/* Step 2: Cold Press Exeller */}
              <rect x="112" y="24" width="74" height="36" rx="4" fill="rgba(255,59,92,0.12)" stroke="#FF3B5C" strokeWidth="1.2" />
              <text x="149" y="42" textAnchor="middle" fill="#FDA4AF" fontSize="9" fontWeight="600" fontFamily="sans-serif">Cold Press</text>
              <text x="149" y="53" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontFamily="sans-serif">Exeller Mill</text>

              {/* Arrow 2 */}
              <line x1="188" y1="42" x2="206" y2="42" stroke="#FF3B5C" strokeWidth="1.5" />
              <polygon points="206,39 211,42 206,45" fill="#FF3B5C" />

              {/* Step 3: Multi-Stage Filtration */}
              <rect x="213" y="24" width="74" height="36" rx="4" fill="rgba(255,255,255,0.06)" stroke="#94A3B8" strokeWidth="1" />
              <text x="250" y="42" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="600" fontFamily="sans-serif">Micro-Filter</text>
              <text x="250" y="53" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Multi-Stage</text>

              {/* Arrow 3 */}
              <line x1="289" y1="42" x2="307" y2="42" stroke="#10B981" strokeWidth="1.5" />
              <polygon points="307,39 312,42 307,45" fill="#10B981" />

              {/* Step 4: Final Packaging */}
              <rect x="314" y="24" width="54" height="36" rx="4" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.2" />
              <text x="341" y="42" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontWeight="600" fontFamily="sans-serif">Bottling</text>
              <text x="341" y="53" textAnchor="middle" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">&amp; QA Sealed</text>

              {/* Bottom line */}
              <text x="190" y="77" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="monospace">
                BATCH TARGET: {litres}L · {stats.packLabel}
              </text>
            </svg>
          </div>

          <div className="industrial-footer-row">
            <span className="fab-time-pill"><Clock size={11} /> Est. Lead Time: <strong>{stats.leadDays} Days</strong></span>
            <a
              href="https://devidevanindustries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="live-site-link"
            >
              <span>Visit devidevanindustries.com</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

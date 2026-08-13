import { useState, useMemo } from 'react';
import { BarChart2, Calendar, CloudSun, Users } from 'lucide-react';
import './Simulators.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const DAY_FACTORS = { Monday: 1.05, Tuesday: 0.98, Wednesday: 1.02, Thursday: 1.0, Friday: 1.15 };

const WEATHERS = [
  { id: 'Sunny', label: 'Sunny ☀️', factor: 1.0 },
  { id: 'Rainy', label: 'Rainy 🌧️', factor: 1.18 },
  { id: 'Cold', label: 'Cold ❄️', factor: 1.08 },
];

export function SmartCanteenSimulator() {
  const [attendance, setAttendance] = useState(650);
  const [day, setDay] = useState('Wednesday');
  const [weather, setWeather] = useState('Sunny');
  const [isSpecialEvent, setIsSpecialEvent] = useState(false);

  // Interactive Real-Time Prediction Logic Engine
  const stats = useMemo(() => {
    const dayFactor = DAY_FACTORS[day] || 1.0;
    const weatherObj = WEATHERS.find(w => w.id === weather) || WEATHERS[0];
    const eventFactor = isSpecialEvent ? 1.25 : 1.0;

    const basePredicted = Math.round(attendance * 0.72 * dayFactor * weatherObj.factor * eventFactor);
    const wasteSavedKg = Math.round(basePredicted * 0.135);
    const wasteSavedPercent = Math.min(42, Math.round(24 + (attendance / 100) * 1.4));
    
    const riceKg = Math.round(basePredicted * 0.12);
    const vegKg = Math.round(basePredicted * 0.085);
    const proteinKg = Math.round(basePredicted * 0.075);

    // Hourly demand curve calculation
    const peakMeals = Math.round(basePredicted * 0.55);
    const breakfast = Math.round(basePredicted * 0.22);
    const snacks = Math.round(basePredicted * 0.23);

    // Dynamic SVG chart path points calculation
    const yMax = 100;
    const hBreak = Math.max(15, yMax - (breakfast / (attendance * 0.5)) * yMax);
    const hPeak = Math.max(10, yMax - (peakMeals / (attendance * 0.8)) * yMax);
    const hSnack = Math.max(20, yMax - (snacks / (attendance * 0.5)) * yMax);

    const pathD = `M 20 85 Q 80 ${hBreak.toFixed(1)}, 160 ${hPeak.toFixed(1)} T 280 ${hSnack.toFixed(1)} T 360 80`;
    const areaD = `${pathD} L 360 105 L 20 105 Z`;

    return {
      predictedMeals: basePredicted,
      wasteSavedKg,
      wasteSavedPercent,
      riceKg,
      vegKg,
      proteinKg,
      breakfast,
      peakMeals,
      snacks,
      pathD,
      areaD,
      peakY: hPeak,
      confidence: (94.2 + (attendance % 7) * 0.1).toFixed(1),
    };
  }, [attendance, day, weather, isSpecialEvent]);

  return (
    <div className="simulator-box simulator-box--canteen">
      <div className="simulator-header">
        <div className="simulator-title-group">
          <div className="simulator-icon-badge simulator-icon-badge--green">
            <BarChart2 size={16} />
          </div>
          <div>
            <h4 className="simulator-title">SMART CANTEEN ML DEMAND FORECASTER</h4>
            <p className="simulator-subtitle">Interactive Food Demand &amp; Waste Reduction Simulation Engine</p>
          </div>
        </div>
        <div className="simulator-status-badge">
          <span className="live-pulse-dot" />
          <span>ML ENGINE ACTIVE</span>
        </div>
      </div>

      <div className="simulator-grid">
        {/* LEFT: CONTROLS & PARAMETERS */}
        <div className="simulator-controls-col">
          <div className="control-group">
            <div className="control-label-row">
              <span className="control-label"><Users size={12} /> Expected Student Attendance</span>
              <span className="control-val">{attendance} students</span>
            </div>
            <input
              type="range"
              min="150"
              max="1200"
              step="25"
              value={attendance}
              onChange={(e) => setAttendance(Number(e.target.value))}
              className="simulator-slider simulator-slider--green"
            />
            <div className="slider-ticks">
              <span>150 (Low)</span>
              <span>650 (Avg)</span>
              <span>1200 (Max)</span>
            </div>
          </div>

          <div className="control-row-dual">
            <div className="control-group">
              <span className="control-label"><Calendar size={12} /> Day of Week</span>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="simulator-select"
              >
                {DAYS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <span className="control-label"><CloudSun size={12} /> Weather</span>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="simulator-select"
              >
                {WEATHERS.map(w => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="control-toggle-row">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={isSpecialEvent}
                onChange={(e) => setIsSpecialEvent(e.target.checked)}
                className="simulator-checkbox"
              />
              <span className="toggle-custom" />
              <span className="toggle-text">Campus Event / Cultural Fest (+25% Surge)</span>
            </label>
          </div>
        </div>

        {/* RIGHT: LIVE OUTPUT METRICS & GRAPH */}
        <div className="simulator-output-col">
          <div className="sim-metrics-grid">
            <div className="sim-metric-card sim-metric-card--primary">
              <span className="sim-metric-label">FORECASTED MEALS</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num">{stats.predictedMeals}</span>
                <span className="sim-metric-unit">plates</span>
              </div>
              <span className="sim-metric-sub">R² Confidence: {stats.confidence}%</span>
            </div>

            <div className="sim-metric-card sim-metric-card--green">
              <span className="sim-metric-label">ESTIMATED WASTE SAVINGS</span>
              <div className="sim-metric-val-group">
                <span className="sim-metric-num text-green">-{stats.wasteSavedPercent}%</span>
                <span className="sim-metric-unit">({stats.wasteSavedKg} kg)</span>
              </div>
              <span className="sim-metric-sub">Target: Zero Daily Spoilage</span>
            </div>
          </div>

          {/* DYNAMIC CHART */}
          <div className="sim-chart-container">
            <div className="sim-chart-header">
              <span>LIVE DEMAND CURVE (HOURLY)</span>
              <div className="sim-chart-legend">
                <span className="chart-tag"><span className="tag-dot tag-dot--green" /> ML Forecast</span>
              </div>
            </div>

            <svg viewBox="0 0 380 110" className="sim-svg-chart">
              <defs>
                <linearGradient id="simCanteenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="25" x2="380" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="55" x2="380" y2="55" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1="0" y1="85" x2="380" y2="85" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

              {/* Dynamic Path */}
              <path d={stats.areaD} fill="url(#simCanteenGrad)" />
              <path d={stats.pathD} fill="none" stroke="#22C55E" strokeWidth="2.5" className="sim-path-anim" />

              {/* Data points */}
              <circle cx="80" cy="55" r="4" fill="#22C55E" />
              <circle cx="160" cy={stats.peakY} r="5" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="280" cy="65" r="4" fill="#22C55E" />

              {/* Peak Callout */}
              <g transform={`translate(115, ${Math.max(2, stats.peakY - 18)})`}>
                <rect x="0" y="0" width="90" height="15" rx="3" fill="rgba(34, 197, 94, 0.25)" stroke="#22C55E" strokeWidth="1" />
                <text x="45" y="11" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  PEAK {stats.peakMeals} MEALS
                </text>
              </g>
            </svg>
          </div>

          {/* INGREDIENT RECIPE BREAKDOWN */}
          <div className="recipe-breakdown-bar">
            <span className="breakdown-title">RECOMMENDED KITCHEN PREP:</span>
            <div className="breakdown-pills">
              <span className="prep-pill">🌾 Rice: <strong>{stats.riceKg} kg</strong></span>
              <span className="prep-pill">🥦 Veggies: <strong>{stats.vegKg} kg</strong></span>
              <span className="prep-pill">🍗 Protein: <strong>{stats.proteinKg} kg</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

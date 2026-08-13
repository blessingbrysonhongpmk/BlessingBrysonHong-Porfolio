import { useState, useEffect } from 'react';
import { Eye, ShieldAlert, AlertTriangle, Camera, Cpu, Radio, CheckCircle2 } from 'lucide-react';
import './Simulators.css';

const CAMERAS = [
  { id: 'cam01', label: 'CAM-01 [Main Gate Quad]', location: 'Sector A Entrance' },
  { id: 'cam02', label: 'CAM-02 [Library Walkway]', location: 'Central Academic Block' },
  { id: 'cam03', label: 'CAM-03 [AI & DS Lab Hall]', location: 'Tech Block 2nd Floor' },
];

const VISION_MODES = [
  { id: 'bbox', label: 'Object Bounding Box', color: '#EAB308' },
  { id: 'thermal', label: 'Thermal IR Heatmap', color: '#EF4444' },
  { id: 'edges', label: 'Sobel Contour Edges', color: '#38BDF8' },
];

export function CampusSafetySimulator() {
  const [camera, setCamera] = useState('cam01');
  const [mode, setMode] = useState('bbox');
  const [alertType, setAlertType] = useState('none'); // 'none' | 'intrusion' | 'fire'
  const [scanPulse, setScanPulse] = useState(0);

  // Scan line animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const selectedCamObj = CAMERAS.find(c => c.id === camera) || CAMERAS[0];

  return (
    <div className="simulator-box simulator-box--safety">
      <div className="simulator-header">
        <div className="simulator-title-group">
          <div className="simulator-icon-badge simulator-icon-badge--amber">
            <Eye size={16} />
          </div>
          <div>
            <h4 className="simulator-title">CAMPUS SAFETY COMPUTER VISION SIMULATOR</h4>
            <p className="simulator-subtitle">Real-Time Video Stream Hazard &amp; Anomaly Detection Prototype</p>
          </div>
        </div>
        <div className="simulator-status-badge simulator-status-badge--amber">
          <span className="live-pulse-dot live-pulse-dot--yellow" />
          <span>RESEARCH PROTOTYPE</span>
        </div>
      </div>

      <div className="simulator-grid">
        {/* CONTROLS */}
        <div className="simulator-controls-col">
          <div className="control-group">
            <span className="control-label"><Camera size={12} /> Active Camera Stream</span>
            <select
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="simulator-select"
            >
              {CAMERAS.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <span className="control-label"><Cpu size={12} /> CV Processing Filter Layer</span>
            <div className="cv-mode-pills">
              {VISION_MODES.map(m => (
                <button
                  key={m.id}
                  className={`cv-mode-pill ${mode === m.id ? 'active' : ''}`}
                  onClick={() => setMode(m.id)}
                  style={{ '--mode-color': m.color }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <span className="control-label"><Radio size={12} /> Hazard Event Simulator</span>
            <div className="hazard-btn-group">
              <button
                className={`hazard-btn hazard-btn--intrusion ${alertType === 'intrusion' ? 'active' : ''}`}
                onClick={() => setAlertType(alertType === 'intrusion' ? 'none' : 'intrusion')}
              >
                <AlertTriangle size={13} />
                <span>Trigger Intrusion</span>
              </button>

              <button
                className={`hazard-btn hazard-btn--fire ${alertType === 'fire' ? 'active' : ''}`}
                onClick={() => setAlertType(alertType === 'fire' ? 'none' : 'fire')}
              >
                <ShieldAlert size={13} />
                <span>Trigger Smoke Alert</span>
              </button>
            </div>
          </div>
        </div>

        {/* LIVE SIMULATED FEED HUD */}
        <div className="simulator-output-col">
          <div className={`cv-camera-feed cv-camera-feed--${mode} ${alertType !== 'none' ? 'cv-camera-feed--alert' : ''}`}>
            {/* Top Bar HUD */}
            <div className="cv-hud-topbar">
              <div className="cv-hud-left">
                <span className="rec-dot" />
                <span className="cam-name">{selectedCamObj.label}</span>
              </div>
              <div className="cv-hud-right">
                <span className="hud-metric">FPS: <strong>30.2</strong></span>
                <span className="hud-metric">LATENCY: <strong>14ms</strong></span>
              </div>
            </div>

            {/* Simulated Frame Canvas View */}
            <div className="cv-frame-viewport">
              {/* Scanline line */}
              <div className="cv-scanline" style={{ top: `${scanPulse}%` }} />

              {/* Grid HUD Overlay */}
              <svg viewBox="0 0 380 140" className="cv-svg-hud">
                <defs>
                  <radialGradient id="thermalHeat" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                  </radialGradient>
                </defs>

                {/* Thermal Gradient overlay if thermal mode */}
                {mode === 'thermal' && (
                  <ellipse cx="200" cy="70" rx="90" ry="45" fill="url(#thermalHeat)" />
                )}

                {/* Edge mode contours */}
                {mode === 'edges' && (
                  <path d="M 40 120 L 120 40 L 260 40 L 340 120 M 120 40 L 120 120 M 260 40 L 260 120" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                )}

                {/* Corner Crosshairs */}
                <path d="M 20 30 L 20 20 L 30 20 M 360 20 L 360 30 M 350 20 L 360 20 M 20 110 L 20 120 L 30 120 M 360 120 L 360 110 M 350 120 L 360 120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />

                {/* Simulated Target Detection Box if Alert or BBox */}
                {alertType === 'intrusion' && (
                  <g transform="translate(130, 25)">
                    <rect x="0" y="0" width="120" height="90" fill="rgba(239, 68, 68, 0.15)" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" className="alert-rect-pulse" />
                    <rect x="0" y="0" width="120" height="18" fill="#EF4444" />
                    <text x="60" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      ⚠️ UNAUTHORIZED ENTRY (98.6%)
                    </text>
                  </g>
                )}

                {alertType === 'fire' && (
                  <g transform="translate(150, 30)">
                    <rect x="0" y="0" width="100" height="80" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" strokeWidth="2" />
                    <rect x="0" y="0" width="100" height="18" fill="#F59E0B" />
                    <text x="50" y="13" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      🔥 SMOKE DETECTED (97.4%)
                    </text>
                  </g>
                )}

                {alertType === 'none' && (
                  <g transform="translate(140, 35)">
                    <rect x="0" y="0" width="100" height="70" fill="none" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="2 2" />
                    <rect x="0" y="0" width="100" height="15" fill="rgba(234, 179, 8, 0.2)" />
                    <text x="50" y="11" textAnchor="middle" fill="#EAB308" fontSize="8" fontFamily="monospace">
                      PERSON DETECTED (94.1%)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom Status Banner */}
            <div className="cv-hud-bottombar">
              {alertType === 'none' ? (
                <div className="status-banner status-banner--normal">
                  <CheckCircle2 size={12} />
                  <span>CAMERA MONITORING ACTIVE · NO HAZARDS DETECTED</span>
                </div>
              ) : (
                <div className="status-banner status-banner--alert">
                  <AlertTriangle size={12} />
                  <span>CRITICAL ALERT: AUTOMATED BROADCAST SENT TO DISPATCH</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

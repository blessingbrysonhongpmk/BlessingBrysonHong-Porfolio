import { useState } from 'react';
import { Cpu, ArrowRight, Database, Server, Monitor, ShieldCheck, Terminal, Layers } from 'lucide-react';
import './Simulators.css';

const BLUEPRINTS = [
  {
    id: 'smart-canteen',
    title: 'Smart Canteen AI — ML Data Pipeline Architecture',
    steps: [
      { step: '01', title: 'Data Ingestion', desc: 'Historical daily transaction records, weather logs & calendar events ingested via Pandas', icon: Database, color: '#22C55E' },
      { step: '02', title: 'Feature Engineering', desc: 'Day-of-week encoding, seasonal demand trends & rolling average transformations', icon: Cpu, color: '#22C55E' },
      { step: '03', title: 'ML Regression Model', desc: 'Supervised regression model predicts item-level demand with 94.2% R² accuracy', icon: Server, color: '#22C55E' },
      { step: '04', title: 'Streamlit UI Dashboard', desc: 'Interactive decision dashboard presenting daily kitchen prep forecasts & waste alerts', icon: Monitor, color: '#22C55E' },
    ],
  },
  {
    id: 'devi-devan',
    title: 'Devi Devan Industries — Production Web Architecture',
    steps: [
      { step: '01', title: 'Client UI Design', desc: 'Modern industrial dark aesthetic designed for high visibility and lead acquisition', icon: Layers, color: '#DC143C' },
      { step: '02', title: 'Modular React Components', desc: 'Vite-powered React architecture ensuring sub-second load times and modular sections', icon: Cpu, color: '#DC143C' },
      { step: '03', title: 'Responsive Optimization', desc: 'Fluid typography, glassmorphic cards, and custom CSS design token system', icon: Monitor, color: '#DC143C' },
      { step: '04', title: 'Production Live Deploy', desc: 'Deployed with SSL security driving client presence at devidevanindustries.com', icon: ShieldCheck, color: '#DC143C' },
    ],
  },
  {
    id: 'aluminium-fabrication',
    title: 'Aluminium Portal — Full-Stack Decoupled System',
    steps: [
      { step: '01', title: 'React Catalog Frontend', desc: 'Dynamic catalog interface presenting custom aluminum window & door lines', icon: Monitor, color: '#3B82F6' },
      { step: '02', title: 'REST API Gateway', desc: 'JSON endpoints serving structural product specifications and category data', icon: Server, color: '#3B82F6' },
      { step: '03', title: 'Django Backend Engine', desc: 'Python Django models managing product categories, inquiry quotes & admin records', icon: Terminal, color: '#3B82F6' },
      { step: '04', title: 'Database Store', desc: 'Relational database housing structural specs, anodizing finishes & client inquiries', icon: Database, color: '#3B82F6' },
    ],
  },
  {
    id: 'campus-safety',
    title: 'Campus Safety AI — Vision Pipeline Architecture',
    steps: [
      { step: '01', title: 'CCTV Stream Capture', desc: 'Real-time frame sampling from campus surveillance camera feeds', icon: CameraIcon, color: '#EAB308' },
      { step: '02', title: 'OpenCV Pre-processing', desc: 'Frame noise filtering, resize normalization & contour edge extraction', icon: Cpu, color: '#EAB308' },
      { step: '03', title: 'Anomaly Classifier', desc: 'Model detects hazard markers (smoke, fire, perimeter intrusion)', icon: ShieldCheck, color: '#EAB308' },
      { step: '04', title: 'HUD Alert Overlay', desc: 'Real-time visual alert flags and automated emergency alert dispatching', icon: Monitor, color: '#EAB308' },
    ],
  },
];

function CameraIcon(props) {
  return <Terminal {...props} />;
}

export function ProductArchitectureBlueprint() {
  const [activeBlueprintId, setActiveBlueprintId] = useState('smart-canteen');

  const currentBlueprint = BLUEPRINTS.find(b => b.id === activeBlueprintId) || BLUEPRINTS[0];

  return (
    <div className="blueprint-section-container">
      {/* Selector Tabs */}
      <div className="blueprint-nav-tabs">
        {BLUEPRINTS.map(b => (
          <button
            key={b.id}
            className={`blueprint-tab-btn ${activeBlueprintId === b.id ? 'active' : ''}`}
            onClick={() => setActiveBlueprintId(b.id)}
          >
            <span>{b.title.split('—')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Flow Box */}
      <div className="blueprint-flow-card">
        <h4 className="blueprint-flow-title">{currentBlueprint.title}</h4>

        <div className="blueprint-pipeline-row">
          {currentBlueprint.steps.map((s, idx) => {
            const IconComponent = s.icon;
            const isLast = idx === currentBlueprint.steps.length - 1;

            return (
              <div key={s.step} className="blueprint-step-wrapper">
                <div className="blueprint-step-card" style={{ '--step-color': s.color }}>
                  <div className="step-badge">{s.step}</div>
                  <div className="step-icon-box" style={{ color: s.color }}>
                    <IconComponent size={20} />
                  </div>
                  <h5 className="step-title">{s.title}</h5>
                  <p className="step-desc">{s.desc}</p>
                </div>

                {!isLast && (
                  <div className="blueprint-arrow-connector">
                    <div className="pulse-arrow-dot" style={{ backgroundColor: s.color }} />
                    <ArrowRight size={16} className="connector-icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

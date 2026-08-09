import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { 
  GraduationCap, 
  Trophy, 
  BarChart, 
  Database, 
  Code, 
  Globe, 
  Brain, 
  Shield, 
  ArrowUp 
} from 'lucide-react';
import './Journey.css';

const ICON_MAP = {
  graduationCap: GraduationCap,
  trophy: Trophy,
  barChart: BarChart,
  database: Database,
  code: Code,
  globe: Globe,
  brain: Brain,
  shield: Shield,
  arrowUp: ArrowUp,
};

// Custom Hook to manage the active node index
function useJourneyProgress(itemsCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      // Find the node closest to the center of the viewport
      const viewportCenter = window.innerHeight * 0.5;
      
      let closestIndex = 0;
      let minDistance = Infinity;

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        // Calculate the distance from the node's center to the viewport center
        const nodeCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - nodeCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [itemsCount]);

  return { activeIndex, nodeRefs };
}

export function Journey() {
  const { journey, experience, education, hackathons } = PORTFOLIO_DATA;
  const { activeIndex, nodeRefs } = useJourneyProgress(journey.length);

  return (
    <section id="journey" className="journey-section">
      <div className="journey-bg-grid" />
      
      <div className="container journey-container">
        {/* Header */}
        <div className="journey-header">
          <span className="journey-label">MY PATH</span>
          <h2 className="journey-title">The <span className="text-gradient">Journey</span></h2>
          <p className="journey-intro">
            From curiosity to creation — every step, every project,<br/>
            every experience shapes where I'm heading next.
          </p>
        </div>

        <div className="journey-layout">
          {/* Main Timeline Interactive Path */}
          <div className="journey-timeline">
            
            {/* The continuous path line */}
            <div className="journey-path-line">
              {/* The BBH Signal (Moving Light) */}
              <div 
                className="journey-signal" 
                style={{ 
                  transform: `translateY(${activeIndex * 100}%)`,
                  top: `calc(${activeIndex} * (100% / ${Math.max(1, journey.length - 1)}))`
                }}
              />
            </div>

            <div className="journey-nodes">
              {journey.map((item, i) => {
                const Icon = ICON_MAP[item.icon] || Code;
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;

                return (
                  <div 
                    key={i} 
                    className={`journey-node ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''} ${item.isNext ? 'is-next' : ''}`}
                    ref={(el) => (nodeRefs.current[i] = el)}
                  >
                    {/* Left: Year & Label */}
                    <div className="node-meta">
                      <span className="node-year">{item.isNext ? 'NEXT' : item.year}</span>
                      {item.subLabel && <span className="node-sublabel">{item.subLabel}</span>}
                    </div>

                    {/* Center: Interactive Icon Node */}
                    <div className="node-center">
                      <div className="node-connector-line" />
                      <div className="node-icon-box">
                        <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                      </div>
                    </div>

                    {/* Right: Content Card */}
                    <div className="node-content">
                      <div className="node-content-inner">
                        <div className="node-content-header">
                          <h3 className="node-title">{item.title}</h3>
                          {item.tag && <span className={`node-tag tag-${item.tag.toLowerCase().replace(/\s+/g, '-')}`}>{item.tag}</span>}
                        </div>
                        <p className="node-desc">{item.description}</p>
                        {item.tech && <p className="node-tech">{item.tech}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Complementary Side Panels */}
          <div className="journey-side">
            
            {/* Experience */}
            <div className="side-panel">
              <h4 className="side-panel-heading"><span className="red-dot"/> EXPERIENCE</h4>
              <div className="side-list">
                {experience.map((exp, i) => (
                  <div key={i} className="side-item">
                    <div className="side-item-header">
                      <span className="side-item-title">{exp.company}</span>
                      <span className="side-item-year">{exp.period}</span>
                    </div>
                    <span className="side-item-desc">{exp.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="side-panel">
              <h4 className="side-panel-heading"><span className="red-dot"/> EDUCATION</h4>
              <div className="side-list">
                {education.map((edu, i) => (
                  <div key={i} className="side-item">
                    <div className="side-item-header">
                      <span className="side-item-title">{edu.degree}</span>
                      <span className="side-item-year">{edu.period}</span>
                    </div>
                    <span className="side-item-desc">{edu.institution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hackathons */}
            <div className="side-panel">
              <h4 className="side-panel-heading"><span className="red-dot"/> HACKATHONS</h4>
              <div className="side-list">
                <div className="side-item">
                  <span className="side-item-title">Multiple Hackathons</span>
                  <span className="side-item-desc">Participated in numerous hackathons from first year.</span>
                  <span className="side-item-tech text-accent">{hackathons.note}</span>
                </div>
              </div>
            </div>

            {/* Philosophy Block */}
            <div className="side-philosophy">
              <h4 className="side-panel-heading"><QuoteIcon /> PHILOSOPHY</h4>
              <p className="philosophy-text">
                I don't just learn to pass exams.<br/>
                I learn to build things that matter.
              </p>
              <span className="philosophy-author">— BBH.</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="red-dot-icon">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

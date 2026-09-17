import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Code2, Globe, Cpu, Wrench } from 'lucide-react';
import { gsap } from '../../utils/scrollOrchestrator';
import './Skills.css';

const CATEGORY_META = {
  'PROGRAMMING': { icon: Code2, code: 'MOD_01', tag: 'CORE LOGIC' },
  'WEB DEVELOPMENT': { icon: Globe, code: 'MOD_02', tag: 'APPLICATION LAYER' },
  'DATA & AI': { icon: Cpu, code: 'MOD_03', tag: 'INTELLIGENCE LAYER' },
  'TOOLS & ENVIRONMENTS': { icon: Wrench, code: 'MOD_04', tag: 'DEV INFRASTRUCTURE' },
};

export function Skills() {
  const { skillCategories } = PORTFOLIO_DATA;
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsSectionRef = useRef(null);
  const modulesGridRef = useRef(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = modulesGridRef.current?.querySelectorAll('.skill-module-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: modulesGridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, skillsSectionRef);

    return () => ctx.revert();
  }, []);

  const filters = ['ALL', 'COMFORTABLE', 'WORKING KNOWLEDGE', 'EXPLORING'];

  return (
    <section id="skills" className="skills-section" ref={skillsSectionRef} aria-label="Skills and Technical Stack">
      <div className="container skills-container">
        
        {/* Section Header Meta */}
        <div className="skills-header-meta">
          <span className="section-index-num">03</span>
          <span className="section-index-title">CAPABILITIES &amp; ARCHITECTURE</span>
          <div className="section-index-line" />
        </div>

        {/* Section Headline */}
        <div className="skills-intro-block">
          <div className="skills-title-row">
            <h2 className="skills-title">
              Technical <span className="text-gradient-crimson">Proficiency</span>
            </h2>
            <p className="skills-subtitle">
              Classified by concrete implementation readiness across production pipelines, web frameworks, and machine learning models. No artificial percentage bars.
            </p>
          </div>

          {/* Proficiency Filter Bar */}
          <div className="skills-filter-track" role="tablist" aria-label="Filter skills by status">
            {filters.map((f) => (
              <button
                key={f}
                className={`skills-filter-btn ${activeFilter === f ? 'skills-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f)}
                role="tab"
                aria-selected={activeFilter === f}
              >
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4 Categorized Modules Grid */}
        <div className="skills-modules-grid" ref={modulesGridRef}>
          {skillCategories.map((cat) => {
            const meta = CATEGORY_META[cat.category] || { icon: Code2, code: 'MOD', tag: 'SYSTEM' };
            const IconComponent = meta.icon;

            const filteredSkills = cat.skills.filter((skill) => {
              if (activeFilter === 'ALL') return true;
              return skill.status.toUpperCase() === activeFilter;
            });

            if (filteredSkills.length === 0) return null;

            return (
              <div key={cat.category} className="skill-module-card">
                
                {/* Module Top Bar */}
                <div className="module-topbar">
                  <div className="module-title-group">
                    <div className="module-icon-wrap">
                      <IconComponent size={14} className="text-primary" />
                    </div>
                    <div>
                      <span className="module-code">{meta.code} // {meta.tag}</span>
                      <h3 className="module-name">{cat.category}</h3>
                    </div>
                  </div>
                  <span className="module-count">{filteredSkills.length} SKILLS</span>
                </div>

                {/* Typography-Based Skills Presentation */}
                <div className="skills-chips-matrix">
                  {filteredSkills.map((skill) => {
                    const statusSlug = skill.status.toLowerCase().replace(/\s+/g, '-');
                    const isHovered = hoveredSkill === skill.name;

                    return (
                      <div
                        key={skill.name}
                        className={`skill-interactive-node ${isHovered ? 'is-active' : ''}`}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-node-header">
                          <span className="skill-node-name">{skill.name}</span>
                          <span className={`skill-status-pip status-pip--${statusSlug}`}>
                            {skill.status}
                          </span>
                        </div>
                        <p className="skill-node-desc">{skill.description}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Code2, Globe, Cpu, Wrench, ArrowRight } from 'lucide-react';
import './Skills.css';

const SKILL_CATEGORIES = [
  {
    name: 'Programming',
    icon: Code2,
    skills: ['Python', 'JavaScript'],
  },
  {
    name: 'Web / Full Stack',
    icon: Globe,
    skills: ['React', 'Vite', 'HTML & CSS', 'Django'],
  },
  {
    name: 'Data / AI',
    icon: Cpu,
    skills: ['Data Science', 'Machine Learning', 'Streamlit'],
  },
  {
    name: 'Tools / Systems',
    icon: Wrench,
    skills: ['Git', 'GitHub'],
  },
];

export function Skills() {
  const { skills, exploring, nextBuild } = PORTFOLIO_DATA;
  const [activeSkillName, setActiveSkillName] = useState(null);

  // Helper to find full skill metadata from portfolio data
  const getSkillMeta = (name) => {
    return skills.find(s => s.name.toLowerCase() === name.toLowerCase() || s.name.includes(name)) || {
      name,
      description: 'Applied in practical projects and engineering builds.',
      usedIn: ['BBH Projects'],
    };
  };

  return (
    <Section id="skills" title="Proof of Work" subtitle="Technical Field">
      <div className="skills-container">
        
        {/* Technical Field Grid (Categorized Nodes) */}
        <div className="skills-field-grid">
          {SKILL_CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.name} className="skill-category-card">
                <div className="category-header">
                  <CatIcon size={16} className="category-icon text-accent" />
                  <h3 className="category-title">{cat.name}</h3>
                </div>

                <div className="category-nodes">
                  {cat.skills.map((skillName) => {
                    const meta = getSkillMeta(skillName);
                    const isActive = activeSkillName === skillName;

                    return (
                      <div
                        key={skillName}
                        className={`skill-tech-node ${isActive ? 'is-active' : ''}`}
                        onClick={() => setActiveSkillName(isActive ? null : skillName)}
                        onMouseEnter={() => setActiveSkillName(skillName)}
                        onMouseLeave={() => setActiveSkillName(null)}
                      >
                        <div className="node-header">
                          <span className="node-dot" />
                          <span className="node-name">{skillName}</span>
                        </div>

                        {/* Interactive proof drawer */}
                        <div className="node-drawer">
                          <p className="node-desc">{meta.description}</p>
                          {meta.usedIn && (
                            <div className="node-used-in">
                              <span className="used-label">Used in:</span>
                              <div className="used-tags">
                                {meta.usedIn.map(proj => (
                                  <span key={proj} className="used-tag">{proj}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizon: Exploring & Next Build */}
        <div className="skills-horizon">
          {/* Currently Exploring */}
          <div className="horizon-block">
            <h4 className="horizon-heading">
              <span className="pulse-dot" /> CURRENTLY EXPLORING
            </h4>
            <div className="horizon-tags">
              {exploring.map(item => (
                <span key={item.name} className="horizon-tag tag--exploring">
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Next Build */}
          <div className="horizon-block">
            <h4 className="horizon-heading">
              <ArrowRight size={14} className="text-accent" /> NEXT BUILD
            </h4>
            <div className="horizon-tags">
              {nextBuild.map(item => (
                <span key={item.name} className="horizon-tag tag--next">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}

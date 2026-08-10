import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Code2, Globe, Cpu, Wrench } from 'lucide-react';
import './Skills.css';

const CATEGORY_ICONS = {
  'PROGRAMMING': Code2,
  'WEB DEVELOPMENT': Globe,
  'DATA & AI': Cpu,
  'TOOLS & ENVIRONMENTS': Wrench,
};

export function Skills() {
  const { skillCategories } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="skills-section" aria-label="Skills & Capabilities">
      <div className="container skills-container">
        
        {/* Section Header */}
        <div className="skills-header">
          <span className="section-label">TECHNICAL CAPABILITIES</span>
          <h2 className="skills-title">
            Skills & <span className="text-accent">Stack</span>
          </h2>
          <p className="skills-subtitle">
            Organized by working proficiency and application across projects. No arbitrary percentage metrics.
          </p>
        </div>

        {/* 4 Categorized Containers Grid */}
        <div className="skills-grid">
          {skillCategories.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.category] || Code2;
            return (
              <div key={cat.category} className="skill-category-box">
                <div className="cat-box-header">
                  <IconComponent size={16} className="cat-icon text-accent" />
                  <h3 className="cat-box-title">{cat.category}</h3>
                </div>

                <div className="skill-chips-list">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="skill-chip-card">
                      <div className="chip-top">
                        <span className="chip-name">{skill.name}</span>
                        <span className={`chip-badge badge--${skill.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {skill.status}
                        </span>
                      </div>
                      <p className="chip-desc">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

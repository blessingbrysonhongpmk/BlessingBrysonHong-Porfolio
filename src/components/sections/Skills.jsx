import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { ArrowRight } from 'lucide-react';
import './Skills.css';

export function Skills() {
  const { skills, exploring, nextBuild } = PORTFOLIO_DATA;
  const [activeSkill, setActiveSkill] = useState(null);

  const practicalSkills = skills.filter(s => s.status === 'practical');
  const learningSkills = skills.filter(s => s.status === 'learning');

  return (
    <Section id="skills" title="Proof of Work" subtitle="Skills & tools">
      <div className="skills">
        {/* Skill nodes */}
        <div className="skills__grid">
          {practicalSkills.map((skill) => (
            <button
              key={skill.name}
              className={`skill-node ${activeSkill === skill.name ? 'skill-node--active' : ''}`}
              onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
              aria-expanded={activeSkill === skill.name}
            >
              <span className="skill-node__name">{skill.name}</span>
              <span className="skill-node__indicator" />

              {activeSkill === skill.name && (
                <div className="skill-node__detail">
                  <p className="skill-node__desc">{skill.description}</p>
                  <div className="skill-node__used-in">
                    <span className="skill-node__used-label">Used in:</span>
                    {skill.usedIn.map(project => (
                      <span key={project} className="skill-node__project">{project}</span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Learning */}
        {learningSkills.length > 0 && (
          <div className="skills__learning">
            <h3 className="skills__section-title">
              <span className="skills__pulse" />
              Currently Exploring
            </h3>
            <div className="skills__exploring-list">
              {exploring.map(item => (
                <div key={item.name} className="skills__exploring-item">
                  <span className="skills__exploring-dot" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Build */}
        <div className="skills__next">
          <h3 className="skills__section-title">
            <ArrowRight size={16} />
            Next Build
          </h3>
          <div className="skills__next-list">
            {nextBuild.map(item => (
              <span key={item.name} className="skills__next-tag">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

import { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { 
  GraduationCap, 
  Trophy, 
  BarChart, 
  Code, 
  Globe, 
  Brain, 
  ArrowUp,
  Briefcase,
  BookOpen
} from 'lucide-react';
import './Journey.css';

const ICON_MAP = {
  graduationCap: GraduationCap,
  trophy: Trophy,
  barChart: BarChart,
  code: Code,
  globe: Globe,
  brain: Brain,
  arrowUp: ArrowUp,
};

export function Journey() {
  const { journey, experience, education } = PORTFOLIO_DATA;
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const activeMilestone = journey[activeMilestoneIndex] || journey[0];

  return (
    <section id="journey" className="journey-section" aria-label="Journey and Experience">
      <div className="container journey-container">
        
        {/* Section Header */}
        <div className="journey-header">
          <span className="section-label">JOURNEY & EXPERIENCE</span>
          <h2 className="journey-title">
            Chronological <span className="text-accent">Progression</span>
          </h2>
          <p className="journey-subtitle">
            From foundational engineering to data science, full-stack client delivery, and building toward AI engineering.
          </p>
        </div>

        <div className="journey-grid">
          
          {/* Left Column: Interactive Timeline List */}
          <div className="journey-timeline-col">
            <h3 className="column-heading">TIMELINE MILESTONES</h3>

            <div className="timeline-track">
              {journey.map((item, index) => {
                const IconComponent = ICON_MAP[item.icon] || (item.isNext ? ArrowUp : Code);
                const isSelected = activeMilestoneIndex === index;

                return (
                  <div
                    key={item.year + item.milestone}
                    className={`timeline-item ${isSelected ? 'timeline-item--selected' : ''} ${item.isNext ? 'timeline-item--next' : ''}`}
                    onClick={() => setActiveMilestoneIndex(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveMilestoneIndex(index)}
                  >
                    <div className="timeline-marker">
                      <span className="marker-dot" />
                      <div className="marker-icon">
                        <IconComponent size={14} />
                      </div>
                    </div>

                    <div className="timeline-summary">
                      <div className="timeline-meta">
                        <span className="timeline-year">{item.year}</span>
                        <span className="timeline-tag">{item.tag}</span>
                      </div>
                      <h4 className="timeline-milestone">{item.milestone}</h4>
                      <p className="timeline-snippet">{item.summary}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Breakdown & Official Internships */}
          <div className="journey-details-col">
            
            {/* Active Milestone Spotlight Panel */}
            <div className="spotlight-card">
              <div className="spotlight-header">
                <span className="spotlight-badge">{activeMilestone.year} · {activeMilestone.tag}</span>
                <h3 className="spotlight-title">{activeMilestone.milestone}</h3>
              </div>
              <p className="spotlight-summary">{activeMilestone.summary}</p>
              <div className="spotlight-details">
                <p>{activeMilestone.details}</p>
              </div>
            </div>

            {/* Official Internship Experience (STRICTLY 2 INTERNSHIPS ONLY) */}
            <div className="experience-card">
              <div className="card-header">
                <Briefcase size={16} className="text-accent" />
                <h3 className="card-title">INTERNSHIP EXPERIENCE</h3>
              </div>

              <div className="internship-list">
                {experience.map((exp) => (
                  <div key={exp.id} className="internship-item">
                    <div className="internship-top">
                      <h4 className="internship-company">{exp.company}</h4>
                      <span className="internship-period">{exp.period}</span>
                    </div>
                    <p className="internship-role">{exp.role}</p>
                    <p className="internship-desc">{exp.description}</p>
                    {exp.highlights && (
                      <ul className="internship-bullets">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Summary */}
            <div className="education-card">
              <div className="card-header">
                <BookOpen size={16} className="text-accent" />
                <h3 className="card-title">ACADEMIC FOUNDATION</h3>
              </div>

              <div className="education-list">
                {education.map((edu, idx) => (
                  <div key={idx} className="education-item">
                    <div className="education-top">
                      <h4 className="education-degree">{edu.degree}</h4>
                      <span className="education-period">{edu.period}</span>
                    </div>
                    <p className="education-institution">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

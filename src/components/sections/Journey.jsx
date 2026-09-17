import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { 
  Briefcase,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { gsap } from '../../utils/scrollOrchestrator';
import './Journey.css';

export function Journey() {
  const { journey, experience, education } = PORTFOLIO_DATA;
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const journeySectionRef = useRef(null);
  const laserRailRef = useRef(null);
  const expSidebarRef = useRef(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Scrub laser progress line down the milestone rail
      gsap.fromTo(
        laserRailRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-track-wrap',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.5,
            onUpdate: (self) => {
              const index = Math.min(
                journey.length - 1,
                Math.floor(self.progress * journey.length)
              );
              setActiveMilestoneIndex(index);
            },
          },
        }
      );

      // 2. Stagger in the internship dossier cards in the right sidebar
      const expBlocks = expSidebarRef.current?.querySelectorAll('.internship-block, .education-block');
      if (expBlocks && expBlocks.length > 0) {
        gsap.fromTo(
          expBlocks,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: expSidebarRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, journeySectionRef);

    return () => ctx.revert();
  }, [journey.length]);

  return (
    <section id="journey" className="journey-section" ref={journeySectionRef} aria-label="Professional Journey and Experience">
      <div className="container journey-container">
        
        {/* Section Header Meta */}
        <div className="journey-header-meta">
          <span className="section-index-num">04</span>
          <span className="section-index-title">CHRONOLOGY &amp; EXPERIENCE</span>
          <div className="section-index-line" />
        </div>

        {/* Section Intro */}
        <div className="journey-intro-block">
          <h2 className="journey-title">
            Engineering <span className="text-gradient-crimson">Trajectory</span>
          </h2>
          <p className="journey-subtitle">
            From university foundations to production data science internships, commercial delivery, and advancing toward full AI engineering capability.
          </p>
        </div>

        <div className="journey-editorial-grid">
          
          {/* ── Left Column: Progressive Vertical Timeline ── */}
          <div className="timeline-col">
            <div className="timeline-header-bar">
              <span className="timeline-header-title">CHRONOLOGICAL MILESTONES</span>
              <span className="timeline-header-caption">2024 — BEYOND</span>
            </div>

            <div className="timeline-track-wrap">
              <div className="timeline-progress-rail" />
              <div className="timeline-progress-laser" ref={laserRailRef} />

              <div className="timeline-events-list">
                {journey.map((item, index) => {
                  const isActive = activeMilestoneIndex === index;
                  const isFuture = item.isNext;

                  return (
                    <div
                      key={item.year + item.milestone}
                      className={`timeline-event-card ${isActive ? 'is-active' : ''} ${isFuture ? 'is-future' : ''}`}
                      onClick={() => setActiveMilestoneIndex(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveMilestoneIndex(index)}
                    >
                      <div className="timeline-node-marker">
                        <span className="node-dot" />
                      </div>

                      <div className="timeline-card-content">
                        <div className="event-meta-line">
                          <span className="event-year">{item.year}</span>
                          <span className="event-tag">{item.tag}</span>
                        </div>
                        <h4 className="event-title">{item.milestone}</h4>
                        <p className="event-summary">{item.summary}</p>
                        <p className="event-details">{item.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Column: Official Experience & Academic Foundations ── */}
          <div className="experience-sidebar-col" ref={expSidebarRef}>
            
            {/* Official Internships (Strictly Two Only) */}
            <div className="exp-section-card">
              <div className="exp-card-header">
                <div className="exp-header-icon">
                  <Briefcase size={14} className="text-primary" />
                </div>
                <div>
                  <span className="exp-header-label">INDUSTRY EXPERIENCE</span>
                  <h3 className="exp-header-title">Official Internships</h3>
                </div>
              </div>

              <div className="internship-items-stack">
                {experience.map((exp) => (
                  <div key={exp.id} className="internship-block">
                    <div className="internship-topline">
                      <h4 className="internship-company-name">{exp.company}</h4>
                      <span className="internship-duration-pill">{exp.period}</span>
                    </div>

                    <p className="internship-role-title">{exp.role} · {exp.location}</p>
                    <p className="internship-overview">{exp.description}</p>

                    {exp.highlights && (
                      <ul className="internship-keypoints">
                        {exp.highlights.map((highlight, hIdx) => (
                          <li key={hIdx}>
                            <CheckCircle2 size={12} className="bullet-check text-primary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Foundation */}
            <div className="exp-section-card">
              <div className="exp-card-header">
                <div className="exp-header-icon">
                  <BookOpen size={14} className="text-secondary" />
                </div>
                <div>
                  <span className="exp-header-label">ACADEMIC CREDENTIALS</span>
                  <h3 className="exp-header-title">Formal Education</h3>
                </div>
              </div>

              <div className="education-items-stack">
                {education.map((edu, idx) => (
                  <div key={idx} className="education-block">
                    <div className="edu-topline">
                      <h4 className="edu-degree-title">{edu.degree}</h4>
                      <span className="edu-period-tag">{edu.period}</span>
                    </div>
                    <p className="edu-institution-name">{edu.institution}</p>
                    <span className="edu-status-badge">{edu.status}</span>
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

import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { TechLogo } from '../ui/SocialIcons';
import './Journey.css';

export function Journey({ onOpenJourney, onOpenAchievements }) {
  const { content } = usePortfolioContent();
  const achievements = content.achievementsSummary || [];
  const companies = content.companyExperiences || [];

  return (
    <section id="journey" className="journey-section" aria-label="Experience & Internships">
      <div className="container journey-container">
        {/* ── 1. Experience / Internships Showcase ── */}
        <div className="journey-block">
          <div className="journey-header">
            <span className="section-label">Experience</span>
            <h2 className="section-title">INTERNSHIPS &amp; EXPERIENCE</h2>
          </div>

          <div className="companies-experience-grid" role="list">
            {companies.filter((comp) => !comp.hidden).map((comp) => (
              <article
                key={comp.id}
                className={`company-card desk-card ${comp.themeClass}`}
                style={{
                  '--company-accent': comp.accentColor,
                  '--company-glow': comp.accentGlow,
                }}
                tabIndex={0}
                aria-label={`${comp.company} — ${comp.role} (${comp.period})`}
              >
                {/* 1. Miniature Browser Mockup Window */}
                <div className="company-browser-frame">
                  <div className="company-browser-topbar">
                    <div className="company-browser-dots" aria-hidden="true">
                      <span className="browser-dot browser-dot--red" />
                      <span className="browser-dot browser-dot--yellow" />
                      <span className="browser-dot browser-dot--green" />
                    </div>
                    <div className="company-browser-url-pill">
                      <Lock size={9} className="company-browser-lock" aria-hidden="true" />
                      <span className="company-browser-domain">{comp.displayUrl}</span>
                    </div>
                    <div className="company-browser-actions" aria-hidden="true" />
                  </div>

                  {/* Dual Responsive Device Stage: Desktop canvas + Overlapping mobile phone */}
                  <div className="company-browser-stage">
                    <img
                      src={comp.previewImage}
                      alt={`${comp.company} desktop website preview`}
                      className="company-browser-screen company-browser-screen--desktop"
                      loading="lazy"
                    />
                    <div className="company-phone-mockup" aria-hidden="true">
                      <div className="company-phone-notch" />
                      <img
                        src={comp.mobilePreviewImage}
                        alt=""
                        className="company-browser-screen company-browser-screen--mobile"
                        loading="lazy"
                      />
                    </div>
                    <div className="company-browser-ambient" aria-hidden="true" />
                  </div>
                </div>

                {/* 2. Company Identity & Details */}
                <div className="company-card-body">
                  <div className="company-meta-strip">
                    <div className="company-brand-group">
                      <div className="company-logo-capsule">
                        <img
                          src={comp.logo}
                          alt={`${comp.company} official logo`}
                          className="company-brand-logo"
                          loading="lazy"
                        />
                      </div>
                      <div className="company-name-wrap">
                        <h3 className="company-name">{comp.company}</h3>
                        <span className="company-role-tag">{comp.role}</span>
                      </div>
                    </div>

                    <div className={`company-period-badge ${comp.period === 'CURRENT' ? 'company-period-badge--current' : ''}`}>
                      {comp.period === 'CURRENT' && (
                        <span className="company-status-pulse" aria-hidden="true" />
                      )}
                      <span>{comp.period}</span>
                    </div>
                  </div>

                  {/* 3. Verified Internship Scope & Description */}
                  <div className="company-info-block">
                    <div className="company-focus-line">
                      <span className="company-focus-label">FOCUS</span>
                      <span className="company-focus-text">{comp.status}</span>
                    </div>
                    <p className="company-desc">{comp.description}</p>
                  </div>

                  {/* Technologies utilized if applicable */}
                  {comp.technologies && comp.technologies.length > 0 && (
                    <div className="company-tech-pills">
                      {comp.technologies.map((tech) => (
                        <span key={tech} className="company-tech-pill">
                          <TechLogo name={tech} size={13} className="company-tech-icon" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 4. Action: Visit Live Company Website */}
                  <div className="company-card-actions">
                    <a
                      href={comp.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-visit-btn"
                      aria-label={`Visit official website of ${comp.company} at ${comp.displayUrl}`}
                    >
                      <span className="company-visit-label">VISIT COMPANY</span>
                      <ArrowUpRight size={14} className="company-visit-arrow" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="journey-action">
            <button
              type="button"
              className="journey-btn"
              onClick={onOpenJourney}
              id="journey-view-btn"
              aria-label="View complete journey timeline"
            >
              <span>VIEW FULL JOURNEY TIMELINE</span>
              <ArrowRight size={14} className="journey-btn__arrow" />
            </button>
          </div>
        </div>

        {/* ── 2. Achievements Overview ── */}
        <div className="achievements-block">
          <div className="achievements-header">
            <span className="section-label">Achievements</span>
            <h2 className="section-title">Credentials &amp; Milestones</h2>
            <p className="section-subtitle">
              Verified recognitions across competitions, presentations, and client delivery.
            </p>
          </div>

          <div className="achievements-compact-grid" role="list">
            {achievements.map((ach, achIdx) => {
              const achSuits = ['♦', '♠', '♣', '♥'];
              const suit = achSuits[achIdx % achSuits.length];

              return (
                <div
                  key={ach.label}
                  className="achievement-item desk-card"
                  onClick={() => onOpenAchievements && onOpenAchievements(ach.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (onOpenAchievements) onOpenAchievements(ach.label);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View achievements for ${ach.label}`}
                >
                  <div className="achievement-item__top">
                    <div className="achievement-item__title-wrap">
                      <span className="achievement-item__suit" aria-hidden="true">{suit}</span>
                      <h4 className="achievement-item__title">{ach.label}</h4>
                    </div>
                    <ArrowRight size={14} className="achievement-item__arrow" />
                  </div>
                  <p className="achievement-item__detail">{ach.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="achievements-action">
            <button
              type="button"
              className="journey-btn"
              onClick={() => onOpenAchievements && onOpenAchievements('ALL')}
              id="achievements-view-all-btn"
              aria-label="View all achievement details"
            >
              <span>EXPLORE ALL ACHIEVEMENTS</span>
              <ArrowRight size={14} className="journey-btn__arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

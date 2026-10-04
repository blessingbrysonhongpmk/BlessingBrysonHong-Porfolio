import { usePortfolioContent } from '../../context/PortfolioContext';
import './About.css';

export function About() {
  const { content } = usePortfolioContent();
  const profile = content?.profile || {};
  const aboutPreview = content?.aboutPreview || {};

  const statement =
    aboutPreview.statement ||
    profile.heroStatement ||
    "I’m a third-year B.Tech Artificial Intelligence & Data Science student at St. Xavier's Catholic College of Engineering.";

  const paragraph =
    (aboutPreview.paragraphs && aboutPreview.paragraphs[0]) ||
    profile.fullBio ||
    profile.shortBio ||
    "I’m currently working as an intern at Nex-X Spark, where I get to work on real-world software projects and strengthen my development skills. I’m interested in building useful software and exploring AI, data, and full-stack development.";

  const currentStatus =
    profile.currentDirection ||
    (profile.availability ? `${profile.role || 'Developer'} — ${profile.availability}` : "Nex-X Spark — Intern");

  const eduPeriod =
    aboutPreview.degreePeriod ||
    "2024 — 2028 · III Year (Current)";

  const eduDegree =
    aboutPreview.degree ||
    profile.education ||
    "B.Tech — Artificial Intelligence & Data Science";

  const eduCollege =
    aboutPreview.institution ||
    profile.institution ||
    "St. Xavier's Catholic College of Engineering (SXCCE)";

  return (
    <section id="about" className="about-section" aria-label="About Blessing Bryson Hong">
      <div className="container about-container">
        <div className="about-card desk-card">
          <div className="about-card__pip" aria-hidden="true">♠</div>
          <span className="section-label">About</span>

          {/* Large Short Statement */}
          <h2 className="about-statement">{statement}</h2>

          {/* Natural Human Introduction */}
          <div className="about-content">
            <p className="about-paragraph">{paragraph}</p>

            {/* Current Status Pill */}
            <div className="about-status">
              <span className="about-status__dot" aria-hidden="true" />
              <span className="about-status__label">CURRENTLY</span>
              <span className="about-status__sep" aria-hidden="true">—</span>
              <span className="about-status__role">{currentStatus}</span>
            </div>

            {/* Complete Verified Education Information */}
            <div className="about-education-card">
              <div className="about-education-top">
                <span className="about-education-badge">EDUCATION</span>
                <span className="about-education-period">{eduPeriod}</span>
              </div>
              <div className="about-education-degree-wrap">
                <h3 className="about-education-degree">{eduDegree}</h3>
                <p className="about-education-college">{eduCollege}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

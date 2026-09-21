import './About.css';

export function About() {
  return (
    <section id="about" className="about-section" aria-label="About Blessing Bryson Hong">
      <div className="container about-container">
        <div className="about-card desk-card">
          <div className="about-card__pip" aria-hidden="true">♠</div>
          <span className="section-label">About</span>

          {/* Large Short Statement */}
          <h2 className="about-statement">
            I’m a third-year B.Tech Artificial Intelligence &amp; Data Science student at St. Xavier&apos;s Catholic College of Engineering.
          </h2>

          {/* Natural Human Introduction */}
          <div className="about-content">
            <p className="about-paragraph">
              I’m currently working as an intern at Nex-X Spark, where I get to work on real-world software projects and strengthen my development skills. I’m interested in building useful software and exploring AI, data, and full-stack development.
            </p>

            {/* Current Status Pill */}
            <div className="about-status">
              <span className="about-status__dot" aria-hidden="true" />
              <span className="about-status__label">CURRENTLY</span>
              <span className="about-status__sep" aria-hidden="true">—</span>
              <span className="about-status__role">Nex-X Spark — Intern</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

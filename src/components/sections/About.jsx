import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import { Calendar, MapPin, Briefcase, Compass, Shield, Zap, Search, RefreshCw, CheckCircle2, TrendingUp } from 'lucide-react';
import './About.css';

const PRINCIPLE_ICONS = [
  Search,       // 01 Curiosity
  Zap,          // 02 Building
  Shield,       // 03 Discipline
  RefreshCw,    // 04 Adaptability
  CheckCircle2, // 05 Ownership
  TrendingUp,   // 06 Improvement
];

const SOCIAL_ICONS = {
  'github': GithubIcon,
  'linkedin': LinkedinIcon,
  'instagram': InstagramIcon,
  'facebook': FacebookIcon,
  'message-circle': DiscordIcon,
};

export function About() {
  const { profile, socials, principles } = PORTFOLIO_DATA;

  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="container about-container">
        
        {/* ── Left Column: Profile Card & Fact Sheet ── */}
        <div className="about-left">
          <div className="about-portrait-frame">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="about-portrait-img"
              loading="lazy"
            />
            <div className="about-portrait-badge">
              <span className="badge-dot" />
              <span>2ND YEAR · B.TECH</span>
            </div>
          </div>

          <div className="about-identity">
            <h2 className="about-name">{profile.name}</h2>
            <p className="about-role">{profile.role}</p>

            <div className="about-meta-grid">
              <div className="about-meta-item">
                <Calendar size={15} className="meta-icon" />
                <div>
                  <span className="meta-label">EDUCATION</span>
                  <span className="meta-value">B.Tech AI & Data Science (2024–2028)</span>
                </div>
              </div>
              <div className="about-meta-item">
                <MapPin size={15} className="meta-icon" />
                <div>
                  <span className="meta-label">LOCATION</span>
                  <span className="meta-value">India</span>
                </div>
              </div>
              <div className="about-meta-item">
                <Briefcase size={15} className="meta-icon" />
                <div>
                  <span className="meta-label">AVAILABILITY</span>
                  <span className="meta-value">{profile.availability}</span>
                </div>
              </div>
            </div>

            <div className="about-socials-wrap">
              <span className="socials-label">CONNECT:</span>
              <div className="about-socials">
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon] || GithubIcon;
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      aria-label={s.platform}
                      title={s.platform}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Architectural Bio & Compact Principles ── */}
        <div className="about-right">
          
          <div className="about-narrative">
            <span className="section-label">ABOUT</span>
            <h2 className="about-title">
              Engineer<span className="text-accent">.</span> Learner<span className="text-accent">.</span> Builder<span className="text-accent">.</span>
            </h2>

            <p className="about-intro">
              {profile.shortBio}
            </p>

            <div className="about-direction-box">
              <div className="direction-header">
                <Compass size={16} className="text-accent" />
                <span className="direction-title">CURRENT DIRECTION</span>
              </div>
              <p className="direction-text">
                {profile.currentDirection}
              </p>
            </div>
          </div>

          {/* ── Compact Principles Section ── */}
          <div className="about-principles-block">
            <h3 className="principles-heading">ENGINEERING PRINCIPLES</h3>

            <div className="principles-grid">
              {principles.map((p, idx) => {
                const IconComponent = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
                return (
                  <div key={p.number} className="principle-card">
                    <div className="principle-card-top">
                      <span className="principle-num">{p.number}</span>
                      <IconComponent size={15} className="principle-icon" />
                    </div>
                    <h4 className="principle-name">{p.title}</h4>
                    <p className="principle-desc">{p.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import { Calendar, MapPin, Briefcase, Shield, Target, Scale, BookOpen, Code, Users, Quote, Book, Leaf } from 'lucide-react';
import './About.css';

const VALUE_ICONS = {
  'Wisdom': Shield,
  'Discipline': Target,
  'Integrity': Scale,
  'Learning': BookOpen,
  'Purposeful Creation': Code,
  'Responsibility': Users,
};

const SOCIAL_ICONS = {
  'github': GithubIcon,
  'linkedin': LinkedinIcon,
  'instagram': InstagramIcon,
  'facebook': FacebookIcon,
  'message-circle': DiscordIcon,
};

export function About() {
  const { profile, values, careerDirection, socials } = PORTFOLIO_DATA;

  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="container about-dashboard">
        
        {/* ── Left Column: Identity & Connect ── */}
        <div className="about-left">
          
          <div className="about-portrait-wrapper">
            <div className="about-portrait-frame">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="about-portrait-img"
                loading="lazy"
              />
              <div className="about-portrait-overlay" />
            </div>
          </div>

          <div className="about-details">
            <h2 className="about-name">{profile.name}</h2>
            <p className="about-direction-sub">{careerDirection.currentPhase} towards {careerDirection.longTerm}</p>
            
            <div className="about-meta-card">
              <div className="about-meta-item">
                <Calendar size={14} className="about-meta-icon" />
                <span>B.Tech AI & Data Science<br/><span className="about-meta-sub">2024 - 2028</span></span>
              </div>
              <div className="about-meta-item">
                <MapPin size={14} className="about-meta-icon" />
                <span>Kulashekaram, Tamil Nadu, India</span>
              </div>
              <div className="about-meta-item">
                <Briefcase size={14} className="about-meta-icon" />
                <span>Open to Internships, Freelance & Collaborations</span>
              </div>
            </div>

            <div className="about-connect">
              <span className="about-connect-label">Connect with me</span>
              <div className="about-socials">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon] || GithubIcon;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-social-link"
                      aria-label={social.platform}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Narrative & Philosophy ── */}
        <div className="about-right">
          
          {/* Who I Am */}
          <div className="about-block">
            <span className="about-section-label">WHO I AM</span>
            <h2 className="about-main-title">
              Engineer<span className="text-accent">.</span> Learner<span className="text-accent">.</span> Builder<span className="text-accent">.</span>
            </h2>
            <p className="about-bio">{profile.shortBio}</p>
            
            <div className="about-direction-block">
              <p>Long-term direction: <strong className="text-accent">{careerDirection.longTerm}</strong>. {careerDirection.statement}</p>
            </div>
          </div>

          {/* How I Think */}
          <div className="about-block about-block--philosophy">
            <span className="about-section-label">HOW I THINK</span>
            <h2 className="about-main-title">Principles & Philosophy</h2>
            <p className="about-philosophy-intro">
              Grounded by my values and Tamil wisdom — frameworks for thinking, every decision, solution, and approach I work.
            </p>

            <div className="about-values-grid">
              {values.map((value, i) => {
                const Icon = VALUE_ICONS[value.name] || Shield;
                return (
                  <div key={value.name} className="about-value-card" style={{ '--delay': `${i * 100}ms` }}>
                    <div className="about-value-icon-wrapper">
                      <Icon size={20} className="about-value-icon" strokeWidth={1.5} />
                    </div>
                    <div className="about-value-content">
                      <h4 className="about-value-name">{value.name}</h4>
                      <p className="about-value-desc">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Wisdom Footer */}
            <div className="about-wisdom-footer">
              <Quote size={20} className="about-wisdom-icon text-accent" />
              <p className="about-wisdom-text">
                Inspired by the <strong>Bible</strong> and <strong>Thirukkural</strong> — wisdom that shapes how I think, how I build, and how I live.
              </p>
              <div className="about-wisdom-icons">
                <Book size={16} strokeWidth={1.5} />
                <Leaf size={16} strokeWidth={1.5} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

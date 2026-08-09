import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import { Calendar, MapPin, Briefcase, CheckCircle2, Zap, Search, Users, BookOpen, Star, Quote } from 'lucide-react';
import './About.css';

const PRINCIPLES = [
  {
    index: '01',
    name: 'Ownership',
    icon: CheckCircle2,
    description: 'If I start something, I want to understand it, improve it and take responsibility for the result.',
  },
  {
    index: '02',
    name: 'Initiative',
    icon: Zap,
    description: "I don't want to wait until I know everything before trying something.",
  },
  {
    index: '03',
    name: 'Curiosity',
    icon: Search,
    description: "If I don't understand something, that's usually where I want to look closer.",
  },
  {
    index: '04',
    name: 'Leadership',
    icon: Users,
    isFeatured: true, // Gives subtle crimson emphasis
    description: 'Leadership starts with taking responsibility, communicating clearly and helping the people around me grow.',
  },
  {
    index: '05',
    name: 'Learning',
    icon: BookOpen,
    description: 'Every project should leave me knowing something I didn\'t know before.',
  },
  {
    index: '06',
    name: 'Originality',
    icon: Star,
    description: 'I naturally look for a different approach instead of building something just because everyone else does.',
  },
];

const SOCIAL_ICONS = {
  'github': GithubIcon,
  'linkedin': LinkedinIcon,
  'instagram': InstagramIcon,
  'facebook': FacebookIcon,
  'message-circle': DiscordIcon,
};

export function About() {
  const { socials } = PORTFOLIO_DATA;
  
  // Specific name for the About section as requested
  const aboutName = "P M K Blessing Bryson Hong";

  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="container about-dashboard">
        
        {/* ── Left Column: Identity Card & Find Me ── */}
        <div className="about-left">
          
          <div className="about-portrait-wrapper">
            <div className="about-portrait-frame">
              <img
                src="/profile.jpeg"
                alt={aboutName}
                className="about-portrait-img"
                loading="lazy"
              />
              <div className="about-portrait-overlay" />
            </div>
          </div>

          <div className="about-details">
            <h2 className="about-name">{aboutName}</h2>
            <p className="about-direction-sub">Building towards AI Engineering</p>
            
            <div className="about-meta-card">
              <div className="about-meta-item">
                <Calendar size={14} className="about-meta-icon" />
                <span>
                  B.Tech — Artificial Intelligence & Data Science
                  <br />
                  <span className="about-meta-sub">2024 — 2028</span>
                </span>
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
              <span className="about-connect-label">FIND ME</span>
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

        {/* ── Right Column: Narrative & Principles ── */}
        <div className="about-right">
          
          {/* Main Introduction */}
          <div className="about-block">
            <span className="about-section-label">ABOUT ME</span>
            <h2 className="about-main-title">
              Engineer<span className="text-accent">.</span> Learner<span className="text-accent">.</span> Builder<span className="text-accent">.</span>
            </h2>
            <p className="about-bio">
              An AI & Data Science engineering student who learns best by building. I would rather turn an imperfect idea into a working prototype, test it, break it, and improve it than wait for the perfect plan.
            </p>

            <p className="about-bio-sub">
              Right now, I'm moving across Data Science, Full Stack Development and AI — learning where each one connects and building projects along the way.
            </p>
            
            <div className="about-signature-line">
              <span>Still figuring things out.</span> <span className="text-accent">Still building anyway.</span>
            </div>
          </div>

          {/* How I Think (Principles Grid) */}
          <div className="about-block about-block--philosophy">
            <span className="about-section-label">HOW I THINK</span>
            
            <div className="about-principles-grid">
              {PRINCIPLES.map((principle) => {
                const IconComponent = principle.icon;
                return (
                  <div
                    key={principle.index}
                    className={`about-principle-card ${principle.isFeatured ? 'is-featured' : ''}`}
                  >
                    <div className="principle-card-header">
                      <span className="principle-index">{principle.index}</span>
                      <IconComponent size={16} className="principle-icon" />
                    </div>
                    <h3 className="principle-title">{principle.name}</h3>
                    <p className="principle-desc">{principle.description}</p>
                    <div className="principle-accent-bar" />
                  </div>
                );
              })}
            </div>
            
            {/* Foundational Statement Footer */}
            <div className="about-statement-footer">
              <Quote size={20} className="about-statement-icon text-accent" />
              <p className="about-statement-text">
                I don't want to build another version of what already exists. Even when the idea is simple, I look for a way to make the experience feel like mine.
              </p>
              <span className="about-statement-author">— BBH.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

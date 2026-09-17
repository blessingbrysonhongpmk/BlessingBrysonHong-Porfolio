import { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import { Calendar, MapPin, Briefcase, Compass, Shield, Zap, Search, RefreshCw, CheckCircle2, TrendingUp } from 'lucide-react';
import { gsap } from '../../utils/scrollOrchestrator';
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
  const sectionRef = useRef(null);
  const narrativeBlockRef = useRef(null);
  const principlesGridRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Clean Narrative Reveal without text blur
      const words = narrativeBlockRef.current?.querySelectorAll('.word-scrub-item');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0.2,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: narrativeBlockRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: false,
              once: true,
            },
          }
        );
      }

      // 2. Sidebar Fact Sheet Docking
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0.5, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // 3. Sequential Engineering Principles Entry
      const cards = principlesGridRef.current?.querySelectorAll('.principle-item-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: principlesGridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef} aria-label="About the Engineer">
      <div className="container about-container">
        
        {/* Section Index Marker */}
        <div className="about-header-meta">
          <span className="section-index-num">01</span>
          <span className="section-index-title">ABOUT &amp; ARCHITECTURE</span>
          <div className="section-index-line" />
        </div>

        <div className="about-editorial-grid">
          
          {/* ── Left Column: Sticky Fact Sheet & Identity ── */}
          <aside className="about-sidebar-col" ref={sidebarRef}>
            <div className="about-identity-capsule">
              
              <div className="about-insignia-box">
                <span className="about-insignia-text">BBH</span>
                <span className="about-insignia-pip" />
              </div>

              <div className="about-identity-text">
                <h3 className="about-canonical-name">{profile.name}</h3>
                <p className="about-canonical-role">{profile.role}</p>
              </div>

              {/* Verified Fact Sheet */}
              <div className="about-fact-sheet">
                
                <div className="fact-item">
                  <div className="fact-icon-box">
                    <Calendar size={14} className="text-primary" />
                  </div>
                  <div className="fact-body">
                    <span className="fact-label">EDUCATION</span>
                    <span className="fact-value">B.Tech AI &amp; DS</span>
                    <span className="fact-subvalue">III Year Undergrad</span>
                  </div>
                </div>

                <div className="fact-item">
                  <div className="fact-icon-box">
                    <MapPin size={14} className="text-secondary" />
                  </div>
                  <div className="fact-body">
                    <span className="fact-label">BASE LOCATION</span>
                    <span className="fact-value">India</span>
                  </div>
                </div>

                <div className="fact-item">
                  <div className="fact-icon-box">
                    <Briefcase size={14} className="text-accent" />
                  </div>
                  <div className="fact-body">
                    <span className="fact-label">COLLABORATION STATUS</span>
                    <span className="fact-value">{profile.availability}</span>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="about-channels">
                <span className="channels-title">DIGITAL PROFILES</span>
                <div className="channels-row">
                  {socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.icon] || GithubIcon;
                    return (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="channel-link"
                        aria-label={s.platform}
                        title={s.platform}
                      >
                        <Icon size={14} />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* ── Right Column: Narrative & Principles ── */}
          <div className="about-main-col">
            
            <div className="narrative-prose-block" ref={narrativeBlockRef}>
              <h2 className="narrative-title">
                <span className="word-scrub-item">Engineer<span className="text-primary">.</span></span>{' '}
                <span className="word-scrub-item">Learner<span className="text-primary">.</span></span>{' '}
                <span className="word-scrub-item">Builder<span className="text-primary">.</span></span>
              </h2>

              <p className="narrative-lead word-scrub-item">
                {profile.shortBio}
              </p>

              {/* Direction Highlight Box */}
              <div className="editorial-callout-card word-scrub-item">
                <div className="callout-header">
                  <Compass size={16} className="text-primary" />
                  <span className="callout-label">ACTIVE HORIZON</span>
                </div>
                <p className="callout-text">
                  {profile.currentDirection}
                </p>
              </div>
            </div>

            {/* Engineering Principles */}
            <div className="principles-section-block">
              <div className="principles-header">
                <h3 className="principles-title">ENGINEERING PRINCIPLES</h3>
                <span className="principles-subtitle">Core operating methodology</span>
              </div>

              <div className="principles-grid" ref={principlesGridRef}>
                {principles.map((p, idx) => {
                  const IconComponent = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
                  return (
                    <div key={p.number} className="principle-item-card">
                      <div className="principle-item-top">
                        <span className="principle-code">{p.number}</span>
                        <IconComponent size={15} className="principle-icon" />
                      </div>
                      <h4 className="principle-heading">{p.title}</h4>
                      <p className="principle-desc">{p.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

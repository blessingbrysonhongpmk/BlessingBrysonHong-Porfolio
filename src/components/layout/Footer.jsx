import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  'message-circle': DiscordIcon,
};

export function Footer() {
  const { socials, profile } = PORTFOLIO_DATA;
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-mark">BBH<span className="text-primary">.</span></span>
            <span className="footer__brand-name">{profile.name}</span>
            <span className="footer__brand-sub">{profile.role}</span>
          </div>

          <div className="footer__right-meta">
            {time && (
              <div className="footer__time-capsule">
                <span className="time-dot" />
                <span className="time-val">{time}</span>
              </div>
            )}

            <div className="footer__socials">
              {socials.map(({ platform, url, icon }) => {
                const IconComp = SOCIAL_ICONS[icon] || GithubIcon;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social"
                    aria-label={platform}
                    title={platform}
                  >
                    <IconComp size={15} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            © 2026 {profile.name} · CRAFTED FOR EXCELLENCE
          </span>

          <div className="footer__nav-group">
            <nav className="footer__nav" aria-label="Footer Navigation">
              <a href="#home" className="footer__nav-link">Home</a>
              <span className="footer__separator">/</span>
              <a href="#about" className="footer__nav-link">About</a>
              <span className="footer__separator">/</span>
              <a href="#work" className="footer__nav-link">Work</a>
              <span className="footer__separator">/</span>
              <a href="#skills" className="footer__nav-link">Skills</a>
              <span className="footer__separator">/</span>
              <a href="#journey" className="footer__nav-link">Journey</a>
              <span className="footer__separator">/</span>
              <a href="#contact" className="footer__nav-link">Contact</a>
            </nav>

            <button
              onClick={scrollToTop}
              className="footer__back-to-top"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

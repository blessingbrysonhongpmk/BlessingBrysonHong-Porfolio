import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import { MessageCircle } from 'lucide-react';
import './Footer.css';

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  'message-circle': DiscordIcon,
};

export function Footer() {
  const { socials } = PORTFOLIO_DATA;

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-mark">BBH<span className="text-accent">.</span></span>
            <span className="footer__brand-name">P M K BLESSING BRYSON HONG</span>
            <span className="footer__brand-sub">AI & Data Science</span>
          </div>

          <div className="footer__socials">
            {socials.map(({ platform, url, icon }) => {
              const IconComp = SOCIAL_ICONS[icon] || MessageCircle;
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
                  <IconComp size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">© 2026 P M K BLESSING BRYSON HONG</span>

          <nav className="footer__nav" aria-label="Footer Navigation">
            <a href="#home" className="footer__nav-link">Home</a>
            <span className="footer__separator">·</span>
            <a href="#about" className="footer__nav-link">About</a>
            <span className="footer__separator">·</span>
            <a href="#work" className="footer__nav-link">Work</a>
            <span className="footer__separator">·</span>
            <a href="#skills" className="footer__nav-link">Skills</a>
            <span className="footer__separator">·</span>
            <a href="#journey" className="footer__nav-link">Journey</a>
            <span className="footer__separator">·</span>
            <a href="#contact" className="footer__nav-link">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

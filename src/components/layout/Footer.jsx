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
  const year = new Date().getFullYear();
  
  // Custom name for the footer as requested
  const footerName = "Blessing Bryson Hong";

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Top */}
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-mark">BBH<span className="text-accent">.</span></span>
            <span className="footer__brand-name">{footerName}</span>
            <span className="footer__brand-sub">Building towards AI Engineering.</span>
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
                >
                  <IconComp size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <span className="footer__copyright">© {year} {footerName}</span>

          <nav className="footer__nav" aria-label="Footer Navigation">
            <span className="footer__nav-label">Navigation:</span>
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

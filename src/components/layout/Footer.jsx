import { usePortfolioContent } from '../../context/PortfolioContext';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Mail, ArrowUp, ArrowUpRight } from 'lucide-react';
import { scrollToElement } from '../../utils/scrollOrchestrator';
import './Footer.css';

export function Footer() {
  const { content } = usePortfolioContent();
  const { socials, profile } = content;

  const linkedinObj = (socials || []).find((s) => s.platform.toLowerCase() === 'linkedin');
  const githubObj = (socials || []).find((s) => s.platform.toLowerCase() === 'github');

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToElement(href, -70);
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Subtle orbital glow behind footer */}
      <div className="footer-glow" aria-hidden="true" />

      <div className="container footer__inner">
        {/* Top: Identity, Role, & Minimal Nav */}
        <div className="footer__header">
          <div className="footer__identity">
            <div className="footer__brand-wrapper">
              <span className="footer__brand-glyph" aria-hidden="true">♔</span>
              <span className="footer__brand-mark">
                BBH<span className="footer__brand-dot">.</span>
              </span>
              <span className="footer__name">
                P M K BLESSING BRYSON HONG
              </span>
            </div>
            <span className="footer__role">
              {profile.role || 'AI & DATA SCIENCE + FULL STACK DEVELOPER'}
            </span>
          </div>

          <div className="footer__socials-strip">
            {githubObj && (
              <a
                href={githubObj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-pill footer__social-pill--github"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="footer__pill-arrow" />
              </a>
            )}

            {linkedinObj && (
              <a
                href={linkedinObj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-pill footer__social-pill--linkedin"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="footer__pill-arrow" />
              </a>
            )}

            <a
              href={`mailto:${profile.email}`}
              className="footer__social-pill footer__social-pill--email"
              aria-label="Send direct email"
            >
              <Mail size={15} className="footer__email-icon" />
              <span>Email</span>
              <ArrowUpRight size={13} className="footer__pill-arrow" />
            </a>
          </div>
        </div>

        {/* Quick section links */}
        <nav className="footer__nav-strip" aria-label="Footer Navigation">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
          <span className="footer__nav-dot" aria-hidden="true">/</span>
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
          <span className="footer__nav-dot" aria-hidden="true">/</span>
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
          <span className="footer__nav-dot" aria-hidden="true">/</span>
          <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
          <span className="footer__nav-dot" aria-hidden="true">/</span>
          <a href="#journey" onClick={(e) => handleNavClick(e, '#journey')}>Journey</a>
          <span className="footer__nav-dot" aria-hidden="true">/</span>
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
        </nav>

        <div className="footer__divider" aria-hidden="true" />

        {/* Bottom meta row */}
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {new Date().getFullYear()} P M K Blessing Bryson Hong. All rights reserved.
          </span>

          <div className="footer__status">
            <span className="footer__status-dot" aria-hidden="true" />
            <span>Open to opportunities</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="footer__top-btn"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}

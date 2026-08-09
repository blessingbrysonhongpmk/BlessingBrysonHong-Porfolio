import { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import './Navbar.css';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = PORTFOLIO_DATA.navLinks
      .map(link => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar__inner">
          <a
            href="#home"
            className="navbar__brand"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="BBH — Home"
          >
            <span className="navbar__brand-text">BBH</span>
            <span className="navbar__brand-dot">.</span>
          </a>

          {/* Desktop Links */}
          <div className="navbar__links" role="menubar">
            {PORTFOLIO_DATA.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`navbar__toggle-bar ${isMobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu__content">
          <div className="mobile-menu__links">
            {PORTFOLIO_DATA.navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu__link"
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ '--delay': `${i * 60 + 200}ms` }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <span className="mobile-menu__link-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="mobile-menu__link-text">{link.label}</span>
              </a>
            ))}
          </div>
          <div className="mobile-menu__footer">
            <p className="mobile-menu__availability">{PORTFOLIO_DATA.profile.availability}</p>
            <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="mobile-menu__email">
              {PORTFOLIO_DATA.profile.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

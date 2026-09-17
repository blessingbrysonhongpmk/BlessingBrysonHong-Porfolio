import { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { getLenis } from '../../utils/scrollOrchestrator';
import { Sun, Moon } from 'lucide-react';
import './Navbar.css';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
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
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock scroll when mobile menu is open — use Lenis API so smooth scroll isn't broken
  useEffect(() => {
    const lenis = getLenis();
    if (isMobileMenuOpen) {
      if (lenis) {
        lenis.stop();
      } else {
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (lenis) {
        lenis.start();
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      const l = getLenis();
      if (l) l.start();
      else document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      {/* ── Top Scroll Progress Bar ── */}
      <div
        className="navbar__scroll-indicator"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="container navbar__inner">
          {/* Brand Mark */}
          <a
            href="#home"
            className="navbar__brand"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="PMK · BLESSING BRYSON HONG — Return to Top"
          >
            <span className="navbar__brand-desktop">PMK · BLESSING BRYSON HONG</span>
            <span className="navbar__brand-mobile">PMK · BBH</span>
            <span className="navbar__brand-dot" />
          </a>

          {/* Minimal Center Navigation */}
          <nav className="navbar__nav-links" role="navigation" aria-label="Main Navigation">
            {PORTFOLIO_DATA.navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="navbar__link-text">{link.label}</span>
                  {isActive && <span className="navbar__active-indicator" />}
                </a>
              );
            })}
          </nav>

          {/* Right Action & Theme Toggle */}
          <div className="navbar__action-col">
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="#contact"
              className="navbar__contact-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>GET IN TOUCH →</span>
            </a>

            {/* Mobile Toggle Hamburger */}
            <button
              className="navbar__toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`navbar__toggle-bar ${isMobileMenuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        role="dialog"
        aria-label="Mobile Navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__top-bar">
            <button
              className="mobile-menu__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
            </button>
          </div>

          <div className="mobile-menu__links">
            {PORTFOLIO_DATA.navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu__link"
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ '--delay': `${i * 50 + 100}ms` }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <span className="mobile-menu__link-index">0{i + 1}</span>
                <span className="mobile-menu__link-label">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="mobile-menu__footer">
            <p className="mobile-menu__availability">
              <span className="pulse-dot" />
              {PORTFOLIO_DATA.profile.availability}
            </p>
            <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="mobile-menu__email">
              {PORTFOLIO_DATA.profile.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

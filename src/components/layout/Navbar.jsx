import { useState, useEffect, useCallback, useRef } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { scrollToElement } from '../../utils/scrollOrchestrator';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ theme, toggleTheme, onTriggerAdmin }) {
  const { content } = usePortfolioContent();
  const { profile } = content;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    };
  }, []);

  const handleBrandClick = useCallback((e) => {
    tapCountRef.current += 1;

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    // Reset tap counter if more than 2 seconds elapse between taps
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 2000);

    // 5 taps within 2 seconds triggers admin login
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      e.preventDefault();
      if (onTriggerAdmin) {
        onTriggerAdmin();
      }
      return;
    }

    // Normal navigation on taps 1-4
    handleNav(e, '#home');
  }, [handleNav, onTriggerAdmin]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      if (window.scrollY < 150) setActiveSection('home');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active nav
  useEffect(() => {
    const ids = NAV_ITEMS.map(l => l.href.replace('#', '')).filter(Boolean);
    const observers = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(id); }),
        { threshold: 0.15, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToElement(href);
  }, []);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">
          {/* Brand */}
          <a
            href="#home"
            className="navbar__brand"
            onClick={handleBrandClick}
            style={{ touchAction: 'manipulation' }}
            aria-label="BBH Home"
          >
            <span className="navbar__brand-glyph" aria-hidden="true">♔</span>
            <span className="navbar__brand-name">
              BBH<span className="navbar__brand-dot">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="navbar__links" role="navigation" aria-label="Main Navigation">
            {NAV_ITEMS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={e => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <a
              href="#contact"
              className="navbar__cta-btn"
              onClick={e => handleNav(e, '#contact')}
            >
              Get in touch
            </a>

            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="navbar__mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile Navigation">
          <nav className="mobile-menu__nav">
            {NAV_ITEMS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu__link"
                onClick={e => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <button className="mobile-menu__theme-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <a href={`mailto:${profile.email}`} className="mobile-menu__email">{profile.email}</a>
          </div>
        </div>
      )}
    </>
  );
}

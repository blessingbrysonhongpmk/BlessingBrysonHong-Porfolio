import { useState, useEffect, useCallback } from 'react';
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

export function Navbar({ theme, toggleTheme }) {
  const { content } = usePortfolioContent();
  const { profile } = content;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
          <a href="#home" className="navbar__brand" onClick={e => handleNav(e, '#home')} aria-label="BBH Home">
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

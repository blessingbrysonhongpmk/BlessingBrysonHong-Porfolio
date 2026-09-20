import { useState, useEffect, useCallback } from 'react';
import { LivingAtmosphere } from './components/layout/LivingAtmosphere';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Journey } from './components/sections/Journey';
import { Contact } from './components/sections/Contact';

import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { AboutDetailModal } from './components/modals/AboutDetailModal';
import { SkillsDetailModal } from './components/modals/SkillsDetailModal';
import { JourneyDetailModal } from './components/modals/JourneyDetailModal';
import { AchievementsDetailModal } from './components/modals/AchievementsDetailModal';
import { ContactDetailModal } from './components/modals/ContactDetailModal';

import { AdminLayout } from './components/admin/AdminLayout';
import { MacWelcomeLoader } from './components/welcome/MacWelcomeLoader';
import { PortfolioProvider, usePortfolioContent } from './context/PortfolioContext';

import './styles/global.css';
import './App.css';

function PortfolioApp() {
  const { content } = usePortfolioContent();

  // Theme: default to light
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Admin route
  const [isAdminView, setIsAdminView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash.startsWith('#/admin') || window.location.pathname === '/admin';
  });

  // Mac-Style Welcome Loader: runs on initial visit in this session
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.location.hash.startsWith('#/admin') || window.location.pathname === '/admin') return true;
    const seen = sessionStorage.getItem('bbh_welcome_seen');
    const force = window.location.search.includes('welcome=true');
    return !!(seen && !force);
  });

  useEffect(() => {
    if (!isWelcomeComplete) {
      document.body.classList.add('is-welcome-active');
    } else {
      document.body.classList.remove('is-welcome-active');
    }
    return () => {
      document.body.classList.remove('is-welcome-active');
    };
  }, [isWelcomeComplete]);

  const handleWelcomeComplete = useCallback(() => {
    setIsWelcomeComplete(true);
  }, []);

  // Modal states
  const [activeProject, setActiveProject] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [selectedAchievementCategory, setSelectedAchievementCategory] = useState('ALL');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Admin keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminView(prev => {
          const next = !prev;
          window.location.hash = next ? '#/admin' : '#/';
          return next;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Modal handlers
  const handleSelectProject = useCallback((project) => {
    setActiveProject(project);
    window.location.hash = `#/project/${project.id}`;
  }, []);

  const handleOpenAbout = useCallback(() => {
    setIsAboutOpen(true);
    window.location.hash = '#/about';
  }, []);

  const handleOpenSkills = useCallback(() => {
    setIsSkillsOpen(true);
    window.location.hash = '#/skills';
  }, []);

  const handleOpenJourney = useCallback(() => {
    setIsJourneyOpen(true);
    window.location.hash = '#/journey';
  }, []);

  const handleOpenAchievements = useCallback((category = 'ALL') => {
    setSelectedAchievementCategory(category);
    setIsAchievementsOpen(true);
    window.location.hash = category && category !== 'ALL'
      ? `#/achievements/${encodeURIComponent(category)}`
      : '#/achievements';
  }, []);

  const handleOpenContact = useCallback(() => {
    setIsContactOpen(true);
    window.location.hash = '#/contact';
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveProject(null);
    setIsAboutOpen(false);
    setIsSkillsOpen(false);
    setIsJourneyOpen(false);
    setIsAchievementsOpen(false);
    setIsContactOpen(false);
    if (window.location.hash.startsWith('#/') && !window.location.hash.startsWith('#/admin')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // URL hash sync
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/admin') || window.location.pathname === '/admin') {
        setIsAdminView(true);
        handleCloseModal();
        return;
      }
      setIsAdminView(false);

      if (hash.startsWith('#/project/')) {
        const id = hash.replace('#/project/', '');
        const found = (content.projects || []).find(p => p.id === id);
        if (found) {
          setActiveProject(found);
          setIsAboutOpen(false); setIsSkillsOpen(false); setIsJourneyOpen(false);
          setIsAchievementsOpen(false); setIsContactOpen(false);
        }
      } else if (hash === '#/about') {
        setIsAboutOpen(true); setActiveProject(null); setIsSkillsOpen(false);
        setIsJourneyOpen(false); setIsAchievementsOpen(false); setIsContactOpen(false);
      } else if (hash === '#/skills') {
        setIsSkillsOpen(true); setActiveProject(null); setIsAboutOpen(false);
        setIsJourneyOpen(false); setIsAchievementsOpen(false); setIsContactOpen(false);
      } else if (hash === '#/journey') {
        setIsJourneyOpen(true); setActiveProject(null); setIsAboutOpen(false);
        setIsSkillsOpen(false); setIsAchievementsOpen(false); setIsContactOpen(false);
      } else if (hash.startsWith('#/achievements')) {
        setIsAchievementsOpen(true); setActiveProject(null); setIsAboutOpen(false);
        setIsSkillsOpen(false); setIsJourneyOpen(false); setIsContactOpen(false);
        const sub = hash.replace('#/achievements/', '').trim();
        setSelectedAchievementCategory(sub && sub !== '#/achievements' ? decodeURIComponent(sub) : 'ALL');
      } else if (hash === '#/contact') {
        setIsContactOpen(true); setActiveProject(null); setIsAboutOpen(false);
        setIsSkillsOpen(false); setIsJourneyOpen(false); setIsAchievementsOpen(false);
      } else if (!hash.startsWith('#/')) {
        setActiveProject(null); setIsAboutOpen(false); setIsSkillsOpen(false);
        setIsJourneyOpen(false); setIsAchievementsOpen(false); setIsContactOpen(false);
      }
    };

    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [content.projects, handleCloseModal]);

  // Massive In-and-Out Scroll Reveal Observer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Smooth In-and-Out transition when scrolling into and out of view
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '20px 0px -40px 0px',
      }
    );

    const timer = setTimeout(() => {
      const targets = document.querySelectorAll(
        '.about-statement, .about-lead, .work-header, .project-item, .skills-header, .skills-editorial-layout, .journey-block, .achievements-block, .contact-content-zone, .contact-form-card, .contact-channel-card'
      );
      targets.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        if (!el.dataset.staggerSet) {
          const delay = (index % 3) * 70;
          if (delay > 0) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.dataset.staggerSet = 'true';
        }
        observer.observe(el);
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content]);

  // Admin view
  if (isAdminView) {
    return (
      <AdminLayout
        theme={theme}
        toggleTheme={toggleTheme}
        onExit={() => {
          window.location.hash = '#/';
          setIsAdminView(false);
        }}
      />
    );
  }

  return (
    <>
      {!isWelcomeComplete && (
        <MacWelcomeLoader onComplete={handleWelcomeComplete} />
      )}
      <LivingAtmosphere />
      <a href="#main-content" className="sr-only">Skip to main content</a>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero onOpenContact={handleOpenContact} isRevealed={isWelcomeComplete} />
        <About onOpenAbout={handleOpenAbout} />
        <Projects onSelectProject={handleSelectProject} />
        <Skills onOpenSkills={handleOpenSkills} />
        <Journey onOpenJourney={handleOpenJourney} onOpenAchievements={handleOpenAchievements} />
        <Contact onOpenContact={handleOpenContact} />
      </main>

      <Footer />

      {/* Modals */}
      {activeProject && <ProjectDetailModal project={activeProject} onClose={handleCloseModal} />}
      {isAboutOpen && <AboutDetailModal onClose={handleCloseModal} onOpenContact={() => { setIsAboutOpen(false); handleOpenContact(); }} />}
      {isSkillsOpen && <SkillsDetailModal onClose={handleCloseModal} />}
      {isJourneyOpen && <JourneyDetailModal onClose={handleCloseModal} />}
      {isAchievementsOpen && <AchievementsDetailModal initialCategory={selectedAchievementCategory} onClose={handleCloseModal} />}
      {isContactOpen && <ContactDetailModal onClose={handleCloseModal} />}
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

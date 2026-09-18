import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PortfolioLoader } from './components/loader/PortfolioLoader';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Journey } from './components/sections/Journey';
import { Contact } from './components/sections/Contact';

// Deep Dossier & Case Study Modals ("Small Surface, Deep Content")
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { AboutDetailModal } from './components/modals/AboutDetailModal';
import { SkillsDetailModal } from './components/modals/SkillsDetailModal';
import { JourneyDetailModal } from './components/modals/JourneyDetailModal';
import { ContactDetailModal } from './components/modals/ContactDetailModal';

import { Scene } from './components/3d/Scene';
import { CustomCursor } from './components/ui/CustomCursor';
import { PORTFOLIO_DATA } from './data/portfolio';
import { initScrollEngine, ScrollTrigger } from './utils/scrollOrchestrator';
import './styles/global.css';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Deep Content Modal States
  const [activeProject, setActiveProject] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Initialize Lenis smooth inertia engine
  useEffect(() => {
    initScrollEngine();
  }, []);

  // Refresh ScrollTrigger when portfolio completes loading
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Modal Open Handlers with URL Hash Sync
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

  const handleOpenContact = useCallback(() => {
    setIsContactOpen(true);
    window.location.hash = '#/contact';
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveProject(null);
    setIsAboutOpen(false);
    setIsSkillsOpen(false);
    setIsJourneyOpen(false);
    setIsContactOpen(false);

    if (window.location.hash.startsWith('#/')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Synchronize URL Hash routing with deep modals and browser history
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const projectId = hash.replace('#/project/', '');
        const found = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
        if (found) {
          setActiveProject(found);
          setIsAboutOpen(false);
          setIsSkillsOpen(false);
          setIsJourneyOpen(false);
          setIsContactOpen(false);
        }
      } else if (hash === '#/about') {
        setIsAboutOpen(true);
        setActiveProject(null);
        setIsSkillsOpen(false);
        setIsJourneyOpen(false);
        setIsContactOpen(false);
      } else if (hash === '#/skills') {
        setIsSkillsOpen(true);
        setActiveProject(null);
        setIsAboutOpen(false);
        setIsJourneyOpen(false);
        setIsContactOpen(false);
      } else if (hash === '#/journey') {
        setIsJourneyOpen(true);
        setActiveProject(null);
        setIsAboutOpen(false);
        setIsSkillsOpen(false);
        setIsContactOpen(false);
      } else if (hash === '#/contact') {
        setIsContactOpen(true);
        setActiveProject(null);
        setIsAboutOpen(false);
        setIsSkillsOpen(false);
        setIsJourneyOpen(false);
      } else if (!hash.startsWith('#/')) {
        setActiveProject(null);
        setIsAboutOpen(false);
        setIsSkillsOpen(false);
        setIsJourneyOpen(false);
        setIsContactOpen(false);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    window.addEventListener('popstate', handleHashSync);
    return () => {
      window.removeEventListener('hashchange', handleHashSync);
      window.removeEventListener('popstate', handleHashSync);
    };
  }, []);

  // Easter egg: Key sequence → B B H
  useEffect(() => {
    const sequence = ['b', 'b', 'h'];
    let buffer = [];

    const handleKeyDown = (e) => {
      buffer.push(e.key.toLowerCase());
      if (buffer.length > sequence.length) buffer.shift();
      if (buffer.join('') === sequence.join('')) {
        setEasterEggActive(true);
        setTimeout(() => setEasterEggActive(false), 4000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <CustomCursor />
      {!isLoaded && <PortfolioLoader onComplete={() => setIsLoaded(true)} />}

      <div className={`app ${isLoaded ? 'app--loaded' : ''}`}>
        {/* Global 3D Ambient Neural Matrix */}
        <Scene />

        <a href="#main-content" className="sr-only">Skip to main content</a>
        <Navbar />

        <main id="main-content">
          <Hero onOpenContact={handleOpenContact} />
          <About onOpenAbout={handleOpenAbout} />
          <Projects onSelectProject={handleSelectProject} />
          <Skills onOpenSkills={handleOpenSkills} />
          <Journey onOpenJourney={handleOpenJourney} />
          <Contact onOpenContact={handleOpenContact} />
        </main>

        <Footer />
      </div>

      {/* ── Deep Content Experiences (Controlled by "Small Surface, Deep Content") ── */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={handleCloseModal}
        />
      )}

      {isAboutOpen && (
        <AboutDetailModal
          onClose={handleCloseModal}
          onOpenContact={() => {
            setIsAboutOpen(false);
            handleOpenContact();
          }}
        />
      )}

      {isSkillsOpen && (
        <SkillsDetailModal
          onClose={handleCloseModal}
        />
      )}

      {isJourneyOpen && (
        <JourneyDetailModal
          onClose={handleCloseModal}
        />
      )}

      {isContactOpen && (
        <ContactDetailModal
          onClose={handleCloseModal}
        />
      )}

      {/* Easter egg overlay */}
      {easterEggActive && (
        <div className="easter-egg" role="status" aria-live="polite">
          <p className="easter-egg__text">
            &ldquo;Before anything else, preparation is the key to success.&rdquo;
          </p>
          <span className="easter-egg__attribution">— a constant reminder</span>
        </div>
      )}
    </>
  );
}

export default App;

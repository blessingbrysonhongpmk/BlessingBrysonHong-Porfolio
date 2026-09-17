import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PortfolioLoader } from './components/loader/PortfolioLoader';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Journey } from './components/sections/Journey';
import { Interests } from './components/sections/Interests';
import { Contact } from './components/sections/Contact';
import { Scene } from './components/3d/Scene';
import { CustomCursor } from './components/ui/CustomCursor';
import { initScrollEngine, ScrollTrigger } from './utils/scrollOrchestrator';
import './styles/global.css';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

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
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Journey />
          <Interests />
          <Contact />
        </main>

        <Footer />
      </div>

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

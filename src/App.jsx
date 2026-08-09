import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { Hero } from './components/sections/Hero';
import { Scene } from './components/3d/Scene';
import { CustomCursor } from './components/ui/CustomCursor';
import './styles/global.css';
import './App.css';

// Lazy load below-the-fold sections
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })));
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })));
const Journey = lazy(() => import('./components/sections/Journey').then(m => ({ default: m.Journey })));
const Interests = lazy(() => import('./components/sections/Interests').then(m => ({ default: m.Interests })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Easter egg: Konami-inspired sequence → B B H
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
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      <div className={`app ${isLoaded ? 'app--loaded' : ''}`}>
        {/* Global 3D Interactive Background Matrix */}
        <Scene />

        <a href="#main-content" className="sr-only">Skip to main content</a>
        <Navbar />

        <main id="main-content">
          <Hero />

          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Journey />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Interests />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
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

/** Minimal loading skeleton for lazy sections */
function SectionSkeleton() {
  return (
    <div className="section-skeleton" aria-hidden="true">
      <div className="section-skeleton__bar section-skeleton__bar--sm" />
      <div className="section-skeleton__bar section-skeleton__bar--lg" />
    </div>
  );
}

export default App;

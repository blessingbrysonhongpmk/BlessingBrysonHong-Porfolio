import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Scene } from '../3d/Scene';
import { GithubIcon } from '../ui/SocialIcons';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export function Hero() {
  const { profile, github } = PORTFOLIO_DATA;
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const about = document.querySelector('#about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={sectionRef} aria-label="Introduction">
      {/* Background System Depth */}
      <div className="hero__environment" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* Background 3D Engine */}
      <div className="hero__canvas" aria-hidden="true">
        <Scene />
      </div>

      {/* Integrated Content */}
      <div className="container hero__content">
        <div className={`hero__interface ${isRevealed ? 'hero__interface--visible' : ''}`}>
          
          {/* Identity System Mark */}
          <div className="hero__brand-system">
            <div className="hero__sys-label">
              <span className="hero__sys-dot" />
              AI ENGINEER
            </div>
            <div className="hero__brand-mark">
              BB<span className="hero__brand-accent">H</span>
            </div>
          </div>

          {/* Core Typography */}
          <h1 className="hero__name">
            {profile.name}
          </h1>

          <p className="hero__role">
            Engineering student building intelligent solutions for a <span className="text-accent">better tomorrow.</span>
          </p>

          <div className="hero__statement-box">
            <p className="hero__statement">
              I explore how machines learn and turn ideas into meaningful real-world projects.<br />
              Not there yet — but every build takes me closer.
            </p>
          </div>

          {/* Interactions */}
          <div className="hero__actions">
            <a
              href="#work"
              className="hero__cta hero__cta--primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore My Work
              <ArrowRight size={16} />
            </a>
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta hero__cta--outline"
            >
              View on GitHub
              <GithubIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        className={`hero__scroll-hint ${isRevealed ? 'hero__scroll-hint--visible' : ''}`}
        onClick={handleScrollDown}
        aria-label="Scroll to about section"
      >
        <div className="hero__mouse-icon">
          <div className="hero__mouse-wheel" />
        </div>
        <span className="hero__scroll-text">SCROLL TO EXPLORE</span>
      </button>
    </section>
  );
}

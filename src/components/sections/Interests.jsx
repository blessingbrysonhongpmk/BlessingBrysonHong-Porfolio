import { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import {
  Crown, Music, Mic, BookOpen, Book, Tv, Trophy, Code, Lightbulb, Quote
} from 'lucide-react';
import './Interests.css';

const ICON_MAP = {
  crown: Crown,
  music: Music,
  mic: Mic,
  'book-open': BookOpen,
  book: Book,
  tv: Tv,
  trophy: Trophy,
  code: Code,
  lightbulb: Lightbulb,
};

export function Interests() {
  const { interests } = PORTFOLIO_DATA;
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="interests" className="interests-section" aria-label="Outside the Code and Creative Pursuits">
      <div className="container interests-container">
        
        {/* Section Header Meta */}
        <div className="interests-header-meta">
          <span className="section-index-num">05</span>
          <span className="section-index-title">PURSUITS &amp; PERSPECTIVE</span>
          <div className="section-index-line" />
        </div>

        {/* Section Headline */}
        <div className="interests-intro-block">
          <h2 className="interests-title">
            Outside the <span className="text-gradient-crimson">Code</span>
          </h2>
          <p className="interests-subtitle">
            The disciplines, creative outlets, and reflective practices that sharpen strategic focus, creative energy, and intellectual curiosity away from the terminal.
          </p>
        </div>

        {/* 9 Editorial Cards Grid */}
        <div className="interests-editorial-grid">
          {(interests || []).map((interest, idx) => {
            const IconComponent = ICON_MAP[interest.icon] || Code;
            const isHovered = hoveredId === interest.id;
            const indexNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={interest.id || interest.name}
                className={`interest-editorial-card ${isHovered ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredId(interest.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="interest-card-top">
                  <div className="interest-icon-box">
                    <IconComponent size={16} className="text-primary" />
                  </div>
                  <span className="interest-index-tag">{indexNumber}</span>
                </div>

                <div className="interest-card-body">
                  <h3 className="interest-name">{interest.name}</h3>
                  <p className="interest-desc">{interest.description}</p>
                </div>

                <div className="interest-bottom-accent" />
              </div>
            );
          })}
        </div>

        {/* Closing Philosophical Thought */}
        <div className="interests-quote-strip">
          <div className="quote-accent-mark">
            <Quote size={18} className="text-primary" />
          </div>
          <p className="quote-body-text">
            Balance is not something you find — it is an intentional architecture built between technical rigor and human expression.
          </p>
          <span className="quote-author-tag">— P M K BLESSING BRYSON HONG</span>
        </div>

      </div>
    </section>
  );
}

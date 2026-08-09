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

// Coordinate positions for the 9 nodes on the orbital arcs SVG
const ORBIT_NODES = [
  { id: 'chess', cx: 320, cy: 35, icon: Crown, label: 'Chess' },
  { id: 'dance', cx: 240, cy: 65, icon: Music, label: 'Dance' },
  { id: 'singing', cx: 160, cy: 110, icon: Mic, label: 'Singing' },
  { id: 'books', cx: 280, cy: 130, icon: BookOpen, label: 'Books' },
  { id: 'bible-reading', cx: 370, cy: 75, icon: Book, label: 'Bible' },
  { id: 'web-series', cx: 100, cy: 175, icon: Tv, label: 'Series' },
  { id: 'hackathons', cx: 410, cy: 145, icon: Trophy, label: 'Hackathons' },
  { id: 'hobby-projects', cx: 200, cy: 190, icon: Code, label: 'Projects' },
  { id: 'learning', cx: 320, cy: 205, icon: Lightbulb, label: 'Learning' },
];

export function Interests() {
  const { interests } = PORTFOLIO_DATA;
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="interests" className="interests-section" aria-label="Outside the Code">
      <div className="container interests-container">
        
        {/* Header & Orbit Constellation Area */}
        <div className="interests-header-wrapper">
          <div className="interests-header-content">
            <span className="interests-eyebrow">BEYOND ENGINEERING</span>
            <h2 className="interests-main-title">
              Outside the Code<span className="text-accent">.</span>
            </h2>
            <p className="interests-subtitle">
              The things I enjoy outside coding — the interests that keep me curious, creative and grounded.
            </p>
          </div>

          {/* Interactive Background SVG Orbit System */}
          <div className="interests-orbit-wrapper" aria-hidden="true">
            <svg viewBox="0 0 460 240" className="interests-orbit-svg">
              {/* Concentric Orbital Arcs */}
              <path
                d="M 50 210 A 240 180 0 0 1 430 40"
                className="orbit-path orbit-path--outer"
              />
              <path
                d="M 90 220 A 200 140 0 0 1 410 70"
                className="orbit-path orbit-path--mid"
              />
              <path
                d="M 140 230 A 150 100 0 0 1 370 110"
                className="orbit-path orbit-path--inner"
              />

              {/* Orbital Connected Lines */}
              <line x1="240" y1="65" x2="320" y2="35" className="orbit-line" />
              <line x1="160" y1="110" x2="240" y2="65" className="orbit-line" />
              <line x1="280" y1="130" x2="370" y2="75" className="orbit-line" />
              <line x1="200" y1="190" x2="320" y2="205" className="orbit-line" />

              {/* Dynamic Interactive Nodes */}
              {ORBIT_NODES.map((node) => {
                const isHovered = hoveredId === node.id;
                const NodeIcon = node.icon;
                return (
                  <g
                    key={node.id}
                    className={`orbit-node ${isHovered ? 'is-active' : ''}`}
                    transform={`translate(${node.cx}, ${node.cy})`}
                  >
                    {/* Glowing outer aura circle */}
                    <circle r={isHovered ? 18 : 12} className="node-aura" />
                    <circle r={isHovered ? 14 : 10} className="node-base" />
                    <foreignObject
                      x={isHovered ? -9 : -7}
                      y={isHovered ? -9 : -7}
                      width={isHovered ? 18 : 14}
                      height={isHovered ? 18 : 14}
                      className="node-icon-wrapper"
                    >
                      <NodeIcon size={isHovered ? 18 : 14} className="node-icon-svg" />
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 9 Premium Cards Grid */}
        <div className="interests-grid">
          {interests.map((interest, i) => {
            const IconComponent = ICON_MAP[interest.icon] || Code;
            const isHovered = hoveredId === interest.id;

            return (
              <div
                key={interest.id || interest.name}
                className={`interest-card card-theme-${interest.id} ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredId(interest.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ '--delay': `${i * 50}ms` }}
              >
                {/* Atmospheric card ambient background glow */}
                <div className="card-ambient-bg" />

                {/* Card Icon Header */}
                <div className="card-icon-ring">
                  <IconComponent size={20} className="card-icon" />
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <h3 className="card-title">{interest.name}</h3>
                  <p className="card-description">{interest.description}</p>
                </div>

                {/* Bottom Crimson Accent Bar */}
                <div className="card-accent-bar" />
              </div>
            );
          })}
        </div>

        {/* Bottom Wisdom Quote */}
        <div className="interests-quote-card">
          <div className="quote-icon-container">
            <Quote size={20} className="quote-icon text-accent" />
          </div>
          <p className="quote-text">
            Balance is not something you find, it's something you build — between passion and purpose, between code and life.
          </p>
          <span className="quote-author">— BBH.</span>
        </div>

      </div>
    </section>
  );
}

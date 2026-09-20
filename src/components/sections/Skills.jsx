import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  Code2,
  Globe,
  BrainCircuit,
  Wrench,
  Languages,
  ArrowRight,
  X,
  ExternalLink,
} from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { TechLogo } from '../ui/SocialIcons';
import './Skills.css';

// Category Icon Mapping
const CATEGORY_ICONS = {
  'PROGRAMMING': Code2,
  'WEB DEVELOPMENT': Globe,
  'DATA & AI': BrainCircuit,
  'TOOLS': Wrench,
  'LANGUAGES': Languages,
};

// Skill → Project connection map
function buildSkillProjectMap(projects) {
  const map = {};
  (projects || []).forEach((project) => {
    (project.technologies || []).forEach((tech) => {
      const key = tech.toLowerCase().trim();
      if (!map[key]) map[key] = [];
      map[key].push(project);
    });
  });
  return map;
}

// Find related projects for a skill name
function getRelatedProjects(skillName, skillProjectMap) {
  const nameLower = skillName.toLowerCase();
  const matched = new Map();

  Object.entries(skillProjectMap).forEach(([tech, projects]) => {
    if (
      tech.includes(nameLower) ||
      nameLower.includes(tech) ||
      tech.split(/[\s/&,]+/).some((t) => nameLower.includes(t) && t.length > 3)
    ) {
      projects.forEach((p) => matched.set(p.id, p));
    }
  });

  return [...matched.values()];
}

// ── Detail Panel for a selected category ──────────────
function CategoryDetailPanel({ category, skillProjectMap, onClose }) {
  const CategoryIcon = CATEGORY_ICONS[category.category] || Code2;
  const isLanguages = category.category === 'LANGUAGES';

  return (
    <div className="skills-panel desk-card" aria-label={`${category.category} detail panel`}>
      <div className="skills-panel__header">
        <div className="skills-panel__header-inner">
          <span className="skills-panel__icon" aria-hidden="true">
            <CategoryIcon size={18} />
          </span>
          <h3 className="skills-panel__title">
            {isLanguages ? 'HUMAN LANGUAGES' : category.category}
          </h3>
        </div>
        <button
          type="button"
          className="skills-panel__close"
          onClick={onClose}
          aria-label="Close detail panel"
        >
          <X size={16} />
        </button>
      </div>

      <ul className="skills-panel__list" role="list">
        {(category.skills || []).map((skill) => {
          const relatedProjects = getRelatedProjects(skill.name, skillProjectMap);
          const isGerman = skill.name.toLowerCase().includes('german');

          return (
            <li key={skill.name} className="skills-panel__skill">
              <div className="skills-panel__skill-header">
                <div className="skills-panel__skill-name-wrap">
                  <TechLogo name={skill.name} size={16} className="skill-item-logo" />
                  <span className="skills-panel__skill-name">{skill.name}</span>
                </div>
                {isGerman ? (
                  <span className="skills-panel__badge skills-panel__badge--accent">Basic</span>
                ) : skill.status && !isLanguages ? (
                  <span className="skills-panel__badge">{skill.status}</span>
                ) : null}
              </div>
              {skill.description && (
                <p className="skills-panel__skill-desc">{skill.description}</p>
              )}
              {relatedProjects.length > 0 && (
                <div className="skills-panel__projects">
                  <span className="skills-panel__projects-label">Used in:</span>
                  <div className="skills-panel__project-links">
                    {relatedProjects.map((proj) => (
                      <span key={proj.id} className="skills-panel__project-chip">
                        <span className="skills-panel__chip-dot" aria-hidden="true" />
                        <span>{proj.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Main Skills Component ──────────────────────────────
export function Skills({ onOpenSkills }) {
  const { content } = usePortfolioContent();
  const skillCategories = content.skillCategories || [];
  const projects = content.projects || [];

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0); // Open first by default
  const panelRef = useRef(null);

  const skillProjectMap = useMemo(() => buildSkillProjectMap(projects), [projects]);

  const handleSelectCategory = useCallback((idx) => {
    setActiveCategoryIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const handleClosePanel = useCallback(() => {
    setActiveCategoryIdx(null);
  }, []);

  // Close panel on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleClosePanel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClosePanel]);

  const activeCategory =
    activeCategoryIdx !== null ? skillCategories[activeCategoryIdx] : null;

  return (
    <section id="skills" className="skills-section" aria-label="Skills & Technologies">
      <div className="container">
        <header className="skills-header">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technical Capabilities</h2>
          <p className="section-subtitle">
            Categorized overview of verified technologies, tools, and languages. Click any category to inspect details.
          </p>
        </header>

        <div className="skills-editorial-layout">
          {/* Left: Category Overview List */}
          <div className="skills-nav-col" role="tablist" aria-label="Skill Categories">
            {skillCategories.map((group, idx) => {
              const Icon = CATEGORY_ICONS[group.category] || Code2;
              const isActive = activeCategoryIdx === idx;
              const previewText = (group.skills || []).map((s) => s.name).join(' · ');

              const SUIT_PIPS = ['♠', '♦', '♣', '♥', '♔'];
              const suitPip = SUIT_PIPS[idx % SUIT_PIPS.length];

              return (
                <div
                  key={group.category}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  className={`skills-cat-row desk-card ${isActive ? 'skills-cat-row--active' : ''}`}
                  onClick={() => handleSelectCategory(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectCategory(idx);
                    }
                  }}
                >
                  <div className="skills-cat-row__header">
                    <div className="skills-cat-row__title-wrap">
                      <span className="skills-cat-row__pip" aria-hidden="true">{suitPip}</span>
                      <span className="skills-cat-row__icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <h3 className="skills-cat-row__title">
                        {group.category === 'LANGUAGES' ? 'HUMAN LANGUAGES' : group.category}
                      </h3>
                    </div>
                    <ArrowRight size={14} className="skills-cat-row__arrow" />
                  </div>
                  <p className="skills-cat-row__preview">{previewText}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive Detail Panel */}
          <div className="skills-detail-col" ref={panelRef}>
            {activeCategory ? (
              <CategoryDetailPanel
                category={activeCategory}
                skillProjectMap={skillProjectMap}
                onClose={handleClosePanel}
              />
            ) : (
              <div className="skills-panel-placeholder">
                <p>Select a category to view detailed technologies and applications.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="skills-action">
          <button
            type="button"
            className="skills-matrix-btn"
            onClick={onOpenSkills}
            id="skills-matrix-modal-btn"
          >
            <span>EXPLORE ALL SKILLS</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

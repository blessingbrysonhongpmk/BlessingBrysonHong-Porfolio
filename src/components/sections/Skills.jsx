import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Code2,
  Globe,
  BrainCircuit,
  Wrench,
  Languages,
  ArrowRight,
  X,
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

// ── Reusable Skills List for both Desktop Panel & Mobile Sheet ──
function SkillsList({ category, skillProjectMap }) {
  const isLanguages = category.category === 'LANGUAGES';

  return (
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
  );
}

// ── Desktop Detail Panel (Lives on side of categories) ──
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

      <SkillsList category={category} skillProjectMap={skillProjectMap} />
    </div>
  );
}

// ── Mobile Mac-Style Floating Detail Sheet ──
function SkillsMobileModal({ category, skillProjectMap, onClose, triggerElement }) {
  const modalSheetRef = useRef(null);
  const closeBtnRef = useRef(null);
  const CategoryIcon = CATEGORY_ICONS[category.category] || Code2;
  const isLanguages = category.category === 'LANGUAGES';

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-focus the close button for accessibility & immediate keyboard navigation
    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 40);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && modalSheetRef.current) {
        const focusables = modalSheetRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (triggerElement && typeof triggerElement.focus === 'function') {
        triggerElement.focus();
      }
    };
  }, [onClose, triggerElement]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="skills-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="skills-modal-sheet desk-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skills-mobile-modal-title"
        onClick={(e) => e.stopPropagation()}
        ref={modalSheetRef}
        tabIndex={-1}
      >
        <div className="skills-modal-header">
          <div className="skills-panel__header-inner">
            <span className="skills-panel__icon" aria-hidden="true">
              <CategoryIcon size={18} />
            </span>
            <h3 id="skills-mobile-modal-title" className="skills-panel__title">
              {isLanguages ? 'HUMAN LANGUAGES' : category.category}
            </h3>
          </div>
          <button
            type="button"
            className="skills-modal-close-btn"
            onClick={onClose}
            aria-label={`Close ${category.category} details`}
            ref={closeBtnRef}
          >
            <X size={18} />
          </button>
        </div>

        <div className="skills-modal-scroll-area">
          <SkillsList category={category} skillProjectMap={skillProjectMap} />
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Main Skills Component ──────────────────────────────
export function Skills({ onOpenSkills }) {
  const { content } = usePortfolioContent();
  const skillCategories = content.skillCategories || [];
  const projects = content.projects || [];

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0); // Active category for desktop side panel
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false); // Mobile floating sheet state
  const lastTriggerRef = useRef(null);
  const panelRef = useRef(null);

  const skillProjectMap = useMemo(() => buildSkillProjectMap(projects), [projects]);

  const handleSelectCategory = useCallback((idx, e) => {
    setActiveCategoryIdx(idx);
    // On tablet and mobile (<= 880px), open the floating Mac-style sheet
    if (typeof window !== 'undefined' && window.innerWidth <= 880) {
      lastTriggerRef.current = e?.currentTarget || null;
      setIsMobileModalOpen(true);
    }
  }, []);

  const handleClosePanel = useCallback(() => {
    setActiveCategoryIdx(null);
  }, []);

  const handleCloseMobileModal = useCallback(() => {
    setIsMobileModalOpen(false);
  }, []);

  // Close mobile modal if resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 880 && isMobileModalOpen) {
        setIsMobileModalOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMobileModalOpen]);

  // Desktop escape listener
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !isMobileModalOpen) handleClosePanel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClosePanel, isMobileModalOpen]);

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
                  onClick={(e) => handleSelectCategory(idx, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectCategory(idx, e);
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

          {/* Right: Desktop Side Inspection Panel (Hidden on <=880px) */}
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

      {/* Mobile & Tablet Mac-Style Floating Detail Sheet (Rendered via Portal to document.body) */}
      {isMobileModalOpen && activeCategory && (
        <SkillsMobileModal
          category={activeCategory}
          skillProjectMap={skillProjectMap}
          onClose={handleCloseMobileModal}
          triggerElement={lastTriggerRef.current}
        />
      )}
    </section>
  );
}


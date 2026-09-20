import { useEffect, useState, useMemo } from 'react';
import { X, Code2, Database, Cpu, Wrench, Palette, Sparkles, CheckSquare, Square, RotateCcw, Search } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './SkillsDetailModal.css';

export function SkillsDetailModal({ onClose }) {
  const { content } = usePortfolioContent();
  const skillCategories = useMemo(() => content.skillCategories || [], [content.skillCategories]);
  
  // Selected categories as a Set/Array for multi-check capability
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const allCategoryNames = useMemo(
    () => skillCategories.map((c) => c.category),
    [skillCategories]
  );

  // Toggle a single category checkbox
  const handleToggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        return prev.filter((c) => c !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  // Clear all checked categories (resets to showing all)
  const handleClearAll = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'LANGUAGES': return <Code2 size={16} className="text-accent" />;
      case 'WEB DEVELOPMENT': return <Cpu size={16} className="text-secondary" />;
      case 'DATA & AI': return <Database size={16} className="text-accent" />;
      case 'UI & DESIGN': return <Palette size={16} className="text-secondary" />;
      case 'TOOLS & CLOUD': return <Wrench size={16} className="text-muted" />;
      case 'OTHERS': return <Sparkles size={16} className="text-accent" />;
      default: return <Code2 size={16} className="text-secondary" />;
    }
  };

  // Compute displayed groups based on checked categories and search
  const displayedGroups = useMemo(() => {
    const filteredByCat = selectedCategories.length === 0
      ? skillCategories
      : skillCategories.filter((c) => selectedCategories.includes(c.category));

    if (!searchQuery.trim()) return filteredByCat;

    const query = searchQuery.toLowerCase();
    return filteredByCat
      .map((group) => {
        const matchingSkills = (group.skills || []).filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.description.toLowerCase().includes(query) ||
            s.status.toLowerCase().includes(query)
        );
        return { ...group, skills: matchingSkills };
      })
      .filter((group) => group.skills.length > 0);
  }, [skillCategories, selectedCategories, searchQuery]);

  return (
    <div
      className="detail-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skills-modal-title"
    >
      <div className="detail-modal-card skills-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <header className="detail-modal-header">
          <div className="detail-modal-meta">
            <span className="meta-pill meta-pill--year">
              <span>Skills Matrix</span>
            </span>
            <span className="meta-pill meta-pill--cat">
              <span>{selectedCategories.length === 0 ? 'All Categories' : `${selectedCategories.length} selected`}</span>
            </span>
          </div>

          <button className="detail-modal-close" onClick={onClose} aria-label="Close Skills Matrix">
            <X size={18} />
          </button>
        </header>

        {/* Filter & Checkbox Strip */}
        <div className="skills-filter-toolbar">
          <div className="skills-checkbox-list" role="group" aria-label="Filter skills by category">
            <button
              type="button"
              className={`skills-check-pill ${selectedCategories.length === 0 ? 'skills-check-pill--all-active' : ''}`}
              onClick={() => setSelectedCategories([])}
              aria-pressed={selectedCategories.length === 0}
            >
              <span>ALL</span>
            </button>

            {allCategoryNames.map((cat) => {
              const isChecked = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  className={`skills-check-pill ${isChecked ? 'skills-check-pill--checked' : ''}`}
                  onClick={() => handleToggleCategory(cat)}
                  aria-pressed={isChecked}
                  id={`check-skill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {isChecked ? (
                    <CheckSquare size={13} className="skills-check-icon skills-check-icon--checked" />
                  ) : (
                    <Square size={13} className="skills-check-icon" />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="skills-filter-actions">
            {/* Realtime Search */}
            <div className="skills-search-box">
              <Search size={13} className="skills-search-icon" />
              <input
                type="text"
                placeholder="Search tech or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="skills-search-input"
                aria-label="Search skills"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="skills-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Clear All Action */}
            {(selectedCategories.length > 0 || searchQuery) && (
              <button
                type="button"
                className="skills-clear-btn"
                onClick={handleClearAll}
                id="skills-clear-all-btn"
                title="Clear all filters"
                aria-label="Clear all checked filters"
              >
                <RotateCcw size={12} />
                <span>CLEAR ALL</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="detail-modal-body">
          <div className="case-study-hero">
            <h2 id="skills-modal-title" className="case-study-title">
              Technical Capabilities &amp; Stack
            </h2>
            <p className="case-study-tagline">
              Curated technologies genuinely utilized in production client software, machine learning demand forecasting, UI/UX architecture, and full-stack web applications.
            </p>
          </div>

          {/* Skill Groups */}
          {displayedGroups.length === 0 ? (
            <div className="skills-empty-state">
              <p>No skills match the checked filters or search query.</p>
              <button
                type="button"
                className="skills-clear-btn"
                onClick={handleClearAll}
                style={{ margin: '12px auto 0' }}
              >
                <RotateCcw size={13} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="skills-deep-groups">
              {displayedGroups.map((group) => (
                <section key={group.category} className="case-card">
                  <div className="case-card-header">
                    {getCategoryIcon(group.category)}
                    <h3>{group.category}</h3>
                    <span className="case-card-count">{(group.skills || []).length}</span>
                  </div>

                  <div className="skills-deep-grid">
                    {(group.skills || [])
                      .filter((s) => {
                        const lower = s.name.toLowerCase();
                        return (
                          lower !== 'java' &&
                          lower !== 'c#' &&
                          lower !== 'csharp' &&
                          !lower.includes('rest')
                        );
                      })
                      .map((skill) => (
                        <div key={skill.name} className="skill-deep-item">
                          <div className="skill-deep-header">
                            <span className="skill-deep-name">{skill.name}</span>
                            <span className={`skill-status-pip status-pip--${skill.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {skill.status}
                            </span>
                          </div>
                          <p className="skill-deep-desc">{skill.description}</p>
                        </div>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


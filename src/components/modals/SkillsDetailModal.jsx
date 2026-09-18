import { useEffect, useState } from 'react';
import { X, Code2, Database, Cpu, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import './SkillsDetailModal.css';

export function SkillsDetailModal({ onClose }) {
  const { skillCategories } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState('ALL');

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

  const categories = ['ALL', ...skillCategories.map((c) => c.category)];

  const displayedGroups = activeCategory === 'ALL'
    ? skillCategories
    : skillCategories.filter((c) => c.category === activeCategory);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'LANGUAGES': return <Code2 size={16} className="text-primary" />;
      case 'WEB DEVELOPMENT': return <Cpu size={16} className="text-secondary" />;
      case 'DATA & AI': return <Database size={16} className="text-accent" />;
      case 'TOOLS & CLOUD': return <Wrench size={16} className="text-primary" />;
      default: return <Code2 size={16} className="text-primary" />;
    }
  };

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
              <span>SKILLS MATRIX // 2026</span>
            </span>
            <span className="meta-pill meta-pill--cat">
              <span>ACTIVE STACK</span>
            </span>
          </div>

          <div className="detail-modal-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${activeCategory === cat ? 'tab-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <button className="detail-modal-close" onClick={onClose} aria-label="Close Skills Matrix">
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="detail-modal-body">
          <div className="case-study-hero">
            <h2 id="skills-modal-title" className="case-study-title">
              Technical Capabilities &amp; Stack
            </h2>
            <p className="case-study-tagline">
              Curated technologies genuinely utilized in production client software, machine learning demand forecasting, and full-stack web applications.
            </p>
          </div>

          {/* Skill Groups */}
          <div className="skills-deep-groups">
            {displayedGroups.map((group) => (
              <section key={group.category} className="case-card">
                <div className="case-card-header">
                  {getCategoryIcon(group.category)}
                  <h3>{group.category}</h3>
                </div>

                <div className="skills-deep-grid">
                  {group.skills.map((skill) => (
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
        </div>
      </div>
    </div>
  );
}

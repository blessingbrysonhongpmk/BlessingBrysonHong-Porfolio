import { useState, useEffect, useMemo } from 'react';
import {
  X,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import './AchievementsDetailModal.css';

export function AchievementsDetailModal({ initialCategory = 'ALL', initialItemId = null, onClose }) {
  const { content } = usePortfolioContent();
  const achievements = useMemo(() => content.achievements || [], [content.achievements]);

  // Initial index based on initialItemId or initialCategory
  const initialIndex = useMemo(() => {
    if (initialItemId) {
      const idx = achievements.findIndex((a) => a.id === initialItemId);
      if (idx !== -1) return idx;
    }
    if (initialCategory && initialCategory !== 'ALL') {
      const idx = achievements.findIndex((a) => a.category?.toLowerCase() === initialCategory.toLowerCase());
      if (idx !== -1) return idx;
    }
    return 0;
  }, [achievements, initialItemId, initialCategory]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const activeItem = achievements[currentIndex] || achievements[0] || null;

  // Keyboard navigation & body lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < achievements.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, achievements.length]);

  if (!activeItem) return null;

  return (
    <div
      className="credential-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="credential-modal-title"
    >
      <div className="credential-modal-sheet">
        {/* ── Top Bar: Navigation & Close ── */}
        <div className="credential-sheet-topbar">
          <div className="credential-sheet-counter">
            <span className="credential-step">
              {currentIndex + 1} of {achievements.length}
            </span>
          </div>

          <button
            type="button"
            className="credential-close-btn"
            onClick={onClose}
            aria-label="Close detail view"
          >
            <X size={18} />
            <span>Close</span>
          </button>
        </div>

        {/* ── Content Body ── */}
        <div className="credential-sheet-body">
          {/* Category & Year Tag */}
          <div className="credential-tag-row">
            <span className="credential-badge">
              <Award size={13} className="credential-badge-icon" />
              <span>{activeItem.category}</span>
            </span>
            {activeItem.year && (
              <span className="credential-year">
                <Calendar size={12} />
                <span>{activeItem.year}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h2 id="credential-modal-title" className="credential-title">
            {activeItem.title}
          </h2>

          {/* Short Summary */}
          {activeItem.description && (
            <p className="credential-summary">{activeItem.description}</p>
          )}

          {/* Key Structured Details */}
          <div className="credential-meta-grid">
            {activeItem.event && (
              <div className="credential-meta-card">
                <span className="credential-meta-label">Context / Event</span>
                <span className="credential-meta-val">{activeItem.event}</span>
              </div>
            )}

            {activeItem.result && (
              <div className="credential-meta-card">
                <span className="credential-meta-label">Recognition / Status</span>
                <span className="credential-meta-val credential-meta-val--highlight">
                  <CheckCircle2 size={13} />
                  <span>{activeItem.result}</span>
                </span>
              </div>
            )}

            {activeItem.role && (
              <div className="credential-meta-card">
                <span className="credential-meta-label">Role</span>
                <span className="credential-meta-val">{activeItem.role}</span>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          {activeItem.keyHighlights && activeItem.keyHighlights.length > 0 && (
            <div className="credential-highlights-zone">
              <h3 className="credential-subhead">Verified Highlights</h3>
              <ul className="credential-highlights-list" role="list">
                {activeItem.keyHighlights.map((hl, idx) => (
                  <li key={idx} className="credential-highlight-item">
                    <ShieldCheck size={14} className="highlight-icon" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* External Verification Link */}
          {activeItem.link && (
            <div className="credential-action-row">
              <a
                href={activeItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="credential-action-btn"
              >
                <span>Visit {activeItem.link.replace(/^https?:\/\//, '')}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>

        {/* ── Footer: Clean Paging Switcher ── */}
        {achievements.length > 1 && (
          <div className="credential-sheet-footer">
            <button
              type="button"
              className="credential-nav-btn"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              aria-label="Previous credential"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Clean pill chips to jump */}
            <div className="credential-dots" role="tablist" aria-label="Credentials">
              {achievements.map((item, idx) => (
                <button
                  key={item.id || idx}
                  type="button"
                  className={`credential-dot ${idx === currentIndex ? 'credential-dot--active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`View ${item.title}`}
                  aria-selected={idx === currentIndex}
                />
              ))}
            </div>

            <button
              type="button"
              className="credential-nav-btn"
              onClick={() => setCurrentIndex((prev) => Math.min(achievements.length - 1, prev + 1))}
              disabled={currentIndex === achievements.length - 1}
              aria-label="Next credential"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

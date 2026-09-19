import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { AdminProjects } from './AdminProjects';
import { AdminAbout } from './AdminAbout';
import { AdminSkills } from './AdminSkills';
import { AdminJourney } from './AdminJourney';
import { AdminAchievements } from './AdminAchievements';
import { AdminSettings } from './AdminSettings';
import {
  FolderGit2,
  Sparkles,
  Cpu,
  Milestone,
  Award,
  Settings,
  CheckCircle2,
  ArrowUpRight,
  RotateCcw,
  Sun,
  Moon,
} from 'lucide-react';
import './AdminLayout.css';

export function AdminLayout({ onExit, theme, toggleTheme }) {
  const { isDirty, draftContent, publishContent, discardDraft, toastMessage } = usePortfolioContent();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'about' | 'skills' | 'journey' | 'achievements' | 'settings'

  const navTabs = [
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: draftContent.projects?.length },
    { id: 'about', label: 'About', icon: Sparkles },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'journey', label: 'Journey', icon: Milestone },
    { id: 'achievements', label: 'Achievements', icon: Award, count: draftContent.achievements?.length },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="admin-root">
      {/* ── Top Bar ──────────────────────────────────── */}
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <span className="admin-brand-badge">ADMIN</span>
          <span className="admin-topbar__title">Portfolio Content Management</span>
        </div>

        <div className="admin-topbar__actions">
          {/* Live sync / dirty status */}
          {isDirty ? (
            <div className="admin-status-pill admin-status-pill--dirty">
              <span className="admin-status-dot" />
              <span>Unsaved Draft Changes</span>
            </div>
          ) : (
            <div className="admin-status-pill admin-status-pill--synced">
              <span className="admin-status-dot" />
              <span>Live Site In Sync</span>
            </div>
          )}

          {isDirty && (
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={discardDraft}
              title="Discard draft edits and revert to published version"
            >
              <RotateCcw size={14} />
              <span>Discard</span>
            </button>
          )}

          <button
            type="button"
            className="admin-btn admin-btn--success"
            onClick={publishContent}
            title="Publish all changes live to public site"
          >
            <CheckCircle2 size={15} />
            <span>Publish Live</span>
          </button>

          {toggleTheme && (
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          )}

          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={onExit}
            title="Return to Public Portfolio"
          >
            <span>Live Site</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      {/* ── Main Layout Body ─────────────────────────── */}
      <div className="admin-body">
        {/* Left Sidebar */}
        <aside className="admin-sidebar" aria-label="Admin Navigation">
          <div className="admin-sidebar-nav">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`admin-nav-item ${isActive ? 'admin-nav-item--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="admin-nav-item__left">
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="admin-nav-item__count">{tab.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Main Work Area */}
        <main className="admin-main">
          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'skills' && <AdminSkills />}
          {activeTab === 'journey' && <AdminJourney />}
          {activeTab === 'achievements' && <AdminAchievements />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`admin-toast admin-toast--${toastMessage.type}`}>
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}

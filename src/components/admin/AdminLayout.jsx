import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { AdminProjects } from './AdminProjects';
import { AdminAbout } from './AdminAbout';
import { AdminSkills } from './AdminSkills';
import { AdminJourney } from './AdminJourney';
import { AdminAchievements } from './AdminAchievements';
import { AdminSettings } from './AdminSettings';
import { AdminAppearance } from './AdminAppearance';
import { AdminHero } from './AdminHero';
import { AdminContact } from './AdminContact';
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
  LogOut,
  Zap,
  Palette,
  Mail,
  User,
  Share2,
} from 'lucide-react';
import './AdminLayout.css';

export function AdminLayout({ onExit, onLogout, theme, toggleTheme }) {
  const { isDirty, draftContent, publishContent, discardDraft, toastMessage } = usePortfolioContent();
  const [activeTab, setActiveTab] = useState('hero');

  const navSections = [
    {
      label: 'CONTENT',
      tabs: [
        { id: 'hero',         label: 'Hero Section',   icon: Zap,       desc: 'Name, tagline, bio, role' },
        { id: 'about',        label: 'About',          icon: Sparkles,  desc: 'Intro, tags, focus areas' },
        { id: 'projects',     label: 'Projects',       icon: FolderGit2, count: draftContent.projects?.length, desc: 'Project cards & details' },
        { id: 'skills',       label: 'Skills',         icon: Cpu,       desc: 'Skill categories & levels' },
        { id: 'journey',      label: 'Journey',        icon: Milestone, desc: 'Timeline & experiences' },
        { id: 'achievements', label: 'Achievements',   icon: Award,     count: draftContent.achievements?.length, desc: 'Awards & milestones' },
        { id: 'contact',      label: 'Contact',        icon: Mail,      desc: 'Email, location, status' },
      ],
    },
    {
      label: 'SITE',
      tabs: [
        { id: 'appearance',   label: 'Appearance',     icon: Palette,   desc: 'Colors, theme tokens' },
        { id: 'profile',      label: 'Profile & ID',   icon: User,      desc: 'Name, brand, full identity' },
        { id: 'socials',      label: 'Social Links',   icon: Share2,    desc: 'Social media channels' },
        { id: 'settings',     label: 'Backup & Tools', icon: Settings,  desc: 'Export, import, reset' },
      ],
    },
  ];

  // Render active panel
  const renderPanel = () => {
    switch (activeTab) {
      case 'hero':         return <AdminHero />;
      case 'about':        return <AdminAbout />;
      case 'projects':     return <AdminProjects />;
      case 'skills':       return <AdminSkills />;
      case 'journey':      return <AdminJourney />;
      case 'achievements': return <AdminAchievements />;
      case 'contact':      return <AdminContact />;
      case 'appearance':   return <AdminAppearance />;
      case 'profile':      return <AdminSettings subTab="profile" />;
      case 'socials':      return <AdminSettings subTab="socials" />;
      case 'settings':     return <AdminSettings subTab="backup" />;
      default:             return <AdminHero />;
    }
  };

  return (
    <div className="admin-root">
      {/* ── Top Bar ──────────────────────────────────── */}
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <span className="admin-brand-badge">ADMIN</span>
          <span className="admin-topbar__title">Portfolio Content Management</span>
        </div>

        <div className="admin-topbar__actions">
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
            <button type="button" className="admin-btn admin-btn--ghost" onClick={discardDraft} title="Discard draft edits">
              <RotateCcw size={14} />
              <span>Discard</span>
            </button>
          )}

          <button type="button" className="admin-btn admin-btn--success" onClick={publishContent} title="Publish all changes live">
            <CheckCircle2 size={15} />
            <span>Publish Live</span>
          </button>

          {toggleTheme && (
            <button type="button" className="admin-btn admin-btn--ghost" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          )}

          <button type="button" className="admin-btn admin-btn--ghost" onClick={onExit} title="Return to Public Portfolio">
            <span>Live Site</span>
            <ArrowUpRight size={14} />
          </button>

          {onLogout && (
            <button type="button" className="admin-btn admin-btn--ghost admin-btn--logout" onClick={onLogout} title="Log out of Admin">
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Main Layout Body ─────────────────────────── */}
      <div className="admin-body">
        {/* Left Sidebar */}
        <aside className="admin-sidebar" aria-label="Admin Navigation">
          <div className="admin-sidebar-nav">
            {navSections.map(section => (
              <div key={section.label} style={{ marginBottom: '8px' }}>
                <div style={{
                  fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.28)', padding: '10px 14px 4px',
                  textTransform: 'uppercase',
                }}>
                  {section.label}
                </div>
                {section.tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={`admin-nav-item ${isActive ? 'admin-nav-item--active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                      title={tab.desc}
                    >
                      <div className="admin-nav-item__left">
                        <Icon size={15} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count !== undefined && (
                        <span className="admin-nav-item__count">{tab.count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Center Main Work Area */}
        <main className="admin-main">
          {renderPanel()}
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

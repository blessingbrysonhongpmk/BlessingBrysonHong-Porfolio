import { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { PortfolioContext } from './PortfolioContextInstance';
export { usePortfolioContent } from './usePortfolioContent';

const STORAGE_KEY = 'bbh_portfolio_content_v6';

function loadInitialContent() {
  if (typeof window === 'undefined') return PORTFOLIO_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PORTFOLIO_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...PORTFOLIO_DATA,
      ...parsed,
      profile: { ...PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
      aboutPreview: { ...PORTFOLIO_DATA.aboutPreview, ...(parsed.aboutPreview || {}) },
    };
  } catch (err) {
    console.error('Failed to load portfolio content from localStorage:', err);
    return PORTFOLIO_DATA;
  }
}

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(loadInitialContent);
  const [draftContent, setDraftContent] = useState(loadInitialContent);
  const [isDirty, setIsDirty] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show a momentary toast in admin
  const showToast = useCallback((msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Sync draft dirty state
  useEffect(() => {
    try {
      const isDiff = JSON.stringify(content) !== JSON.stringify(draftContent);
      setIsDirty(isDiff);
    } catch {
      setIsDirty(false);
    }
  }, [content, draftContent]);

  // Update a specific section or property in draft
  const updateDraft = useCallback((section, updater) => {
    setDraftContent((prev) => {
      const currentSection = prev[section];
      const updatedSection = typeof updater === 'function' ? updater(currentSection) : updater;
      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  }, []);

  // Update a full project by its ID
  const updateProject = useCallback((projectId, updatedProjectData) => {
    setDraftContent((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === projectId ? { ...p, ...updatedProjectData } : p)),
    }));
  }, []);

  // Add a new project
  const addProject = useCallback((newProject) => {
    setDraftContent((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    showToast('New project created in draft', 'info');
  }, [showToast]);

  // Delete a project
  const deleteProject = useCallback((projectId) => {
    setDraftContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
    }));
    showToast('Project removed from draft', 'warning');
  }, [showToast]);

  // Publish: Commit draft to live site and persist to localStorage
  const publishContent = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftContent));
      setContent(draftContent);
      setIsDirty(false);
      showToast('Successfully published! Public portfolio is updated.', 'success');
      return true;
    } catch (err) {
      console.error('Failed to publish content:', err);
      showToast('Failed to publish changes.', 'error');
      return false;
    }
  }, [draftContent, showToast]);

  // Discard draft edits and revert to published
  const discardDraft = useCallback(() => {
    setDraftContent(content);
    setIsDirty(false);
    showToast('Reverted draft to currently published version', 'info');
  }, [content, showToast]);

  // Reset everything to default initial PORTFOLIO_DATA
  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(PORTFOLIO_DATA);
    setDraftContent(PORTFOLIO_DATA);
    setIsDirty(false);
    showToast('Reset all content to original defaults', 'info');
  }, [showToast]);

  // Export content to JSON
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(draftContent, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bbh-portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Content exported to JSON file', 'success');
  }, [draftContent, showToast]);

  // Import content from JSON string
  const importData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.profile || !parsed.projects) {
        throw new Error('Invalid portfolio content schema');
      }
      setDraftContent(parsed);
      showToast('Imported content into draft! Click Publish to apply.', 'info');
      return true;
    } catch (err) {
      console.error('Failed to import data:', err);
      showToast('Invalid JSON file format', 'error');
      return false;
    }
  }, [showToast]);

  // Validation: Guard against Java, C#, and REST APIs
  const isValidSkillName = useCallback((name) => {
    if (!name) return false;
    const lower = name.trim().toLowerCase();
    if (
      lower === 'java' ||
      lower === 'c#' ||
      lower === 'c sharp' ||
      lower === 'csharp' ||
      lower === 'rest api' ||
      lower === 'rest apis' ||
      lower === 'rest' ||
      lower === 'restful' ||
      lower === 'restful api'
    ) {
      return false;
    }
    return true;
  }, []);

  const value = {
    content,
    draftContent,
    isDirty,
    toastMessage,
    updateDraft,
    updateProject,
    addProject,
    deleteProject,
    publishContent,
    discardDraft,
    resetToDefault,
    exportData,
    importData,
    isValidSkillName,
    showToast,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

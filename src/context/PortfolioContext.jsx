import { useState, useEffect, useCallback, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { PortfolioContext } from './PortfolioContextInstance';
// eslint-disable-next-line react-refresh/only-export-components
export { usePortfolioContent } from './usePortfolioContent';

// ─────────────────────────────────────────────────────────────────
//  Firebase imports — guarded so the module never crashes when
//  Firebase is not yet configured (.env file missing).
// ─────────────────────────────────────────────────────────────────
import { isFirebaseConfigured, db } from '../firebase/firebase';
// Firestore functions are only called when isFirebaseConfigured is true
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// ─────────────────────────────────────────────────────────────────
//  Firestore document location
//  Collection: "portfolio"  →  Document: "content"
// ─────────────────────────────────────────────────────────────────
const FIRESTORE_DOC = { collection: 'portfolio', id: 'content' };

// Legacy localStorage key — kept only for one-time migration
const LEGACY_STORAGE_KEY = 'bbh_portfolio_content_v9';

// Local-only fallback storage key (used when Firebase is not configured)
const LOCAL_STORAGE_KEY = 'bbh_portfolio_content_local';

// ─────────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────────
function stripMinor(data) {
  if (!data) return data;
  const result = { ...data };
  if (result.profile && 'minor' in result.profile) delete result.profile.minor;
  if (result.aboutPreview && 'minor' in result.aboutPreview) delete result.aboutPreview.minor;
  if (Array.isArray(result.education)) {
    result.education = result.education.map(({ minor: _, ...rest }) => rest);
  }
  return result;
}

function mergeWithDefaults(parsed) {
  if (!parsed) return PORTFOLIO_DATA;
  return stripMinor({
    ...PORTFOLIO_DATA,
    ...parsed,
    profile:            { ...PORTFOLIO_DATA.profile,      ...(parsed.profile      || {}) },
    aboutPreview:       { ...PORTFOLIO_DATA.aboutPreview,  ...(parsed.aboutPreview  || {}) },
    companyExperiences: parsed.companyExperiences || PORTFOLIO_DATA.companyExperiences,
  });
}

// Load from localStorage (offline fallback when Firebase not configured)
function loadLocalContent() {
  try {
    // Migrate legacy key
    ['bbh_portfolio_content_v6','bbh_portfolio_content_v7','bbh_portfolio_content_v8'].forEach(k => {
      try { localStorage.removeItem(k); } catch {}
    });
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return PORTFOLIO_DATA;
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return PORTFOLIO_DATA;
  }
}

// ─────────────────────────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────────────────────────
export function PortfolioProvider({ children }) {
  const [content, setContent]           = useState(PORTFOLIO_DATA);
  const [draftContent, setDraftContent] = useState(PORTFOLIO_DATA);
  const [isDirty, setIsDirty]           = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading]       = useState(true);

  const hasMigrated = useRef(false);

  // ── Toast ────────────────────────────────────────────────────
  const showToast = useCallback((msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // ── Data loading ─────────────────────────────────────────────
  useEffect(() => {
    // ── PATH A: Firebase configured → use Firestore ───────────
    if (isFirebaseConfigured && db) {
      let unsubscribe = () => {};
      const docRef = doc(db, FIRESTORE_DOC.collection, FIRESTORE_DOC.id);

      async function init() {
        try {
          // One-time migration: push legacy localStorage data to Firestore if present
          if (!hasMigrated.current) {
            hasMigrated.current = true;
            const legacyRaw =
              localStorage.getItem(LEGACY_STORAGE_KEY) ||
              localStorage.getItem(LOCAL_STORAGE_KEY);
            if (legacyRaw) {
              try {
                const legacyData = JSON.parse(legacyRaw);
                const snap = await getDoc(docRef);
                if (!snap.exists()) {
                  await setDoc(docRef, mergeWithDefaults(legacyData));
                  console.log('Firestore write success (migrated legacy data)');
                }
              } catch (migErr) {
                if (migErr.code === 'permission-denied') {
                  console.error('Firestore permission denied');
                } else {
                  console.warn('Migration skipped:', migErr.message);
                }
              }
              localStorage.removeItem(LEGACY_STORAGE_KEY);
              localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
          }

          // Live Firestore listener on /portfolio/content
          unsubscribe = onSnapshot(
            docRef,
            (snap) => {
              console.log('Firestore read success');
              const data = snap.exists() ? mergeWithDefaults(snap.data()) : PORTFOLIO_DATA;
              setContent(data);
              setDraftContent(data);
              setIsLoading(false);
            },
            (err) => {
              if (err.code === 'permission-denied') {
                console.error('Firestore permission denied');
              } else {
                console.error('Firestore read error:', err.code, err.message);
              }
              setContent(PORTFOLIO_DATA);
              setDraftContent(PORTFOLIO_DATA);
              setIsLoading(false);
            }
          );
        } catch (err) {
          console.error('Firestore initialization error:', err);
          setIsLoading(false);
        }
      }

      init();
      return () => unsubscribe();
    }

    // ── PATH B: Firebase NOT configured ────────────────────────
    console.error('Firebase configuration error: Firebase is not configured. Missing environment variables in .env');
    const localData = loadLocalContent();
    setContent(localData);
    setDraftContent(localData);
    setIsLoading(false);
  }, []);

  // ── Dirty state ──────────────────────────────────────────────
  useEffect(() => {
    try {
      setIsDirty(JSON.stringify(content) !== JSON.stringify(draftContent));
    } catch {
      setIsDirty(false);
    }
  }, [content, draftContent]);

  // ── Draft mutations ──────────────────────────────────────────
  const updateDraft = useCallback((section, updater) => {
    setDraftContent((prev) => {
      const current = prev[section];
      const updated = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [section]: updated };
    });
  }, []);

  const updateProject = useCallback((projectId, updatedData) => {
    setDraftContent((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, ...updatedData } : p
      ),
    }));
  }, []);

  const addProject = useCallback((newProject) => {
    setDraftContent((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    showToast('New project created in draft', 'info');
  }, [showToast]);

  const deleteProject = useCallback((projectId) => {
    setDraftContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId),
    }));
    showToast('Project removed from draft', 'warning');
  }, [showToast]);

  // ── Publish ──────────────────────────────────────────────────
  const publishContent = useCallback(async () => {
    // Firestore path
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, FIRESTORE_DOC.collection, FIRESTORE_DOC.id), draftContent);
        console.log('Firestore write success');
        setIsDirty(false);
        showToast('Successfully published live to Firebase Firestore!', 'success');
        return true;
      } catch (err) {
        if (err.code === 'permission-denied') {
          console.error('Firestore permission denied');
          showToast('Firestore permission denied. Only admin UID l3eJDFMWJmfpmmCKwXNmMMujk9g2 can publish.', 'error');
        } else {
          console.error('Firestore write error:', err.code, err.message);
          showToast(`Firestore write failed: ${err.message}`, 'error');
        }
        return false;
      }
    }

    // Firebase not configured
    console.error('Firebase configuration error: Cannot publish to Firestore. Firebase credentials missing in .env');
    showToast('Firebase is not configured. Add your Firebase credentials to .env to publish.', 'error');
    return false;
  }, [draftContent, showToast]);

  // ── Discard ──────────────────────────────────────────────────
  const discardDraft = useCallback(() => {
    setDraftContent(content);
    setIsDirty(false);
    showToast('Reverted draft to currently published version', 'info');
  }, [content, showToast]);

  // ── Reset to defaults ────────────────────────────────────────
  const resetToDefault = useCallback(async () => {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, FIRESTORE_DOC.collection, FIRESTORE_DOC.id), PORTFOLIO_DATA);
        console.log('Firestore write success');
        setContent(PORTFOLIO_DATA);
        setDraftContent(PORTFOLIO_DATA);
        setIsDirty(false);
        showToast('Reset all content to original defaults in Firestore', 'info');
        return;
      } catch (err) {
        if (err.code === 'permission-denied') {
          console.error('Firestore permission denied');
          showToast('Firestore permission denied. Only admin UID l3eJDFMWJmfpmmCKwXNmMMujk9g2 can reset.', 'error');
        } else {
          console.error('Firestore write error:', err.code, err.message);
          showToast(`Firestore write failed: ${err.message}`, 'error');
        }
        return;
      }
    }

    console.error('Firebase configuration error: Cannot reset Firestore. Firebase credentials missing in .env');
    showToast('Firebase is not configured. Add credentials to .env to reset.', 'error');
  }, [showToast]);

  // ── Export ───────────────────────────────────────────────────
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(draftContent, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = `bbh-portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Content exported to JSON file', 'success');
  }, [draftContent, showToast]);

  // ── Import ───────────────────────────────────────────────────
  const importData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.profile || !parsed.projects) throw new Error('Invalid schema');
      setDraftContent(parsed);
      showToast('Imported into draft! Click Publish to apply.', 'info');
      return true;
    } catch (err) {
      console.error('[BBH] Import failed:', err);
      showToast('Invalid JSON file format', 'error');
      return false;
    }
  }, [showToast]);

  // ── Skill validation ─────────────────────────────────────────
  const isValidSkillName = useCallback((name) => {
    if (!name) return false;
    const lower = name.trim().toLowerCase();
    const blocked = ['java','c#','c sharp','csharp','rest api','rest apis','restful'];
    return !blocked.some((t) => lower === t || lower.includes(t));
  }, []);

  // ─────────────────────────────────────────────────────────────
  const value = {
    content, draftContent, isDirty, isLoading, toastMessage,
    updateDraft, updateProject, addProject, deleteProject,
    publishContent, discardDraft, resetToDefault,
    exportData, importData, isValidSkillName, showToast,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

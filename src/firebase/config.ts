// ─────────────────────────────────────────────────────────────
//  BBH Portfolio — Firebase Configuration
//  Re-exports configured instances from firebase.js
// ─────────────────────────────────────────────────────────────
export {
  app,
  auth,
  db,
  isFirebaseConfigured,
  firebaseMissingKeys,
  ADMIN_UID,
  default,
} from './firebase';

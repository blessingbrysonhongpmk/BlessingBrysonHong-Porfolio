// ─────────────────────────────────────────────────────────────
// BBH Portfolio — Master Admin Authentication Configuration
// Single Source of Truth for Administrator Access
// ─────────────────────────────────────────────────────────────

export const MASTER_ADMIN_EMAIL = 'blessing28022006@gmail.com';
export const MASTER_ADMIN_PASS = 'PMKBBH1324';

// Designated Firebase Auth UID locked in firestore.rules
export const ADMIN_UID = 'l3eJDFMWJmfpmmCKwXNmMMujk9g2';

// Additional authorized email accounts (if any)
export const AUTHORIZED_EMAILS = [
  'blessing28022006@gmail.com',
  'blessingbrysonhongpmk@gmail.com',
];

/**
 * Validates whether the supplied email and password match master admin credentials.
 */
export function isMasterAdminCredentials(email, password) {
  if (!email || !password) return false;
  return (
    email.trim().toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() &&
    password.trim() === MASTER_ADMIN_PASS
  );
}

/**
 * Checks whether a Firebase User (or session object) is an authorized administrator.
 */
export function isAuthorizedAdminUser(user) {
  if (!user) return false;
  const email = user.email?.toLowerCase();
  const uid = user.uid;

  if (uid === ADMIN_UID) return true;
  if (email && AUTHORIZED_EMAILS.some((authEmail) => authEmail.toLowerCase() === email)) {
    return true;
  }
  return false;
}

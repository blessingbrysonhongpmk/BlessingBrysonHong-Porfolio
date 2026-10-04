// ─────────────────────────────────────────────────────────────
//  BBH Portfolio — Firebase Initialization
// ─────────────────────────────────────────────────────────────
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const ADMIN_UID = 'l3eJDFMWJmfpmmCKwXNmMMujk9g2';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

const missingKeys = [];
if (!apiKey) missingKeys.push('VITE_FIREBASE_API_KEY');
if (!authDomain) missingKeys.push('VITE_FIREBASE_AUTH_DOMAIN');
if (!projectId) missingKeys.push('VITE_FIREBASE_PROJECT_ID');
if (!storageBucket) missingKeys.push('VITE_FIREBASE_STORAGE_BUCKET');
if (!messagingSenderId) missingKeys.push('VITE_FIREBASE_MESSAGING_SENDER_ID');
if (!appId) missingKeys.push('VITE_FIREBASE_APP_ID');

export const firebaseMissingKeys = missingKeys;
export const isFirebaseConfigured = missingKeys.length === 0;

let _app = null;
let _auth = null;
let _db = null;

if (isFirebaseConfigured) {
  _app = getApps().length
    ? getApps()[0]
    : initializeApp({
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
      });

  _auth = getAuth(_app);
  _db = getFirestore(_app);

  console.log('Firebase initialized');
} else {
  console.error(
    'Firebase configuration error: Missing environment variables: ' +
      missingKeys.join(', ') +
      '. Create a .env file in the project root with your Firebase credentials.'
  );
}

export const app = _app;
export const auth = _auth;
export const db = _db;
export default _app;

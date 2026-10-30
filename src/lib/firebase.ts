import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA12AN5bbTqtOnsobCx-Mw7hsF4x3FHjiI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'gmq-new-website.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'gmq-new-website',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'gmq-new-website.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1013642126010',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1013642126010:web:ce7bb84c24a0db8d6a1883',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-HPEBN0TEFG'
};

// Initialize Firebase (singleton pattern)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics guarded for environments supporting browser window
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in this environment:', err);
  });
}

export default app;

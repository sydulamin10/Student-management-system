import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
import { getMessaging, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
}

export const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'your_api_key'
)

// Use live Firebase when configured and mock mode is explicitly disabled
export const useMockData =
  !isFirebaseConfigured || import.meta.env.VITE_USE_MOCK_DATA === 'true'

let app = null
let auth = null
let db = null
let storage = null
let rtdb = null
let messaging = null
let googleProvider = null

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  googleProvider = new GoogleAuthProvider()

  // Realtime Database is optional — only init when a database URL is provided
  if (firebaseConfig.databaseURL) {
    rtdb = getDatabase(app)
  }
}

export async function initMessaging() {
  if (!app || messaging) return messaging
  const supported = await isSupported().catch(() => false)
  if (!supported) return null
  messaging = getMessaging(app)
  return messaging
}

export { app, auth, db, storage, rtdb, messaging, googleProvider, firebaseConfig }


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider, useMockData } from '../../firebase/config'
import { demoUsers } from '../../data/demoData'
import { isAuthSetupError, mapAuthError } from '../../utils/authErrors'

function toAuthError(error) {
  const err = new Error(mapAuthError(error))
  err.code = error?.code
  return err
}

function createLocalProfile({ name, email, role = 'student' }) {
  const user = {
    id: `local-${Date.now()}`,
    name: name || email.split('@')[0],
    email,
    role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || email)}`,
    title: role.charAt(0).toUpperCase() + role.slice(1),
    localOnly: true,
  }
  setMockUser(user)
  return user
}

const MOCK_SESSION_KEY = 'eduvista_mock_user'

export function getMockUser() {
  try {
    const raw = localStorage.getItem(MOCK_SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setMockUser(user) {
  if (user) localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user))
  else localStorage.removeItem(MOCK_SESSION_KEY)
}

export async function loginWithEmail(email, password) {
  if (useMockData) {
    const match = Object.values(demoUsers).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )
    if (!match && password.length < 4) {
      throw new Error('Invalid credentials. Try a demo account or any password with 4+ chars.')
    }
    const user = match || {
      id: 'u-custom',
      name: email.split('@')[0],
      email,
      role: 'admin',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      title: 'Campus User',
    }
    setMockUser(user)
    return user
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const existing = await getUserProfile(cred.user.uid)
    if (existing) return existing
    return {
      id: cred.user.uid,
      name: cred.user.displayName || email.split('@')[0],
      email: cred.user.email,
      role: 'student',
      avatar: cred.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cred.user.uid}`,
      title: 'Student',
    }
  } catch (error) {
    // Auth product not configured yet — keep the app usable with a local session
    if (isAuthSetupError(error)) {
      const match = Object.values(demoUsers).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      )
      return match ? (setMockUser(match), match) : createLocalProfile({ email, role: 'admin' })
    }
    throw toAuthError(error)
  }
}

export async function registerWithEmail({ name, email, password, role = 'student' }) {
  if (useMockData) {
    const user = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      title: role.charAt(0).toUpperCase() + role.slice(1),
    }
    setMockUser(user)
    return user
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    const profile = {
      id: cred.user.uid,
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      title: role.charAt(0).toUpperCase() + role.slice(1),
    }
    try {
      await setDoc(doc(db, 'users', cred.user.uid), profile)
    } catch {
      // Auth account still works even if Firestore profile write is blocked
    }
    return profile
  } catch (error) {
    if (isAuthSetupError(error)) {
      return createLocalProfile({ name, email, role })
    }
    throw toAuthError(error)
  }
}

export async function loginWithGoogle() {
  if (useMockData) {
    const user = demoUsers.admin
    setMockUser(user)
    return user
  }
  try {
    const cred = await signInWithPopup(auth, googleProvider)
    const existing = await getUserProfile(cred.user.uid)
    if (existing) return existing
    const profile = {
      id: cred.user.uid,
      name: cred.user.displayName || 'User',
      email: cred.user.email,
      role: 'student',
      avatar: cred.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cred.user.uid}`,
      title: 'Student',
    }
    try {
      await setDoc(doc(db, 'users', cred.user.uid), profile)
    } catch {
      // ignore profile write failures
    }
    return profile
  } catch (error) {
    throw toAuthError(error)
  }
}

export async function logout() {
  setMockUser(null)
  if (!useMockData && auth) {
    await signOut(auth)
  }
}

export async function resetPassword(email) {
  if (useMockData) {
    return { message: `Password reset link simulated for ${email}` }
  }
  try {
    await sendPasswordResetEmail(auth, email)
    return { message: `Password reset email sent to ${email}` }
  } catch (error) {
    throw toAuthError(error)
  }
}

export async function getUserProfile(uid) {
  if (!db) return null
  try {
    const snap = await Promise.race([
      getDoc(doc(db, 'users', uid)),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('profile-timeout')), 2000)
      ),
    ])
    return snap.exists() ? { id: snap.id, ...snap.data() } : null
  } catch {
    return null
  }
}

export function subscribeToAuth(callback) {
  if (useMockData) {
    callback(getMockUser())
    const handler = () => callback(getMockUser())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }

  if (!auth) {
    callback(getMockUser())
    return () => {}
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    try {
      if (!firebaseUser) {
        callback(null)
        return
      }
      const profile = await getUserProfile(firebaseUser.uid)
      callback(
        profile || {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          role: 'student',
          avatar: firebaseUser.photoURL,
        }
      )
    } catch {
      callback(null)
    }
  })
}

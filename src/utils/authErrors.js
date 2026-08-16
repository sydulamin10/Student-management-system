const MESSAGES = {
  'auth/configuration-not-found':
    'Firebase Authentication is not set up yet. Open Firebase Console → Authentication → Get started, then enable Email/Password.',
  'auth/operation-not-allowed':
    'Email/Password sign-in is disabled. Enable it in Firebase Console → Authentication → Sign-in method.',
  'auth/email-already-in-use': 'An account already exists with this email. Try signing in instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Try again or reset it.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  'auth/popup-blocked': 'Pop-up was blocked. Allow pop-ups for this site and retry.',
  'auth/unauthorized-domain':
    'This domain is not authorized. Add it under Authentication → Settings → Authorized domains.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'permission-denied':
    'Firestore permission denied. Create a Firestore database and deploy security rules.',
}

export function isAuthSetupError(error) {
  const code = error?.code || ''
  const message = String(error?.message || '')
  return (
    code === 'auth/configuration-not-found' ||
    code === 'auth/operation-not-allowed' ||
    message.includes('CONFIGURATION_NOT_FOUND') ||
    message.includes('OPERATION_NOT_ALLOWED')
  )
}

export function mapAuthError(error) {
  if (!error) return 'Authentication failed'
  const code = error.code || ''
  if (MESSAGES[code]) return MESSAGES[code]

  const message = String(error.message || '')
  if (message.includes('OPERATION_NOT_ALLOWED')) return MESSAGES['auth/operation-not-allowed']
  if (message.includes('EMAIL_EXISTS')) return MESSAGES['auth/email-already-in-use']
  if (message.includes('INVALID_LOGIN_CREDENTIALS')) return MESSAGES['auth/invalid-credential']

  return message.replace(/^Firebase:\s*/i, '').replace(/\s*\(.*\)\s*$/, '') || 'Authentication failed'
}

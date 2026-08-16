import { getToken, onMessage } from 'firebase/messaging'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { initMessaging, vapidKey, db, useMockData } from '../../firebase/config'

const TOKEN_KEY = 'eduvista_fcm_token'

export async function requestPushPermission(userId) {
  if (useMockData || !vapidKey) {
    return { token: null, reason: 'Push requires live Firebase + VAPID key' }
  }

  if (!('Notification' in window)) {
    return { token: null, reason: 'Notifications are not supported in this browser' }
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    return { token: null, reason: 'Notification permission denied' }
  }

  const messaging = await initMessaging()
  if (!messaging) {
    return { token: null, reason: 'Firebase Messaging is not supported here' }
  }

  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: registration,
  })

  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
    if (userId && db) {
      await setDoc(
        doc(db, 'fcm_tokens', userId),
        { token, updatedAt: serverTimestamp(), platform: 'web' },
        { merge: true }
      )
    }
  }

  return { token, reason: token ? null : 'Unable to create push token' }
}

export function getSavedPushToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export async function listenForForegroundMessages(onNotify) {
  const messaging = await initMessaging()
  if (!messaging) return () => {}

  return onMessage(messaging, (payload) => {
    onNotify?.({
      title: payload.notification?.title || 'EDUVISTA',
      body: payload.notification?.body || '',
      data: payload.data || {},
    })
  })
}

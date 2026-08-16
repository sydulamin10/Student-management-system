/* eslint-disable no-undef */
// Firebase Cloud Messaging service worker for EDUVISTA web push
importScripts('https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyAFaNBI4I41EEWdNVMHPxweiX4yqsiaDGI',
  authDomain: 'srm-system-new.firebaseapp.com',
  projectId: 'srm-system-new',
  storageBucket: 'srm-system-new.firebasestorage.app',
  messagingSenderId: '523602194097',
  appId: '1:523602194097:web:564b97f32fd562f3c57c90',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'EDUVISTA'
  const options = {
    body: payload.notification?.body || 'You have a new campus update.',
    icon: '/eduvista.svg',
    badge: '/eduvista.svg',
    data: payload.data || {},
  }
  self.registration.showNotification(title, options)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/app/notifications'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(url)
          return client.focus()
        }
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})

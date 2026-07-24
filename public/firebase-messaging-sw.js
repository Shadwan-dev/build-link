// ✅ Service Worker para Firebase Cloud Messaging
// Este archivo debe estar en la carpeta public/

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ✅ Configuración de Firebase (misma que en el frontend)
firebase.initializeApp({
  apiKey: 'AIzaSyBAhN1goGZr7XgQ3hSp-D5vxw9dn6CeiC8',
  authDomain: 'build-link-enterprise.firebaseapp.com',
  projectId: 'build-link-enterprise',
  storageBucket: 'build-link-enterprise.firebasestorage.app',
  messagingSenderId: '110796812377',
  appId: '1:110796812377:web:4227aa8a4c7e67c1498148',
  measurementId: 'G-VPF2KKT2JC',
});

// ✅ Inicializar Firebase Messaging
const messaging = firebase.messaging();

// ✅ Manejar mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('📩 Mensaje en segundo plano recibido:', payload);

  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || 'Tienes una nueva notificación',
    icon: '/icon-192x192.png',
    badge: '/favicon-32x32.png',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    actions: [
      {
        action: 'open',
        title: 'Ver ahora',
      },
      {
        action: 'close',
        title: 'Cerrar',
      },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notificación clickeada:', event);

  event.notification.close();

  // ✅ Redirigir según los datos de la notificación
  const urlToOpen = event.notification.data?.link || '/dashboard';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // ✅ Si ya hay una ventana abierta, enfocarla
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // ✅ Si no, abrir una nueva
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

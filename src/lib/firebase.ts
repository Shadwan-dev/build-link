// lib/firebase.ts - ACTUALIZADO
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Configuración de Firebase para evitar eval
const firebaseSettings = {
  experimentalForceLongPolling: true, // Evita WebChannel que usa eval
  useFetchStreams: false,
};

// Inicializar Firebase solo una vez
let app;
let analytics;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);

  // Deshabilitar analytics en desarrollo si causa problemas
  if (process.env.NODE_ENV === 'production') {
    import('firebase/analytics')
      .then(({ getAnalytics, isSupported }) => {
        isSupported().then((supported) => {
          if (supported) {
            analytics = getAnalytics(app);
          }
        });
      })
      .catch(() => {
        console.log('Analytics no disponible');
      });
  }
} else if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Exportar servicios con configuración segura
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
export default app;

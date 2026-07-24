import { getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Functions, getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ✅ Inicializar app (evita duplicados en SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Servicios (solo en cliente)
let auth: Auth | null = null;
let db: Firestore | null = null;
let functions: Functions | null = null;

if (typeof window !== 'undefined') {
  try {
    // ✅ Auth - Persistencia local
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence)
      .then(() => console.log('✅ Persistencia de Auth configurada'))
      .catch((error) => console.warn('⚠️ Error setting auth persistence:', error));

    // ✅ Firestore - Configuración simple y estable
    // getFirestore es suficiente para producción, sin persistencia offline
    db = getFirestore(app);

    // ✅ Functions
    functions = getFunctions(app);

    // ✅ Solo log en desarrollo, no en producción
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Firebase inicializado correctamente');
      console.log('📡 Modo: Online');
    }
  } catch (error) {
    console.error('❌ Error inicializando Firebase:', error);
  }
}

// ✅ Exportaciones
export { app, auth, db, functions };

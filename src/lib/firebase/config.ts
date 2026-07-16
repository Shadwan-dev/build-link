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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth: Auth | null = null;
let db: Firestore | null = null;
let functions: Functions | null = null;

if (typeof window !== 'undefined') {
  try {
    // ✅ Auth - Persistencia básica
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence)
      .then(() => console.log('✅ Persistencia de Auth configurada'))
      .catch((error) => console.warn('⚠️ Error setting auth persistence:', error));

    // ✅ Firestore - CONFIGURACIÓN MÁS SIMPLE POSIBLE
    // Sin persistencia offline para evitar errores de caché
    db = getFirestore(app);

    functions = getFunctions(app);

    console.log('✅ Firebase inicializado correctamente');
    console.log('📡 Modo: Online (sin persistencia offline)');
  } catch (error) {
    console.error('❌ Error inicializando Firebase:', error);
  }
}

export { app, auth, db, functions };

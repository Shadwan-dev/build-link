import { getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Functions, getFunctions } from 'firebase/functions';
import { FirebaseStorage, getStorage } from 'firebase/storage'; // ✅ AÑADIR

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ✅ Inicializar app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Servicios
let auth: Auth | null = null;
let db: Firestore | null = null;
let functions: Functions | null = null;
let storage: FirebaseStorage | null = null; // ✅ NUEVO

if (typeof window !== 'undefined') {
  try {
    // ✅ Auth
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence).catch(console.warn);

    // ✅ Firestore
    db = getFirestore(app);

    // ✅ Storage
    storage = getStorage(app);

    // ✅ Functions
    functions = getFunctions(app);

    console.log('✅ Firebase inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Firebase:', error);
  }
}

export { app, auth, db, functions, storage }; // ✅ EXPORTAR STORAGE

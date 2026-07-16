import {
  Auth,
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, Firestore, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './config';

// ============================================
// TIPOS
// ============================================

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: 'client' | 'provider';
  phone?: string;
  createdAt: any;
  updatedAt: any;
  emailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: any;
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

const getAuth = (): Auth => {
  if (!auth) {
    throw new Error('Firebase Auth no está disponible.');
  }
  return auth;
};

const getDb = (): Firestore => {
  if (!db) {
    throw new Error('Firebase Firestore no está disponible.');
  }
  return db;
};

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

/**
 * Registrar un nuevo usuario con email y contraseña
 */
const registerUser = async (
  email: string,
  password: string,
  userData: Partial<UserData>
): Promise<UserCredential> => {
  try {
    const authInstance = getAuth();
    const dbInstance = getDb();

    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    // Actualizar perfil
    await updateProfile(user, {
      displayName: userData.displayName || '',
    });

    // Crear documento en Firestore
    const newUserData: UserData = {
      uid: user.uid,
      email: user.email || '',
      displayName: userData.displayName || 'Usuario',
      photoURL: userData.photoURL || '',
      role: userData.role || 'client',
      phone: userData.phone || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      emailVerified: user.emailVerified,
      isActive: true,
    };

    await setDoc(doc(dbInstance, 'users', user.uid), newUserData);

    // Enviar email de verificación
    await sendEmailVerification(user);

    return userCredential;
  } catch (error: any) {
    console.error('❌ Error en registro:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Iniciar sesión con email y contraseña
 */
const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const authInstance = getAuth();
    const dbInstance = getDb();

    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    const user = userCredential.user;

    try {
      const userDoc = await getDoc(doc(dbInstance, 'users', user.uid));
      if (!userDoc.exists()) {
        // Si no existe, crearlo
        const userData: UserData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Usuario',
          photoURL: user.photoURL || '',
          role: 'client',
          phone: user.phoneNumber || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          emailVerified: user.emailVerified,
          isActive: true,
        };
        await setDoc(doc(dbInstance, 'users', user.uid), userData);
      } else {
        // Actualizar último login
        await updateDoc(doc(dbInstance, 'users', user.uid), {
          lastLoginAt: serverTimestamp(),
        });
      }
    } catch (firestoreError) {
      console.warn('⚠️ Error en Firestore, pero usuario autenticado:', firestoreError);
    }

    return user;
  } catch (error: any) {
    console.error('❌ Error en login:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Cerrar sesión
 */
const logoutUser = async (): Promise<void> => {
  try {
    const authInstance = getAuth();
    await signOut(authInstance);
  } catch (error: any) {
    console.error('❌ Error en logout:', error);
    throw new Error('Error al cerrar sesión');
  }
};

/**
 * Recuperar contraseña
 */
const resetPassword = async (email: string): Promise<void> => {
  try {
    const authInstance = getAuth();
    await sendPasswordResetEmail(authInstance, email);
  } catch (error: any) {
    console.error('❌ Error en reset password:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

// ============================================
// FUNCIONES DE USUARIO
// ============================================

const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const dbInstance = getDb();
    const userDoc = await getDoc(doc(dbInstance, 'users', uid));

    if (userDoc.exists()) {
      return { uid, ...userDoc.data() } as UserData;
    }
    return null;
  } catch (error: any) {
    console.warn('⚠️ Error obteniendo usuario de Firestore:', error.message);
    return null;
  }
};

const updateUserRoleWithRetry = async (
  uid: string,
  role: 'client' | 'provider',
  maxRetries: number = 2
): Promise<void> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Intento ${attempt}/${maxRetries} para actualizar rol...`);

      const dbInstance = getDb();

      // ✅ Actualizar directamente SIN enableNetwork
      await updateDoc(doc(dbInstance, 'users', uid), {
        role: role,
        updatedAt: serverTimestamp(),
      });

      console.log(`✅ Rol actualizado a: ${role} (intento ${attempt})`);

      // Si es proveedor, crear entrada en providers
      if (role === 'provider') {
        try {
          const userDoc = await getDoc(doc(dbInstance, 'users', uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            const providerRef = doc(dbInstance, 'providers', uid);
            const providerDoc = await getDoc(providerRef);

            if (!providerDoc.exists()) {
              await setDoc(providerRef, {
                displayName: userData.displayName || 'Proveedor',
                email: userData.email,
                photoURL: userData.photoURL || '',
                specialties: [],
                rating: 0,
                totalRatings: 0,
                isActive: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
            }
          }
        } catch (providerError) {
          console.warn('⚠️ Error creando perfil de proveedor:', providerError);
        }
      }

      return; // ✅ Éxito
    } catch (error) {
      lastError = error;
      console.warn(`⚠️ Intento ${attempt} fallido:`, error);

      if (attempt < maxRetries) {
        const delay = 1000 * attempt;
        console.log(`⏳ Esperando ${delay}ms antes de reintentar...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error('❌ Todos los intentos de actualización fallaron:', lastError);
  throw new Error('No se pudo actualizar el rol. Verifica tu conexión.');
};

/**
 * Actualizar datos del usuario
 */
const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  try {
    const dbInstance = getDb();
    await updateDoc(doc(dbInstance, 'users', uid), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Datos de usuario actualizados');
  } catch (error: any) {
    console.error('❌ Error actualizando usuario:', error);
    throw new Error('Error al actualizar perfil');
  }
};

/**
 * Actualizar rol del usuario (versión simple)
 */
const updateUserRole = async (uid: string, role: 'client' | 'provider'): Promise<void> => {
  try {
    const dbInstance = getDb();
    await updateDoc(doc(dbInstance, 'users', uid), {
      role: role,
      updatedAt: serverTimestamp(),
    });

    // Si es proveedor, crear entrada en providers
    if (role === 'provider') {
      try {
        const userDoc = await getDoc(doc(dbInstance, 'users', uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          const providerRef = doc(dbInstance, 'providers', uid);
          const providerDoc = await getDoc(providerRef);

          if (!providerDoc.exists()) {
            await setDoc(providerRef, {
              displayName: userData.displayName || 'Proveedor',
              email: userData.email,
              photoURL: userData.photoURL || '',
              specialties: [],
              rating: 0,
              totalRatings: 0,
              isActive: true,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          }
        }
      } catch (providerError) {
        console.warn('⚠️ Error creando perfil de proveedor:', providerError);
      }
    }

    console.log(`✅ Rol actualizado a: ${role}`);
  } catch (error: any) {
    console.error('❌ Error actualizando rol:', error);
    throw new Error('Error al actualizar el rol');
  }
};

// ============================================
// FUNCIONES DE GOOGLE
// ============================================

/**
 * Iniciar sesión con Google (popup)
 */
const loginWithGoogle = async (): Promise<User> => {
  try {
    const authInstance = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await signInWithPopup(authInstance, provider);
    const user = result.user;

    // Guardar en Firestore
    try {
      const dbInstance = getDb();
      const userDoc = await getDoc(doc(dbInstance, 'users', user.uid));

      if (!userDoc.exists()) {
        const userData: UserData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
          photoURL: user.photoURL || '',
          role: 'client',
          phone: user.phoneNumber || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          emailVerified: user.emailVerified,
          isActive: true,
        };
        await setDoc(doc(dbInstance, 'users', user.uid), userData);

        // También crear en providers
        await setDoc(doc(dbInstance, 'providers', user.uid), {
          displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
          email: user.email,
          photoURL: user.photoURL || '',
          specialties: [],
          rating: 0,
          totalRatings: 0,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(doc(dbInstance, 'users', user.uid), {
          lastLoginAt: serverTimestamp(),
        });
      }
    } catch (firestoreError) {
      console.warn('⚠️ Error guardando usuario en Firestore:', firestoreError);
    }

    return user;
  } catch (error: any) {
    console.error('❌ Error en login con Google:', error);

    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Inicio de sesión cancelado');
    }
    if (error.code === 'auth/popup-blocked') {
      throw new Error('El popup fue bloqueado. Permite popups para este sitio.');
    }
    if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Se canceló la solicitud de inicio de sesión');
    }

    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Redirigir a Google (alternativa para móviles)
 */
const loginWithGoogleRedirect = async (): Promise<void> => {
  try {
    const authInstance = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithRedirect(authInstance, provider);
  } catch (error: any) {
    console.error('❌ Error en redirect a Google:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Manejar el resultado del redirect de Google
 */
const handleGoogleRedirect = async (): Promise<User | null> => {
  try {
    const authInstance = getAuth();
    const result = await getRedirectResult(authInstance);

    if (result) {
      const user = result.user;

      try {
        const dbInstance = getDb();
        const userDoc = await getDoc(doc(dbInstance, 'users', user.uid));

        if (!userDoc.exists()) {
          const userData: UserData = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
            photoURL: user.photoURL || '',
            role: 'client',
            phone: user.phoneNumber || '',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            emailVerified: user.emailVerified,
            isActive: true,
          };
          await setDoc(doc(dbInstance, 'users', user.uid), userData);

          await setDoc(doc(dbInstance, 'providers', user.uid), {
            displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
            email: user.email,
            photoURL: user.photoURL || '',
            specialties: [],
            rating: 0,
            totalRatings: 0,
            isActive: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (firestoreError) {
        console.warn('⚠️ Error guardando usuario en Firestore:', firestoreError);
      }

      return user;
    }
    return null;
  } catch (error: any) {
    console.error('❌ Error en handleGoogleRedirect:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

// ============================================
// MANEJO DE ERRORES
// ============================================

/**
 * Obtener mensaje de error legible
 */
const getErrorMessage = (errorCode: string): string => {
  const errors: Record<string, string> = {
    'auth/email-already-in-use': 'Este email ya está registrado.',
    'auth/invalid-email': 'El email ingresado no es válido.',
    'auth/operation-not-allowed': 'El inicio de sesión con email no está habilitado.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
    'auth/user-not-found': 'No existe una cuenta con este email.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde.',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet.',
    'auth/popup-closed-by-user': 'Inicio de sesión cancelado',
    'auth/popup-blocked': 'El popup fue bloqueado. Permite popups para este sitio.',
    'auth/cancelled-popup-request': 'Se canceló la solicitud de inicio de sesión',
  };
  return errors[errorCode] || 'Ocurrió un error. Intenta nuevamente.';
};

// ============================================
// EXPORTACIONES EXPLÍCITAS
// ============================================

export {
  getUserData,
  handleGoogleRedirect,
  loginUser,
  loginWithGoogle,
  loginWithGoogleRedirect,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserData,
  updateUserRole,
  updateUserRoleWithRetry,
};

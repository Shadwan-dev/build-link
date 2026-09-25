'use client';
import { log } from '@/lib/utils/logger';

import {
  getUserData,
  handleGoogleRedirect,
  loginUser,
  loginWithGoogle,
  loginWithGoogleRedirect,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserData,
  updateUserRoleWithRetry,
} from '@/lib/firebase/auth.service';
import { auth } from '@/lib/firebase/config';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// ✅ Definir tipos para el usuario
interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: 'client' | 'provider';
  createdAt: Date;
  emailVerified: boolean;
  isActive: boolean;
  phone?: string;
}

interface AuthContextType {
  user: AppUser | null;
  firebaseUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGoogleRedirect: () => Promise<void>;
  handleGoogleRedirect: () => Promise<void>;
  register: (email: string, password: string, userData: Partial<AppUser>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (data: Partial<AppUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
  isProvider: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  // Función para cargar datos del usuario
  const loadUserData = useCallback(async (firebaseUser: User): Promise<void> => {
    try {
      // ✅ Intentar obtener de Firestore
      const userData = await getUserData(firebaseUser.uid);

      if (userData) {
        setUser(userData as AppUser);
        // ✅ Guardar en localStorage como respaldo
        localStorage.setItem('user-data', JSON.stringify(userData));
        if (userData.role) {
          localStorage.setItem('user-role', userData.role);
        }
      } else {
        // ✅ Si no hay datos en Firestore, intentar usar localStorage
        const savedUser = localStorage.getItem('user-data');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            if (parsedUser.uid === firebaseUser.uid) {
              setUser(parsedUser);
              log.info('📝 Usuario cargado de localStorage (fallback)');
              return;
            }
          } catch (e) {
            log.warning('⚠️ Error parseando usuario de localStorage');
          }
        }

        // ✅ Crear usuario básico
        const basicUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email! || '',
          displayName: firebaseUser.displayName || 'Usuario',
          photoURL: firebaseUser.photoURL || '',
          role: (localStorage.getItem('user-role') as 'client' | 'provider') || undefined,
          createdAt: new Date(),
          emailVerified: firebaseUser.emailVerified || false,
          isActive: true,
        };
        setUser(basicUser);
      }
    } catch (error) {
      log.error('Error cargando datos de usuario:', error);

      // ✅ Último recurso: usar localStorage
      const savedRole = localStorage.getItem('user-role') as 'client' | 'provider' | undefined;
      const basicUser: AppUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email! || '',
        displayName: firebaseUser.displayName || 'Usuario',
        photoURL: firebaseUser.photoURL || '',
        role: savedRole || undefined,
        createdAt: new Date(),
        emailVerified: firebaseUser.emailVerified || false,
        isActive: true,
      };
      setUser(basicUser);
    }
  }, []);

  // ✅ Función para redirigir después de autenticación
  const redirectAfterAuth = useCallback(
    async (firebaseUser: User) => {
      try {
        await loadUserData(firebaseUser);
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.replace('/dashboard/requests');
      } catch (error) {
        log.error('Error en redirección:', error);
        router.replace('/dashboard/requests');
      }
    },
    [loadUserData, router]
  );

  // ✅ Monitorear estado de autenticación con tipado correcto
  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    if (!auth) {
      log.warning('⚠️ Firebase Auth no está disponible');
      setLoading(false);
      return;
    }

    let isMounted = true;

    const checkRedirect = async () => {
      if (window.location.pathname === '/auth/callback') {
        try {
          const user = await handleGoogleRedirect();
          if (user) {
            await redirectAfterAuth(user);
            toast.success('¡Bienvenido a MiMaestro con Google!');
          }
        } catch (error: any) {
          log.error('Error en redirect de Google:', error);
          toast.error('Error al iniciar sesión con Google');
          router.replace('/login');
        }
      }
    };

    checkRedirect();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;

      log.info('🔐 Auth state changed:', firebaseUser?.uid || 'No user');
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        await loadUserData(firebaseUser);
        setInitialized(true);
      } else {
        setUser(null);
        setInitialized(true);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [loadUserData, redirectAfterAuth, router]);

  // ✅ Efecto separado para redirección
  useEffect(() => {
    if (!loading && initialized && firebaseUser) {
      const isAuthPath =
        window.location.pathname === '/login' ||
        window.location.pathname === '/register' ||
        window.location.pathname === '/';

      if (isAuthPath) {
        router.replace('/dashboard/requests'); // ✅ CORREGIDO
      }
    }
  }, [loading, initialized, firebaseUser, router]);

  // ✅ Login con email
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const firebaseUser = await loginUser(email, password);
      await redirectAfterAuth(firebaseUser);
      toast.success('¡Bienvenido a MiMaestro!');
    } catch (error: any) {
      log.error('Error en login:', error);
      let errorMessage = error.message || 'Error al iniciar sesión';

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage = 'Email o contraseña incorrectos. Por favor, verifica tus credenciales.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
      }

      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN CON GOOGLE
  const loginWithGoogleHandler = async () => {
    try {
      setLoading(true);
      log.info('🔄 Iniciando login con Google...');
      const user = await loginWithGoogle();
      log.info('✅ Usuario autenticado con Google:', user.uid);

      await redirectAfterAuth(user);
      toast.success('¡Bienvenido a MiMaestro con Google!');
    } catch (error: any) {
      log.error('Error en login con Google:', error);

      if (error.message?.includes('bloqueado') || error.message?.includes('popup-blocked')) {
        toast.error(
          'El popup fue bloqueado. Permite popups para este sitio o usa el método alternativo.'
        );
        try {
          await loginWithGoogleRedirect();
        } catch (redirectError) {
          toast.error('Error al iniciar sesión con Google');
          throw redirectError;
        }
      } else if (error.message?.includes('cancelado')) {
        toast.error('Inicio de sesión cancelado');
      } else {
        toast.error(error.message || 'Error al iniciar sesión con Google');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGIN CON GOOGLE (REDIRECT)
  const loginWithGoogleRedirectHandler = async () => {
    try {
      setLoading(true);
      await loginWithGoogleRedirect();
    } catch (error: any) {
      toast.error(error.message || 'Error al iniciar sesión con Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE GOOGLE REDIRECT RESULT - CORREGIDO (devuelve void)
  const handleGoogleRedirectHandler = async (): Promise<void> => {
    try {
      setLoading(true);
      const user = await handleGoogleRedirect();
      if (user) {
        await redirectAfterAuth(user);
        toast.success('¡Bienvenido a MiMaestro con Google!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar autenticación');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (email: string, password: string, userData: Partial<AppUser>) => {
    try {
      setLoading(true);
      await registerUser(email, password, userData);
      toast.success('¡Registro exitoso! Revisa tu email para verificar tu cuenta.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setFirebaseUser(null);
      toast.success('Sesión cerrada correctamente');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      await loadUserData(firebaseUser);
    }
  };

  const updateUser = async (data: Partial<AppUser>) => {
    if (!firebaseUser) throw new Error('Usuario no autenticado');

    try {
      log.info('🔄 Actualizando usuario:', data);

      if (data.role) {
        await updateUserRoleWithRetry(firebaseUser.uid, data.role);
      } else {
        await updateUserData(firebaseUser.uid, data);
      }

      await refreshUser();
      toast.success('Perfil actualizado correctamente');
    } catch (error: any) {
      log.error('❌ Error actualizando usuario:', error);
      toast.error(error.message || 'Error al actualizar el perfil');
      throw error;
    }
  };

  const resetPasswordHandler = async (email: string) => {
    try {
      await resetPassword(email);
      toast.success('Se envió un email de recuperación');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const isProvider = user?.role === 'provider';
  const isClient = user?.role === 'client';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login,
        loginWithGoogle: loginWithGoogleHandler,
        loginWithGoogleRedirect: loginWithGoogleRedirectHandler,
        handleGoogleRedirect: handleGoogleRedirectHandler,
        register,
        logout,
        resetPassword: resetPasswordHandler,
        updateUser,
        refreshUser,
        isProvider,
        isClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

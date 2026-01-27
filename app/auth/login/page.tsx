// app/auth/login/page.tsx - VERSIÓN CORREGIDA
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/src/lib/firebase';

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = isClient
    ? searchParams.get('redirect') || '/admin'
    : '/admin';

  useEffect(() => {
    setError('');
  }, [showForgotPassword]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Verificar si el email está verificado (recomendado para admin)
      if (!user.emailVerified) {
        setError('Por favor verifique su email antes de iniciar sesión.');
        setLoading(false);
        return;
      }

      // Obtener token de Firebase
      const token = await user.getIdToken();

      // Guardar sesión en cookie (para el middleware)
      try {
        const response = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            user: {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear sesión');
        }
      } catch (sessionError) {
        console.warn('Error guardando sesión:', sessionError);
        // Continuar aunque falle la sesión en cookie
      }

      // Redirigir según parámetro o a admin
      router.push(redirect);
    } catch (error: any) {
      console.error('Login error:', error);

      switch (error.code) {
        case 'auth/user-not-found':
          setError('Usuario no encontrado. ¿Está registrado?');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta. Intente nuevamente.');
          break;
        case 'auth/invalid-email':
          setError('Email inválido. Verifique el formato.');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Espere unos minutos.');
          break;
        case 'auth/user-disabled':
          setError('Esta cuenta ha sido deshabilitada.');
          break;
        case 'auth/network-request-failed':
          setError('Error de conexión. Verifique su internet.');
          break;
        default:
          setError('Error al iniciar sesión. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
      setError('');
    } catch (error: any) {
      console.error('Password reset error:', error);

      switch (error.code) {
        case 'auth/user-not-found':
          setError('No existe una cuenta con este email.');
          break;
        case 'auth/invalid-email':
          setError('Email inválido. Verifique el formato.');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Espere unos minutos.');
          break;
        default:
          setError('Error al enviar el email de recuperación.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      {/* BOTÓN VOLVER AL HOME - NUEVO */}
      <a
        href="/"
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
      >
        <svg
          className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-medium">Volver al inicio</span>
      </a>
      <div className="max-w-md w-full">
        {/* Logo y encabezado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 mb-4">
            <span className="text-white text-2xl font-bold">AKΠ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Acceda al sistema de gestión de AKΠ S.R.L.
          </p>
        </div>

        {/* Formulario de login */}
        {!showForgotPassword ? (
          <div className="bg-white rounded-2xl shadow-hard p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Iniciar Sesión
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="admin@akpisrl.com"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    ¿Olvidó su contraseña?
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>

              {/* Checkbox recordar sesión */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
                  disabled={loading}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Recordar sesión
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            {/* Separador */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-4">
                ¿No tiene una cuenta?
              </p>
              <Link
                href="/auth/register"
                className="block w-full text-center border-2 border-blue-600 text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Crear cuenta nueva
              </Link>
            </div>

            {/* Información de acceso */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800 text-center">
                💡 Para acceso de prueba: admin@akpisrl.com / admin123
              </p>
            </div>
          </div>
        ) : (
          /* Formulario de recuperación de contraseña */
          <div className="bg-white rounded-2xl shadow-hard p-6 md:p-8">
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetSent(false);
                setError('');
              }}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-6 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver al login
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Recuperar Contraseña
            </h2>

            {resetSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-emerald-600">✓</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Correo enviado
                </h3>
                <p className="text-gray-600 mb-6">
                  Hemos enviado un enlace de recuperación a{' '}
                  <span className="font-semibold">{resetEmail}</span>. Revise su
                  bandeja de entrada (y spam).
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetSent(false);
                    setResetEmail('');
                  }}
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Volver al login
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  Ingrese su email y le enviaremos un enlace para restablecer su
                  contraseña.
                </p>

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-5">
                  <div>
                    <label
                      htmlFor="resetEmail"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="resetEmail"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="su@email.com"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Enviando...
                      </div>
                    ) : (
                      'Enviar enlace de recuperación'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* Información de seguridad */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Su información está protegida con encriptación de extremo a
            extremo
          </p>
        </div>
      </div>
    </div>
  );
}

// app/auth/register/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/src/lib/firebase';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const router = useRouter();

  // Efecto para limitar reenvíos
  useEffect(() => {
    if (resendCount >= 3) {
      setCanResend(false);
      const timer = setTimeout(() => {
        setCanResend(true);
        setResendCount(0);
      }, 300000); // 5 minutos
      return () => clearTimeout(timer);
    }
  }, [resendCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingrese un email válido');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (!formData.fullName.trim()) {
      setError('Por favor ingrese su nombre completo');
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Crear usuario
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Enviar verificación de email
      await sendEmailVerification(userCredential.user);

      // Guardar información adicional del usuario
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: userCredential.user.uid,
            email: formData.email,
            fullName: formData.fullName,
            company: formData.company || '',
            phone: formData.phone || '',
            role: 'user',
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.warn('Error guardando usuario:', data.error);
        }
      } catch (dbError) {
        console.warn('Error guardando información adicional:', dbError);
        // No bloquear el flujo si falla el guardado en DB
      }

      setRegistrationSuccess(true);
      setVerificationSent(true);
    } catch (error: any) {
      console.error('Registration error:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este email ya está registrado. ¿Ya tiene una cuenta?');
          break;
        case 'auth/invalid-email':
          setError('Email inválido. Verifique el formato.');
          break;
        case 'auth/operation-not-allowed':
          setError('El registro por email/contraseña no está habilitado.');
          break;
        case 'auth/weak-password':
          setError(
            'La contraseña es demasiado débil. Use al menos 6 caracteres, con mayúsculas y números.'
          );
          break;
        case 'auth/network-request-failed':
          setError('Error de conexión. Verifique su internet.');
          break;
        default:
          setError('Error al crear la cuenta. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!auth.currentUser || !canResend) return;

    try {
      await sendEmailVerification(auth.currentUser);
      setVerificationSent(true);
      setResendCount((prev) => prev + 1);
      setError('');
    } catch (error: any) {
      console.error('Error reenviando verificación:', error);
      setError('Error al reenviar la verificación. Intente más tarde.');
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
            Crear cuenta nueva
          </h1>
          <p className="text-gray-600">
            Registre una cuenta para acceder al sistema
          </p>
        </div>

        {registrationSuccess ? (
          <div className="bg-white rounded-2xl shadow-hard p-6 md:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-emerald-600">✓</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-3">
              ¡Cuenta creada con éxito!
            </h2>

            <p className="text-gray-600 mb-6">
              Hemos enviado un email de verificación a{' '}
              <span className="font-semibold">{formData.email}</span>. Por favor
              verifique su cuenta antes de continuar.
            </p>

            {verificationSent && (
              <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg">
                <p className="text-sm">
                  ✅ Email de verificación enviado. Revise su bandeja de entrada
                  (y spam).
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={!canResend || verificationSent}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verificationSent
                  ? 'Verificación enviada'
                  : !canResend
                    ? `Espere 5 minutos (${resendCount}/3)`
                    : 'Reenviar verificación'}
              </button>

              <Link
                href="/auth/login"
                className="block w-full text-center border-2 border-blue-600 text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Ir al inicio de sesión
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-hard p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Formulario de registro
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Juan Pérez"
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="ejemplo@empresa.com"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Nombre de su empresa"
                  disabled={loading}
                  autoComplete="organization"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="+53 55555555"
                  disabled={loading}
                  autoComplete="tel"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo 6 caracteres
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirmar contraseña *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 mr-3"
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    Acepto los{' '}
                    <Link
                      href="/terminos"
                      className="text-blue-600 hover:underline"
                    >
                      términos y condiciones
                    </Link>{' '}
                    del servicio y la{' '}
                    <Link
                      href="/privacidad"
                      className="text-blue-600 hover:underline"
                    >
                      política de privacidad
                    </Link>{' '}
                    de AKΠ S.R.L. Autorizo el tratamiento de mis datos para
                    fines administrativos y comerciales.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creando cuenta...
                  </div>
                ) : (
                  'Crear cuenta'
                )}
              </button>
            </form>

            {/* Separador */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-4">
                ¿Ya tiene una cuenta?
              </p>
              <Link
                href="/auth/login"
                className="block w-full text-center border-2 border-blue-600 text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Iniciar sesión
              </Link>
            </div>

            {/* Información importante */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-800 text-center">
                ⚠️ Solo personal autorizado puede acceder al panel de
                administración. Las cuentas requieren verificación de email.
              </p>
            </div>
          </div>
        )}

        {/* Información de seguridad */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Su información está protegida con encriptación SSL de 256-bit
          </p>
        </div>
      </div>
    </div>
  );
}

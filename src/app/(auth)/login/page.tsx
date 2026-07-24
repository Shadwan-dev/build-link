'use client';
import { log } from '@/lib/utils/logger';

import { BackgroundCarousel } from '@/components/common/BackgroundCarousel';
import { BuildLinkLogo } from '@/components/common/BuildLinkLogo';
import { GoogleIcon } from '@/components/common/GoogleIcon';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loading: authLoading, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
    } catch (error: any) {
      // Manejar errores específicos
      if (
        error.message?.includes('invalid-credential') ||
        error.message?.includes('user-not-found') ||
        error.message?.includes('wrong-password')
      ) {
        setErrors({
          general: 'Email o contraseña incorrectos. Por favor, verifica tus credenciales.',
        });
      } else if (error.message?.includes('too-many-requests')) {
        setErrors({
          general: 'Demasiados intentos fallidos. Por favor, intenta más tarde.',
        });
      } else {
        setErrors({
          general: error.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});
    try {
      await loginWithGoogle();
      // La redirección la maneja el AuthContext
    } catch (error: any) {
      log.error('Error en Google Login:', error);
      if (error.message?.includes('popup-blocked')) {
        setErrors({
          general:
            'El popup fue bloqueado. Permite popups para este sitio o usa el botón de abajo.',
        });
      } else if (error.message?.includes('cancelado')) {
        setErrors({
          general: 'Inicio de sesión cancelado',
        });
      } else {
        setErrors({
          general: error.message || 'Error al iniciar sesión con Google',
        });
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundCarousel />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <BuildLinkLogo size="xl" showTagline={true} />
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
              Iniciar sesión
            </h2>

            {/* Error general */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-200 text-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Botón de Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading || authLoading}
              className="w-full bg-white/10 backdrop-blur-sm text-white py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-white/20 shadow-lg mb-6"
            >
              {googleLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Conectando con Google...
                </>
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5" />
                  Continuar con Google
                </>
              )}
            </button>

            {/* Separador */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-transparent text-white/70 backdrop-blur-sm text-sm">
                  O con email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                  <input
                    type="email"
                    required
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-white placeholder-white/50 ${
                      errors.email ? 'border-red-400' : 'border-white/20'
                    }`}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                      if (errors.general) setErrors({ ...errors, general: undefined });
                    }}
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-white placeholder-white/50 ${
                      errors.password ? 'border-red-400' : 'border-white/20'
                    }`}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: undefined });
                      if (errors.general) setErrors({ ...errors, general: undefined });
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-white/50 hover:text-white/80 transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Mensaje de ayuda para usuarios de Google */}
              <div className="text-center">
                <p className="text-xs text-white/60">
                  ¿Usaste Google para registrarte? Usa el botón "Continuar con Google" arriba.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || authLoading}
                className="w-full bg-yellow-400 text-gray-900 py-3.5 rounded-xl font-semibold hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {loading || authLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            {/* Separador */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-transparent text-white/70 backdrop-blur-sm text-sm">
                  ¿Nuevo en BuildLink?
                </span>
              </div>
            </div>

            <Link
              href="/register"
              className="w-full flex items-center justify-center py-3.5 border-2 border-white/30 rounded-xl font-semibold text-white hover:bg-white/10 transition backdrop-blur-sm"
            >
              Crear cuenta gratuita
            </Link>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  if (!formData.email) {
                    toast.error('Ingresa tu email para recuperar la contraseña');
                    return;
                  }
                  toast.success('Se envió un email de recuperación a ' + formData.email);
                }}
                className="text-sm text-yellow-300 hover:text-yellow-200 font-medium transition drop-shadow-md"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t border-white/10 text-xs text-white/70 drop-shadow-md">
            <p>© 2026 BuildLink. Todos los derechos reservados.</p>
            <div className="mt-2 flex justify-center gap-4">
              <Link href="/terms" className="hover:text-white transition">
                Términos
              </Link>
              <Link href="/privacy" className="hover:text-white transition">
                Privacidad
              </Link>
              <Link href="/contact" className="hover:text-white transition">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

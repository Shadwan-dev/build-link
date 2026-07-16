'use client';

import { BackgroundCarousel } from '@/components/common/BackgroundCarousel';
import { BuildLinkLogo } from '@/components/common/BuildLinkLogo';
import { GoogleIcon } from '@/components/common/GoogleIcon';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Lista de especialidades para proveedores
const SPECIALTIES = [
  'Construcción',
  'Albañilería',
  'Carpintería',
  'Techos',
  'Jardinería',
  'Plomería',
  'Electricidad',
  'Pintura',
  'Diseño de interiores',
  'Arquitectura',
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, loading: authLoading, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'client' as 'client' | 'provider',
    specialties: [] as string[],
    identification: '',
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName || formData.displayName.length < 2) {
      newErrors.displayName = 'El nombre debe tener al menos 2 caracteres';
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.role === 'provider') {
      if (!formData.phone || formData.phone.length < 8) {
        newErrors.phone = 'Teléfono inválido';
      }
      if (!formData.identification || formData.identification.length < 5) {
        newErrors.identification = 'Número de identificación inválido';
      }
      if (formData.specialties.length === 0) {
        newErrors.specialties = 'Selecciona al menos una especialidad';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      if (formData.role === 'provider') {
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (formData.role === 'provider' && !validateStep2()) return;

    setLoading(true);
    try {
      const { confirmPassword, acceptedTerms, ...userData } = formData;
      await register(formData.email, formData.password, userData);
    } catch (error) {
      // Error manejado por el contexto
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      // Error manejado por el contexto
    } finally {
      setGoogleLoading(false);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundCarousel />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <BuildLinkLogo size="lg" showTagline={true} />
            </div>
          </div>

          {step === 2 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span className="text-sm text-white/80">Datos básicos</span>
              </div>
              <div className="w-12 h-0.5 bg-white/30" />
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span className="text-sm text-white/80">Especialidades</span>
              </div>
            </div>
          )}

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6 text-center drop-shadow-lg">
              {step === 1 ? 'Crear cuenta' : 'Configura tu perfil profesional'}
            </h2>

            {/* Solo mostrar Google en step 1 */}
            {step === 1 && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleRegister}
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
                      Registrarse con Google
                    </>
                  )}
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-white/70 backdrop-blur-sm">
                      O con email
                    </span>
                  </div>
                </div>
              </>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {step === 1 ? (
                <Step1Form
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  onNext={handleNext}
                  loading={loading || authLoading}
                />
              ) : (
                <Step2Form
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  specialties={SPECIALTIES}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  loading={loading || authLoading}
                  toggleSpecialty={toggleSpecialty}
                />
              )}
            </form>

            {step === 1 && (
              <p className="text-center text-sm text-white/70 mt-6 drop-shadow-md">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-yellow-300 hover:text-yellow-200 font-medium transition"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>

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

// Componente Step 1
function Step1Form({
  formData,
  setFormData,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onNext,
  loading,
}: any) {
  return (
    <div className="space-y-4">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
          Nombre completo *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-white/50" />
          <input
            type="text"
            required
            className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-white placeholder-white/50 ${
              errors.displayName ? 'border-red-400' : 'border-white/20'
            }`}
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            placeholder="Tu nombre completo"
            autoComplete="name"
          />
        </div>
        {errors.displayName && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.displayName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
          Email *
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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="tu@email.com"
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
          Contraseña *
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-white/50 hover:text-white/80"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirmar Contraseña */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
          Confirmar contraseña *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            required
            className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-white placeholder-white/50 ${
              errors.confirmPassword ? 'border-red-400' : 'border-white/20'
            }`}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-white/50 hover:text-white/80"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Tipo de cuenta */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Tipo de cuenta *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`p-4 rounded-xl border-2 transition text-center backdrop-blur-sm ${
              formData.role === 'client'
                ? 'border-yellow-400 bg-yellow-400/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            onClick={() => setFormData({ ...formData, role: 'client' })}
          >
            <div className="font-semibold text-sm">Cliente</div>
            <div className="text-xs text-white/60">Busco contratar</div>
          </button>
          <button
            type="button"
            className={`p-4 rounded-xl border-2 transition text-center backdrop-blur-sm ${
              formData.role === 'provider'
                ? 'border-yellow-400 bg-yellow-400/20 text-white'
                : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            onClick={() => setFormData({ ...formData, role: 'provider' })}
          >
            <div className="font-semibold text-sm">Proveedor</div>
            <div className="text-xs text-white/60">Ofrezco servicios</div>
          </button>
        </div>
      </div>

      {/* Términos */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={formData.acceptedTerms}
          onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
          className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-yellow-400 focus:ring-yellow-400"
        />
        <label className="text-sm text-white/80 drop-shadow-md">
          Acepto los{' '}
          <button
            type="button"
            className="text-yellow-300 hover:text-yellow-200 font-medium transition"
          >
            Términos y Condiciones
          </button>
          {' y la '}
          <button
            type="button"
            className="text-yellow-300 hover:text-yellow-200 font-medium transition"
          >
            Política de Privacidad
          </button>
        </label>
      </div>
      {errors.acceptedTerms && (
        <p className="text-sm text-red-300 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.acceptedTerms}
        </p>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className="w-full bg-yellow-400 text-gray-900 py-3.5 rounded-xl font-semibold hover:bg-yellow-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Cargando...
          </>
        ) : (
          'Continuar'
        )}
      </button>
    </div>
  );
}

// Componente Step 2
function Step2Form({
  formData,
  setFormData,
  errors,
  specialties,
  onBack,
  onSubmit,
  loading,
  toggleSpecialty,
}: any) {
  return (
    <div className="space-y-4">
      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
          Teléfono (WhatsApp) *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-white/50" />
          <input
            type="tel"
            required
            className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-white placeholder-white/50 ${
              errors.phone ? 'border-red-400' : 'border-white/20'
            }`}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+34 600 000 000"
            autoComplete="tel"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Identificación */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-1.5 drop-shadow-md">
          Número de identificación *
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-3 h-5 w-5 text-white/50" />
          <input
            type="text"
            required
            className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-white placeholder-white/50 ${
              errors.identification ? 'border-red-400' : 'border-white/20'
            }`}
            value={formData.identification}
            onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
            placeholder="DNI, NIE, etc."
          />
        </div>
        {errors.identification && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.identification}
          </p>
        )}
      </div>

      {/* Especialidades */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2 drop-shadow-md">
          Especialidades * (selecciona una o más)
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
          {specialties.map((specialty: string) => (
            <button
              key={specialty}
              type="button"
              className={`p-3 rounded-xl border-2 text-sm font-medium transition backdrop-blur-sm ${
                formData.specialties.includes(specialty)
                  ? 'border-yellow-400 bg-yellow-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              onClick={() => toggleSpecialty(specialty)}
            >
              {specialty}
              {formData.specialties.includes(specialty) && (
                <CheckCircle className="w-4 h-4 text-yellow-400 inline-block ml-1" />
              )}
            </button>
          ))}
        </div>
        {errors.specialties && (
          <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.specialties}
          </p>
        )}
        <p className="mt-2 text-xs text-white/60">Seleccionadas: {formData.specialties.length}</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl border-2 border-white/30 font-semibold text-white hover:bg-white/10 transition backdrop-blur-sm"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 bg-yellow-400 text-gray-900 py-3.5 rounded-xl font-semibold hover:bg-yellow-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creando...
            </>
          ) : (
            'Crear cuenta'
          )}
        </button>
      </div>
    </div>
  );
}

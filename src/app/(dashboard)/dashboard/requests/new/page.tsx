'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { CATEGORIES } from '@/lib/constants/categories';
import { createRequest } from '@/lib/firebase/requests.service';
import { RequestFormData, UrgencyLevel } from '@/types/request.types';
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Loader2,
  Send,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewRequestPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { currentRole, hasRole, isLoading: roleLoading } = useRole();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RequestFormData>({
    categoryId: '',
    categoryName: '',
    description: '',
    budget: '',
    location: '',
    urgency: 'normal',
    timeline: '',
    estimatedTime: '',
    specialtyId: '',
    specialtyName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Verificar que el usuario es cliente
  const isClient = currentRole === 'client';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.categoryId) {
      newErrors.categoryId = 'Selecciona una categoría';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    // ✅ Verificar rol antes de enviar
    if (!isClient) {
      toast.error('Solo los clientes pueden crear solicitudes');
      return;
    }

    setLoading(true);
    try {
      console.log('📝 Enviando solicitud con datos:', {
        clientId: user.uid,
        clientName: user.displayName || 'Usuario',
        clientEmail: user.email || '',
        clientPhone: user.phone || '',
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        description: formData.description,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        location: formData.location || undefined,
        urgency: formData.urgency,
        timeline: formData.timeline || undefined,
        estimatedTime: formData.estimatedTime || undefined,
      });

      // ✅ Necesitamos un providerId y providerName para la solicitud
      // Por ahora usamos valores de prueba, pero deberías obtenerlos de la URL o contexto
      const providerId = 'providerId_de_prueba'; // ← ¡REEMPLAZAR CON VALOR REAL!
      const providerName = 'Proveedor de prueba'; // ← ¡REEMPLAZAR CON VALOR REAL!

      const requestId = await createRequest({
        clientId: user.uid,
        clientName: user.displayName || 'Usuario',
        clientEmail: user.email || '',
        clientPhone: user.phone || '',
        providerId: providerId,
        providerName: providerName,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        description: formData.description,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        location: formData.location || undefined,
        urgency: formData.urgency,
        timeline: formData.timeline || undefined,
        estimatedTime: formData.estimatedTime || undefined,
        specialtyId: formData.specialtyId || undefined,
        specialtyName: formData.specialtyName || undefined,
      });

      toast.success('📩 Solicitud enviada correctamente');
      router.push(`/dashboard/requests/${requestId}`);
    } catch (error: any) {
      console.error('❌ Error al enviar solicitud:', error);
      toast.error(error.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    setFormData({
      ...formData,
      categoryId,
      categoryName: category?.label || '',
    });
  };

  // ✅ Estados de carga
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // ✅ Verificar autenticación
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Debes iniciar sesión
        </h2>
        <Link href="/login" className="text-primary-600 hover:underline mt-2 inline-block">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  // ✅ Verificar rol
  if (!hasRole) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Configura tu cuenta</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Debes seleccionar un rol para crear solicitudes
        </p>
        <Link href="/dashboard" className="text-primary-600 hover:underline mt-4 inline-block">
          Ir al dashboard
        </Link>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Acceso restringido</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Solo los clientes pueden crear solicitudes.
          {currentRole === 'provider' && ' Eres un proveedor.'}
        </p>
        <Link href="/dashboard" className="text-primary-600 hover:underline mt-4 inline-block">
          Volver al dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/requests"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nueva Solicitud</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Describe tu proyecto y encuentra al profesional ideal
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Rol actual: <span className="font-medium text-primary-600">Cliente</span>
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5"
      >
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Categoría del trabajo *
          </label>
          <div className="relative">
            <select
              value={formData.categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none ${
                errors.categoryId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Selecciona una categoría...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.categoryId}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Descripción del proyecto *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe detalladamente el trabajo que necesitas realizar..."
            rows={5}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.description}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {formData.description.length}/20 caracteres mínimo
          </p>
        </div>

        {/* Presupuesto y Urgencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <DollarSign className="w-4 h-4 inline" /> Presupuesto estimado
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="0"
              min="0"
              step="100"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <Clock className="w-4 h-4 inline" /> Urgencia *
            </label>
            <select
              value={formData.urgency}
              onChange={(e) =>
                setFormData({ ...formData, urgency: e.target.value as UrgencyLevel })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="normal">🟢 Normal</option>
              <option value="urgente">🟡 Urgente</option>
              <option value="muy-urgente">🔴 Muy urgente</option>
            </select>
          </div>
        </div>

        {/* Tiempo estimado y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <Calendar className="w-4 h-4 inline" /> Tiempo estimado
            </label>
            <input
              type="text"
              value={formData.estimatedTime}
              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              placeholder="Ej: 2 semanas, 1 mes..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              📍 Ubicación
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ej: Centro, Zona Norte..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Resumen */}
        {formData.categoryName && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">📋 Resumen:</span> Solicitud de{' '}
              <span className="font-medium">{formData.categoryName}</span>
              {formData.budget &&
                ` · Presupuesto: $${parseFloat(formData.budget).toLocaleString()}`}
              {formData.urgency !== 'normal' &&
                ` · ${formData.urgency === 'urgente' ? '🟡 Urgente' : '🔴 Muy urgente'}`}
              {formData.location && ` · 📍 ${formData.location}`}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar solicitud
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

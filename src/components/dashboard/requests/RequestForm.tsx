'use client';
import { log } from '@/lib/utils/logger';

import { useAuth } from '@/contexts/AuthContext';
import { CATEGORIES } from '@/lib/constants/categories';
import { createRequest } from '@/lib/firebase/requests.service';
import { RequestFormData, UrgencyLevel } from '@/types/request.types';
import {
  AlertCircle,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Loader2,
  Send,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface RequestFormProps {
  providerId: string;
  providerName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

// ✅ Estado inicial del formulario
const initialFormData: RequestFormData = {
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
};

export const RequestForm = ({ providerId, providerName, onClose, onSuccess }: RequestFormProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RequestFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    setLoading(true);
    try {
      // ✅ Usar CreateRequestInput con tipos correctos
      await createRequest({
        clientId: user.uid,
        clientName: user.displayName || 'Usuario',
        clientEmail: user.email || '',
        clientPhone: user.phone || '',
        providerId,
        providerName,
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
      onSuccess?.();
      onClose();
      router.push('/dashboard/requests');
    } catch (error: any) {
      log.error('Error al enviar solicitud:', error);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">📝 Nueva solicitud</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enviando a:{' '}
              <span className="font-medium text-primary-600 dark:text-primary-400">
                {providerName}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {formData.categoryName && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Has seleccionado: {formData.categoryName}
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
              onClick={onClose}
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
    </div>
  );
};

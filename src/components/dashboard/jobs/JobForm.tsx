'use client';
import { log } from '@/lib/utils/logger';

import { useAuth } from '@/contexts/AuthContext';
import { CATEGORIES } from '@/lib/constants/categories';
import { createJob, getJobById, updateJob } from '@/lib/firebase/job.service';
import { JobStatus, JobUrgency } from '@/types/job.types';
import {
  AlertCircle,
  DollarSign,
  Image,
  Loader2,
  MapPin,
  Plus,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface JobFormProps {
  jobId?: string;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const JobForm = ({ jobId, onClose, onSuccess }: JobFormProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    location: '',
    urgency: 'normal' as JobUrgency,
    images: [] as string[],
    status: 'active' as JobStatus,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageInput, setImageInput] = useState('');

  const isEditing = !!jobId;

  // Cargar datos si es edición
  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) return;
      setLoading(true);
      try {
        const job = await getJobById(jobId);
        if (job) {
          setFormData({
            title: job.title,
            category: job.category,
            description: job.description,
            budget: job.budget?.toString() || '',
            location: job.location || '',
            urgency: job.urgency,
            images: job.images || [],
            status: job.status,
          });
        }
      } catch (error) {
        log.error('Error cargando oferta:', error);
        toast.error('Error al cargar la oferta');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    if (formData.description.length < 30) {
      newErrors.description = 'La descripción debe tener al menos 30 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const addImage = () => {
    if (!imageInput.trim()) return;
    if (formData.images.length >= 6) {
      toast.error('Máximo 6 imágenes permitidas');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageInput.trim()],
    }));
    setImageInput('');
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    if (!validateForm()) return;

    setSaving(true);
    try {
      const jobData = {
        providerId: user.uid,
        providerName: user.displayName || 'Proveedor',
        title: formData.title,
        category: formData.category,
        description: formData.description,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        location: formData.location || '',
        urgency: formData.urgency,
        images: formData.images,
        status: formData.status,
      };

      if (isEditing && jobId) {
        await updateJob(jobId, jobData);
        toast.success('✅ Oferta actualizada correctamente');
      } else {
        await createJob(jobData);
        toast.success('✅ Oferta creada correctamente');
      }

      onSuccess?.();
      if (onClose) {
        onClose();
      } else {
        router.push('/dashboard/jobs');
      }
    } catch (error) {
      log.error('Error guardando oferta:', error);
      toast.error(isEditing ? 'Error al actualizar la oferta' : 'Error al crear la oferta');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEditing ? '✏️ Editar oferta' : '📝 Nueva oferta'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isEditing
              ? 'Actualiza la información de tu oferta'
              : 'Crea una nueva oferta para que los clientes te encuentren'}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Título de la oferta *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej: Reforma integral de cocina"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Categoría y Urgencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Categoría *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Selecciona una categoría...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.label}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Urgencia *
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="normal">🟢 Normal</option>
              <option value="urgent">🟡 Urgente</option>
              <option value="immediate">🔴 Inmediata</option>
            </select>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Descripción *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe detalladamente el trabajo o servicio que ofreces..."
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
            {formData.description.length}/30 caracteres mínimo
          </p>
        </div>

        {/* Presupuesto y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <DollarSign className="w-4 h-4 inline" /> Presupuesto estimado
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <MapPin className="w-4 h-4 inline" /> Ubicación
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ciudad, provincia..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <Image className="w-4 h-4 inline" /> Imágenes (URLs)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {formData.images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Máximo 6 imágenes. Ingresa URLs de imágenes.
          </p>
        </div>

        {/* Resumen */}
        {formData.category && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">📋 Resumen:</span> Oferta de{' '}
              <span className="font-medium">{formData.category}</span>
              {formData.budget &&
                ` · Presupuesto: $${parseFloat(formData.budget).toLocaleString()}`}
              {formData.urgency !== 'normal' &&
                ` · ${formData.urgency === 'urgent' ? '🟡 Urgente' : '🔴 Inmediata'}`}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {isEditing ? 'Actualizar oferta' : 'Publicar oferta'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// components/dashboard/requests/EditRequestModal.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary/upload.service';
import { CATEGORIES } from '@/lib/constants/categories';
import { REGIONS_CHILE, getProvincesByRegion } from '@/lib/constants/regions.chile';
import { updateRequest } from '@/lib/firebase/requests.service';
import { Request } from '@/types/request.types';
import { Loader2, Send, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface EditRequestModalProps {
  request: Request;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditRequestModal = ({ request, onClose, onSuccess }: EditRequestModalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Estado del formulario
  const [formData, setFormData] = useState({
    categoryId: request.categoryId || '',
    categoryName: request.categoryName || '',
    regionId: request.regionId || '',
    provinceId: request.provinceId || '',
    provinceName: request.location || '',
    description: request.description || '',
    images: request.images || ([] as string[]),
    newImageUrl: '',
  });

  // ✅ Obtener provincias según región seleccionada
  const availableProvinces = formData.regionId ? getProvincesByRegion(formData.regionId) : [];

  // ✅ Seleccionar categoría
  const handleCategorySelect = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    setFormData((prev) => ({
      ...prev,
      categoryId,
      categoryName: category?.label || '',
    }));
  };

  // ✅ Subir imagen a Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
      toast.success('📸 Imagen subida correctamente');
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // ✅ Remover imagen
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ✅ Validar y enviar
  const handleSubmit = async () => {
    if (!formData.categoryId) {
      toast.error('Selecciona una categoría');
      return;
    }
    if (!formData.provinceId) {
      toast.error('Selecciona una comuna');
      return;
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      toast.error('La descripción debe tener al menos 10 caracteres');
      return;
    }

    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    setLoading(true);
    try {
      await updateRequest(
        request.id,
        user.uid, // ✅ Pasar el userId
        {
          categoryId: formData.categoryId,
          categoryName: formData.categoryName,
          description: formData.description,
          location: formData.provinceName || '',
          images: formData.images,
          regionId: formData.regionId,
          provinceId: formData.provinceId,
          urgency: request.urgency || 'normal',
        }
      );

      toast.success('✅ Solicitud actualizada correctamente');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error actualizando solicitud:', error);
      toast.error(error.message || 'Error al actualizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">✏️ Editar solicitud</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Modifica los detalles de tu solicitud pendiente
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-2 rounded-xl border-2 transition-all text-center ${
                    formData.categoryId === category.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <div className="text-2xl">{category.icon}</div>
                  <div className="text-[10px] font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                    {category.label.split(' ').slice(0, 2).join(' ')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ubicación
            </label>
            <select
              value={formData.regionId}
              onChange={(e) => {
                const regionId = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  regionId,
                  provinceId: '',
                  provinceName: '',
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="">Selecciona una región</option>
              {REGIONS_CHILE.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>

            <select
              value={formData.provinceId}
              onChange={(e) => {
                const provinceId = e.target.value;
                const province = availableProvinces.find((p) => p.id === provinceId);
                setFormData((prev) => ({
                  ...prev,
                  provinceId,
                  provinceName: province?.name || '',
                }));
              }}
              disabled={!formData.regionId}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm disabled:opacity-50"
            >
              <option value="">Selecciona una comuna</option>
              {availableProvinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Imágenes
            </label>
            <div className="flex flex-wrap gap-3">
              {formData.images.map((url, index) => (
                <div
                  key={index}
                  className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
                >
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary-400 transition"
              >
                {uploadingImage ? (
                  <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-[8px] text-gray-400 mt-0.5">Subir</span>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe el problema o proyecto..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.description.length}/10 caracteres mínimo
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

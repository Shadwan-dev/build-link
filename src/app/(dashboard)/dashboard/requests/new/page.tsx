// app/dashboard/requests/new/page.tsx
'use client';

import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { useAuth } from '@/contexts/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary/upload.service';
import { CATEGORIES } from '@/lib/constants/categories';
import { REGIONS_CHILE, getProvincesByRegion } from '@/lib/constants/regions.chile';
import { createRequest } from '@/lib/firebase/requests.service';
import { log } from '@/lib/utils/logger';
import { UrgencyLevel } from '@/types/request.types';
import { Loader2, Send, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function NewRequestPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Estado del formulario
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: '',
    regionId: '',
    provinceId: '',
    provinceName: '',
    description: '',
    whatsapp: '',
    imageUrl: '',
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
      setFormData((prev) => ({ ...prev, imageUrl: url }));
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
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    if (!formData.whatsapp || formData.whatsapp.length < 8) {
      toast.error('Ingresa un número de WhatsApp válido');
      return;
    }

    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        clientId: user.uid,
        clientName: user.displayName || 'Usuario',
        clientEmail: user.email || '',
        clientPhone: user.phone || '',
        providerId: 'general',
        providerName: 'Proveedor general',
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        description: formData.description,
        location: formData.provinceName || '',
        urgency: 'normal' as UrgencyLevel,
        images: formData.imageUrl ? [formData.imageUrl] : [],
        regionId: formData.regionId,
        provinceId: formData.provinceId,
        whatsappContact: formData.whatsapp,
      };

      const requestId = await createRequest(requestData);

      // ✅ Generar mensaje para WhatsApp
      const message = `Hola, soy ${user.displayName || 'Usuario'} de MiMaestro.

📋 Solicitud: ${formData.categoryName}
📝 Descripción: ${formData.description}
📍 Ubicación: ${formData.provinceName || 'No especificada'}

¿Podrías ayudarme con este proyecto? ¡Gracias! 🏗️`;

      const phone = formData.whatsapp.replace(/[^0-9+]/g, '');
      const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(whatsappLink, '_blank');
      toast.success('📩 Solicitud enviada correctamente');
      router.push(`/dashboard/requests/${requestId}`);
    } catch (error: any) {
      log.error('Error enviando solicitud:', error);
      toast.error(error.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.categoryId &&
    formData.provinceId &&
    formData.description.length >= 10 &&
    formData.whatsapp.length >= 8;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Nueva solicitud</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          Completa los datos y envía tu solicitud
        </p>
      </div>

      {/* 1. Categoría */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          ¿Qué necesitas hacer?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-3 rounded-xl border-2 transition-all text-center ${
                formData.categoryId === category.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              <div className="w-10 h-10 mx-auto mb-1 text-primary-600 dark:text-primary-400">
                <CategoryIcon icon={category.icon} size={32} />
              </div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">
                {category.label}
              </div>
            </button>
          ))}
        </div>
        {formData.categoryName && (
          <p className="mt-2 text-xs text-primary-600 dark:text-primary-400 flex items-center gap-1">
            ✅ Seleccionado: {formData.categoryName}
          </p>
        )}
      </div>

      {/* 2. Detalles de la Solicitud */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Detalles de la solicitud
        </h2>

        {/* Categoría seleccionada */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Categoría
          </label>
          <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            {formData.categoryName || 'No seleccionada'}
          </div>
        </div>

        {/* Comuna (Región + Provincia) */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm appearance-none"
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm disabled:opacity-50 appearance-none"
          >
            <option value="">Selecciona una comuna</option>
            {availableProvinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* Foto del problema */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Foto del problema
          </label>
          <div className="flex items-center gap-3">
            {formData.imageUrl ? (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <img
                  src={formData.imageUrl}
                  alt="Foto del problema"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-primary-400 transition"
              >
                {uploadingImage ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] text-gray-400 mt-0.5">Subir</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, WEBP (máx. 5MB)</p>
          </div>
        </div>

        {/* Descripción breve */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Descripción breve *
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

        {/* WhatsApp */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Tu WhatsApp *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="+569 1234 5678"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
      </div>

      {/* Botón enviar */}
      <button
        onClick={handleSubmit}
        disabled={loading || !isFormValid}
        className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-lg shadow-green-500/25"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar solicitud por WhatsApp
          </>
        )}
      </button>

      {/* Mensaje de ayuda */}
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        Al enviar, serás redirigido a WhatsApp con el mensaje predefinido
      </p>
    </div>
  );
}

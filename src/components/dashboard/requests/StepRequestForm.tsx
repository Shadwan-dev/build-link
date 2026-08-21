// components/dashboard/requests/StepRequestForm.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { CATEGORIES } from '@/lib/constants/categories';
import { createRequest } from '@/lib/firebase/requests.service';
import { log } from '@/lib/utils/logger';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CategorySelector } from './CategorySelector';
import { DescriptionInput } from './DescriptionInput';
import { ImageUploader } from './ImageUploader';
import { LocationSelector } from './LocationSelector';
import { ProviderListSelector } from './ProviderListSelector';
import { UrgencySelector } from './UrgencySelector';
import { WhatsAppConfirmation } from './WhatsAppConfirmation';

interface StepRequestFormProps {
  providerId?: string;
  providerName?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

// ✅ Pasos del formulario
const STEPS = [
  { id: 'category', label: 'Categoría', icon: '🏗️' },
  { id: 'description', label: 'Descripción', icon: '📝' },
  { id: 'images', label: 'Fotos', icon: '📸' },
  { id: 'location', label: 'Ubicación', icon: '📍' },
  { id: 'providers', label: 'Maestros', icon: '👨‍🔧' },
  { id: 'urgency', label: 'Urgencia', icon: '⏰' },
  { id: 'confirm', label: 'Confirmar', icon: '✅' },
];

export const StepRequestForm = ({
  providerId,
  providerName,
  onClose,
  onSuccess,
}: StepRequestFormProps) => {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Estado del formulario
  const [formData, setFormData] = useState({
    // Paso 1: Categoría
    categoryId: '',
    categoryName: '',
    // Paso 2: Descripción
    description: '',
    // Paso 3: Fotos
    images: [] as string[],
    // Paso 4: Ubicación
    locationData: { regionId: '', provinceId: '', address: '' },
    // Paso 5: Maestros
    providers: [] as any[],
    // Paso 6: Urgencia
    urgency: 'normal' as 'normal' | 'urgente' | 'muy-urgente',
  });

  const isClient = currentRole === 'client';

  // ✅ Validación por paso
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Categoría
        if (!formData.categoryId) {
          newErrors.categoryId = 'Selecciona una categoría';
        }
        break;
      case 1: // Descripción
        if (!formData.description.trim()) {
          newErrors.description = 'La descripción es requerida';
        } else if (formData.description.length < 20) {
          newErrors.description = 'La descripción debe tener al menos 20 caracteres';
        }
        break;
      case 2: // Fotos - opcional
        break;
      case 3: // Ubicación
        if (!formData.locationData.regionId) {
          newErrors.location = 'Selecciona una región';
        }
        if (!formData.locationData.provinceId) {
          newErrors.location = 'Selecciona una comuna/provincia';
        }
        break;
      case 4: // Proveedores
        if (formData.providers.length === 0) {
          newErrors.providers = 'Selecciona al menos un maestro';
        }
        break;
      case 5: // Urgencia
        if (!formData.urgency) {
          newErrors.urgency = 'Selecciona el nivel de urgencia';
        }
        break;
      case 6: // Confirmar - sin validación extra
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Navegación
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // ✅ Enviar solicitud - CORREGIDO CON IMÁGENES
  const handleSubmit = async () => {
    // ✅ Debug: Verificar imágenes antes de enviar
    console.log('📸 Imágenes en formData:', formData.images);
    console.log('📸 Cantidad de imágenes:', formData.images.length);

    if (!validateStep(currentStep)) return;
    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    setLoading(true);
    try {
      // ✅ Preparar datos para crear la solicitud
      const requestData = {
        clientId: user.uid,
        clientName: user.displayName || 'Usuario',
        clientEmail: user.email || '',
        clientPhone: user.phone || '',
        providerId: formData.providers.length > 0 ? formData.providers[0].uid : 'general',
        providerName:
          formData.providers.length > 0 ? formData.providers[0].displayName : 'Proveedor general',
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        description: formData.description,
        location: formData.locationData.address || '',
        urgency: formData.urgency,
        // ✅ ¡IMPORTANTE! Las imágenes subidas a Cloudinary
        images: formData.images || [],
        // ✅ Guardar metadatos adicionales
        providerSpecialty: formData.providers
          .map((p) => p.specialties)
          .flat()
          .join(', '),
        providerLocation: formData.locationData.provinceId,
        regionId: formData.locationData.regionId,
        provinceId: formData.locationData.provinceId,
        // ✅ Campos adicionales opcionales
        estimatedTime: '',
        timeline: '',
        specialtyId: '',
        specialtyName: '',
      };

      // ✅ Debug: Verificar que las imágenes van en la solicitud
      console.log('📸 Enviando a createRequest con imágenes:', requestData.images.length);
      console.log('📸 URLs de imágenes:', requestData.images);

      const requestId = await createRequest(requestData);

      toast.success('📩 Solicitud enviada correctamente');
      onSuccess?.();
      onClose();
      router.push(`/dashboard/requests/${requestId}`);
    } catch (error: any) {
      log.error('❌ Error en handleSubmit:', error);
      toast.error(error.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Renderizar paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CategorySelector
            selectedCategory={formData.categoryId}
            onSelect={(categoryId) => {
              const category = CATEGORIES.find((c) => c.id === categoryId);
              setFormData({
                ...formData,
                categoryId,
                categoryName: category?.label || '',
              });
            }}
          />
        );
      case 1:
        return (
          <DescriptionInput
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            minLength={20}
          />
        );
      case 2:
        return (
          <ImageUploader
            images={formData.images}
            onChange={(images) => {
              console.log('📸 Imágenes actualizadas en ImageUploader:', images);
              setFormData({ ...formData, images });
            }}
            maxImages={5}
          />
        );
      case 3:
        return (
          <LocationSelector
            value={formData.locationData}
            onChange={(location) => {
              setFormData({
                ...formData,
                locationData: {
                  regionId: location.regionId,
                  provinceId: location.provinceId,
                  address: location.address || '',
                },
              });
            }}
          />
        );
      case 4:
        return (
          <ProviderListSelector
            regionId={formData.locationData.regionId}
            provinceId={formData.locationData.provinceId}
            selectedProviders={formData.providers.map((p) => p.uid)}
            onSelect={(providerIds) => {
              // ✅ Aquí se cargarían los datos completos de los proveedores
              const selected = providerIds.map((id) => ({
                uid: id,
                displayName: `Maestro ${id.slice(0, 4)}`,
                specialties: ['Construcción'],
                rating: 4.5,
                email: '',
                phone: '',
                totalRatings: 0,
                location: '',
                experience: 0,
                isActive: true,
                isVerified: false,
                photoURL: '',
                description: '',
                createdAt: null,
                updatedAt: null,
              }));
              setFormData({ ...formData, providers: selected });
            }}
          />
        );
      case 5:
        return (
          <UrgencySelector
            value={formData.urgency}
            onChange={(urgency) => setFormData({ ...formData, urgency })}
          />
        );
      case 6:
        return (
          <WhatsAppConfirmation
            data={{
              category: formData.categoryName,
              description: formData.description,
              images: formData.images,
              location: formData.locationData.address || 'Ubicación no especificada',
              providers: formData.providers,
              urgency: formData.urgency,
            }}
            onSend={handleSubmit}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  // ✅ Progreso
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">📝 Nueva solicitud</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Paso {currentStep + 1} de {STEPS.length}: {STEPS[currentStep].label}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Contenido del paso */}
        <div className="min-h-[300px]">{renderStep()}</div>

        {/* Errores */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              {Object.values(errors).join(', ')}
            </p>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>
          )}

          <button
            type="button"
            onClick={currentStep === STEPS.length - 1 ? handleSubmit : nextStep}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2 ${
              currentStep === 0 ? 'ml-auto' : ''
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {currentStep === STEPS.length - 1 ? 'Enviando...' : 'Cargando...'}
              </>
            ) : (
              <>
                {currentStep === STEPS.length - 1 ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Enviar solicitud
                  </>
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

StepRequestForm.displayName = 'StepRequestForm';

'use client';

import { CategorySelector } from '@/components/dashboard/requests/CategorySelector';
import { DescriptionInput } from '@/components/dashboard/requests/DescriptionInput';
import { ImageUploader } from '@/components/dashboard/requests/ImageUploader';
import { LocationSelector } from '@/components/dashboard/requests/LocationSelector';
import { ProviderListSelector } from '@/components/dashboard/requests/ProviderListSelector';
import { UrgencySelector } from '@/components/dashboard/requests/UrgencySelector';
import { WhatsAppConfirmation } from '@/components/dashboard/requests/WhatsAppConfirmation';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { CATEGORIES } from '@/lib/constants/categories';
import { getProvidersByRegion, Provider } from '@/lib/firebase/provider.service';
import { createRequest } from '@/lib/firebase/requests.service';
import { UrgencyLevel } from '@/types/request.types';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

export default function NewRequestPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { currentRole, hasRole, isLoading: roleLoading } = useRole();
  const [loading, setLoading] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Estado del formulario
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: '',
    description: '',
    images: [] as string[],
    locationData: { regionId: '', provinceId: '', address: '' },
    providers: [] as string[], // UIDs de proveedores seleccionados
    urgency: 'normal' as UrgencyLevel,
  });

  // ✅ Estado de proveedores disponibles
  const [availableProviders, setAvailableProviders] = useState<Provider[]>([]);

  const isClient = currentRole === 'client';

  // ✅ Cargar proveedores cuando cambia la ubicación
  useEffect(() => {
    const loadProviders = async () => {
      if (!formData.locationData.regionId) {
        setAvailableProviders([]);
        return;
      }

      setLoadingProviders(true);
      try {
        const result = await getProvidersByRegion(
          formData.locationData.regionId,
          formData.locationData.provinceId || undefined
        );
        setAvailableProviders(result);
      } catch (error) {
        console.error('Error cargando proveedores:', error);
        toast.error('Error al cargar proveedores');
      } finally {
        setLoadingProviders(false);
      }
    };

    loadProviders();
  }, [formData.locationData.regionId, formData.locationData.provinceId]);

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

  // ✅ Enviar solicitud
  const handleSubmit = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    if (!isClient) {
      toast.error('Solo los clientes pueden crear solicitudes');
      return;
    }

    setLoading(true);
    try {
      // ✅ Obtener datos completos de los proveedores seleccionados
      const selectedProvidersData = availableProviders.filter((p) =>
        formData.providers.includes(p.uid)
      );

      const providerId =
        selectedProvidersData.length > 0 ? selectedProvidersData[0].uid : 'general';
      const providerName =
        selectedProvidersData.length > 0
          ? selectedProvidersData[0].displayName
          : 'Proveedor general';

      // ✅ Obtener especialidades de los proveedores seleccionados
      const allSpecialties = selectedProvidersData
        .flatMap((p) => p.specialties)
        .filter((s, i, arr) => arr.indexOf(s) === i) // Eliminar duplicados
        .join(', ');

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
        location: formData.locationData.address || '',
        urgency: formData.urgency,
        providerSpecialty: allSpecialties,
        providerLocation: formData.locationData.provinceId,
        regionId: formData.locationData.regionId,
        provinceId: formData.locationData.provinceId,
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
            onChange={(images) => setFormData({ ...formData, images })}
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
            selectedProviders={formData.providers}
            onSelect={(providerIds) => {
              setFormData({ ...formData, providers: providerIds });
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
              location: `${formData.locationData.address || 'Ubicación no especificada'}`,
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

  // ✅ Estados de carga
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

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
            Paso {currentStep + 1} de {STEPS.length}: {STEPS[currentStep].label}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        {/* Barra de progreso */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Indicador de pasos */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center gap-1 ${
                index <= currentStep ? 'text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              <span className={`text-lg ${index <= currentStep ? 'opacity-100' : 'opacity-50'}`}>
                {step.icon}
              </span>
              <span className="hidden sm:block">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Contenido del paso */}
        <div className="min-h-[300px]">{renderStep()}</div>

        {/* Errores */}
        {Object.keys(errors).length > 0 && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              {Object.values(errors).join(', ')}
            </p>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
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
}

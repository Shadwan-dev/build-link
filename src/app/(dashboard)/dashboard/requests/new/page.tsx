'use client';

import { RegionSelector } from '@/components/ui/RegionSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { CATEGORIES } from '@/lib/constants/categories';
import { getProviders, Provider } from '@/lib/firebase/provider.service';
import { createRequest } from '@/lib/firebase/requests.service';
import { UrgencyLevel } from '@/types/request.types';
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Clock,
  Filter,
  Loader2,
  MapPin,
  Send,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function NewRequestPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { currentRole, hasRole, isLoading: roleLoading } = useRole();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [showProviderFilter, setShowProviderFilter] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({ regionId: '', provinceId: '' });

  const [formData, setFormData] = useState({
    categoryId: '',
    categoryName: '',
    description: '',
    location: '',
    urgency: 'normal' as UrgencyLevel,
    providerSpecialty: '',
    providerLocation: '',
    regionId: '',
    provinceId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const isClient = currentRole === 'client';

  // ✅ Cargar proveedores cuando se abre el filtro
  useEffect(() => {
    if (showProviderFilter && providers.length === 0) {
      loadProviders();
    }
  }, [showProviderFilter]);

  const loadProviders = async () => {
    setLoadingProviders(true);
    try {
      const result = await getProviders({ limitCount: 100 });
      setProviders(result.providers);
      setFilteredProviders(result.providers);
    } catch (error) {
      console.error('Error cargando proveedores:', error);
      toast.error('Error al cargar proveedores');
    } finally {
      setLoadingProviders(false);
    }
  };

  // ✅ Filtrar proveedores
  const filterProviders = () => {
    let filtered = providers;

    if (formData.providerSpecialty) {
      const specialty = formData.providerSpecialty.toLowerCase();
      filtered = filtered.filter((p) =>
        p.specialties.some((s) => s.toLowerCase().includes(specialty))
      );
    }

    if (selectedRegion.regionId) {
      filtered = filtered.filter((p) => p.regionId === selectedRegion.regionId);
    }

    if (selectedRegion.provinceId) {
      filtered = filtered.filter((p) => p.provinceId === selectedRegion.provinceId);
    }

    setFilteredProviders(filtered);
  };

  useEffect(() => {
    if (providers.length > 0) {
      filterProviders();
    }
  }, [formData.providerSpecialty, selectedRegion, providers]);

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

    if (!isClient) {
      toast.error('Solo los clientes pueden crear solicitudes');
      return;
    }

    setLoading(true);
    try {
      // ✅ Si hay un proveedor seleccionado, usar sus datos
      const providerId = selectedProvider?.uid || 'general';
      const providerName = selectedProvider?.displayName || 'Proveedor general';

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
        location: formData.location || undefined,
        urgency: formData.urgency,
        providerSpecialty: formData.providerSpecialty || '',
        providerLocation: formData.providerLocation || '',
        regionId: selectedRegion.regionId,
        provinceId: selectedRegion.provinceId,
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

  const clearProviderFilters = () => {
    setFormData({
      ...formData,
      providerSpecialty: '',
      providerLocation: '',
    });
    setSelectedRegion({ regionId: '', provinceId: '' });
    setSelectedProvider(null);
    setFilteredProviders(providers);
  };

  // ... resto del componente

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const specialties = [
    'Construcción',
    'Albañilería',
    'Carpintería',
    'Techos',
    'Jardinería',
    'Plomería',
    'Electricidad',
    'Pintura',
  ];

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
        </div>
      </div>

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

        {/* ✅ FILTRO DE PROVEEDORES */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary-500" />
              Filtrar proveedores (opcional)
              {filteredProviders.length > 0 && (
                <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                  {filteredProviders.length} encontrados
                </span>
              )}
            </h3>
            <button
              type="button"
              onClick={() => setShowProviderFilter(!showProviderFilter)}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              {showProviderFilter ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>
          </div>

          {showProviderFilter && (
            <div className="space-y-3">
              {/* Especialidad */}
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Especialidad
                </label>
                <input
                  type="text"
                  value={formData.providerSpecialty}
                  onChange={(e) => setFormData({ ...formData, providerSpecialty: e.target.value })}
                  placeholder="Ej: Carpintería, Techos..."
                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Ubicación */}
              <RegionSelector
                value={selectedRegion}
                onChange={(location) => {
                  setSelectedRegion(location);
                  setFormData({
                    ...formData,
                    regionId: location.regionId,
                    provinceId: location.provinceId,
                  });
                }}
                label="Región y Provincia"
              />

              {/* Resultados */}
              {loadingProviders ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                </div>
              ) : filteredProviders.length > 0 ? (
                <div className="mt-2 max-h-40 overflow-y-auto space-y-1 border border-gray-200 dark:border-gray-600 rounded-lg p-2">
                  {filteredProviders.slice(0, 10).map((provider) => (
                    <button
                      key={provider.uid}
                      type="button"
                      onClick={() => setSelectedProvider(provider)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        selectedProvider?.uid === provider.uid
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{provider.displayName}</span>
                        <span className="text-xs opacity-70">
                          {provider.specialties.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </button>
                  ))}
                  {filteredProviders.length > 10 && (
                    <p className="text-xs text-gray-400 text-center py-1">
                      +{filteredProviders.length - 10} más
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">
                  No se encontraron proveedores con estos filtros
                </p>
              )}

              {/* Proveedor seleccionado */}
              {selectedProvider && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-primary-700 dark:text-primary-300">
                    Seleccionado: <strong>{selectedProvider.displayName}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedProvider(null)}
                    className="text-primary-500 hover:text-primary-700 ml-auto"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Limpiar filtros */}
              {(formData.providerSpecialty || selectedRegion.regionId) && (
                <button
                  type="button"
                  onClick={clearProviderFilters}
                  className="text-xs text-red-500 hover:text-red-600 transition"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
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

        {/* Urgencia y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <Clock className="w-4 h-4 inline mr-1" />
              Urgencia *
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <MapPin className="w-4 h-4 inline mr-1" />
              Ubicación del proyecto
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
              {selectedProvider && ` · 👤 ${selectedProvider.displayName}`}
              {formData.urgency !== 'normal' &&
                ` · ${formData.urgency === 'urgente' ? '🟡 Urgente' : '🔴 Muy urgente'}`}
              {formData.location && ` · 📍 ${formData.location}`}
              {filteredProviders.length > 0 && (
                <span className="text-xs text-primary-600 dark:text-primary-400 ml-2">
                  Notificará a {filteredProviders.length} profesionales
                </span>
              )}
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
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar solicitud
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

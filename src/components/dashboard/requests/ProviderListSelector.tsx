'use client';

import { getProvidersByRegion, Provider } from '@/lib/firebase/provider.service';
import { log } from '@/lib/utils/logger';
import { CheckCircle, Loader2, MapPin, Search, Star, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProviderListSelectorProps {
  regionId: string;
  provinceId: string;
  selectedProviders: string[]; // ✅ Ahora es un array de strings (UIDs)
  onSelect: (providerIds: string[]) => void; // ✅ Devuelve array de strings
}

export const ProviderListSelector = ({
  regionId,
  provinceId,
  selectedProviders,
  onSelect,
}: ProviderListSelectorProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');

  // ✅ Cargar proveedores por región
  useEffect(() => {
    const loadProviders = async () => {
      if (!regionId) {
        setProviders([]);
        setFilteredProviders([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getProvidersByRegion(regionId, provinceId || undefined);
        setProviders(result);
        setFilteredProviders(result);
      } catch (error) {
        log.error('Error cargando proveedores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [regionId, provinceId]);

  // ✅ Filtrar y ordenar proveedores
  useEffect(() => {
    let result = [...providers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.displayName.toLowerCase().includes(term) ||
          p.specialties.some((s) => s.toLowerCase().includes(term)) ||
          p.location?.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'experience':
        result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      case 'name':
        result.sort((a, b) => a.displayName.localeCompare(b.displayName));
        break;
    }

    setFilteredProviders(result);
  }, [providers, searchTerm, sortBy]);

  const toggleProvider = (providerId: string) => {
    const isSelected = selectedProviders.includes(providerId);
    if (isSelected) {
      onSelect(selectedProviders.filter((id) => id !== providerId));
    } else {
      onSelect([...selectedProviders, providerId]);
    }
  };

  const selectAll = () => {
    onSelect(filteredProviders.map((p) => p.uid));
  };

  const deselectAll = () => {
    onSelect([]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-4" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Cargando maestros disponibles...</p>
      </div>
    );
  }

  if (!regionId) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <MapPin className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Selecciona una ubicación
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Primero elige una región para ver maestros disponibles
        </p>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No hay maestros disponibles
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          En esta zona no hay maestros registrados. Prueba con otra ubicación.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredProviders.length} maestros disponibles
          {filteredProviders.length !== providers.length && (
            <span className="text-xs text-gray-400 ml-1">(filtrados de {providers.length})</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          {selectedProviders.length > 0 && (
            <>
              <button
                onClick={deselectAll}
                className="text-xs text-red-500 hover:text-red-600 transition"
              >
                Deseleccionar todos
              </button>
              <span className="text-xs text-gray-300">|</span>
            </>
          )}
          <button
            onClick={selectAll}
            className="text-xs text-primary-600 hover:text-primary-700 transition"
          >
            Seleccionar todos
          </button>
        </div>
      </div>

      {/* Buscador y filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, especialidad o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        >
          <option value="rating">⭐ Mejor calificados</option>
          <option value="experience">📅 Más experiencia</option>
          <option value="name">📝 Orden alfabético</option>
        </select>
      </div>

      {/* Lista de proveedores */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {filteredProviders.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p>No se encontraron maestros con esos filtros</p>
          </div>
        ) : (
          filteredProviders.map((provider) => {
            const isSelected = selectedProviders.includes(provider.uid);
            return (
              <button
                key={provider.uid}
                onClick={() => toggleProvider(provider.uid)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-primary-300'
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  {provider.photoURL ? (
                    <img
                      src={provider.photoURL}
                      alt={provider.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                </div>

                {/* Información */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {provider.displayName}
                    </span>
                    {provider.isVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {provider.rating?.toFixed(1) || '0'}
                    </span>
                    <span className="truncate max-w-[150px]">
                      {provider.specialties.slice(0, 2).join(', ')}
                      {provider.specialties.length > 2 && ` +${provider.specialties.length - 2}`}
                    </span>
                    {provider.location && (
                      <span className="flex items-center gap-1 truncate max-w-[100px]">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {provider.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300 dark:border-gray-500'
                  }`}
                >
                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Resumen de selección */}
      {selectedProviders.length > 0 && (
        <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <p className="text-sm text-primary-700 dark:text-primary-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {selectedProviders.length} maestro(s) seleccionado(s)
            </p>
            <button
              onClick={deselectAll}
              className="text-xs text-red-500 hover:text-red-600 transition"
            >
              Limpiar selección
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedProviders.map((providerId) => {
              const provider = providers.find((p) => p.uid === providerId);
              if (!provider) return null;
              return (
                <span
                  key={providerId}
                  className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {provider.displayName}
                  <button
                    onClick={() => toggleProvider(providerId)}
                    className="hover:text-red-500 transition ml-0.5"
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

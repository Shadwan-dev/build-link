'use client';

import { ProviderCard } from '@/components/dashboard/providers/ProviderCard';
import { RegionSelector } from '@/components/ui/RegionSelector';
import { useAuth } from '@/contexts/AuthContext';
import { getProviders, Provider } from '@/lib/firebase/provider.service';
import { log } from '@/lib/utils/logger';
import { Grid3X3, List, Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const categories = [
  'Construcción',
  'Albañilería',
  'Carpintería',
  'Techos',
  'Jardinería',
  'Plomería',
  'Electricidad',
  'Pintura',
];

export default function ProvidersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // ✅ Estado de filtros
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    regionId: '',
    provinceId: '',
    minRating: 0,
    sortBy: 'rating' as 'rating' | 'experience' | 'relevance',
  });

  // ✅ Cargar proveedores
  const loadProviders = useCallback(
    async (reset: boolean = true) => {
      if (reset) {
        setLoading(true);
        setLastDoc(null);
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const result = await getProviders({
          limitCount: 20,
          lastDoc: reset ? undefined : lastDoc,
        });

        if (reset) {
          setProviders(result.providers);
          setFilteredProviders(result.providers);
        } else {
          setProviders((prev) => [...prev, ...result.providers]);
          setFilteredProviders((prev) => [...prev, ...result.providers]);
        }

        setLastDoc(result.lastDoc);
        setHasMore(result.providers.length > 0);
      } catch (error) {
        log.error('Error cargando proveedores:', error);
        toast.error('Error al cargar proveedores');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [lastDoc]
  );

  useEffect(() => {
    loadProviders();
  }, []);

  // ✅ Aplicar filtros
  useEffect(() => {
    let result = providers;

    // Búsqueda
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.displayName.toLowerCase().includes(term) ||
          p.specialties.some((s) => s.toLowerCase().includes(term)) ||
          p.location?.toLowerCase().includes(term)
      );
    }

    // Categoría
    if (filters.category) {
      result = result.filter((p) => p.specialties.includes(filters.category));
    }

    // Región
    if (filters.regionId) {
      result = result.filter((p) => p.regionId === filters.regionId);
    }

    // Provincia
    if (filters.provinceId) {
      result = result.filter((p) => p.provinceId === filters.provinceId);
    }

    // Rating mínimo
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Ordenar
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'experience':
        result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      default:
        break;
    }

    setFilteredProviders(result);
  }, [providers, filters]);

  // ✅ Limpiar filtros
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      regionId: '',
      provinceId: '',
      minRating: 0,
      sortBy: 'rating',
    });
    setShowFilters(false);
  };

  // ✅ Cargar más
  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadProviders(false);
    }
  };

  // ✅ Contar filtros activos
  const activeFiltersCount = [
    filters.search,
    filters.category,
    filters.regionId,
    filters.provinceId,
    filters.minRating > 0,
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          👷 Proveedores verificados
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          Encuentra profesionales verificados para tu proyecto
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Buscador */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, especialidad o ubicación..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              {/* Botón filtros */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap text-sm ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Limpiar */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition flex items-center gap-2 whitespace-nowrap text-sm"
                >
                  <X className="w-4 h-4" />
                  Limpiar
                </button>
              )}

              {/* Cambiar vista */}
              <div className="hidden sm:flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de filtros avanzados */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Categoría
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ubicación */}
              <div className="md:col-span-2">
                <RegionSelector
                  value={{
                    regionId: filters.regionId,
                    provinceId: filters.provinceId,
                  }}
                  onChange={(location) => {
                    setFilters((prev) => ({
                      ...prev,
                      regionId: location.regionId,
                      provinceId: location.provinceId,
                    }));
                  }}
                  label="Ubicación"
                />
              </div>

              {/* Rating mínimo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Calificación mínima
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, minRating: Number(e.target.value) }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="0">Cualquiera</option>
                  <option value="3">3+ ⭐</option>
                  <option value="4">4+ ⭐</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.8">4.8+ ⭐</option>
                </select>
              </div>

              {/* Ordenar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ordenar por
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="rating">Calificación</option>
                  <option value="experience">Experiencia</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resultados */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredProviders.length} proveedores encontrados
        </p>
        {filteredProviders.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Mostrando {filteredProviders.length} de {providers.length}
          </p>
        )}
      </div>

      {/* Grid de proveedores */}
      {filteredProviders.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No se encontraron proveedores
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            {activeFiltersCount > 0
              ? 'Prueba con otros filtros o términos de búsqueda'
              : 'No hay proveedores verificados disponibles en este momento'}
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.uid}
              provider={provider}
              onClick={() => router.push(`/dashboard/providers/${provider.uid}`)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.uid}
              provider={provider}
              variant="detailed"
              onClick={() => router.push(`/dashboard/providers/${provider.uid}`)}
            />
          ))}
        </div>
      )}

      {/* Botón cargar más */}
      {hasMore && filteredProviders.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Cargando...
              </>
            ) : (
              'Cargar más'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

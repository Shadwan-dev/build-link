'use client';

import { MapPin, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const ALL_CATEGORIES = [
  { id: 'construction', label: 'Construcción', icon: '🏗️' },
  { id: 'carpentry', label: 'Carpintería', icon: '🪚' },
  { id: 'roofing', label: 'Techos', icon: '🏠' },
  { id: 'gardening', label: 'Jardinería', icon: '🌿' },
  { id: 'plumbing', label: 'Plomería', icon: '🔧' },
  { id: 'electrical', label: 'Electricidad', icon: '⚡' },
  { id: 'painting', label: 'Pintura', icon: '🎨' },
  { id: 'masonry', label: 'Albañilería', icon: '🧱' },
];

interface ProviderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
  totalResults?: number;
}

// ✅ Hook personalizado para debounce
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const ProviderFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  minRating,
  onRatingChange,
  onClearFilters,
  totalResults,
}: ProviderFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [showLocationInput, setShowLocationInput] = useState(false);

  // ✅ Debounce para búsqueda
  const debouncedSearch = useDebounce(localSearch, 300);

  // ✅ Actualizar búsqueda cuando el debounce cambie
  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  // ✅ Contar filtros activos
  const activeFilters = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory) count++;
    if (selectedLocation) count++;
    if (minRating > 0) count++;
    return count;
  }, [searchTerm, selectedCategory, selectedLocation, minRating]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all">
      <div className="p-4">
        {/* Barra principal */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Buscador */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o ubicación..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition"
              onChange={handleSearchChange}
              defaultValue={searchTerm}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setLocalSearch('');
                  onSearchChange('');
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            {/* Botón filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap text-sm ${
                showFilters || activeFilters > 0
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {activeFilters > 0 && (
                <span className="ml-1 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Limpiar */}
            {activeFilters > 0 && (
              <button
                onClick={onClearFilters}
                className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <X className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Resultados */}
        {totalResults !== undefined && (
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
          </div>
        )}
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Categorías */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(selectedCategory === cat.id ? '' : cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      selectedCategory === cat.id
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Ubicación
              </label>
              <input
                type="text"
                placeholder="Ciudad o zona..."
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Calificación mínima */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                Calificación mínima
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => onRatingChange(parseFloat(e.target.value))}
                  className="flex-1 accent-primary-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                  {minRating > 0 ? minRating.toFixed(1) : 'Cualquiera'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

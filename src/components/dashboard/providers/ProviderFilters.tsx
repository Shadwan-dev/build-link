'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface ProviderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const ALL_CATEGORIES = [
  'Construcción',
  'Albañilería',
  'Carpintería',
  'Techos',
  'Jardinería',
  'Plomería',
  'Electricidad',
  'Pintura',
];

export const ProviderFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}: ProviderFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Buscador */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, especialidad o ubicación..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 whitespace-nowrap"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>

          {(searchTerm || selectedCategory) && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition flex items-center gap-2 whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Filtros expandibles */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrar por categoría:
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(selectedCategory === category ? '' : category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

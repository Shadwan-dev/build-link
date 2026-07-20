'use client';

import { RequestFilterOptions, RequestStatus, UrgencyLevel } from '@/types/request.types';
import { Filter, Search, X } from 'lucide-react';
import { useState } from 'react';

interface RequestFiltersProps {
  role: 'client' | 'provider';
  filters: RequestFilterOptions;
  onFilterChange: (filters: RequestFilterOptions) => void;
}

// ✅ Usar los tipos correctos
const STATUS_OPTIONS: { value: RequestStatus; label: string }[] = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en-progreso', label: 'En progreso' },
  { value: 'completado', label: 'Completado' },
  { value: 'aceptado', label: 'Aceptado' },
  { value: 'rechazado', label: 'Rechazado' },
];

// ✅ Categorías con sus IDs
const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'construction', label: 'Construcción' },
  { value: 'carpentry', label: 'Carpintería' },
  { value: 'roofing', label: 'Techos' },
  { value: 'gardening', label: 'Jardinería' },
  { value: 'plumbing', label: 'Plomería' },
  { value: 'electrical', label: 'Electricidad' },
  { value: 'painting', label: 'Pintura' },
  { value: 'masonry', label: 'Albañilería' },
];

const URGENCY_OPTIONS: { value: UrgencyLevel; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgente', label: 'Urgente' },
  { value: 'muy-urgente', label: 'Muy urgente' },
];

export const RequestFilters = ({ role, filters, onFilterChange }: RequestFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ ...filters, search: value });
  };

  const handleFilterChange = (key: keyof RequestFilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFilterChange({});
  };

  // ✅ Usar categoryId en lugar de category
  const hasActiveFilters =
    filters.status || filters.categoryId || filters.urgency || filters.search;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, categoría o descripción..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
              showFilters || hasActiveFilters
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition flex items-center gap-2 whitespace-nowrap"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Estado
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                <option value="">Todos los estados</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Categoría
              </label>
              <select
                value={filters.categoryId || ''}
                onChange={(e) => handleFilterChange('categoryId', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                <option value="">Todas las categorías</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Urgencia
              </label>
              <select
                value={filters.urgency || ''}
                onChange={(e) => handleFilterChange('urgency', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                <option value="">Todas</option>
                {URGENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap gap-2">
              {filters.status && (
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full flex items-center gap-1">
                  Estado: {STATUS_OPTIONS.find((s) => s.value === filters.status)?.label}
                  <button
                    onClick={() => handleFilterChange('status', undefined)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.categoryId && (
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full flex items-center gap-1">
                  Categoría:{' '}
                  {CATEGORY_OPTIONS.find((c) => c.value === filters.categoryId)?.label ||
                    filters.categoryId}
                  <button
                    onClick={() => handleFilterChange('categoryId', undefined)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.urgency && (
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full flex items-center gap-1">
                  Urgencia: {URGENCY_OPTIONS.find((u) => u.value === filters.urgency)?.label}
                  <button
                    onClick={() => handleFilterChange('urgency', undefined)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

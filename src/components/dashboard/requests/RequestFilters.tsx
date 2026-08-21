'use client';

import { RequestFilterOptions, RequestStatus, UrgencyLevel } from '@/types/request.types';
import { X } from 'lucide-react';
import { useState } from 'react';

interface RequestFiltersProps {
  role: 'client' | 'provider';
  filters: RequestFilterOptions;
  onFilterChange: (filters: RequestFilterOptions) => void;
}

// ✅ Opciones de estado
const STATUS_OPTIONS: { value: RequestStatus; label: string; color: string }[] = [
  {
    value: 'pendiente',
    label: 'Pendiente',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  },
  {
    value: 'en-progreso',
    label: 'En progreso',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  {
    value: 'completado',
    label: 'Completado',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
  {
    value: 'aceptado',
    label: 'Aceptado',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
  {
    value: 'rechazado',
    label: 'Rechazado',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  },
];

// ✅ Opciones de categoría
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

// ✅ Opciones de urgencia
const URGENCY_OPTIONS: { value: UrgencyLevel; label: string }[] = [
  { value: 'normal', label: '🟢 Normal' },
  { value: 'urgente', label: '🟡 Urgente' },
  { value: 'muy-urgente', label: '🔴 Muy urgente' },
];

export const RequestFilters = ({ role, filters, onFilterChange }: RequestFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const handleFilterChange = (key: keyof RequestFilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.status || filters.categoryId || filters.urgency || filters.search;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Estado */}
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

        {/* Categoría */}
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

        {/* Urgencia */}
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

      {/* Filtros activos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          {filters.status && (
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full flex items-center gap-1">
              Estado: {STATUS_OPTIONS.find((s) => s.value === filters.status)?.label}
              <button
                onClick={() => handleFilterChange('status', undefined)}
                className="hover:text-red-500 transition"
              >
                <X className="w-3 h-3" />
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
                className="hover:text-red-500 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.urgency && (
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full flex items-center gap-1">
              Urgencia: {URGENCY_OPTIONS.find((u) => u.value === filters.urgency)?.label}
              <button
                onClick={() => handleFilterChange('urgency', undefined)}
                className="hover:text-red-500 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full flex items-center gap-1">
              Búsqueda: {filters.search}
              <button
                onClick={() => handleFilterChange('search', undefined)}
                className="hover:text-red-500 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

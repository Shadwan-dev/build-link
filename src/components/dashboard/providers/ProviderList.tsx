'use client';
import { log } from '@/lib/utils/logger';

import { Provider } from '@/lib/firebase/provider.service';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ProviderCard } from './ProviderCard';

interface ProviderListProps {
  providers: Provider[];
  loading?: boolean;
  variant?: 'compact' | 'detailed';
  emptyMessage?: string;
  itemsPerPage?: number;
}

export const ProviderList = ({
  providers,
  loading = false,
  variant = 'compact',
  emptyMessage = 'No se encontraron proveedores',
  itemsPerPage = 6,
}: ProviderListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(providers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProviders = providers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando proveedores...</p>
        </div>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{emptyMessage}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {providers.length === 0 && !loading
            ? 'Prueba con otros filtros o términos de búsqueda'
            : 'Aún no hay proveedores registrados'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando {startIndex + 1}-{Math.min(endIndex, providers.length)} de {providers.length}{' '}
          proveedores
        </p>
      </div>

      <div
        className={`grid ${
          variant === 'detailed' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        } gap-4`}
      >
        {currentProviders.map((provider) => (
          <ProviderCard key={provider.uid} provider={provider} variant={variant} />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

'use client';

import { Request } from '@/types/request.types';
import { FileText, LayoutGrid, LayoutList, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { RequestCard } from './RequestCard';

interface RequestListProps {
  requests: Request[];
  loading?: boolean;
  emptyMessage?: string;
  onStatusChange?: (id: string, status: 'aceptado' | 'rechazado') => void;
  showActions?: boolean;
}

export const RequestList = ({
  requests,
  loading = false,
  emptyMessage = 'No hay solicitudes',
  onStatusChange,
  showActions = false,
}: RequestListProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          No hay solicitudes para mostrar en este momento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ✅ Control de vista */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {requests.length} {requests.length === 1 ? 'solicitud' : 'solicitudes'}
        </p>
        <div className="flex gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition ${
              viewMode === 'grid'
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ✅ Lista de solicitudes */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onStatusChange={onStatusChange}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
};

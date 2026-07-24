'use client';
import { log } from '@/lib/utils/logger';

import { Request } from '@/types/request.types';
import { FileText, Loader2 } from 'lucide-react';
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
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{emptyMessage}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          No hay solicitudes para mostrar en este momento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onStatusChange={onStatusChange}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

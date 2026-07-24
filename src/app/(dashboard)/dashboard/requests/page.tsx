'use client';
import { log } from '@/lib/utils/logger';

import { RequestFilters } from '@/components/dashboard/requests/RequestFilters';
import { RequestList } from '@/components/dashboard/requests/RequestList';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getFilteredRequests } from '@/lib/firebase/requests.service';
import { Request, RequestFilterOptions } from '@/types/request.types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RequestsPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RequestFilterOptions>({});

  const loadRequests = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getFilteredRequests(user.uid, currentRole || 'client', filters);
      setRequests(data);
    } catch (error) {
      log.error('Error cargando solicitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [user, currentRole, filters]);

  const handleFilterChange = (newFilters: RequestFilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            📋 {currentRole === 'provider' ? 'Solicitudes recibidas' : 'Mis solicitudes'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentRole === 'provider'
              ? 'Gestiona las solicitudes de tus clientes'
              : 'Seguimiento de tus solicitudes enviadas'}
          </p>
        </div>
        {currentRole === 'client' && (
          <Link
            href="/dashboard/requests/new"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nueva solicitud
          </Link>
        )}
      </div>

      <RequestFilters
        role={currentRole || 'client'}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <RequestList
        requests={requests}
        loading={loading}
        emptyMessage={
          currentRole === 'provider'
            ? 'No has recibido solicitudes aún'
            : 'No has enviado solicitudes aún'
        }
        onStatusChange={loadRequests}
        showActions={currentRole === 'provider'}
      />
    </div>
  );
}

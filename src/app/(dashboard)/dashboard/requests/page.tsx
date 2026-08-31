'use client';

import { RequestFilters } from '@/components/dashboard/requests/RequestFilters';
import { RequestList } from '@/components/dashboard/requests/RequestList';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getFilteredRequests, updateRequestStatus } from '@/lib/firebase/requests.service';
import { log } from '@/lib/utils/logger';
import { Request, RequestFilterOptions } from '@/types/request.types';
import { Filter, Plus, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function RequestsPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RequestFilterOptions>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const isProvider = currentRole === 'provider';
  const isClient = currentRole === 'client';

  // ✅ Cargar solicitudes
  const loadRequests = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getFilteredRequests(user.uid, currentRole || 'client', filters);
      setRequests(data);
      // ✅ DEBUG: Verificar imágenes
      console.log('📸 Solicitudes cargadas:', data.length);
      data.forEach((req, index) => {
        console.log(`📸 Solicitud ${index}:`, {
          id: req.id,
          title: req.categoryName,
          hasImages: req.images && req.images.length > 0,
          images: req.images,
        });
      });
    } catch (error) {
      log.error('Error cargando solicitudes:', error);
      toast.error('Error al cargar solicitudes');
    } finally {
      setLoading(false);
    }
  }, [user, currentRole, filters]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleStatusChange = async (id: string, status: 'aceptado' | 'rechazado') => {
    if (!user) return;

    try {
      // ✅ 1. Actualizar en Firestore
      await updateRequestStatus(id, status, user.uid);

      // ✅ 2. Actualizar estado local (optimista)
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: status, providerId: user.uid } : req))
      );

      toast.success(`✅ Solicitud ${status === 'aceptado' ? 'aceptada' : 'rechazada'}`);

      // ✅ 3. Recargar para reflejar cambios adicionales
      await loadRequests();
    } catch (error: any) {
      log.error('Error actualizando solicitud:', error);
      toast.error(error.message || 'Error al actualizar la solicitud');
      // ✅ Revertir cambio optimista en caso de error
      await loadRequests();
    }
  };

  // ✅ Manejar cambio de filtros
  const handleFilterChange = (newFilters: RequestFilterOptions) => {
    setFilters(newFilters);
  };

  // ✅ Limpiar filtros
  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  // ✅ Contar filtros activos
  const activeFiltersCount = Object.keys(filters).filter(
    (key) =>
      filters[key as keyof RequestFilterOptions] !== undefined &&
      filters[key as keyof RequestFilterOptions] !== ''
  ).length;

  // ✅ Estadísticas de solicitudes
  const stats = {
    total: requests.length,
    pendiente: requests.filter((r) => r.status === 'pendiente').length,
    aceptado: requests.filter((r) => r.status === 'aceptado').length,
    completado: requests.filter((r) => r.status === 'completado').length,
    rechazado: requests.filter((r) => r.status === 'rechazado').length,
    'en-progreso': requests.filter((r) => r.status === 'en-progreso').length,
  };
  console.log('📸 ANTES DE RENDERIZAR - requests:', requests);
  console.log(
    '📸 ANTES DE RENDERIZAR - requests con imágenes:',
    requests.filter((r) => r.images && r.images.length > 0)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ✅ Header con estadísticas */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            📋 {isProvider ? 'Solicitudes recibidas' : 'Mis solicitudes'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            {isProvider
              ? 'Gestiona las solicitudes de tus clientes'
              : 'Seguimiento de tus solicitudes enviadas'}
          </p>
        </div>
        {isClient && (
          <Link
            href="/dashboard/requests/new"
            className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Nueva solicitud
          </Link>
        )}
      </div>

      {/* ✅ Estadísticas rápidas */}
      {!loading && requests.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.pendiente}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Pendientes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {stats.aceptado + stats['en-progreso']}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">En curso</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {stats.completado}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Completados</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 text-center">
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {stats.rechazado}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Rechazados</div>
          </div>
        </div>
      )}

      {/* ✅ Barra de búsqueda y filtros mejorada */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Buscador */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por cliente, categoría o descripción..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange({ ...filters, search: e.target.value || undefined });
              }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleFilterChange({ ...filters, search: undefined });
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Botón filtros con contador */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap text-sm ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-1 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Limpiar filtros */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <X className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Panel de filtros expandible */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <RequestFilters
              role={currentRole || 'client'}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}
      </div>

      {/* ✅ Lista de solicitudes */}
      <RequestList
        requests={requests}
        loading={loading}
        emptyMessage={
          isProvider ? 'No has recibido solicitudes aún' : 'No has enviado solicitudes aún'
        }
        onStatusChange={handleStatusChange}
        showActions={isProvider}
      />

      {/* ✅ Mensaje de ayuda cuando no hay solicitudes y no hay filtros */}
      {!loading && requests.length === 0 && activeFiltersCount === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {isProvider ? 'Aún no hay solicitudes' : 'Aún no has creado solicitudes'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {isProvider
              ? 'Los clientes te contactarán a través de tus servicios'
              : isClient
                ? 'Comienza publicando tu primera solicitud'
                : 'Selecciona un rol para empezar'}
          </p>
          {isClient && (
            <Link
              href="/dashboard/requests/new"
              className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Publicar solicitud
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

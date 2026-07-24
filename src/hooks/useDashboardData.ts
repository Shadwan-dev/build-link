'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import {
  countRequestsByStatus,
  getClientRequests,
  getProviderRequests,
  getRequestStatsByCategory,
} from '@/lib/firebase/requests.service';
import { getReviewStats } from '@/lib/firebase/review.service';
import { Request } from '@/types/request.types';
import { ReviewStats } from '@/types/review.types';
import { useCallback, useEffect, useState } from 'react';

export interface DashboardData {
  // Estadísticas
  stats: {
    total: number;
    pendiente: number;
    aceptado: number;
    rechazado: number;
    'en-progreso': number;
    completado: number;
  };
  // Solicitudes recientes
  recentRequests: Request[];
  // Actividad
  activity: {
    id: string;
    type: 'solicitud' | 'mensaje' | 'completado' | 'nuevo' | 'respuesta';
    title: string;
    description: string;
    time: string;
    status: string;
  }[];
  // Estadísticas por categoría
  categoryStats: {
    categoryId: string;
    categoryName: string;
    total: number;
    pendiente: number;
    completado: number;
  }[];
  // Estadísticas de reviews (si es proveedor)
  reviewStats?: ReviewStats;
  // Cargando
  loading: boolean;
  // Refrescar
  refresh: () => Promise<void>;
}

export const useDashboardData = (): DashboardData => {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    stats: { total: 0, pendiente: 0, aceptado: 0, rechazado: 0, 'en-progreso': 0, completado: 0 },
    recentRequests: [],
    activity: [],
    categoryStats: [],
    loading: true,
    refresh: async () => {},
  });

  const loadData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      // ✅ 1. Obtener solicitudes según el rol
      let requests: Request[] = [];
      let stats: any = {
        total: 0,
        pendiente: 0,
        aceptado: 0,
        rechazado: 0,
        'en-progreso': 0,
        completado: 0,
      };
      let categoryStats: any[] = [];
      let reviewStats: ReviewStats | undefined;

      if (currentRole === 'provider') {
        // ✅ Proveedor: ver solicitudes recibidas
        requests = await getProviderRequests(user.uid);
        // ✅ Estadísticas del proveedor
        const providerStats = await countRequestsByStatus(user.uid, 'provider');
        stats = providerStats;
        // ✅ Estadísticas por categoría
        categoryStats = await getRequestStatsByCategory();
        // ✅ Estadísticas de reviews
        reviewStats = await getReviewStats(user.uid);
      } else {
        // ✅ Cliente: ver solicitudes enviadas
        requests = await getClientRequests(user.uid);
        // ✅ Estadísticas del cliente
        const clientStats = await countRequestsByStatus(user.uid, 'client');
        stats = clientStats;
        // ✅ Estadísticas por categoría
        categoryStats = await getRequestStatsByCategory();
      }

      // ✅ 2. Obtener actividad reciente (últimas 5 solicitudes)
      const recentRequests = requests.slice(0, 5);

      // ✅ 3. Generar actividad
      const activity = recentRequests.map((req) => {
        const statusMap: Record<string, { type: any; title: string; status: string }> = {
          pendiente: { type: 'solicitud', title: 'Nueva solicitud', status: 'pendiente' },
          aceptado: { type: 'respuesta', title: 'Solicitud aceptada', status: 'leído' },
          rechazado: { type: 'respuesta', title: 'Solicitud rechazada', status: 'leído' },
          'en-progreso': { type: 'nuevo', title: 'Trabajo en progreso', status: 'leído' },
          completado: { type: 'completado', title: 'Proyecto completado', status: 'completado' },
        };

        const info = statusMap[req.status] || {
          type: 'solicitud',
          title: 'Solicitud',
          status: 'leído',
        };

        return {
          id: req.id,
          type: info.type as any,
          title: `${info.title}: ${req.categoryName}`,
          description: `${currentRole === 'provider' ? req.clientName : req.providerName} - ${req.description.slice(0, 60)}...`,
          time: req.createdAt
            ? new Date(req.createdAt.seconds * 1000).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Fecha no disponible',
          status: info.status,
        };
      });

      setData({
        stats,
        recentRequests,
        activity,
        categoryStats,
        reviewStats,
        loading: false,
        refresh: loadData,
      });
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
      setData((prev) => ({ ...prev, loading: false }));
    } finally {
      setLoading(false);
    }
  }, [user, currentRole]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { ...data, loading, refresh: loadData };
};

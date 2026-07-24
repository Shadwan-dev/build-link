'use client';
import { log } from '@/lib/utils/logger';

import { ActivityFeed } from '@/components/dashboard/shared/ActivityFeed';
import { CategoryChart } from '@/components/dashboard/stats/CategoryChart';
import { StatsCards } from '@/components/dashboard/stats/StatsCards';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import {
  CategoryStats,
  getCategoryStats,
  getMonthlyStats,
  getProviderStats,
  getRecentActivity,
  MonthlyStats,
  ProviderStats,
} from '@/lib/firebase/stats.service';
import { Award, Calendar, Loader2, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StatsPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ProviderStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    completedJobs: 0,
    averageRating: 0,
    totalReviews: 0,
    estimatedEarnings: 0,
    responseRate: 0,
  });
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  const loadStats = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [statsData, categoryData, monthlyData, activityData] = await Promise.all([
        getProviderStats(user.uid),
        getCategoryStats(user.uid),
        getMonthlyStats(user.uid),
        getRecentActivity(user.uid, 10),
      ]);

      setStats(statsData);
      setCategoryStats(categoryData);
      setMonthlyStats(monthlyData);
      setRecentActivity(activityData);
    } catch (error) {
      log.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          📊 Estadísticas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Analiza el rendimiento de tu negocio en BuildLink
        </p>
      </div>

      {/* KPIs */}
      <StatsCards stats={stats} loading={loading} />

      {/* Métricas adicionales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalApplications}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Solicitudes recibidas</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.responseRate}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tasa de respuesta</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
              <Award className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalReviews}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reseñas recibidas</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeJobs}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ofertas activas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categorías */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Ofertas por categoría
          </h3>
          <CategoryChart categories={categoryStats} loading={loading} />
        </div>

        {/* Actividad reciente */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📋 Actividad reciente
          </h3>
          <ActivityFeed activities={recentActivity} maxItems={5} showViewAll={false} />
        </div>
      </div>

      {/* Resumen mensual */}
      {monthlyStats.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📈 Resumen mensual
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {monthlyStats.map((month) => (
              <div
                key={month.month}
                className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {month.month}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{month.jobs}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {month.applications} solicitudes · {month.completed} completados
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

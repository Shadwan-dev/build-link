'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { useDashboardData } from '@/hooks/useDashboardData';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Hammer,
  Home,
  Loader2,
  MessageSquare,
  RefreshCw,
  Search,
  Star,
  TrendingUp,
  UserPlus,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const { stats, recentRequests, activity, reviewStats, loading, refresh } = useDashboardData();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  // ✅ Estadísticas para el dashboard
  const statCards = [
    {
      label: 'Solicitudes totales',
      value: stats.total,
      icon: FileText,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      label: 'Pendientes',
      value: stats.pendiente,
      icon: Clock,
      color: 'bg-yellow-500',
      trend: stats.pendiente > 0 ? '⚠️ Pendientes' : '✅ Completas',
    },
    {
      label: 'Aceptadas',
      value: stats.aceptado + stats['en-progreso'],
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: 'En proceso',
    },
    {
      label: currentRole === 'provider' ? '⭐ Calificación' : 'Completadas',
      value:
        currentRole === 'provider'
          ? (reviewStats?.averageRating || 0).toFixed(1)
          : stats.completado,
      icon: Star,
      color: 'bg-purple-500',
      trend:
        currentRole === 'provider'
          ? `${reviewStats?.totalReviews || 0} reseñas`
          : `${stats.completado} finalizadas`,
    },
  ];

  // ✅ Acciones rápidas según rol
  const quickActions =
    currentRole === 'provider'
      ? [
          {
            title: 'Ver solicitudes',
            description: 'Gestiona las solicitudes de clientes',
            icon: FileText,
            color: 'bg-blue-500',
            href: '/dashboard/requests',
          },
          {
            title: 'Mi perfil',
            description: 'Actualiza tu información profesional',
            icon: UserPlus,
            color: 'bg-green-500',
            href: '/dashboard/profile',
          },
          {
            title: 'Estadísticas',
            description: 'Analiza tu rendimiento',
            icon: BarChart3,
            color: 'bg-purple-500',
            href: '/dashboard/stats',
          },
        ]
      : [
          {
            title: 'Buscar profesionales',
            description: 'Encuentra al especialista que necesitas',
            icon: Search,
            color: 'bg-blue-500',
            href: '/dashboard/providers',
          },
          {
            title: 'Nueva solicitud',
            description: 'Publica tu proyecto',
            icon: FileText,
            color: 'bg-green-500',
            href: '/dashboard/requests/new',
          },
          {
            title: 'Mis solicitudes',
            description: 'Seguimiento de tus proyectos',
            icon: Briefcase,
            color: 'bg-purple-500',
            href: '/dashboard/requests',
          },
        ];

  // ✅ Categorías populares (usando datos reales o fallback)
  const categories = [
    {
      name: 'Construcción',
      icon: Building2,
      count: 124,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      name: 'Carpintería',
      icon: Hammer,
      count: 45,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    },
    {
      name: 'Techos',
      icon: Home,
      count: 32,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      name: 'Plomería',
      icon: Wrench,
      count: 28,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ✅ Header con bienvenida y refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            👋 ¡Bienvenido, {user?.displayName || 'Usuario'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            {currentRole === 'provider'
              ? 'Gestiona tus solicitudes y proyectos de manera eficiente'
              : 'Encuentra los mejores profesionales para tu proyecto'}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      {/* ✅ Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ✅ Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ✅ Columna principal - Actividad reciente */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-500" />
                Actividad reciente
              </h2>
              {activity.length > 0 && (
                <Link
                  href="/dashboard/requests"
                  className="text-xs md:text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  Ver todas
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
              {activity.length > 0 ? (
                activity.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 md:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.status === 'pendiente'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            : item.status === 'completado'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {item.type === 'solicitud' && <FileText className="w-4 h-4" />}
                        {item.type === 'mensaje' && <MessageSquare className="w-4 h-4" />}
                        {item.type === 'completado' && <CheckCircle className="w-4 h-4" />}
                        {item.type === 'nuevo' && <AlertCircle className="w-4 h-4" />}
                        {item.type === 'respuesta' && <TrendingUp className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 md:px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                  <p>No hay actividad reciente</p>
                </div>
              )}
            </div>
          </div>

          {/* ✅ Categorías populares */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-500" />
              Categorías populares
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/dashboard/providers?category=${cat.name}`}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition text-center hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center mx-auto mb-2`}
                  >
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {cat.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {cat.count} profesionales
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Columna lateral */}
        <div className="space-y-6">
          {/* ✅ Acciones rápidas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base flex items-center gap-2">
              ⚡ Acciones rápidas
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${action.color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}
                  >
                    <action.icon className={`w-5 h-5 ${action.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* ✅ Estado del usuario */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {user?.displayName || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentRole === 'provider' ? '👷 Proveedor' : '👤 Cliente'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {currentRole === 'provider' && reviewStats?.totalReviews
                      ? 'Verificado'
                      : 'Activo'}
                  </span>
                </div>
              </div>
            </div>
            {currentRole === 'provider' && reviewStats && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">⭐ Calificación promedio</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {reviewStats.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600 dark:text-gray-400">📝 Total reseñas</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {reviewStats.totalReviews}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Consejo del día */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">💡 Consejo del día</h3>
                <p className="text-white/90 text-sm mt-1">
                  {currentRole === 'provider'
                    ? 'Responde rápidamente a las solicitudes para aumentar tus posibilidades de conseguir nuevos proyectos.'
                    : 'Verifica siempre las calificaciones y testimonios antes de contratar un profesional.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

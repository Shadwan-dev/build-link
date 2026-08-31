// app/dashboard/page.tsx
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
  Plus,
  RefreshCw,
  Search,
  Star,
  TrendingUp,
  UserPlus,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const router = useRouter();
  const { stats, recentRequests, activity, reviewStats, loading, refresh } = useDashboardData();
  const [refreshing, setRefreshing] = useState(false);

  const isClient = currentRole === 'client';
  const isProvider = currentRole === 'provider';

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
    toast.success('✅ Dashboard actualizado');
  };

  // ✅ Estadísticas para el dashboard (usando datos reales)
  const statCards = isProvider
    ? [
        {
          label: 'Solicitudes recibidas',
          value: stats.total || 0,
          icon: FileText,
          color: 'bg-blue-500',
          trend: `${stats.pendiente || 0} pendientes`,
        },
        {
          label: 'En proceso',
          value: (stats.aceptado || 0) + (stats['en-progreso'] || 0),
          icon: Clock,
          color: 'bg-yellow-500',
          trend: 'En curso',
        },
        {
          label: 'Completados',
          value: stats.completado || 0,
          icon: CheckCircle,
          color: 'bg-green-500',
          trend: '✅ Finalizados',
        },
        {
          label: '⭐ Calificación',
          value: (reviewStats?.averageRating || 0).toFixed(1),
          icon: Star,
          color: 'bg-purple-500',
          trend: `${reviewStats?.totalReviews || 0} reseñas`,
        },
      ]
    : [
        {
          label: 'Mis solicitudes',
          value: stats.total || 0,
          icon: FileText,
          color: 'bg-blue-500',
          trend: `${stats.pendiente || 0} pendientes`,
        },
        {
          label: 'En curso',
          value: (stats.aceptado || 0) + (stats['en-progreso'] || 0),
          icon: Clock,
          color: 'bg-yellow-500',
          trend: 'Progreso',
        },
        {
          label: 'Completadas',
          value: stats.completado || 0,
          icon: CheckCircle,
          color: 'bg-green-500',
          trend: '✅ Finalizadas',
        },
        {
          label: 'Rechazadas',
          value: stats.rechazado || 0,
          icon: AlertCircle,
          color: 'bg-red-500',
          trend: 'No aceptadas',
        },
      ];

  // ✅ Acciones rápidas según rol
  const quickActions = isClient
    ? [
        {
          title: '📝 Nueva solicitud',
          description: 'Publica tu proyecto',
          icon: Plus,
          color: 'bg-primary-500',
          href: '/dashboard/requests/new',
          primary: true,
        },
        {
          title: '🔍 Buscar profesionales',
          description: 'Encuentra al especialista',
          icon: Search,
          color: 'bg-blue-500',
          href: '/dashboard/providers',
        },
        {
          title: '📋 Mis solicitudes',
          description: 'Seguimiento de proyectos',
          icon: Briefcase,
          color: 'bg-green-500',
          href: '/dashboard/requests',
        },
        {
          title: '👤 Mi perfil',
          description: 'Gestiona tu información',
          icon: UserPlus,
          color: 'bg-purple-500',
          href: '/dashboard/profile',
        },
      ]
    : [
        {
          title: '📋 Solicitudes recibidas',
          description: 'Gestiona solicitudes',
          icon: FileText,
          color: 'bg-blue-500',
          href: '/dashboard/requests',
          primary: true,
        },
        {
          title: '📸 Mi portafolio',
          description: 'Muestra tus trabajos',
          icon: Briefcase,
          color: 'bg-green-500',
          href: '/dashboard/portfolio',
        },
        {
          title: '👤 Mi perfil',
          description: 'Actualiza tu información',
          icon: UserPlus,
          color: 'bg-purple-500',
          href: '/dashboard/profile',
        },
        {
          title: '📊 Estadísticas',
          description: 'Analiza tu rendimiento',
          icon: BarChart3,
          color: 'bg-orange-500',
          href: '/dashboard/stats',
        },
      ];

  // ✅ Categorías populares
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            👋 ¡Hola, {user?.displayName || 'Usuario'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            {isClient
              ? 'Encuentra los mejores profesionales para tu proyecto'
              : isProvider
                ? 'Gestiona tus solicitudes y proyectos de manera eficiente'
                : 'Bienvenido a tu panel de control'}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      {/* Estadísticas */}
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

      {/* Acciones rápidas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base flex items-center gap-2">
            ⚡ Acciones rápidas
          </h2>
          {isClient && (
            <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
              ¡Comienza aquí!
            </span>
          )}
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all group ${
                  action.primary
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 hover:shadow-lg hover:border-primary-600'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full ${action.color} flex items-center justify-center ${
                    action.primary ? 'shadow-lg shadow-primary-500/30' : ''
                  }`}
                >
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal - Actividad reciente */}
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
                activity.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="px-4 md:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
                    onClick={() => {
                      // ✅ Usar link si existe, sino ir a requests
                      router.push((item as any).link || '/dashboard/requests');
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.status === 'pendiente'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            : item.status === 'completado'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : item.status === 'aceptado'
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
                  {isClient && (
                    <Link
                      href="/dashboard/requests/new"
                      className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm"
                    >
                      Crear mi primera solicitud
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Categorías populares */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-500" />
              Categorías populares
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/dashboard/providers?category=${encodeURIComponent(cat.name)}`}
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

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Estado del usuario */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-xl">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {user?.displayName || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  {isClient ? '👤 Cliente' : isProvider ? '👷 Proveedor' : '👤 Usuario'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {isProvider && reviewStats?.totalReviews ? 'Verificado' : 'Activo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Últimas solicitudes */}
            {recentRequests.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Últimas solicitudes
                </p>
                <div className="mt-2 space-y-2">
                  {recentRequests.slice(0, 3).map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 -mx-2 px-2 rounded-lg transition"
                      onClick={() => router.push(`/dashboard/requests/${req.id}`)}
                    >
                      <span className="text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                        {req.categoryName || 'Solicitud'}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          req.status === 'pendiente'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            : req.status === 'aceptado'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : req.status === 'completado'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {req.status === 'pendiente' && '⏳ Pendiente'}
                        {req.status === 'aceptado' && '✅ Aceptada'}
                        {req.status === 'completado' && '🎉 Completada'}
                        {req.status === 'rechazado' && '❌ Rechazada'}
                        {req.status === 'en-progreso' && '🔄 En progreso'}
                      </span>
                    </div>
                  ))}
                </div>
                {recentRequests.length > 3 && (
                  <Link
                    href="/dashboard/requests"
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-2 block"
                  >
                    Ver todas las solicitudes
                  </Link>
                )}
              </div>
            )}

            {/* Reseñas para proveedor */}
            {isProvider && reviewStats && reviewStats.totalReviews > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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

          {/* Consejo del día */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 md:p-6 text-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">💡 Consejo del día</h3>
                <p className="text-white/90 text-sm mt-1">
                  {isClient
                    ? 'Publica tu solicitud con detalles específicos para recibir mejores ofertas de profesionales.'
                    : isProvider
                      ? 'Responde rápidamente a las solicitudes para aumentar tus posibilidades de conseguir nuevos proyectos.'
                      : 'Completa tu perfil para aprovechar al máximo la plataforma.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

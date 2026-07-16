'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Activity } from '@/types/dashboard.types';
import { CheckCircle, FileText, Inbox, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ActivityFeed } from '../shared/ActivityFeed';
import { QuickActions } from '../shared/QuickActions';
import { StatsGrid } from '../shared/StatsGrid';
import { WelcomeBanner } from '../shared/WelcomeBanner';

// Datos de ejemplo
const mockStats = [
  {
    label: 'Solicitudes nuevas',
    value: '12',
    icon: Inbox,
    change: '+5',
    color: 'bg-blue-500',
  },
  {
    label: 'Ofertas pendientes',
    value: '5',
    icon: FileText,
    change: '-2',
    color: 'bg-yellow-500',
  },
  {
    label: 'Proyectos completados',
    value: '20',
    icon: CheckCircle,
    change: '+3',
    color: 'bg-green-500',
  },
  {
    label: 'Calificación promedio',
    value: '4.8',
    icon: Star,
    change: '+0.1',
    color: 'bg-purple-500',
  },
];

// ✅ Actividades con tipos correctos
const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'nuevo',
    title: 'Nueva solicitud de construcción',
    description: 'Cliente: Juan Pérez - Reforma de cocina',
    time: 'Hace 1 hora',
    status: 'nuevo',
    icon: null,
    link: '/dashboard/requests/1',
  },
  {
    id: 2,
    type: 'mensaje',
    title: 'Cliente respondió a tu oferta',
    description: 'Ana García aceptó tu presupuesto para terraza',
    time: 'Hace 3 horas',
    status: 'leído',
    icon: null,
    link: '/dashboard/messages/2',
  },
  {
    id: 3,
    type: 'completado',
    title: 'Proyecto completado',
    description: 'Cliente: Carlos López - Reparación de techo',
    time: 'Hace 5 horas',
    status: 'completado',
    icon: null,
    link: '/dashboard/projects/3',
  },
];

const mockActions = [
  {
    title: 'Ver solicitudes',
    description: 'Nuevas solicitudes de clientes',
    icon: Inbox,
    color: 'bg-blue-500',
    href: '/dashboard/requests',
  },
  {
    title: 'Mis ofertas',
    description: 'Gestiona tus ofertas enviadas',
    icon: FileText,
    color: 'bg-green-500',
    href: '/dashboard/jobs',
  },
  {
    title: 'Estadísticas',
    description: 'Analiza tu rendimiento',
    icon: TrendingUp,
    color: 'bg-purple-500',
    href: '/dashboard/stats',
  },
  {
    title: 'Mensajes',
    description: 'Comunícate con clientes',
    icon: MessageSquare,
    color: 'bg-orange-500',
    href: '/dashboard/messages',
  },
];

export const ProviderDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner de bienvenida */}
      <WelcomeBanner role="provider" />

      {/* Estadísticas */}
      <StatsGrid stats={mockStats} />

      {/* Acciones rápidas */}
      <QuickActions actions={mockActions} />

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Actividad reciente */}
          <ActivityFeed activities={mockActivities} />

          {/* Últimas solicitudes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base">
              📥 Últimas solicitudes
            </h2>
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  title: 'Reforma de baño completo',
                  client: 'Carlos Ruiz',
                  budget: '$3,500',
                  urgency: 'urgente',
                },
                {
                  id: 2,
                  title: 'Construcción de terraza',
                  client: 'Ana Martínez',
                  budget: '$2,500',
                  urgency: 'normal',
                },
                {
                  id: 3,
                  title: 'Reparación de techo',
                  client: 'Pedro Gómez',
                  budget: '$1,200',
                  urgency: 'muy-urgente',
                },
              ].map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
                  onClick={() => router.push(`/dashboard/requests/${request.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {request.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>Cliente: {request.client}</span>
                      <span>Presupuesto: {request.budget}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.urgency === 'urgente'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : request.urgency === 'muy-urgente'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {request.urgency === 'muy-urgente'
                      ? 'Urgente'
                      : request.urgency === 'urgente'
                        ? 'Importante'
                        : 'Normal'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Consejo del día */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 md:p-6 text-white">
            <h3 className="font-semibold text-sm md:text-base">💡 Consejo del día</h3>
            <p className="text-white/90 text-sm mt-1">
              Actualiza tu portafolio con fotos de tus últimos trabajos para atraer más clientes.
            </p>
          </div>

          {/* Testimonios recientes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
              ⭐ Testimonios recientes
            </h3>
            <div className="space-y-3">
              {[
                {
                  client: 'María López',
                  rating: 5,
                  comment: 'Excelente trabajo, muy profesional.',
                },
                { client: 'Juan Pérez', rating: 5, comment: 'Hizo un trabajo impecable.' },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {testimonial.client}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Estado del usuario */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.displayName || 'Usuario'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Proveedor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

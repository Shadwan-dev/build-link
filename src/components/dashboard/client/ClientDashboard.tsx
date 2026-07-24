'use client';
import { log } from '@/lib/utils/logger';

import { useAuth } from '@/contexts/AuthContext';
import { Activity } from '@/types/dashboard.types';
import { Briefcase, Clock, FileText, MessageSquare, Search, Star, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ActivityFeed } from '../shared/ActivityFeed';
import { CategoryGrid } from '../shared/CategoryGrid';
import { QuickActions } from '../shared/QuickActions';
import { StatsGrid } from '../shared/StatsGrid';
import { WelcomeBanner } from '../shared/WelcomeBanner';

// Datos de ejemplo con tipos correctos
const mockStats = [
  {
    label: 'Proveedores disponibles',
    value: '124',
    icon: Users,
    change: '+12%',
    color: 'bg-blue-500',
  },
  {
    label: 'Proyectos activos',
    value: '48',
    icon: Briefcase,
    change: '+8%',
    color: 'bg-green-500',
  },
  {
    label: 'Solicitudes pendientes',
    value: '23',
    icon: Clock,
    change: '-3%',
    color: 'bg-yellow-500',
  },
  {
    label: 'Calificación promedio',
    value: '4.8',
    icon: Star,
    change: '+0.2',
    color: 'bg-purple-500',
  },
];

// ✅ Actividades con tipos correctos
const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'solicitud',
    title: 'Nueva solicitud de construcción',
    description: 'Juan Pérez solicita presupuesto para reforma de cocina',
    time: 'Hace 2 horas',
    status: 'pendiente',
    icon: null,
    link: '/dashboard/requests/1',
  },
  {
    id: 2,
    type: 'mensaje',
    title: 'Mensaje de proveedor',
    description: 'Carpintería Martínez te ha enviado un mensaje',
    time: 'Hace 4 horas',
    status: 'leído',
    icon: null,
    link: '/dashboard/messages/2',
  },
  {
    id: 3,
    type: 'completado',
    title: 'Proyecto completado',
    description: 'Reparación de techo finalizada con éxito',
    time: 'Hace 1 día',
    status: 'completado',
    icon: null,
    link: '/dashboard/projects/3',
  },
];

const mockActions = [
  {
    title: 'Buscar profesionales',
    description: 'Encuentra al especialista que necesitas',
    icon: Search,
    color: 'bg-blue-500',
    href: '/dashboard/providers',
  },
  {
    title: 'Publicar solicitud',
    description: 'Describe tu proyecto y recibe presupuestos',
    icon: FileText,
    color: 'bg-green-500',
    href: '/dashboard/requests/new',
  },
  {
    title: 'Mis proyectos',
    description: 'Gestiona tus proyectos activos',
    icon: Briefcase,
    color: 'bg-purple-500',
    href: '/dashboard/projects',
  },
  {
    title: 'Mensajes',
    description: 'Comunícate con profesionales',
    icon: MessageSquare,
    color: 'bg-orange-500',
    href: '/dashboard/messages',
  },
];

export const ClientDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    router.push(`/dashboard/providers?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner de bienvenida */}
      <WelcomeBanner role="client" />

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

          {/* Categorías */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base">
              🏷️ Categorías populares
            </h2>
            <CategoryGrid onSelect={handleCategorySelect} />
          </div>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Consejo del día */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 md:p-6 text-white">
            <h3 className="font-semibold text-sm md:text-base">💡 Consejo del día</h3>
            <p className="text-white/90 text-sm mt-1">
              Verifica siempre las calificaciones y testimonios antes de contratar un profesional.
            </p>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

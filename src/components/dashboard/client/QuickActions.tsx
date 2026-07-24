'use client';
import { log } from '@/lib/utils/logger';

import { Briefcase, FileText, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';

const actions = [
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

export const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base">
        ⚡ Acciones rápidas
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <div
              className={`w-12 h-12 rounded-full ${action.color} bg-opacity-10 flex items-center justify-center`}
            >
              <action.icon className={`w-6 h-6 ${action.color.replace('bg-', 'text-')}`} />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {action.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center hidden md:block">
              {action.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

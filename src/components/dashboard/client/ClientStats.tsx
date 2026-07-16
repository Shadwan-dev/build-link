'use client';

import { Briefcase, Clock, Star, Users } from 'lucide-react';

const stats = [
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

export const ClientStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-8 h-8 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <span
              className={`text-xs font-medium ${
                stat.change.startsWith('+')
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {stat.change}
            </span>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

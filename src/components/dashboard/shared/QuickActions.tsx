'use client';
import { log } from '@/lib/utils/logger';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Action {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

interface QuickActionsProps {
  actions: Action[];
  columns?: 2 | 3 | 4;
}

export const QuickActions = ({ actions, columns = 4 }: QuickActionsProps) => {
  const colsMap = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm md:text-base">
        ⚡ Acciones rápidas
      </h2>
      <div className={`grid ${colsMap[columns]} gap-3`}>
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition hover:bg-gray-50 dark:hover:bg-gray-700/50 group"
          >
            <div
              className={`w-12 h-12 rounded-full ${action.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition`}
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

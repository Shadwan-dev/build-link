'use client';

import { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  color: string;
}

interface StatsGridProps {
  stats: Stat[];
  columns?: 2 | 3 | 4;
}

export const StatsGrid = ({ stats, columns = 4 }: StatsGridProps) => {
  const colsMap = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${colsMap[columns]} gap-4`}>
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
            {stat.change && (
              <span
                className={`text-xs font-medium ${
                  stat.change.startsWith('+')
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
            )}
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

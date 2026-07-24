'use client';
import { log } from '@/lib/utils/logger';

import { CategoryStats } from '@/lib/firebase/stats.service';

interface CategoryChartProps {
  categories: CategoryStats[];
  loading?: boolean;
}

export const CategoryChart = ({ categories, loading = false }: CategoryChartProps) => {
  if (loading) {
    return <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />;
  }

  if (categories.length === 0) {
    return (
      <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No hay datos de categorías</p>
      </div>
    );
  }

  const maxCount = Math.max(...categories.map((c) => c.count));

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.category} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">{cat.category}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {cat.count} ofertas · {cat.applications} solicitudes
            </span>
          </div>
          <div className="relative">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${(cat.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

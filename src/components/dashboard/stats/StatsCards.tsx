'use client';
import { log } from '@/lib/utils/logger';

import { ProviderStats } from '@/lib/firebase/stats.service';
import { Briefcase, CheckCircle, DollarSign, Star } from 'lucide-react';

interface StatsCardsProps {
  stats: ProviderStats;
  loading?: boolean;
}

export const StatsCards = ({ stats, loading = false }: StatsCardsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl p-4 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Ofertas',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Completados',
      value: stats.completedJobs,
      icon: CheckCircle,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    },
    {
      label: 'Calificación',
      value: stats.averageRating > 0 ? `${stats.averageRating}⭐` : 'Sin calificaciones',
      icon: Star,
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    },
    {
      label: 'Ganancias',
      value: `$${stats.estimatedEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

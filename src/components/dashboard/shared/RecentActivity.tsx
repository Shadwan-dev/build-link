'use client';

import { Activity } from '@/types/dashboard.types';
import { ArrowRight, CheckCircle, Clock, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
  showViewAll?: boolean;
}

export const RecentActivity = ({
  activities,
  maxItems = 5,
  showViewAll = true,
}: RecentActivityProps) => {
  const displayActivities = activities.slice(0, maxItems);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'completado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'nuevo':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'solicitud':
        return FileText;
      case 'mensaje':
        return MessageSquare;
      case 'completado':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
          Actividad reciente
        </h2>
        {showViewAll && (
          <Link
            href="/dashboard/activity"
            className="text-xs md:text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Ver todas
          </Link>
        )}
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {displayActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div
              key={activity.id}
              className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(activity.status)}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

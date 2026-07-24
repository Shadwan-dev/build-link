'use client';
import { log } from '@/lib/utils/logger';

import { Provider } from '@/types/dashboard.types';
import { Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

interface FeaturedProvidersProps {
  providers: Provider[];
}

export const FeaturedProviders = ({ providers }: FeaturedProvidersProps) => {
  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case 'disponible':
        return 'text-green-600 dark:text-green-400';
      case 'ocupado':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-400 dark:text-gray-500';
    }
  };

  const getAvailabilityLabel = (availability?: string) => {
    switch (availability) {
      case 'disponible':
        return 'Disponible';
      case 'ocupado':
        return 'Ocupado';
      default:
        return 'No disponible';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
          ⭐ Profesionales destacados
        </h2>
        <Link
          href="/dashboard/providers"
          className="text-xs md:text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Ver todos
        </Link>
      </div>
      <div className="space-y-4">
        {providers.map((provider) => (
          <Link
            key={provider.id}
            href={`/dashboard/providers/${provider.id}`}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group"
          >
            <img
              src={
                provider.photoURL ||
                `https://ui-avatars.com/api/?name=${provider.name}&background=2563eb&color=fff`
              }
              alt={provider.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {provider.name}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {provider.rating}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({provider.totalReviews})
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {provider.specialty}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {provider.location || 'No especificado'}
                </span>
                <span
                  className={`text-xs flex items-center gap-1 ${getAvailabilityColor(provider.availability)}`}
                >
                  <Clock className="w-3 h-3" />
                  {getAvailabilityLabel(provider.availability)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

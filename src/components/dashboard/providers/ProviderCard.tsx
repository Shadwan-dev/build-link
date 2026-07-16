'use client';

import { Provider } from '@/lib/firebase/provider.service';
import {
  Briefcase,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProviderCardProps {
  provider: Provider;
  variant?: 'compact' | 'detailed';
}

export const ProviderCard = ({ provider, variant = 'compact' }: ProviderCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getExperienceLabel = (years: number) => {
    if (years === 1) return '1 año de experiencia';
    return `${years} años de experiencia`;
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500';
  };

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? 'Disponible' : 'No disponible';
  };

  // Versión compact (vista en grid)
  if (variant === 'compact') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 group">
        {/* Header con foto y calificación */}
        <Link href={`/dashboard/providers/${provider.uid}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {provider.photoURL && !imageError ? (
                    <img
                      src={provider.photoURL}
                      alt={provider.displayName}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition line-clamp-1">
                    {provider.displayName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">
                      {provider.location || 'Ubicación no especificada'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  {provider.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({provider.totalRatings})
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Contenido */}
        <div className="p-4 space-y-3">
          {/* Especialidades */}
          <div className="flex flex-wrap gap-2">
            {provider.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
              >
                {specialty}
              </span>
            ))}
            {provider.specialties.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                +{provider.specialties.length - 3}
              </span>
            )}
          </div>

          {/* Descripción */}
          {provider.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {provider.description}
            </p>
          )}

          {/* Detalles */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {getExperienceLabel(provider.experience || 0)}
            </span>
            <span className={`flex items-center gap-1 ${getStatusColor(provider.isActive)}`}>
              <Clock className="w-4 h-4" />
              {getStatusLabel(provider.isActive)}
            </span>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2">
            <Link
              href={`/dashboard/providers/${provider.uid}`}
              className="flex-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-center text-sm font-medium"
            >
              Ver Perfil
            </Link>
            <button className="flex-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium flex items-center justify-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Contactar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Versión detailed (vista en detalle)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {provider.photoURL && !imageError ? (
              <img
                src={provider.photoURL}
                alt={provider.displayName}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {provider.displayName}
              </h1>
              {provider.isActive && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verificado
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {provider.location || 'Ubicación no especificada'}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {getExperienceLabel(provider.experience || 0)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {provider.rating.toFixed(1)} ({provider.totalRatings} reseñas)
              </span>
            </div>
          </div>

          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4" />
            Contactar
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Especialidades */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Especialidades
          </h2>
          <div className="flex flex-wrap gap-2">
            {provider.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Descripción */}
        {provider.description && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sobre nosotros
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{provider.description}</p>
          </div>
        )}

        {/* Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4 text-primary-500" />
            <span>{provider.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 text-primary-500" />
            <span>{provider.phone}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-center font-medium">
            Solicitar presupuesto
          </button>
          <button className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-center font-medium">
            Ver portafolio
          </button>
        </div>
      </div>
    </div>
  );
};

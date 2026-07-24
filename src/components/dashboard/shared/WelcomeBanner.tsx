'use client';
import { log } from '@/lib/utils/logger';

import { useAuth } from '@/contexts/AuthContext';

interface WelcomeBannerProps {
  title?: string;
  subtitle?: string;
  role?: 'client' | 'provider' | 'admin';
}

export const WelcomeBanner = ({ title, subtitle, role }: WelcomeBannerProps) => {
  const { user } = useAuth();

  const getEmoji = () => {
    switch (role) {
      case 'provider':
        return '👷';
      case 'admin':
        return '🛡️';
      default:
        return '👋';
    }
  };

  const getDefaultTitle = () => {
    const name = user?.displayName || 'Usuario';
    return `¡Bienvenido, ${name}! ${getEmoji()}`;
  };

  const getDefaultSubtitle = () => {
    switch (role) {
      case 'provider':
        return 'Gestiona tus solicitudes y proyectos de manera eficiente';
      case 'admin':
        return 'Administra todos los aspectos de la plataforma';
      default:
        return 'Encuentra los mejores profesionales para tu proyecto';
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl p-6 md:p-8 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">{title || getDefaultTitle()}</h1>
      <p className="text-primary-100 dark:text-primary-200 mt-1 text-sm md:text-base">
        {subtitle || getDefaultSubtitle()}
      </p>
    </div>
  );
};

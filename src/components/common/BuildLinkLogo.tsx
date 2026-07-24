'use client';
import { log } from '@/lib/utils/logger';

interface BuildLinkLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
}

export const BuildLinkLogo = ({
  className = '',
  variant = 'full',
  size = 'md',
  showTagline = false,
}: BuildLinkLogoProps) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12',
    '2xl': 'h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-5xl',
  };

  const taglineSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-2xl',
  };

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          className={`${sizeClasses[size]} flex-shrink-0`}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="36" height="36" rx="10" fill="#2563EB" />
          <path
            d="M14 12H22C24.2091 12 26 13.7909 26 16C26 18.2091 24.2091 20 22 20H18M18 20H14M18 20V28M14 28H22"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="28" cy="28" r="4" fill="#F59E0B" />
          <path d="M26 28L28 30L32 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <span className={`font-bold ${textSizes[size]}`}>
          <span className="text-blue-600">Build</span>
          <span className="text-gray-800">Link</span>
        </span>
        {showTagline && (
          <span className={`${taglineSizes[size]} text-gray-500 font-medium`}>
            Conecta con profesionales
          </span>
        )}
      </div>
    );
  }

  // Versión full (icon + text) - más elaborada
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icono */}
      <svg
        className={`${sizeClasses[size]} flex-shrink-0`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="36" height="36" rx="10" fill="#2563EB" />
        <path
          d="M14 12H22C24.2091 12 26 13.7909 26 16C26 18.2091 24.2091 20 22 20H18M18 20H14M18 20V28M14 28H22"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="28" cy="28" r="4" fill="#F59E0B" />
        <path d="M26 28L28 30L32 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Detalle decorativo */}
        <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.2)" />
        <circle cx="30" cy="8" r="1.5" fill="rgba(255,255,255,0.15)" />
      </svg>

      {/* Texto */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} leading-tight`}>
          <span className="text-blue-600">Build</span>
          <span className="text-gray-800">Link</span>
        </span>
        {showTagline && (
          <span className={`${taglineSizes[size]} text-gray-300 font-medium leading-tight`}>
            Conecta con profesionales
          </span>
        )}
      </div>
    </div>
  );
};

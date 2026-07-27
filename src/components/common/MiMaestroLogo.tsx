'use client';

interface MiMaestroLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
}

export const MiMaestroLogo = ({
  className = '',
  variant = 'full',
  size = 'md',
  showTagline = false,
}: MiMaestroLogoProps) => {
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
          {/* Icono de "MiMaestro" - Un sombrero de maestro con herramientas */}
          <rect x="2" y="2" width="36" height="36" rx="10" fill="#2563EB" />

          {/* Sombrero de maestro */}
          <path
            d="M12 16L20 12L28 16L20 20L12 16Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.1)"
          />
          <rect x="16" y="16" width="8" height="10" rx="1" stroke="white" strokeWidth="2" />

          {/* Martillo y llave cruzados */}
          <path d="M22 26L18 30M18 26L22 30" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Estrella de calidad */}
          <circle cx="20" cy="20" r="3" fill="#F59E0B" />
          <path
            d="M20 18L20.5 19.5L22 20L20.5 20.5L20 22L19.5 20.5L18 20L19.5 19.5L20 18Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <span className={`font-bold ${textSizes[size]}`}>
          <span className="text-blue-600">Mi</span>
          <span className="text-gray-800 dark:text-white">Maestro</span>
        </span>
        {showTagline && (
          <span className={`${taglineSizes[size]} text-gray-500 font-medium`}>
            Tu maestro de confianza
          </span>
        )}
      </div>
    );
  }

  // Versión full (icon + text)
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
          d="M12 16L20 12L28 16L20 20L12 16Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.1)"
        />
        <rect x="16" y="16" width="8" height="10" rx="1" stroke="white" strokeWidth="2" />
        <path d="M22 26L18 30M18 26L22 30" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="#F59E0B" />
        <path
          d="M20 18L20.5 19.5L22 20L20.5 20.5L20 22L19.5 20.5L18 20L19.5 19.5L20 18Z"
          fill="white"
        />
      </svg>

      {/* Texto */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} leading-tight`}>
          <span className="text-blue-600">Mi</span>
          <span className="text-gray-800 dark:text-white">Maestro</span>
        </span>
        {showTagline && (
          <span className={`${taglineSizes[size]} text-gray-500 font-medium leading-tight`}>
            Tu maestro de confianza
          </span>
        )}
      </div>
    </div>
  );
};

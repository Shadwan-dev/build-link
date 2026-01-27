// components/tenant/ClientProvider.tsx
'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { clientConfig } from '@/src/config/client-config';
import { getConfigHelpers } from '@/src/config/client-config';

// Crear tipo basado en la configuración del cliente
export type ClientConfig = typeof clientConfig;

const ClientContext = createContext<ClientConfig | null>(null);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient debe usarse dentro de ClientProvider');
  }
  return context;
};

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  // Obtener helpers para acceder a datos de manera segura
  const helpers = getConfigHelpers();

  // Función segura para obtener colores
  const getSafeColors = () => {
    // Si existe la nueva estructura de branding
    if (clientConfig.branding?.colors) {
      return {
        primary: clientConfig.branding.colors.primary?.main || '#1a56db',
        secondary: clientConfig.branding.colors.secondary?.main || '#0e4c8a',
        accent: clientConfig.branding.colors.accent?.main || '#059669',
        dark: clientConfig.branding.colors.neutral?.dark || '#1f2937',
        light: clientConfig.branding.colors.neutral?.light || '#f8fafc',
      };
    }

    // Si existe la estructura antigua de colors
    if (clientConfig.colors) {
      return {
        primary:
          typeof clientConfig.colors === 'object'
            ? clientConfig.colors.primary
            : '#1a56db',
        secondary:
          typeof clientConfig.colors === 'object'
            ? clientConfig.colors.secondary
            : '#0e4c8a',
        accent:
          typeof clientConfig.colors === 'object'
            ? clientConfig.colors.accent
            : '#059669',
        dark:
          typeof clientConfig.colors === 'object'
            ? clientConfig.colors.dark
            : '#1f2937',
        light:
          typeof clientConfig.colors === 'object'
            ? clientConfig.colors.light
            : '#f8fafc',
      };
    }

    // Valores por defecto AKΠ
    return {
      primary: '#1a56db',
      secondary: '#0e4c8a',
      accent: '#059669',
      dark: '#1f2937',
      light: '#f8fafc',
    };
  };

  // Aplicar colores corporativos como variables CSS
  useEffect(() => {
    const colors = getSafeColors();

    // Colores corporativos AKΠ S.R.L.
    document.documentElement.style.setProperty(
      '--color-primary',
      colors.primary
    );
    document.documentElement.style.setProperty(
      '--color-secondary',
      colors.secondary
    );
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    document.documentElement.style.setProperty('--color-dark', colors.dark);
    document.documentElement.style.setProperty('--color-light', colors.light);

    // Agregar clase CSS
    document.documentElement.classList.add('akpi-client', 'client-loaded');

    // Cambiar título de la página
    document.title = `${clientConfig.company.name} - ${clientConfig.company.slogan}`;

    // Agregar meta description si no existe
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = clientConfig.company.description;
      document.head.appendChild(meta);
    }

    // Agregar favicon dinámico
    const updateFavicon = () => {
      let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }

      // Intentar usar el logo primario, fallback a genérico
      const logoUrl =
        clientConfig.company.logo?.primary ||
        clientConfig.company.logo?.favicon ||
        '/akpi-logo.png';

      favicon.href = logoUrl;
      favicon.type = logoUrl.endsWith('.png')
        ? 'image/png'
        : logoUrl.endsWith('.ico')
          ? 'image/x-icon'
          : 'image/svg+xml';
    };

    updateFavicon();

    return () => {
      document.documentElement.classList.remove('client-loaded');
    };
  }, []);

  return (
    <ClientContext.Provider value={clientConfig}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;

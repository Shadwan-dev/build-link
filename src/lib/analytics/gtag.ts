// ✅ Google Analytics - con tipos oficiales de @types/gtag.js
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// ✅ Función segura para verificar gtag
const isGtagAvailable = (): boolean => {
  // ✅ Asegurar que todas las condiciones devuelvan boolean
  const isWindowAvailable = typeof window !== 'undefined';
  const hasMeasurementId = GA_MEASUREMENT_ID !== '' && GA_MEASUREMENT_ID !== undefined;
  const hasGtag = isWindowAvailable && typeof window.gtag === 'function';

  return isWindowAvailable && hasMeasurementId && hasGtag;
};

// ✅ Eventos de página
export const pageview = (url: string) => {
  if (isGtagAvailable()) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// ✅ Eventos personalizados
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: Gtag.EventNames | string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (isGtagAvailable()) {
    window.gtag('event', action as string, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// ✅ Eventos específicos de MiMaestro
export const trackEvent = {
  // Usuarios
  userRegister: (method: 'email' | 'google') => {
    event({ action: 'register', category: 'user', label: method });
  },
  userLogin: (method: 'email' | 'google') => {
    event({ action: 'login', category: 'user', label: method });
  },

  // Solicitudes
  requestCreated: (category: string) => {
    event({ action: 'request_created', category: 'request', label: category });
  },
  requestAccepted: (category: string) => {
    event({ action: 'request_accepted', category: 'request', label: category });
  },
  requestCompleted: (category: string) => {
    event({ action: 'request_completed', category: 'request', label: category });
  },

  // Proveedores
  providerView: (providerId: string) => {
    event({ action: 'provider_view', category: 'provider', label: providerId });
  },
  providerContact: (providerId: string) => {
    event({ action: 'provider_contact', category: 'provider', label: providerId });
  },

  // Dashboard
  dashboardVisit: (role: 'client' | 'provider') => {
    event({ action: 'dashboard_visit', category: 'dashboard', label: role });
  },
};

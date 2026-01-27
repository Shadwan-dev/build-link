import type { Tenant } from '@/types';

// Datos de ejemplo para diferentes tenants
const tenantDatabase: Record<string, Tenant> = {
  default: {
    id: 'default',
    name: 'Mi Empresa Digital',
    slogan: 'Soluciones tecnológicas innovadoras',
    description:
      'Especialistas en desarrollo web, aplicaciones móviles y marketing digital.',
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#7c3aed',
      darkColor: '#1e293b',
      lightColor: '#f8fafc',
    },
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@miempresa.com',
      address: 'Av. Principal 123, Ciudad',
      social: {
        facebook: 'https://facebook.com/miempresa',
        twitter: 'https://twitter.com/miempresa',
        linkedin: 'https://linkedin.com/company/miempresa',
        instagram: 'https://instagram.com/miempresa',
      },
    },
    features: ['web', 'mobile', 'design', 'marketing', 'consulting'],
    settings: {
      language: 'es',
      currency: 'USD',
      timezone: 'America/New_York',
    },
  },
  'empresa-1': {
    id: 'empresa-1',
    name: 'Tech Solutions Corp',
    slogan: 'Innovación tecnológica para empresas',
    description: 'Soluciones empresariales de software y consultoría IT.',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#7c3aed',
      darkColor: '#1e293b',
      lightColor: '#f0fdf4',
    },
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'contacto@techsolutions.com',
      address: 'Tech Park, Innovation Street 456',
      social: {
        facebook: 'https://facebook.com/techsolutions',
        twitter: 'https://twitter.com/techsolutions',
        linkedin: 'https://linkedin.com/company/techsolutions',
        instagram: 'https://instagram.com/techsolutions',
      },
    },
    features: ['enterprise', 'cloud', 'security', 'consulting'],
    settings: {
      language: 'es',
      currency: 'USD',
      timezone: 'America/Chicago',
    },
  },
  'empresa-2': {
    id: 'empresa-2',
    name: 'Creative Agency Studio',
    slogan: 'Diseño y creatividad digital',
    description: 'Agencia especializada en diseño UI/UX y branding digital.',
    theme: {
      primaryColor: '#7c3aed',
      secondaryColor: '#5b21b6',
      accentColor: '#ec4899',
      darkColor: '#1e293b',
      lightColor: '#faf5ff',
    },
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'hello@creativestudio.com',
      address: 'Design District, Creative Ave 789',
      social: {
        facebook: 'https://facebook.com/creativestudio',
        twitter: 'https://twitter.com/creativestudio',
        linkedin: 'https://linkedin.com/company/creativestudio',
        instagram: 'https://instagram.com/creativestudio',
      },
    },
    features: ['design', 'branding', 'marketing', 'web'],
    settings: {
      language: 'en',
      currency: 'EUR',
      timezone: 'Europe/Madrid',
    },
  },
};

// Simular API call para obtener datos del tenant
export const fetchTenantData = async (tenantId: string): Promise<Tenant> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  const tenant = tenantDatabase[tenantId];

  if (!tenant) {
    throw new Error(`Tenant ${tenantId} no encontrado`);
  }

  return tenant;
};

// Obtener configuración del tenant
export const getTenantConfig = (tenantId: string): Tenant => {
  const tenant = tenantDatabase[tenantId];
  if (!tenant) {
    console.warn(`Tenant ${tenantId} no encontrado, usando default`);
    return tenantDatabase.default;
  }
  return tenant;
};

// Obtener todos los tenants disponibles
export const getAllTenants = (): Tenant[] => {
  return Object.values(tenantDatabase);
};

// Verificar si tenant tiene una feature específica
export const tenantHasFeature = (tenant: Tenant, feature: string): boolean => {
  return tenant.features.includes(feature);
};

// Verificar si tenant tiene acceso a un servicio
export const hasFeature = (tenant: Tenant | null, feature: string): boolean => {
  if (!tenant) return false;
  return tenantHasFeature(tenant, feature);
};

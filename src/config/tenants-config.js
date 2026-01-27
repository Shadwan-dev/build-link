export const tenantsConfig = {
  'empresa-1': {
    id: 'empresa-1',
    name: 'Empresa Uno',
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
      logo: '/logos/empresa1.png',
    },
    features: ['dashboard', 'chat', 'analytics'],
    settings: {
      language: 'es',
      currency: 'USD',
    },
  },
  'empresa-2': {
    id: 'empresa-2',
    name: 'Empresa Dos',
    theme: {
      primaryColor: '#10b981',
      secondaryColor: '#047857',
      logo: '/logos/empresa2.png',
    },
    features: ['dashboard', 'ecommerce'],
    settings: {
      language: 'en',
      currency: 'EUR',
    },
  },
  default: {
    id: 'default',
    name: 'Mi Aplicación',
    theme: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#7c3aed',
      logo: '/logos/default.png',
    },
    features: ['dashboard'],
    settings: {
      language: 'es',
      currency: 'USD',
    },
  },
};

export const getTenantConfig = (tenantId) => {
  return tenantsConfig[tenantId] || tenantsConfig.default;
};

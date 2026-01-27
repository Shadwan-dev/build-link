// Detectar tenant basado en el dominio/subdominio
export const getTenantFromDomain = (hostname: string): string => {
  // Mapeo de dominios personalizados
  const customDomains: Record<string, string> = {
    'miempresa.com': 'empresa-1',
    'cliente.misitio.com': 'cliente-premium',
    'otraempresa.com': 'empresa-2',
  };

  // Para desarrollo local
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // Puedes probar diferentes tenants agregando ?tenant=nombre
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tenant') || 'default';
  }

  // Verificar dominio personalizado exacto
  if (customDomains[hostname]) {
    return customDomains[hostname];
  }

  // Verificar subdominios (cliente.tudominio.com)
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const subdomain = parts[0];
    // Ignorar 'www'
    if (subdomain !== 'www') {
      return subdomain;
    }
  }

  // Dominio principal
  return 'default';
};

// Obtener tenant actual
export const getCurrentTenant = (): string => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return getTenantFromDomain(hostname);
  }
  return 'default';
};

// Verificar si es un tenant válido
export const isValidTenant = (tenantId: string): boolean => {
  const validTenants = ['default', 'empresa-1', 'empresa-2', 'cliente-premium'];
  return validTenants.includes(tenantId);
};

// Obtener URL para un tenant específico
export const getTenantUrl = (tenantId: string, path: string = ''): string => {
  const baseUrl = window.location.origin;

  if (tenantId === 'default') {
    return `${baseUrl}${path}`;
  }

  return `${baseUrl}/${tenantId}${path}`;
};

import { Tenant } from './index';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Agregar atributos personalizados si es necesario
    'data-tenant'?: string;
  }
}

// Extender Window object si es necesario
declare global {
  interface Window {
    // Agregar propiedades globales si es necesario
    __TENANT_CONFIG__?: Tenant;
  }
}

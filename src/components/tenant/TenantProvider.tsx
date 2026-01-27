import React, { createContext, useContext, ReactNode } from 'react';
import { clientConfig } from '@/config/client-config';

// Crear tipo basado en la configuración del cliente
type CompanyConfig = typeof clientConfig;

const ClientContext = createContext<CompanyConfig | null>(null);

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
  // Aplicar colores corporativos como variables CSS
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--color-primary',
      clientConfig.colors.primary
    );
    document.documentElement.style.setProperty(
      '--color-secondary',
      clientConfig.colors.secondary
    );
    document.documentElement.style.setProperty(
      '--color-accent',
      clientConfig.colors.accent
    );
    document.documentElement.style.setProperty(
      '--color-dark',
      clientConfig.colors.dark
    );
    document.documentElement.style.setProperty(
      '--color-light',
      clientConfig.colors.light
    );

    // Cambiar título de la página
    document.title = `${clientConfig.company.name} - ${clientConfig.company.slogan}`;
  }, []);

  return (
    <ClientContext.Provider value={clientConfig}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;

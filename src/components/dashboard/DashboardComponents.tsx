import { log } from '@/lib/utils/logger';
import dynamic from 'next/dynamic';

// ✅ Carga perezosa de componentes pesados
export const ClientDashboard = dynamic(
  () => import('./client/ClientDashboard').then((mod) => mod.ClientDashboard),
  {
    loading: () => <div className="p-8 text-center animate-pulse">Cargando dashboard...</div>,
    ssr: false,
  }
);

export const ProviderDashboard = dynamic(
  () => import('./providers/ProviderDashboard').then((mod) => mod.ProviderDashboard),
  {
    loading: () => <div className="p-8 text-center animate-pulse">Cargando dashboard...</div>,
    ssr: false,
  }
);

export const RequestForm = dynamic(
  () => import('./requests/RequestForm').then((mod) => mod.RequestForm),
  {
    loading: () => <div className="p-4 text-center animate-pulse">Cargando formulario...</div>,
    ssr: false,
  }
);

export const MessageFormModal = dynamic(
  () => import('./client/MessageFormModal').then((mod) => mod.MessageFormModal),
  {
    loading: () => <div className="p-4 text-center animate-pulse">Cargando mensajes...</div>,
    ssr: false,
  }
);

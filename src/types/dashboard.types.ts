import { LucideIcon } from 'lucide-react';

// ✅ Definición única de Activity
export interface Activity {
  id: string | number;
  type: 'solicitud' | 'mensaje' | 'completado' | 'nuevo' | 'respuesta' | 'oferta';
  title: string;
  description: string;
  time: string;
  status: 'pendiente' | 'leído' | 'completado' | 'nuevo';
  icon: LucideIcon | null;
  link?: string;
}

export interface Stats {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  color: string;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  role?: 'client' | 'provider' | 'all';
}

export interface Category {
  name: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  totalReviews: number;
  photoURL?: string;
  location?: string;
  availability?: 'disponible' | 'ocupado' | 'no-disponible';
}

export interface Testimonial {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Request {
  id: string;
  title: string;
  category: string;
  clientName: string;
  clientId: string;
  budget?: number;
  location?: string;
  urgency?: 'normal' | 'urgente' | 'muy-urgente';
  status: 'pendiente' | 'en-progreso' | 'completado' | 'rechazado';
  createdAt: string;
  description?: string;
}

// ✅ Exportar todo
export type { LucideIcon };

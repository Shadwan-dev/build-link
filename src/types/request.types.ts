import { Timestamp } from 'firebase/firestore';
import { Category, Specialty } from './category.types';

export type RequestStatus = 'pendiente' | 'aceptado' | 'rechazado' | 'en-progreso' | 'completado';
export type UrgencyLevel = 'normal' | 'urgente' | 'muy-urgente';

// ============================================
// TESTIMONIO DATA - ESTRUCTURA COMPLETA
// ============================================
export interface TestimonioData {
  rating: number; // 1-5 estrellas
  comment: string;
  categories: {
    calidad: number; // 1-5
    puntualidad: number; // 1-5
    comunicacion: number; // 1-5
    precio: number; // 1-5
  };
  createdAt: Date | Timestamp;
}

// ============================================
// ESTADOS DE LA SOLICITUD (HELPERS)
// ============================================
export const REQUEST_STATUS = {
  PENDIENTE: 'pendiente',
  ACEPTADO: 'aceptado',
  RECHAZADO: 'rechazado',
  EN_PROGRESO: 'en-progreso',
  COMPLETADO: 'completado',
} as const;

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  pendiente: 'Pendiente',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
  'en-progreso': 'En progreso',
  completado: 'Completado',
};

export const REQUEST_STATUS_COLORS: Record<RequestStatus, string> = {
  pendiente: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  aceptado: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  rechazado: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  'en-progreso': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  completado: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
};

export const REQUEST_STATUS_ICONS: Record<RequestStatus, string> = {
  pendiente: '⏳',
  aceptado: '✅',
  rechazado: '❌',
  'en-progreso': '🔄',
  completado: '🎉',
};

// ============================================
// INTERFAZ PRINCIPAL: REQUEST
// ============================================
export interface Request {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;

  // ✅ Campos de categoría mejorados
  categoryId: string;
  categoryName: string;
  specialtyId?: string;
  specialtyName?: string;

  description: string;
  status: RequestStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  budget?: number;
  location?: string;
  urgency?: UrgencyLevel;
  response?: string;
  whatsappContact?: string;
  estimatedTime?: string;
  images?: string[];

  clientEmail?: string;
  clientPhone?: string;
  providerEmail?: string;
  providerPhone?: string;

  // ✅ Testimonio - OBJETO COMPLETO
  testimonio?: TestimonioData;

  providerSpecialty?: string;
  providerLocation?: string;

  // ✅ Campos adicionales para tracking
  providerResponse?: {
    message: string;
    date: Timestamp;
    estimatedStartDate?: Timestamp;
    estimatedCompletionDate?: Timestamp;
  };

  clientFeedback?: {
    rating: number;
    comment: string;
    date: Timestamp;
  };
}

// ============================================
// 📝 DATOS PARA CREAR UNA SOLICITUD (INPUT)
// ============================================
export interface CreateRequestInput {
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  providerId: string;
  providerName: string;
  categoryId: string;
  categoryName: string;
  specialtyId?: string;
  specialtyName?: string;
  description: string;
  budget?: number;
  location?: string;
  urgency?: UrgencyLevel;
  timeline?: string;
  estimatedTime?: string;
  images?: string[];
  providerSpecialty?: string;
  providerLocation?: string;
  regionId?: string;
  provinceId?: string;
}

// ============================================
// 📝 DATOS DEL FORMULARIO (UI)
// ============================================
export interface RequestFormData {
  categoryId: string;
  categoryName: string;
  description: string;
  budget: string;
  location: string;
  urgency: UrgencyLevel;
  timeline: string;
  estimatedTime: string;
  specialtyId?: string;
  specialtyName?: string;
}

// ============================================
// 📊 SOLICITUD CON CATEGORÍAS COMPLETAS
// ============================================
export interface RequestWithCategories extends Request {
  category: Category;
  specialty?: Specialty;
}

// ============================================
// 🔍 FILTROS DE SOLICITUD
// ============================================
export interface RequestFilterOptions {
  status?: RequestStatus;
  categoryId?: string;
  specialtyId?: string;
  urgency?: UrgencyLevel;
  search?: string;
  limit?: number;
  startAfter?: any;
  dateFrom?: Date;
  dateTo?: Date;
  minBudget?: number;
  maxBudget?: number;
  regionId?: string;
  provinceId?: string;
}

// ============================================
// 📈 ESTADÍSTICAS DE SOLICITUDES
// ============================================
export interface RequestStats {
  total: number;
  pendiente: number;
  aceptado: number;
  rechazado: number;
  'en-progreso': number;
  completado: number;
  byCategory: {
    categoryId: string;
    categoryName: string;
    count: number;
  }[];
  byUrgency: {
    normal: number;
    urgente: number;
    'muy-urgente': number;
  };
  averageResponseTime: number;
  averageCompletionTime: number;
}

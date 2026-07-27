import { Timestamp } from 'firebase/firestore';
import { Category, Specialty } from './category.types';

export type RequestStatus = 'pendiente' | 'aceptado' | 'rechazado' | 'en-progreso' | 'completado';
export type UrgencyLevel = 'normal' | 'urgente' | 'muy-urgente';

// ✅ Mantén tu Request exactamente como está
export interface Request {
  id: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;

  // ✅ Campos de categoría mejorados
  categoryId: string; // ID de la categoría principal
  categoryName: string; // Nombre de la categoría (para display rápido)
  specialtyId?: string; // ID de la especialidad (opcional)
  specialtyName?: string; // Nombre de la especialidad

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

  providerSpecialty?: string; // ✅ Especialidad buscada
  providerLocation?: string; // ✅ Ubicación buscada

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

// ✅ SOLO AÑADE estas interfaces adicionales (no elimines nada)

// ============================================
// 📝 DATOS PARA CREAR UNA SOLICITUD (INPUT)
// ============================================
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
  // ✅ Campos para filtros de proveedores
  providerSpecialty?: string;
  providerLocation?: string;
  // ✅ NUEVOS CAMPOS DE UBICACIÓN
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
  category: Category; // Datos completos de la categoría
  specialty?: Specialty; // Datos completos de la especialidad
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
  averageResponseTime: number; // Horas
  averageCompletionTime: number; // Días
}

// ✅ Asegurar que esta interfaz existe
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
}

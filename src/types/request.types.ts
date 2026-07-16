export type RequestStatus = 'pendiente' | 'en-progreso' | 'completado' | 'rechazado' | 'aceptado';
export type RequestUrgency = 'normal' | 'urgente' | 'muy-urgente';
export type RequestCategory =
  | 'Construcción'
  | 'Albañilería'
  | 'Carpintería'
  | 'Techos'
  | 'Jardinería'
  | 'Plomería'
  | 'Electricidad'
  | 'Pintura';

export interface Request {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  providerId: string;
  providerName: string;
  category: RequestCategory;
  description: string;
  budget?: number;
  timeline?: string;
  urgency: RequestUrgency;
  status: RequestStatus;
  response?: string;
  whatsappContact?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Renombrar a RequestFilterOptions para evitar conflicto
export interface RequestFilterOptions {
  status?: RequestStatus;
  category?: RequestCategory;
  urgency?: RequestUrgency;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

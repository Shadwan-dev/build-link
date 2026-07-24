import { Timestamp } from 'firebase/firestore';

export type ReviewStatus = 'pendiente' | 'publicado' | 'reportado' | 'eliminado';

export interface Review {
  id: string;
  requestId: string; // ID de la solicitud
  providerId: string; // ID del proveedor
  clientId: string; // ID del cliente
  clientName: string; // Nombre del cliente
  providerName: string; // Nombre del proveedor

  rating: number; // 1-5 estrellas
  comment: string; // Texto del testimonio
  categories: {
    calidad: number; // 1-5
    puntualidad: number; // 1-5
    comunicacion: number; // 1-5
    precio: number; // 1-5
  };

  status: ReviewStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Respuesta del proveedor
  providerResponse?: {
    comment: string;
    date: Timestamp;
  };

  // Para moderación
  reportedBy?: string[];
  moderationNotes?: string;

  // Verificación
  verified: boolean; // Si la solicitud fue completada
  isPublic: boolean; // Visible en el perfil
}

export interface ReviewStats {
  averageRating: number; // Promedio general
  totalReviews: number; // Total de reseñas
  distribution: {
    // Distribución de estrellas
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  averageCategories: {
    calidad: number;
    puntualidad: number;
    comunicacion: number;
    precio: number;
  };
  recentReviews: Review[];
}

export interface CreateReviewInput {
  requestId: string;
  providerId: string;
  clientId: string;
  clientName: string;
  providerName: string;
  rating: number;
  comment: string;
  categories: {
    calidad: number;
    puntualidad: number;
    comunicacion: number;
    precio: number;
  };
}

export interface ReviewFilterOptions {
  providerId?: string;
  clientId?: string;
  requestId?: string;
  rating?: number;
  status?: ReviewStatus;
  verified?: boolean;
  limit?: number;
  startAfter?: any;
}

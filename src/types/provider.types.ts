// types/provider.types.ts

import { Timestamp } from 'firebase/firestore';

export interface Provider {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  totalRatings: number;
  location: string;
  latitude?: number;
  longitude?: number;
  serviceRadius?: number;
  experience: number;
  isActive: boolean;
  isVerified: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date | Timestamp;
  verificationNotes?: string;
  photoURL: string;
  description: string;
  // ✅ NUEVO: Testimonios del proveedor (opcional)
  testimonios?: {
    id: string;
    clientName: string;
    clientId: string;
    rating: number;
    comment: string;
    categories: {
      calidad: number;
      puntualidad: number;
      comunicacion: number;
      precio: number;
    };
    createdAt: Timestamp;
    portfolioItemId?: string;
  }[];
  // ✅ NUEVO: Campos de ubicación
  regionId?: string;
  provinceId?: string;
  availability: {
    monday?: { start: string; end: string }[];
    tuesday?: { start: string; end: string }[];
    wednesday?: { start: string; end: string }[];
    thursday?: { start: string; end: string }[];
    friday?: { start: string; end: string }[];
    saturday?: { start: string; end: string }[];
    sunday?: { start: string; end: string }[];
  };
  createdAt: any;
  updatedAt: any;
}

export interface ProviderFilters {
  category?: string;
  location?: string;
  minRating?: number;
  maxRating?: number;
  search?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  limit?: number;
  startAfter?: any;
}

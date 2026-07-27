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
  latitude?: number; // ✅ Para geolocalización
  longitude?: number; // ✅ Para geolocalización
  serviceRadius?: number; // ✅ Radio de servicio en km
  experience: number;
  isActive: boolean;
  isVerified: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date | Timestamp;
  verificationNotes?: string;
  photoURL: string;
  description: string;
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
  radius?: number; // ✅ Filtro por radio de distancia
  limit?: number;
  startAfter?: any;
}

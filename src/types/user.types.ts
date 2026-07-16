export type UserRole = 'client' | 'provider' | 'admin';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
  emailVerified: boolean;
  photoURL?: string;
}

export interface Provider extends AppUser {
  specialties: string[];
  identification: string;
  rating: number;
  totalRatings: number;
  experience?: number;
  location?: string;
  isActive: boolean;
}

export interface ProviderVerification {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  identification: string; // NIF/CIF/DNI
  legalName: string; // Razón social (opcional)
  address: string; // Dirección fiscal
  specialties: string[];
  experience: number;
  description: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date;
  verificationNotes?: string;
  documents?: string[]; // URLs de documentos
  createdAt: Date;
  updatedAt: Date;
}

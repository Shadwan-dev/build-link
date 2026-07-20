export interface ProfileData {
  displayName: string;
  phone: string;
  photoURL: string;
  location: string;
  specialties: string[];
  experience: number;
  description: string;
  identification: string;
  legalName: string;
  address: string;
  // ✅ Añadir estos campos
  country: string;
  identificationValid: boolean;
  verificationStatus?: 'not_requested' | 'pending' | 'approved' | 'rejected';
  verificationNotes?: string;
}

export interface VerificationRequest {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  identification: string;
  identificationValid: boolean;
  country: string;
  legalName: string;
  address: string;
  specialties: string[];
  experience: number;
  description: string;
  photoURL: string;
  location: string;
}

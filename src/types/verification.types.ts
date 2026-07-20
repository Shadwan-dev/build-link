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
  // ✅ Campos adicionales para el proceso
  submittedAt?: Date;
  status?: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface VerificationStatus {
  verificationStatus: 'not_requested' | 'pending' | 'approved' | 'rejected';
  verificationNotes?: string;
  verifiedAt?: Date;
  requestedAt?: Date;
}

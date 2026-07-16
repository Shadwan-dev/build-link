export type JobStatus = 'active' | 'inactive' | 'expired' | 'completed';
export type JobUrgency = 'normal' | 'urgent' | 'immediate';

export interface Job {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  category: string;
  description: string;
  budget?: number;
  location?: string;
  urgency: JobUrgency;
  images: string[];
  status: JobStatus;
  views: number;
  applications: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface JobApplication {
  id: string;
  jobId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
  budget?: number;
  timeline?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

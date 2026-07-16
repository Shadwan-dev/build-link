export interface MessageForm {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  providerId: string;
  providerName: string;
  category: string;
  description: string;
  budget?: number;
  timeline?: string;
  urgency: 'normal' | 'urgente' | 'muy-urgente';
  status: 'pendiente' | 'aceptado' | 'rechazado' | 'respondido';
  createdAt: Date;
  updatedAt: Date;
  response?: string;
  whatsappContact?: string;
}

export interface ProviderVerification {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  identification: string; // NIF/CIF/DNI
  legalName: string; // Razón social
  address: string;
  isVerified: boolean;
  verificationDate?: Date;
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'provider';
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  requestId: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

import { Timestamp } from 'firebase/firestore';

// ============================================
// 📸 ITEM DEL PORTAFOLIO
// ============================================
// types/portfolio.types.ts

export interface PortfolioItem {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  coverImage?: string;
  location?: string;
  clientName?: string;
  clientFeedback?: string;
  year?: number;
  tags?: string[];
  isPublished: boolean;
  views: number;
  likes: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // ✅ NUEVO: Testimonio completo
  testimonio?: {
    rating: number;
    comment: string;
    categories: {
      calidad: number;
      puntualidad: number;
      comunicacion: number;
      precio: number;
    };
    clientName: string;
    clientId: string;
    createdAt: Timestamp;
  };
}

// ============================================
// 🔍 FILTROS DEL PORTAFOLIO
// ============================================
export interface PortfolioFilterOptions {
  category?: string; // Filtrar por categoría
  search?: string; // Buscar por título o descripción
  year?: number; // Filtrar por año
  sortBy?: 'createdAt' | 'views' | 'likes'; // Ordenar por
  limit?: number; // Límite de resultados
  startAfter?: any; // Para paginación
  providerId?: string; // Filtrar por proveedor
  isPublished?: boolean; // Filtrar por estado de publicación
}

// ============================================
// 📊 ESTADÍSTICAS DEL PORTAFOLIO
// ============================================
export interface PortfolioStats {
  totalItems: number; // Total de trabajos
  totalViews: number; // Total de vistas
  totalLikes: number; // Total de likes
  categories: {
    // Distribución por categoría
    name: string;
    count: number;
  }[];
  years: number[]; // Años disponibles
  mostViewed?: PortfolioItem; // Trabajo más visto
  mostLiked?: PortfolioItem; // Trabajo con más likes
}

// ============================================
// 📝 CREAR ITEM (INPUT)
// ============================================
export interface CreatePortfolioInput {
  providerId: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  coverImage?: string;
  location?: string;
  clientName?: string;
  clientFeedback?: string;
  year?: number;
  tags?: string[];
}

// ============================================
// 📝 ACTUALIZAR ITEM (INPUT)
// ============================================
export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  category?: string;
  images?: string[];
  coverImage?: string;
  location?: string;
  clientName?: string;
  clientFeedback?: string;
  year?: number;
  tags?: string[];
  isPublished?: boolean;
}

// ============================================
// 🏷️ CATEGORÍAS DISPONIBLES
// ============================================
export const PORTFOLIO_CATEGORIES = [
  'Construcción',
  'Carpintería',
  'Techos',
  'Jardinería',
  'Plomería',
  'Electricidad',
  'Pintura',
  'Diseño de interiores',
  'Arquitectura',
  'Remodelación',
  'Instalaciones',
  'Mantenimiento',
  'Otro',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

// ============================================
// 🏷️ TAGS COMUNES
// ============================================
export const PORTFOLIO_TAGS = [
  'Residencial',
  'Comercial',
  'Industrial',
  'Ecológico',
  'Moderno',
  'Clásico',
  'Rústico',
  'Minimalista',
  'Lujo',
  'Eficiente',
] as const;

export type PortfolioTag = (typeof PORTFOLIO_TAGS)[number];

// ============================================
// 📸 ITEM DEL PORTAFOLIO CON RELACIONES
// ============================================
export interface PortfolioItemWithRelations extends PortfolioItem {
  provider?: {
    displayName: string;
    photoURL: string;
    rating: number;
  };
  comments?: PortfolioComment[];
}

// ============================================
// 💬 COMENTARIOS DEL PORTAFOLIO
// ============================================
export interface PortfolioComment {
  id: string;
  portfolioItemId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================
// 📸 PORTAFOLIO COMPLETO DEL PROVEEDOR
// ============================================
export interface ProviderPortfolio {
  providerId: string;
  items: PortfolioItem[];
  stats: PortfolioStats;
}

// ============================================
// 🎨 CONSTANTES DE ESTADOS
// ============================================
export const PORTFOLIO_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

export type PortfolioStatus = (typeof PORTFOLIO_STATUS)[keyof typeof PORTFOLIO_STATUS];

import { Timestamp } from 'firebase/firestore';
import { LucideIcon } from 'lucide-react';

// ============================================
// CATEGORÍAS (Nivel 1)
// ============================================
export interface Category {
  id: string;
  name: string; // "Construcción"
  nameEn?: string; // "Construction"
  icon: string; // "building2" (nombre del ícono en Lucide)
  description: string; // "Servicios de construcción en general"
  color: string; // "#2563EB"
  parentId?: string; // Para subcategorías
  order: number; // Para ordenar en UI
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: CategoryMetadata;
  stats?: CategoryStats; // Estadísticas en tiempo real
}

// ============================================
// METADATA DE CATEGORÍA (SEO y extras)
// ============================================
export interface CategoryMetadata {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  imageUrl?: string;
  featured?: boolean;
  popular?: boolean;
}

// ============================================
// ESTADÍSTICAS DE CATEGORÍA
// ============================================
export interface CategoryStats {
  totalProviders: number;
  totalRequests: number;
  totalCompleted: number;
  averageRating: number;
  popularSpecialties: string[]; // IDs de especialidades populares
}

// ============================================
// ESPECIALIDADES (Nivel 2 - más específicas)
// ============================================
export interface Specialty {
  id: string;
  name: string; // "Construcción residencial"
  nameEn?: string; // "Residential Construction"
  categoryId: string; // ID de la categoría padre
  description: string; // "Especializado en construcción de viviendas"
  icon: string; // "home"
  color: string; // "#10B981"
  skills: string[]; // ["albañilería", "cimentación", "estructuras"]
  certifications?: string[]; // ["ISO 9001", "LEED"]
  experienceLevel?: 'entry' | 'intermediate' | 'expert' | 'master';
  averageRate?: number; // Tarifa promedio por hora
  isActive: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: SpecialtyMetadata;
}

// ============================================
// METADATA DE ESPECIALIDAD
// ============================================
export interface SpecialtyMetadata {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  requiredTools?: string[];
  typicalDuration?: string; // "2-3 días"
  certifications?: string[];
  portfolioExamples?: string[]; // URLs de imágenes
}

// ============================================
// SUBCATEGORÍAS (Nivel 3 - aún más específicas)
// ============================================
export interface SubSpecialty {
  id: string;
  name: string;
  nameEn?: string;
  specialtyId: string; // ID de la especialidad padre
  description: string;
  skills: string[];
  isActive: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: {
    typicalTools?: string[];
    averageTime?: string;
  };
}

// ============================================
// CATÁLOGO COMPLETO DE SERVICIOS
// ============================================
export interface ServiceCatalog {
  categories: Category[];
  specialties: Specialty[];
  subSpecialties: SubSpecialty[];
  lastUpdated: Timestamp;
  version: string;
  totalCategories: number;
  totalSpecialties: number;
}

// ============================================
// MODELO DE PROVEEDOR CON ESPECIALIDADES
// ============================================
export interface ProviderSpecialty {
  specialtyId: string;
  name: string;
  categoryId: string;
  categoryName: string;
  experience: number; // Años de experiencia
  rate?: number; // Tarifa por hora
  isVerified: boolean;
  certifications: string[];
  portfolioIds: string[]; // IDs de trabajos en portafolio
  availability?: 'available' | 'busy' | 'unavailable';
  schedule?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

// ============================================
// PROVEEDOR CON ESPECIALIDADES
// ============================================
export interface ProviderWithSpecialties {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  photoURL?: string;
  location: string;
  specialties: ProviderSpecialty[];
  categories: string[]; // IDs de categorías (para filtrado rápido)
  rating: number;
  totalRatings: number;
  isActive: boolean;
  verified: boolean; // ✅ Añadir esta propiedad
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // ✅ Propiedades adicionales opcionales
  responseTime?: string;
  completedJobs?: number;
}

// ============================================
// FILTROS PARA BÚSQUEDA
// ============================================
export interface CategoryFilters {
  search?: string;
  categoryId?: string;
  specialtyId?: string;
  location?: string;
  minRating?: number;
  maxRate?: number;
  availability?: 'available' | 'busy' | 'unavailable';
  sortBy?: 'rating' | 'relevance' | 'distance' | 'rate';
  limit?: number;
  offset?: number;
}

// ============================================
// TIPOS PARA LA UI
// ============================================
export interface CategoryWithIcon extends Category {
  iconComponent: LucideIcon; // Para renderizado en UI
  specialtyCount: number;
  providerCount: number;
}

export interface SpecialtyWithCategory extends Specialty {
  categoryName: string; // Nombre de la categoría padre
  categoryColor: string; // Color de la categoría padre
  providerCount: number;
}

import { Review } from '@/types/review.types';
import {
  collection,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

// ============================================
// TIPOS
// ============================================
export interface Provider {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  totalRatings: number;
  location: string;
  experience: number;
  isActive: boolean;
  isVerified: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date | Timestamp;
  verificationNotes?: string;
  photoURL: string;
  description: string;
  createdAt: any;
  updatedAt: any;
  // ✅ Nuevos campos para reviews
  responseTime?: string; // Tiempo promedio de respuesta
  completedJobs?: number; // Trabajos completados
  reviews?: Review[]; // Reseñas (opcional, para carga perezosa)
}

export interface ProviderFilters {
  category?: string;
  location?: string;
  minRating?: number;
  maxRating?: number;
  search?: string;
  limit?: number;
  startAfter?: DocumentSnapshot;
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
const getDb = (): Firestore => {
  if (!db) throw new Error('Firebase Firestore no está disponible.');
  return db;
};

// ============================================
// 1️⃣ OBTENER PROVEEDORES VERIFICADOS
// ============================================
export const getProviders = async (options?: {
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
}): Promise<{ providers: Provider[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const limitCount = options?.limitCount || 20;

    const constraints: QueryConstraint[] = [
      where('isVerified', '==', true),
      where('isActive', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount),
    ];

    if (options?.lastDoc) {
      constraints.push(startAfter(options.lastDoc));
    }

    const q = query(providersRef, ...constraints);
    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { providers, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error obteniendo proveedores verificados:', error);
    return { providers: [], lastDoc: null };
  }
};

// ============================================
// 2️⃣ OBTENER PROVEEDORES POR CATEGORÍA
// ============================================
export const getProvidersByCategory = async (
  category: string,
  options?: { limitCount?: number; lastDoc?: DocumentSnapshot }
): Promise<{ providers: Provider[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const limitCount = options?.limitCount || 20;

    const constraints: QueryConstraint[] = [
      where('specialties', 'array-contains', category),
      where('isVerified', '==', true),
      where('isActive', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount),
    ];

    if (options?.lastDoc) {
      constraints.push(startAfter(options.lastDoc));
    }

    const q = query(providersRef, ...constraints);
    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { providers, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error obteniendo proveedores por categoría:', error);
    return { providers: [], lastDoc: null };
  }
};

// ============================================
// 3️⃣ OBTENER PROVEEDOR POR UID
// ============================================
export const getProviderById = async (uid: string): Promise<Provider | null> => {
  try {
    const dbInstance = getDb();
    const providerRef = doc(dbInstance, 'providers', uid);
    const snapshot = await getDoc(providerRef);

    if (snapshot.exists()) {
      return { uid: snapshot.id, ...snapshot.data() } as Provider;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo proveedor:', error);
    return null;
  }
};

// ============================================
// 4️⃣ BUSCAR PROVEEDORES
// ============================================
export const searchProviders = async (
  searchTerm: string,
  options?: { limitCount?: number; lastDoc?: DocumentSnapshot }
): Promise<{ providers: Provider[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    // Primero obtener proveedores verificados
    const result = await getProviders(options);
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      return result;
    }

    const filtered = result.providers.filter(
      (provider) =>
        provider.displayName.toLowerCase().includes(term) ||
        provider.specialties.some((s) => s.toLowerCase().includes(term)) ||
        provider.location.toLowerCase().includes(term) ||
        provider.description?.toLowerCase().includes(term)
    );

    return { providers: filtered, lastDoc: result.lastDoc };
  } catch (error) {
    console.error('Error buscando proveedores:', error);
    return { providers: [], lastDoc: null };
  }
};

// ============================================
// 5️⃣ OBTENER PROVEEDORES DESTACADOS
// ============================================
export const getFeaturedProviders = async (limitCount: number = 3): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const q = query(
      providersRef,
      where('isVerified', '==', true),
      where('isActive', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    return providers;
  } catch (error) {
    console.error('Error obteniendo proveedores destacados:', error);
    return [];
  }
};

// ============================================
// 6️⃣ ACTUALIZAR PROVEEDOR
// ============================================
export const updateProvider = async (uid: string, data: Partial<Provider>): Promise<void> => {
  try {
    const dbInstance = getDb();
    const providerRef = doc(dbInstance, 'providers', uid);
    await updateDoc(providerRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error actualizando proveedor:', error);
    throw new Error('Error al actualizar proveedor');
  }
};

// ============================================
// 7️⃣ ACTUALIZAR RATING DEL PROVEEDOR (desde reviews)
// ============================================
export const updateProviderRating = async (providerId: string): Promise<void> => {
  try {
    const dbInstance = getDb();

    // ✅ Obtener todas las valoraciones del proveedor
    const reviewsQuery = query(
      collection(dbInstance, 'reviews'),
      where('providerId', '==', providerId),
      where('status', '==', 'publicado')
    );

    const snapshot = await getDocs(reviewsQuery);
    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Review);

    if (reviews.length === 0) {
      // ✅ Sin valoraciones, resetear rating
      await updateDoc(doc(dbInstance, 'providers', providerId), {
        rating: 0,
        totalRatings: 0,
        updatedAt: serverTimestamp(),
      });
      return;
    }

    // ✅ Calcular promedio
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    // ✅ Calcular trabajos completados (de reviews verificadas)
    const completedJobs = reviews.filter((r) => r.verified).length;

    // ✅ Actualizar proveedor
    await updateDoc(doc(dbInstance, 'providers', providerId), {
      rating: Number(averageRating.toFixed(1)),
      totalRatings: reviews.length,
      completedJobs: completedJobs,
      updatedAt: serverTimestamp(),
    });

    console.log(
      `✅ Rating actualizado para proveedor ${providerId}: ${averageRating.toFixed(1)} (${reviews.length} valoraciones)`
    );
  } catch (error) {
    console.error('❌ Error actualizando rating:', error);
    throw new Error('Error al actualizar el rating');
  }
};

// ============================================
// 8️⃣ OBTENER TODOS LOS PROVEEDORES (ADMIN)
// ============================================
export const getAllProviders = async (): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const q = query(providersRef, where('isActive', '==', true), orderBy('isVerified', 'desc'));

    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    return providers;
  } catch (error) {
    console.error('Error obteniendo todos los proveedores:', error);
    return [];
  }
};

// ============================================
// 9️⃣ OBTENER PROVEEDORES PENDIENTES DE VERIFICACIÓN (ADMIN)
// ============================================
export const getPendingProviders = async (): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const q = query(
      providersRef,
      where('isVerified', '==', false),
      where('verificationStatus', '==', 'pending')
    );

    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    return providers;
  } catch (error) {
    console.error('Error obteniendo proveedores pendientes:', error);
    return [];
  }
};

// ============================================
// 🔟 PROVEEDORES CON FILTROS AVANZADOS
// ============================================
export const getProvidersWithFilters = async (
  filters: ProviderFilters
): Promise<{ providers: Provider[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const limitCount = filters.limit || 20;

    const constraints: QueryConstraint[] = [
      where('isVerified', '==', true),
      where('isActive', '==', true),
    ];

    // ✅ Filtros opcionales
    if (filters.category) {
      constraints.push(where('specialties', 'array-contains', filters.category));
    }

    if (filters.minRating !== undefined) {
      constraints.push(where('rating', '>=', filters.minRating));
    }

    if (filters.maxRating !== undefined) {
      constraints.push(where('rating', '<=', filters.maxRating));
    }

    // ✅ Ordenar por rating y limit
    constraints.push(orderBy('rating', 'desc'));
    constraints.push(limit(limitCount));

    if (filters.startAfter) {
      constraints.push(startAfter(filters.startAfter));
    }

    const q = query(providersRef, ...constraints);
    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    // ✅ Filtrar por ubicación en memoria (si se especifica)
    let filteredProviders = providers;
    if (filters.location) {
      const location = filters.location.toLowerCase().trim();
      filteredProviders = providers.filter((p) => p.location.toLowerCase().includes(location));
    }

    // ✅ Filtrar por búsqueda en memoria
    if (filters.search) {
      const search = filters.search.toLowerCase().trim();
      filteredProviders = filteredProviders.filter(
        (provider) =>
          provider.displayName.toLowerCase().includes(search) ||
          provider.specialties.some((s) => s.toLowerCase().includes(search)) ||
          provider.location.toLowerCase().includes(search)
      );
    }

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { providers: filteredProviders, lastDoc: lastVisible };
  } catch (error) {
    console.error('Error obteniendo proveedores con filtros:', error);
    return { providers: [], lastDoc: null };
  }
};

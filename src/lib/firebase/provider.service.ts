// lib/firebase/provider.service.ts

import { log } from '@/lib/utils/logger';
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
  setDoc,
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
  // ✅ Campos para reviews
  responseTime?: string;
  completedJobs?: number;
  reviews?: Review[];
  // ✅ Campos para geolocalización
  latitude?: number;
  longitude?: number;
  serviceRadius?: number;
  // ✅ NUEVOS CAMPOS DE UBICACIÓN
  regionId?: string;
  provinceId?: string;
  // ✅ NUEVO: Testimonios del proveedor
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
  // ✅ Campos para disponibilidad
  availability?: {
    monday?: { start: string; end: string }[];
    tuesday?: { start: string; end: string }[];
    wednesday?: { start: string; end: string }[];
    thursday?: { start: string; end: string }[];
    friday?: { start: string; end: string }[];
    saturday?: { start: string; end: string }[];
    sunday?: { start: string; end: string }[];
  };
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
    log.error('Error obteniendo proveedores verificados:', error);
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
    log.error('Error obteniendo proveedores por categoría:', error);
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
    log.error('Error obteniendo proveedor:', error);
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
    log.error('Error buscando proveedores:', error);
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
    log.error('Error obteniendo proveedores destacados:', error);
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
    log.error('Error actualizando proveedor:', error);
    throw new Error('Error al actualizar proveedor');
  }
};

// ============================================
// 7️⃣ ACTUALIZAR RATING DEL PROVEEDOR (desde reviews)
// ============================================
export const updateProviderRating = async (providerId: string): Promise<void> => {
  try {
    const dbInstance = getDb();

    const reviewsQuery = query(
      collection(dbInstance, 'reviews'),
      where('providerId', '==', providerId),
      where('status', '==', 'publicado')
    );

    const snapshot = await getDocs(reviewsQuery);
    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Review);

    if (reviews.length === 0) {
      await updateDoc(doc(dbInstance, 'providers', providerId), {
        rating: 0,
        totalRatings: 0,
        updatedAt: serverTimestamp(),
      });
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const completedJobs = reviews.filter((r) => r.verified).length;

    await updateDoc(doc(dbInstance, 'providers', providerId), {
      rating: Number(averageRating.toFixed(1)),
      totalRatings: reviews.length,
      completedJobs: completedJobs,
      updatedAt: serverTimestamp(),
    });

    log.info(
      `✅ Rating actualizado para proveedor ${providerId}: ${averageRating.toFixed(1)} (${reviews.length} valoraciones)`
    );
  } catch (error) {
    log.error('❌ Error actualizando rating:', error);
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
    log.error('Error obteniendo todos los proveedores:', error);
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
    log.error('Error obteniendo proveedores pendientes:', error);
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

    if (filters.category) {
      constraints.push(where('specialties', 'array-contains', filters.category));
    }

    if (filters.minRating !== undefined) {
      constraints.push(where('rating', '>=', filters.minRating));
    }

    if (filters.maxRating !== undefined) {
      constraints.push(where('rating', '<=', filters.maxRating));
    }

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

    let filteredProviders = providers;
    if (filters.location) {
      const location = filters.location.toLowerCase().trim();
      filteredProviders = providers.filter((p) => p.location.toLowerCase().includes(location));
    }

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
    log.error('Error obteniendo proveedores con filtros:', error);
    return { providers: [], lastDoc: null };
  }
};

// ============================================
// 📍 BUSCAR PROVEEDORES POR UBICACIÓN
// ============================================
export const getProvidersByLocation = async (
  latitude: number,
  longitude: number,
  radius: number = 10,
  filters?: ProviderFilters
): Promise<Provider[]> => {
  try {
    const { providers } = await getProviders({ limitCount: 100 });

    const filtered = providers.filter((provider) => {
      if (!provider.latitude || !provider.longitude) {
        return false;
      }

      const distance = calculateDistance(
        latitude,
        longitude,
        provider.latitude,
        provider.longitude
      );

      const providerRadius = provider.serviceRadius || radius;
      return distance <= providerRadius;
    });

    let result = filtered;

    if (filters?.category) {
      result = result.filter((p) => p.specialties.some((s) => s === filters.category));
    }

    if (filters?.minRating) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.displayName.toLowerCase().includes(search) ||
          p.specialties.some((s) => s.toLowerCase().includes(search))
      );
    }

    return result;
  } catch (error) {
    log.error('Error obteniendo proveedores por ubicación:', error);
    return [];
  }
};

// ✅ Calcular distancia entre dos puntos (fórmula de Haversine)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ✅ Verificar disponibilidad del proveedor
export const checkProviderAvailability = (
  provider: Provider,
  date: Date,
  time: string
): boolean => {
  if (!provider.availability) {
    return true;
  }

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[date.getDay()];
  const availability = provider.availability[dayName as keyof typeof provider.availability];

  if (!availability || availability.length === 0) {
    return false;
  }

  return availability.some((slot) => {
    return time >= slot.start && time <= slot.end;
  });
};

// ✅ Filtrar proveedores por región
export const getProvidersByRegion = async (
  regionId: string,
  provinceId?: string
): Promise<Provider[]> => {
  try {
    const { providers } = await getProviders({ limitCount: 100 });

    return providers.filter((provider) => {
      if (provider.regionId !== regionId) return false;
      if (provinceId && provider.provinceId !== provinceId) return false;
      return true;
    });
  } catch (error) {
    log.error('Error obteniendo proveedores por región:', error);
    return [];
  }
};

// ============================================
// 🔍 BUSCAR PROVEEDORES POR ESPECIALIDAD Y UBICACIÓN
// ============================================
export const searchProvidersBySpecialtyAndLocation = async (
  specialty: string,
  regionId?: string,
  provinceId?: string
): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    let providers: Provider[] = [];

    const result = await getProviders({ limitCount: 100 });
    providers = result.providers;

    if (specialty) {
      const specialtyLower = specialty.toLowerCase();
      providers = providers.filter((p) =>
        p.specialties.some((s) => s.toLowerCase().includes(specialtyLower))
      );
    }

    if (regionId) {
      providers = providers.filter((p) => p.regionId === regionId);
    }

    if (provinceId) {
      providers = providers.filter((p) => p.provinceId === provinceId);
    }

    log.info(`🔍 Proveedores encontrados: ${providers.length}`);
    return providers;
  } catch (error) {
    log.error('Error buscando proveedores por especialidad y ubicación:', error);
    return [];
  }
};

// ============================================
// 📢 NOTIFICAR A PROVEEDORES FILTRADOS
// ============================================
export const notifyFilteredProviders = async (
  providers: Provider[],
  requestId: string,
  clientName: string,
  categoryName: string,
  description: string
): Promise<void> => {
  try {
    const { createNotification } = await import('./notification.service');

    const notifications = providers.map((provider) =>
      createNotification(
        provider.uid,
        `📩 Nueva solicitud de ${clientName}`,
        `${clientName} ha publicado una solicitud de "${categoryName}". ${description.slice(0, 60)}...`,
        'request',
        `/dashboard/requests/${requestId}`
      )
    );

    await Promise.all(notifications);
    log.info(`📢 Notificaciones enviadas a ${providers.length} proveedores`);
  } catch (error) {
    log.error('Error enviando notificaciones a proveedores:', error);
  }
};

// ============================================
// 📱 OBTENER CONTACTOS DE PROVEEDORES PARA WHATSAPP
// ============================================
export const getProviderContacts = async (
  providers: Provider[]
): Promise<{ phone: string; name: string }[]> => {
  return providers
    .filter((p) => p.phone && p.phone.length > 0)
    .map((p) => ({
      phone: p.phone,
      name: p.displayName,
    }));
};

// ============================================
// ✅ CREAR PORTAFOLIO DESDE TESTIMONIO (CORREGIDO)
// ============================================
export const createPortfolioFromTestimonio = async (
  providerId: string,
  testimonio: {
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
    requestId: string;
  },
  requestData: {
    categoryName: string;
    description: string;
    images: string[];
    location?: string;
  }
): Promise<string> => {
  try {
    const dbInstance = getDb();
    // ✅ Usar 'portfolio' directamente en lugar de COLLECTION_NAME
    const docRef = doc(collection(dbInstance, 'portfolio'));
    const now = serverTimestamp();

    const itemData = {
      providerId,
      title: `Trabajo realizado - ${requestData.categoryName}`,
      description: requestData.description,
      category: requestData.categoryName,
      images: requestData.images || [],
      coverImage: requestData.images?.[0] || '',
      location: requestData.location || '',
      clientName: testimonio.clientName,
      clientFeedback: testimonio.comment,
      testimonio: {
        rating: testimonio.rating,
        comment: testimonio.comment,
        categories: testimonio.categories,
        clientName: testimonio.clientName,
        clientId: testimonio.clientId,
        createdAt: now,
      },
      isPublished: true,
      views: 0,
      likes: 0,
      createdAt: now as Timestamp,
      updatedAt: now as Timestamp,
    };

    await setDoc(docRef, itemData);
    log.info('📸 Portafolio creado desde testimonio:', docRef.id);
    return docRef.id;
  } catch (error) {
    log.error('❌ Error creando portafolio desde testimonio:', error);
    throw new Error('Error al crear el portafolio');
  }
};

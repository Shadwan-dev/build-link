import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

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
  isVerified: boolean; // ✅ Nuevo campo
  verificationStatus?: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date;
  photoURL: string;
  description: string;
  createdAt: any;
  updatedAt: any;
}

const getDb = (): Firestore => {
  if (!db) {
    throw new Error('Firebase Firestore no está disponible.');
  }
  return db;
};

// ✅ Obtener proveedores VERIFICADOS (para clientes)
export const getProviders = async (): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const q = query(
      providersRef,
      where('isVerified', '==', true), // ✅ Solo verificados
      where('isActive', '==', true),
      orderBy('rating', 'desc')
    );

    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    return providers;
  } catch (error) {
    console.error('Error obteniendo proveedores verificados:', error);
    return [];
  }
};

// ✅ Obtener proveedores por categoría (solo verificados)
export const getProvidersByCategory = async (category: string): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const q = query(
      providersRef,
      where('specialties', 'array-contains', category),
      where('isVerified', '==', true), // ✅ Solo verificados
      where('isActive', '==', true),
      orderBy('rating', 'desc')
    );

    const snapshot = await getDocs(q);
    const providers: Provider[] = [];

    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as Provider);
    });

    return providers;
  } catch (error) {
    console.error('Error obteniendo proveedores por categoría:', error);
    return [];
  }
};

// ✅ Obtener un proveedor por UID (sin restricción de verificación)
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

// ✅ Buscar proveedores (solo verificados)
export const searchProviders = async (searchTerm: string): Promise<Provider[]> => {
  try {
    const allProviders = await getProviders(); // ✅ Solo verificados
    const term = searchTerm.toLowerCase().trim();

    return allProviders.filter(
      (provider) =>
        provider.displayName.toLowerCase().includes(term) ||
        provider.specialties.some((s) => s.toLowerCase().includes(term)) ||
        provider.location.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error('Error buscando proveedores:', error);
    return [];
  }
};

// ✅ Obtener proveedores destacados (top 3 verificados)
export const getFeaturedProviders = async (): Promise<Provider[]> => {
  try {
    const dbInstance = getDb();
    const providersRef = collection(dbInstance, 'providers');
    const q = query(
      providersRef,
      where('isVerified', '==', true), // ✅ Solo verificados
      where('isActive', '==', true),
      orderBy('rating', 'desc'),
      limit(3)
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

// ✅ Actualizar proveedor
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

// ✅ Obtener proveedores TODOS (solo para ADMIN)
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

// ✅ Obtener proveedores PENDIENTES de verificación (solo para ADMIN)
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

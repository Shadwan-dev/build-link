import { log } from '@/lib/utils/logger';
import {
  Category,
  ProviderSpecialty,
  ProviderWithSpecialties,
  ServiceCatalog,
  Specialty,
  SubSpecialty,
} from '@/types/category.types';
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit, // ✅ Añadir importación
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter, // ✅ Añadir importación
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

// ============================================
// FUNCIONES AUXILIARES
// ============================================
const getDb = () => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ============================================
// 1️⃣ CATEGORÍAS
// ============================================
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const dbInstance = getDb();
    const q = query(
      collection(dbInstance, 'categories'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    const categories: Category[] = [];
    snapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() } as Category);
    });
    return categories;
  } catch (error) {
    log.error('Error obteniendo categorías:', error);
    return [];
  }
};

export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'categories', categoryId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Category;
    }
    return null;
  } catch (error) {
    log.error('Error obteniendo categoría:', error);
    return null;
  }
};

// ============================================
// 2️⃣ ESPECIALIDADES
// ============================================
export const getAllSpecialties = async (): Promise<Specialty[]> => {
  try {
    const dbInstance = getDb();
    const q = query(
      collection(dbInstance, 'specialties'),
      where('isActive', '==', true),
      orderBy('categoryId', 'asc'),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    const specialties: Specialty[] = [];
    snapshot.forEach((doc) => {
      specialties.push({ id: doc.id, ...doc.data() } as Specialty);
    });
    return specialties;
  } catch (error) {
    log.error('Error obteniendo especialidades:', error);
    return [];
  }
};

export const getSpecialtiesByCategory = async (categoryId: string): Promise<Specialty[]> => {
  try {
    const dbInstance = getDb();
    const q = query(
      collection(dbInstance, 'specialties'),
      where('categoryId', '==', categoryId),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    const specialties: Specialty[] = [];
    snapshot.forEach((doc) => {
      specialties.push({ id: doc.id, ...doc.data() } as Specialty);
    });
    return specialties;
  } catch (error) {
    log.error('Error obteniendo especialidades por categoría:', error);
    return [];
  }
};

export const getSpecialtyById = async (specialtyId: string): Promise<Specialty | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'specialties', specialtyId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Specialty;
    }
    return null;
  } catch (error) {
    log.error('Error obteniendo especialidad:', error);
    return null;
  }
};

// ============================================
// 3️⃣ SUBCATEGORÍAS
// ============================================
export const getSubSpecialtiesBySpecialty = async (
  specialtyId: string
): Promise<SubSpecialty[]> => {
  try {
    const dbInstance = getDb();
    const q = query(
      collection(dbInstance, 'subSpecialties'),
      where('specialtyId', '==', specialtyId),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    const subSpecialties: SubSpecialty[] = [];
    snapshot.forEach((doc) => {
      subSpecialties.push({ id: doc.id, ...doc.data() } as SubSpecialty);
    });
    return subSpecialties;
  } catch (error) {
    log.error('Error obteniendo subespecialidades:', error);
    return [];
  }
};

// ============================================
// 4️⃣ CATÁLOGO COMPLETO (PARA CACHÉ)
// ============================================
export const getFullCatalog = async (): Promise<ServiceCatalog> => {
  try {
    const dbInstance = getDb();

    const [categories, specialties, subSpecialties] = await Promise.all([
      getAllCategories(),
      getAllSpecialties(),
      getSubSpecialtiesBySpecialty('all'),
    ]);

    return {
      categories,
      specialties,
      subSpecialties,
      lastUpdated: Timestamp.now(),
      version: '1.0.0',
      totalCategories: categories.length,
      totalSpecialties: specialties.length,
    };
  } catch (error) {
    log.error('Error obteniendo catálogo completo:', error);
    return {
      categories: [],
      specialties: [],
      subSpecialties: [],
      lastUpdated: Timestamp.now(),
      version: '1.0.0',
      totalCategories: 0,
      totalSpecialties: 0,
    };
  }
};

// ============================================
// 5️⃣ ADMIN: GESTIÓN DE CATÁLOGO
// ============================================
export const createCategory = async (
  data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(collection(dbInstance, 'categories'));
    const now = serverTimestamp();

    await setDoc(docRef, {
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    log.error('Error creando categoría:', error);
    throw new Error('Error al crear la categoría');
  }
};

export const updateCategory = async (
  categoryId: string,
  data: Partial<Category>
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'categories', categoryId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    log.error('Error actualizando categoría:', error);
    throw new Error('Error al actualizar la categoría');
  }
};

// ============================================
// 6️⃣ OBTENER ESPECIALIDADES DE UN PROVEEDOR
// ============================================
export const getProviderSpecialties = async (providerId: string): Promise<ProviderSpecialty[]> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'providers', providerId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      const specialtyIds = data.specialties || [];

      const specialties: ProviderSpecialty[] = [];
      for (const id of specialtyIds) {
        const specialty = await getSpecialtyById(id);
        if (specialty) {
          const category = await getCategoryById(specialty.categoryId);
          specialties.push({
            specialtyId: specialty.id,
            name: specialty.name,
            categoryId: specialty.categoryId,
            categoryName: category?.name || 'Sin categoría',
            experience: data.experience || 0,
            rate: data.rate,
            isVerified: data.isVerified || false,
            certifications: data.certifications || [],
            portfolioIds: data.portfolioIds || [],
          });
        }
      }
      return specialties;
    }
    return [];
  } catch (error) {
    log.error('Error obteniendo especialidades del proveedor:', error);
    return [];
  }
};

// ============================================
// 7️⃣ BUSCAR PROFESIONALES POR ESPECIALIDAD
// ============================================
export const searchProvidersBySpecialty = async (
  specialtyId: string,
  location?: string,
  limitCount: number = 20,
  lastDoc?: any
): Promise<{
  providers: ProviderWithSpecialties[];
  lastDoc: any | null;
  total: number;
}> => {
  try {
    const dbInstance = getDb();

    if (!specialtyId) {
      log.warning('⚠️ specialtyId no proporcionado');
      return { providers: [], lastDoc: null, total: 0 };
    }

    let q = query(
      collection(dbInstance, 'providers'),
      where('isActive', '==', true),
      limit(limitCount)
    );

    try {
      q = query(
        collection(dbInstance, 'providers'),
        where('specialties', 'array-contains', specialtyId),
        where('isActive', '==', true),
        limit(limitCount)
      );
    } catch (indexError) {
      log.warning('⚠️ Error con índice de specialties:', indexError);
      q = query(
        collection(dbInstance, 'providers'),
        where('isActive', '==', true),
        limit(limitCount * 2)
      );
    }

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const providers: ProviderWithSpecialties[] = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const specialtiesArray = data.specialties || [];

      if (!specialtiesArray.includes(specialtyId) && !lastDoc) {
        continue;
      }

      if (location && data.location !== location) {
        continue;
      }

      const providerSpecialties = await getProviderSpecialtiesOptimized(doc.id);

      // ✅ Asegurar que todos los campos requeridos están presentes
      providers.push({
        uid: doc.id,
        displayName: data.displayName || 'Proveedor',
        email: data.email || '',
        phone: data.phone || '',
        photoURL: data.photoURL || '',
        location: data.location || '',
        specialties: providerSpecialties,
        categories: data.categories || [],
        rating: data.rating || 0,
        totalRatings: data.totalRatings || 0,
        isActive: data.isActive || true,
        verified: data.isVerified || data.verified || false, // ✅ Añadir verified
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        // ✅ Propiedades adicionales opcionales
        responseTime: data.responseTime,
        completedJobs: data.completedJobs || 0,
      });
    }

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      providers,
      lastDoc: lastVisible,
      total: providers.length,
    };
  } catch (error) {
    log.error('Error buscando proveedores:', error);
    return { providers: [], lastDoc: null, total: 0 };
  }
};

// ============================================
// 7️⃣.1️⃣ OBTENER ESPECIALIDADES OPTIMIZADO
// ============================================
export const getProviderSpecialtiesOptimized = async (
  providerId: string
): Promise<ProviderSpecialty[]> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'providers', providerId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.data();
    const specialtyIds = data.specialties || [];

    if (specialtyIds.length === 0) {
      return [];
    }

    const specialties: ProviderSpecialty[] = [];

    for (const id of specialtyIds) {
      const specialty = await getSpecialtyById(id);
      if (specialty) {
        const category = await getCategoryById(specialty.categoryId);
        specialties.push({
          specialtyId: specialty.id,
          name: specialty.name,
          categoryId: specialty.categoryId,
          categoryName: category?.name || 'Sin categoría',
          experience: data.experience || 0,
          rate: data.rate,
          isVerified: data.isVerified || false,
          certifications: data.certifications || [],
          portfolioIds: data.portfolioIds || [],
        });
      }
    }

    return specialties;
  } catch (error) {
    log.error('Error obteniendo especialidades del proveedor:', error);
    return [];
  }
};

// ============================================
// 7️⃣.2️⃣ VERSIÓN SIMPLE (BACKWARD COMPATIBLE)
// ============================================
export const searchProvidersBySpecialtySimple = async (
  specialtyId: string,
  location?: string
): Promise<ProviderWithSpecialties[]> => {
  try {
    const result = await searchProvidersBySpecialty(specialtyId, location, 50);
    return result.providers;
  } catch (error) {
    log.error('Error buscando proveedores (simple):', error);
    return [];
  }
};

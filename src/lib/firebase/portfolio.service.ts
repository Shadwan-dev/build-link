import { log } from '@/lib/utils/logger';
import { PortfolioItem, PortfolioStats } from '@/types/portfolio.types';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  increment,
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

const COLLECTION_NAME = 'portfolio';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ============================================
// 1️⃣ CREAR ITEM DE PORTAFOLIO
// ============================================
export const createPortfolioItem = async (
  data: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'isPublished'>
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(collection(dbInstance, COLLECTION_NAME));
    const now = serverTimestamp();

    const itemData: Omit<PortfolioItem, 'id'> = {
      ...data,
      isPublished: true,
      views: 0,
      likes: 0,
      createdAt: now as Timestamp,
      updatedAt: now as Timestamp,
    };

    await setDoc(docRef, itemData);
    log.info('📸 Item de portafolio creado:', docRef.id);
    return docRef.id;
  } catch (error) {
    log.error('❌ Error creando item de portafolio:', error);
    throw new Error('Error al crear el item de portafolio');
  }
};

// ============================================
// 2️⃣ OBTENER ITEMS DE UN PROVEEDOR
// ============================================
export const getProviderPortfolio = async (
  providerId: string,
  options?: { limit?: number; lastDoc?: any; category?: string }
): Promise<{ items: PortfolioItem[]; lastDoc: any | null }> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [
      where('providerId', '==', providerId),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(options?.limit || 20),
    ];

    if (options?.category) {
      constraints.push(where('category', '==', options.category));
    }

    if (options?.lastDoc) {
      constraints.push(startAfter(options.lastDoc));
    }

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    const items: PortfolioItem[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() } as PortfolioItem);
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { items, lastDoc: lastVisible };
  } catch (error) {
    log.error('❌ Error obteniendo portafolio:', error);
    return { items: [], lastDoc: null };
  }
};

// ============================================
// 3️⃣ OBTENER ITEM POR ID
// ============================================
export const getPortfolioItem = async (itemId: string): Promise<PortfolioItem | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, itemId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as PortfolioItem;
    }
    return null;
  } catch (error) {
    log.error('❌ Error obteniendo item de portafolio:', error);
    return null;
  }
};

// ============================================
// 4️⃣ ACTUALIZAR ITEM
// ============================================
export const updatePortfolioItem = async (
  itemId: string,
  data: Partial<PortfolioItem>
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, itemId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    log.info('📸 Item de portafolio actualizado:', itemId);
  } catch (error) {
    log.error('❌ Error actualizando item de portafolio:', error);
    throw new Error('Error al actualizar el item de portafolio');
  }
};

// ============================================
// 5️⃣ ELIMINAR ITEM
// ============================================
export const deletePortfolioItem = async (itemId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, itemId);
    await deleteDoc(docRef);
    log.info('📸 Item de portafolio eliminado:', itemId);
  } catch (error) {
    log.error('❌ Error eliminando item de portafolio:', error);
    throw new Error('Error al eliminar el item de portafolio');
  }
};

// ============================================
// 6️⃣ DAR LIKE
// ============================================
export const likePortfolioItem = async (itemId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, itemId);
    await updateDoc(docRef, {
      likes: increment(1),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    log.error('❌ Error dando like:', error);
    throw new Error('Error al dar like');
  }
};

// ============================================
// 7️⃣ REGISTRAR VISTA
// ============================================
export const viewPortfolioItem = async (itemId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, itemId);
    await updateDoc(docRef, {
      views: increment(1),
    });
  } catch (error) {
    log.error('❌ Error registrando vista:', error);
  }
};

// ============================================
// 8️⃣ OBTENER ESTADÍSTICAS DEL PORTAFOLIO
// ============================================
export const getPortfolioStats = async (providerId: string): Promise<PortfolioStats> => {
  try {
    const dbInstance = getDb();
    const q = query(
      collection(dbInstance, COLLECTION_NAME),
      where('providerId', '==', providerId),
      where('isPublished', '==', true)
    );

    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PortfolioItem);

    if (items.length === 0) {
      return {
        totalItems: 0,
        totalViews: 0,
        totalLikes: 0,
        categories: [],
        years: [],
      };
    }

    // ✅ Calcular estadísticas
    const totalViews = items.reduce((sum, item) => sum + item.views, 0);
    const totalLikes = items.reduce((sum, item) => sum + item.likes, 0);

    // ✅ Agrupar por categoría
    const categoryMap = new Map<string, number>();
    const yearsSet = new Set<number>();

    items.forEach((item) => {
      if (item.category) {
        categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1);
      }
      if (item.year) {
        yearsSet.add(item.year);
      }
    });

    return {
      totalItems: items.length,
      totalViews,
      totalLikes,
      categories: Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count })),
      years: Array.from(yearsSet).sort((a, b) => b - a),
    };
  } catch (error) {
    log.error('❌ Error obteniendo estadísticas del portafolio:', error);
    return {
      totalItems: 0,
      totalViews: 0,
      totalLikes: 0,
      categories: [],
      years: [],
    };
  }
};

import { log } from '@/lib/utils/logger';
import { CreateReviewInput, Review, ReviewFilterOptions, ReviewStats } from '@/types/review.types';
import {
  collection,
  doc,
  limit as firestoreLimit,
  getDoc,
  getDocs,
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
import { createNotification } from './notification.service';
import { updateProviderRating } from './provider.service';

const COLLECTION_NAME = 'reviews';

const getDb = () => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ============================================
// 1️⃣ CREAR VALORACIÓN
// ============================================
export const createReview = async (data: CreateReviewInput): Promise<string> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(collection(dbInstance, COLLECTION_NAME));
    const now = serverTimestamp();

    // ✅ Verificar que la solicitud existe y está completada
    const requestDoc = await getDoc(doc(dbInstance, 'requests', data.requestId));
    if (!requestDoc.exists()) {
      throw new Error('Solicitud no encontrada');
    }

    const request = requestDoc.data();
    if (request.status !== 'completado') {
      throw new Error('La solicitud debe estar completada para valorar');
    }

    // ✅ Verificar que el cliente es el dueño de la solicitud
    if (request.clientId !== data.clientId) {
      throw new Error('No tienes permiso para valorar esta solicitud');
    }

    // ✅ Verificar que no haya una valoración previa
    const existingReviews = await getDocs(
      query(collection(dbInstance, COLLECTION_NAME), where('requestId', '==', data.requestId))
    );

    if (!existingReviews.empty) {
      throw new Error('Esta solicitud ya tiene una valoración');
    }

    // ✅ Crear la valoración
    const reviewData: Omit<Review, 'id'> = {
      ...data,
      status: 'publicado',
      verified: true,
      isPublic: true,
      createdAt: now as Timestamp,
      updatedAt: now as Timestamp,
    };

    await setDoc(docRef, reviewData);

    // ✅ Actualizar el rating del proveedor
    await updateProviderRating(data.providerId);

    // ✅ Notificar al proveedor
    await createNotification(
      data.providerId,
      `⭐ Nueva valoración de ${data.clientName}`,
      `${data.clientName} te ha calificado con ${data.rating} estrellas: "${data.comment.slice(0, 50)}${data.comment.length > 50 ? '...' : ''}"`,
      'review',
      `/dashboard/reviews/${docRef.id}`
    );

    // ✅ Notificar al cliente (confirmación)
    await createNotification(
      data.clientId,
      '✅ Valoración publicada',
      'Tu valoración ha sido publicada exitosamente',
      'response',
      `/dashboard/reviews/${docRef.id}`
    );

    return docRef.id;
  } catch (error) {
    log.error('❌ Error creando valoración:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al crear la valoración');
  }
};

// ============================================
// 2️⃣ OBTENER VALORACIONES DE UN PROVEEDOR
// ============================================
export const getProviderReviews = async (
  providerId: string,
  limitCount: number = 20,
  lastDoc?: any
): Promise<{ reviews: Review[]; lastDoc: any | null }> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [
      where('providerId', '==', providerId),
      where('status', '==', 'publicado'),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limitCount),
    ];

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    const reviews: Review[] = [];
    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;

    return { reviews, lastDoc: lastVisible };
  } catch (error) {
    log.error('❌ Error obteniendo valoraciones:', error);
    return { reviews: [], lastDoc: null };
  }
};

// ============================================
// 3️⃣ OBTENER VALORACIÓN POR ID
// ============================================
export const getReviewById = async (reviewId: string): Promise<Review | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, reviewId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Review;
    }
    return null;
  } catch (error) {
    log.error('❌ Error obteniendo valoración:', error);
    return null;
  }
};

// ============================================
// 4️⃣ OBTENER ESTADÍSTICAS DE VALORACIONES
// ============================================
export const getReviewStats = async (providerId: string): Promise<ReviewStats> => {
  try {
    const dbInstance = getDb();
    const q = query(
      collection(dbInstance, COLLECTION_NAME),
      where('providerId', '==', providerId),
      where('status', '==', 'publicado')
    );

    const snapshot = await getDocs(q);
    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Review);

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        averageCategories: {
          calidad: 0,
          puntualidad: 0,
          comunicacion: 0,
          precio: 0,
        },
        recentReviews: [],
      };
    }

    // ✅ Calcular distribución
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sumRating = 0;
    let sumCalidad = 0;
    let sumPuntualidad = 0;
    let sumComunicacion = 0;
    let sumPrecio = 0;

    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
      sumRating += review.rating;

      if (review.categories) {
        sumCalidad += review.categories.calidad || 0;
        sumPuntualidad += review.categories.puntualidad || 0;
        sumComunicacion += review.categories.comunicacion || 0;
        sumPrecio += review.categories.precio || 0;
      }
    });

    const total = reviews.length;

    // ✅ Ordenar por fecha para obtener las más recientes
    const sortedReviews = [...reviews].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.seconds - a.createdAt.seconds;
      }
      return 0;
    });

    return {
      averageRating: Number((sumRating / total).toFixed(1)),
      totalReviews: total,
      distribution,
      averageCategories: {
        calidad: Number((sumCalidad / total).toFixed(1)),
        puntualidad: Number((sumPuntualidad / total).toFixed(1)),
        comunicacion: Number((sumComunicacion / total).toFixed(1)),
        precio: Number((sumPrecio / total).toFixed(1)),
      },
      recentReviews: sortedReviews.slice(0, 5),
    };
  } catch (error) {
    log.error('❌ Error obteniendo estadísticas:', error);
    return {
      averageRating: 0,
      totalReviews: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      averageCategories: {
        calidad: 0,
        puntualidad: 0,
        comunicacion: 0,
        precio: 0,
      },
      recentReviews: [],
    };
  }
};

// ============================================
// 5️⃣ ACTUALIZAR VALORACIÓN
// ============================================
export const updateReview = async (reviewId: string, data: Partial<Review>): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, reviewId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    // ✅ Si se actualiza la valoración, recalcular rating
    if (data.rating || data.categories) {
      const reviewDoc = await getDoc(docRef);
      if (reviewDoc.exists()) {
        const review = reviewDoc.data() as Review;
        await updateProviderRating(review.providerId);
      }
    }
  } catch (error) {
    log.error('❌ Error actualizando valoración:', error);
    throw new Error('Error al actualizar la valoración');
  }
};

// ============================================
// 6️⃣ ELIMINAR VALORACIÓN (SOFT DELETE)
// ============================================
export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, reviewId);
    await updateDoc(docRef, {
      status: 'eliminado',
      updatedAt: serverTimestamp(),
    });

    // ✅ Recalcular rating del proveedor
    const reviewDoc = await getDoc(docRef);
    if (reviewDoc.exists()) {
      const review = reviewDoc.data() as Review;
      await updateProviderRating(review.providerId);
    }
  } catch (error) {
    log.error('❌ Error eliminando valoración:', error);
    throw new Error('Error al eliminar la valoración');
  }
};

// ============================================
// 7️⃣ VALIDAR SI EL CLIENTE PUEDE VALORAR
// ============================================
export const canClientReview = async (
  clientId: string,
  requestId: string
): Promise<{ canReview: boolean; message: string }> => {
  try {
    const dbInstance = getDb();

    // ✅ Verificar solicitud
    const requestDoc = await getDoc(doc(dbInstance, 'requests', requestId));
    if (!requestDoc.exists()) {
      return { canReview: false, message: 'Solicitud no encontrada' };
    }

    const request = requestDoc.data();

    // ✅ Verificar que el cliente es el dueño
    if (request.clientId !== clientId) {
      return { canReview: false, message: 'No tienes permiso para valorar esta solicitud' };
    }

    // ✅ Verificar que la solicitud está completada
    if (request.status !== 'completado') {
      return { canReview: false, message: 'La solicitud debe estar completada para valorar' };
    }

    // ✅ Verificar que no haya una valoración previa
    const existingReviews = await getDocs(
      query(collection(dbInstance, COLLECTION_NAME), where('requestId', '==', requestId))
    );

    if (!existingReviews.empty) {
      return { canReview: false, message: 'Ya has valorado esta solicitud' };
    }

    return { canReview: true, message: 'Puedes valorar esta solicitud' };
  } catch (error) {
    log.error('❌ Error verificando:', error);
    return { canReview: false, message: 'Error al verificar' };
  }
};

// ============================================
// 8️⃣ OBTENER VALORACIONES FILTRADAS
// ============================================
export const getFilteredReviews = async (
  filters: ReviewFilterOptions
): Promise<{ reviews: Review[]; total: number }> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [];

    if (filters.providerId) {
      constraints.push(where('providerId', '==', filters.providerId));
    }
    if (filters.clientId) {
      constraints.push(where('clientId', '==', filters.clientId));
    }
    if (filters.requestId) {
      constraints.push(where('requestId', '==', filters.requestId));
    }
    if (filters.rating) {
      constraints.push(where('rating', '==', filters.rating));
    }
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    if (filters.verified !== undefined) {
      constraints.push(where('verified', '==', filters.verified));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (filters.limit) {
      constraints.push(firestoreLimit(filters.limit));
    }

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    const reviews: Review[] = [];
    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });

    return { reviews, total: reviews.length };
  } catch (error) {
    log.error('❌ Error obteniendo valoraciones filtradas:', error);
    return { reviews: [], total: 0 };
  }
};

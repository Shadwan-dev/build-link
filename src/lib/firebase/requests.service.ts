import { log } from '@/lib/utils/logger';
import {
  CreateRequestInput,
  Request,
  RequestFilterOptions,
  RequestStatus,
} from '@/types/request.types';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getCategoryById, getSpecialtyById } from './catalog.service';
import { db } from './config';
import { createNotification } from './notification.service';

const COLLECTION_NAME = 'requests';
const DEFAULT_PAGE_SIZE = 20;

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ============================================
// VALIDACIÓN DE DATOS CON CATEGORÍAS
// ============================================
const validateRequestData = async (data: any) => {
  if (!data.clientId) throw new Error('El ID del cliente es requerido');
  if (!data.clientName) throw new Error('El nombre del cliente es requerido');
  if (!data.providerId) throw new Error('El ID del proveedor es requerido');
  if (!data.providerName) throw new Error('El nombre del proveedor es requerido');
  if (!data.categoryId) throw new Error('La categoría es requerida');
  if (!data.description || data.description.length < 10) {
    throw new Error('La descripción debe tener al menos 10 caracteres');
  }

  // ✅ Validar que la categoría existe
  const category = await getCategoryById(data.categoryId);
  if (!category) {
    throw new Error('La categoría seleccionada no existe');
  }

  // ✅ Si hay especialidad, validar que existe y pertenece a la categoría
  if (data.specialtyId) {
    const specialty = await getSpecialtyById(data.specialtyId);
    if (!specialty) {
      throw new Error('La especialidad seleccionada no existe');
    }
    if (specialty.categoryId !== data.categoryId) {
      throw new Error('La especialidad no pertenece a la categoría seleccionada');
    }
  }

  return {
    category,
    specialty: data.specialtyId ? await getSpecialtyById(data.specialtyId) : null,
  };
};

// ============================================
// MAPEO DE SOLICITUDES
// ============================================
const mapRequestFromDoc = (doc: QueryDocumentSnapshot): Request =>
  ({
    id: doc.id,
    ...doc.data(),
  }) as Request;

const mapRequestsFromSnapshot = (snapshot: any): Request[] => {
  const requests: Request[] = [];
  snapshot.forEach((doc: QueryDocumentSnapshot) => {
    requests.push(mapRequestFromDoc(doc));
  });
  return requests;
};

// ============================================
// 1️⃣ CREAR SOLICITUD (CON CATEGORÍAS)
// ============================================
// ============================================
// 1️⃣ CREAR SOLICITUD (CON CATEGORÍAS)
// ============================================
export const createRequest = async (data: CreateRequestInput): Promise<string> => {
  try {
    log.info('📝 Datos recibidos en createRequest:', data);

    // ✅ Validar datos requeridos
    if (!data.clientId) throw new Error('El ID del cliente es requerido');
    if (!data.clientName) throw new Error('El nombre del cliente es requerido');
    if (!data.providerId) throw new Error('El ID del proveedor es requerido');
    if (!data.providerName) throw new Error('El nombre del proveedor es requerido');
    if (!data.categoryId) throw new Error('La categoría es requerida');
    if (!data.description || data.description.length < 10) {
      throw new Error('La descripción debe tener al menos 10 caracteres');
    }

    const dbInstance = getDb();

    // ✅ Validar que el usuario es un cliente
    try {
      const userDoc = await getDoc(doc(dbInstance, 'users', data.clientId));
      if (!userDoc.exists()) {
        log.warning('⚠️ Usuario no encontrado en Firestore, pero continuamos...');
      } else {
        const userData = userDoc.data();
        if (userData.role !== 'client') {
          throw new Error('Solo los clientes pueden crear solicitudes');
        }
      }
    } catch (userError) {
      log.warning('⚠️ Error verificando usuario:', userError);
      // No bloqueamos la creación si hay error de lectura
    }

    // ✅ Validar que el proveedor existe (opcional, no bloqueante)
    try {
      const providerDoc = await getDoc(doc(dbInstance, 'providers', data.providerId));
      if (!providerDoc.exists()) {
        log.warning('⚠️ Proveedor no encontrado en Firestore, pero continuamos...');
      }
    } catch (providerError) {
      log.warning('⚠️ Error verificando proveedor:', providerError);
      // No bloqueamos la creación si hay error de lectura
    }

    const requestsRef = collection(dbInstance, COLLECTION_NAME);
    const docRef = doc(requestsRef);
    const now = serverTimestamp();

    // ✅ Datos enriquecidos - SOLO con campos que existen en el tipo
    const requestData = {
      // Campos obligatorios
      clientId: data.clientId,
      clientName: data.clientName,
      providerId: data.providerId,
      providerName: data.providerName,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      description: data.description,
      status: 'pendiente' as const,
      createdAt: now,
      updatedAt: now,
      // Campos opcionales
      clientEmail: data.clientEmail || '',
      clientPhone: data.clientPhone || '',
      budget: data.budget || null,
      location: data.location || '',
      urgency: data.urgency || 'normal',
      timeline: data.timeline || '',
      estimatedTime: data.estimatedTime || '',
      specialtyId: data.specialtyId || '',
      specialtyName: data.specialtyName || '',
      images: data.images || [],
      response: '',
      whatsappContact: '',
      // Campos adicionales para tracking
      providerResponse: null,
      clientFeedback: null,
    };

    log.info('📝 Guardando solicitud en Firestore:', requestData);

    // ✅ Guardar en Firestore
    await setDoc(docRef, requestData);
    log.info(`✅ Solicitud creada: ${docRef.id}`);

    // ✅ Crear notificaciones (solo si la función existe)
    try {
      const { createNotification } = await import('./notification.service');

      await Promise.all([
        createNotification(
          data.providerId,
          `📩 Nueva solicitud de ${data.clientName}`,
          `${data.clientName} ha enviado una solicitud para: ${data.categoryName}`,
          'request',
          `/dashboard/requests/${docRef.id}`
        ),
        createNotification(
          data.clientId,
          '✅ Solicitud enviada',
          `Tu solicitud para ${data.categoryName} ha sido enviada a ${data.providerName}`,
          'response',
          `/dashboard/requests/${docRef.id}`
        ),
      ]);
    } catch (notifError) {
      log.warning('⚠️ Error creando notificaciones (no bloqueante):', notifError);
      // No bloqueamos la creación si fallan las notificaciones
    }

    return docRef.id;
  } catch (error) {
    log.error('❌ Error creando solicitud:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al enviar la solicitud');
  }
};

// ============================================
// 2️⃣ OBTENER SOLICITUDES POR CATEGORÍA
// ============================================
export const getRequestsByCategory = async (
  categoryId: string,
  status?: RequestStatus
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [
      where('categoryId', '==', categoryId),
      orderBy('createdAt', 'desc'),
    ];

    if (status) {
      constraints.push(where('status', '==', status));
    }

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    return mapRequestsFromSnapshot(snapshot);
  } catch (error) {
    log.error('❌ Error obteniendo solicitudes por categoría:', error);
    return [];
  }
};

// ============================================
// 3️⃣ OBTENER SOLICITUDES POR ESPECIALIDAD
// ============================================
export const getRequestsBySpecialty = async (
  specialtyId: string,
  status?: RequestStatus
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [
      where('specialtyId', '==', specialtyId),
      orderBy('createdAt', 'desc'),
    ];

    if (status) {
      constraints.push(where('status', '==', status));
    }

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    return mapRequestsFromSnapshot(snapshot);
  } catch (error) {
    log.error('❌ Error obteniendo solicitudes por especialidad:', error);
    return [];
  }
};

// ============================================
// 4️⃣ ESTADÍSTICAS DE SOLICITUDES POR CATEGORÍA
// ============================================
export const getRequestStatsByCategory = async (): Promise<
  {
    categoryId: string;
    categoryName: string;
    total: number;
    pendiente: number;
    completado: number;
  }[]
> => {
  try {
    const dbInstance = getDb();
    const snapshot = await getDocs(collection(dbInstance, COLLECTION_NAME));
    const requests = mapRequestsFromSnapshot(snapshot);

    // ✅ Agrupar por categoría
    const statsMap = new Map<
      string,
      {
        categoryId: string;
        categoryName: string;
        total: number;
        pendiente: number;
        completado: number;
      }
    >();

    requests.forEach((req) => {
      const key = req.categoryId;
      if (!statsMap.has(key)) {
        statsMap.set(key, {
          categoryId: req.categoryId,
          categoryName: req.categoryName,
          total: 0,
          pendiente: 0,
          completado: 0,
        });
      }

      const stat = statsMap.get(key)!;
      stat.total += 1;
      if (req.status === 'pendiente') stat.pendiente += 1;
      if (req.status === 'completado') stat.completado += 1;
    });

    return Array.from(statsMap.values());
  } catch (error) {
    log.error('❌ Error obteniendo estadísticas por categoría:', error);
    return [];
  }
};

// ============================================
// 5️⃣ CONTAR SOLICITUDES POR ESTADO Y CATEGORÍA
// ============================================
export const countRequestsByStatusAndCategory = async (
  userId: string,
  role: 'client' | 'provider'
): Promise<{
  byStatus: Record<RequestStatus, number>;
  byCategory: Record<string, number>;
}> => {
  try {
    const dbInstance = getDb();
    const field = role === 'client' ? 'clientId' : 'providerId';
    const q = query(collection(dbInstance, COLLECTION_NAME), where(field, '==', userId));

    const snapshot = await getDocs(q);
    const requests = mapRequestsFromSnapshot(snapshot);

    // ✅ Contar por estado
    const byStatus: Record<RequestStatus, number> = {
      pendiente: 0,
      aceptado: 0,
      rechazado: 0,
      'en-progreso': 0,
      completado: 0,
    };

    // ✅ Contar por categoría
    const byCategory: Record<string, number> = {};

    requests.forEach((req) => {
      // Por estado
      byStatus[req.status] = (byStatus[req.status] || 0) + 1;

      // Por categoría
      const key = req.categoryId;
      byCategory[key] = (byCategory[key] || 0) + 1;
    });

    return { byStatus, byCategory };
  } catch (error) {
    log.error('❌ Error contando solicitudes:', error);
    return {
      byStatus: {
        pendiente: 0,
        aceptado: 0,
        rechazado: 0,
        'en-progreso': 0,
        completado: 0,
      },
      byCategory: {},
    };
  }
};

// ============================================
// 6️⃣ OBTENER SOLICITUDES FILTRADAS (MEJORADA)
// ============================================
export const getFilteredRequests = async (
  userId: string,
  role: 'client' | 'provider',
  filters: RequestFilterOptions = {}
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [];

    // ✅ Filtro por usuario y rol
    const field = role === 'client' ? 'clientId' : 'providerId';
    constraints.push(where(field, '==', userId));

    // ✅ Filtro por estado
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }

    // ✅ Filtro por categoría (MEJORADO)
    if (filters.categoryId) {
      constraints.push(where('categoryId', '==', filters.categoryId));
    }

    // ✅ Filtro por especialidad
    if (filters.specialtyId) {
      constraints.push(where('specialtyId', '==', filters.specialtyId));
    }

    // ✅ Filtro por urgencia
    if (filters.urgency) {
      constraints.push(where('urgency', '==', filters.urgency));
    }

    // ✅ Filtro por presupuesto (rangos)
    if (filters.minBudget !== undefined) {
      constraints.push(where('budget', '>=', filters.minBudget));
    }
    if (filters.maxBudget !== undefined) {
      constraints.push(where('budget', '<=', filters.maxBudget));
    }

    // ✅ Ordenar por fecha
    constraints.push(orderBy('createdAt', 'desc'));

    // ✅ Límite
    if (filters.limit) {
      constraints.push(limit(filters.limit));
    }

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    let requests = mapRequestsFromSnapshot(snapshot);

    // ✅ Filtro por búsqueda (en memoria)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      requests = requests.filter(
        (r) =>
          r.clientName.toLowerCase().includes(search) ||
          r.providerName.toLowerCase().includes(search) ||
          r.categoryName.toLowerCase().includes(search) ||
          r.description.toLowerCase().includes(search)
      );
    }

    return requests;
  } catch (error) {
    log.error('❌ Error obteniendo solicitudes filtradas:', error);
    return [];
  }
};
// ... todo tu código existente ...

// ============================================
// 7️⃣ OBTENER SOLICITUD POR ID (IMPORTANTE)
// ============================================
export const getRequestById = async (requestId: string): Promise<Request | null> => {
  try {
    if (!requestId) throw new Error('El ID de la solicitud es requerido');

    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, requestId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return mapRequestFromDoc(snapshot);
    }

    log.warning(`⚠️ Solicitud no encontrada: ${requestId}`);
    return null;
  } catch (error) {
    log.error(`❌ Error obteniendo solicitud ${requestId}:`, error);
    return null;
  }
};

// ============================================
// 8️⃣ ACTUALIZAR ESTADO DE SOLICITUD
// ============================================
export const updateRequestStatus = async (
  requestId: string,
  status: RequestStatus,
  response?: string,
  whatsappContact?: string
): Promise<void> => {
  try {
    if (!requestId) throw new Error('El ID de la solicitud es requerido');
    if (!status) throw new Error('El estado es requerido');

    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, requestId);

    // ✅ Obtener la solicitud antes de actualizar
    const request = await getRequestById(requestId);
    if (!request) {
      throw new Error('Solicitud no encontrada');
    }

    // ✅ Datos a actualizar
    const updateData: any = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (response) updateData.response = response;
    if (whatsappContact) updateData.whatsappContact = whatsappContact;

    // ✅ Actualizar en Firestore
    await updateDoc(docRef, updateData);
    log.info(`✅ Solicitud ${requestId} actualizada a: ${status}`);

    // ✅ Crear notificaciones según el estado
    await createStatusNotifications(request, status, { response, whatsappContact });
  } catch (error) {
    log.error('❌ Error actualizando solicitud:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al actualizar la solicitud');
  }
};

// ============================================
// 9️⃣ FUNCIÓN AUXILIAR: NOTIFICACIONES POR ESTADO
// ============================================
const createStatusNotifications = async (
  request: Request,
  status: RequestStatus,
  options?: { response?: string; whatsappContact?: string }
): Promise<void> => {
  const statusMessages: Record<RequestStatus, { title: string; message: string } | null> = {
    pendiente: null,
    aceptado: {
      title: `✅ Solicitud aceptada por ${request.providerName}`,
      message: `${request.providerName} ha aceptado tu solicitud. ${options?.whatsappContact ? `Contacto: ${options.whatsappContact}` : ''}`,
    },
    rechazado: {
      title: `❌ Solicitud rechazada por ${request.providerName}`,
      message: `${request.providerName} ha rechazado tu solicitud. Motivo: ${options?.response || 'No especificado'}`,
    },
    'en-progreso': {
      title: `🔄 Solicitud en progreso`,
      message: `${request.providerName} está trabajando en tu solicitud`,
    },
    completado: {
      title: `✅ Solicitud completada`,
      message: `${request.providerName} ha completado tu solicitud. ¡Califica su trabajo!`,
    },
  };

  const notification = statusMessages[status];
  if (notification) {
    await createNotification(
      request.clientId,
      notification.title,
      notification.message,
      'response',
      `/dashboard/requests/${request.id}`
    );
  }
};

// ============================================
// 🔟 OBTENER SOLICITUDES DE UN CLIENTE
// ============================================
export const getClientRequests = async (
  clientId: string,
  status?: RequestStatus
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [where('clientId', '==', clientId)];

    if (status) {
      constraints.push(where('status', '==', status));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    return mapRequestsFromSnapshot(snapshot);
  } catch (error) {
    log.error('❌ Error obteniendo solicitudes del cliente:', error);
    return [];
  }
};

// ============================================
// 1️⃣1️⃣ OBTENER SOLICITUDES DE UN PROVEEDOR
// ============================================
export const getProviderRequests = async (
  providerId: string,
  status?: RequestStatus
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [where('providerId', '==', providerId)];

    if (status) {
      constraints.push(where('status', '==', status));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    return mapRequestsFromSnapshot(snapshot);
  } catch (error) {
    log.error('❌ Error obteniendo solicitudes del proveedor:', error);
    return [];
  }
};

// ============================================
// 1️⃣2️⃣ OBTENER SOLICITUDES PENDIENTES
// ============================================
export const getPendingRequests = async (
  limitCount: number = DEFAULT_PAGE_SIZE
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const constraints: QueryConstraint[] = [
      where('status', '==', 'pendiente'),
      orderBy('createdAt', 'desc'),
      limit(limitCount),
    ];

    const q = query(collection(dbInstance, COLLECTION_NAME), ...constraints);
    const snapshot = await getDocs(q);

    return mapRequestsFromSnapshot(snapshot);
  } catch (error) {
    log.error('❌ Error obteniendo solicitudes pendientes:', error);
    return [];
  }
};

// ============================================
// 1️⃣3️⃣ CONTAR SOLICITUDES POR ESTADO
// ============================================
export const countRequestsByStatus = async (
  userId: string,
  role: 'client' | 'provider'
): Promise<Record<RequestStatus, number>> => {
  try {
    const dbInstance = getDb();
    const field = role === 'client' ? 'clientId' : 'providerId';

    const statuses: RequestStatus[] = [
      'pendiente',
      'aceptado',
      'rechazado',
      'en-progreso',
      'completado',
    ];
    const counts: Record<RequestStatus, number> = {
      pendiente: 0,
      aceptado: 0,
      rechazado: 0,
      'en-progreso': 0,
      completado: 0,
    };

    await Promise.all(
      statuses.map(async (status) => {
        const q = query(
          collection(dbInstance, COLLECTION_NAME),
          where(field, '==', userId),
          where('status', '==', status)
        );
        const snapshot = await getDocs(q);
        counts[status] = snapshot.size;
      })
    );

    return counts;
  } catch (error) {
    log.error('❌ Error contando solicitudes:', error);
    return {
      pendiente: 0,
      aceptado: 0,
      rechazado: 0,
      'en-progreso': 0,
      completado: 0,
    };
  }
};

// ============================================
// 1️⃣4️⃣ ELIMINAR SOLICITUD (SOFT DELETE)
// ============================================
export const deleteRequest = async (requestId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, COLLECTION_NAME, requestId);
    await updateDoc(docRef, {
      status: 'eliminado',
      updatedAt: serverTimestamp(),
    });
    log.info(`✅ Solicitud ${requestId} marcada como eliminada`);
  } catch (error) {
    log.error('❌ Error eliminando solicitud:', error);
    throw new Error('Error al eliminar la solicitud');
  }
};

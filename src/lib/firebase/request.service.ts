import { Request, RequestFilterOptions, RequestStatus } from '@/types/request.types';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { createChat } from './chat.service'; // ✅ Importar chat
import { db } from './config';
import { createNotification } from './notification.service';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ✅ Crear una solicitud
export const createRequest = async (
  data: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const requestsRef = collection(dbInstance, 'requests');
    const docRef = doc(requestsRef);

    const requestData: Request = {
      ...data,
      id: docRef.id,
      status: 'pendiente',
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    await setDoc(docRef, requestData);

    // ✅ Crear notificación para el proveedor
    await createNotification(
      data.providerId,
      `📩 Nueva solicitud de ${data.clientName}`,
      `${data.clientName} ha enviado una solicitud para: ${data.category}`,
      'request',
      `/dashboard/requests/${docRef.id}`
    );

    // ✅ Crear notificación para el cliente (confirmación)
    await createNotification(
      data.clientId,
      '✅ Solicitud enviada',
      `Tu solicitud para ${data.category} ha sido enviada a ${data.providerName}`,
      'response',
      `/dashboard/requests/${docRef.id}`
    );

    return docRef.id;
  } catch (error) {
    console.error('Error creando solicitud:', error);
    throw new Error('Error al enviar la solicitud');
  }
};

// ✅ Obtener solicitudes de un cliente
export const getClientRequests = async (clientId: string): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const requestsRef = collection(dbInstance, 'requests');
    const q = query(requestsRef, where('clientId', '==', clientId), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const requests: Request[] = [];
    snapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() } as Request);
    });
    return requests;
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    return [];
  }
};

// ✅ Obtener solicitudes de un proveedor
export const getProviderRequests = async (providerId: string): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const requestsRef = collection(dbInstance, 'requests');
    const q = query(
      requestsRef,
      where('providerId', '==', providerId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const requests: Request[] = [];
    snapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() } as Request);
    });
    return requests;
  } catch (error) {
    console.error('Error obteniendo solicitudes:', error);
    return [];
  }
};

// ✅ Obtener una solicitud por ID
export const getRequestById = async (requestId: string): Promise<Request | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'requests', requestId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Request;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo solicitud:', error);
    return null;
  }
};

// ✅ Actualizar estado de una solicitud (CON CHAT)
export const updateRequestStatus = async (
  requestId: string,
  status: RequestStatus,
  response?: string,
  whatsappContact?: string
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'requests', requestId);

    // Obtener la solicitud para saber a quién notificar
    const request = await getRequestById(requestId);

    await updateDoc(docRef, {
      status,
      response: response || '',
      whatsappContact: whatsappContact || '',
      updatedAt: serverTimestamp(),
    });

    // ✅ Si la solicitud es ACEPTADA, crear el chat
    if (status === 'aceptado' && request) {
      try {
        const chatId = await createChat(
          requestId,
          request.clientId,
          request.clientName,
          request.providerId,
          request.providerName
        );
        console.log('✅ Chat creado para la solicitud:', chatId);
      } catch (chatError) {
        console.error('Error creando chat:', chatError);
        // No bloqueamos la actualización si falla el chat
      }
    }

    // ✅ Notificar al cliente
    if (request) {
      const statusMessages: Record<string, { title: string; message: string }> = {
        aceptado: {
          title: `✅ Solicitud aceptada por ${request.providerName}`,
          message: `${request.providerName} ha aceptado tu solicitud. Contacto: ${whatsappContact || request.providerName}`,
        },
        rechazado: {
          title: `❌ Solicitud rechazada por ${request.providerName}`,
          message: `${request.providerName} ha rechazado tu solicitud. Motivo: ${response || 'No especificado'}`,
        },
        'en-progreso': {
          title: `🔄 Solicitud en progreso`,
          message: `${request.providerName} está trabajando en tu solicitud`,
        },
        completado: {
          title: `✅ Solicitud completada`,
          message: `${request.providerName} ha completado tu solicitud`,
        },
      };

      const notification = statusMessages[status];
      if (notification) {
        await createNotification(
          request.clientId,
          notification.title,
          notification.message,
          'response',
          `/dashboard/requests/${requestId}`
        );
      }
    }
  } catch (error) {
    console.error('Error actualizando solicitud:', error);
    throw new Error('Error al actualizar la solicitud');
  }
};

// ✅ Obtener solicitudes filtradas
export const getFilteredRequests = async (
  userId: string,
  role: 'client' | 'provider',
  filters: RequestFilterOptions = {}
): Promise<Request[]> => {
  try {
    const dbInstance = getDb();
    const requestsRef = collection(dbInstance, 'requests');
    const constraints = [];

    // ✅ Filtro por usuario
    if (role === 'client') {
      constraints.push(where('clientId', '==', userId));
    } else {
      constraints.push(where('providerId', '==', userId));
    }

    // ✅ Filtro por estado
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }

    // ✅ Filtro por categoría
    if (filters.category) {
      constraints.push(where('category', '==', filters.category));
    }

    // ✅ Filtro por urgencia
    if (filters.urgency) {
      constraints.push(where('urgency', '==', filters.urgency));
    }

    // ✅ Ordenar por fecha
    constraints.push(orderBy('createdAt', 'desc'));

    const q = query(requestsRef, ...constraints);
    const snapshot = await getDocs(q);
    const requests: Request[] = [];
    snapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() } as Request);
    });

    // ✅ Filtro por búsqueda (cliente)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return requests.filter(
        (r) =>
          r.clientName.toLowerCase().includes(search) ||
          r.providerName.toLowerCase().includes(search) ||
          r.category.toLowerCase().includes(search) ||
          r.description.toLowerCase().includes(search)
      );
    }

    return requests;
  } catch (error) {
    console.error('Error obteniendo solicitudes filtradas:', error);
    return [];
  }
};

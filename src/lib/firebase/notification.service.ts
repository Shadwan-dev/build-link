import { log } from '@/lib/utils/logger';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  limit,
  onSnapshot, // ✅ Importar para tiempo real
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Unsubscribe,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from './config';

export type NotificationType = 'message' | 'request' | 'response' | 'system' | 'review';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationCount {
  total: number;
  unread: number;
}

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ============================================
// 1️⃣ CREAR NOTIFICACIÓN
// ============================================
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: NotificationType,
  link?: string
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const notificationsRef = collection(dbInstance, 'notifications');
    const docRef = doc(notificationsRef);

    const notificationData = {
      userId,
      title,
      message,
      type,
      read: false,
      link: link || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, notificationData);

    // ✅ Toast feedback
    if (type === 'request') {
      toast.success('📩 Nueva notificación de solicitud');
    } else if (type === 'response') {
      toast.success('✅ Respuesta recibida');
    } else if (type === 'review') {
      toast.success('⭐ Nueva valoración recibida');
    }

    log.info('✅ Notificación creada:', title);
    return docRef.id;
  } catch (error) {
    log.error('❌ Error creando notificación:', error);
    toast.error('Error al crear notificación');
    throw new Error('Error al crear notificación');
  }
};

// ============================================
// 2️⃣ OBTENER NOTIFICACIONES DE UN USUARIO
// ============================================
export const getUserNotifications = async (
  userId: string,
  limitCount: number = 20
): Promise<Notification[]> => {
  try {
    const dbInstance = getDb();
    const notificationsRef = collection(dbInstance, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    const notifications: Notification[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      notifications.push({
        id: doc.id,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        read: data.read || false,
        link: data.link || '',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
      });
    });
    return notifications;
  } catch (error) {
    log.error('❌ Error obteniendo notificaciones:', error);
    toast.error('Error al cargar notificaciones');
    return [];
  }
};

// ============================================
// 3️⃣ CONTAR NOTIFICACIONES
// ============================================
export const getNotificationCount = async (userId: string): Promise<NotificationCount> => {
  try {
    const dbInstance = getDb();

    const totalQuery = query(
      collection(dbInstance, 'notifications'),
      where('userId', '==', userId)
    );
    const totalSnapshot = await getDocs(totalQuery);
    const total = totalSnapshot.size;

    const unreadQuery = query(
      collection(dbInstance, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    const unreadSnapshot = await getDocs(unreadQuery);
    const unread = unreadSnapshot.size;

    return { total, unread };
  } catch (error) {
    log.error('❌ Error contando notificaciones:', error);
    return { total: 0, unread: 0 };
  }
};

// ============================================
// 4️⃣ MARCAR NOTIFICACIÓN COMO LEÍDA
// ============================================
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const notificationRef = doc(dbInstance, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
      updatedAt: serverTimestamp(),
    });
    log.info('✅ Notificación marcada como leída');
  } catch (error) {
    log.error('❌ Error marcando notificación:', error);
    toast.error('Error al actualizar notificación');
  }
};

// ============================================
// 5️⃣ MARCAR TODAS LAS NOTIFICACIONES COMO LEÍDAS
// ============================================
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const notificationsRef = collection(dbInstance, 'notifications');
    const q = query(notificationsRef, where('userId', '==', userId), where('read', '==', false));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      toast('No hay notificaciones pendientes', {
        icon: 'ℹ️',
        duration: 2000,
      });
      return;
    }

    const batch = writeBatch(dbInstance);
    snapshot.forEach((doc) => {
      batch.update(doc.ref, {
        read: true,
        updatedAt: serverTimestamp(),
      });
    });
    await batch.commit();

    toast.success('✅ Todas las notificaciones marcadas como leídas');
  } catch (error) {
    log.error('❌ Error marcando notificaciones:', error);
    toast.error('Error al marcar notificaciones como leídas');
  }
};

// ============================================
// 6️⃣ ELIMINAR NOTIFICACIONES
// ============================================
export const deleteAllNotifications = async (userId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const q = query(collection(dbInstance, 'notifications'), where('userId', '==', userId));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      toast('No hay notificaciones para eliminar', {
        icon: 'ℹ️',
        duration: 2000,
      });
      return;
    }

    const batch = writeBatch(dbInstance);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    toast.success('🗑️ Notificaciones eliminadas');
  } catch (error) {
    log.error('❌ Error eliminando notificaciones:', error);
    toast.error('Error al eliminar notificaciones');
  }
};

// ============================================
// 7️⃣ SUSCRIBIRSE A NOTIFICACIONES EN TIEMPO REAL ✅
// ============================================
export const subscribeToNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void
): Unsubscribe => {
  try {
    const dbInstance = getDb();

    // ✅ Consulta para obtener notificaciones del usuario
    const q = query(
      collection(dbInstance, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    // ✅ Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications: Notification[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        notifications.push({
          id: doc.id,
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: data.type,
          read: data.read || false,
          link: data.link || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        });
      });

      // ✅ Ejecutar callback con los datos actualizados
      callback(notifications);
    });

    return unsubscribe;
  } catch (error) {
    log.error('❌ Error suscribiéndose a notificaciones:', error);
    // ✅ Devolver una función vacía en caso de error
    return () => {};
  }
};

// ============================================
// 8️⃣ SUSCRIBIRSE SOLO A NOTIFICACIONES NO LEÍDAS
// ============================================
export const subscribeToUnreadNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void
): Unsubscribe => {
  try {
    const dbInstance = getDb();

    const q = query(
      collection(dbInstance, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifications: Notification[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        notifications.push({
          id: doc.id,
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: data.type,
          read: data.read || false,
          link: data.link || '',
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        });
      });

      callback(notifications);
    });

    return unsubscribe;
  } catch (error) {
    log.error('❌ Error suscribiéndose a notificaciones no leídas:', error);
    return () => {};
  }
};

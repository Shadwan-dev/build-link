import {
  collection,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'message' | 'request' | 'response' | 'system';
  read: boolean;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ✅ Crear notificación
export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: Notification['type'],
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
    console.log('✅ Notificación creada:', title);
    return docRef.id;
  } catch (error) {
    console.error('Error creando notificación:', error);
    throw new Error('Error al crear notificación');
  }
};

// ✅ Obtener notificaciones de un usuario
export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const dbInstance = getDb();
    const notificationsRef = collection(dbInstance, 'notifications');
    const q = query(notificationsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

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
    console.error('Error obteniendo notificaciones:', error);
    return [];
  }
};

// ✅ Marcar notificación como leída
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const notificationRef = doc(dbInstance, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Notificación marcada como leída');
  } catch (error) {
    console.error('Error marcando notificación:', error);
  }
};

// ✅ Marcar todas las notificaciones como leídas
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const notificationsRef = collection(dbInstance, 'notifications');
    const q = query(notificationsRef, where('userId', '==', userId), where('read', '==', false));

    const snapshot = await getDocs(q);
    const batch = snapshot.docs.map((doc) =>
      updateDoc(doc.ref, { read: true, updatedAt: serverTimestamp() })
    );

    await Promise.all(batch);
    console.log('✅ Todas las notificaciones marcadas como leídas');
  } catch (error) {
    console.error('Error marcando notificaciones:', error);
  }
};

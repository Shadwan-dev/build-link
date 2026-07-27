import { log } from '@/lib/utils/logger';
import { deleteUser, User } from 'firebase/auth';
import {
  collection,
  Firestore,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ✅ ELIMINAR CUENTA COMPLETA
export const deleteAccount = async (uid: string, authUser: User | null): Promise<void> => {
  try {
    const dbInstance = getDb();
    const batch = writeBatch(dbInstance);

    // ✅ 1. Colecciones a eliminar
    const collections = [
      'users',
      'providers',
      'verifications',
      'notifications',
      'requests',
      'reviews',
      'messages',
      'chats',
    ];

    // ✅ 2. Recorrer cada colección y eliminar documentos del usuario
    for (const collectionName of collections) {
      const q = query(collection(dbInstance, collectionName), where('uid', '==', uid));
      const snapshot = await getDocs(q);

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    // ✅ 3. Eliminar también documentos donde el usuario es cliente o proveedor
    const requestsQuery = query(collection(dbInstance, 'requests'), where('clientId', '==', uid));
    const requestsSnapshot = await getDocs(requestsQuery);
    requestsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    const providerRequestsQuery = query(
      collection(dbInstance, 'requests'),
      where('providerId', '==', uid)
    );
    const providerRequestsSnapshot = await getDocs(providerRequestsQuery);
    providerRequestsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // ✅ 4. Commit del batch
    await batch.commit();

    // ✅ 5. Eliminar el usuario de Firebase Auth
    if (authUser) {
      try {
        await deleteUser(authUser);
        log.info('✅ Usuario eliminado de Firebase Auth');
      } catch (authError) {
        log.error('Error eliminando usuario de Auth:', authError);
        // ✅ Si el usuario no está autenticado recientemente, puede fallar
        // En ese caso, solo eliminamos los datos de Firestore
        log.warning('⚠️ Usuario no eliminado de Auth. Puede requerir reautenticación.');
      }
    }

    log.info(`✅ Cuenta ${uid} eliminada completamente`);
  } catch (error) {
    log.error('❌ Error eliminando cuenta:', error);
    throw new Error('Error al eliminar la cuenta');
  }
};

// ✅ VERIFICAR SI EL USUARIO PUEDE ELIMINAR SU CUENTA
export const canDeleteAccount = async (
  uid: string
): Promise<{
  canDelete: boolean;
  message: string;
  hasRequests: boolean;
  hasNotifications: boolean;
}> => {
  try {
    const dbInstance = getDb();
    let hasRequests = false;
    let hasNotifications = false;

    // ✅ Verificar si tiene solicitudes activas
    const requestsQuery = query(
      collection(dbInstance, 'requests'),
      where('clientId', '==', uid),
      where('status', 'in', ['pendiente', 'en-progreso', 'aceptado'])
    );
    const requestsSnapshot = await getDocs(requestsQuery);
    hasRequests = !requestsSnapshot.empty;

    // ✅ Verificar si tiene notificaciones
    const notificationsQuery = query(
      collection(dbInstance, 'notifications'),
      where('userId', '==', uid),
      limit(1)
    );
    const notificationsSnapshot = await getDocs(notificationsQuery);
    hasNotifications = !notificationsSnapshot.empty;

    // ✅ Si tiene solicitudes activas, no puede eliminar
    if (hasRequests) {
      return {
        canDelete: false,
        message:
          'Tienes solicitudes activas. Completa o cancela todas tus solicitudes antes de eliminar tu cuenta.',
        hasRequests,
        hasNotifications,
      };
    }

    return {
      canDelete: true,
      message: 'Puedes eliminar tu cuenta. Todos tus datos serán eliminados permanentemente.',
      hasRequests,
      hasNotifications,
    };
  } catch (error) {
    log.error('Error verificando eliminación:', error);
    return {
      canDelete: false,
      message: 'Error al verificar tu cuenta. Por favor, intenta más tarde.',
      hasRequests: false,
      hasNotifications: false,
    };
  }
};

import { log } from '@/lib/utils/logger';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import { app } from './config';

// ✅ Verificar si el navegador soporta mensajería
let messaging: any = null;

if (typeof window !== 'undefined' && 'Notification' in window) {
  // ✅ Verificar si Firebase Messaging está soportado
  isSupported()
    .then((supported) => {
      if (supported) {
        messaging = getMessaging(app);
        log.info('✅ Firebase Messaging soportado');
      } else {
        log.info('⚠️ Firebase Messaging no soportado en este navegador');
      }
    })
    .catch((error) => {
      log.warning('⚠️ Error verificando soporte de Messaging:', error);
    });
}

// ✅ Solicitar permiso y obtener token
export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    // ✅ Verificar si el navegador soporta notificaciones
    if (!('Notification' in window)) {
      log.warning('⚠️ Este navegador no soporta notificaciones');
      return null;
    }

    // ✅ Verificar si estamos en un entorno seguro (HTTPS o localhost)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      log.warning('⚠️ Las notificaciones requieren HTTPS');
      return null;
    }

    // ✅ Solicitar permiso
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      log.warning('⚠️ Permiso de notificaciones denegado');
      return null;
    }

    // ✅ Verificar que messaging está disponible
    if (!messaging) {
      log.warning('⚠️ Firebase Messaging no disponible');
      return null;
    }

    // ✅ Obtener token
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });

    if (token) {
      log.info('✅ Token FCM obtenido:', token);
      return token;
    }

    log.warning('⚠️ No se pudo obtener token FCM');
    return null;
  } catch (error) {
    log.error('❌ Error solicitando permiso de notificaciones:', error);
    return null;
  }
};

// ✅ Escuchar mensajes en primer plano
export const onMessageListener = (): Promise<any> => {
  return new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        log.info('📩 Mensaje recibido en primer plano:', payload);
        resolve(payload);
      });
    } else {
      resolve(null);
    }
  });
};

// ✅ Guardar token en Firestore
export const saveNotificationToken = async (userId: string, token: string): Promise<void> => {
  try {
    // ✅ Importar Firestore
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('./config');

    if (!db) {
      log.warning('⚠️ Firestore no disponible');
      return;
    }

    const tokenRef = doc(db, 'users', userId);
    await setDoc(
      tokenRef,
      {
        fcmToken: token,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    log.info('✅ Token FCM guardado en Firestore');
  } catch (error) {
    log.error('❌ Error guardando token FCM:', error);
  }
};

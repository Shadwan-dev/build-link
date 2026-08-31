// lib/firebase/messaging.config.ts

import { log } from '@/lib/utils/logger';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import { app } from './config';

// ✅ Verificar si el navegador soporta mensajería
let messaging: any = null;

if (typeof window !== 'undefined' && 'Notification' in window) {
  isSupported()
    .then((supported) => {
      if (supported) {
        try {
          messaging = getMessaging(app);
          log.info('✅ Firebase Messaging soportado');
        } catch (error) {
          log.warning('⚠️ Error inicializando Messaging:', error);
          messaging = null;
        }
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

    // ✅ Verificar si estamos en un entorno seguro
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

    // ✅ Obtener y limpiar VAPID Key
    let vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;

    // ✅ Si no hay VAPID Key, desactivar notificaciones
    if (!vapidKey || vapidKey.trim() === '') {
      log.warning('⚠️ VAPID Key no configurada, notificaciones desactivadas');
      return null;
    }

    // ✅ Limpiar caracteres extraños
    vapidKey = vapidKey.trim().replace(/\s/g, '').replace(/["']/g, '');

    // ✅ Validar que la clave tenga el formato correcto (debe empezar con B o b)
    if (!vapidKey.match(/^[A-Za-z0-9_-]+$/)) {
      log.error('❌ VAPID Key contiene caracteres inválidos');
      console.warn('⚠️ VAPID Key inválida, notificaciones desactivadas');
      return null;
    }

    // ✅ Intentar obtener token
    try {
      const token = await getToken(messaging, {
        vapidKey: vapidKey,
      });

      if (token) {
        log.info('✅ Token FCM obtenido:', token);
        return token;
      }

      log.warning('⚠️ No se pudo obtener token FCM');
      return null;
    } catch (tokenError: any) {
      // ✅ Manejar errores específicos de VAPID
      if (
        tokenError.message?.includes('InvalidAccessError') ||
        tokenError.message?.includes('public key') ||
        tokenError.code === 'messaging/invalid-vapid-key'
      ) {
        log.error(
          '❌ VAPID Key inválida. Verifica que sea correcta y no tenga caracteres extraños.'
        );
        console.warn('⚠️ Las notificaciones push están desactivadas debido a VAPID Key inválida.');
        return null;
      }

      log.error('❌ Error obteniendo token FCM:', tokenError);
      return null;
    }
  } catch (error) {
    log.error('❌ Error solicitando permiso de notificaciones:', error);
    return null;
  }
};

// ✅ Escuchar mensajes en primer plano
export const onMessageListener = (): Promise<any> => {
  return new Promise((resolve) => {
    if (messaging) {
      try {
        onMessage(messaging, (payload) => {
          log.info('📩 Mensaje recibido en primer plano:', payload);
          resolve(payload);
        });
      } catch (error) {
        log.warning('⚠️ Error configurando listener de mensajes:', error);
        resolve(null);
      }
    } else {
      resolve(null);
    }
  });
};

// ✅ Guardar token en Firestore
export const saveNotificationToken = async (userId: string, token: string): Promise<void> => {
  try {
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

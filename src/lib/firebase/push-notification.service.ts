import { log } from '@/lib/utils/logger';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

// ✅ Solo para entorno servidor (API Routes)
export const sendPushNotification = async (
  userId: string,
  title: string,
  body: string,
  link?: string
) => {
  try {
    // ✅ Obtener el token del usuario desde Firestore
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(userId).get();
    const fcmToken = userDoc.data()?.fcmToken;

    if (!fcmToken) {
      log.warning(`⚠️ No FCM token found for user: ${userId}`);
      return;
    }

    // ✅ Enviar notificación
    const messaging = getMessaging();
    const message = {
      notification: {
        title,
        body,
      },
      data: {
        link: link || '/dashboard',
      },
      token: fcmToken,
    };

    const response = await messaging.send(message);
    log.info('✅ Notificación push enviada:', response);
    return response;
  } catch (error) {
    log.error('❌ Error enviando notificación push:', error);
    throw error;
  }
};

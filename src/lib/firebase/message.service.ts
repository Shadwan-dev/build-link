import { log } from '@/lib/utils/logger';
import { MessageForm, ProviderVerification } from '@/types/message.types';
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
import { db } from './config';
import { createNotification } from './notification.service'; // ✅ Importar createNotification

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ✅ Enviar mensaje formulario (versión original)
export const sendMessageForm = async (
  data: Omit<MessageForm, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const messagesRef = collection(dbInstance, 'messages');
    const docRef = doc(messagesRef);

    const messageData: MessageForm = {
      ...data,
      id: docRef.id,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
      status: 'pendiente',
    };

    await setDoc(docRef, messageData);
    return docRef.id;
  } catch (error) {
    log.error('Error enviando mensaje:', error);
    throw new Error('Error al enviar el mensaje');
  }
};

// ✅ Enviar mensaje formulario CON notificaciones
export const sendMessageFormWithNotification = async (
  data: Omit<MessageForm, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    // 1. Guardar el mensaje
    const messageId = await sendMessageForm(data);

    // 2. Crear notificación para el proveedor
    await createNotification(
      data.providerId,
      `📩 Nueva solicitud de ${data.clientName}`,
      `${data.clientName} ha enviado una solicitud para: ${data.category}`,
      'request',
      `/dashboard/messages/${messageId}`
    );

    // 3. Crear notificación para el cliente (confirmación)
    await createNotification(
      data.clientId,
      '✅ Solicitud enviada',
      `Tu solicitud para ${data.category} ha sido enviada a ${data.providerName}`,
      'response',
      `/dashboard/messages/${messageId}`
    );

    return messageId;
  } catch (error) {
    log.error('Error enviando mensaje con notificación:', error);
    throw new Error('Error al enviar el mensaje');
  }
};

// ✅ Obtener mensajes de un cliente
export const getClientMessages = async (clientId: string): Promise<MessageForm[]> => {
  try {
    const dbInstance = getDb();
    const messagesRef = collection(dbInstance, 'messages');
    const q = query(messagesRef, where('clientId', '==', clientId), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const messages: MessageForm[] = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as MessageForm);
    });
    return messages;
  } catch (error) {
    log.error('Error obteniendo mensajes:', error);
    return [];
  }
};

// ✅ Obtener mensajes de un proveedor
export const getProviderMessages = async (providerId: string): Promise<MessageForm[]> => {
  try {
    const dbInstance = getDb();
    const messagesRef = collection(dbInstance, 'messages');
    const q = query(
      messagesRef,
      where('providerId', '==', providerId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const messages: MessageForm[] = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as MessageForm);
    });
    return messages;
  } catch (error) {
    log.error('Error obteniendo mensajes:', error);
    return [];
  }
};

// ✅ Responder a un mensaje
export const respondToMessage = async (
  messageId: string,
  status: 'aceptado' | 'rechazado' | 'respondido',
  response?: string,
  whatsappContact?: string
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const messageRef = doc(dbInstance, 'messages', messageId);

    await updateDoc(messageRef, {
      status,
      response: response || '',
      whatsappContact: whatsappContact || '',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    log.error('Error respondiendo mensaje:', error);
    throw new Error('Error al responder el mensaje');
  }
};

// ✅ Obtener verificación de proveedor
export const getProviderVerification = async (
  providerId: string
): Promise<ProviderVerification | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'providerVerifications', providerId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { uid: snapshot.id, ...snapshot.data() } as ProviderVerification;
    }
    return null;
  } catch (error) {
    log.error('Error obteniendo verificación:', error);
    return null;
  }
};

// ✅ Solicitar verificación de proveedor
export const requestProviderVerification = async (
  data: Omit<ProviderVerification, 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'providerVerifications', data.uid);

    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    log.error('Error solicitando verificación:', error);
    throw new Error('Error al solicitar verificación');
  }
};

// ✅ Exportar todo
export { createNotification };

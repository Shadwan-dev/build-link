import { log } from '@/lib/utils/logger';
import { Chat, ChatMessage } from '@/types/message.types';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';
import { createNotification } from './notification.service';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ✅ Crear un chat
export const createChat = async (
  requestId: string,
  clientId: string,
  clientName: string,
  providerId: string,
  providerName: string
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const chatsRef = collection(dbInstance, 'chats');

    const existingQuery = query(chatsRef, where('requestId', '==', requestId));
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      const existingChat = existingSnapshot.docs[0];
      return existingChat.id;
    }

    const chatData: Omit<Chat, 'id'> = {
      requestId,
      clientId,
      clientName,
      providerId,
      providerName,
      unreadCount: 0,
      status: 'active',
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    const docRef = await addDoc(chatsRef, chatData);
    return docRef.id;
  } catch (error) {
    log.error('Error creando chat:', error);
    throw new Error('Error al crear el chat');
  }
};

// ✅ Enviar un mensaje
export const sendMessage = async (
  chatId: string,
  senderId: string,
  senderName: string,
  senderRole: 'client' | 'provider',
  content: string
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const messagesRef = collection(dbInstance, 'messages');

    const messageData: Omit<ChatMessage, 'id'> = {
      chatId,
      senderId,
      senderName,
      senderRole,
      content,
      read: false,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    const docRef = await addDoc(messagesRef, messageData);

    const chatRef = doc(dbInstance, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: content,
      lastMessageAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const chatDoc = await getDoc(chatRef);
    if (chatDoc.exists()) {
      const chatData = chatDoc.data() as Chat;

      const recipientId = senderId === chatData.clientId ? chatData.providerId : chatData.clientId;

      const recipientName =
        senderId === chatData.clientId ? chatData.providerName : chatData.clientName;

      await createNotification(
        recipientId,
        `💬 Nuevo mensaje de ${senderName}`,
        content.length > 60 ? content.substring(0, 60) + '...' : content,
        'message',
        `/dashboard/messages/${chatId}`
      );

      await updateDoc(chatRef, {
        unreadCount: (chatData.unreadCount || 0) + 1,
      });
    }

    return docRef.id;
  } catch (error) {
    log.error('Error enviando mensaje:', error);
    throw new Error('Error al enviar el mensaje');
  }
};

// ✅ Obtener mensajes de un chat
export const getChatMessages = async (chatId: string): Promise<ChatMessage[]> => {
  try {
    const dbInstance = getDb();
    const messagesRef = collection(dbInstance, 'messages');
    const q = query(messagesRef, where('chatId', '==', chatId), orderBy('createdAt', 'asc'));

    const snapshot = await getDocs(q);
    const messages: ChatMessage[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
      } as ChatMessage);
    });
    return messages;
  } catch (error) {
    log.error('Error obteniendo mensajes:', error);
    return [];
  }
};

// ✅ Obtener chats de un usuario
export const getUserChats = async (userId: string): Promise<Chat[]> => {
  try {
    const dbInstance = getDb();
    const chatsRef = collection(dbInstance, 'chats');
    const q = query(chatsRef, where('status', '==', 'active'), orderBy('updatedAt', 'desc'));

    const snapshot = await getDocs(q);
    const chats: Chat[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as Chat;
      if (data.clientId === userId || data.providerId === userId) {
        // ✅ Extraer id por separado y luego el resto de los datos
        const { id, ...rest } = data;
        chats.push({
          id: doc.id,
          ...rest,
        });
      }
    });
    return chats;
  } catch (error) {
    log.error('Error obteniendo chats:', error);
    return [];
  }
};

// ✅ Marcar mensajes como leídos
export const markMessagesAsRead = async (chatId: string, userId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const messagesRef = collection(dbInstance, 'messages');
    const q = query(messagesRef, where('chatId', '==', chatId), where('read', '==', false));

    const snapshot = await getDocs(q);
    const batch = snapshot.docs.map((doc) =>
      updateDoc(doc.ref, { read: true, updatedAt: serverTimestamp() })
    );

    await Promise.all(batch);

    const chatRef = doc(dbInstance, 'chats', chatId);
    await updateDoc(chatRef, {
      unreadCount: 0,
    });
  } catch (error) {
    log.error('Error marcando mensajes como leídos:', error);
  }
};

// ✅ Obtener chat por solicitud
export const getChatByRequest = async (requestId: string): Promise<Chat | null> => {
  try {
    const dbInstance = getDb();
    const chatsRef = collection(dbInstance, 'chats');
    const q = query(chatsRef, where('requestId', '==', requestId));

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data() as Chat;
      const { id, ...rest } = data;
      return { id: doc.id, ...rest } as Chat;
    }
    return null;
  } catch (error) {
    log.error('Error obteniendo chat:', error);
    return null;
  }
};

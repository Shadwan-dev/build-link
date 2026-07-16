'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import {
  getChatByRequest,
  getChatMessages,
  markMessagesAsRead,
  sendMessage,
} from '@/lib/firebase/chat.service';
import { ChatMessage } from '@/types/message.types';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { currentRole } = useRole();
  const chatId = params.id as string;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [chatInfo, setChatInfo] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadMessages = async () => {
    if (!chatId || !user) return;

    try {
      const [msgs, chat] = await Promise.all([getChatMessages(chatId), getChatByRequest(chatId)]);

      setMessages(msgs);
      setChatInfo(chat);

      // Marcar como leídos
      if (chat) {
        await markMessagesAsRead(chatId, user.uid);
      }
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    // ✅ Polling cada 3 segundos (para demostración, en producción usar WebSockets)
    intervalRef.current = setInterval(loadMessages, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [chatId, user]);

  // ✅ Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim() || sending) return;

    setSending(true);
    try {
      await sendMessage(
        chatId,
        user.uid,
        user.displayName || 'Usuario',
        currentRole || 'client',
        newMessage.trim()
      );

      setNewMessage('');
      await loadMessages();
    } catch (error) {
      toast.error('Error al enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const otherPerson = chatInfo
    ? {
        name: user?.uid === chatInfo.clientId ? chatInfo.providerName : chatInfo.clientName,
        role: user?.uid === chatInfo.clientId ? 'Proveedor' : 'Cliente',
      }
    : { name: 'Usuario', role: 'Usuario' };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/messages"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{otherPerson.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{otherPerson.role}</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 h-[500px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <p>No hay mensajes. Envía el primero.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => {
              const isOwn = msg.senderId === user?.uid;
              return (
                <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      isOwn
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${isOwn ? 'text-primary-200' : 'text-gray-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={sending || !newMessage.trim()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}

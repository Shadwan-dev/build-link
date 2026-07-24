'use client';
import { log } from '@/lib/utils/logger';

import { ChatList } from '@/components/dashboard/messages/ChatList';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getUserChats } from '@/lib/firebase/chat.service';
import { Chat } from '@/types/message.types';
import { useEffect, useState } from 'react';

export default function MessagesPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const loadChats = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUserChats(user.uid);
      setChats(data);
    } catch (error) {
      log.error('Error cargando chats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, [user]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          💬 Mensajes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {currentRole === 'provider'
            ? 'Comunícate con tus clientes'
            : 'Comunícate con tus proveedores'}
        </p>
      </div>

      <ChatList chats={chats} userId={user?.uid || ''} loading={loading} />
    </div>
  );
}

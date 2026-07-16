'use client';

import { Chat } from '@/types/message.types';
import { Briefcase, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';

interface ChatListProps {
  chats: Chat[];
  userId: string;
  loading?: boolean;
}

export const ChatList = ({ chats, userId, loading = false }: ChatListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse space-y-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No tienes conversaciones
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Los chats se abren automáticamente cuando una solicitud es aceptada
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {chats.map((chat) => {
        const otherPerson =
          userId === chat.clientId
            ? { name: chat.providerName, role: 'Proveedor' }
            : { name: chat.clientName, role: 'Cliente' };

        return (
          <Link
            key={chat.id}
            href={`/dashboard/messages/${chat.id}`}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                {userId === chat.clientId ? (
                  <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                ) : (
                  <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {otherPerson.name}
                  </h3>
                  {chat.lastMessageAt && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(chat.lastMessageAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {otherPerson.role}
                  </span>
                  <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.lastMessage || 'Sin mensajes'}
                  </span>
                </div>
              </div>

              {chat.unreadCount > 0 && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

'use client';
import { log } from '@/lib/utils/logger';

import { useAuth } from '@/contexts/AuthContext';
import {
  getUserNotifications,
  markNotificationAsRead,
  Notification,
} from '@/lib/firebase/notification.service';
import { Bell, BellRing, Briefcase, CheckCheck, Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUserNotifications(user.uid);
      setNotifications(data);
    } catch (error) {
      log.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (error) {
      toast.error('Error al marcar como leída');
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'request':
        return <Briefcase className="w-5 h-5" />;
      case 'response':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <BellRing className="w-5 h-5" />;
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'text-blue-500';
      case 'request':
        return 'text-yellow-500';
      case 'response':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📬 Notificaciones</h1>
        <button
          onClick={() => {
            notifications.forEach((n) => {
              if (!n.read) handleMarkAsRead(n.id);
            });
          }}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
        >
          <CheckCheck className="w-4 h-4" />
          Marcar todas como leídas
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No tienes notificaciones
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Cuando recibas notificaciones, aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition ${
                !notification.read
                  ? 'border-l-4 border-l-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${getColor(notification.type)}`}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex-shrink-0"
                      >
                        Marcar leída
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                  {notification.link && (
                    <Link
                      href={notification.link}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-2 inline-block"
                    >
                      Ver detalles →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

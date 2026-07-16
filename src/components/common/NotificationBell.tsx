'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  Notification,
} from '@/lib/firebase/notification.service';
import { Bell, BellRing, Briefcase, CheckCheck, Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log('🔔 NotificationBell renderizado', { user: user?.uid, unreadCount });

  // ✅ Cargar notificaciones
  const loadNotifications = async () => {
    console.log('📡 Cargando notificaciones...');
    if (!user) {
      console.log('⚠️ No hay usuario, saltando carga');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getUserNotifications(user.uid);
      console.log('🔔 Notificaciones cargadas:', data.length);
      setNotifications(data);
      const unread = data.filter((n) => !n.read).length;
      setUnreadCount(unread);
      console.log(`📬 ${unread} notificaciones sin leer`);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cargar al montar y cada 30 segundos
  useEffect(() => {
    console.log('🔔 useEffect - Cargando notificaciones iniciales');
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // ✅ Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = async () => {
    console.log('🔄 Toggle dropdown:', !isOpen);
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState && user) {
      await loadNotifications();
    }
  };

  // ✅ Si no hay usuario, no renderizar
  if (!user) {
    console.log('⛔ No hay usuario, NotificationBell no se renderiza');
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ✅ Botón de campana */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* ✅ Dropdown de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[500px] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notificaciones</h3>
            {unreadCount > 0 && (
              <button
                onClick={async () => {
                  try {
                    await markAllNotificationsAsRead(user.uid);
                    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                    setUnreadCount(0);
                    toast.success('✅ Todas marcadas como leídas');
                  } catch (error) {
                    toast.error('Error al marcar todas');
                  }
                }}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3 h-3" />
                Marcar todas
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">No tienes notificaciones</p>
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition ${
                    !notification.read
                      ? 'bg-primary-50 dark:bg-primary-900/10 border-l-4 border-l-primary-500'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {notification.type === 'message' && (
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      )}
                      {notification.type === 'request' && (
                        <Briefcase className="w-4 h-4 text-yellow-500" />
                      )}
                      {notification.type === 'response' && (
                        <MessageSquare className="w-4 h-4 text-green-500" />
                      )}
                      {notification.type === 'system' && (
                        <BellRing className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={async () => {
                              try {
                                await markNotificationAsRead(notification.id);
                                setNotifications((prev) =>
                                  prev.map((n) =>
                                    n.id === notification.id ? { ...n, read: true } : n
                                  )
                                );
                                setUnreadCount((prev) => Math.max(0, prev - 1));
                              } catch (error) {
                                toast.error('Error al marcar como leída');
                              }
                            }}
                            className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                          >
                            Marcar leída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-800/50">
              <Link
                href="/dashboard/notifications"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                onClick={() => setIsOpen(false)}
              >
                Ver todas las notificaciones
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

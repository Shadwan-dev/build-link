'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  Notification,
  subscribeToNotifications, // ✅ Importar para tiempo real
} from '@/lib/firebase/notification.service';
import { Bell, BellRing, Briefcase, CheckCheck, Loader2, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

// ✅ Mapeo de tipos a iconos
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="w-4 h-4 text-blue-500" />;
    case 'request':
      return <Briefcase className="w-4 h-4 text-yellow-500" />;
    case 'response':
      return <MessageSquare className="w-4 h-4 text-green-500" />;
    case 'review':
      return <span className="text-yellow-500">⭐</span>;
    case 'system':
      return <BellRing className="w-4 h-4 text-gray-500" />;
    default:
      return <BellRing className="w-4 h-4 text-gray-400" />;
  }
};

// ✅ Formatear fecha relativa
const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) return 'Hace unos segundos';
  if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} minutos`;
  if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
  if (diff < 604800000) return `Hace ${Math.floor(diff / 86400000)} días`;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

export const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  console.log('🔔 NotificationBell renderizado', { user: user?.uid, unreadCount });

  // ✅ FUNCIÓN PARA CARGAR NOTIFICACIONES (una sola vez)
  const loadNotifications = async () => {
    if (!user) {
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
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUSCRIPCIÓN EN TIEMPO REAL (reemplaza el interval)
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log('🔔 Suscribiendo a notificaciones en tiempo real...');

    // ✅ Cargar notificaciones iniciales
    loadNotifications();

    // ✅ Suscribirse a cambios en tiempo real
    const unsubscribe = subscribeToNotifications(user.uid, (newNotifications) => {
      console.log('📩 Notificaciones actualizadas en tiempo real:', newNotifications.length);
      setNotifications(newNotifications);
      const unread = newNotifications.filter((n) => !n.read).length;
      setUnreadCount(unread);

      // ✅ Si hay nuevas notificaciones no leídas, mostrar toast (opcional)
      const previousUnread = notifications.filter((n) => !n.read).length;
      if (unread > previousUnread) {
        toast(`📬 ${unread - previousUnread} notificación(es) nueva(s)`, {
          icon: '🔔',
          duration: 3000,
        });
      }
    });

    unsubscribeRef.current = unsubscribe;

    // ✅ Limpiar suscripción al desmontar
    return () => {
      console.log('🔕 Cancelando suscripción a notificaciones');
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
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

  // ✅ Alternar dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Marcar notificación como leída (con actualización optimista)
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);

      // ✅ Actualizar estado local optimistamente
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      toast.success('✅ Marcada como leída');
    } catch (error) {
      toast.error('Error al marcar como leída');
      // ✅ Revertir cambios en caso de error
      await loadNotifications();
    }
  };

  // ✅ Marcar todas como leídas
  const handleMarkAllAsRead = async () => {
    if (!user) return;

    try {
      await markAllNotificationsAsRead(user.uid);

      // ✅ Actualizar estado local
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);

      toast.success('✅ Todas las notificaciones marcadas como leídas');
    } catch (error) {
      toast.error('Error al marcar todas como leídas');
    }
  };

  // ✅ Si no hay usuario, no renderizar
  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de campana */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
        aria-label="Notificaciones"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[500px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Notificaciones
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                  {unreadCount} nuevas
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Leer todas
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lista de notificaciones */}
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
              notifications.slice(0, 20).map((notification) => (
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
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-gray-900 dark:text-white`}
                        >
                          {notification.title}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {formatTime(notification.createdAt)}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
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

          {/* Footer */}
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

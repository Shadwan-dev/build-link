'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
  onMessageListener,
  requestNotificationPermission,
  saveNotificationToken,
} from '@/lib/firebase/messaging.config';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const PushNotificationManager = () => {
  const { user } = useAuth();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ✅ Verificar si el navegador soporta Service Workers
  const supportsServiceWorker = () => {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  };

  // ✅ Registrar Service Worker
  const registerServiceWorker = async () => {
    if (!supportsServiceWorker()) {
      console.warn('⚠️ Service Workers no soportados');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('✅ Service Worker registrado:', registration);
      return true;
    } catch (error) {
      console.error('❌ Error registrando Service Worker:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!user) return;

    // ✅ Configurar notificaciones push
    const setupPushNotifications = async () => {
      try {
        // ✅ 1. Registrar Service Worker
        const swRegistered = await registerServiceWorker();
        if (!swRegistered) {
          console.warn('⚠️ Service Worker no registrado');
          return;
        }

        // ✅ 2. Solicitar permiso y obtener token
        const token = await requestNotificationPermission();
        if (token) {
          // ✅ 3. Guardar token en Firestore
          await saveNotificationToken(user.uid, token);
          setPermissionGranted(true);
          setIsSubscribed(true);
          console.log('✅ Push notifications activadas');
          toast.success('🔔 Notificaciones activadas');
        } else {
          console.warn('⚠️ No se pudo obtener token de notificaciones');
        }
      } catch (error) {
        console.error('❌ Error activando push notifications:', error);
      }
    };

    // ✅ Solo si el navegador soporta notificaciones
    if (supportsServiceWorker()) {
      // ✅ Si ya tiene permiso, configurar directamente
      if (Notification.permission === 'granted') {
        setupPushNotifications();
      }
      // ✅ Si no ha decidido, esperar interacción del usuario
      else if (Notification.permission === 'default') {
        const handleUserInteraction = () => {
          setupPushNotifications();
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        return () => {
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('keydown', handleUserInteraction);
        };
      }
    } else {
      console.warn('⚠️ Push notifications no soportadas en este navegador');
    }
  }, [user]);

  // ✅ Escuchar mensajes en primer plano
  useEffect(() => {
    if (!permissionGranted) return;

    // ✅ Escuchar mensajes mientras la app está abierta
    const handleMessage = async () => {
      const payload = await onMessageListener();
      if (payload) {
        console.log('📩 Mensaje en primer plano:', payload);

        // ✅ Mostrar toast con la notificación
        const notification = payload.notification;
        if (notification) {
          const link = payload.data?.link || '/dashboard';

          // ✅ Crear toast con acción personalizada
          toast(
            (t) => (
              <div
                className="flex flex-col gap-1 cursor-pointer"
                onClick={() => {
                  toast.dismiss(t.id);
                  window.location.href = link;
                }}
              >
                <p className="font-medium text-gray-900 dark:text-white">
                  {notification.title || 'Nueva notificación'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notification.body || 'Tienes una nueva notificación'}
                </p>
              </div>
            ),
            {
              icon: '🔔',
              duration: 5000,
            }
          );
        }
      }
    };

    handleMessage();
  }, [permissionGranted]);

  return null;
};

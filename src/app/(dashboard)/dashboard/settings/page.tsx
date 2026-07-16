'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Bell,
  BellOff,
  Languages,
  Loader2,
  LogOut,
  Mail,
  MailX,
  Moon,
  Save,
  Shield,
  Sun,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, logout, refreshUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currentRole } = useRole();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      requests: true,
      messages: true,
    },
    language: 'es',
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications],
      },
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      localStorage.setItem('user-settings', JSON.stringify(settings));
      toast.success('✅ Configuración guardada');
    } catch (error) {
      console.error('Error guardando configuración:', error);
      toast.error('Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  // Cargar configuración guardada
  useState(() => {
    try {
      const saved = localStorage.getItem('user-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      }
    } catch (error) {
      console.error('Error cargando configuración:', error);
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          ⚙️ Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Personaliza tu experiencia en BuildLink
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        {/* Apariencia */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🌓 Apariencia
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <span>Modo claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-blue-500" />
                  <span>Modo oscuro</span>
                </>
              )}
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {theme === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
            </span>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔔 Notificaciones
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.notifications.email ? (
                  <Mail className="w-5 h-5 text-primary-500" />
                ) : (
                  <MailX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Notificaciones por email
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibe notificaciones en tu correo
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('email')}
                className={`relative w-12 h-6 rounded-full transition ${settings.notifications.email ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${settings.notifications.email ? 'right-0.5' : 'left-0.5'}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.notifications.push ? (
                  <Bell className="w-5 h-5 text-primary-500" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Notificaciones push</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Notificaciones en tiempo real
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('push')}
                className={`relative w-12 h-6 rounded-full transition ${settings.notifications.push ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${settings.notifications.push ? 'right-0.5' : 'left-0.5'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Idioma */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🌐 Idioma</h2>
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-gray-500" />
            <select
              value={settings.language}
              onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Seguridad */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🛡️ Seguridad</h2>
          <button
            onClick={() => toast('🛡️ Función disponible próximamente', { icon: '🔒' })}
            className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <Shield className="w-5 h-5 text-gray-500" />
            <span>Cambiar contraseña</span>
          </button>
        </div>

        {/* Sesión */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔐 Sesión</h2>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>

        {/* Guardar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar configuración
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

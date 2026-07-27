'use client';

import { DeleteAccountModal } from '@/components/settings/DeleteAccountModal';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { useTheme } from '@/contexts/ThemeContext';
import { log } from '@/lib/utils/logger';
import {
  AlertTriangle,
  Bell,
  BellOff,
  CheckCircle,
  Globe,
  Languages,
  Loader2,
  LogOut,
  Mail,
  MailX,
  Moon,
  Save,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, logout, refreshUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currentRole } = useRole();
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      requests: true,
      messages: true,
    },
    language: 'es',
    privacy: {
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  });

  // ✅ Cargar configuración guardada
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      }
    } catch (error) {
      log.error('Error cargando configuración:', error);
    }
  }, []);

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications],
      },
    }));
  };

  const handlePrivacyToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key as keyof typeof prev.privacy],
      },
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      localStorage.setItem('user-settings', JSON.stringify(settings));
      toast.success('✅ Configuración guardada correctamente');
    } catch (error) {
      log.error('Error guardando configuración:', error);
      toast.error('Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          ⚙️ Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Personaliza tu experiencia en MiMaestro
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal - Configuraciones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información de la cuenta */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" />
              Información de la cuenta
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Email</span>
                <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Nombre</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {user?.displayName}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Rol</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {currentRole || 'Sin rol'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Estado de cuenta</span>
                <span className="font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Activa
                </span>
              </div>
            </div>
          </div>

          {/* Apariencia */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🌓 Apariencia
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
                {theme === 'dark' ? '🌙 Oscuro activo' : '☀️ Claro activo'}
              </span>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🔔 Notificaciones
            </h2>
            <div className="space-y-4">
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
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.notifications.email ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.notifications.email ? 'right-0.5' : 'left-0.5'
                    }`}
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
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.notifications.push ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.notifications.push ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Idioma */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🌐 Idioma</h2>
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-gray-500" />
              <select
                value={settings.language}
                onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="es">🇪🇸 Español</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>

          {/* Privacidad */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🔒 Privacidad
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mostrar email</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Visible en tu perfil público
                  </p>
                </div>
                <button
                  onClick={() => handlePrivacyToggle('showEmail')}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.privacy.showEmail ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.privacy.showEmail ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mostrar teléfono</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Visible en tu perfil público
                  </p>
                </div>
                <button
                  onClick={() => handlePrivacyToggle('showPhone')}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.privacy.showPhone ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.privacy.showPhone ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mostrar ubicación</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Visible en tu perfil público
                  </p>
                </div>
                <button
                  onClick={() => handlePrivacyToggle('showLocation')}
                  className={`relative w-12 h-6 rounded-full transition ${
                    settings.privacy.showLocation
                      ? 'bg-primary-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                      settings.privacy.showLocation ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Guardar */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-4 animate-spin" />
                Guardando configuración...
              </>
            ) : (
              <>
                <Save className="w-5 h-4" />
                Guardar configuración
              </>
            )}
          </button>
        </div>

        {/* Columna lateral - Acciones */}
        <div className="space-y-6">
          {/* Sesión */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-500" />
              Sesión
            </h2>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>

          {/* Seguridad */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-500" />
              Seguridad
            </h2>
            <button
              onClick={() => toast('🛡️ Función disponible próximamente', { icon: '🔒' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <Smartphone className="w-5 h-5 text-gray-500" />
              <span>Verificación en dos pasos</span>
            </button>
            <button
              onClick={() => toast('🛡️ Función disponible próximamente', { icon: '🔒' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition mt-2"
            >
              <Shield className="w-5 h-5 text-gray-500" />
              <span>Cambiar contraseña</span>
            </button>
          </div>

          {/* Zona de peligro */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-red-200 dark:border-red-800 p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Zona de peligro
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Elimina tu cuenta permanentemente. Esta acción no se puede deshacer.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de eliminación */}
      <DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </div>
  );
}

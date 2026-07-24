'use client';
import { log } from '@/lib/utils/logger';

import { BuildLinkLogo } from '@/components/common/BuildLinkLogo';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Check, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface RoleSelectorProps {
  onRoleSelected?: () => void;
}

export const RoleSelector = ({ onRoleSelected }: RoleSelectorProps) => {
  const { user, updateUser, refreshUser } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'client' | 'provider' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectRole = async () => {
    if (!selectedRole) {
      toast.error('Selecciona un rol para continuar');
      return;
    }

    if (!user) {
      toast.error('Usuario no autenticado');
      return;
    }

    setLoading(true);
    try {
      // Actualizar el rol del usuario en Firestore
      await updateUser({
        role: selectedRole,
        // Si es proveedor, añadir campos adicionales básicos
        ...(selectedRole === 'provider' && {
          specialties: [],
          rating: 0,
          totalRatings: 0,
          isActive: true,
        }),
      });

      // Recargar datos del usuario
      await refreshUser();

      toast.success(
        `¡Perfecto! Ahora eres un ${selectedRole === 'client' ? 'Cliente' : 'Proveedor'}`
      );

      if (onRoleSelected) {
        onRoleSelected();
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      log.error('Error seleccionando rol:', error);
      toast.error(error.message || 'Error al seleccionar rol');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BuildLinkLogo size="xl" showTagline={true} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Elige tu rol en BuildLink
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">¿Cómo quieres usar BuildLink?</p>
        </div>

        {/* Opciones de rol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Opción Cliente */}
          <button
            onClick={() => setSelectedRole('client')}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              selectedRole === 'client'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedRole === 'client'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cliente</h3>
                  {selectedRole === 'client' && <Check className="w-5 h-5 text-primary-500" />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Busco contratar servicios de construcción, albañilería, carpintería y más.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <li>✅ Publicar solicitudes de trabajo</li>
                  <li>✅ Recibir presupuestos de profesionales</li>
                  <li>✅ Calificar y comentar servicios</li>
                </ul>
              </div>
            </div>
          </button>

          {/* Opción Proveedor */}
          <button
            onClick={() => setSelectedRole('provider')}
            className={`p-6 rounded-2xl border-2 transition-all text-left ${
              selectedRole === 'provider'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedRole === 'provider'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Proveedor</h3>
                  {selectedRole === 'provider' && <Check className="w-5 h-5 text-primary-500" />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ofrezco servicios profesionales en construcción, albañilería, carpintería y más.
                </p>
                <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <li>✅ Recibir solicitudes de clientes</li>
                  <li>✅ Enviar presupuestos y ofertas</li>
                  <li>✅ Mostrar tu portafolio y calificaciones</li>
                </ul>
              </div>
            </div>
          </button>
        </div>

        {/* Botón de confirmación */}
        <button
          onClick={handleSelectRole}
          disabled={!selectedRole || loading}
          className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Configurando tu cuenta...
            </>
          ) : (
            <>
              {selectedRole
                ? `Continuar como ${selectedRole === 'client' ? 'Cliente' : 'Proveedor'}`
                : 'Selecciona un rol'}
            </>
          )}
        </button>

        {/* Footer informativo */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Puedes cambiar tu rol más adelante desde la configuración de tu perfil.
        </p>
      </div>
    </div>
  );
};

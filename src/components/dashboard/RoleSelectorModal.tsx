'use client';

import { useRole } from '@/contexts/RoleContext';
import { Briefcase, Check, Loader2, Shield, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface RoleSelectorModalProps {
  onComplete?: () => void;
}

export const RoleSelectorModal = ({ onComplete }: RoleSelectorModalProps) => {
  const { setRole, isLoading } = useRole();
  const [selectedRole, setSelectedRole] = useState<'client' | 'provider' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleSelectRole = async () => {
    if (!selectedRole) {
      toast.error('Selecciona un rol para continuar');
      return;
    }

    setLoading(true);
    setError(null);

    // ⏱️ Timeout de 10 segundos
    const timeout = setTimeout(() => {
      setLoading(false);
      setError('La operación está tomando demasiado tiempo. Verifica tu conexión.');
      toast.error('⏱️ Timeout - Verifica tu conexión a internet');
    }, 10000);

    setTimeoutId(timeout);

    try {
      console.log(`🔄 Intentando asignar rol: ${selectedRole}`);

      // ✅ Guardar en localStorage como respaldo
      localStorage.setItem('user-role', selectedRole);

      await setRole(selectedRole);

      if (timeoutId) clearTimeout(timeoutId);

      toast.success(
        `¡Perfecto! Ahora eres un ${selectedRole === 'client' ? 'Cliente' : 'Proveedor'}`
      );

      if (onComplete) {
        onComplete();
      }
    } catch (error: any) {
      console.error('Error seleccionando rol:', error);

      let errorMessage = error.message || 'Error al seleccionar rol';
      if (errorMessage.includes('offline') || errorMessage.includes('network')) {
        errorMessage = '📶 Error de conexión. Verifica tu internet y vuelve a intentar.';
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Elige tu rol</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selecciona cómo quieres usar BuildLink
              </p>
            </div>
          </div>
          {/* ✅ CORREGIDO: toast.info → toast */}
          <button
            onClick={() => toast('Debes seleccionar un rol para continuar', { icon: 'ℹ️' })}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
            <span>{error}</span>
          </div>
        )}

        {/* Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Cliente */}
          <button
            onClick={() => setSelectedRole('client')}
            className={`p-5 rounded-xl border-2 transition-all text-left ${
              selectedRole === 'client'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg ring-2 ring-primary-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedRole === 'client'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Cliente</h3>
                  {selectedRole === 'client' && <Check className="w-4 h-4 text-primary-500" />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Busco contratar servicios
                </p>
                <ul className="mt-2 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <li>• Publicar solicitudes</li>
                  <li>• Recibir presupuestos</li>
                  <li>• Calificar servicios</li>
                </ul>
              </div>
            </div>
          </button>

          {/* Proveedor */}
          <button
            onClick={() => setSelectedRole('provider')}
            className={`p-5 rounded-xl border-2 transition-all text-left ${
              selectedRole === 'provider'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg ring-2 ring-primary-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedRole === 'provider'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Proveedor</h3>
                  {selectedRole === 'provider' && <Check className="w-4 h-4 text-primary-500" />}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ofrezco mis servicios
                </p>
                <ul className="mt-2 space-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                  <li>• Recibir solicitudes</li>
                  <li>• Enviar presupuestos</li>
                  <li>• Mostrar portafolio</li>
                </ul>
              </div>
            </div>
          </button>
        </div>

        {/* Botón confirmar */}
        <button
          onClick={handleSelectRole}
          disabled={!selectedRole || loading || isLoading}
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {loading || isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Configurando tu cuenta...
            </>
          ) : (
            <>
              {selectedRole
                ? `Continuar como ${selectedRole === 'client' ? 'Cliente' : 'Proveedor'}`
                : 'Selecciona un rol para continuar'}
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          Puedes cambiar tu rol más adelante desde el menú de usuario
        </p>
      </div>
    </div>
  );
};

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { log } from '@/lib/utils/logger';
import { Briefcase, Check, RefreshCw, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const RoleSwitcher = () => {
  const { currentRole, switchRole, isLoading } = useRole();
  const { user } = useAuth();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleSwitch = async () => {
    if (isSwitching) return;

    setIsSwitching(true);
    try {
      const newRole = currentRole === 'client' ? 'Proveedor' : 'Cliente';
      await switchRole();
      toast.success(`✅ Cambiado a modo ${newRole}`);
    } catch (error) {
      toast.error('❌ Error al cambiar de rol');
      // ✅ Convertir error a string antes de pasar a log.error
      log.error(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSwitching(false);
    }
  };

  if (!user || !currentRole) return null;

  const roleLabel = currentRole === 'client' ? 'Cliente' : 'Proveedor';
  const RoleIcon = currentRole === 'client' ? User : Briefcase;

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentRole === 'client'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
          }`}
        >
          <RoleIcon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Modo actual</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
            {roleLabel}
            <Check className="w-3 h-3 text-green-500" />
          </p>
        </div>
      </div>

      <button
        onClick={handleSwitch}
        disabled={isSwitching || isLoading}
        className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
      >
        <RefreshCw className={`w-4 h-4 ${isSwitching ? 'animate-spin' : ''}`} />
        Cambiar a {currentRole === 'client' ? 'Proveedor' : 'Cliente'}
      </button>
    </div>
  );
};

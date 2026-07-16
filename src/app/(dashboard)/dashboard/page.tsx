'use client';

import { ClientDashboard } from '@/components/dashboard/client/ClientDashboard';
import { ProviderDashboard } from '@/components/dashboard/providers/ProviderDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { currentRole, isLoading: roleLoading, refreshRole } = useRole();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ✅ Escuchar cambios de rol
  useEffect(() => {
    const handleRoleChange = () => {
      console.log('🔄 Rol cambiado, refrescando dashboard...');
      setIsRefreshing(true);
      refreshRole().finally(() => {
        setIsRefreshing(false);
      });
    };

    // Escuchar eventos personalizados
    window.addEventListener('role-changed', handleRoleChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'user-role') {
        handleRoleChange();
      }
    });

    return () => {
      window.removeEventListener('role-changed', handleRoleChange);
    };
  }, [refreshRole]);

  if (loading || roleLoading || isRefreshing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {isRefreshing ? 'Actualizando dashboard...' : 'Cargando dashboard...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {currentRole === 'provider' ? <ProviderDashboard /> : <ClientDashboard />}
    </div>
  );
}

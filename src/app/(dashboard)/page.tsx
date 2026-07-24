'use client';
import { log } from '@/lib/utils/logger';

import { ClientDashboard } from '@/components/dashboard/client/ClientDashboard';
import { ProviderDashboard } from '@/components/dashboard/providers/ProviderDashboard';
import { RoleSelector } from '@/components/dashboard/RoleSelector';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { currentRole, hasRole, isLoading: roleLoading } = useRole();

  // ✅ Estado de carga
  if (loading || roleLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // ✅ Si el usuario no tiene rol, mostrar selector (pantalla completa)
  if (user && !hasRole) {
    return <RoleSelector />;
  }

  // ✅ Dashboard principal
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Switcher de rol - solo visible si tiene rol */}
      {hasRole && (
        <div className="flex justify-end">
          <RoleSwitcher />
        </div>
      )}

      {/* Dashboard según el rol */}
      {currentRole === 'provider' ? <ProviderDashboard /> : <ClientDashboard />}
    </div>
  );
}

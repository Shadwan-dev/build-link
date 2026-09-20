// app/(dashboard)/page.tsx
'use client';

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

  // ✅ Si el usuario no tiene rol, mostrar selector
  if (user && !hasRole) {
    return <RoleSelector />;
  }

  // ✅ Dashboard normal
  return (
    <div className="space-y-6 animate-fade-in">
      {hasRole && (
        <div className="flex justify-end">
          <RoleSwitcher />
        </div>
      )}
      {currentRole === 'provider' ? <ProviderDashboard /> : <ClientDashboard />}
    </div>
  );
}

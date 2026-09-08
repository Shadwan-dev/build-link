// app/(dashboard)/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { isLoading: roleLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    // ✅ Redirigir a solicitudes cuando el usuario esté autenticado
    if (!loading && !roleLoading && user) {
      router.replace('/dashboard/requests');
    }
  }, [user, loading, roleLoading, router]);

  // ✅ Mostrar carga mientras se verifica autenticación
  if (loading || roleLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // ✅ Si no hay usuario, redirigir al login (el useEffect lo hará)
  if (!user) {
    return null;
  }

  return null;
}

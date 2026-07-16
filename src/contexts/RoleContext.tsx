'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type Role = 'client' | 'provider';

interface RoleContextType {
  currentRole: Role;
  setRole: (role: Role) => Promise<void>;
  switchRole: () => Promise<void>;
  refreshRole: () => Promise<void>;
  isLoading: boolean;
  isClient: boolean;
  isProvider: boolean;
  hasRole: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { user, refreshUser, updateUser, loading: authLoading } = useAuth();
  const [currentRole, setCurrentRole] = useState<Role>('client');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar rol de localStorage como respaldo
  const loadRoleFromStorage = useCallback((): Role => {
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('user-role');
      if (savedRole === 'client' || savedRole === 'provider') {
        console.log('📝 Rol cargado de localStorage:', savedRole);
        return savedRole;
      }
    }
    return 'client';
  }, []);

  const loadRole = useCallback(async () => {
    if (user) {
      console.log('📝 Usuario cargado desde Auth:', user.role);

      if (user.role === 'client' || user.role === 'provider') {
        setCurrentRole(user.role);
        localStorage.setItem('user-role', user.role);
        setIsLoading(false);
        return;
      }
    }

    const savedRole = loadRoleFromStorage();
    setCurrentRole(savedRole);
    if (savedRole) {
      localStorage.setItem('user-role', savedRole);
    }
    setIsLoading(false);
  }, [user, loadRoleFromStorage]);

  useEffect(() => {
    loadRole();
  }, [loadRole]);

  const refreshRole = useCallback(async () => {
    setIsLoading(true);
    await refreshUser();
    await loadRole();
    setIsLoading(false);
  }, [refreshUser, loadRole]);

  const setRole = useCallback(
    async (role: Role) => {
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      setIsLoading(true);
      try {
        console.log(`🔄 Actualizando rol a: ${role}`);

        setCurrentRole(role);
        localStorage.setItem('user-role', role);

        try {
          await updateUser({ role });
          console.log(`✅ Rol guardado en Firestore: ${role}`);
        } catch (firestoreError) {
          console.warn(
            '⚠️ No se pudo guardar en Firestore, pero el rol local está guardado:',
            firestoreError
          );
        }

        await refreshUser();
        console.log(`✅ Rol actualizado a: ${role}`);
      } catch (error) {
        console.error('❌ Error al actualizar rol:', error);
        const savedRole = loadRoleFromStorage();
        setCurrentRole(savedRole);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, updateUser, refreshUser, loadRoleFromStorage]
  );

  // ✅ SWITCH ROLE - VERSIÓN SIMPLIFICADA (SIN terminate)
  const switchRole = useCallback(async () => {
    if (!user) throw new Error('No hay usuario autenticado');
    if (!currentRole) throw new Error('No hay rol actual');

    const newRole = currentRole === 'client' ? 'provider' : 'client';

    setIsLoading(true);
    try {
      console.log(`🔄 Cambiando rol de ${currentRole} a ${newRole}...`);

      // ✅ 1. Actualizar el rol en el estado local (inmediato)
      setCurrentRole(newRole);
      localStorage.setItem('user-role', newRole);

      // ✅ 2. Intentar actualizar en Firestore
      try {
        await updateUser({ role: newRole });
        console.log(`✅ Rol actualizado en Firestore: ${newRole}`);
      } catch (firestoreError) {
        console.warn('⚠️ No se pudo actualizar en Firestore:', firestoreError);
        // Si Firestore falla, ya tenemos el rol en localStorage
      }

      // ✅ 3. Recargar datos
      await refreshUser();

      // ✅ 4. Notificar cambio
      window.dispatchEvent(new Event('role-changed'));

      console.log(`✅ Cambio de rol completado a: ${newRole}`);
    } catch (error) {
      console.error('❌ Error cambiando rol:', error);
      // Revertir estado local
      setCurrentRole(currentRole);
      localStorage.setItem('user-role', currentRole);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user, currentRole, updateUser, refreshUser]);

  const isClient = currentRole === 'client';
  const isProvider = currentRole === 'provider';
  const hasRole = true;

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole,
        switchRole,
        refreshRole,
        isLoading: isLoading || authLoading,
        isClient,
        isProvider,
        hasRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

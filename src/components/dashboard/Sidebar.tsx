'use client';
import { log } from '@/lib/utils/logger';

import { BuildLinkLogo } from '@/components/common/BuildLinkLogo';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import {
  BarChart3,
  Bell,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  RefreshCw,
  Settings,
  Shield,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Links base para todos los usuarios
const baseLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard', roles: ['client', 'provider'] },
];

// Links específicos para Cliente
const clientLinks = [
  { href: '/dashboard/providers', icon: Users, label: 'Proveedores', roles: ['client'] },
  { href: '/dashboard/requests', icon: FileText, label: 'Mis Solicitudes', roles: ['client'] },
  {
    href: '/dashboard/messages',
    icon: MessageSquare,
    label: 'Mensajes',
    roles: ['client', 'provider'],
  },
  {
    href: '/dashboard/profile',
    icon: UserCircle,
    label: 'Mi Perfil',
    roles: ['client', 'provider'],
  },
  {
    href: '/dashboard/settings',
    icon: Settings,
    label: 'Configuración',
    roles: ['client', 'provider'],
  },
  {
    href: '/dashboard/notifications',
    icon: Bell,
    label: 'Notificaciones',
    roles: ['client', 'provider'],
  },
];

// Links específicos para Proveedor
const providerLinks = [
  { href: '/dashboard/requests', icon: FileText, label: 'Solicitudes', roles: ['provider'] },
  { href: '/dashboard/jobs', icon: Briefcase, label: 'Mis Ofertas', roles: ['provider'] },
  { href: '/dashboard/stats', icon: BarChart3, label: 'Estadísticas', roles: ['provider'] },
  {
    href: '/dashboard/messages',
    icon: MessageSquare,
    label: 'Mensajes',
    roles: ['client', 'provider'],
  },
  {
    href: '/dashboard/profile',
    icon: UserCircle,
    label: 'Mi Perfil',
    roles: ['client', 'provider'],
  },
  {
    href: '/dashboard/settings',
    icon: Settings,
    label: 'Configuración',
    roles: ['client', 'provider'],
  },
  {
    href: '/dashboard/notifications',
    icon: Bell,
    label: 'Notificaciones',
    roles: ['client', 'provider'],
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  isDisabled?: boolean;
}

export const Sidebar = ({ isCollapsed = false, onToggle, isDisabled = false }: SidebarProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { currentRole, hasRole, switchRole } = useRole();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar al cambiar de ruta en móvil
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  }, [pathname, isMobile]);

  // Obtener links según el rol
  const getLinks = () => {
    if (!hasRole || !currentRole) {
      return [
        { href: '/dashboard', icon: Home, label: 'Dashboard', roles: ['client', 'provider'] },
        { href: '#', icon: Lock, label: 'Contenido bloqueado', roles: [], disabled: true },
      ];
    }

    const allLinks = [...baseLinks];

    if (currentRole === 'client') {
      allLinks.push(...clientLinks);
    } else if (currentRole === 'provider') {
      allLinks.push(...providerLinks);
    }

    return allLinks.filter((link) => link.roles.includes(currentRole));
  };

  const sidebarLinks = getLinks();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(path) || false;
  };

  // ✅ Función para cambiar rol - con actualización instantánea
  const handleSwitchRole = async () => {
    if (isSwitching) return;
    setIsSwitching(true);
    try {
      // ✅ El cambio es instantáneo gracias a setRole
      await switchRole();

      // ✅ El toast sale inmediatamente porque el estado ya cambió
      const newRole = currentRole === 'client' ? 'Proveedor' : 'Cliente';
      toast.success(`✅ Cambiado a modo ${newRole}`, {
        duration: 2000,
        position: 'bottom-center',
      });
    } catch (error) {
      log.error('Error cambiando rol:', error);
      toast.error('❌ Error al cambiar de rol');
    } finally {
      setIsSwitching(false);
    }
  };

  // Versión Desktop
  const DesktopSidebar = () => (
    <aside
      className={`hidden md:block bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${isDisabled ? 'opacity-60' : ''}`}
    >
      {/* Botón toggle en desktop */}
      <div className="flex justify-end p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Badge de rol actual */}
      {hasRole && currentRole && (
        <div className={`px-3 py-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              currentRole === 'client'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {!isCollapsed && (
              <span>Modo: {currentRole === 'client' ? 'Cliente' : 'Proveedor'}</span>
            )}
          </div>
        </div>
      )}

      {/* Sin rol - mensaje */}
      {!hasRole && (
        <div className={`px-3 py-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
            <Shield className="w-3 h-3" />
            {!isCollapsed && <span>Sin rol asignado</span>}
          </div>
        </div>
      )}

      <nav className="p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isLinkActive = isActive(link.href);
          const isLinkDisabled = link.disabled || isDisabled;

          if (link.disabled) {
            return (
              <div
                key={link.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm whitespace-nowrap">{link.label}</span>}
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isLinkActive && !isLinkDisabled
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''} ${isLinkDisabled ? 'opacity-50 pointer-events-none' : ''}`}
              title={isCollapsed ? link.label : ''}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">{link.label}</span>}
            </Link>
          );
        })}

        {/* ✅ Botón cambiar rol - Más visible y con icono según rol */}
        {hasRole && (
          <div
            className={`pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 ${
              isCollapsed ? 'flex justify-center' : ''
            }`}
          >
            <button
              onClick={handleSwitchRole}
              disabled={isSwitching}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              } ${
                currentRole === 'client'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                  : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50'
              } ${isSwitching ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isCollapsed ? 'Cambiar rol' : ''}
            >
              {currentRole === 'client' ? (
                <Briefcase className="w-5 h-5 flex-shrink-0" />
              ) : (
                <UserCircle className="w-5 h-5 flex-shrink-0" />
              )}
              {!isCollapsed && (
                <span className="text-sm whitespace-nowrap">
                  {isSwitching
                    ? 'Cambiando...'
                    : `Cambiar a ${currentRole === 'client' ? 'Proveedor' : 'Cliente'}`}
                </span>
              )}
              <RefreshCw className={`w-4 h-4 ml-auto ${isSwitching ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {/* Botón cerrar sesión */}
        <div
          className={`pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 ${
            isCollapsed ? 'flex justify-center' : ''
          }`}
        >
          <button
            onClick={logout}
            className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Cerrar sesión' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Cerrar sesión</span>}
          </button>
        </div>
      </nav>
    </aside>
  );

  // Botón para abrir sidebar en móvil
  const MobileToggle = () => (
    <button
      onClick={() => setIsMobileOpen(true)}
      className="md:hidden fixed bottom-4 right-4 z-50 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all"
      aria-label="Abrir menú"
    >
      <Menu className="w-6 h-6" />
    </button>
  );

  // Versión Mobile - Drawer overlay
  const MobileSidebar = () => (
    <>
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDisabled ? 'opacity-60' : ''}`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <BuildLinkLogo size="md" />
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          {hasRole && currentRole && (
            <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>Modo: {currentRole === 'client' ? 'Cliente' : 'Proveedor'}</span>
            </div>
          )}
          {!hasRole && (
            <div className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 w-fit">
              <Shield className="w-3 h-3" />
              <span>Sin rol asignado</span>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {sidebarLinks.map((link) => {
            const isLinkDisabled = link.disabled || isDisabled;

            if (link.disabled) {
              return (
                <div
                  key={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 dark:text-gray-600 cursor-not-allowed"
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{link.label}</span>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(link.href)
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                } ${isLinkDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{link.label}</span>
              </Link>
            );
          })}

          {/* Cambiar rol en móvil */}
          {hasRole && (
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSwitchRole}
                disabled={isSwitching}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                  currentRole === 'client'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                } ${isSwitching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {currentRole === 'client' ? (
                  <Briefcase className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <UserCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">
                  {isSwitching
                    ? 'Cambiando...'
                    : `Cambiar a ${currentRole === 'client' ? 'Proveedor' : 'Cliente'}`}
                </span>
                <RefreshCw className={`w-4 h-4 ml-auto ${isSwitching ? 'animate-spin' : ''}`} />
              </button>
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileToggle />
      <MobileSidebar />
    </>
  );
};

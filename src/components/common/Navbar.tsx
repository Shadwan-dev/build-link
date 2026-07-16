'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ChevronDown,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BuildLinkLogo } from './BuildLinkLogo';
import { NotificationBell } from './NotificationBell';

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { currentRole } = useRole();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // ✅ Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  // ✅ Links del navbar
  const navLinks = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    { href: '/dashboard/providers', label: 'Proveedores', icon: Users },
    { href: '/dashboard/requests', label: 'Solicitudes', icon: FileText },
  ];

  // ✅ Filtrar links según el rol
  const getVisibleLinks = () => {
    if (!currentRole) return navLinks;
    if (currentRole === 'client') return navLinks;
    if (currentRole === 'provider') {
      return navLinks.filter((link) => link.href !== '/dashboard/providers');
    }
    return navLinks;
  };

  const visibleLinks = getVisibleLinks();

  // ✅ Verificar si la ruta está activa
  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path) && pathname !== '/dashboard';
  };

  // ✅ Avatar del usuario
  const UserAvatar = () => {
    const [imageError, setImageError] = useState(false);

    if (user?.photoURL && !imageError) {
      return (
        <img
          src={user.photoURL}
          alt={user.displayName || 'Usuario'}
          className="w-8 h-8 rounded-full object-cover border-2 border-primary-200 dark:border-primary-800"
          onError={() => setImageError(true)}
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center border-2 border-primary-200 dark:border-primary-800">
        <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
      </div>
    );
  };

  // ✅ Manejar cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('👋 Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200/30 dark:border-gray-700/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center group flex-shrink-0 transition-opacity hover:opacity-80"
          >
            <BuildLinkLogo size="md" />
          </Link>

          {/* ✅ Links Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {user &&
              visibleLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </span>
                  </Link>
                );
              })}
          </div>

          {/* ✅ Acciones Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="Cambiar tema"
              title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Campana de notificaciones */}
            <NotificationBell />

            {/* ✅ Menú de usuario */}
            {user && (
              <div className="relative ml-2" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Menú de usuario"
                >
                  <UserAvatar />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1 z-50 animate-fade-in">
                    {/* Información del usuario */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.displayName || 'Usuario'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        {currentRole === 'client'
                          ? 'Cliente'
                          : currentRole === 'provider'
                            ? 'Proveedor'
                            : 'Usuario'}
                      </span>
                    </div>

                    {/* Opciones del menú */}
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <UserCircle className="w-4 h-4" />
                      Mi Perfil
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Configuración
                    </Link>
                    <Link
                      href="/dashboard/help"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <HelpCircle className="w-4 h-4" />
                      Ayuda y Soporte
                    </Link>

                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ✅ Botones Mobile */}
          <div className="flex md:hidden items-center gap-1">
            {/* Toggle tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Campana de notificaciones */}
            <NotificationBell />

            {/* Menú hamburguesa */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg animate-slide-up">
          <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* Links móvil */}
            {user &&
              visibleLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}

            <hr className="my-3 border-gray-200 dark:border-gray-700" />

            {/* Información de usuario móvil */}
            {user && (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  <UserAvatar />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.displayName || 'Usuario'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircle className="w-5 h-5" />
                  Mi Perfil
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  Configuración
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar sesión
                </button>
              </>
            )}

            {/* Si no hay usuario, mostrar login */}
            {!user && (
              <Link
                href="/login"
                className="flex items-center justify-center w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

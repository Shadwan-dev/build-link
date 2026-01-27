// components/layout/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { NavItem } from '@/types';
import { useClient } from '../tenant/ClientProvider';
import { auth } from '@/src/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface UserMenu {
  name: string;
  href: string;
  icon: string;
  action?: () => void;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const client = useClient();

  // Navegación principal
  const navItems: NavItem[] = [
    { name: 'Inicio', href: '#home', icon: '🏠' },
    { name: 'Servicios', href: '#services', icon: '✨' },
    { name: 'Nosotros', href: '#about', icon: '🏢' },
    { name: 'Productos', href: '#portfolio', icon: '📦' },
    { name: 'Clientes', href: '#testimonials', icon: '⭐' },
    { name: 'Contacto', href: '#contact', icon: '📞' },
  ];

  // Escuchar cambios en autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Menú de usuario (cuando está logueado)
  const userMenuItems: UserMenu[] = [
    {
      name: 'Panel de Administración',
      href: '/admin',
      icon: '⚙️',
      action: () => router.push('/admin'),
    },
    {
      name: 'Mi Perfil',
      href: '/admin/profile',
      icon: '👤',
      action: () => router.push('/admin/profile'),
    },
    {
      name: 'Configuración',
      href: '/admin/settings',
      icon: '🔧',
      action: () => router.push('/admin/settings'),
    },
    {
      name: 'Cerrar Sesión',
      href: '#logout',
      icon: '🚪',
      action: () => handleLogout(),
    },
  ];

  // Manejar logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Manejar login
  const handleLogin = () => {
    router.push('/auth/login');
    setIsMenuOpen(false);
  };

  // Manejar registro
  const handleRegister = () => {
    router.push('/auth/register');
    setIsMenuOpen(false);
  };

  // Ir al panel de admin
  const goToAdminPanel = () => {
    router.push('/admin');
    setIsUserMenuOpen(false);
  };

  // Manejar clic fuera del menú de usuario
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('.user-menu') &&
        !target.closest('.user-menu-button')
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Verificar si el usuario es admin
  const isAdmin =
    user?.email === 'admin@akpisrl.com' ||
    user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a
              href="#home"
              className="flex items-center space-x-3 no-underline"
            >
              {/* Logo */}
              <div className="flex items-center justify-center w-12 h-12">
                <img
                  src="/akpi-logo.png"
                  alt={`Logo ${client.company.name}`}
                  className="h-10 w-auto object-contain"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement;
                    if (fallback) {
                      fallback.innerHTML = `
                        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                          <span class="text-white font-bold text-lg">AKΠ</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Texto del logo */}
              <div className="hidden md:block border-l border-gray-200 pl-4 ml-3">
                <div className="relative">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-none">
                    AKΠ S.R.L.
                  </h1>
                  <p className="text-sm md:text-base text-gray-500 leading-none mt-[-2px] whitespace-nowrap">
                    Acá, pida... y recibirá
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center gap-2 group"
              >
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </a>
            ))}

            {/* Botones de autenticación o menú de usuario */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : user ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="user-menu-button flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Menú de usuario"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                      <span className="text-white text-sm">
                        {user.email?.charAt(0).toUpperCase() || '👤'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 hidden md:inline">
                      {user.email?.split('@')[0] || 'Usuario'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown de usuario */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-hard border border-gray-200 py-2 animate-fade-in user-menu">
                      {/* Información del usuario */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {isAdmin ? 'Administrador' : 'Usuario'}
                        </p>
                      </div>

                      {/* Items del menú */}
                      {userMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={item.action}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      ))}

                      {/* Panel admin destacado para admins */}
                      {isAdmin && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={goToAdminPanel}
                            className="w-full mx-4 mb-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                          >
                            <span>⚡</span>
                            Ir al Panel Admin
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="btn-outline px-4 py-2 text-sm hover:border-blue-500 hover:text-blue-600"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={handleRegister}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-3">
            {/* Estado de autenticación en mobile */}
            {!loading && user && (
              <button
                onClick={goToAdminPanel}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold rounded-lg"
              >
                <span>⚡</span>
                <span>Panel</span>
              </button>
            )}

            {!loading && !user && (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={handleLogin}
                  className="text-sm text-gray-600 hover:text-blue-600 px-3 py-1"
                >
                  Ingresar
                </button>
                <button
                  onClick={handleRegister}
                  className="btn-primary text-sm px-3 py-1.5"
                >
                  Registro
                </button>
              </div>
            )}

            <button
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in bg-white">
            <div className="flex flex-col space-y-3">
              {/* Navegación principal */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center gap-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}

              {/* Separador */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                ) : user ? (
                  <>
                    {/* Información del usuario */}
                    <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                          <span className="text-white">
                            {user.email?.charAt(0).toUpperCase() || '👤'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {isAdmin ? 'Administrador' : 'Usuario'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menú de usuario */}
                    <div className="space-y-2">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            item.action?.();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleLogin}
                      className="btn-outline py-3 flex items-center justify-center gap-2"
                    >
                      <span>🔑</span>
                      Iniciar sesión
                    </button>
                    <button
                      onClick={handleRegister}
                      className="btn-primary py-3 flex items-center justify-center gap-2"
                    >
                      <span>📝</span>
                      Registrarse
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

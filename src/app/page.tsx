// app/page.tsx
'use client';

import { BackgroundCarousel } from '@/components/common/BackgroundCarousel';
import { MiMaestroLogo } from '@/components/common/MiMaestroLogo';
import { QuickRequestModal } from '@/components/home/QuickRequestModal';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Hammer, Home, Loader2, Star, Users, Wrench, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showQuickRequest, setShowQuickRequest] = useState(false);

  // ✅ AL INICIAR SESIÓN → VA A SOLICITUDES
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard/requests');
    }
  }, [user, loading, router]);

  // Mostrar loader mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si está autenticado, no renderizar nada (la redirección ocurrirá)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Carrusel de fondo */}
      <BackgroundCarousel />

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 filter drop-shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:drop-shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all duration-300">
            <MiMaestroLogo size="2xl" showTagline={true} />
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Encuentra al <span className="text-yellow-400">profesional</span>
            <br />
            que necesitas
          </h1>

          <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl drop-shadow-md">
            Conectamos clientes con profesionales verificados en construcción, albañilería,
            carpintería y más. Calidad garantizada.
          </p>

          {/* ✅ Botones de acción - ACTUALIZADOS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {/* ✅ Botón de solicitud rápida - NUEVO */}
            <button
              onClick={() => setShowQuickRequest(true)}
              className="flex-1 px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5" />
              Solicitud rápida
            </button>

            <Link
              href="/register"
              className="flex-1 px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/30 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Registrarme
            </Link>

            <Link
              href="/login"
              className="flex-1 px-8 py-4 bg-white/10 backdrop-blur-md text-white/80 rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mt-16">
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/20 hover:bg-white/40 transition-all">
            <div className="text-3xl font-bold text-yellow-400">124+</div>
            <div className="text-sm text-white/90 mt-1">Profesionales</div>
          </div>
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/20 hover:bg-white/40 transition-all">
            <div className="text-3xl font-bold text-yellow-400">356+</div>
            <div className="text-sm text-white/90 mt-1">Proyectos</div>
          </div>
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/20 hover:bg-white/40 transition-all">
            <div className="text-3xl font-bold text-yellow-400">4.8⭐</div>
            <div className="text-sm text-white/90 mt-1">Calificación</div>
          </div>
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/20 hover:bg-white/40 transition-all">
            <div className="text-3xl font-bold text-yellow-400">15+</div>
            <div className="text-sm text-white/90 mt-1">Ciudades</div>
          </div>
        </div>

        {/* Categorías populares */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Categorías populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Building2, name: 'Construcción', color: 'bg-blue-500/70 text-white' },
              { icon: Hammer, name: 'Albañilería', color: 'bg-orange-500/70 text-white' },
              { icon: Home, name: 'Techos', color: 'bg-green-500/70 text-white' },
              { icon: Wrench, name: 'Plomería', color: 'bg-purple-500/70 text-white' },
              { icon: Users, name: 'Carpintería', color: 'bg-yellow-500/70 text-white' },
              { icon: Star, name: 'Jardinería', color: 'bg-emerald-500/70 text-white' },
            ].map((cat) => (
              <div
                key={cat.name}
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20 hover:bg-white/30"
              >
                <div
                  className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}
                >
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-white drop-shadow-md">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          <p>© 2026 MiMaestro. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-white transition">
              Términos
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacidad
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contacto
            </Link>
          </div>
        </footer>
      </div>

      {/* ✅ Modal de solicitud rápida */}
      <QuickRequestModal isOpen={showQuickRequest} onClose={() => setShowQuickRequest(false)} />
    </div>
  );
}

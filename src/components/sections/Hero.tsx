// components/sections/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useClient } from '../tenant/ClientProvider';

interface StatItem {
  value: string;
  label: string;
  icon?: string;
}

interface ApiStats {
  testimonials: number;
  products: number;
  contacts: number;
  happyClients: number;
  yearsActive: number;
  businessLines: number;
}

const Hero: React.FC = () => {
  const client = useClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [statsData, setStatsData] = useState<ApiStats | null>(null);

  // Cargar estadísticas desde la API
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Intentar cargar estadísticas reales
      const response = await fetch('/api/stats');

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.stats) {
          setStatsData(data.stats);
        } else {
          // Usar datos por defecto si la API falla
          useDefaultStats();
        }
      } else {
        // Usar datos por defecto si hay error
        useDefaultStats();
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      useDefaultStats();
    } finally {
      setLoading(false);
    }
  };

  // Datos por defecto
  const useDefaultStats = () => {
    const currentYear = new Date().getFullYear();
    setStatsData({
      testimonials: 50,
      products: 25,
      contacts: 100,
      happyClients: 500,
      yearsActive: currentYear - 2022,
      businessLines: 5,
    });
  };

  // Estadísticas dinámicas
  const stats: StatItem[] = [
    {
      value: loading ? '...' : `${statsData?.happyClients || 500}+`,
      label: 'Clientes',
      icon: '👥',
    },
    {
      value: loading ? '...' : `${statsData?.yearsActive || 2}+`,
      label: 'Años',
      icon: '🏆',
    },
    {
      value: loading ? '...' : `${statsData?.businessLines || 5}`,
      label: 'Servicios',
      icon: '📊',
    },
    {
      value: 'Baracoa',
      label: 'Origen',
      icon: '📍',
    },
  ];

  const baracoaFeatures = [
    {
      icon: '🌴',
      title: 'Origen Baracoense',
      description: 'Productos naturales de Baracoa',
    },
    {
      icon: '🥥',
      title: 'Coco Virgen',
      description: 'Aceite extraído tradicionalmente',
    },
    {
      icon: '🍫',
      title: 'Cacao Puro',
      description: 'Derivados de alta calidad',
    },
  ];

  // Función para formatear números grandes
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    return `${num}+`;
  };

  return (
    <div className="container-custom py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Contenido Principal */}
        <div className="animate-slide-up">
          {/* Badge compacto */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 px-3 py-1.5 rounded-full border border-emerald-200 mb-4 shadow-xs">
            <span className="text-emerald-600 text-sm">📍</span>
            <span className="text-xs font-semibold text-emerald-800">
              Desde Baracoa
            </span>
          </div>

          {/* Título más compacto */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            La calidad de{' '}
            <span className="text-gradient bg-gradient-to-r from-emerald-600 to-blue-600">
              Baracoa
            </span>{' '}
            en cada producto
          </h1>

          {/* Descripción más concisa */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Productos alimenticios 100% naturales y materiales de construcción
            de máxima calidad para toda Cuba.
          </p>

          {/* Botones más compactos */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href="#contact"
              className="group btn-primary px-6 py-3 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-semibold text-base transition-all duration-300 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
            >
              <span>✨ Solicitar Cotización</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            <a
              href="#portfolio"
              className="group btn-secondary px-6 py-3 rounded-lg border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 flex items-center justify-center gap-2 font-semibold text-base transition-all duration-300"
            >
              <span>🥥 Ver Productos</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Estadísticas más compactas */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 shadow-xs">
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-2 rounded-lg hover:bg-white hover:shadow-xs transition-all duration-200"
                >
                  <div className="text-lg mb-1">{stat.icon}</div>
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Información adicional */}
            {!loading && statsData && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Basado en {statsData.contacts}+ consultas recibidas
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de características compacta */}
        <div className="relative">
          <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-medium p-6 border border-emerald-100">
            {/* Encabezado compacto */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-sm">📍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Calidad Baracoense
                </h3>
              </div>
              <p className="text-gray-700">
                Productos alimenticios de{' '}
                <span className="font-semibold text-emerald-700">Baracoa</span>,
                tierra fértil y tradición agrícola.
              </p>
            </div>

            {/* Características compactas */}
            <div className="space-y-4">
              {baracoaFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-xs transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Datos reales */}
            {!loading && statsData && (
              <div className="mt-4 pt-4 border-t border-emerald-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-emerald-700">
                      {statsData.products}+
                    </div>
                    <div className="text-xs text-gray-600">Productos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-emerald-700">
                      {statsData.testimonials}+
                    </div>
                    <div className="text-xs text-gray-600">Testimonios</div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA compacto */}
            <div className="mt-6 pt-5 border-t border-emerald-200">
              <a
                href="#contact"
                className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
              >
                🥥 Solicitar Muestra
              </a>
            </div>
          </div>

          {/* Elementos decorativos más sutiles */}
          <div className="absolute -z-10 top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-lg"></div>
          <div className="absolute -z-10 bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-200/20 to-emerald-200/20 rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Barra informativa compacta */}
      <div className="mt-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-4 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold mb-1">🚚 Envíos a Toda Cuba</h4>
            <p className="text-emerald-100 text-sm">
              Distribuimos calidad baracoense a todo el país
            </p>
          </div>

          <div className="flex gap-3">
            <div className="text-center px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-sm">24-48h</div>
              <div className="text-xs text-emerald-100">Entrega</div>
            </div>
            <div className="text-center px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-white/30 rounded mb-1"></div>
                  <div className="h-3 bg-white/30 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="font-bold text-sm">100%</div>
                  <div className="text-xs text-emerald-100">Calidad</div>
                </>
              )}
            </div>
          </div>

          <a
            href={`tel:${client.contact.phone}`}
            className="bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors duration-300 flex items-center gap-1.5 text-sm"
          >
            📞 Contactar
          </a>
        </div>

        {/* Información adicional */}
        {!loading && statsData && (
          <div className="mt-3 pt-3 border-t border-emerald-500/20">
            <p className="text-xs text-emerald-200 text-center">
              Servicio verificado por {statsData.happyClients}+ clientes
              satisfechos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

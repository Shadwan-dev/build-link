// components/sections/Services.tsx - VERSIÓN ACTUALIZADA
'use client';

import React, { useState, useEffect } from 'react';
import { useClient } from '../tenant/ClientProvider';
import { getConfigHelpers } from '@/src/config/client-config';

interface Service {
  id: string;
  name: string;
  description: string;
  items: string[] | Array<{ id: string; name: string; unit?: string }>;
  icon?: string;
  color?: string;
  features: string[];
  deliveryTime: string;
  coverage: string;
  image?: string;
}

interface ApiResponse {
  success: boolean;
  services: Service[];
  count: number;
  error?: string;
}

const Services: React.FC = () => {
  const client = useClient();
  const helpers = getConfigHelpers();

  // Usar servicios de la configuración directamente
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Ahora false porque usamos datos locales
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Inicializar servicios desde configuración
  useEffect(() => {
    try {
      setLoading(true);

      if (
        client.services?.categories &&
        Array.isArray(client.services.categories)
      ) {
        const formattedServices = client.services.categories.map(
          (category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            items: category.items || [],
            icon: category.icon || '✨',
            color: category.color || getColorByCategory(category.id),
            features: category.features || [],
            deliveryTime: category.deliveryTime || 'Consultar',
            coverage: category.coverage || 'Nacional',
            image: category.image,
          })
        );

        setServices(formattedServices);
      } else {
        // Si no hay servicios en configuración, usar datos de respaldo
        setServices(getDefaultServices());
      }
    } catch (err) {
      console.error('Error inicializando servicios:', err);
      setError('Error al cargar servicios');
      setServices(getDefaultServices());
    } finally {
      setLoading(false);
    }
  }, [client.services]);

  // Servicios por defecto si no hay configuración
  const getDefaultServices = (): Service[] => {
    return [
      {
        id: 'alimentos',
        name: 'Alimentos y Bebidas',
        description:
          'Distribución de alimentos procesados y orgánicos de alta calidad para el mercado cubano',
        items: [
          'Harinas y cereales',
          'Conservas y enlatados',
          'Bebidas naturales',
          'Productos lácteos',
        ],
        icon: '🍎',
        color: '#10b981',
        features: [
          'Calidad certificada',
          'Productos orgánicos',
          'Envasado higiénico',
        ],
        deliveryTime: '24-48 horas',
        coverage: 'Nacional',
      },
      {
        id: 'aceites-cacao',
        name: 'Aceite de Coco y Derivados del Cacao',
        description:
          'Productos naturales premium de coco y cacao para industria alimentaria y cosmética',
        items: [
          'Aceite de coco virgen',
          'Manteca de cacao',
          'Polvo de cacao',
          'Chocolate en tableta',
        ],
        icon: '🥥',
        color: '#8b5cf6',
        features: ['100% natural', 'Sin aditivos', 'Procesado en frío'],
        deliveryTime: '48-72 horas',
        coverage: 'Nacional e Internacional',
      },
      {
        id: 'construccion',
        name: 'Materiales de Construcción',
        description:
          'Materiales de construcción de alta resistencia certificados para obras civiles y residenciales',
        items: [
          'Cemento y mezclas',
          'Ladrillos y bloques',
          'Varillas y acero',
          'Pinturas y acabados',
        ],
        icon: '🏗️',
        color: '#f59e0b',
        features: ['Alta resistencia', 'Certificados de calidad', 'Garantía'],
        deliveryTime: '72 horas',
        coverage: 'Provincial y Nacional',
      },
      {
        id: 'transporte',
        name: 'Transporte de Carga y Pasaje',
        description:
          'Servicios logísticos integrales con flota propia para todo tipo de cargas y pasajeros',
        items: [
          'Transporte nacional',
          'Carga pesada',
          'Mudanzas',
          'Servicio express',
        ],
        icon: '🚚',
        color: '#3b82f6',
        features: ['Flota propia', 'Rastreo GPS', 'Seguro incluido'],
        deliveryTime: 'Según ruta',
        coverage: 'Toda Cuba',
      },
      {
        id: 'delivery',
        name: 'Delivery de Alimentos',
        description:
          'Entrega rápida y segura de productos alimenticios con estándares de calidad premium',
        items: [
          'Entrega a domicilio',
          'Servicio a empresas',
          'Pedidos por teléfono',
          'Entrega express',
        ],
        icon: '🛵',
        color: '#ef4444',
        features: [
          'Entrega en 24h',
          'Empaque especial',
          'Seguimiento en tiempo real',
        ],
        deliveryTime: '2-24 horas',
        coverage: 'Baracoa y alrededores',
      },
    ];
  };

  // Obtener color por categoría
  const getColorByCategory = (categoryId: string): string => {
    const colors: Record<string, string> = {
      alimentos: '#10b981',
      aceites: '#8b5cf6',
      'aceites-cacao': '#8b5cf6',
      construccion: '#f59e0b',
      transporte: '#3b82f6',
      delivery: '#ef4444',
      cacao: '#92400e',
    };
    return colors[categoryId] || '#1a56db';
  };

  // Obtener clases CSS para colores
  const getColorClasses = (
    color: string,
    variant: 'bg' | 'text' | 'border' | 'gradient' = 'bg'
  ): string => {
    const colorMap: Record<string, Record<string, string>> = {
      '#10b981': {
        // Verde emerald
        bg: 'bg-gradient-to-br from-emerald-100 to-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        gradient: 'from-emerald-500 to-emerald-600',
      },
      '#8b5cf6': {
        // Púrpura violet
        bg: 'bg-gradient-to-br from-violet-100 to-violet-50',
        text: 'text-violet-700',
        border: 'border-violet-200',
        gradient: 'from-violet-500 to-violet-600',
      },
      '#f59e0b': {
        // Ámbar
        bg: 'bg-gradient-to-br from-amber-100 to-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        gradient: 'from-amber-500 to-amber-600',
      },
      '#3b82f6': {
        // Azul
        bg: 'bg-gradient-to-br from-blue-100 to-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-blue-600',
      },
      '#ef4444': {
        // Rojo
        bg: 'bg-gradient-to-br from-red-100 to-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        gradient: 'from-red-500 to-red-600',
      },
      '#92400e': {
        // Marrón cacao
        bg: 'bg-gradient-to-br from-amber-800/10 to-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        gradient: 'from-amber-700 to-amber-800',
      },
    };

    const scheme = colorMap[color] || colorMap['#1a56db'];
    return scheme[variant];
  };

  // Formatear items para mostrar (maneja tanto strings como objetos)
  const formatItems = (items: Service['items']): string[] => {
    if (!items) return [];

    if (Array.isArray(items)) {
      return items.slice(0, 4).map((item) => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object' && item.name) return item.name;
        return 'Producto disponible';
      });
    }

    return [];
  };

  // Servicios a mostrar (toggle para ver todos/menos)
  const servicesToShow = showAll ? services : services.slice(0, 6);

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full border border-blue-200/50 mb-6 shadow-sm">
            <span className="text-blue-600 text-sm">✨</span>
            <span className="text-xs font-semibold text-blue-800 tracking-wide">
              SERVICIOS ESPECIALIZADOS AKΠ
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Soluciones{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              integrales
            </span>{' '}
            para su negocio
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Ofrecemos una gama completa de productos y servicios de alta
            calidad, diseñados para satisfacer las necesidades específicas de su
            empresa.
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg animate-fadeIn">
            <p className="text-sm flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Grid de servicios */}
        {loading && services.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-200 mb-5"></div>
                <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-5 w-full"></div>
                <div className="space-y-2.5 mb-6">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="text-3xl text-gray-400">📭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Servicios no disponibles temporalmente
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Estamos actualizando nuestra oferta de servicios. Por favor,
              contáctenos directamente para más información.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow"
            >
              Contactar ahora
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {servicesToShow.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                >
                  {/* Ícono con fondo dinámico */}
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${getColorClasses(service.color, 'bg')} ${getColorClasses(service.color, 'border')} border shadow-sm group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </div>

                  {/* Título y descripción */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Características destacadas */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Características principales
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(service.color, 'bg')} ${getColorClasses(service.color, 'text')} border ${getColorClasses(service.color, 'border')}`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Productos/items */}
                  {service.items && service.items.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Productos destacados
                      </h4>
                      <ul className="space-y-2">
                        {formatItems(service.items).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <svg
                              className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${getColorClasses(service.color, 'text')}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {service.items.length > 4 && (
                        <p className="text-xs text-gray-500 mt-2 ml-6">
                          +{service.items.length - 4} productos más disponibles
                        </p>
                      )}
                    </div>
                  )}

                  {/* Info de entrega y cobertura */}
                  <div className="flex flex-wrap gap-4 items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="text-gray-400">🕐</span>
                        <span>Tiempo de entrega:</span>
                      </div>
                      <div
                        className={`text-sm font-semibold ${getColorClasses(service.color, 'text')}`}
                      >
                        {service.deliveryTime}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="text-gray-400">📍</span>
                        <span>Cobertura:</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        {service.coverage}
                      </div>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <a
                    href={`#contact?service=${encodeURIComponent(service.name)}`}
                    className={`mt-6 inline-flex items-center justify-center w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${getColorClasses(service.color, 'gradient')} hover:opacity-90 transition-all duration-300 group-hover:shadow-md`}
                  >
                    Solicitar información
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
                </div>
              ))}
            </div>

            {/* Botón para mostrar más/menos servicios */}
            {services.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300"
                >
                  {showAll ? (
                    <>
                      <span>Mostrar menos servicios</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Ver todos los servicios ({services.length})</span>
                      <svg
                        className="w-4 h-4 ml-2"
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
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Estadísticas */}
            <div className="mt-10 md:mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                      {services.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      Servicios especializados
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                      {services.reduce((total, service) => {
                        const items = service.items || [];
                        return (
                          total + (Array.isArray(items) ? items.length : 0)
                        );
                      }, 0)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Productos diferentes
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">
                      {new Set(services.map((s) => s.coverage)).size}
                    </div>
                    <div className="text-sm text-gray-600">
                      Áreas de cobertura
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Llamada a la acción */}
        <div className="mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-1 shadow-xl">
            <div className="bg-white rounded-xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                ¿Necesita una solución personalizada?
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                Nuestro equipo de expertos puede diseñar soluciones a medida
                para satisfacer los requerimientos específicos de su empresa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Solicitar cotización personalizada
                  <svg
                    className="w-4 h-4 ml-2"
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
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 text-sm"
                >
                  <span className="mr-2">📞</span>
                  Consultar por WhatsApp
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Respuesta en menos de 24 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

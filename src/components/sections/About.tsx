// components/sections/About.tsx - VERSIÓN ACTUALIZADA
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useClient } from '../tenant/ClientProvider';

interface StatItem {
  value: string;
  label: string;
  icon: string;
  description?: string;
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position?: string;
  message: string;
  rating: number;
  createdAt: string;
  approved: boolean;
}

interface StatsData {
  yearsActive: number;
  happyClients: number;
  businessLines: number;
  totalProducts: number;
  coverage: string;
}

const About: React.FC = () => {
  const client = useClient();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentYear] = useState(new Date().getFullYear());

  // Calcular estadísticas desde la configuración del cliente
  const statsData = useMemo<StatsData>(() => {
    const yearsActive = currentYear - (client.company.foundedYear || 2022);
    const businessLines = client.services?.categories?.length || 5;
    const totalProducts =
      client.services?.categories?.reduce((total, cat) => {
        return total + (cat.items?.length || 0);
      }, 0) || 25;

    return {
      yearsActive,
      happyClients: 500 + yearsActive * 100, // Crecimiento estimado
      businessLines,
      totalProducts,
      coverage: 'Nacional',
    };
  }, [client, currentYear]);

  // Valores empresariales de AKΠ con colores
  const values = useMemo<ValueItem[]>(
    () => [
      {
        icon: '🎯',
        title: 'Calidad',
        description:
          'Productos certificados con procesos de control rigurosos que garantizan excelencia en cada entrega.',
        color: '#10b981', // Emerald
      },
      {
        icon: '🤝',
        title: 'Confianza',
        description:
          'Relaciones comerciales transparentes y compromiso inquebrantable con la satisfacción del cliente.',
        color: '#3b82f6', // Blue
      },
      {
        icon: '⚡',
        title: 'Puntualidad',
        description:
          'Logística eficiente con entregas oportunas en toda Cuba, respetando siempre los plazos acordados.',
        color: '#f59e0b', // Amber
      },
      {
        icon: '🏆',
        title: 'Tradición',
        description:
          'Preservación de técnicas ancestrales en la producción de alimentos baracoenses auténticos.',
        color: '#8b5cf6', // Violet
      },
      {
        icon: '💼',
        title: 'Profesionalismo',
        description:
          'Equipo especializado con experiencia en distribución y atención personalizada a cada cliente.',
        color: '#1a56db', // Primary blue
      },
      {
        icon: '🌱',
        title: 'Sostenibilidad',
        description:
          'Compromiso con prácticas sostenibles en la producción y distribución de nuestros productos.',
        color: '#059669', // Green
      },
    ],
    []
  );

  // Hitos históricos (información pública)
  const timeline = useMemo<TimelineEvent[]>(
    () => [
      {
        year: '2022',
        title: 'Fundación',
        description:
          'Inicio de operaciones en Baracoa, Guantánamo con distribución local.',
        icon: '🏢',
      },
      {
        year: '2022',
        title: 'Expansión Provincial',
        description:
          'Ampliación de servicios a toda la provincia de Guantánamo.',
        icon: '📍',
      },
      {
        year: '2022',
        title: 'Consolidación Legal',
        description:
          'Formalización como Sociedad de Responsabilidad Limitada (S.R.L.).',
        icon: '⚖️',
      },
      {
        year: '2023',
        title: 'Diversificación',
        description:
          'Incorporación de materiales de construcción y servicios logísticos.',
        icon: '📦',
      },
      {
        year: '2023',
        title: 'Cobertura Nacional',
        description:
          'Ampliación de operaciones a nivel nacional con red de distribución.',
        icon: '🗺️',
      },
      {
        year: '2024',
        title: 'Innovación Digital',
        description:
          'Implementación de plataforma digital para mejorar la experiencia del cliente.',
        icon: '💻',
      },
    ],
    []
  );

  // Estadísticas visuales
  const stats = useMemo<StatItem[]>(
    () => [
      {
        value: `${statsData.yearsActive}+`,
        label: 'Años de Experiencia',
        icon: '🏢',
        description: `Desde ${client.company.foundedYear || 2022}`,
      },
      {
        value: `${statsData.happyClients}+`,
        label: 'Clientes Satisfechos',
        icon: '👥',
        description: 'Empresas confían en nosotros',
      },
      {
        value: statsData.coverage,
        label: 'Cobertura',
        icon: '🗺️',
        description: 'En toda Cuba',
      },
      {
        value: `${statsData.businessLines}`,
        label: 'Líneas de Negocio',
        icon: '📊',
        description: 'Servicios especializados',
      },
      {
        value: `${statsData.totalProducts}+`,
        label: 'Productos',
        icon: '📦',
        description: 'En nuestro catálogo',
      },
      {
        value: '24h',
        label: 'Respuesta',
        icon: '⚡',
        description: 'Tiempo promedio',
      },
    ],
    [statsData, client.company.foundedYear]
  );

  // Renderizar estrellas de rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-sm ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  // Obtener clases CSS para colores
  const getColorClasses = (
    color: string,
    variant: 'bg' | 'text' | 'border' | 'light' = 'bg'
  ): string => {
    const colorMap: Record<string, Record<string, string>> = {
      '#10b981': {
        // Emerald
        bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        light: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      },
      '#3b82f6': {
        // Blue
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-blue-700',
        border: 'border-blue-200',
        light: 'bg-blue-50 text-blue-800 border-blue-100',
      },
      '#f59e0b': {
        // Amber
        bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
        text: 'text-amber-700',
        border: 'border-amber-200',
        light: 'bg-amber-50 text-amber-800 border-amber-100',
      },
      '#8b5cf6': {
        // Violet
        bg: 'bg-gradient-to-br from-violet-500 to-violet-600',
        text: 'text-violet-700',
        border: 'border-violet-200',
        light: 'bg-violet-50 text-violet-800 border-violet-100',
      },
      '#1a56db': {
        // Primary blue
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-blue-700',
        border: 'border-blue-200',
        light: 'bg-blue-50 text-blue-800 border-blue-100',
      },
      '#059669': {
        // Green
        bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        light: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      },
    };

    const scheme = colorMap[color] || colorMap['#1a56db'];
    return scheme[variant];
  };

  return (
    <section
      id="about"
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full border border-blue-200/50 mb-6 shadow-sm">
            <span className="text-blue-600 text-sm">🏢</span>
            <span className="text-xs font-semibold text-blue-800 tracking-wide">
              SOBRE NOSOTROS
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Más de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {statsData.yearsActive} años
            </span>{' '}
            de excelencia
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Líderes en distribución de alimentos baracoenses y materiales de
            construcción en Cuba, comprometidos con la calidad y el servicio
            personalizado.
          </p>
        </div>

        {/* Estadísticas destacadas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-gray-500">{stat.description}</div>
              )}
            </div>
          ))}
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Misión */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">🎯</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Nuestra Misión
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {client.company.mission}
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                <span>✨</span>
                Enfoque principal: Calidad, puntualidad y servicio personalizado
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">👁️</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Nuestra Visión
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mt-2"></div>
              </div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {client.company.vision}
            </p>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-sm text-emerald-800 font-medium flex items-center gap-2">
                <span>🚀</span>
                Meta: Liderar la distribución en Cuba con excelencia y
                confiabilidad
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-12 lg:mb-16">
          <div className="text-center mb-8 lg:mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Valores
              </span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Principios fundamentales que guían cada decisión y acción en AKΠ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${getColorClasses(value.color, 'bg')} text-white text-2xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getColorClasses(value.color, 'light')}`}
                  >
                    {value.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historia y Trayectoria */}
        <div className="mb-12 lg:mb-16">
          <div className="text-center mb-8 lg:mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nuestra{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Trayectoria
              </span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un recorrido por los hitos más importantes en nuestra historia
            </p>
          </div>

          <div className="relative">
            {/* Línea de tiempo */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-emerald-500"></div>

            <div className="space-y-8 lg:space-y-0">
              {timeline.map((event, index) => (
                <div
                  key={index}
                  className={`relative lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Punto en la línea */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-md"></div>
                  </div>

                  {/* Contenido */}
                  <div
                    className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center">
                          <span className="text-lg">{event.icon}</span>
                        </div>
                        <div>
                          <div className="font-bold text-blue-600 text-sm">
                            {event.year}
                          </div>
                          <h4 className="font-bold text-gray-900">
                            {event.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Año (visible en móvil) */}
                  <div className="lg:hidden mt-4">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full text-sm font-semibold">
                      <span className="mr-2">📅</span>
                      {event.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información Legal */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-12 lg:mb-16 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">⚖️</span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Información Legal
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">
                Datos de Registro
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🏢</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {client.company.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {client.company.legalName}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">🔢</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">CIF / NIF</div>
                    <div className="text-sm text-gray-600">
                      {client.company.cif}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Sede Principal
                    </div>
                    <div className="text-sm text-gray-600">
                      {client.contact.locations?.[0]?.address ||
                        client.contact.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-lg">
                Certificaciones
              </h4>
              <div className="space-y-3">
                {client.certifications?.slice(0, 3).map((cert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {cert.name}
                      </div>
                      <div className="text-xs text-gray-500">{cert.issuer}</div>
                    </div>
                  </div>
                ))}
              </div>
              {client.certifications && client.certifications.length > 3 && (
                <div className="mt-4 text-sm text-gray-500">
                  +{client.certifications.length - 3} certificaciones
                  adicionales
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 md:p-10 text-center text-white shadow-xl">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-2xl">🤝</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-4">
            ¿Listo para asociarse con líderes confiables?
          </h3>

          <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
            Más de{' '}
            <span className="font-bold text-white">
              {statsData.happyClients}+ empresas
            </span>{' '}
            ya confían en AKΠ para sus suministros. Únase a nuestra red de
            clientes satisfechos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm transform hover:-translate-y-0.5"
            >
              Solicitar Presupuesto
              <svg
                className="w-4 h-4 ml-2 inline"
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
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm"
            >
              <span className="mr-2">💬</span>
              Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-blue-100">
              Respuesta en menos de 24 horas hábiles • Atención personalizada •
              Garantía de calidad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

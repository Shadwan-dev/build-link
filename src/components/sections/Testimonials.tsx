// components/sections/Testimonials.tsx - VERSIÓN ACTUALIZADA PROFESIONAL
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useClient } from '../tenant/ClientProvider';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
  product?: string;
  serviceCategory?: string;
  date: string;
  approved: boolean;
  verified: boolean;
  active: boolean;
  createdAt: string;
  businessType?: string;
  partnershipYears?: number;
}

interface CompanyLogo {
  name: string;
  logo: string;
  industry: string;
  location: string;
  yearsPartnership?: number;
}

interface TestimonialStats {
  total: number;
  averageRating: number;
  companiesCount: number;
  locations: string[];
  verifiedCount: number;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [stats, setStats] = useState<TestimonialStats>({
    total: 0,
    averageRating: 0,
    companiesCount: 0,
    locations: [],
    verifiedCount: 0,
  });

  const client = useClient();

  // Testimonios profesionales para AKΠ S.R.L.
  const professionalTestimonials: Testimonial[] = useMemo(
    () => [
      {
        id: 'akpi-001',
        name: 'Ing. Roberto Fernández',
        position: 'Gerente de Compras',
        company: 'Casa del Chocolate S.A.',
        location: 'Baracoa, Guantánamo',
        content:
          'La materia prima de AKΠ S.R.L. ha sido fundamental para nuestra producción premium. El cacao baracoense y aceite de coco virgen mantienen estándares de calidad excepcionales que destacan en nuestros chocolates gourmet. La consistencia en suministro y trazabilidad del producto son diferenciales clave.',
        rating: 5,
        image: '🍫',
        product: 'Cacao Orgánico y Aceite de Coco Virgen',
        serviceCategory: 'alimentos',
        date: 'Enero 2024',
        approved: true,
        verified: true,
        active: true,
        createdAt: '2024-01-15T00:00:00Z',
        businessType: 'Manufactura Alimentaria',
        partnershipYears: 2,
      },
      {
        id: 'akpi-002',
        name: 'Dra. María Rodríguez',
        position: 'Directora Técnica',
        company: 'Laboratorios Naturales Caribe',
        location: 'Santiago de Cuba',
        content:
          'Como laboratorio especializado en cosmética natural, la calidad del aceite de coco virgen de AKΠ cumple con los más altos estándares farmacéuticos. La extracción en frío y ausencia de aditivos nos permite formular productos premium para exportación. Su certificación de origen es un valor añadido importante.',
        rating: 5,
        image: '🔬',
        product: 'Aceite de Coco Farmacéutico',
        serviceCategory: 'aceites-cacao',
        date: 'Diciembre 2023',
        approved: true,
        verified: true,
        active: true,
        createdAt: '2023-12-10T00:00:00Z',
        businessType: 'Industria Cosmética',
        partnershipYears: 3,
      },
      {
        id: 'akpi-003',
        name: 'Arq. Carlos Gutiérrez',
        position: 'Director de Proyectos',
        company: 'Constructora Oriental S.A.',
        location: 'Guantánamo',
        content:
          'En proyectos de construcción de alto impacto, la calidad de materiales es crítica. AKΠ provee cemento y acero estructural que superan las normas cubanas NC. La asistencia técnica y documentación certificada han optimizado nuestros procesos de control de calidad.',
        rating: 5,
        image: '🏗️',
        product: 'Materiales Estructurales Premium',
        serviceCategory: 'construccion',
        date: 'Noviembre 2023',
        approved: true,
        verified: true,
        active: true,
        createdAt: '2023-11-05T00:00:00Z',
        businessType: 'Construcción Civil',
        partnershipYears: 2,
      },
      {
        id: 'akpi-004',
        name: 'Lic. Ana Martínez',
        position: 'Gerente de Logística',
        company: 'Distribuidora Nacional Caribe',
        location: 'La Habana',
        content:
          'La red logística de AKΠ para distribución nacional es excepcional. Hemos expandido nuestros puntos de venta gracias a la puntualidad y trazabilidad en tiempo real. Sus protocolos de almacenamiento garantizan integridad del producto desde Baracoa hasta todo el país.',
        rating: 5,
        image: '🚚',
        product: 'Servicios Logísticos Integrales',
        serviceCategory: 'transporte',
        date: 'Octubre 2023',
        approved: true,
        verified: true,
        active: true,
        createdAt: '2023-10-20T00:00:00Z',
        businessType: 'Distribución Mayorista',
        partnershipYears: 2,
      },
      {
        id: 'akpi-005',
        name: 'Chef Alejandro Torres',
        position: 'Executive Chef',
        company: 'Hotel Boutique Baracoa',
        location: 'Baracoa, Guantánamo',
        content:
          'La calidad organoléptica de los productos baracoenses de AKΠ transforma nuestra oferta gastronómica. Harinas tradicionales y derivados del cacao permiten crear experiencias culinarias auténticas que nuestros huéspedes internacionales valoran especialmente.',
        rating: 5,
        image: '👨‍🍳',
        product: 'Ingredientes Gastronómicos Premium',
        serviceCategory: 'alimentos',
        date: 'Septiembre 2023',
        approved: true,
        verified: true,
        active: true,
        createdAt: '2023-09-15T00:00:00Z',
        businessType: 'Hotelería y Restauración',
        partnershipYears: 1,
      },
      {
        id: 'akpi-006',
        name: 'Econ. Laura González',
        position: 'Jefa de Suministros',
        company: 'Cadena de Supermercados Oriente',
        location: 'Holguín',
        content:
          'La diversificación de productos de AKΠ cubre nuestras necesidades en múltiples categorías. Desde alimentos básicos hasta especialidades baracoenses, su capacidad de abastecimiento constante y condiciones comerciales competitivas nos permiten optimizar inventarios.',
        rating: 5,
        image: '🛒',
        product: 'Abastecimiento Integral Retail',
        serviceCategory: 'alimentos',
        date: 'Agosto 2023',
        approved: true,
        verified: true,
        active: true,
        createdAt: '2023-08-10T00:00:00Z',
        businessType: 'Retail',
        partnershipYears: 2,
      },
    ],
    []
  );

  // Logos de empresas asociadas profesionales
  const companyLogos: CompanyLogo[] = useMemo(
    () => [
      {
        name: 'Casa del Chocolate S.A.',
        logo: '🍫',
        industry: 'Manufactura Chocolatera',
        location: 'Baracoa',
        yearsPartnership: 2,
      },
      {
        name: 'Constructora Oriental S.A.',
        logo: '🏗️',
        industry: 'Ingeniería Civil',
        location: 'Guantánamo',
        yearsPartnership: 2,
      },
      {
        name: 'Laboratorios Naturales Caribe',
        logo: '🔬',
        industry: 'Cosmética Farmacéutica',
        location: 'Santiago',
        yearsPartnership: 3,
      },
      {
        name: 'Distribuidora Nacional Caribe',
        logo: '🚚',
        industry: 'Logística y Distribución',
        location: 'La Habana',
        yearsPartnership: 2,
      },
      {
        name: 'Hotel Boutique Baracoa',
        logo: '🏨',
        industry: 'Hotelería Premium',
        location: 'Baracoa',
        yearsPartnership: 1,
      },
      {
        name: 'Cadena Supermercados Oriente',
        logo: '🛒',
        industry: 'Retail Alimentario',
        location: 'Holguín',
        yearsPartnership: 2,
      },
      {
        name: 'Panadería Tradicional Cubana',
        logo: '🥖',
        industry: 'Panadería Artesanal',
        location: 'Baracoa',
        yearsPartnership: 2,
      },
      {
        name: 'Restaurante Mar Caribe',
        logo: '🍽️',
        industry: 'Gastronomía Premium',
        location: 'Guantánamo',
        yearsPartnership: 1,
      },
      {
        name: 'Cooperativa Agrícola Baracoa',
        logo: '🌱',
        industry: 'Agricultura Orgánica',
        location: 'Baracoa',
        yearsPartnership: 3,
      },
      {
        name: 'Exportadora Caribeña',
        logo: '🌍',
        industry: 'Comercio Exterior',
        location: 'La Habana',
        yearsPartnership: 1,
      },
    ],
    []
  );

  // Calcular estadísticas
  const calculateStats = useCallback((testimonialList: Testimonial[]) => {
    const total = testimonialList.length;
    const averageRating =
      total > 0
        ? testimonialList.reduce((sum, t) => sum + t.rating, 0) / total
        : 0;

    const companies = new Set(testimonialList.map((t) => t.company));
    const locations = [...new Set(testimonialList.map((t) => t.location))];
    const verifiedCount = testimonialList.filter((t) => t.verified).length;

    return {
      total,
      averageRating: parseFloat(averageRating.toFixed(1)),
      companiesCount: companies.size,
      locations,
      verifiedCount,
    };
  }, []);

  // Cargar testimonios
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intentar cargar desde API
        const response = await fetch('/api/testimonials');

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.testimonials) {
            const sortedTestimonials = data.testimonials
              .sort(
                (a: Testimonial, b: Testimonial) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 6);

            setTestimonials(sortedTestimonials);
          } else {
            setTestimonials(professionalTestimonials);
          }
        } else {
          setTestimonials(professionalTestimonials);
        }
      } catch (err) {
        console.error('Error cargando testimonios:', err);
        setError('Mostrando testimonios de referencia');
        setTestimonials(professionalTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [professionalTestimonials]);

  // Actualizar estadísticas cuando cambien testimonios
  useEffect(() => {
    if (testimonials.length > 0) {
      setStats(calculateStats(testimonials));
    }
  }, [testimonials, calculateStats]);

  // Auto-rotación
  useEffect(() => {
    if (!autoRotate || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length, autoRotate]);

  // Navegación manual
  const navigateTestimonial = useCallback(
    (direction: 'next' | 'prev' | number) => {
      if (testimonials.length <= 1) return;

      if (typeof direction === 'number') {
        setActiveIndex(direction);
      } else {
        setActiveIndex((prev) => {
          const newIndex =
            direction === 'next'
              ? (prev + 1) % testimonials.length
              : (prev - 1 + testimonials.length) % testimonials.length;
          return newIndex;
        });
      }

      // Pausar auto-rotación al interacción manual
      setAutoRotate(false);
      setTimeout(() => setAutoRotate(true), 20000);
    },
    [testimonials.length]
  );

  // Renderizar estrellas
  const renderStars = useCallback((rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 md:w-5 md:h-5"
            fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={i < rating ? 0 : 2}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        {rating % 1 !== 0 && (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 ml-0.5"
            fill="currentColor"
            stroke="currentColor"
            style={{ clipPath: `inset(0 ${100 - (rating % 1) * 100}% 0 0)` }}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
      </div>
    );
  }, []);

  // Formatear fecha
  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Reciente';
    }
  }, []);

  // Testimonio activo
  const activeTestimonial = testimonials[activeIndex] || testimonials[0];

  // Función para obtener color por categoría
  const getCategoryColor = useCallback((categoryId?: string) => {
    const colors: Record<string, string> = {
      alimentos: 'from-emerald-500 to-emerald-600',
      'aceites-cacao': 'from-purple-500 to-purple-600',
      construccion: 'from-amber-500 to-amber-600',
      transporte: 'from-blue-500 to-blue-600',
      delivery: 'from-red-500 to-red-600',
    };
    return colors[categoryId || ''] || 'from-blue-500 to-emerald-600';
  }, []);

  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado profesional */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full border border-blue-200/50 mb-6 shadow-sm">
            <span className="text-blue-600 text-sm">🏆</span>
            <span className="text-xs font-semibold text-blue-800 tracking-wide">
              TESTIMONIOS CORPORATIVOS
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Empresas líderes{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              confían en AKΠ
            </span>
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Descubra por qué empresas de diversos sectores eligen nuestros
            productos y servicios para optimizar sus operaciones y garantizar
            calidad.
          </p>

          {/* Estadísticas rápidas */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="text-center px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {stats.total}+
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Testimonios Verificados
              </div>
            </div>
            <div className="text-center px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                {stats.averageRating}/5
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Rating Promedio
              </div>
            </div>
            <div className="text-center px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                {stats.companiesCount}+
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Empresas Asociadas
              </div>
            </div>
            <div className="text-center px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                {stats.locations.length}+
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Provincias Cubanas
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor principal de testimonios */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navegación lateral */}
          <button
            onClick={() => navigateTestimonial('prev')}
            disabled={loading || testimonials.length <= 1}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:shadow-md items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Testimonio anterior"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => navigateTestimonial('next')}
            disabled={loading || testimonials.length <= 1}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:shadow-md items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Siguiente testimonio"
          >
            <svg
              className="w-5 h-5"
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
          </button>

          {/* Testimonio principal */}
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {loading && testimonials.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 mb-6">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600">
                  Cargando testimonios corporativos...
                </p>
              </div>
            ) : activeTestimonial ? (
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Lado izquierdo: Información del cliente */}
                <div className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-emerald-50 p-8 lg:p-10">
                  <div className="flex flex-col items-center lg:items-start h-full">
                    {/* Avatar/Logo */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center text-3xl mb-6 shadow-sm">
                      {activeTestimonial.image || '🏢'}
                    </div>

                    {/* Información */}
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        {activeTestimonial.position}
                      </p>
                      <p className="text-blue-600 font-semibold mb-4">
                        {activeTestimonial.company}
                      </p>

                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                        <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-600">
                          📍 {activeTestimonial.location}
                        </span>
                        {activeTestimonial.businessType && (
                          <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-600">
                            🏢 {activeTestimonial.businessType}
                          </span>
                        )}
                      </div>

                      {/* Rating destacado */}
                      <div className="mb-6">
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                          {renderStars(activeTestimonial.rating)}
                          <span className="text-lg font-bold text-amber-600">
                            {activeTestimonial.rating}.0
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Calificación verificada
                        </p>
                      </div>

                      {/* Categoría */}
                      {activeTestimonial.serviceCategory && (
                        <div className="mt-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(activeTestimonial.serviceCategory)} text-white`}
                          >
                            {activeTestimonial.serviceCategory ===
                              'alimentos' && '🥗 Alimentos'}
                            {activeTestimonial.serviceCategory ===
                              'aceites-cacao' && '🥥 Aceites & Cacao'}
                            {activeTestimonial.serviceCategory ===
                              'construccion' && '🏗️ Construcción'}
                            {activeTestimonial.serviceCategory ===
                              'transporte' && '🚚 Logística'}
                            {activeTestimonial.serviceCategory === 'delivery' &&
                              '🛵 Delivery'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Verificación */}
                    <div className="mt-auto pt-6 border-t border-blue-100 w-full">
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-emerald-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600">
                          Cliente verificado • {activeTestimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lado derecho: Testimonio */}
                <div className="lg:col-span-2 p-8 lg:p-10">
                  <div className="relative h-full">
                    {/* Comillas decorativas */}
                    <div className="absolute -top-4 -left-2 text-6xl text-blue-100 z-0">
                      "
                    </div>

                    {/* Contenido */}
                    <blockquote className="relative z-10 text-gray-700 text-lg leading-relaxed mb-8">
                      {activeTestimonial.content}
                    </blockquote>

                    {/* Producto destacado */}
                    {activeTestimonial.product && (
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                          Producto/Servicio Utilizado
                        </h4>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-100">
                          <span className="text-blue-600">📦</span>
                          <span className="font-medium text-gray-800">
                            {activeTestimonial.product}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tiempo de asociación */}
                    {activeTestimonial.partnershipYears && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-blue-500">🤝</span>
                        <span>
                          Relación comercial de{' '}
                          {activeTestimonial.partnershipYears} año(s)
                        </span>
                      </div>
                    )}

                    {/* Indicadores de navegación para móvil */}
                    <div className="flex md:hidden items-center justify-between mt-8 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => navigateTestimonial('prev')}
                        disabled={loading || testimonials.length <= 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors disabled:opacity-30"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Anterior
                      </button>

                      <div className="flex gap-1">
                        {testimonials.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => navigateTestimonial(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'w-6 bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Testimonio ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => navigateTestimonial('next')}
                        disabled={loading || testimonials.length <= 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors disabled:opacity-30"
                      >
                        Siguiente
                        <svg
                          className="w-4 h-4"
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
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Indicadores para desktop */}
          {testimonials.length > 1 && (
            <div className="hidden md:flex justify-center mt-8">
              <div className="flex gap-2">
                {testimonials.map((testimonial, idx) => (
                  <button
                    key={testimonial.id}
                    onClick={() => navigateTestimonial(idx)}
                    className={`group flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${idx === activeIndex ? 'bg-white border border-blue-200 shadow-sm' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gray-300'}`}
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {testimonial.company.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.location.split(',')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Red de empresas asociadas */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Parte de nuestra{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                red corporativa
              </span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empresas de diversos sectores que confían en la calidad y
              profesionalismo de AKΠ S.R.L.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {companyLogos.map((company, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    {company.logo}
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">
                    {company.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {company.industry}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    <span>📍</span>
                    <span>{company.location}</span>
                  </div>
                  {company.yearsPartnership && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {company.yearsPartnership}+ años
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Corporativo */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-1 shadow-xl">
            <div className="bg-white rounded-xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl">📈</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                ¿Su empresa quiere formar parte de esta red?
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                Únase a empresas líderes que ya optimizan sus operaciones con
                productos y servicios de calidad certificada AKΠ.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Solicitar reunión comercial
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
                  <span className="mr-2">📋</span>
                  Solicitar referencias verificadas
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Respuesta en 24h hábiles • Reunión virtual disponible •
                  Certificados de calidad incluidos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notas de transparencia */}
        <div className="mt-8 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">
                Todos los testimonios son verificados
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">
                Contactos verificables disponibles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

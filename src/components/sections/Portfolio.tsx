// components/sections/Portfolio.tsx - VERSIÓN ACTUALIZADA
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useClient } from '../tenant/ClientProvider';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  features: string[];
  origin?: string;
  certifications?: string[];
  priceRange?: string;
  unit?: string;
  active?: boolean;
  createdAt?: string;
  imageUrl?: string;
  price?: number;
  stock?: number;
  color?: string;
  icon?: string;
  deliveryTime?: string;
  minOrder?: number;
}

interface Filter {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface ApiResponse {
  success: boolean;
  products: Product[];
  count: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const Portfolio: React.FC = () => {
  const client = useClient();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar productos según categoría activa
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter((product) => product.category === activeFilter);
  }, [products, activeFilter]);

  // Obtener todos los productos de los servicios
  useEffect(() => {
    const loadProductsFromServices = () => {
      try {
        setLoading(true);
        setError(null);

        if (!client.services?.categories) {
          throw new Error('No se encontraron categorías de servicios');
        }

        // Transformar servicios y sus items en productos
        const allProducts: Product[] = [];

        client.services.categories.forEach((category) => {
          // Producto principal de la categoría
          allProducts.push({
            id: category.id,
            title: category.name,
            category: category.id,
            description: category.description,
            icon: category.icon,
            color: category.color || getCategoryColor(category.id),
            features: category.features || [],
            deliveryTime: category.deliveryTime,
            priceRange: 'Consultar según especificaciones',
            unit: 'Personalizado',
            active: true,
            minOrder: category.items?.[0]?.minOrder || 1,
          });

          // Sub-productos (items del servicio)
          if (category.items && Array.isArray(category.items)) {
            category.items.forEach((item, index) => {
              allProducts.push({
                id: `${category.id}-${index}`,
                title: typeof item === 'string' ? item : item.name,
                category: category.id,
                description: category.description,
                icon: category.icon,
                color: category.color || getCategoryColor(category.id),
                features: category.features || [],
                deliveryTime: category.deliveryTime,
                priceRange:
                  typeof item === 'object' && item.unit
                    ? `Consultar por ${item.unit}`
                    : 'Consultar',
                unit: typeof item === 'object' ? item.unit : 'unidad',
                minOrder: typeof item === 'object' ? item.minOrder : 1,
                active: true,
              });
            });
          }
        });

        setProducts(allProducts);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    loadProductsFromServices();
  }, [client.services]);

  // Filtros basados en categorías de servicios
  const filters = useMemo<Filter[]>(() => {
    const baseFilters: Filter[] = [
      { id: 'all', label: 'Todos los productos', icon: '📦', color: 'blue' },
    ];

    if (client.services?.categories) {
      client.services.categories.forEach((category) => {
        baseFilters.push({
          id: category.id,
          label: category.name,
          icon: category.icon || '✨',
          color: category.color || getCategoryColor(category.id),
        });
      });
    }

    return baseFilters;
  }, [client.services]);

  // Obtener color por categoría
  const getCategoryColor = (categoryId: string): string => {
    const colors: Record<string, string> = {
      alimentos: '#10b981', // Emerald
      aceites: '#8b5cf6', // Violet
      'aceites-cacao': '#8b5cf6', // Violet
      construccion: '#f59e0b', // Amber
      transporte: '#3b82f6', // Blue
      delivery: '#ef4444', // Red
      cacao: '#92400e', // Brown
    };
    return colors[categoryId] || '#1a56db';
  };

  // Obtener clases CSS para colores
  const getColorClasses = (
    color: string,
    variant: 'bg' | 'text' | 'border' | 'gradient' | 'light' = 'bg'
  ): string => {
    const colorMap: Record<string, Record<string, string>> = {
      '#10b981': {
        // Emerald
        bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        gradient: 'from-emerald-500 to-emerald-600',
        light: 'bg-emerald-50 text-emerald-800 border-emerald-100',
      },
      '#8b5cf6': {
        // Violet
        bg: 'bg-gradient-to-br from-violet-500 to-violet-600',
        text: 'text-violet-700',
        border: 'border-violet-200',
        gradient: 'from-violet-500 to-violet-600',
        light: 'bg-violet-50 text-violet-800 border-violet-100',
      },
      '#f59e0b': {
        // Amber
        bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
        text: 'text-amber-700',
        border: 'border-amber-200',
        gradient: 'from-amber-500 to-amber-600',
        light: 'bg-amber-50 text-amber-800 border-amber-100',
      },
      '#3b82f6': {
        // Blue
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-blue-700',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-blue-600',
        light: 'bg-blue-50 text-blue-800 border-blue-100',
      },
      '#ef4444': {
        // Red
        bg: 'bg-gradient-to-br from-red-500 to-red-600',
        text: 'text-red-700',
        border: 'border-red-200',
        gradient: 'from-red-500 to-red-600',
        light: 'bg-red-50 text-red-800 border-red-100',
      },
      '#92400e': {
        // Brown
        bg: 'bg-gradient-to-br from-amber-700 to-amber-800',
        text: 'text-amber-800',
        border: 'border-amber-200',
        gradient: 'from-amber-700 to-amber-800',
        light: 'bg-amber-50 text-amber-800 border-amber-100',
      },
      '#1a56db': {
        // Primary blue
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-blue-700',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-blue-600',
        light: 'bg-blue-50 text-blue-800 border-blue-100',
      },
    };

    const scheme = colorMap[color] || colorMap['#1a56db'];
    return scheme[variant];
  };

  // Productos de respaldo
  const getFallbackProducts = (): Product[] => {
    return [
      {
        id: '1',
        title: 'Aceite de Coco Virgen Extra',
        category: 'aceites',
        description:
          'Aceite de coco 100% natural extraído en frío, procedente de cocos baracoenses de primera calidad.',
        icon: '🥥',
        color: '#8b5cf6',
        features: [
          'Extracción en frío tradicional',
          'Sin aditivos ni conservantes',
          'Alto contenido en ácido láurico',
        ],
        priceRange: 'Consultar según volumen',
        unit: 'Litro / Galón',
        deliveryTime: '48-72 horas',
        minOrder: 10,
        active: true,
      },
      {
        id: '2',
        title: 'Manteca de Cacao Pura',
        category: 'cacao',
        description:
          'Manteca de cacao natural extraída mediante procesos tradicionales, ideal para repostería y cosmética.',
        icon: '🍫',
        color: '#92400e',
        features: [
          '100% cacao baracoense',
          'Proceso artesanal controlado',
          'Textura cremosa y aroma intenso',
        ],
        priceRange: 'Desde $15/kg',
        unit: 'Kilogramo',
        deliveryTime: '3-5 días',
        minOrder: 5,
        active: true,
      },
      {
        id: '3',
        title: 'Harinas Orgánicas Tradicionales',
        category: 'alimentos',
        description:
          'Harinas naturales procesadas artesanalmente, conservando todos sus nutrientes y sabor tradicional.',
        icon: '🍞',
        color: '#10b981',
        features: [
          '100% orgánicas',
          'Sin conservantes artificiales',
          'Molino tradicional',
        ],
        priceRange: 'Precio por mayor',
        unit: 'Kilogramo',
        deliveryTime: '24-48 horas',
        minOrder: 25,
        active: true,
      },
      {
        id: '4',
        title: 'Cemento de Alta Resistencia',
        category: 'construccion',
        description:
          'Cemento certificado para construcciones de alta durabilidad y resistencia estructural.',
        icon: '🏗️',
        color: '#f59e0b',
        features: [
          'Resistencia certificada',
          'Rápido fraguado',
          'Ideal para obras civiles',
        ],
        priceRange: 'Por saco / Tonelada',
        unit: 'Saco de 50kg',
        deliveryTime: '72 horas',
        minOrder: 50,
        active: true,
      },
    ];
  };

  // Formatear precio
  const formatPrice = (price?: number): string => {
    if (!price) return 'Consultar precio';
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Modal de producto detallado
  const ProductModal: React.FC<{ product: Product; onClose: () => void }> = ({
    product,
    onClose,
  }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(product.color || '#1a56db', 'bg')} text-white text-2xl`}
              >
                {product.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {product.title}
                </h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getColorClasses(product.color || '#1a56db', 'light')}`}
                >
                  {filters.find((f) => f.id === product.category)?.label ||
                    product.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Cerrar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </h4>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Características
                </h4>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-gray-600"
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${getColorClasses(product.color || '#1a56db', 'text')}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Especificaciones */}
            <div className="grid grid-cols-2 gap-4">
              {product.deliveryTime && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">Tiempo de entrega</div>
                  <div className="font-semibold text-gray-800">
                    {product.deliveryTime}
                  </div>
                </div>
              )}
              {product.minOrder && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">Mínimo de pedido</div>
                  <div className="font-semibold text-gray-800">
                    {product.minOrder} {product.unit}
                  </div>
                </div>
              )}
              {product.priceRange && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">Precio</div>
                  <div className="font-semibold text-gray-800">
                    {product.priceRange}
                  </div>
                </div>
              )}
              {product.unit && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">Unidad</div>
                  <div className="font-semibold text-gray-800">
                    {product.unit}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
            <a
              href={`#contact?product=${encodeURIComponent(product.title)}&category=${product.category}`}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white text-center ${getColorClasses(product.color || '#1a56db', 'bg')} hover:opacity-90 transition-opacity`}
              onClick={onClose}
            >
              Solicitar cotización
            </a>
            <button
              onClick={onClose}
              className="py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:text-gray-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="portfolio" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full border border-blue-200/50 mb-6 shadow-sm">
            <span className="text-blue-600 text-sm">📦</span>
            <span className="text-xs font-semibold text-blue-800 tracking-wide">
              CATÁLOGO AKΠ
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              productos
            </span>{' '}
            y servicios
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Descubra nuestra completa gama de productos alimenticios baracoenses
            y materiales de construcción, todos con certificación de calidad.
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg animate-fadeIn">
            <p className="text-sm flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? `${getColorClasses(getCategoryColor(filter.id), 'bg')} text-white shadow-md`
                    : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
                {activeFilter === filter.id && (
                  <span className="ml-1 text-xs opacity-80">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Vista y estadísticas */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-gray-600">
              <span className="font-semibold text-blue-600">
                {filteredProducts.length}
              </span>{' '}
              productos
            </div>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
                title="Vista de cuadrícula"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
                title="Vista de lista"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-200 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-5 w-full"></div>
                <div className="space-y-2.5 mb-6">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="text-3xl text-gray-400">📭</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Seleccione otra categoría o contáctenos para productos
              específicos.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
            {/* Grid de productos */}
            <div
              className={`grid gap-6 lg:gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white rounded-xl border border-gray-200 hover:border-blue-300 overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Icono/Imagen */}
                  <div
                    className={`flex-shrink-0 ${
                      viewMode === 'list' ? 'mr-6' : 'mb-5'
                    }`}
                  >
                    <div
                      className={`${viewMode === 'list' ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl flex items-center justify-center ${getColorClasses(product.color || getCategoryColor(product.category), 'bg')} text-white text-2xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      {product.icon}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <div
                      className={`${viewMode === 'list' ? 'flex items-center justify-between mb-3' : 'mb-3'}`}
                    >
                      <h3
                        className={`font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors ${
                          viewMode === 'list' ? 'text-lg' : 'text-lg'
                        }`}
                      >
                        {product.title}
                      </h3>
                      {viewMode === 'list' && (
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${getColorClasses(product.color || getCategoryColor(product.category), 'light')}`}
                        >
                          {filters.find((f) => f.id === product.category)
                            ?.label || product.category}
                        </span>
                      )}
                    </div>

                    {viewMode === 'grid' && (
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getColorClasses(product.color || getCategoryColor(product.category), 'light')} mb-3 inline-block`}
                      >
                        {filters.find((f) => f.id === product.category)
                          ?.label || product.category}
                      </span>
                    )}

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                      {product.deliveryTime && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="text-gray-400">🕐</span>
                          <span>{product.deliveryTime}</span>
                        </div>
                      )}
                      {product.minOrder && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="text-gray-400">📦</span>
                          <span>
                            Mín. {product.minOrder} {product.unit}
                          </span>
                        </div>
                      )}
                      {product.priceRange && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                          <span>💰</span>
                          <span>{product.priceRange}</span>
                        </div>
                      )}
                    </div>

                    {product.features &&
                      product.features.length > 0 &&
                      viewMode === 'list' && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Botón en vista lista */}
                  {viewMode === 'list' && (
                    <button className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm">
                      Ver detalles
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Estadísticas */}
            <div className="mt-10 md:mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                      {products.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      Productos totales
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                      {new Set(products.map((p) => p.category)).size}
                    </div>
                    <div className="text-sm text-gray-600">Categorías</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">
                      {products.reduce(
                        (sum, p) => sum + (p.features?.length || 0),
                        0
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Características únicas
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-violet-700 mb-2">
                      100%
                    </div>
                    <div className="text-sm text-gray-600">
                      Calidad certificada
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
                <span className="text-2xl">📞</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                ¿No encuentra lo que necesita?
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                Contamos con un catálogo más amplio y podemos realizar pedidos
                especiales. Nuestro equipo está listo para asesorarle y
                encontrar la solución perfecta.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  Solicitar catálogo completo
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
                  <span className="mr-2">💬</span>
                  Consultar por WhatsApp
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Respuesta en menos de 24 horas hábiles • Catálogo digital
                disponible
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;

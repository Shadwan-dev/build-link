'use client';

import { ProviderFilters } from '@/components/dashboard/providers/ProviderFilters';
import { ProviderList } from '@/components/dashboard/providers/ProviderList';
import { Provider, getProviders } from '@/lib/firebase/provider.service';
import { useEffect, useState } from 'react';

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);
      try {
        const result = await getProviders({ limitCount: 50 });
        setProviders(result.providers);
        setFilteredProviders(result.providers);
      } catch (error) {
        console.error('Error cargando proveedores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  // ✅ Aplicar filtros
  useEffect(() => {
    let result = providers;

    // ✅ Búsqueda por texto
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.displayName.toLowerCase().includes(term) ||
          p.specialties.some((s) => s.toLowerCase().includes(term)) ||
          p.location?.toLowerCase().includes(term)
      );
    }

    // ✅ Filtro por categoría
    if (selectedCategory) {
      result = result.filter((p) => p.specialties.includes(selectedCategory));
    }

    // ✅ Filtro por ubicación
    if (selectedLocation.trim()) {
      const location = selectedLocation.toLowerCase().trim();
      result = result.filter((p) => p.location?.toLowerCase().includes(location));
    }

    // ✅ Filtro por calificación mínima
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    setFilteredProviders(result);
  }, [providers, searchTerm, selectedCategory, selectedLocation, minRating]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setMinRating(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          👷 Proveedores
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Encuentra al profesional perfecto para tu proyecto
        </p>
      </div>

      {/* ✅ Filtros - Con todas las props requeridas */}
      <ProviderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        minRating={minRating}
        onRatingChange={setMinRating}
        onClearFilters={clearFilters}
        totalResults={filteredProviders.length}
      />

      {/* Lista de proveedores */}
      <ProviderList
        providers={filteredProviders}
        loading={loading}
        variant="compact"
        emptyMessage={
          searchTerm || selectedCategory || selectedLocation || minRating > 0
            ? 'No se encontraron proveedores con estos filtros'
            : 'Aún no hay proveedores registrados'
        }
      />
    </div>
  );
}

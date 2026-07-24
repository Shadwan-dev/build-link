'use client';
import { log } from '@/lib/utils/logger';

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

  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);
      try {
        // ✅ getProviders ahora devuelve { providers, lastDoc }
        const result = await getProviders({ limitCount: 50 });
        setProviders(result.providers);
        setFilteredProviders(result.providers);
      } catch (error) {
        log.error('Error cargando proveedores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  useEffect(() => {
    let result = providers;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.displayName.toLowerCase().includes(term) ||
          p.specialties.some((s) => s.toLowerCase().includes(term)) ||
          p.location?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.specialties.includes(selectedCategory));
    }

    setFilteredProviders(result);
  }, [providers, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
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

      {/* Filtros */}
      <ProviderFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClearFilters={clearFilters}
      />

      {/* Lista de proveedores */}
      <ProviderList
        providers={filteredProviders}
        loading={loading}
        variant="compact"
        emptyMessage={
          searchTerm || selectedCategory
            ? 'No se encontraron proveedores con estos filtros'
            : 'Aún no hay proveedores registrados'
        }
      />
    </div>
  );
}

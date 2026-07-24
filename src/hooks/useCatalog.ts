'use client';
import { log } from '@/lib/utils/logger';

import {
  getAllCategories,
  getAllSpecialties,
  getFullCatalog,
} from '@/lib/firebase/catalog.service';
import { Category, ServiceCatalog, Specialty } from '@/types/category.types';
import { useCallback, useEffect, useState } from 'react';

interface UseCatalogReturn {
  categories: Category[];
  specialties: Specialty[];
  catalog: ServiceCatalog | null;
  loading: boolean;
  error: string | null;
  getSpecialtiesByCategoryId: (categoryId: string) => Specialty[];
  refreshCatalog: () => Promise<void>;
}

export const useCatalog = (): UseCatalogReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [catalog, setCatalog] = useState<ServiceCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCatalog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, specialtiesData] = await Promise.all([
        getAllCategories(),
        getAllSpecialties(),
      ]);

      setCategories(categoriesData);
      setSpecialties(specialtiesData);

      // Para caché, obtener catálogo completo
      const fullCatalog = await getFullCatalog();
      setCatalog(fullCatalog);
    } catch (err) {
      log.error('Error cargando catálogo:', err);
      setError('Error al cargar el catálogo de servicios');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const getSpecialtiesByCategoryId = useCallback(
    (categoryId: string): Specialty[] => {
      return specialties.filter((s) => s.categoryId === categoryId && s.isActive);
    },
    [specialties]
  );

  const refreshCatalog = useCallback(async () => {
    await loadCatalog();
  }, [loadCatalog]);

  return {
    categories,
    specialties,
    catalog,
    loading,
    error,
    getSpecialtiesByCategoryId,
    refreshCatalog,
  };
};

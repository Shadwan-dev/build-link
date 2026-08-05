'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import {
  deletePortfolioItem,
  getPortfolioStats,
  getProviderPortfolio,
} from '@/lib/firebase/portfolio.service';
import { PortfolioItem } from '@/types/portfolio.types';
import { Edit, Eye, Heart, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PortfolioPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  const isProvider = currentRole === 'provider';

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!user || !isProvider) return;
      setLoading(true);
      try {
        const [itemsResult, statsData] = await Promise.all([
          getProviderPortfolio(user.uid, { limit: 50 }),
          getPortfolioStats(user.uid),
        ]);
        setItems(itemsResult.items);
        setStats(statsData);
      } catch (error) {
        console.error('Error cargando portafolio:', error);
        toast.error('Error al cargar tu portafolio');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [user, isProvider]);

  const handleDelete = async (itemId: string) => {
    if (!confirm('¿Estás seguro de eliminar este trabajo?')) return;
    try {
      await deletePortfolioItem(itemId);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success('✅ Trabajo eliminado');
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  if (!isProvider) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Acceso restringido</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Solo los proveedores pueden gestionar su portafolio
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            📸 Mi Portafolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona los trabajos que has realizado
          </p>
        </div>
        <Link
          href="/dashboard/portfolio/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo trabajo
        </Link>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalItems}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Trabajos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalViews}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Vistas totales</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalLikes}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Likes recibidos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.categories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categorías</div>
          </div>
        </div>
      )}

      {/* Lista de trabajos */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Aún no tienes trabajos
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Comparte los proyectos que has realizado
          </p>
          <Link
            href="/dashboard/portfolio/new"
            className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Agregar primer trabajo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden group"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 relative">
                <img
                  src={item.coverImage || item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    href={`/dashboard/portfolio/${item.id}/edit`}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
                  >
                    <Edit className="w-4 h-4 text-gray-700" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {item.likes}
                  </span>
                  {item.category && (
                    <span className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

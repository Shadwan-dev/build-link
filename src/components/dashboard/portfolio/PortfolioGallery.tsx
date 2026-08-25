// components/dashboard/portfolio/PortfolioGallery.tsx

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { getImageUrl } from '@/lib/cloudinary/image.utils';
import {
  getProviderPortfolio,
  likePortfolioItem,
  viewPortfolioItem,
} from '@/lib/firebase/portfolio.service';
import { PortfolioItem } from '@/types/portfolio.types';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Loader2,
  MapPin,
  Star,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface PortfolioGalleryProps {
  providerId: string;
}

export const PortfolioGallery = ({ providerId }: PortfolioGalleryProps) => {
  const { user } = useAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  // ✅ Cargar portafolio
  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true);
      try {
        const result = await getProviderPortfolio(providerId, { limit: 12 });
        setItems(result.items);
        setLastDoc(result.lastDoc);
        setHasMore(result.items.length > 0);
      } catch (error) {
        console.error('Error cargando portafolio:', error);
        toast.error('Error al cargar el portafolio');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [providerId]);

  // ✅ Cargar más
  const loadMore = async () => {
    if (!hasMore || !lastDoc) return;

    try {
      const result = await getProviderPortfolio(providerId, {
        limit: 12,
        lastDoc,
      });
      setItems((prev) => [...prev, ...result.items]);
      setLastDoc(result.lastDoc);
      setHasMore(result.items.length > 0);
    } catch (error) {
      console.error('Error cargando más:', error);
      toast.error('Error al cargar más items');
    }
  };

  // ✅ Dar like
  const handleLike = async (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Inicia sesión para dar like');
      return;
    }

    try {
      await likePortfolioItem(itemId);
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, likes: (item.likes || 0) + 1 } : item))
      );
      toast.success('¡Like agregado!');
    } catch (error) {
      console.error('Error al dar like:', error);
      toast.error('Error al dar like');
    }
  };

  // ✅ Abrir lightbox
  const openLightbox = (item: PortfolioItem, index: number) => {
    setSelectedItem(item);
    setCurrentImageIndex(index);
    setLightboxOpen(true);

    viewPortfolioItem(item.id).catch(() => {});
  };

  // ✅ Navegar en lightbox
  const navigateLightbox = (direction: number) => {
    if (!selectedItem) return;
    const total = selectedItem.images.length;
    setCurrentImageIndex((prev) => (prev + direction + total) % total);
  };

  // ✅ Renderizar estrellas
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Sin trabajos en el portafolio
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Este proveedor aún no ha compartido sus trabajos
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Grid de portafolio */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer"
            onClick={() => openLightbox(item, index)}
          >
            <img
              src={getImageUrl(item.coverImage || item.images?.[0] || '', {
                width: 400,
                height: 400,
                crop: 'fill',
              })}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-semibold text-sm truncate">{item.title}</h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views || 0}
                  </span>
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="flex items-center gap-1 hover:text-red-400 transition"
                  >
                    <Heart className="w-3 h-3" />
                    {item.likes || 0}
                  </button>
                  {item.testimonio && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      {item.testimonio.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón cargar más */}
      {hasMore && items.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Cargar más trabajos
          </button>
        </div>
      )}

      {/* ✅ Lightbox con testimonio */}
      {lightboxOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={getImageUrl(selectedItem.images?.[currentImageIndex] || '', {
                  width: 1200,
                  height: 800,
                  crop: 'fill',
                })}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {selectedItem.images && selectedItem.images.length > 1 && (
              <>
                <button
                  onClick={() => navigateLightbox(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigateLightbox(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* ✅ Info con testimonio */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold">{selectedItem.title}</h3>
              <p className="text-white/80 text-sm mt-1">{selectedItem.description}</p>

              {/* ✅ Testimonio del cliente */}
              {selectedItem.testimonio && (
                <div className="mt-3 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400 text-sm font-medium">⭐ Testimonio</span>
                    <span className="text-white/60 text-xs">
                      • {selectedItem.testimonio.clientName}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm italic">
                    "{selectedItem.testimonio.comment}"
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      {selectedItem.testimonio.rating}/5
                    </span>
                    <span>
                      💬 Comunicación: {selectedItem.testimonio.categories.comunicacion}/5
                    </span>
                    <span>⏰ Puntualidad: {selectedItem.testimonio.categories.puntualidad}/5</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-white/60">
                {selectedItem.category && (
                  <span className="flex items-center gap-1">📂 {selectedItem.category}</span>
                )}
                {selectedItem.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedItem.location}
                  </span>
                )}
                {selectedItem.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedItem.year}
                  </span>
                )}
                {selectedItem.clientName && (
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {selectedItem.clientName}
                  </span>
                )}
              </div>
              {selectedItem.clientFeedback && (
                <p className="text-white/70 text-sm mt-2 italic">"{selectedItem.clientFeedback}"</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {selectedItem.views || 0} vistas
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {selectedItem.likes || 0} likes
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

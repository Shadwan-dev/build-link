'use client';

import { useAuth } from '@/contexts/AuthContext';
import { getProviderById, Provider } from '@/lib/firebase/provider.service';
import { getProviderReviews, getReviewStats } from '@/lib/firebase/review.service';
import { log } from '@/lib/utils/logger';
import { Review, ReviewStats } from '@/types/review.types';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Star,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const uid = params.uid as string;

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // ✅ Cargar proveedor
  useEffect(() => {
    const loadProvider = async () => {
      if (!uid) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getProviderById(uid);
        if (data) {
          setProvider(data);
        } else {
          setError('Proveedor no encontrado');
        }
      } catch (err) {
        log.error('Error cargando proveedor:', err);
        setError('Error al cargar el proveedor');
      } finally {
        setLoading(false);
      }
    };

    loadProvider();
  }, [uid]);

  // ✅ Cargar reviews
  useEffect(() => {
    const loadReviews = async () => {
      if (!provider) return;
      setLoadingReviews(true);
      try {
        const [reviewsData, statsData] = await Promise.all([
          getProviderReviews(provider.uid, 10),
          getReviewStats(provider.uid),
        ]);
        setReviews(reviewsData.reviews);
        setReviewStats(statsData);
      } catch (error) {
        log.error('Error cargando reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };
    loadReviews();
  }, [provider]);

  // ✅ Contactar por WhatsApp
  const handleWhatsApp = () => {
    if (!provider) return;

    const phone = provider.phone;
    if (!phone || phone.length < 8) {
      toast.error('Este proveedor no tiene número de teléfono disponible');
      return;
    }

    const specialties = provider.specialties.join(', ');
    const message = `Hola, me comunico a través de MiMaestro. Estoy interesado en tus servicios de ${specialties}. ¿Podrías darme más información?`;
    const link = `https://wa.me/${phone.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  // ✅ Renderizar estrellas
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Cargando perfil del proveedor...
          </p>
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Proveedor no encontrado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error || 'El proveedor que buscas no existe'}
          </p>
          <Link
            href="/dashboard/providers"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a proveedores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Botón volver */}
      <Link
        href="/dashboard/providers"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a proveedores
      </Link>

      {/* Tarjeta de perfil */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {provider.photoURL ? (
                <img
                  src={provider.photoURL}
                  alt={provider.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {provider.displayName}
                </h1>
                {provider.isVerified && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verificado
                  </span>
                )}
                {reviewStats && reviewStats.totalReviews > 0 && (
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {reviewStats.averageRating} · {reviewStats.totalReviews} reseñas
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {provider.location || 'Ubicación no especificada'}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {provider.experience || 0} años de experiencia
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {provider.responseTime || 'Responde rápidamente'}
                </span>
              </div>
            </div>

            {/* ✅ Botón WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Especialidades */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🏗️ Especialidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Descripción */}
          {provider.description && (
            <div>
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📝 Sobre nosotros
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{provider.description}</p>
            </div>
          )}

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 text-primary-500" />
              <span>{provider.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4 text-primary-500" />
              <span>{provider.phone}</span>
            </div>
          </div>

          {/* ✅ SECCIÓN DE VALORACIONES */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              Valoraciones
            </h2>

            {loadingReviews ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                <p>Este proveedor aún no tiene valoraciones</p>
              </div>
            ) : (
              <>
                {/* Resumen de estadísticas */}
                {reviewStats && reviewStats.totalReviews > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {reviewStats.averageRating}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(Math.round(reviewStats.averageRating))}
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                            ({reviewStats.totalReviews} reseñas)
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">⭐ Calidad</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {reviewStats.averageCategories.calidad}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">⏰ Puntualidad</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {reviewStats.averageCategories.puntualidad}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">💬 Comunicación</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {reviewStats.averageCategories.comunicacion}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">💰 Precio</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {reviewStats.averageCategories.precio}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lista de reviews */}
                <div className="space-y-4">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {review.clientName?.[0] || 'U'}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.clientName || 'Cliente'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {review.createdAt?.toDate?.().toLocaleDateString('es-ES') ||
                          'Fecha no disponible'}
                      </p>
                    </div>
                  ))}
                  {reviews.length > 5 && (
                    <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                      Ver todas las valoraciones
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

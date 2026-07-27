'use client';

import { Provider, getProviderById } from '@/lib/firebase/provider.service';
import { log } from '@/lib/utils/logger';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// ✅ Función para generar enlace de WhatsApp
const getWhatsAppLink = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${cleanMessage}`;
};

export default function ProviderDetailPage() {
  const params = useParams();
  const uid = params.uid as string;

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // ✅ Manejar contacto por WhatsApp
  const handleWhatsApp = () => {
    if (!provider) return;

    const phone = provider.phone;
    if (!phone || phone.length < 8) {
      toast.error('Este proveedor no tiene número de teléfono disponible');
      return;
    }

    const specialties = provider.specialties.join(', ');
    const message = `Hola, me comunico a través de MiMaestro. Estoy interesado en tus servicios de ${specialties}. ¿Podrías darme más información?`;
    const link = getWhatsAppLink(phone, message);
    window.open(link, '_blank');
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
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  {provider.rating?.toFixed(1) || '0'} ({provider.totalRatings || 0} reseñas)
                </span>
              </div>
            </div>

            {/* ✅ Botón de WhatsApp - Más visible */}
            <button
              onClick={handleWhatsApp}
              className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg"
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
              Especialidades
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
                Sobre nosotros
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

          {/* ✅ Acciones - Solo WhatsApp (eliminar formulario de mensajes) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleWhatsApp}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </button>
            <button className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-center font-medium">
              Ver portafolio
            </button>
          </div>

          {/* ✅ Mensaje informativo sobre WhatsApp */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                Al hacer clic en "Contactar por WhatsApp" serás redirigido a WhatsApp para
                comunicarte directamente con el proveedor.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { TestimonioModal } from '@/components/dashboard/requests/TestimonioModal';
import { WhatsAppContact } from '@/components/dashboard/requests/WhatsAppContact';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getRequestById, updateRequestStatus } from '@/lib/firebase/requests.service';
import { log } from '@/lib/utils/logger';
import { Request, TestimonioData } from '@/types/request.types';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
  Shield,
  Star,
  ThumbsDown,
  ThumbsUp,
  User,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [whatsappContact, setWhatsappContact] = useState('');
  const [showTestimonioModal, setShowTestimonioModal] = useState(false);

  const requestId = params.id as string;

  // Cargar solicitud
  const loadRequest = async () => {
    if (!requestId) return;
    setLoading(true);
    try {
      const data = await getRequestById(requestId);
      if (data) {
        setRequest(data);
      } else {
        toast.error('Solicitud no encontrada');
        router.push('/dashboard/requests');
      }
    } catch (error) {
      log.error('Error cargando solicitud:', error);
      toast.error('Error al cargar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequest();
  }, [requestId]);

  // ✅ ACTUALIZAR ESTADO DE LA SOLICITUD
  const handleStatusUpdate = async (
    status: 'aceptado' | 'rechazado' | 'en-progreso' | 'completado'
  ) => {
    if (!request) return;

    if ((status === 'aceptado' || status === 'rechazado') && !responseText.trim()) {
      toast.error('Escribe un mensaje de respuesta');
      return;
    }

    setUpdating(true);
    try {
      await updateRequestStatus(
        request.id,
        status,
        responseText,
        status === 'aceptado' ? whatsappContact || undefined : undefined
      );

      const statusMessages = {
        aceptado: '✅ Solicitud aceptada',
        rechazado: '❌ Solicitud rechazada',
        'en-progreso': '🔄 Solicitud en progreso',
        completado: '✅ Solicitud completada',
      };

      toast.success(statusMessages[status] || 'Estado actualizado');
      await loadRequest();

      if (status === 'completado') {
        setTimeout(() => {
          setShowTestimonioModal(true);
        }, 500);
      }
    } catch (error) {
      toast.error('Error al actualizar la solicitud');
    } finally {
      setUpdating(false);
    }
  };

  // ✅ ENVIAR TESTIMONIO
  const handleTestimonioSubmit = async (testimonioData: TestimonioData) => {
    if (!request) return;

    try {
      toast.success('⭐ ¡Gracias por tu testimonio!');
      setShowTestimonioModal(false);

      await updateRequestStatus(request.id, 'completado', undefined, undefined, {
        testimonio: testimonioData,
      });

      await loadRequest();
    } catch (error) {
      log.error('Error enviando testimonio:', error);
      toast.error('Error al enviar el testimonio');
    }
  };

  // ✅ FUNCIONES DE UTILIDAD
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'en-progreso':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'completado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'aceptado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'rechazado':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      'en-progreso': 'En progreso',
      completado: 'Completado',
      aceptado: 'Aceptado',
      rechazado: 'Rechazado',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendiente':
        return <Clock className="w-5 h-5" />;
      case 'en-progreso':
        return <RefreshCw className="w-5 h-5" />;
      case 'completado':
        return <CheckCircle className="w-5 h-5" />;
      case 'aceptado':
        return <ThumbsUp className="w-5 h-5" />;
      case 'rechazado':
        return <ThumbsDown className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'urgente':
        return '🟡 Urgente';
      case 'muy-urgente':
        return '🔴 Muy urgente';
      default:
        return '🟢 Normal';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgente':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'muy-urgente':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  // ✅ ESTADOS DE CARGA
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Solicitud no encontrada
        </h2>
        <Link
          href="/dashboard/requests"
          className="text-primary-600 hover:underline mt-2 inline-block"
        >
          Volver a solicitudes
        </Link>
      </div>
    );
  }

  const isClient = user?.uid === request.clientId;
  const isProvider = user?.uid === request.providerId;

  // ✅ Verificar si la solicitud está completada
  const isCompleted = request.status === 'completado';

  // ✅ Verificar si el cliente puede dar testimonio
  const canTestimonio = isClient && isCompleted && !request.testimonio;

  // ✅ Verificar si hay imágenes en la solicitud
  const hasImages = request.images && request.images.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Botón volver */}
      <Link
        href="/dashboard/requests"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a solicitudes
      </Link>

      {/* Detalle de la solicitud */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div
          className={`p-6 border-b transition-colors ${
            request.status === 'aceptado'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : request.status === 'completado'
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : request.status === 'rechazado'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {request.categoryName || 'Sin categoría'}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(request.status)}`}
                >
                  {getStatusIcon(request.status)}
                  {getStatusLabel(request.status)}
                </span>
                {request.urgency && (
                  <span
                    className={`text-sm flex items-center gap-1 ${getUrgencyColor(request.urgency)}`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    {getUrgencyLabel(request.urgency)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                #{request.id.slice(0, 8)} •{' '}
                {request.createdAt
                  ? new Date(request.createdAt.seconds * 1000).toLocaleString()
                  : 'Fecha no disponible'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {request.providerSpecialty && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                  🔍 {request.providerSpecialty}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contenido - Grid de información */}
        <div className="p-6 space-y-6">
          {/* Información del cliente/proveedor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                {isClient ? (
                  <>
                    <Briefcase className="w-4 h-4" />
                    Proveedor
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    Cliente
                  </>
                )}
              </p>
              <div className="mt-2 space-y-2">
                <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                  <User className="w-4 h-4 text-gray-400" />
                  {isClient ? request.providerName : request.clientName}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {isClient
                    ? request.providerEmail || 'proveedor@email.com'
                    : request.clientEmail || 'cliente@email.com'}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {isClient
                    ? request.providerPhone || '+34 600 000 000'
                    : request.clientPhone || '+34 600 000 000'}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Ubicación
              </p>
              <div className="mt-2 space-y-2">
                <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {request.location || 'No especificada'}
                </p>
                {request.providerLocation && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Shield className="w-4 h-4 text-gray-400" />
                    Zona: {request.providerLocation}
                  </p>
                )}
                {request.regionId && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Región: {request.regionId}
                  </p>
                )}
                {request.provinceId && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Provincia: {request.provinceId}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Especialidades y detalles del proyecto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Especialidades solicitadas
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {request.providerSpecialty ? (
                  request.providerSpecialty.split(',').map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {spec.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">No especificadas</span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Detalles del proyecto
              </p>
              <div className="mt-2 space-y-2">
                {request.budget && (
                  <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-gray-400" />$
                    {request.budget.toLocaleString()}
                  </p>
                )}
                {request.estimatedTime && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Tiempo estimado: {request.estimatedTime}
                  </p>
                )}
                {request.urgency && (
                  <p
                    className={`flex items-center gap-2 text-sm ${getUrgencyColor(request.urgency)}`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    Nivel de urgencia: {getUrgencyLabel(request.urgency)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary-500" />
              Descripción del proyecto
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {request.description}
              </p>
            </div>
          </div>

          {/* Imágenes */}
          {request.images && request.images.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary-500" />
                Imágenes del proyecto ({request.images.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {request.images.map((url, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 cursor-pointer"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <img
                      src={url}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3E❌%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Ver</span>
                    </div>
                    {/* ✅ Usar la variable imagesLength para TypeScript */}
                    {request.images && (
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        {index + 1}/{request.images.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Respuesta del proveedor */}
          {request.response && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-green-500" />
                Respuesta del proveedor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{request.response}</p>
              {request.whatsappContact && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Contacto: {request.whatsappContact}
                </p>
              )}
            </div>
          )}

          {/* ✅ ACCIONES PARA PROVEEDOR */}
          {isProvider && request.status === 'pendiente' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Send className="w-4 h-4 text-primary-500" />
                Responder a la solicitud
              </h3>
              <div className="space-y-4">
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Escribe tu respuesta al cliente..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                />
                <input
                  type="text"
                  value={whatsappContact}
                  onChange={(e) => setWhatsappContact(e.target.value)}
                  placeholder="Tu número de WhatsApp (opcional)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate('aceptado')}
                    disabled={updating}
                    className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Aceptar solicitud
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('rechazado')}
                    disabled={updating}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {updating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    Rechazar solicitud
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ✅ ACCIONES PARA PROVEEDOR - TRABAJO EN PROGRESO */}
          {isProvider && request.status === 'aceptado' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Has aceptado esta solicitud
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Puedes marcar el trabajo como completado cuando finalices
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleStatusUpdate('completado')}
                  disabled={updating}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {updating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Marcar como completado
                </button>
              </div>
            </div>
          )}

          {/* ✅ ESTADO PARA CLIENTE - CUANDO ESTÁ ACEPTADO */}
          {isClient && request.status === 'aceptado' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      ✅ El proveedor ha aceptado tu solicitud
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Pronto comenzará el trabajo. Mantente en contacto por WhatsApp
                    </p>
                  </div>
                </div>
                {request.response && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <span className="font-medium">Respuesta:</span> {request.response}
                  </p>
                )}
                {request.whatsappContact && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Contacto del proveedor: {request.whatsappContact}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ✅ ESTADO PARA CLIENTE - CUANDO ESTÁ COMPLETADO */}
          {isClient && request.status === 'completado' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      ✅ ¡Trabajo completado!
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      El proveedor ha finalizado el proyecto
                    </p>
                  </div>
                </div>
                {canTestimonio && (
                  <button
                    onClick={() => setShowTestimonioModal(true)}
                    className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    Calificar y dejar testimonio
                  </button>
                )}
                {request.testimonio && (
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      ¡Ya has dejado tu testimonio! ⭐ {request.testimonio.rating}/5
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      "{request.testimonio.comment}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ✅ CONTACTO WHATSAPP - PARA CLIENTE CUANDO LA SOLICITUD ESTÁ ACEPTADA */}
          {isClient && request.status === 'aceptado' && request.whatsappContact && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <WhatsAppContact
                request={request}
                clientName={user?.displayName || 'Cliente'}
                providerPhone={request.whatsappContact}
                providerName={request.providerName}
              />
            </div>
          )}

          {/* ✅ ESTADO PARA PROVEEDOR - CUANDO ESTÁ COMPLETADO */}
          {isProvider && request.status === 'completado' && request.testimonio && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      ⭐ Nuevo testimonio recibido
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      El cliente te ha calificado con {request.testimonio.rating} estrellas
                    </p>
                  </div>
                </div>
                <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    "{request.testimonio.comment}"
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      // ✅ Usar optional chaining y valor por defecto
                      const rating = request.testimonio?.rating || 0;
                      return (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ MODAL DE TESTIMONIO */}
      {showTestimonioModal && request && (
        <TestimonioModal
          request={request}
          onClose={() => setShowTestimonioModal(false)}
          onSubmit={handleTestimonioSubmit}
        />
      )}
    </div>
  );
}

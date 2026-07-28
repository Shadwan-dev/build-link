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
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
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

      // ✅ Si se completó, mostrar modal de testimonio
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

  // ============================================
  // ENVIAR TESTIMONIO - CORREGIDO
  // ============================================
  const handleTestimonioSubmit = async (testimonioData: TestimonioData) => {
    if (!request) return;

    try {
      console.log('Testimonio enviado:', testimonioData);
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Botón volver */}
      <Link
        href="/dashboard/requests"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a solicitudes
      </Link>

      {/* Detalle de la solicitud */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header - con estilo según estado */}
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
                {request.createdAt
                  ? new Date(request.createdAt.seconds * 1000).toLocaleString()
                  : 'Fecha no disponible'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">#{request.id.slice(0, 8)}</span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información del cliente/proveedor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {isClient ? '🧑‍💼 Proveedor' : '👤 Cliente'}
              </p>
              <div className="mt-2 space-y-2">
                <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                  <User className="w-4 h-4 text-gray-400" />
                  {isClient ? request.providerName : request.clientName}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {isClient ? 'proveedor@email.com' : 'cliente@email.com'}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {isClient ? '+34 600 000 000' : '+34 600 000 000'}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                📋 Detalles del proyecto
              </p>
              <div className="mt-2 space-y-2">
                {request.budget && (
                  <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-gray-400" />$
                    {request.budget.toLocaleString()}
                  </p>
                )}
                {request.location && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    📍 {request.location}
                  </p>
                )}
                {request.urgency && (
                  <p
                    className={`flex items-center gap-2 text-sm ${getUrgencyColor(request.urgency)}`}
                  >
                    <Clock className="w-4 h-4" />
                    {getUrgencyLabel(request.urgency)}
                  </p>
                )}
                {request.estimatedTime && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Tiempo estimado: {request.estimatedTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📝 Descripción del proyecto
            </h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {request.description}
            </p>
          </div>

          {/* Respuesta del proveedor */}
          {request.response && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                💬 Respuesta del proveedor
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
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                📩 Responder a la solicitud
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
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Has aceptado esta solicitud. Ahora puedes marcar el trabajo como completado.
                </p>
                <button
                  onClick={() => handleStatusUpdate('completado')}
                  disabled={updating}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
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
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />✅ El proveedor ha aceptado tu solicitud. Pronto
                  comenzará el trabajo.
                </p>
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
                <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />✅ ¡Trabajo completado! El proveedor ha
                  finalizado el proyecto.
                </p>
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

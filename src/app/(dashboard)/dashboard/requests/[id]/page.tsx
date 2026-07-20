'use client';

import { RequestForm } from '@/components/dashboard/requests/RequestForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getRequestById, updateRequestStatus } from '@/lib/firebase/requests.service';
import { Request } from '@/types/request.types';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  Mail,
  Phone,
  Send,
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
  const [showRequestForm, setShowRequestForm] = useState(false);

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
      console.error('Error cargando solicitud:', error);
      toast.error('Error al cargar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequest();
  }, [requestId]);

  // Actualizar estado de la solicitud
  const handleStatusUpdate = async (status: 'aceptado' | 'rechazado') => {
    if (!request) return;

    if (status === 'aceptado' && !responseText.trim()) {
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

      toast.success(status === 'aceptado' ? '✅ Solicitud aceptada' : '❌ Solicitud rechazada');
      await loadRequest();
    } catch (error) {
      toast.error('Error al actualizar la solicitud');
    } finally {
      setUpdating(false);
    }
  };

  // Funciones de utilidad
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'en-progreso':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'completado':
      case 'aceptado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'rechazado':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'Pendiente';
      case 'en-progreso':
        return 'En progreso';
      case 'completado':
        return 'Completado';
      case 'aceptado':
        return 'Aceptado';
      case 'rechazado':
        return 'Rechazado';
      default:
        return status;
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'urgente':
        return 'Urgente';
      case 'muy-urgente':
        return 'Muy urgente';
      default:
        return 'Normal';
    }
  };

  // Estados de carga
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

  // Determinar si el usuario actual es el cliente de esta solicitud
  const isClient = user?.uid === request.clientId;
  const isProvider = user?.uid === request.providerId;

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
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {request.categoryName || 'Sin categoría'}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}
                >
                  {getStatusLabel(request.status)}
                </span>
                {request.urgency && (
                  <span className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
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
                {isClient ? 'Proveedor' : 'Cliente'}
              </p>
              <div className="mt-2 space-y-2">
                <p className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                  <User className="w-4 h-4 text-gray-400" />
                  {isClient ? request.providerName : request.clientName}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {isClient
                    ? 'proveedor@email.com'
                    : (request as any).clientEmail || 'cliente@email.com'}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {isClient ? '+34 600 000 000' : (request as any).clientPhone || '+34 600 000 000'}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Detalles del proyecto
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
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                    {request.location}
                  </p>
                )}
                {request.urgency && (
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {getUrgencyLabel(request.urgency)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción del proyecto
            </h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {request.description}
            </p>
          </div>

          {/* Respuesta del proveedor */}
          {(request as any).response && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Respuesta del proveedor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{(request as any).response}</p>
              {(request as any).whatsappContact && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Contacto: {(request as any).whatsappContact}
                </p>
              )}
            </div>
          )}

          {/* Acciones para proveedor */}
          {isProvider && request.status === 'pendiente' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
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

          {/* Estado para cliente */}
          {isClient && request.status !== 'pendiente' && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p
                  className={`font-medium ${request.status === 'aceptado' || request.status === 'completado' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {request.status === 'aceptado' || request.status === 'completado' ? (
                    <>✅ El proveedor ha aceptado tu solicitud</>
                  ) : request.status === 'rechazado' ? (
                    <>❌ El proveedor ha rechazado tu solicitud</>
                  ) : (
                    <>📋 Tu solicitud está en proceso</>
                  )}
                </p>
                {(request as any).response && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <span className="font-medium">Respuesta:</span> {(request as any).response}
                  </p>
                )}
                {(request as any).whatsappContact && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Contacto del proveedor: {(request as any).whatsappContact}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Botón de contacto (si está aceptado) */}
          {request.status === 'aceptado' && (request as any).whatsappContact && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <a
                href={`https://wa.me/${(request as any).whatsappContact.replace(/\s/g, '').replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Send className="w-4 h-4" />
                Contactar por WhatsApp
              </a>
            </div>
          )}

          {/* Botón para crear nueva solicitud */}
          {isClient && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                onClick={() => setShowRequestForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                <Send className="w-4 h-4" />
                Enviar nueva solicitud
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal del formulario de solicitud */}
      {showRequestForm && request && (
        <RequestForm
          providerId={request.providerId}
          providerName={request.providerName}
          onClose={() => setShowRequestForm(false)}
          onSuccess={() => {
            toast.success('✅ Solicitud enviada correctamente');
            setShowRequestForm(false);
            router.push('/dashboard/requests');
          }}
        />
      )}
    </div>
  );
}

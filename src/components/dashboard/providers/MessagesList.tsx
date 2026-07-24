'use client';
import { log } from '@/lib/utils/logger';

import { respondToMessage } from '@/lib/firebase/message.service';
import { MessageForm } from '@/types/message.types';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  MessageSquare,
  Phone,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MessagesListProps {
  messages: MessageForm[];
  role: 'client' | 'provider';
  onRespond?: () => void;
}

export const MessagesList = ({ messages, role, onRespond }: MessagesListProps) => {
  const [responding, setResponding] = useState<string | null>(null);
  const [showResponseForm, setShowResponseForm] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [whatsappContact, setWhatsappContact] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'aceptado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'rechazado':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'respondido':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'urgente':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'muy-urgente':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleRespond = async (messageId: string, status: 'aceptado' | 'rechazado') => {
    if (status === 'aceptado' && !responseText.trim()) {
      toast.error('Escribe un mensaje de respuesta');
      return;
    }

    setResponding(messageId);
    try {
      await respondToMessage(
        messageId,
        status,
        responseText,
        status === 'aceptado' ? whatsappContact || undefined : undefined
      );

      toast.success(status === 'aceptado' ? '✅ Solicitud aceptada' : '❌ Solicitud rechazada');
      setShowResponseForm(null);
      setResponseText('');
      setWhatsappContact('');
      onRespond?.();
    } catch (error) {
      toast.error('Error al responder');
    } finally {
      setResponding(null);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No hay mensajes</h3>
        <p className="text-gray-500 dark:text-gray-400">
          {role === 'client'
            ? 'Envía un mensaje a un proveedor'
            : 'Espera a que los clientes te contacten'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {message.category}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}
                >
                  {message.status === 'pendiente'
                    ? 'Pendiente'
                    : message.status === 'aceptado'
                      ? 'Aceptado'
                      : message.status === 'rechazado'
                        ? 'Rechazado'
                        : 'Respondido'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {role === 'client' ? `Para: ${message.providerName}` : `De: ${message.clientName}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getUrgencyIcon(message.urgency)}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <p className="text-gray-600 dark:text-gray-300 mb-4">{message.description}</p>

          {/* Detalles */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            {message.budget && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />${message.budget.toLocaleString()}
              </span>
            )}
            {message.timeline && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {message.timeline}
              </span>
            )}
            {/* ✅ Cliente - solo mostrar si existe */}
            {message.clientPhone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {message.clientPhone}
              </span>
            )}
          </div>

          {/* Respuesta del proveedor */}
          {message.response && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Respuesta:</p>
              <p className="text-gray-600 dark:text-gray-400">{message.response}</p>
              {message.whatsappContact && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Contacto: {message.whatsappContact}
                </p>
              )}
            </div>
          )}

          {/* Botones de acción para proveedor */}
          {role === 'provider' && message.status === 'pendiente' && (
            <div className="mt-4">
              {showResponseForm === message.id ? (
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Escribe tu respuesta..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    rows={3}
                  />
                  <input
                    type="text"
                    value={whatsappContact}
                    onChange={(e) => setWhatsappContact(e.target.value)}
                    placeholder="Tu número de WhatsApp (opcional)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRespond(message.id, 'aceptado')}
                      disabled={responding === message.id}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {responding === message.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      Aceptar
                    </button>
                    <button
                      onClick={() => handleRespond(message.id, 'rechazado')}
                      disabled={responding === message.id}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {responding === message.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      Rechazar
                    </button>
                    <button
                      onClick={() => setShowResponseForm(null)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowResponseForm(message.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Responder solicitud
                </button>
              )}
            </div>
          )}

          {/* Estado para cliente */}
          {role === 'client' && message.status !== 'pendiente' && (
            <div className="mt-4 text-sm">
              {message.status === 'aceptado' && (
                <p className="text-green-600 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  El proveedor ha aceptado tu solicitud
                </p>
              )}
              {message.status === 'rechazado' && (
                <p className="text-red-600 dark:text-red-400 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  El proveedor ha rechazado tu solicitud
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

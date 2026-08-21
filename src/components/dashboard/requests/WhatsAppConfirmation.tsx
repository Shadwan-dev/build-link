'use client';

import { CheckCircle, Loader2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface WhatsAppConfirmationProps {
  data: {
    category: string;
    description: string;
    images: string[];
    location: string;
    providers: any[];
    urgency: string;
  };
  onSend: () => void;
  onBack: () => void;
}

export const WhatsAppConfirmation = ({ data, onSend, onBack }: WhatsAppConfirmationProps) => {
  const [sending, setSending] = useState(false);

  const handleSendWhatsApp = () => {
    setSending(true);

    const providers = data.providers.map((p) => p.displayName).join(', ');
    const message = `📋 *Nuevo trabajo en MiMaestro*

🏗️ *Categoría:* ${data.category}
📝 *Descripción:* ${data.description}
📍 *Ubicación:* ${data.location}
⏰ *Urgencia:* ${data.urgency}
👨‍🔧 *Maestros seleccionados:* ${providers}
${data.images.length > 0 ? `📸 *Imágenes:* ${data.images.length} adjuntas` : ''}

Enviado desde MiMaestro - Encuentra al maestro que necesitas.`;

    // ✅ Número de WhatsApp (puede ser el del proveedor o grupo)
    const phone = '+56912345678';
    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(link, '_blank');

    toast.success('📱 Mensaje enviado por WhatsApp');
    setSending(false);
    onSend();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Resumen de la solicitud
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Categoría</span>
            <span className="font-medium text-gray-900 dark:text-white">{data.category}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Descripción</span>
            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
              {data.description}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Ubicación</span>
            <span className="font-medium text-gray-900 dark:text-white">{data.location}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
            <span className="text-gray-600 dark:text-gray-400">Urgencia</span>
            <span
              className={`font-medium ${
                data.urgency === 'muy-urgente'
                  ? 'text-red-500'
                  : data.urgency === 'urgente'
                    ? 'text-yellow-500'
                    : 'text-green-500'
              }`}
            >
              {data.urgency === 'muy-urgente'
                ? '🔴 Muy urgente'
                : data.urgency === 'urgente'
                  ? '🟡 Urgente'
                  : '🟢 Normal'}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600 dark:text-gray-400">Maestros</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data.providers.length} seleccionados
            </span>
          </div>
        </div>

        {data.images.length > 0 && (
          <div className="flex gap-2">
            {data.images.slice(0, 4).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
              />
            ))}
            {data.images.length > 4 && (
              <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm text-gray-500">
                +{data.images.length - 4}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Volver
        </button>
        <button
          onClick={handleSendWhatsApp}
          disabled={sending}
          className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4" />
              Enviar por WhatsApp
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        📱 Al enviar, serás redirigido a WhatsApp con el mensaje predefinido
      </p>
    </div>
  );
};

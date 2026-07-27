'use client';

import {
  generateWhatsAppMessage,
  generateWhatsAppMessageWithImage,
  getWhatsAppLink,
} from '@/lib/firebase/whatsapp.service';
import { Request } from '@/types/request.types';
import { Image, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface WhatsAppContactProps {
  request: Request;
  clientName: string;
  providerPhone: string;
  providerName: string;
  className?: string;
}

export const WhatsAppContact = ({
  request,
  clientName,
  providerPhone,
  providerName,
  className = '',
}: WhatsAppContactProps) => {
  const [customMessage, setCustomMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageOption, setShowImageOption] = useState(false);

  // ✅ Contactar por WhatsApp
  const handleContact = () => {
    if (!providerPhone || providerPhone.length < 8) {
      toast.error('El proveedor no tiene número de teléfono disponible');
      return;
    }

    // ✅ Generar mensaje base
    let message = customMessage || generateWhatsAppMessage(request, clientName);

    // ✅ Si hay imagen, incluirla
    if (imageUrl) {
      message = generateWhatsAppMessageWithImage(request, clientName, imageUrl);
    }

    const link = getWhatsAppLink(providerPhone, message, imageUrl || undefined);
    window.open(link, '_blank');

    toast.success(`📱 Contactando a ${providerName} por WhatsApp`);
  };

  // ✅ Copiar mensaje al portapapeles
  const handleCopyMessage = () => {
    const message = customMessage || generateWhatsAppMessage(request, clientName);
    navigator.clipboard.writeText(message);
    toast.success('📋 Mensaje copiado al portapapeles');
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            Contactar por WhatsApp
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Comunícate directamente con {providerName}
          </p>
        </div>
      </div>

      {/* Campos opcionales */}
      <div className="space-y-3">
        {/* Mensaje personalizado */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Mensaje personalizado (opcional)
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Escribe un mensaje personalizado..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
            rows={2}
          />
        </div>

        {/* Imagen anexa */}
        <div>
          <button
            type="button"
            onClick={() => setShowImageOption(!showImageOption)}
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            <Image className="w-3 h-3" />
            {showImageOption ? 'Ocultar opción de imagen' : 'Añadir imagen del proyecto'}
          </button>

          {showImageOption && (
            <div className="mt-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL de la imagen del proyecto..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Ingresa una URL de imagen (opcional)
              </p>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={handleContact}
            className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
          >
            <Send className="w-4 h-4" />
            Enviar por WhatsApp
          </button>

          <button
            onClick={handleCopyMessage}
            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
          >
            Copiar mensaje
          </button>
        </div>

        {/* Información de contacto */}
        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            📱 Número: <span className="font-medium">{providerPhone}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            👤 Proveedor: <span className="font-medium">{providerName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

import { Request } from '@/types/request.types';
import { createNotification } from './notification.service';

interface WhatsAppMessage {
  to: string;
  message: string;
  providerId: string;
  clientId: string;
  clientName: string;
  requestId: string;
  imageUrl?: string;
}

// ✅ Enviar notificación por WhatsApp
export const sendWhatsAppNotification = async (data: WhatsAppMessage): Promise<void> => {
  try {
    // ✅ Crear notificación en la app
    await createNotification(
      data.providerId,
      `📱 Mensaje de ${data.clientName}`,
      `${data.clientName} te ha enviado un mensaje: ${data.message.slice(0, 60)}...`,
      'message',
      `/dashboard/messages?request=${data.requestId}`
    );

    console.log(`📱 Notificación WhatsApp enviada a ${data.to}`);
  } catch (error) {
    console.error('❌ Error enviando WhatsApp:', error);
    throw new Error('Error al enviar mensaje por WhatsApp');
  }
};

// ✅ GENERAR ENLACE DE WHATSAPP CON MENSAJE Y IMAGEN
export const getWhatsAppLink = (phone: string, message: string, imageUrl?: string): string => {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanMessage = encodeURIComponent(message);

  // ✅ Si hay imagen, añadir al mensaje
  if (imageUrl) {
    return `https://wa.me/${cleanPhone}?text=${cleanMessage}%0A%0A📷 ${encodeURIComponent(imageUrl)}`;
  }

  return `https://wa.me/${cleanPhone}?text=${cleanMessage}`;
};

// ✅ Generar mensaje personalizado con datos de la solicitud
export const generateWhatsAppMessage = (request: Request, clientName: string): string => {
  const message = `
Hola, soy ${clientName} de MiMaestro.

📋 Solicitud: ${request.categoryName}
📝 Descripción: ${request.description}
📍 Ubicación: ${request.location || 'No especificada'}
⏰ Urgencia: ${request.urgency || 'Normal'}

¿Podrías ayudarme con este proyecto? ¡Gracias! 🏗️
  `.trim();

  return message;
};

// ✅ Generar mensaje con enlace a imagen
export const generateWhatsAppMessageWithImage = (
  request: Request,
  clientName: string,
  imageUrl: string
): string => {
  const message = `
Hola, soy ${clientName} de MiMaestro.

📋 Solicitud: ${request.categoryName}
📝 Descripción: ${request.description}
📍 Ubicación: ${request.location || 'No especificada'}
⏰ Urgencia: ${request.urgency || 'Normal'}

📷 Adjunto imagen del proyecto: ${imageUrl}

¿Podrías ayudarme con este proyecto? ¡Gracias! 🏗️
  `.trim();

  return message;
};

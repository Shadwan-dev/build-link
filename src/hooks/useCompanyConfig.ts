// src/hooks/useCompanyConfig.ts
import { clientConfig } from '@/src/config/client-config';
import { useMemo } from 'react';

export const useCompanyConfig = () => {
  return useMemo(
    () => ({
      // Información básica
      company: clientConfig.company,
      contact: clientConfig.contact,
      services: clientConfig.services,
      branding: clientConfig.branding,

      // Métodos utilitarios
      getWhatsAppLink: (message?: string) => {
        const defaultMessage = `Hola ${clientConfig.company.name}, estoy interesado en sus productos.`;
        return `${clientConfig.social.whatsapp.url}?text=${encodeURIComponent(message || defaultMessage)}`;
      },

      getEmailLink: (subject?: string, body?: string) => {
        const defaultSubject = `Consulta - ${clientConfig.company.name}`;
        const defaultBody = `Estimados,\n\nMe interesa obtener información sobre:\n\n`;
        return `mailto:${clientConfig.contact.email.general}?subject=${encodeURIComponent(subject || defaultSubject)}&body=${encodeURIComponent(body || defaultBody)}`;
      },

      getDirectionsLink: () => {
        return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clientConfig.contact.headquarters.address)}`;
      },

      getServiceById: (id: string) => {
        return clientConfig.services.categories.find(
          (service) => service.id === id
        );
      },

      getAllProducts: () => {
        return clientConfig.services.categories.flatMap((category) =>
          category.items.map((item) => ({
            ...item,
            category: category.name,
            categoryId: category.id,
            icon: category.icon,
          }))
        );
      },

      getProductsByCategory: (categoryId: string) => {
        const category = clientConfig.services.categories.find(
          (c) => c.id === categoryId
        );
        return category?.items || [];
      },

      // Métodos de contacto
      contactMethods: {
        call: () =>
          (window.location.href = `tel:${clientConfig.contact.phone.primary}`),
        whatsapp: (message?: string) =>
          window.open(
            `https://wa.me/${clientConfig.contact.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(message || '')}`,
            '_blank'
          ),
        email: (subject?: string, body?: string) =>
          (window.location.href = `mailto:${clientConfig.contact.email.general}?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(body || '')}`),
        maps: () =>
          window.open(
            `https://maps.google.com/?q=${encodeURIComponent(clientConfig.contact.headquarters.address)}`,
            '_blank'
          ),
      },

      // Formateadores
      formatPhone: (phone: string) => {
        return phone.replace(/(\d{2})(\d{2})(\d{3})(\d{3})/, '($1) $2-$3-$4');
      },

      formatCurrency: (amount: number, currency: string = 'CUP') => {
        return new Intl.NumberFormat('es-CU', {
          style: 'currency',
          currency: currency === 'USD' ? 'USD' : 'CUP',
          minimumFractionDigits: 2,
        }).format(amount);
      },

      // Validaciones
      isValidService: (serviceId: string) => {
        return clientConfig.services.categories.some((c) => c.id === serviceId);
      },

      // Horarios
      isOpenNow: () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ...

        if (day === 0) return false; // Domingo cerrado
        if (day === 6) {
          // Sábado
          const [open, close] =
            clientConfig.contact.schedule.saturday.open.split(':');
          return currentTime >= open && currentTime <= close;
        }

        // Lunes a Viernes
        const [open, close] =
          clientConfig.contact.schedule.weekdays.open.split(':');
        return currentTime >= open && currentTime <= close;
      },

      // Métricas
      getStats: () => ({
        totalServices: clientConfig.services.categories.length,
        totalProducts: clientConfig.services.categories.reduce(
          (acc, cat) => acc + cat.items.length,
          0
        ),
        yearsInBusiness:
          new Date().getFullYear() - clientConfig.company.foundedYear,
        coverageAreas: Object.values(clientConfig.coverage).flat().length,
      }),
    }),
    []
  );
};

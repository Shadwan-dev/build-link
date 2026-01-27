'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useClient } from '../tenant/ClientProvider';
import { getConfigHelpers } from '@/src/config/client-config';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  productType: string;
  message: string;
  budget: string;
  subscribe?: boolean;
}

interface ContactInfo {
  icon: string;
  title: string;
  details: string[]; // ¡SOLO STRINGS!
  action: string;
  actionLabel: string;
  color: string;
}

const Contact: React.FC = () => {
  const client = useClient();
  const helpers = getConfigHelpers();

  // Obtener información de contacto usando helpers
  const contactInfo = helpers.getContactInfo();
  const isBusinessOpen = helpers.isBusinessOpen();
  const whatsappLink = helpers.getWhatsAppLink();
  const googleMapsLink = helpers.getGoogleMapsLink();

  // Función segura para obtener datos de contacto
  const getSafeContactData = () => {
    // Teléfono principal
    const phone =
      typeof client.contact.phones === 'object'
        ? client.contact.phones.primary
        : client.contact.phone;

    // WhatsApp (asegurar que sea string)
    const whatsappNumber =
      typeof client.contact.whatsapp === 'object'
        ? client.contact.whatsapp.number
        : client.contact.whatsapp;

    // Email (asegurar que sea string)
    const email =
      typeof client.contact.emails === 'object'
        ? client.contact.emails.general
        : client.contact.email;

    // Dirección
    const address =
      client.contact.locations?.[0]?.address ||
      (typeof client.contact.address === 'string'
        ? client.contact.address
        : 'Dirección no disponible');

    return { phone, whatsappNumber, email, address };
  };

  const contactData = getSafeContactData();

  // Estados del formulario
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    productType: '',
    message: '',
    budget: '',
    subscribe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en el formulario
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          companyInfo: {
            name: client.company.name,
            phone: contactData.phone,
            email: contactData.email,
          },
          timestamp: new Date().toISOString(),
          source: 'website-contact-form',
          userAgent: navigator.userAgent,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el formulario');
      }

      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          interest: '',
          productType: '',
          message: '',
          budget: '',
          subscribe: false,
        });
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Información de contacto estructurada - ¡SOLO STRINGS!
  const contactSections: ContactInfo[] = [
    {
      icon: '📍',
      title: 'Sede Principal',
      details: [contactData.address, 'Baracoa, Guantánamo', 'Cuba'],
      action: googleMapsLink,
      actionLabel: 'Ver en Google Maps',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '📞',
      title: 'Teléfonos de Contacto',
      details: [
        contactData.phone,
        contactData.whatsappNumber, // ¡AHORA ES UN STRING!
        'Lunes a Viernes: 8am - 6pm',
      ],
      action: `tel:${contactData.phone.replace(/\s+/g, '')}`,
      actionLabel: 'Llamar ahora',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: '✉️',
      title: 'Correo Electrónico',
      details: [
        contactData.email,
        'Respuesta en 24h hábiles',
        'Cotizaciones y consultas',
      ],
      action: `mailto:${contactData.email}`,
      actionLabel: 'Enviar email',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: '💬',
      title: 'WhatsApp Business',
      details: [
        contactData.whatsappNumber, // ¡AHORA ES UN STRING!
        'Chat directo',
        'Respuesta inmediata',
      ],
      action: whatsappLink,
      actionLabel: 'Abrir WhatsApp',
      color: 'from-green-500 to-green-600',
    },
  ];

  // Tipos de interés
  const interestTypes = [
    'Compra al por mayor',
    'Compra al por menor',
    'Distribución exclusiva',
    'Producto específico',
    'Cotización personalizada',
    'Consulta general',
    'Solicitud de muestra',
    'Visita comercial',
  ];

  // Obtener servicios para el select
  const allServices = client.services.categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
  }));

  // Rangos de presupuesto
  const budgetRanges = [
    'Menos de $1,000',
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    'Más de $50,000',
    'A consultar',
  ];

  // Obtener horarios de manera segura
  const getSafeBusinessHours = () => {
    if (client.contact.schedule) {
      return {
        weekdays:
          client.contact.schedule.weekdays?.display || '8:00 AM - 6:00 PM',
        saturday:
          client.contact.schedule.saturday?.display || '9:00 AM - 1:00 PM',
        sunday: client.contact.schedule.sunday || 'Cerrado',
      };
    }

    if (client.contact.businessHours) {
      return {
        weekdays: client.contact.businessHours.weekdays || '8:00 AM - 6:00 PM',
        saturday: client.contact.businessHours.saturday || '9:00 AM - 1:00 PM',
        sunday: client.contact.businessHours.sunday || 'Cerrado',
      };
    }

    return {
      weekdays: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Cerrado',
    };
  };

  const businessHours = getSafeBusinessHours();

  // Obtener teléfono de emergencia de manera segura
  const getEmergencyPhone = () => {
    if (typeof client.contact.emergency === 'object') {
      return client.contact.emergency.phone || 'No disponible';
    }

    if (typeof client.contact.emergencyContact === 'string') {
      return client.contact.emergencyContact;
    }

    return 'No disponible';
  };

  const emergencyPhone = getEmergencyPhone();

  // Obtener métodos de pago de manera segura
  const paymentMethods = Array.isArray(client.payment?.methods)
    ? client.payment.methods
        .filter((method: any) => method.available && !method.comingSoon)
        .map((method: any) => method.name)
    : ['Efectivo', 'Transferencia bancaria', 'Cheque certificado'];

  // Obtener cobertura de manera segura
  const getCoverageData = () => {
    if (client.coverage) {
      return Object.entries(client.coverage).map(
        ([key, value]: [string, any]) => ({
          key,
          deliveryTime: value.deliveryTime || 'Consultar',
        })
      );
    }

    return [
      { key: 'local', deliveryTime: '24-48 horas' },
      { key: 'provincial', deliveryTime: '48-72 horas' },
      { key: 'national', deliveryTime: '3-5 días' },
    ];
  };

  const coverageData = getCoverageData();

  return (
    <section id="contact" className="py-12 md:py-16 bg-white">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado con branding AKΠ */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full border border-blue-200/50 mb-6">
            <span className="text-blue-600 text-sm">📞</span>
            <span className="text-xs font-semibold text-blue-800 tracking-wide">
              CONTACTO EMPRESARIAL AKΠ
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Hablemos sobre{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              su proyecto
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Complete el formulario y un especialista de AKΠ se pondrá en
            contacto para ofrecerle la mejor solución para sus necesidades
            comerciales.
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fadeIn">
            <p className="text-sm flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Columna izquierda - Información de contacto */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-blue-600">📋</span>
              Información de contacto
            </h3>

            <div className="space-y-4 mb-8">
              {contactSections.map((info, index) => (
                <a
                  key={index}
                  href={info.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group transform hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <span className="text-lg text-white">{info.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base group-hover:text-blue-700 transition-colors">
                        {info.title}
                      </h4>
                      <div className="space-y-1.5 mb-3">
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-gray-600 text-xs md:text-sm leading-relaxed"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                      <span className="inline-flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                        {info.actionLabel}
                        <svg
                          className="w-3 h-3 ml-1.5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Horario de atención con estado */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${isBusinessOpen ? 'bg-gradient-to-br from-emerald-500 to-green-500' : 'bg-gradient-to-br from-amber-500 to-orange-500'} flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-white text-sm">
                      {isBusinessOpen ? '🕐' : '⏰'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Horario de atención
                    </h4>
                    <p
                      className={`text-xs font-medium ${isBusinessOpen ? 'text-emerald-600' : 'text-amber-600'}`}
                    >
                      {isBusinessOpen ? '✅ Abierto ahora' : '❌ Cerrado ahora'}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  Hora local:{' '}
                  {new Date().toLocaleTimeString('es-CU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2.5 border-b border-blue-100">
                  <span className="text-gray-700 text-sm font-medium">
                    Lunes - Viernes
                  </span>
                  <span className="font-semibold text-blue-700 text-sm">
                    {businessHours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-blue-100">
                  <span className="text-gray-700 text-sm font-medium">
                    Sábado
                  </span>
                  <span className="font-semibold text-blue-700 text-sm">
                    {businessHours.saturday}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-gray-700 text-sm font-medium">
                    Domingo
                  </span>
                  <span className="font-semibold text-gray-500 text-sm">
                    {businessHours.sunday}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-blue-100">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-blue-600">
                    Emergencias:
                  </span>{' '}
                  {emergencyPhone}
                </p>
              </div>
            </div>

            {/* Certificaciones de calidad */}
            <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-amber-600">🏅</span>
                Certificaciones de calidad
              </h4>
              <div className="space-y-2">
                {client.certifications &&
                  client.certifications
                    .slice(0, 3)
                    .map((cert: any, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-emerald-500 text-sm mt-0.5">
                          ✓
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {cert.name}
                          </p>
                          <p className="text-xs text-gray-500">{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
              </div>
              {client.certifications && client.certifications.length > 3 && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  +{client.certifications.length - 3} certificaciones
                  adicionales
                </p>
              )}
            </div>
          </div>

          {/* Columna derecha - Formulario de cotización */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Solicitar cotización personalizada
                </h3>
                <p className="text-gray-600 text-sm">
                  Complete los datos y reciba una propuesta comercial adaptada a
                  sus necesidades específicas.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-10 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mx-auto mb-5">
                    <span className="text-4xl text-emerald-600">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    ¡Solicitud enviada con éxito!
                  </h4>
                  <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                    Hemos recibido su consulta. Un ejecutivo especializado de
                    AKΠ se pondrá en contacto con usted dentro de las próximas{' '}
                    <span className="font-semibold">24 horas hábiles</span>.
                  </p>
                  <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100">
                    <p className="text-sm text-emerald-800 font-medium flex items-center justify-center gap-2">
                      <span>📧</span>
                      Se ha enviado confirmación a {formData.email}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300 text-sm"
                    >
                      Nueva solicitud
                    </button>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      <span>💬</span>
                      Contactar por WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Datos personales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors placeholder:text-gray-400 text-sm bg-white"
                        placeholder="Ej: Juan Pérez Rodríguez"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors placeholder:text-gray-400 text-sm bg-white"
                        placeholder="Ej: +53 5 123 4567"
                      />
                    </div>
                  </div>

                  {/* Datos de empresa */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors placeholder:text-gray-400 text-sm bg-white"
                        placeholder="ejemplo@empresa.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Empresa / Organización
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors placeholder:text-gray-400 text-sm bg-white"
                        placeholder="Nombre de su empresa"
                      />
                    </div>
                  </div>

                  {/* Interés y producto */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="interest"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tipo de interés *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm bg-white appearance-none"
                      >
                        <option value="">Seleccione una opción</option>
                        {interestTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="productType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Producto/Servicio de interés *
                      </label>
                      <select
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm bg-white appearance-none"
                      >
                        <option value="">Seleccione producto</option>
                        {allServices.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.icon} {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Presupuesto y mensaje */}
                  <div className="space-y-1">
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Presupuesto estimado (opcional)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm bg-white appearance-none"
                    >
                      <option value="">Seleccione rango de inversión</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Detalles de su consulta *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors placeholder:text-gray-400 text-sm bg-white resize-y"
                      placeholder="Describa sus necesidades específicas, cantidades requeridas, frecuencia de compra, especificaciones técnicas, etc..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Cuanto más detallada sea su consulta, más precisa será
                      nuestra cotización.
                    </p>
                  </div>

                  {/* Checkboxes de consentimiento */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        required
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="privacy"
                        className="text-xs text-gray-600"
                      >
                        Acepto la{' '}
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          política de privacidad
                        </a>{' '}
                        y autorizo a {client.company.name} a contactarme para
                        atender mi consulta comercial. Mis datos serán tratados
                        con confidencialidad y únicamente para fines
                        comerciales.
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="subscribe"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="subscribe"
                        className="text-xs text-gray-600"
                      >
                        Deseo recibir información comercial, promociones y
                        novedades de {client.company.name}.
                      </label>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3.5 px-4 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Procesando solicitud...
                      </div>
                    ) : (
                      'Enviar solicitud de cotización'
                    )}
                  </button>

                  {/* Información adicional */}
                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">
                        Tiempo de respuesta garantizado:
                      </span>{' '}
                      24 horas hábiles
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ¿Prefiere contacto inmediato?{' '}
                      <a
                        href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                        className="text-blue-600 font-semibold hover:text-blue-700"
                      >
                        Llamar ahora
                      </a>{' '}
                      o{' '}
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-semibold hover:text-green-700"
                      >
                        escribir por WhatsApp
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Métodos de pago y logística */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Métodos de pago */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">💳</span>
                  Métodos de pago aceptados
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {paymentMethods.map((method, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1.5 bg-white text-gray-700 rounded-lg text-xs border border-gray-300 font-medium shadow-sm"
                    >
                      {method}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Consultar condiciones especiales para clientes frecuentes
                </p>
              </div>

              {/* Logística */}
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-5 border border-blue-100">
                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-emerald-600">🚚</span>
                  Logística nacional
                </h4>
                <div className="space-y-2">
                  {coverageData.map((item: any) => (
                    <div
                      key={item.key}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs text-gray-700 capitalize">
                        {item.key}:
                      </span>
                      <span className="text-xs font-semibold text-blue-700">
                        {item.deliveryTime}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Cobertura en toda Cuba con seguimiento en tiempo real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de CTA adicional */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-1 shadow-xl">
            <div className="bg-white rounded-xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-lg">
                <span className="text-2xl">📞</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                ¿Necesita atención inmediata o cotización urgente?
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                Contamos con equipo especializado disponible para atender sus
                consultas prioritarias y ofrecer soluciones rápidas para su
                negocio.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  <span className="mr-2">📱</span>
                  Llamar ahora: {contactData.phone}
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                >
                  <span className="mr-2">💬</span>
                  WhatsApp Business
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Horario extendido para consultas urgentes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

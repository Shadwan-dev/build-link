// components/dashboard/AkpiDashboard.tsx
'use client';

import { useCompanyConfig } from '@/hooks/useCompanyConfig';
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCertificate,
} from 'react-icons/fa';

export const AkpiDashboard = () => {
  const config = useCompanyConfig();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Tarjeta de Información Empresarial */}
      <div className="bg-white rounded-xl shadow-soft p-6 col-span-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {config.company.name}
            </h1>
            <p className="text-accent italic">{config.company.slogan}</p>
          </div>
          <div className="text-sm text-gray-500">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
              {config.getStats().yearsInBusiness} años en el mercado
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">{config.company.description}</p>

        <div className="flex flex-wrap gap-2">
          {config.company.values.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Tarjeta de Contacto */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-accent" />
          Información de Contacto
        </h3>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-700">Dirección:</p>
            <p className="text-gray-600">
              {config.contact.headquarters.address}
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Teléfono:</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">
                {config.formatPhone(config.contact.phone.primary)}
              </span>
              <button
                onClick={() => config.contactMethods.call()}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition"
              >
                Llamar
              </button>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700">WhatsApp:</p>
            <button
              onClick={() => config.contactMethods.whatsapp()}
              className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition"
            >
              <FaWhatsapp />
              {config.formatPhone(config.contact.whatsapp.number)}
            </button>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <button
              onClick={() => config.contactMethods.email()}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded-lg text-sm hover:bg-accent-dark transition"
            >
              <FaEnvelope />
              {config.contact.email.general}
            </button>
          </div>
        </div>
      </div>

      {/* Tarjeta de Horarios */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <FaClock className="text-accent" />
          Horario de Atención
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              Lunes a Viernes:
            </span>
            <span
              className={
                config.isOpenNow() && new Date().getDay() <= 5
                  ? 'text-success font-semibold'
                  : 'text-gray-600'
              }
            >
              {config.contact.schedule.weekdays.display}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Sábado:</span>
            <span
              className={
                config.isOpenNow() && new Date().getDay() === 6
                  ? 'text-success font-semibold'
                  : 'text-gray-600'
              }
            >
              {config.contact.schedule.saturday.display}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Domingo:</span>
            <span className="text-gray-600">
              {config.contact.schedule.sunday}
            </span>
          </div>

          <div className="mt-4 p-3 bg-primary/5 rounded-lg">
            <p className="text-sm font-semibold text-primary">
              Estado actual: {config.isOpenNow() ? '✅ Abierto' : '❌ Cerrado'}
            </p>
          </div>
        </div>
      </div>

      {/* Tarjeta de Certificaciones */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
          <FaCertificate className="text-accent" />
          Certificaciones
        </h3>

        <ul className="space-y-2">
          {config.certifications.map((cert, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-success mt-1">✓</span>
              <div>
                <p className="font-semibold text-gray-700">{cert.name}</p>
                <p className="text-sm text-gray-500">
                  {cert.issuer} • {cert.id}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tarjeta de Métodos de Pago */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Métodos de Pago</h3>

        <div className="space-y-3">
          {config.payment.methods.map((method, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="font-semibold text-gray-700">
                  {method.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">{method.details}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de Servicios */}
      <div className="bg-white rounded-xl shadow-soft p-6 col-span-full">
        <h3 className="text-xl font-bold text-primary mb-4">
          Nuestros Servicios
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.services.categories.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg p-4 hover:shadow-medium transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{service.icon}</span>
                <h4 className="font-bold text-gray-800">{service.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/5 text-primary rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                <strong>Entrega:</strong> {service.deliveryTime} •
                <strong> Cobertura:</strong> {service.coverage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

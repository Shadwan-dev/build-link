// components/layout/Footer.tsx - VERSIÓN ACTUALIZADA
'use client';

import React from 'react';
import { useClient } from '../tenant/ClientProvider';
import Image from 'next/image';
import { getConfigHelpers } from '@/src/config/client-config';

interface FooterLink {
  name: string;
  href: string;
  icon?: string;
}

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

const Footer: React.FC = () => {
  const client = useClient();
  const helpers = getConfigHelpers();
  const currentYear = new Date().getFullYear();

  // Función segura para obtener datos de contacto
  const getSafeContactData = () => {
    // Teléfono principal
    const phone =
      typeof client.contact.phones === 'object'
        ? client.contact.phones.primary
        : typeof client.contact.phone === 'string'
          ? client.contact.phone
          : '+53 55302391';

    // WhatsApp
    const whatsapp =
      typeof client.contact.whatsapp === 'object'
        ? client.contact.whatsapp.number
        : typeof client.contact.whatsapp === 'string'
          ? client.contact.whatsapp
          : '+5355302391';

    // Email
    const email =
      typeof client.contact.emails === 'object'
        ? client.contact.emails.general
        : typeof client.contact.email === 'string'
          ? client.contact.email
          : 'akapisrl@gmail.com';

    // Dirección
    const address =
      client.contact.locations?.[0]?.address ||
      (typeof client.contact.address === 'string'
        ? client.contact.address
        : 'Puente Miel, Baracoa, Guantánamo, Cuba');

    return { phone, whatsapp, email, address };
  };

  const contactData = getSafeContactData();

  // Enlaces rápidos
  const quickLinks: FooterLink[] = [
    { name: 'Inicio', href: '/', icon: '🏠' },
    { name: 'Servicios', href: '#services', icon: '✨' },
    { name: 'Nosotros', href: '#about', icon: '🏢' },
    { name: 'Productos', href: '#portfolio', icon: '📦' },
    { name: 'Contacto', href: '#contact', icon: '📞' },
    { name: 'Cotización', href: '#contact', icon: '💰' },
  ];

  // Información de contacto
  const contactInfo: ContactInfo[] = [
    {
      icon: '📍',
      label: 'Ubicación',
      value: contactData.address,
    },
    {
      icon: '📞',
      label: 'Teléfono',
      value: contactData.phone,
      link: `tel:${contactData.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: '💬',
      label: 'WhatsApp',
      value: contactData.whatsapp,
      link: helpers.getWhatsAppLink(),
    },
    {
      icon: '✉️',
      label: 'Email',
      value: contactData.email,
      link: `mailto:${contactData.email}`,
    },
  ];

  // Redes sociales filtradas (solo las que tienen URL)
  const socialLinks =
    client.social.platforms?.filter(
      (platform) => platform.active && platform.url
    ) || [];

  // Servicios principales (máximo 4 para el footer)
  const mainServices = client.services?.categories?.slice(0, 4) || [];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container-custom py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Columna 1: Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              {/* Logo de la empresa */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-2 shadow-lg">
                <Image
                  src={client.company.logo?.primary || '/akpi-logo.png'}
                  alt={`Logo ${client.company.name}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="64px"
                  onError={(e) => {
                    // Fallback si el logo no carga
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                          <span class="text-white font-bold text-xl">AKΠ</span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  {client.company.name}
                </h3>
                <p className="text-gray-300 text-sm font-medium">
                  {client.company.slogan}
                </p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {client.company.description?.substring(0, 200)}...
            </p>

            {/* Valores de la empresa */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                Nuestros Valores
              </h4>
              <div className="flex flex-wrap gap-2">
                {client.company.values?.slice(0, 4).map((value, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                Conéctate con nosotros
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-300 flex items-center justify-center hover:scale-110 shadow-md"
                    aria-label={platform.name}
                    title={platform.name}
                  >
                    <span className="text-lg">
                      {getSocialIcon(platform.name)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {mainServices.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#services`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {service.icon || '✨'}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.name}
                    </span>
                  </a>
                </li>
              ))}
              {client.services?.categories?.length > 4 && (
                <li>
                  <a
                    href="#services"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                  >
                    Ver todos los servicios
                    <svg
                      className="w-4 h-4"
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
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Columna 3: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">
              Enlaces rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm group"
                  >
                    <span className="text-gray-500 group-hover:text-blue-400">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Enlaces legales */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h5 className="text-sm font-semibold text-gray-300 mb-3">
                Información Legal
              </h5>
              <div className="flex flex-wrap gap-3">
                {client.legal?.documents?.map((doc) => (
                  <a
                    key={doc.name}
                    href={doc.url}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {doc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contáctanos</h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="text-gray-400 mt-0.5 group-hover:text-blue-400 transition-colors">
                    {contact.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-300 mb-0.5">
                      {contact.label}
                    </div>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm break-words inline-block hover:underline"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <div className="text-gray-400 text-sm break-words">
                        {contact.value}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Horario de atención */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg border border-blue-500/20">
              <h5 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <span className="text-yellow-400">🕐</span>
                Horario de atención
              </h5>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="text-gray-300 font-medium">
                    {client.contact.schedule?.weekdays?.display ||
                      '8:00 AM - 6:00 PM'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="text-gray-300 font-medium">
                    {client.contact.schedule?.saturday?.display ||
                      '9:00 AM - 1:00 PM'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="text-gray-400">
                    {client.contact.schedule?.sunday || 'Cerrado'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {currentYear} {client.company.name}.{' '}
                {client.company.legalName}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-gray-600 text-xs">
                  CIF: {client.company.cif}
                </p>
                <span className="text-gray-700">•</span>
                <p className="text-gray-600 text-xs">
                  Baracoa, Guantánamo, Cuba
                </p>
                <span className="text-gray-700">•</span>
                <p className="text-gray-600 text-xs">
                  Fundado en {client.company.foundedYear}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Métodos de pago */}
              <div className="flex items-center gap-2">
                {client.payment?.methods
                  ?.filter((m) => m.available && !m.comingSoon)
                  .slice(0, 3)
                  .map((method, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-500"
                      title={method.name}
                    >
                      {getPaymentIcon(method.type)}
                    </span>
                  ))}
              </div>

              {/* Certificaciones */}
              {client.certifications && client.certifications.length > 0 && (
                <div className="hidden md:flex items-center gap-1 text-xs text-gray-600">
                  <span className="text-yellow-400">⭐</span>
                  <span>Certificados de calidad</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Función para obtener íconos de redes sociales
const getSocialIcon = (platformName: string): string => {
  const icons: Record<string, string> = {
    Facebook: '📘',
    Instagram: '📷',
    WhatsApp: '💬',
    LinkedIn: '💼',
    Twitter: '🐦',
    YouTube: '🎬',
    TikTok: '🎵',
    Email: '✉️',
  };

  return icons[platformName] || '🔗';
};

// Función para obtener íconos de métodos de pago
const getPaymentIcon = (paymentType: string): string => {
  const icons: Record<string, string> = {
    cash: '💵',
    bank_transfer: '🏦',
    check: '📄',
    credit: '💳',
    card: '💳',
    mobile: '📱',
  };

  return icons[paymentType] || '💰';
};

export default Footer;

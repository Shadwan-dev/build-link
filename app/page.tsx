// app/page.tsx
'use client';

import Header from '@/src/components/layout/Header';
import Footer from '@/src/components/layout/Footer';
import Hero from '@/src/components/sections/Hero';
import Services from '@/src/components/sections/Services';
import About from '@/src/components/sections/About';
import Portfolio from '@/src/components/sections/Portfolio';
import Testimonials from '@/src/components/sections/Testimonials';
import Contact from '@/src/components/sections/Contact';
import ClientProvider from '@/src/components/tenant/ClientProvider';
import { clientConfig } from '@/src/config/client-config';

export default function Home() {
  return (
    <ClientProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section
            id="home"
            className="bg-gradient-to-br from-blue-50/30 to-emerald-50/30"
          >
            <Hero />
          </section>

          {/* Services Section */}
          <section id="services" className="bg-white">
            <Services />
          </section>

          {/* About Section */}
          <section id="about" className="bg-gray-50">
            <About />
          </section>

          {/* Portfolio/Productos Section */}
          <section id="portfolio" className="bg-white">
            <Portfolio />
          </section>

          {/* Testimonials/Clientes Section */}
          <section id="testimonials" className="bg-gray-50">
            <Testimonials />
          </section>

          {/* Contact Section */}
          <section id="contact" className="bg-white">
            <Contact />
          </section>
        </main>

        <Footer />

        {/* Botón flotante de WhatsApp */}
        <a
          href={`https://wa.me/${clientConfig.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-hard hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 animate-float"
          aria-label="Contactar por WhatsApp"
        >
          <span className="text-2xl text-white">💬</span>
        </a>

        {/* Botón para subir */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-hard hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 hover:bg-gray-900"
          aria-label="Volver arriba"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </ClientProvider>
  );
}

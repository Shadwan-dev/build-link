// app/layout.tsx - CON FAVICON Y METADATA
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AKΠ S.R.L. - Acá, pida... y recibirá',
  description:
    'Especializados en alimentos baracoenses y materiales de construcción de alta calidad en Cuba.',
  icons: {
    icon: [
      {
        url: '/akpi-logo.png', // Usa tu logo como favicon
        type: 'image/png',
      },
      {
        url: '/favicon.ico', // Fallback tradicional
        rel: 'icon',
      },
    ],
    apple: [
      {
        url: '/akpi-logo.png', // Para Apple devices
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Meta tags básicos */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon manual (opcional) */}
        <link rel="icon" href="/akpi-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/akpi-logo.png" />

        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="AKΠ S.R.L." />
        <meta
          property="og:description"
          content="Especializados en alimentos baracoenses y materiales de construcción"
        />
        <meta property="og:image" content="/akpi-logo.png" />
        <meta property="og:url" content="https://akpisrl.com" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

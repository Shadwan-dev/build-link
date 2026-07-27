import { PushNotificationManager } from '@/components/common/PushNotificationManager';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'MiMaestro - Encuentra al profesional que necesitas',
    template: '%s | MiMaestro',
  },
  description:
    'Conectamos clientes con profesionales verificados en construcción, albañilería, carpintería y más. Encuentra a tu maestro de confianza.',
  keywords:
    'construcción, albañilería, carpintería, profesionales, servicios, reformas, obras, maestro',
  authors: [{ name: 'MiMaestro' }],
  creator: 'MiMaestro',
  publisher: 'MiMaestro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://mimaestro.com',
    siteName: 'MiMaestro',
    title: 'MiMaestro - Encuentra al profesional que necesitas',
    description:
      'Encuentra los mejores profesionales en construcción, albañilería y carpintería en un solo lugar.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'MiMaestro - Profesionales de la construcción',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiMaestro - Encuentra al profesional que necesitas',
    description: 'Encuentra los mejores profesionales en construcción, albañilería y carpintería.',
    images: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="6" fill="%232563EB"/><path d="M10 14L16 10L22 14L16 18L10 14Z" stroke="white" stroke-width="2" stroke-linejoin="round" fill="rgba(255,255,255,0.1)"/><rect x="13" y="14" width="6" height="8" rx="1" stroke="white" stroke-width="2"/><path d="M18 22L15 25L12 22" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="2.5" fill="%23F59E0B"/></svg>',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="6" fill="%232563EB"/><path d="M10 14L16 10L22 14L16 18L10 14Z" stroke="white" stroke-width="2" stroke-linejoin="round" fill="rgba(255,255,255,0.1)"/><rect x="13" y="14" width="6" height="8" rx="1" stroke="white" stroke-width="2"/><path d="M18 22L15 25L12 22" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="2.5" fill="%23F59E0B"/></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            <PushNotificationManager />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: '!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white',
                style: {
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                success: {
                  className:
                    '!bg-green-50 dark:!bg-green-900/30 !text-green-800 dark:!text-green-300',
                },
                error: {
                  className: '!bg-red-50 dark:!bg-red-900/30 !text-red-800 dark:!text-red-300',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

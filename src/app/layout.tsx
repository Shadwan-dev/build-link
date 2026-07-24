import { log } from '@/lib/utils/logger';
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
    default: 'BuildLink - Conecta con profesionales de la construcción',
    template: '%s | BuildLink',
  },
  description:
    'Conectamos clientes con profesionales verificados en construcción, albañilería, carpintería y más. Encuentra al experto que necesitas.',
  keywords: 'construcción, albañilería, carpintería, profesionales, servicios, reformas, obras',
  authors: [{ name: 'BuildLink' }],
  creator: 'BuildLink',
  publisher: 'BuildLink',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://buildlink.com',
    siteName: 'BuildLink',
    title: 'BuildLink - Conecta con profesionales de la construcción',
    description:
      'Encuentra los mejores profesionales en construcción, albañilería y carpintería en un solo lugar.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'BuildLink - Profesionales de la construcción',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildLink - Conecta con profesionales de la construcción',
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
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="6" fill="%232563EB"/><path d="M11 9H17C18.6569 9 20 10.3431 20 12C20 13.6569 18.6569 15 17 15H14M14 15H11M14 15V21M11 21H17" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="22" cy="22" r="3" fill="%23F59E0B"/><path d="M20 22L21.5 23.5L24.5 20.5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="6" fill="%232563EB"/><path d="M11 9H17C18.6569 9 20 10.3431 20 12C20 13.6569 18.6569 15 17 15H14M14 15H11M14 15V21M11 21H17" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="22" cy="22" r="3" fill="%23F59E0B"/><path d="M20 22L21.5 23.5L24.5 20.5" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>',
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

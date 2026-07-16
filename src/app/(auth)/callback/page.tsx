'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { handleGoogleRedirect, loading } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleGoogleRedirect();
        // Si todo sale bien, redirigir al dashboard
        router.push('/dashboard');
      } catch (error) {
        console.error('Error en callback de autenticación:', error);
        router.push('/login');
      }
    };

    handleCallback();
  }, [handleGoogleRedirect, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800">Procesando autenticación...</h2>
        <p className="text-gray-600 mt-2">Por favor espera mientras te redirigimos</p>
      </div>
    </div>
  );
}

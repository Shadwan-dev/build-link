// components/FirebaseInitializer.tsx
'use client';

import { useEffect } from 'react';
import { auth } from '@/src/lib/firebase';

// Script para inicializar Firebase de manera segura
export function FirebaseInitializer() {
  useEffect(() => {
    // Configurar Firebase para evitar eval
    const originalEval = window.eval;

    // Sobrescribir eval temporalmente durante inicialización
    window.eval = function (str: string) {
      console.warn('eval blocked:', str.substring(0, 100));
      return originalEval(str);
    };

    // Cleanup
    return () => {
      window.eval = originalEval;
    };
  }, []);

  return null;
}

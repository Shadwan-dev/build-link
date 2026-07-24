import toast from 'react-hot-toast';

// ✅ Niveles de log
type LogLevel = 'info' | 'success' | 'warning' | 'error';

// ✅ Configuración
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// ✅ Función para formatear errores
const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'Error desconocido';
};

// ✅ Función principal de logging
const logger = {
  info: (message: string, data?: any) => {
    if (!IS_PRODUCTION) {
      console.log(`ℹ️ ${message}`, data || '');
    }
  },

  success: (message: string, data?: any) => {
    if (!IS_PRODUCTION) {
      console.log(`✅ ${message}`, data || '');
    }
    if (IS_PRODUCTION) {
      toast.success(message);
    }
  },

  warning: (message: string, data?: any) => {
    if (!IS_PRODUCTION) {
      console.warn(`⚠️ ${message}`, data || '');
    }
    if (IS_PRODUCTION) {
      toast(message, { icon: '⚠️' });
    }
  },

  error: (message: string, error?: unknown) => {
    const errorMessage = error ? formatError(error) : '';
    const fullMessage = errorMessage ? `${message}: ${errorMessage}` : message;

    if (!IS_PRODUCTION) {
      console.error(`❌ ${fullMessage}`, error || '');
    }
    if (IS_PRODUCTION) {
      toast.error(fullMessage);
    }
  },

  // ✅ Para desarrollo con más detalle
  debug: (message: string, data?: any) => {
    if (!IS_PRODUCTION) {
      console.debug(`🔍 ${message}`, data || '');
    }
  },
};

// ✅ Exportar como default
export default logger;

// ✅ También exportar como log para compatibilidad
export const log = logger;

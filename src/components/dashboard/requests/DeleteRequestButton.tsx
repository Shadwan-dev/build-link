'use client';

import { useAuth } from '@/contexts/AuthContext';
import { deletePendingRequest } from '@/lib/firebase/requests.service';
import { log } from '@/lib/utils/logger';
import { AlertCircle, Loader2, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface DeleteRequestButtonProps {
  requestId: string;
  onDeleted?: () => void;
  className?: string;
  variant?: 'button' | 'text' | 'icon';
}

export const DeleteRequestButton = ({
  requestId,
  onDeleted,
  className = '',
  variant = 'button',
}: DeleteRequestButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reason, setReason] = useState('');

  const handleDelete = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión');
      return;
    }

    setLoading(true);
    try {
      await deletePendingRequest(requestId, user.uid, reason || undefined);
      toast.success('✅ Solicitud eliminada correctamente');
      onDeleted?.();
    } catch (error: any) {
      log.error('Error eliminando solicitud:', error);
      toast.error(error.message || 'Error al eliminar la solicitud');
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setReason('');
    }
  };

  const buttonVariants = {
    button: (
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 ${className}`}
      >
        <Trash2 className="w-4 h-4" />
        Eliminar solicitud
      </button>
    ),
    icon: (
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className={`p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition disabled:opacity-50 ${className}`}
        title="Eliminar solicitud"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    ),
    text: (
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className={`text-sm text-red-500 hover:text-red-600 hover:underline transition disabled:opacity-50 ${className}`}
      >
        Eliminar solicitud
      </button>
    ),
  };

  return (
    <>
      {buttonVariants[variant] || buttonVariants.button}

      {/* ✅ Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ¿Eliminar solicitud?
                </h3>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Contenido */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Esta acción eliminará la solicitud. Los proveedores no podrán verla ni aceptarla.
              </p>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Motivo (opcional)
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ej: Ya encontré un profesional"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

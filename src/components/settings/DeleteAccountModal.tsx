'use client';

import { useAuth } from '@/contexts/AuthContext';
import { canDeleteAccount, deleteAccount } from '@/lib/firebase/account.service';
import { AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const { user, firebaseUser, logout } = useAuth();
  const [step, setStep] = useState<'confirm' | 'checking' | 'warning' | 'deleting' | 'done'>(
    'confirm'
  );
  const [confirmationText, setConfirmationText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [canDelete, setCanDelete] = useState<{
    canDelete: boolean;
    message: string;
    hasRequests: boolean;
    hasNotifications: boolean;
  } | null>(null);

  // ✅ Verificar si puede eliminar
  const handleCheck = async () => {
    if (!user) return;

    setStep('checking');
    setError(null);

    try {
      const result = await canDeleteAccount(user.uid);
      setCanDelete(result);

      if (result.canDelete) {
        setStep('warning');
      } else {
        setError(result.message);
        setStep('confirm');
      }
    } catch (error) {
      setError('Error al verificar tu cuenta');
      setStep('confirm');
    }
  };

  // ✅ Eliminar cuenta - CORREGIDO
  const handleDelete = async () => {
    if (!user || !firebaseUser) return;

    // ✅ Comparar sin importar mayúsculas/minúsculas
    if (confirmationText.trim().toUpperCase() !== 'ELIMINAR') {
      toast.error('Escribe "ELIMINAR" para confirmar');
      return;
    }

    setStep('deleting');
    setError(null);

    try {
      await deleteAccount(user.uid, firebaseUser);
      setStep('done');

      toast.success('✅ Cuenta eliminada correctamente');

      // ✅ Cerrar sesión después de eliminar
      setTimeout(async () => {
        await logout();
        window.location.href = '/';
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Error al eliminar la cuenta');
      setStep('warning');
    }
  };

  // ✅ Verificar si el texto es válido (sin importar mayúsculas)
  const isValidConfirmation = confirmationText.trim().toUpperCase() === 'ELIMINAR';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'done'
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}
            >
              {step === 'done' ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {step === 'done' ? 'Cuenta eliminada' : 'Eliminar cuenta'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            disabled={step === 'deleting' || step === 'done'}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Contenido según paso */}
        {step === 'confirm' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Esta acción eliminará permanentemente tu cuenta y todos tus datos. ¿Estás seguro de
              que quieres continuar?
            </p>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCheck}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 'checking' && (
          <div className="py-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Verificando tu cuenta...</p>
          </div>
        )}

        {step === 'warning' && canDelete && (
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                ⚠️ Esta acción es irreversible. Todos tus datos serán eliminados permanentemente.
              </p>
            </div>

            {canDelete.hasNotifications && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📬 Tus notificaciones también serán eliminadas.
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Escribe <span className="font-bold text-red-500">ELIMINAR</span> para confirmar
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="ELIMINAR"
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm uppercase ${
                  isValidConfirmation
                    ? 'border-green-500 dark:border-green-400'
                    : confirmationText.length > 0
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                }`}
                autoFocus
              />
              {confirmationText.length > 0 && !isValidConfirmation && (
                <p className="mt-1 text-xs text-red-500">
                  ❌ Debes escribir exactamente "ELIMINAR" (sin importar mayúsculas)
                </p>
              )}
              {isValidConfirmation && (
                <p className="mt-1 text-xs text-green-500">✅ Confirmación correcta</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={!isValidConfirmation}
                className={`flex-1 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                  isValidConfirmation
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Eliminar cuenta
              </button>
            </div>
          </div>
        )}

        {step === 'deleting' && (
          <div className="py-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Eliminando tu cuenta...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Por favor espera</p>
          </div>
        )}

        {step === 'done' && (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Cuenta eliminada
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Tu cuenta ha sido eliminada correctamente.
              <br />
              Serás redirigido en unos segundos...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

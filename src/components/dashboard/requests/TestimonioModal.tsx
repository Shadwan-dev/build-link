'use client';

import { Request } from '@/types/request.types';
import { Loader2, Send, Star, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface TestimonioModalProps {
  request: Request;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export const TestimonioModal = ({ request, onClose, onSubmit }: TestimonioModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    calidad: 0,
    puntualidad: 0,
    comunicacion: 0,
    precio: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Selecciona una calificación');
      return;
    }

    if (comment.length < 10) {
      toast.error('El comentario debe tener al menos 10 caracteres');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        rating,
        comment,
        categories,
        createdAt: new Date(),
      });
    } catch (error) {
      toast.error('Error al enviar el testimonio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              Califica tu experiencia
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tu opinión ayuda a otros clientes a tomar decisiones
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Calificación general */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Calificación general *
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {rating > 0 ? `${rating} estrellas` : 'Selecciona'}
              </span>
            </div>
          </div>

          {/* Categorías */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(categories).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 capitalize">
                  {key === 'calidad'
                    ? 'Calidad'
                    : key === 'puntualidad'
                      ? 'Puntualidad'
                      : key === 'comunicacion'
                        ? 'Comunicación'
                        : 'Precio'}
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setCategories((prev) => ({ ...prev, [key]: star }))}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= value
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comentario *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntanos cómo fue tu experiencia con el proveedor..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={4}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {comment.length}/10 caracteres mínimo
            </p>
          </div>

          {/* Resumen */}
          {rating > 0 && (
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">📋 Resumen:</span> Calificación {rating} estrellas
                {comment &&
                  ` · Comentario: ${comment.slice(0, 30)}${comment.length > 30 ? '...' : ''}`}
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || rating === 0 || comment.length < 10}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar testimonio
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

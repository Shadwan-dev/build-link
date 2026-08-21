// components/dashboard/requests/RequestCard.tsx

'use client';

import { Request } from '@/types/request.types';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale/es';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Image as ImageIcon,
  MapPin,
  User,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DeleteRequestButton } from './DeleteRequestButton';
// ✅ Importar utilidad de Cloudinary
import { getImageUrl } from '@/lib/cloudinary/image.utils';

interface RequestCardProps {
  request: Request;
  role?: 'client' | 'provider';
  onStatusChange?: (id: string, status: 'aceptado' | 'rechazado') => void;
  showActions?: boolean;
}

export const RequestCard = ({
  request,
  role,
  onStatusChange,
  showActions = false,
}: RequestCardProps) => {
  const router = useRouter();

  const isProvider = role === 'provider';
  const isClient = role === 'client';

  // ✅ Verificar si tiene imágenes
  const hasImages = request.images && request.images.length > 0;
  const firstImage = hasImages ? request.images![0] : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'en-progreso':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'completado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'aceptado':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'rechazado':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      'en-progreso': 'En progreso',
      completado: 'Completado',
      aceptado: 'Aceptado',
      rechazado: 'Rechazado',
    };
    return labels[status] || status;
  };

  const getUrgencyLabel = (urgency?: string) => {
    switch (urgency) {
      case 'urgente':
        return '🟡 Urgente';
      case 'muy-urgente':
        return '🔴 Muy urgente';
      default:
        return '🟢 Normal';
    }
  };

  const timeAgo = request.createdAt
    ? formatDistanceToNow(new Date(request.createdAt.seconds * 1000), {
        addSuffix: true,
        locale: es,
      })
    : 'Fecha no disponible';

  const handleCardClick = () => {
    router.push(`/dashboard/requests/${request.id}`);
  };

  const showDeleteButton = isClient && request.status === 'pendiente';

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all p-4 md:p-6 cursor-pointer relative"
      onClick={handleCardClick}
    >
      {/* ✅ Layout con imagen */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* ✅ Imagen de la solicitud */}
        <div className="sm:w-24 sm:h-24 flex-shrink-0">
          {firstImage ? (
            <img
              src={getImageUrl(firstImage, { width: 200, height: 200, crop: 'fill' })}
              alt={request.categoryName || 'Imagen de solicitud'}
              className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-600"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3E📸%3C/text%3E%3C/svg%3E';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
              <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>

        {/* ✅ Información de la solicitud */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {request.categoryName || 'Sin categoría'}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                >
                  {getStatusLabel(request.status)}
                </span>
                {request.urgency && request.urgency !== 'normal' && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {getUrgencyLabel(request.urgency)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {request.description}
              </p>
            </div>

            {/* ✅ Acciones para proveedor */}
            {showActions && request.status === 'pendiente' && onStatusChange && (
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(request.id, 'aceptado');
                  }}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aceptar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(request.id, 'rechazado');
                  }}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  Rechazar
                </button>
              </div>
            )}

            {/* Botón de eliminar para cliente */}
            {showDeleteButton && (
              <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <DeleteRequestButton
                  requestId={request.id}
                  onDeleted={() => {
                    window.location.reload();
                  }}
                  variant="icon"
                  className="hover:bg-red-100 dark:hover:bg-red-900/30"
                />
              </div>
            )}
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4" />
              <span className="truncate">{request.clientName}</span>
            </div>
            {request.budget && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span>${request.budget.toLocaleString()}</span>
              </div>
            )}
            {request.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{request.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="truncate">{timeAgo}</span>
            </div>
          </div>

          {/* Link a detalle */}
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-primary-600 dark:text-primary-400 flex items-center gap-1">
              Ver detalles →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

RequestCard.displayName = 'RequestCard';

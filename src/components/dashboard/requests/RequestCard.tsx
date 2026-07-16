'use client';

import { Request } from '@/types/request.types';
import { AlertCircle, Calendar, CheckCircle, DollarSign, User, XCircle } from 'lucide-react';
import Link from 'next/link';

interface RequestCardProps {
  request: Request;
  role: 'client' | 'provider';
  onStatusChange?: () => void;
}

export const RequestCard = ({ request, role, onStatusChange }: RequestCardProps) => {
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgente':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'muy-urgente':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'Pendiente';
      case 'en-progreso':
        return 'En progreso';
      case 'completado':
        return 'Completado';
      case 'aceptado':
        return 'Aceptado';
      case 'rechazado':
        return 'Rechazado';
      default:
        return status;
    }
  };

  const getDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link
      href={`/dashboard/requests/${request.id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-700"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {request.category}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
            >
              {getStatusLabel(request.status)}
            </span>
            <span className={`text-xs flex items-center gap-1 ${getUrgencyColor(request.urgency)}`}>
              <AlertCircle className="w-3 h-3" />
              {request.urgency === 'muy-urgente'
                ? 'Muy urgente'
                : request.urgency === 'urgente'
                  ? 'Urgente'
                  : 'Normal'}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
            {request.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {role === 'client' ? request.providerName : request.clientName}
            </span>
            {request.budget && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />${request.budget.toLocaleString()}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {getDate(request.createdAt)}
            </span>
          </div>
        </div>

        {/* Estado visual */}
        <div className="flex items-center gap-2">
          {request.status === 'aceptado' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {request.status === 'rechazado' && <XCircle className="w-5 h-5 text-red-500" />}
          {request.status === 'completado' && <CheckCircle className="w-5 h-5 text-blue-500" />}
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(request.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

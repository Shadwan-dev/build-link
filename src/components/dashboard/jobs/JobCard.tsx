'use client';
import { log } from '@/lib/utils/logger';

import { Job } from '@/types/job.types';
import {
  AlertCircle,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Eye,
  MapPin,
  MoreVertical,
  Trash2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface JobCardProps {
  job: Job;
  onDelete?: (jobId: string) => void;
  onToggleStatus?: (jobId: string, status: Job['status']) => void;
}

export const JobCard = ({ job, onDelete, onToggleStatus }: JobCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      case 'expired':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'inactive':
        return 'Inactiva';
      case 'expired':
        return 'Expirada';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'Urgente';
      case 'immediate':
        return 'Inmediata';
      default:
        return 'Normal';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'text-yellow-500';
      case 'immediate':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link href={`/dashboard/jobs/${job.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition truncate">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}
              >
                {getStatusLabel(job.status)}
              </span>
              <span className={`text-xs flex items-center gap-1 ${getUrgencyColor(job.urgency)}`}>
                <AlertCircle className="w-3 h-3" />
                {getUrgencyLabel(job.urgency)}
              </span>
            </div>
          </div>

          {/* Menú de acciones */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                <Link
                  href={`/dashboard/jobs/${job.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => setShowMenu(false)}
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </Link>
                <button
                  onClick={() => {
                    onToggleStatus?.(job.id, job.status === 'active' ? 'inactive' : 'active');
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                >
                  <Clock className="w-4 h-4" />
                  {job.status === 'active' ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => {
                    onDelete?.(job.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-left"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {job.description}
        </p>

        {/* Detalles */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
          {job.budget && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />${job.budget.toLocaleString()}
            </span>
          )}
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Estadísticas */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {job.views || 0} vistas
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {job.applications || 0} solicitudes
          </span>
        </div>
      </div>
    </div>
  );
};

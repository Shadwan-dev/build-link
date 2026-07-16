'use client';

import { JobCard } from '@/components/dashboard/jobs/JobCard';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { deleteJob, getProviderJobs, updateJob } from '@/lib/firebase/job.service';
import { Job } from '@/types/job.types';
import { Briefcase, CheckCircle, Clock, Loader2, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    completed: 0,
  });

  const loadJobs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getProviderJobs(user.uid);
      setJobs(data);

      // Calcular estadísticas
      setStats({
        total: data.length,
        active: data.filter((j) => j.status === 'active').length,
        pending: data.filter((j) => j.status === 'inactive').length,
        completed: data.filter((j) => j.status === 'completed').length,
      });
    } catch (error) {
      console.error('Error cargando ofertas:', error);
      toast.error('Error al cargar las ofertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [user]);

  const handleDelete = async (jobId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta oferta?')) return;
    try {
      await deleteJob(jobId);
      await loadJobs();
      toast.success('✅ Oferta eliminada correctamente');
    } catch (error) {
      toast.error('Error al eliminar la oferta');
    }
  };

  const handleToggleStatus = async (jobId: string, status: Job['status']) => {
    try {
      await updateJob(jobId, { status });
      await loadJobs();
      toast.success(`✅ Oferta ${status === 'active' ? 'activada' : 'desactivada'}`);
    } catch (error) {
      toast.error('Error al cambiar el estado');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            💼 Mis Ofertas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tus ofertas de trabajo y servicios
          </p>
        </div>
        <Link
          href="/dashboard/jobs/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nueva oferta
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total ofertas</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Activas</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Inactivas</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de ofertas */}
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No tienes ofertas publicadas
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Crea tu primera oferta para comenzar a recibir solicitudes
          </p>
          <Link
            href="/dashboard/jobs/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="w-4 h-4" />
            Crear oferta
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { JobForm } from '@/components/dashboard/jobs/JobForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewJobPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/jobs"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Nueva Oferta
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Publica una nueva oferta para atraer clientes
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        <JobForm />
      </div>
    </div>
  );
}

'use client';

import { JobForm } from '@/components/dashboard/jobs/JobForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditJobPage() {
  const params = useParams();
  const jobId = params.id as string;

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
            Editar Oferta
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Actualiza la información de tu oferta
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        <JobForm jobId={jobId} />
      </div>
    </div>
  );
}

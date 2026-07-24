'use client';
import { log } from '@/lib/utils/logger';

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { CheckCircle, Database, Loader2, RefreshCw, Users, XCircle } from 'lucide-react';
import { useState } from 'react';

// Datos de ejemplo para proveedores
const SAMPLE_PROVIDERS = [
  {
    displayName: 'Construcciones Pérez',
    email: 'construcciones@email.com',
    phone: '+34 600 111 222',
    specialties: ['Construcción', 'Albañilería'],
    rating: 4.8,
    totalRatings: 45,
    location: 'Madrid',
    experience: 15,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Construcciones+Perez&background=2563eb&color=fff',
    description:
      'Especialistas en reformas integrales y construcción de viviendas. Más de 15 años de experiencia.',
  },
  {
    displayName: 'Carpintería Martínez',
    email: 'carpinteria@email.com',
    phone: '+34 600 222 333',
    specialties: ['Carpintería', 'Techos'],
    rating: 4.9,
    totalRatings: 32,
    location: 'Barcelona',
    experience: 10,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Carpinteria+Martinez&background=7c3aed&color=fff',
    description: 'Carpintería de alta calidad. Trabajos personalizados en madera.',
  },
  {
    displayName: 'Techos y Jardines SL',
    email: 'techos@email.com',
    phone: '+34 600 333 444',
    specialties: ['Techos', 'Jardinería'],
    rating: 4.7,
    totalRatings: 28,
    location: 'Valencia',
    experience: 8,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Techos+Jardines&background=059669&color=fff',
    description: 'Especialistas en techos verdes y jardinería profesional.',
  },
  {
    displayName: 'Electricidad Fernández',
    email: 'electricidad@email.com',
    phone: '+34 600 444 555',
    specialties: ['Electricidad', 'Construcción'],
    rating: 4.6,
    totalRatings: 20,
    location: 'Sevilla',
    experience: 12,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Electricidad+Fernandez&background=dc2626&color=fff',
    description: 'Instalaciones eléctricas, domótica y sistemas de seguridad.',
  },
  {
    displayName: 'Plomería Gómez',
    email: 'plomeria@email.com',
    phone: '+34 600 555 666',
    specialties: ['Plomería', 'Techos'],
    rating: 4.5,
    totalRatings: 18,
    location: 'Bilbao',
    experience: 6,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Plomeria+Gomez&background=8b5cf6&color=fff',
    description: 'Servicios de plomería, calefacción y sistemas de agua.',
  },
  {
    displayName: 'Jardinería Verde',
    email: 'jardineria@email.com',
    phone: '+34 600 666 777',
    specialties: ['Jardinería', 'Construcción'],
    rating: 4.4,
    totalRatings: 15,
    location: 'Alicante',
    experience: 5,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Jardineria+Verde&background=16a34a&color=fff',
    description: 'Diseño y mantenimiento de jardines, paisajismo y áreas verdes.',
  },
  {
    displayName: 'Pintura Sánchez',
    email: 'pintura@email.com',
    phone: '+34 600 777 888',
    specialties: ['Pintura', 'Carpintería'],
    rating: 4.3,
    totalRatings: 12,
    location: 'Málaga',
    experience: 7,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Pintura+Sanchez&background=ea580c&color=fff',
    description: 'Pintura de interiores y exteriores, acabados de alta calidad.',
  },
  {
    displayName: 'Albañilería Ramírez',
    email: 'albanileria@email.com',
    phone: '+34 600 888 999',
    specialties: ['Albañilería', 'Construcción'],
    rating: 4.2,
    totalRatings: 10,
    location: 'Granada',
    experience: 9,
    isActive: true,
    photoURL: 'https://ui-avatars.com/api/?name=Albanileria+Ramirez&background=0d9488&color=fff',
    description: 'Trabajos de albañilería, rehabilitación y mampostería.',
  },
];

export default function SeedProvidersPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { message: string; status: 'success' | 'error' | 'info' }[]
  >([]);
  const [count, setCount] = useState(0);

  const addResult = (message: string, status: 'success' | 'error' | 'info' = 'info') => {
    setResults((prev) => [...prev, { message, status }]);
  };

  const checkExistingProviders = async () => {
    try {
      const db = getFirestore();
      const providersRef = collection(db, 'providers');
      const snapshot = await getDocs(providersRef);
      return snapshot.size;
    } catch (error) {
      log.error('Error verificando proveedores:', error);
      return -1;
    }
  };

  const seedProviders = async () => {
    setLoading(true);
    setResults([]);

    try {
      const db = getFirestore();

      // Verificar cuántos proveedores existen
      const existingCount = await checkExistingProviders();
      if (existingCount > 0) {
        addResult(`⚠️ Ya existen ${existingCount} proveedores en la base de datos.`, 'info');
      }

      let created = 0;
      let skipped = 0;

      for (const providerData of SAMPLE_PROVIDERS) {
        try {
          // Generar un ID único basado en el email
          const uid = `provider_${providerData.email.split('@')[0]}`;
          const providerRef = doc(db, 'providers', uid);

          // Verificar si ya existe
          const existingDoc = await getDocs(collection(db, 'providers'));
          let exists = false;
          existingDoc.forEach((doc) => {
            if (doc.data().email === providerData.email) {
              exists = true;
            }
          });

          if (exists) {
            addResult(`⏭️ ${providerData.displayName} ya existe, saltando...`, 'info');
            skipped++;
            continue;
          }

          // Crear el documento
          await setDoc(providerRef, {
            ...providerData,
            uid: uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          addResult(`✅ ${providerData.displayName} creado correctamente`, 'success');
          created++;
        } catch (error: any) {
          addResult(`❌ Error al crear ${providerData.displayName}: ${error.message}`, 'error');
        }
      }

      addResult(`🎉 Proceso completado: ${created} creados, ${skipped} omitidos`, 'success');
      setCount(created);

      // Actualizar el contador final
      const finalCount = await checkExistingProviders();
      if (finalCount > 0) {
        addResult(`📊 Total de proveedores en la base de datos: ${finalCount}`, 'info');
      }
    } catch (error: any) {
      addResult(`❌ Error general: ${error.message}`, 'error');
      log.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Database className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                🗄️ Sembrar Proveedores
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Crea proveedores de prueba en Firestore
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
              📋 Proveedores a crear:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SAMPLE_PROVIDERS.map((p, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
                >
                  <Users className="w-4 h-4" />
                  <span>{p.displayName}</span>
                  <span className="text-xs bg-blue-200 dark:bg-blue-800 px-1.5 py-0.5 rounded">
                    {p.specialties[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={seedProviders}
              disabled={loading}
              className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando proveedores...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  Sembrar Proveedores
                </>
              )}
            </button>

            <button
              onClick={async () => {
                const count = await checkExistingProviders();
                addResult(`📊 Total: ${count} proveedores`, 'info');
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Contar
            </button>
          </div>
        </div>

        {/* Resultados */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📊 Resultados
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    result.status === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : result.status === 'error'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  {result.status === 'success' && (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  {result.status === 'error' && (
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  {result.status === 'info' && (
                    <Database className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm">{result.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instrucciones finales */}
        {count > 0 && (
          <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              🎉 ¡Proveedores creados!
            </h3>
            <p className="text-green-600 dark:text-green-400 text-sm">
              Ahora puedes ver los proveedores en el listado de proveedores.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="/dashboard/providers"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm"
              >
                👷 Ver Proveedores
              </a>
              <a
                href="/dashboard"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
              >
                📊 Ir al Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { PROVINCES_CHILE, REGIONS_CHILE } from '@/lib/constants/regions.chile';
import { Loader2, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface LocationSelectorProps {
  value: {
    regionId: string;
    provinceId: string;
    address: string;
  };
  onChange: (location: { regionId: string; provinceId: string; address?: string }) => void;
}

export const LocationSelector = ({ value, onChange }: LocationSelectorProps) => {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (value.regionId) {
      const provs = PROVINCES_CHILE.filter((p) => p.regionId === value.regionId);
      setProvinces(provs);
    } else {
      setProvinces([]);
    }
  }, [value.regionId]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Tu navegador no soporta geolocalización');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=12&addressdetails=1`
          );
          const data = await response.json();

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.suburb ||
            '';

          if (city) {
            const foundProvince = PROVINCES_CHILE.find(
              (p) =>
                p.name.toLowerCase().includes(city.toLowerCase()) ||
                city.toLowerCase().includes(p.name.toLowerCase())
            );

            if (foundProvince) {
              onChange({
                regionId: foundProvince.regionId,
                provinceId: foundProvince.id,
                address: city,
              });
              toast.success('📍 Ubicación detectada: ' + city);
            } else {
              toast.success('📍 Ubicación detectada: ' + city + ' (selecciona manualmente)');
            }
          } else {
            toast.error('No se pudo determinar tu ubicación');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Error al obtener ubicación');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Error de geolocalización:', error);
        toast.error('No se pudo obtener tu ubicación. Permite el acceso.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={getCurrentLocation}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Obteniendo ubicación...
          </>
        ) : (
          <>
            <Navigation className="w-4 h-4 text-primary-600" />
            Usar mi ubicación actual
          </>
        )}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Región
          </label>
          <select
            value={value.regionId}
            onChange={(e) => {
              const regionId = e.target.value;
              onChange({
                ...value,
                regionId,
                provinceId: '',
              });
            }}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Selecciona una región...</option>
            {REGIONS_CHILE.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Comuna / Provincia
          </label>
          <select
            value={value.provinceId}
            onChange={(e) => {
              onChange({
                ...value,
                provinceId: e.target.value,
              });
            }}
            disabled={!value.regionId}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecciona una comuna...</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Dirección adicional (opcional)
        </label>
        <input
          type="text"
          value={value.address || ''}
          onChange={(e) => {
            onChange({
              ...value,
              address: e.target.value,
            });
          }}
          placeholder="Ej: Calle Principal 123, Sector Centro"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

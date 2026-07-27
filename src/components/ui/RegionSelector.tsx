'use client';

import { REGIONS_CHILE, getProvincesByRegion } from '@/lib/constants/regions.chile';
import { ChevronDown, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RegionSelectorProps {
  value: {
    regionId: string;
    provinceId: string;
  };
  onChange: (value: { regionId: string; provinceId: string }) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
}

export const RegionSelector = ({
  value,
  onChange,
  label = 'Ubicación',
  placeholder = 'Selecciona una región y provincia',
  required = false,
  className = '',
  multiple = false,
}: RegionSelectorProps) => {
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);

  // ✅ Actualizar provincias cuando cambia la región
  useEffect(() => {
    if (value.regionId) {
      const provs = getProvincesByRegion(value.regionId);
      setProvinces(provs);
    } else {
      setProvinces([]);
    }
  }, [value.regionId]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* ✅ Selector de Región */}
        <div className="relative">
          <select
            value={value.regionId}
            onChange={(e) => {
              const regionId = e.target.value;
              onChange({
                regionId,
                provinceId: '', // Resetear provincia al cambiar región
              });
            }}
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
          >
            <option value="">Selecciona región</option>
            {REGIONS_CHILE.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* ✅ Selector de Provincia */}
        <div className="relative">
          <select
            value={value.provinceId}
            onChange={(e) => {
              const provinceId = e.target.value;
              onChange({
                ...value,
                provinceId,
              });
            }}
            disabled={!value.regionId}
            className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Selecciona provincia</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* ✅ Mostrar ubicación seleccionada */}
      {value.regionId && value.provinceId && (
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3" />
          <span>
            {provinces.find((p) => p.id === value.provinceId)?.name},{' '}
            {REGIONS_CHILE.find((r) => r.id === value.regionId)?.name}
          </span>
        </div>
      )}
    </div>
  );
};

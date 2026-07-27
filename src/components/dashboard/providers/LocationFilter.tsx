'use client';

import { Loader2, MapPin, Navigation, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

interface LocationFilterProps {
  onLocationChange: (location: {
    latitude: number;
    longitude: number;
    radius: number;
    address: string;
  }) => void;
  onClear: () => void;
  initialLocation?: string;
  initialRadius?: number;
}

export const LocationFilter = ({
  onLocationChange,
  onClear,
  initialLocation = '',
  initialRadius = 10,
}: LocationFilterProps) => {
  const [address, setAddress] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // ✅ Obtener ubicación actual
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Tu navegador no soporta geolocalización');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // ✅ Reverse geocoding con Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`
          );
          const data = await response.json();

          const city = data.address?.city || data.address?.town || data.address?.village || '';
          const state = data.address?.state || '';
          const country = data.address?.country || '';
          const displayAddress =
            [city, state, country].filter(Boolean).join(', ') ||
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

          setAddress(displayAddress);
          setIsActive(true);
          onLocationChange({
            latitude,
            longitude,
            radius,
            address: displayAddress,
          });

          toast.success('📍 Ubicación obtenida correctamente');
        } catch (error) {
          console.error('Error en reverse geocoding:', error);
          setAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setIsActive(true);
          onLocationChange({
            latitude,
            longitude,
            radius,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
          toast.success('📍 Ubicación obtenida (sin dirección)');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error de geolocalización:', error);
        let message = 'No se pudo obtener tu ubicación.';
        if (error.code === 1) message += ' Permite el acceso a la ubicación.';
        else if (error.code === 2) message += ' Señal GPS débil.';
        else if (error.code === 3) message += ' Tiempo de espera agotado.';
        toast.error(message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [radius, onLocationChange]);

  // ✅ Buscar ubicación por texto
  const searchLocation = useCallback(async () => {
    if (!address.trim() || address === initialLocation) {
      toast.error('Ingresa una ubicación válida');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        setAddress(display_name || address);
        setIsActive(true);
        onLocationChange({
          latitude,
          longitude,
          radius,
          address: display_name || address,
        });
        toast.success('📍 Ubicación encontrada');
      } else {
        toast.error('No se encontró la ubicación. Intenta con una búsqueda más específica.');
      }
    } catch (error) {
      console.error('Error en geocoding:', error);
      toast.error('Error al buscar ubicación');
    } finally {
      setLoading(false);
    }
  }, [address, radius, initialLocation, onLocationChange]);

  // ✅ Limpiar ubicación - CORREGIDO (toast.info → toast)
  const handleClear = useCallback(() => {
    setAddress('');
    setRadius(initialRadius);
    setIsActive(false);
    onClear();
    toast('📍 Filtro de ubicación eliminado', {
      icon: '📍',
      duration: 2000,
    });
  }, [initialRadius, onClear]);

  // ✅ Buscar al presionar Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchLocation();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-all">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary-500" />
          Ubicación
          {isActive && (
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
              Activa
            </span>
          )}
        </h4>
        {isActive && (
          <button
            onClick={handleClear}
            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Quitar
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ciudad, dirección o código postal..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm transition"
            disabled={loading}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
            {loading ? 'Buscando...' : 'Mi ubicación'}
          </button>

          <button
            type="button"
            onClick={searchLocation}
            disabled={loading || !address.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Control de radio */}
      <div className="mt-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Radio de búsqueda</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{radius} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full accent-primary-600 h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700"
          />
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 min-w-[60px]">
          {radius <= 5 ? '📍 Cerca' : radius <= 20 ? '📌 Ciudad' : '🗺️ Región'}
        </span>
      </div>
    </div>
  );
};

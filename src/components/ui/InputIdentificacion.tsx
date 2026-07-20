'use client';

import { formatearIdentificacion, validarIdentificacion } from '@/lib/utils/validacion';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface InputIdentificacionProps {
  value: string;
  onChange: (value: string) => void;
  pais?: 'CL' | 'CU';
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const InputIdentificacion = ({
  value = '',
  onChange,
  pais = 'CL',
  label = 'Identificación',
  placeholder = '12.345.678-K',
  required = false,
  className = '',
}: InputIdentificacionProps) => {
  const [estado, setEstado] = useState<{
    esValido: boolean | null;
    mensaje: string;
  }>({ esValido: null, mensaje: '' });

  // ✅ Validación AUTOMÁTICA cada vez que cambia el valor
  useEffect(() => {
    if (value.length >= 2) {
      const resultado = validarIdentificacion(value, pais);
      setEstado(resultado);
    } else {
      setEstado({ esValido: null, mensaje: '' });
    }
  }, [value, pais]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let nuevoValor = e.target.value;

    // ✅ Formatear mientras escribe
    if (nuevoValor.length > 2 && (pais === 'CL' || pais === 'CU')) {
      const formateado = formatearIdentificacion(nuevoValor, pais);
      onChange(formateado);
    } else {
      onChange(nuevoValor);
    }
  };

  // Determinar colores según validación
  const getBorderColor = () => {
    if (estado.esValido === true) return 'border-green-500 dark:border-green-400';
    if (estado.esValido === false) return 'border-red-500 dark:border-red-400';
    return 'border-gray-300 dark:border-gray-600';
  };

  const getBgColor = () => {
    if (estado.esValido === true) return 'bg-green-50 dark:bg-green-900/10';
    if (estado.esValido === false) return 'bg-red-50 dark:bg-red-900/10';
    return 'bg-white dark:bg-gray-800';
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getBgColor()} ${getBorderColor()} text-gray-900 dark:text-white transition-colors duration-200`}
        />

        {/* ✅ Ícono de validación automática */}
        {estado.esValido !== null && value.length > 0 && (
          <div className="absolute right-3 top-2.5">
            {estado.esValido ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        )}
      </div>

      {/* ✅ Mensaje de validación */}
      {estado.mensaje && (
        <p
          className={`mt-1 text-sm flex items-center gap-1 ${
            estado.esValido
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          {estado.mensaje}
        </p>
      )}

      {/* ✅ Ayuda según país */}
      {pais === 'CL' && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Formato: 12.345.678-K (se formatea automáticamente)
        </p>
      )}
      {pais === 'CU' && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Formato: 87-12345-67 (acepta cualquier número de 7-11 dígitos para pruebas)
        </p>
      )}
    </div>
  );
};

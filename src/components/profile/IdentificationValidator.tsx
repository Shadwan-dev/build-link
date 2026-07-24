'use client';
import { log } from '@/lib/utils/logger';

import { formatearIdentificacion, validarIdentificacion } from '@/lib/utils/validacion';
import { AlertCircle, CheckCircle, ChevronDown, Globe, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IdentificationValidatorProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  initialCountry?: 'CL' | 'CU' | 'AR' | 'MX' | 'PE' | 'CO' | 'ES';
  label?: string;
  required?: boolean;
  className?: string;
}

// Configuración por país
const PAISES = {
  CL: { nombre: 'Chile', formato: '12.345.678-K', ejemplo: '12.345.678-K', label: 'RUT' },
  CU: { nombre: 'Cuba', formato: '87-12345-67', ejemplo: '87-12345-67', label: 'CI' },
  AR: { nombre: 'Argentina', formato: '12.345.678', ejemplo: '12.345.678', label: 'DNI' },
  MX: { nombre: 'México', formato: 'CURP o RFC', ejemplo: 'GODE561231HDFRRL09', label: 'CURP/RFC' },
  PE: { nombre: 'Perú', formato: '12345678', ejemplo: '12345678', label: 'DNI' },
  CO: { nombre: 'Colombia', formato: '12.345.678', ejemplo: '12.345.678', label: 'CC' },
  ES: { nombre: 'España', formato: '12345678A', ejemplo: '12345678A', label: 'DNI/NIE' },
};

export const IdentificationValidator = ({
  value = '',
  onChange,
  initialCountry = 'CL',
  label = 'Identificación',
  required = false,
  className = '',
}: IdentificationValidatorProps) => {
  const [pais, setPais] = useState<keyof typeof PAISES>(initialCountry);
  const [identificacion, setIdentificacion] = useState(value);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [isPaisOpen, setIsPaisOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  // ✅ Validación automática cada vez que cambia el valor
  useEffect(() => {
    if (identificacion.length >= 2) {
      const resultado = validarIdentificacion(identificacion, pais);
      setIsValid(resultado.esValido);
      setMensaje(resultado.mensaje);
      onChange(identificacion, resultado.esValido);
    } else {
      setIsValid(null);
      setMensaje('');
      onChange(identificacion, false);
    }
  }, [identificacion, pais, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoValor = e.target.value;
    setTouched(true);

    // ✅ Formatear automáticamente mientras escribe
    if (nuevoValor.length > 2) {
      const formateado = formatearIdentificacion(nuevoValor, pais);
      setIdentificacion(formateado);
    } else {
      setIdentificacion(nuevoValor);
    }
  };

  const handleCountryChange = (codigoPais: keyof typeof PAISES) => {
    setPais(codigoPais);
    setIdentificacion('');
    setIsValid(null);
    setMensaje('');
    setTouched(false);
    setIsPaisOpen(false);
  };

  const getBorderColor = () => {
    if (!touched) return 'border-gray-300 dark:border-gray-600';
    if (isValid === true) return 'border-green-500 dark:border-green-400';
    if (isValid === false) return 'border-red-500 dark:border-red-400';
    return 'border-gray-300 dark:border-gray-600';
  };

  const getBgColor = () => {
    if (!touched) return 'bg-white dark:bg-gray-800';
    if (isValid === true) return 'bg-green-50 dark:bg-green-900/10';
    if (isValid === false) return 'bg-red-50 dark:bg-red-900/10';
    return 'bg-white dark:bg-gray-800';
  };

  const config = PAISES[pais];

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Título */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {isValid === true && touched && (
          <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Validado
          </span>
        )}
      </div>

      {/* Selector de País */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsPaisOpen(!isPaisOpen)}
          className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <Globe className="w-4 h-4 text-gray-400" />
          <span className="flex-1 text-left text-sm">
            {config.nombre} ({pais})
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${isPaisOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isPaisOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsPaisOpen(false)} />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-48 overflow-y-auto">
              {Object.entries(PAISES).map(([codigo, info]) => (
                <button
                  key={codigo}
                  type="button"
                  onClick={() => handleCountryChange(codigo as keyof typeof PAISES)}
                  className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left ${
                    pais === codigo ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                >
                  <span className="flex-1 text-sm text-gray-900 dark:text-white">
                    {info.nombre} ({codigo})
                  </span>
                  {pais === codigo && <CheckCircle className="w-4 h-4 text-primary-500" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Input de Identificación */}
      <div className="relative">
        <input
          type="text"
          value={identificacion}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder={config.formato}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getBgColor()} ${getBorderColor()} text-gray-900 dark:text-white transition-colors duration-200`}
        />

        {/* Ícono de validación */}
        {touched && identificacion.length > 0 && (
          <div className="absolute right-3 top-2.5">
            {isValid === true ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : isValid === false ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : null}
          </div>
        )}
      </div>

      {/* Mensaje de validación */}
      {touched && mensaje && (
        <p
          className={`text-sm flex items-center gap-1 ${
            isValid === true
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          {mensaje}
        </p>
      )}

      {/* Ejemplo y ayuda */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {pais === 'CU'
          ? '🔵 En modo pruebas (Cuba), se aceptan identificaciones flexibles'
          : `Formato: ${config.ejemplo}`}
      </p>
    </div>
  );
};

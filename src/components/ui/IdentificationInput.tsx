'use client';

import {
  CountryCode,
  getCountryConfig,
  validateIdentificationWithMessage,
} from '@/lib/utils/identification.validation';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CountrySelector } from './CountrySelector';

interface IdentificationInputProps {
  value: string;
  countryCode: CountryCode;
  onChange: (value: string) => void;
  onCountryChange: (code: CountryCode) => void;
  label?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export const IdentificationInput = ({
  value,
  countryCode,
  onChange,
  onCountryChange,
  label = 'Identificación',
  required = false,
  className = '',
  error,
}: IdentificationInputProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const config = getCountryConfig(countryCode);

  useEffect(() => {
    if (value.length > 0) {
      const result = validateIdentificationWithMessage(value, countryCode);
      setIsValid(result.isValid);
      setMessage(result.message);
    } else {
      setIsValid(null);
      setMessage('');
    }
  }, [value, countryCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <CountrySelector value={countryCode} onChange={onCountryChange} className="w-48" />
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={config.placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
            isValid === true
              ? 'border-green-500 dark:border-green-400'
              : isValid === false
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
          } ${error ? 'border-red-500' : ''}`}
        />
        {isValid !== null && value.length > 0 && (
          <div className="absolute right-3 top-2.5">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        )}
      </div>

      {(message || error) && (
        <p
          className={`mt-1 text-sm flex items-center gap-1 ${
            error || isValid === false ? 'text-red-500' : 'text-green-500'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          {error || message}
        </p>
      )}

      {countryCode === 'CU' && (
        <p className="mt-1 text-xs text-blue-500 dark:text-blue-400 flex items-center gap-1">
          ℹ️ En modo pruebas (Cuba), la identificación es flexible. Puedes usar cualquier número de
          7-11 dígitos.
        </p>
      )}
    </div>
  );
};

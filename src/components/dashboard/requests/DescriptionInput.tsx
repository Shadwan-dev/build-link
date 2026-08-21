'use client';

import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  minLength?: number;
}

export const DescriptionInput = ({ value, onChange, minLength = 20 }: DescriptionInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isValid = value.length >= minLength;

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Describe detalladamente tu problema o proyecto..."
          rows={5}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition ${
            isFocused
              ? 'border-primary-500'
              : value.length > 0
                ? isValid
                  ? 'border-green-500'
                  : 'border-yellow-500'
                : 'border-gray-300 dark:border-gray-600'
          }`}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span
            className={`${
              value.length === 0 ? 'text-gray-400' : isValid ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            {value.length === 0
              ? '📝 Escribe una descripción'
              : isValid
                ? '✅ Descripción adecuada'
                : '⚠️ Mínimo ' + minLength + ' caracteres'}
          </span>
        </div>
        <span
          className={`${
            value.length === 0 ? 'text-gray-400' : isValid ? 'text-green-500' : 'text-yellow-500'
          }`}
        >
          {value.length} / {minLength} min
        </span>
      </div>

      {isFocused && value.length < minLength && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Sugerencias:</strong>
              <br />
              • Incluye el tipo de trabajo que necesitas
              <br />
              • Describe el alcance del proyecto
              <br />• Menciona si hay algún requisito especial
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

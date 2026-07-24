'use client';
import { log } from '@/lib/utils/logger';

import { CountryCode, getAvailableCountries } from '@/lib/utils/identification.validation';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';

interface CountrySelectorProps {
  value: CountryCode;
  onChange: (value: CountryCode) => void;
  className?: string;
}

export const CountrySelector = ({ value, onChange, className = '' }: CountrySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const countries = getAvailableCountries();

  const selectedCountry = countries.find((c) => c.code === value);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="flex-1 text-left">
          {selectedCountry
            ? `${selectedCountry.name} (${selectedCountry.code})`
            : 'Seleccionar país'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
              >
                <span className="flex-1 text-sm text-gray-900 dark:text-white">
                  {country.name} ({country.code})
                </span>
                {value === country.code && <Check className="w-4 h-4 text-primary-500" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

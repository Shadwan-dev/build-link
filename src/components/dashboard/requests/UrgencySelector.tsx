'use client';

import { AlertCircle, AlertTriangle, Clock, Zap } from 'lucide-react';

interface UrgencySelectorProps {
  value: 'normal' | 'urgente' | 'muy-urgente';
  onChange: (value: 'normal' | 'urgente' | 'muy-urgente') => void;
}

const urgencyOptions = [
  {
    value: 'normal',
    label: 'Normal',
    icon: Clock,
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    description: 'Trabajo programado sin prisa',
  },
  {
    value: 'urgente',
    label: 'Urgente',
    icon: AlertCircle,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    description: 'Requiere atención en los próximos días',
  },
  {
    value: 'muy-urgente',
    label: 'Muy urgente',
    icon: Zap,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    description: 'Requiere atención inmediata',
  },
];

export const UrgencySelector = ({ value, onChange }: UrgencySelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {urgencyOptions.map((option) => {
          const isSelected = value === option.value;
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value as any)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                isSelected
                  ? `${option.border} ${option.bg} ring-2 ring-offset-2 ${option.color.replace('text-', 'ring-')}`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
              <p
                className={`font-semibold ${isSelected ? option.color : 'text-gray-700 dark:text-gray-300'}`}
              >
                {option.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
            </button>
          );
        })}
      </div>

      {value === 'muy-urgente' && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>⚠️ Atención:</strong> La urgencia muy alta priorizará tu solicitud. Los
              maestros serán notificados inmediatamente.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

'use client';

import { Building2, Droplets, Hammer, Home, PaintBucket, Trees, Users, Zap } from 'lucide-react';

const categories = [
  {
    name: 'Construcción',
    icon: Building2,
    count: 45,
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  },
  {
    name: 'Carpintería',
    icon: Hammer,
    count: 23,
    color: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
  },
  {
    name: 'Techos',
    icon: Home,
    count: 18,
    color: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  },
  {
    name: 'Plomería',
    icon: Droplets,
    count: 12,
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
  },
  {
    name: 'Jardinería',
    icon: Trees,
    count: 15,
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  },
  {
    name: 'Electricidad',
    icon: Zap,
    count: 9,
    color: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
  },
  {
    name: 'Pintura',
    icon: PaintBucket,
    count: 11,
    color: 'bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400',
  },
  {
    name: 'Albañilería',
    icon: Users,
    count: 8,
    color: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
  },
];

interface CategoryGridProps {
  onSelect?: (category: string) => void;
}

export const CategoryGrid = ({ onSelect }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect?.(cat.name)}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition text-center hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div
            className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center mx-auto mb-2`}
          >
            <cat.icon className="w-6 h-6" />
          </div>
          <div className="font-medium text-gray-900 dark:text-white text-sm">{cat.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{cat.count} profesionales</div>
        </button>
      ))}
    </div>
  );
};

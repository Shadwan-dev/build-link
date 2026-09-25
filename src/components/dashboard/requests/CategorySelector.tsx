// components/dashboard/requests/CategorySelector.tsx
'use client';

import { CATEGORIES } from '@/lib/constants/categories';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

export const CategorySelector = ({ selectedCategory, onSelect }: CategorySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Grid de categorías */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              selectedCategory === category.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
            }`}
          >
            {/* ✅ Imagen en color */}
            <div className="flex justify-center mb-2">
              <Image
                src={category.icon}
                alt={category.label}
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {category.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

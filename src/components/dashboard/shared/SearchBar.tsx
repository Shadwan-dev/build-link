'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = 'Buscar profesionales, servicios, categorías...',
  onSearch,
  className = '',
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-sm text-sm whitespace-nowrap"
      >
        Buscar
      </button>
    </form>
  );
};

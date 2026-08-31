// lib/constants/categories.ts

export interface CategoryConstant {
  id: string;
  label: string;
  icon: string; // SVG como string
  description: string;
}

export const CATEGORIES: CategoryConstant[] = [
  {
    id: 'muebles',
    label: 'Mueblería & Cocina',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2"/><path d="M4 6h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"/><path d="M9 12h6"/><path d="M9 16h6"/><path d="M9 8h6"/></svg>`,
    description: 'Diseño y fabricación de muebles y cocinas',
  },
  {
    id: 'puertas',
    label: 'Puertas & Cerraduras',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="12" cy="16" r="1"/></svg>`,
    description: 'Instalación y reparación de puertas y cerraduras',
  },
  {
    id: 'pintura',
    label: 'Pintura Fina',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/><path d="M7 14v4"/><path d="M17 14v4"/></svg>`,
    description: 'Pintura de interiores, exteriores y acabados finos',
  },
  {
    id: 'jardineria',
    label: 'Jardinería',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 8a4 4 0 0 1 8 0"/><path d="M8 16a4 4 0 0 1 8 0"/></svg>`,
    description: 'Mantenimiento y diseño de jardines y áreas verdes',
  },
  {
    id: 'gasfiteria',
    label: 'Gasfitería',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20h12"/><path d="M12 16v4"/><path d="M4 12a8 8 0 0 1 16 0"/><path d="M4 12a8 8 0 0 0 16 0"/><path d="M8 8a4 4 0 0 1 8 0"/><path d="M8 16a4 4 0 0 1 8 0"/></svg>`,
    description: 'Reparaciones e instalaciones de gas y agua',
  },
  {
    id: 'obras',
    label: 'Obras & Tabiques',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16"/><path d="M16 4v16"/><path d="M3 10h18"/><path d="M3 14h18"/></svg>`,
    description: 'Construcción de muros, tabiques y estructuras',
  },
];

// ✅ Mantener compatibilidad con código existente
export const CATEGORY_OPTIONS = CATEGORIES.map((cat) => ({
  value: cat.id,
  label: cat.label,
  icon: cat.icon,
}));

export const getCategoryById = (id: string): CategoryConstant | undefined => {
  return CATEGORIES.find((cat) => cat.id === id);
};

export const getCategoryByLabel = (label: string): CategoryConstant | undefined => {
  return CATEGORIES.find((cat) => cat.label === label);
};

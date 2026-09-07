// lib/constants/categories.ts

export interface CategoryConstant {
  id: string;
  label: string;
  icon: string; // Ahora usaremos emojis/íconos visuales
  description: string;
}

export const CATEGORIES: CategoryConstant[] = [
  {
    id: 'muebles',
    label: 'Mueblería & Cocina',
    icon: '🪑',
    description: 'Diseño y fabricación de muebles y cocinas',
  },
  {
    id: 'puertas',
    label: 'Puertas & Cerraduras',
    icon: '🚪',
    description: 'Instalación y reparación de puertas y cerraduras',
  },
  {
    id: 'pintura',
    label: 'Pintura Fina',
    icon: '🎨',
    description: 'Pintura de interiores, exteriores y acabados finos',
  },
  {
    id: 'jardineria',
    label: 'Jardinería',
    icon: '🌿',
    description: 'Mantenimiento y diseño de jardines y áreas verdes',
  },
  {
    id: 'gasfiteria',
    label: 'Gasfitería',
    icon: '🔧',
    description: 'Reparaciones e instalaciones de gas y agua',
  },
  {
    id: 'obras',
    label: 'Obras & Tabiques',
    icon: '🏗️',
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

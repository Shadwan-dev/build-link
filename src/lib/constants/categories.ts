// lib/constants/categories.ts

export interface CategoryConstant {
  id: string;
  label: string;
  icon: string; // ✅ Ruta a la imagen
  description: string;
}

export const CATEGORIES: CategoryConstant[] = [
  {
    id: 'muebles',
    label: 'Mueblería & Cocinas',
    icon: '/icons/categories/muebles.png',
    description: 'Diseño y fabricación de muebles y cocinas',
  },
  {
    id: 'puertas',
    label: 'Puertas & Cerraduras',
    icon: '/icons/categories/puertas.png',
    description: 'Instalación y reparación de puertas y cerraduras',
  },
  {
    id: 'pintura',
    label: 'Pintura Fina',
    icon: '/icons/categories/pintura.png',
    description: 'Pintura de interiores, exteriores y acabados finos',
  },
  {
    id: 'jardineria',
    label: 'Jardinería',
    icon: '/icons/categories/jardineria.png',
    description: 'Mantenimiento y diseño de jardines y áreas verdes',
  },
  {
    id: 'gasfiteria',
    label: 'Gasfitería',
    icon: '/icons/categories/gasfiteria.png',
    description: 'Reparaciones e instalaciones de gas y agua',
  },
  {
    id: 'obras',
    label: 'Obras & Tabiques',
    icon: '/icons/categories/obras.png',
    description: 'Construcción de muros, tabiques y estructuras',
  },
];

// ✅ Mantener compatibilidad
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

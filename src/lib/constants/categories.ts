export interface CategoryConstant {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const CATEGORIES: CategoryConstant[] = [
  {
    id: 'construction',
    label: 'Construcción',
    icon: '🏗️',
    description: 'Servicios de construcción en general',
  },
  {
    id: 'carpentry',
    label: 'Carpintería',
    icon: '🪚',
    description: 'Servicios de carpintería y muebles',
  },
  {
    id: 'roofing',
    label: 'Techos',
    icon: '🏠',
    description: 'Instalación y reparación de techos',
  },
  {
    id: 'plumbing',
    label: 'Plomería',
    icon: '🔧',
    description: 'Servicios de plomería e instalaciones hidráulicas',
  },
  {
    id: 'gardening',
    label: 'Jardinería',
    icon: '🌿',
    description: 'Servicios de jardinería y paisajismo',
  },
  {
    id: 'electrical',
    label: 'Electricidad',
    icon: '⚡',
    description: 'Servicios eléctricos e instalaciones',
  },
  {
    id: 'painting',
    label: 'Pintura',
    icon: '🎨',
    description: 'Servicios de pintura y decoración',
  },
  {
    id: 'masonry',
    label: 'Albañilería',
    icon: '🧱',
    description: 'Servicios de albañilería y mampostería',
  },
];

// ✅ AÑADIR CATEGORY_OPTIONS para compatibilidad
export const CATEGORY_OPTIONS = CATEGORIES.map((cat) => ({
  value: cat.id,
  label: cat.label,
  icon: cat.icon,
}));

// ✅ Función para obtener categoría por ID
export const getCategoryById = (id: string): CategoryConstant | undefined => {
  return CATEGORIES.find((cat) => cat.id === id);
};

// ✅ Función para obtener categoría por label
export const getCategoryByLabel = (label: string): CategoryConstant | undefined => {
  return CATEGORIES.find((cat) => cat.label === label);
};

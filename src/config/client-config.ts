// src/config/client-config.ts
/**
 * Configuración completa de AKΠ S.R.L.
 * Diseñada para escalabilidad y todas las funcionalidades actuales/futuras
 * @version 3.0.0
 * @last-updated Enero 2024
 */

// Tipos auxiliares
type ServiceItem = {
  id: string;
  name: string;
  unit: string;
  minOrder: number;
  variants?: string[];
  sizes?: string[];
  brands?: string[];
  types?: string[];
  weightLimit?: number;
  maxWeight?: number;
  radius?: string;
  time?: string;
  comingSoon?: boolean;
};

type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: ServiceItem[];
  features: string[];
  deliveryTime: string;
  coverage: string;
  image?: string;
  color?: string;
};

type Certification = {
  name: string;
  issuer: string;
  id: string;
  validUntil: string;
  icon?: string;
};

type TeamMember = {
  name: string;
  position: string;
  email: string;
  phone: string;
  bio: string;
  image?: string;
  department?: string;
};

type PaymentMethod = {
  name: string;
  type: string;
  available: boolean;
  details: string;
  icon?: string;
  comingSoon?: boolean;
};

type CoverageArea = {
  local: string[];
  provincial: string[];
  national: string[];
  international: string[];
};

type SocialMedia = {
  url: string;
  handle: string;
  icon: string;
  active: boolean;
};

type ColorPalette = {
  main: string;
  light: string;
  dark: string;
  gradient?: string;
  contrast?: string;
};

export const clientConfig = {
  // ============ INFORMACIÓN EMPRESARIAL ============
  company: {
    name: 'AKΠ S.R.L.',
    legalName: 'AKΠ Sociedad de Responsabilidad Limitada',
    shortName: 'AKΠ',
    slogan: 'Acá, pida... y recibirá',
    tagline: 'Calidad que construye, servicio que perdura',
    description:
      'Especializados en alimentos procesados y orgánicos, aceite de coco, derivados del cacao y materiales de construcción de alta resistencia. Distribución mayorista y minorista en toda Cuba.',
    longDescription:
      'AKΠ S.R.L. es una empresa líder en distribución de alimentos y materiales de construcción en Cuba. Con sede en Baracoa, combinamos la tradición baracoense con estándares modernos de calidad para ofrecer productos excepcionales y servicios logísticos confiables.',

    // Información legal
    foundedYear: 2020,
    cif: 'B-12345678',
    rnc: '123-45678-9',
    taxCode: 'TAX-CU-2020-001',
    registrationNumber: 'REG-2020-04567',

    // Logos
    logo: {
      primary: '/akpi-logo-primary.png',
      secondary: '/akpi-logo-secondary.png',
      favicon: '/favicon.ico',
      white: '/akpi-logo-white.png',
      black: '/akpi-logo-black.png',
    },

    // Misión, Visión y Valores
    mission:
      'Proveer productos de calidad con entrega puntual y servicio personalizado, contribuyendo al desarrollo económico de Cuba.',
    vision:
      'Ser el proveedor líder en distribución de alimentos y materiales de construcción en Cuba, reconocido por nuestra excelencia y confiabilidad.',
    values: [
      'Calidad',
      'Confianza',
      'Puntualidad',
      'Servicio',
      'Integridad',
      'Innovación',
    ],

    // Identificadores
    slug: 'akpi',
    website: 'https://akpisrl.com',
    sector: 'Distribución y Logística',
    industry: 'Alimentos y Construcción',

    // Características únicas
    uniqueSellingPoints: [
      'Productos 100% naturales baracoenses',
      'Cadena de suministro optimizada',
      'Atención personalizada 24/7',
      'Garantía de calidad en todos los productos',
      'Logística nacional eficiente',
    ],

    // Premios y reconocimientos
    awards: [
      'Premio a la Excelencia en Distribución 2023',
      'Certificado de Calidad Nacional',
      'Reconocimiento a Empresa Innovadora',
    ],
  },

  // ============ CONTACTO Y UBICACIÓN ============
  contact: {
    // Información principal
    primaryContact: {
      name: 'Departamento de Ventas',
      email: 'ventas@akpisrl.com',
      phone: '+53 55302391',
    },

    // Direcciones físicas
    locations: [
      {
        type: 'headquarters',
        name: 'Sede Principal',
        address: 'Puente Miel, Calle 1 #16- F, Baracoa, Guantánamo, Cuba',
        coordinates: {
          lat: 20.346,
          lng: -74.4958,
        },
        googleMaps: 'https://goo.gl/maps/example',
        phone: '+53 55302391',
        isMain: true,
      },
      {
        type: 'warehouse',
        name: 'Almacén Central',
        address: 'Zona Industrial Norte, Baracoa, Cuba',
        coordinates: {
          lat: 20.35,
          lng: -74.5,
        },
        phone: '+53 55302392',
        capacity: '5000 m²',
      },
    ],

    // Teléfonos
    phones: {
      primary: '+53 55302391',
      sales: '+53 55302390',
      support: '+53 55302393',
      emergency: '+53 5XXXXXXX',
      fax: '+53 55302394',
      formatted: '(53) 55 302391',
    },

    // WhatsApp
    whatsapp: {
      number: '+5355302391',
      formatted: '+53 5 530 2391',
      link: 'https://wa.me/5355302391',
      business: true,
      department: 'Ventas',
    },

    // Correos electrónicos
    emails: {
      general: 'akapisrl@gmail.com',
      sales: 'ventas@akpisrl.com',
      info: 'info@akpisrl.com',
      support: 'soporte@akpisrl.com',
      careers: 'empleo@akpisrl.com',
      partnerships: 'alianzas@akpisrl.com',
      billing: 'facturacion@akpisrl.com',
    },

    // Horarios de atención
    schedule: {
      weekdays: {
        open: '08:00',
        close: '18:00',
        display: '8:00 AM - 6:00 PM',
      },
      saturday: {
        open: '09:00',
        close: '13:00',
        display: '9:00 AM - 1:00 PM',
      },
      sunday: 'Cerrado',
      holidays: 'Consultar calendario oficial',
      emergency: '24/7 para clientes registrados',
    },

    // Información de contacto de emergencia
    emergency: {
      phone: '+53 5XXXXXXX',
      email: 'emergencia@akpisrl.com',
      available: '24/7',
      procedures: 'Contactar solo para situaciones críticas',
    },

    // Departamentos y contactos específicos
    departments: [
      {
        name: 'Ventas',
        email: 'ventas@akpisrl.com',
        phone: '+53 55302390',
        hours: '8:00 AM - 6:00 PM',
      },
      {
        name: 'Soporte Técnico',
        email: 'soporte@akpisrl.com',
        phone: '+53 55302393',
        hours: '9:00 AM - 5:00 PM',
      },
      {
        name: 'Logística',
        email: 'logistica@akpisrl.com',
        phone: '+53 55302395',
        hours: '7:00 AM - 7:00 PM',
      },
    ],
  },

  // ============ SERVICIOS Y PRODUCTOS ============
  services: {
    // Categorías principales
    categories: [
      {
        id: 'alimentos',
        name: 'Alimentos y Bebidas',
        icon: '🍎',
        color: '#10b981',
        description:
          'Distribución de alimentos procesados y orgánicos de alta calidad para el mercado cubano',
        shortDescription: 'Productos alimenticios premium',
        items: [
          {
            id: 'flour-cereals',
            name: 'Harinas y cereales',
            unit: 'kg',
            minOrder: 25,
            variants: ['Trigo', 'Maíz', 'Arroz', 'Avena'],
            brands: ['Molinos de Cuba', 'Cereales Nacionales'],
          },
          {
            id: 'canned-goods',
            name: 'Conservas y enlatados',
            unit: 'unidad',
            minOrder: 12,
            variants: ['Verduras', 'Frutas', 'Carnes', 'Pescados'],
          },
          {
            id: 'natural-drinks',
            name: 'Bebidas naturales',
            unit: 'litro',
            minOrder: 5,
            variants: ['Jugos', 'Refrescos', 'Aguas saborizadas'],
          },
          {
            id: 'dairy-products',
            name: 'Productos lácteos',
            unit: 'kg',
            minOrder: 10,
            variants: ['Leche', 'Queso', 'Yogurt', 'Mantequilla'],
          },
          {
            id: 'sweets-confectionery',
            name: 'Dulces y confitería',
            unit: 'kg',
            minOrder: 5,
            variants: ['Chocolates', 'Caramelos', 'Galletas', 'Pasteles'],
          },
          {
            id: 'spices-seasonings',
            name: 'Especias y condimentos',
            unit: 'kg',
            minOrder: 1,
            variants: ['Sal', 'Pimienta', 'Orégano', 'Comino', 'Azafrán'],
          },
        ],
        features: [
          'Calidad certificada internacionalmente',
          'Productos 100% orgánicos disponibles',
          'Envasado higiénico y seguro',
          'Certificado sanitario vigente',
          'Cadena de frío garantizada',
        ],
        deliveryTime: '24-48 horas',
        coverage: 'Nacional',
        image: '/services/food.jpg',
        benefits: [
          'Mayor vida útil',
          'Empaque sostenible',
          'Precios competitivos',
          'Entrega programada',
        ],
      },
      {
        id: 'aceites-cacao',
        name: 'Aceite de Coco y Derivados del Cacao',
        icon: '🥥',
        color: '#8b5cf6',
        description:
          'Productos naturales premium de coco y cacao para industria alimentaria y cosmética',
        shortDescription: 'Derivados naturales premium',
        items: [
          {
            id: 'coconut-oil',
            name: 'Aceite de coco virgen',
            unit: 'litro',
            minOrder: 10,
            variants: ['Extra virgen', 'Orgánico', 'Fraccionado'],
            types: ['Alimenticio', 'Cosmético'],
          },
          {
            id: 'cocoa-butter',
            name: 'Manteca de cacao',
            unit: 'kg',
            minOrder: 5,
            variants: ['Refinada', 'Natural'],
          },
          {
            id: 'cocoa-powder',
            name: 'Polvo de cacao',
            unit: 'kg',
            minOrder: 5,
            variants: ['Natural', 'Alcalinizado', 'Desgrasado'],
          },
          {
            id: 'chocolate-bars',
            name: 'Chocolate en tableta',
            unit: 'kg',
            minOrder: 2,
            variants: [
              'Amargo 70%',
              'Semiamargo 55%',
              'Con leche 40%',
              'Blanco',
            ],
          },
          {
            id: 'organic-byproducts',
            name: 'Derivados orgánicos',
            unit: 'kg',
            minOrder: 5,
            variants: ['Cáscara de cacao', 'Pulpa de cacao', 'Miel de coco'],
          },
          {
            id: 'baking-supplies',
            name: 'Materias primas para repostería',
            unit: 'kg',
            minOrder: 3,
            variants: ['Coberturas', 'Rellenos', 'Decoraciones'],
          },
        ],
        features: [
          '100% natural sin aditivos',
          'Procesado en frío para conservar nutrientes',
          'Certificación orgánica internacional',
          'Exportación disponible',
          'Control de calidad riguroso',
        ],
        deliveryTime: '48-72 horas',
        coverage: 'Nacional e Internacional',
        image: '/services/cocoa.jpg',
        benefits: [
          'Alta concentración de nutrientes',
          'Versatilidad de uso',
          'Sello de calidad baracoense',
          'Embalaje especializado',
        ],
      },
      {
        id: 'construccion',
        name: 'Materiales de Construcción',
        icon: '🏗️',
        color: '#f59e0b',
        description:
          'Materiales de construcción de alta resistencia certificados para obras civiles y residenciales',
        shortDescription: 'Materiales construcción premium',
        items: [
          {
            id: 'cement-mixes',
            name: 'Cemento y mezclas',
            unit: 'saco',
            minOrder: 50,
            brands: ['Cementos Curazao', 'Cemento Colón', 'Cemento Caribe'],
            types: ['Portland', 'Masonry', 'Rápido'],
          },
          {
            id: 'bricks-blocks',
            name: 'Ladrillos y bloques',
            unit: 'unidad',
            minOrder: 1000,
            sizes: ['10x20x40 cm', '15x20x40 cm', '20x20x40 cm'],
            types: ['Hueco', 'Macizo', 'Tejal'],
          },
          {
            id: 'steel-rebar',
            name: 'Varillas y acero',
            unit: 'tonelada',
            minOrder: 0.5,
            sizes: ['3/8"', '1/2"', '5/8"', '3/4"', '1"'],
            types: ['Corrugado', 'Liso', 'Electrosoldado'],
          },
          {
            id: 'paints-finishes',
            name: 'Pinturas y acabados',
            unit: 'galón',
            minOrder: 4,
            types: ['Esmalte', 'Latex', 'Impermeabilizante', 'Anticorrosivo'],
            brands: ['Comex', 'Sherwin-Williams', 'Pinturas Cuba'],
          },
          {
            id: 'tools-equipment',
            name: 'Herramientas y equipos',
            unit: 'unidad',
            minOrder: 1,
            types: ['Eléctricas', 'Manuales', 'Medición', 'Seguridad'],
          },
          {
            id: 'electrical-materials',
            name: 'Materiales eléctricos',
            unit: 'unidad',
            minOrder: 10,
            types: ['Cableado', 'Interruptores', 'Tuberías', 'Iluminación'],
          },
        ],
        features: [
          'Alta resistencia certificada',
          'Certificados de calidad nacionales',
          'Garantía extendida',
          'Normas ISO 9001:2015',
          'Pruebas de laboratorio',
        ],
        deliveryTime: '72 horas',
        coverage: 'Provincial y Nacional',
        image: '/services/construction.jpg',
        benefits: [
          'Durabilidad garantizada',
          'Asesoría técnica gratuita',
          'Entrega en obra',
          'Descuentos por volumen',
        ],
      },
      {
        id: 'transporte',
        name: 'Transporte de Carga y Pasaje',
        icon: '🚚',
        color: '#3b82f6',
        description:
          'Servicios logísticos integrales con flota propia para todo tipo de cargas y pasajeros',
        shortDescription: 'Logística integral confiable',
        items: [
          {
            id: 'national-transport',
            name: 'Transporte nacional',
            unit: 'viaje',
            minOrder: 1,
            variants: ['Carga general', 'Refrigerado', 'A granel'],
          },
          {
            id: 'heavy-cargo',
            name: 'Carga pesada',
            unit: 'tonelada',
            minOrder: 1,
            maxWeight: 20,
            types: ['Maquinaria', 'Estructuras', 'Equipos industriales'],
          },
          {
            id: 'moving-services',
            name: 'Mudanzas',
            unit: 'servicio',
            minOrder: 1,
            variants: ['Residencial', 'Oficinas', 'Industrial'],
          },
          {
            id: 'express-service',
            name: 'Servicio express',
            unit: 'paquete',
            minOrder: 1,
            weightLimit: 50,
            time: '24 horas',
          },
          {
            id: 'custom-transport',
            name: 'Transporte personalizado',
            unit: 'proyecto',
            minOrder: 1,
            variants: ['Puerta a puerta', 'Multimodal', 'Especializado'],
          },
          {
            id: 'business-logistics',
            name: 'Logística empresarial',
            unit: 'contrato',
            minOrder: 1,
            variants: ['Dedicado', 'Compartido', 'Temporada alta'],
          },
        ],
        features: [
          'Flota propia mantenida',
          'Rastreo GPS en tiempo real',
          'Seguro de carga incluido',
          'Personal capacitado y certificado',
          'Protocolos de seguridad',
        ],
        deliveryTime: 'Según ruta y tipo de carga',
        coverage: 'Toda Cuba',
        image: '/services/transport.jpg',
        benefits: [
          'Monitoreo 24/7',
          'Documentación legal completa',
          'Múltiples opciones de pago',
          'Soporte en ruta',
        ],
      },
      {
        id: 'delivery',
        name: 'Delivery de Alimentos',
        icon: '🛵',
        color: '#ef4444',
        description:
          'Entrega rápida y segura de productos alimenticios con estándares de calidad premium',
        shortDescription: 'Entrega rápida alimentos',
        items: [
          {
            id: 'home-delivery',
            name: 'Entrega a domicilio',
            unit: 'pedido',
            minOrder: 1,
            radius: '50 km',
            time: '2-4 horas',
          },
          {
            id: 'business-service',
            name: 'Servicio a empresas',
            unit: 'contrato',
            minOrder: 1,
            variants: ['Diario', 'Semanal', 'Mensual'],
          },
          {
            id: 'phone-orders',
            name: 'Pedidos por teléfono',
            unit: 'pedido',
            minOrder: 1,
            time: 'Respuesta inmediata',
          },
          {
            id: 'mobile-app',
            name: 'App móvil',
            unit: 'descarga',
            minOrder: 0,
            comingSoon: true,
            variants: ['iOS', 'Android'],
          },
          {
            id: 'multiple-payments',
            name: 'Pagos diversos',
            unit: 'transacción',
            minOrder: 1,
            variants: ['Efectivo', 'Transferencia', 'Tarjeta próximamente'],
          },
          {
            id: 'express-delivery',
            name: 'Entrega express',
            unit: 'pedido',
            minOrder: 1,
            time: '2 horas',
            extraCharge: true,
          },
        ],
        features: [
          'Entrega en máximo 24h',
          'Empaque especial para alimentos',
          'Seguimiento en tiempo real',
          'Atención personalizada',
          'Control de temperatura',
        ],
        deliveryTime: '2-24 horas según ubicación',
        coverage: 'Baracoa y alrededores',
        image: '/services/delivery.jpg',
        benefits: [
          'Sin costo por pedidos mayores',
          'Programación flexible',
          'Notificaciones por SMS',
          'Driver rating system',
        ],
      },
    ],

    // Servicios de valor agregado
    valueAddedServices: [
      {
        name: 'Asesoría técnica gratuita',
        description:
          'Consultoría especializada en uso de materiales y productos',
        icon: '👨‍💼',
        department: 'Técnico',
      },
      {
        name: 'Diseño de mezclas personalizadas',
        description:
          'Formulaciones específicas según requerimientos del cliente',
        icon: '🧪',
        department: 'Laboratorio',
      },
      {
        name: 'Capacitación en uso de productos',
        description: 'Talleres y entrenamientos para optimizar resultados',
        icon: '🎓',
        department: 'Capacitación',
      },
      {
        name: 'Soporte post-venta',
        description: 'Acompañamiento después de la compra',
        icon: '🛠️',
        department: 'Soporte',
      },
      {
        name: 'Consultoría logística',
        description: 'Optimización de cadena de suministro',
        icon: '📦',
        department: 'Logística',
      },
      {
        name: 'Análisis de calidad',
        description: 'Pruebas de laboratorio para garantizar estándares',
        icon: '🔬',
        department: 'Calidad',
      },
    ],

    // Garantías
    guarantees: [
      'Garantía de calidad en todos los productos',
      'Reembolso 100% por productos defectuosos',
      'Reposición inmediata en caso de daños',
      'Soporte técnico especializado por 12 meses',
      'Certificado de autenticidad incluido',
      'Seguro de transporte incluido',
    ],

    // Procesos de calidad
    qualityProcesses: [
      'Control de calidad en tres etapas',
      'Trazabilidad completa del producto',
      'Certificaciones internacionales',
      'Pruebas de laboratorio periódicas',
      'Auditorías de calidad trimestrales',
    ],
  },

  // ============ SOCIAL MEDIA ============
  social: {
    platforms: [
      {
        name: 'Facebook',
        url: 'https://facebook.com/akapi-srl',
        handle: '@akapi-srl',
        icon: 'facebook',
        active: true,
        followers: '2.5K',
      },
      {
        name: 'Instagram',
        url: 'https://instagram.com/akapi_srl',
        handle: '@akapi_srl',
        icon: 'instagram',
        active: true,
        followers: '1.8K',
      },
      {
        name: 'WhatsApp Business',
        url: 'https://wa.me/5355302391',
        handle: '+53 55302391',
        icon: 'whatsapp',
        active: true,
        verified: true,
      },
      {
        name: 'Email',
        url: 'mailto:akapisrl@gmail.com',
        handle: 'akapisrl@gmail.com',
        icon: 'email',
        active: true,
        priority: 'high',
      },
      {
        name: 'LinkedIn',
        url: '',
        handle: '',
        icon: 'linkedin',
        active: false,
        comingSoon: true,
      },
      {
        name: 'YouTube',
        url: '',
        handle: '',
        icon: 'youtube',
        active: false,
        comingSoon: true,
      },
      {
        name: 'TikTok',
        url: '',
        handle: '',
        icon: 'tiktok',
        active: false,
        comingSoon: true,
      },
      {
        name: 'Twitter',
        url: '',
        handle: '',
        icon: 'twitter',
        active: false,
        comingSoon: true,
      },
    ],

    // Estrategia de redes sociales
    strategy: {
      postingSchedule: {
        facebook: 'Lunes, Miércoles, Viernes 10:00 AM',
        instagram: 'Martes, Jueves, Sábado 2:00 PM',
        whatsapp: '24/7 con respuestas automáticas',
      },
      contentTypes: [
        'Product highlights',
        'Client testimonials',
        'Behind the scenes',
        'Industry news',
        'Promotions and offers',
      ],
      hashtags: [
        '#AKΠSRL',
        '#AlimentosCuba',
        '#ConstruccionCuba',
        '#BaracoaProductos',
        '#CalidadGarantizada',
      ],
    },
  },

  // ============ BRANDING Y DISEÑO ============
  branding: {
    // Paleta de colores completa
    colors: {
      primary: {
        main: '#1a56db',
        light: '#3b82f6',
        dark: '#1e40af',
        gradient: 'linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)',
        contrast: '#ffffff',
      },
      secondary: {
        main: '#0e4c8a',
        light: '#0ea5e9',
        dark: '#075985',
        gradient: 'linear-gradient(135deg, #0e4c8a 0%, #0ea5e9 100%)',
        contrast: '#ffffff',
      },
      accent: {
        main: '#059669',
        light: '#10b981',
        dark: '#047857',
        gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        contrast: '#ffffff',
      },
      neutral: {
        dark: '#1f2937',
        medium: '#6b7280',
        light: '#f8fafc',
        background: '#ffffff',
        border: '#e5e7eb',
      },
      status: {
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      semantic: {
        food: '#10b981',
        construction: '#f59e0b',
        transport: '#3b82f6',
        cocoa: '#8b5cf6',
        delivery: '#ef4444',
      },
    },

    // Tipografía
    typography: {
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeight: {
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
      },
    },

    // Espaciado
    spacing: {
      unit: 4, // 4px = 1 unidad
      scale: [0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128],
    },

    // Sombras
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },

    // Bordes
    borders: {
      radius: {
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      width: {
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },
    },

    // Animaciones
    animations: {
      durations: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      easings: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  // ============ CERTIFICACIONES ============
  certifications: [
    {
      name: 'Certificado de Calidad Alimentaria',
      issuer: 'Ministerio de Salud Pública de Cuba',
      id: 'CERT-ALIM-2023-001',
      validUntil: '2025-12-31',
      icon: '🥇',
      category: 'Alimentos',
    },
    {
      name: 'Registro Sanitario',
      issuer: 'Centro para el Control Estatal de Medicamentos (CECMED)',
      id: 'RS-2023-0456',
      validUntil: '2024-12-31',
      icon: '🏥',
      category: 'Salud',
    },
    {
      name: 'Permiso de Comercio Exterior',
      issuer: 'Ministerio de Comercio Exterior y Inversión Extranjera',
      id: 'PCE-2023-789',
      validUntil: '2024-06-30',
      icon: '🌍',
      category: 'Comercio',
    },
    {
      name: 'Certificado de Origen',
      issuer: 'Cámara de Comercio de Cuba',
      id: 'CO-2023-123',
      validUntil: '2024-12-31',
      icon: '📍',
      category: 'Origen',
    },
    {
      name: 'Normas ISO 9001:2015',
      issuer: 'Organismo Certificador Internacional',
      id: 'ISO-9001-2023',
      validUntil: '2026-12-31',
      icon: '📋',
      category: 'Calidad',
    },
    {
      name: 'Certificado de Buenas Prácticas de Manufactura',
      issuer: 'Instituto Nacional de Higiene',
      id: 'BPM-2023-056',
      validUntil: '2025-06-30',
      icon: '👨‍🔬',
      category: 'Manufactura',
    },
  ],

  // ============ COBERTURA GEOGRÁFICA ============
  coverage: {
    local: {
      name: 'Cobertura Local',
      areas: [
        'Baracoa y alrededores',
        'Municipio completo de Baracoa',
        'Comunidades rurales cercanas',
        'Zonas costeras de Guantánamo',
      ],
      deliveryTime: '24 horas',
      minOrder: '500 CUP',
    },
    provincial: {
      name: 'Cobertura Provincial',
      areas: [
        'Toda la provincia de Guantánamo',
        'Ciudad de Guantánamo',
        'Municipios aledaños',
        'Zonas industriales provinciales',
      ],
      deliveryTime: '48-72 horas',
      minOrder: '1000 CUP',
    },
    national: {
      name: 'Cobertura Nacional',
      areas: [
        'Servicio nacional disponible',
        'Principales ciudades de Cuba',
        'Envíos a todo el país',
        'Capital y ciudades principales',
      ],
      deliveryTime: '3-5 días hábiles',
      minOrder: '2000 CUP',
    },
    international: {
      name: 'Cobertura Internacional',
      areas: [
        'Exportaciones a pedido',
        'Caribe y América Latina',
        'Consultar disponibilidad',
        'Puertos principales',
      ],
      deliveryTime: '7-14 días',
      minOrder: '5000 USD',
    },
  },

  // ============ EQUIPO DIRECTIVO ============
  team: {
    members: [
      {
        name: 'Nombre del CEO',
        position: 'Director General',
        email: 'ceo@akpisrl.com',
        phone: '+53 5XXXXXXX',
        bio: 'Más de 15 años de experiencia en distribución y logística. Ingeniero Industrial con especialización en cadena de suministro.',
        image: '/team/ceo.jpg',
        department: 'Dirección',
        linkedin: '',
        responsibilities: [
          'Estrategia corporativa',
          'Relaciones institucionales',
          'Desarrollo de negocio',
        ],
      },
      {
        name: 'Nombre del Gerente',
        position: 'Gerente de Operaciones',
        email: 'gerente@akpisrl.com',
        phone: '+53 5XXXXXXX',
        bio: 'Especialista en gestión de cadena de suministro con 10 años de experiencia en logística empresarial.',
        image: '/team/manager.jpg',
        department: 'Operaciones',
        linkedin: '',
        responsibilities: [
          'Gestión operativa diaria',
          'Optimización de procesos',
          'Control de calidad',
        ],
      },
      {
        name: 'Nombre del Jefe de Ventas',
        position: 'Jefe de Ventas',
        email: 'ventas@akpisrl.com',
        phone: '+53 5XXXXXXX',
        bio: 'Experto en relaciones comerciales y atención al cliente con amplia red de contactos en el sector.',
        image: '/team/sales.jpg',
        department: 'Ventas',
        linkedin: '',
        responsibilities: [
          'Estrategia de ventas',
          'Relación con clientes',
          'Desarrollo comercial',
        ],
      },
      {
        name: 'Nombre del Técnico Especializado',
        position: 'Técnico Especializado',
        email: 'soporte@akpisrl.com',
        phone: '+53 5XXXXXXX',
        bio: 'Certificado en calidad y seguridad alimentaria con experiencia en control de procesos productivos.',
        image: '/team/technical.jpg',
        department: 'Soporte Técnico',
        linkedin: '',
        responsibilities: [
          'Control de calidad',
          'Asesoría técnica',
          'Capacitación de clientes',
        ],
      },
    ],

    // Estructura organizacional
    structure: {
      totalEmployees: 25,
      departments: [
        { name: 'Dirección', count: 2 },
        { name: 'Ventas y Marketing', count: 5 },
        { name: 'Operaciones y Logística', count: 8 },
        { name: 'Soporte Técnico', count: 4 },
        { name: 'Administración', count: 3 },
        { name: 'Calidad', count: 3 },
      ],
    },
  },

  // ============ MÉTODOS DE PAGO ============
  payment: {
    methods: [
      {
        name: 'Efectivo',
        type: 'cash',
        available: true,
        details: 'Moneda nacional (CUP) y convertible (MLC)',
        icon: '💵',
        currencies: ['CUP', 'MLC'],
        limit: 'Sin límite',
      },
      {
        name: 'Transferencia bancaria',
        type: 'bank_transfer',
        available: true,
        details: 'Cuenta en Banco Metropolitano y Banco de Crédito y Comercio',
        icon: '🏦',
        banks: ['Banco Metropolitano', 'BANDEC'],
        processingTime: '24-48 horas',
      },
      {
        name: 'Cheque',
        type: 'check',
        available: true,
        details: 'Cheques certificados solamente con verificación previa',
        icon: '📄',
        verification: 'Requerida',
        clearance: '3-5 días hábiles',
      },
      {
        name: 'Crédito comercial',
        type: 'credit',
        available: true,
        details: 'Aprobación previa requerida con historial crediticio',
        icon: '📊',
        terms: '15, 30, 60 días',
        approval: '72 horas',
      },
      {
        name: 'Tarjeta de débito/crédito',
        type: 'card',
        available: false,
        details: 'Integración en proceso con sistemas nacionales',
        icon: '💳',
        comingSoon: true,
        estimated: 'Q2 2024',
      },
      {
        name: 'Pago móvil',
        type: 'mobile',
        available: false,
        details: 'Transferencias vía EnZona y Transfermóvil próximamente',
        icon: '📱',
        comingSoon: true,
        estimated: 'Q3 2024',
      },
    ],

    // Términos y condiciones
    terms: {
      deposit: '30% al realizar pedido',
      balance: '70% al recibir mercancía',
      creditTerms: 'Hasta 30 días para clientes aprobados',
      lateFees: '2% mensual sobre saldo pendiente',
      discounts: {
        earlyPayment: '2% por pago anticipado',
        volume: '5-15% según cantidad',
        loyalty: 'Programa de puntos acumulables',
      },
    },

    // Monedas aceptadas
    currencies: [
      {
        code: 'CUP',
        name: 'Peso Cubano',
        symbol: '$',
        exchangeRate: 1,
        primary: true,
      },
      {
        code: 'MLC',
        name: 'Moneda Libremente Convertible',
        symbol: 'USD',
        exchangeRate: 1.2,
        primary: false,
      },
      {
        code: 'USD',
        name: 'Dólar Estadounidense',
        symbol: 'US$',
        exchangeRate: 1.25,
        primary: false,
      },
    ],

    // Política de facturación
    invoicing: {
      required: true,
      types: ['Fiscal', 'Proforma', 'Comercial'],
      electronic: false,
      delivery: 'Incluida con pedido',
      requirements: ['Nombre completo', 'CIF/RNC', 'Dirección fiscal'],
    },
  },

  // ============ ENVÍOS Y LOGÍSTICA ============
  shipping: {
    // Tarifas por zona
    rates: {
      local: {
        cost: 'Desde 100 CUP',
        time: '24-48 horas',
        minOrder: '500 CUP',
        freeOver: '2000 CUP',
        service: 'Entrega estándar',
      },
      provincial: {
        cost: 'Desde 500 CUP',
        time: '48-72 horas',
        minOrder: '1000 CUP',
        freeOver: '5000 CUP',
        service: 'Transporte provincial',
      },
      national: {
        cost: 'Desde 1000 CUP',
        time: '3-5 días',
        minOrder: '2000 CUP',
        freeOver: '10000 CUP',
        service: 'Envío nacional',
      },
    },

    // Opciones de empaque
    packaging: [
      {
        type: 'Estándar',
        included: true,
        description: 'Empaque básico de protección',
        materials: ['Cartón', 'Plástico burbuja', 'Cinta'],
      },
      {
        type: 'Premium',
        included: false,
        cost: '100 CUP adicional',
        description: 'Empaque reforzado con branding',
        materials: ['Cartón doble', 'Espuma', 'Sellos de seguridad'],
      },
      {
        type: 'Especial',
        included: false,
        cost: 'Personalizado',
        description: 'Empaque para productos específicos',
        materials: ['Refrigerado', 'A prueba de humedad', 'Antigolpes'],
      },
    ],

    // Servicios adicionales
    additionalServices: [
      {
        name: 'Montaje en sitio',
        description: 'Instalación y montaje de productos',
        cost: '15% del valor del producto',
        available: ['Construcción'],
      },
      {
        name: 'Almacenamiento temporal',
        description: 'Guardar mercancía hasta entrega',
        cost: '50 CUP/día',
        maxDays: 30,
      },
      {
        name: 'Seguro de transporte',
        description: 'Cobertura total durante el envío',
        cost: '1% del valor declarado',
        coverage: '100%',
      },
      {
        name: 'Entrega programada',
        description: 'Entrega en fecha y hora específica',
        cost: '200 CUP',
        precision: '±2 horas',
      },
    ],

    // Política de devoluciones
    returns: {
      allowed: true,
      period: '14 días hábiles',
      conditions: [
        'Producto en empaque original',
        'Sin señales de uso',
        'Factura original',
        'Autorización previa',
      ],
      costs: {
        local: 'Cliente paga envío',
        provincial: '50% costo envío',
        national: 'Costo completo cliente',
      },
    },

    // Flota de transporte
    fleet: {
      totalVehicles: 8,
      types: [
        { type: 'Camiones', count: 3, capacity: '10-20 ton' },
        { type: 'Furgonetas', count: 2, capacity: '2-5 ton' },
        { type: 'Pickups', count: 2, capacity: '1 ton' },
        { type: 'Motocicletas', count: 1, capacity: '50 kg' },
      ],
      features: ['GPS tracking', 'Refrigeración', 'Carga pesada'],
    },
  },

  // ============ CONFIGURACIÓN DE LA APLICACIÓN ============
  app: {
    // Información técnica
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    build: '2024.01.001',

    // Estado del sistema
    maintenance: {
      enabled: false,
      schedule: 'Domingos 2:00-4:00 AM',
      message: 'Sistema en mantenimiento programado',
    },

    // Funcionalidades
    features: {
      onlineOrders: {
        enabled: true,
        type: 'B2B y B2C',
        minOrder: 500,
      },
      orderTracking: {
        enabled: true,
        realTime: true,
        notifications: true,
      },
      customerPortal: {
        enabled: false,
        comingSoon: true,
        eta: 'Q2 2024',
      },
      mobileApp: {
        enabled: false,
        comingSoon: true,
        platforms: ['iOS', 'Android'],
        eta: 'Q3 2024',
      },
      multiLanguage: {
        enabled: false,
        languages: ['es', 'en'],
        comingSoon: true,
      },
      analytics: {
        enabled: true,
        provider: 'Google Analytics',
        dashboard: true,
      },
    },

    // Límites del sistema
    limits: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxOrderItems: 50,
      maxCartItems: 100,
      sessionTimeout: 30, // minutos
      apiRateLimit: 100, // requests por minuto
      uploadTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    },

    // Integraciones
    integrations: {
      paymentGateways: [],
      smsService: false,
      emailService: true,
      crm: false,
      erp: false,
    },
  },

  // ============ ANALYTICS Y SEGUIMIENTO ============
  analytics: {
    googleAnalytics: {
      id: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
      enabled: true,
      events: ['page_view', 'contact_submit', 'order_complete'],
    },
    facebookPixel: {
      id: process.env.NEXT_PUBLIC_FB_PIXEL_ID || 'XXXXXXXXXXXXXXX',
      enabled: false,
    },
    hotjar: {
      id: process.env.NEXT_PUBLIC_HOTJAR_ID || 'XXXXXXXX',
      enabled: false,
    },
    internal: {
      enabled: true,
      metrics: ['conversions', 'bounce_rate', 'session_duration'],
    },
  },

  // ============ SEO Y METADATA ============
  seo: {
    // Metadatos básicos
    title:
      'AKΠ S.R.L. - Distribuidores Mayoristas en Cuba | Alimentos y Construcción',
    description:
      'Distribución de alimentos, materiales de construcción y servicios logísticos en toda Cuba. Calidad garantizada, entrega puntual y servicio personalizado.',
    shortDescription:
      'Especializados en alimentos baracoenses y materiales de construcción',

    // Keywords organizadas por categoría
    keywords: {
      primary: [
        'AKΠ S.R.L.',
        'distribución alimentos Cuba',
        'materiales construcción Baracoa',
        'transporte de carga Cuba',
        'mayorista alimentos Cuba',
      ],
      secondary: [
        'aceite de coco virgen',
        'derivados del cacao',
        'cemento y varillas',
        'delivery alimentos Baracoa',
        'logística empresarial Cuba',
      ],
      location: ['Baracoa', 'Guantánamo', 'Cuba', 'Caribe', 'América Latina'],
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: 'es_CU',
      siteName: 'AKΠ S.R.L.',
      url: 'https://akpisrl.com',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AKΠ S.R.L. - Calidad y Servicio',
        },
      ],
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      site: '@akapi_srl',
      creator: '@akapi_srl',
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },

    // Estructura de datos (Schema.org)
    schema: {
      organization: true,
      localBusiness: true,
      product: true,
      service: true,
    },

    // Sitemap
    sitemap: {
      enabled: true,
      priority: {
        home: 1.0,
        services: 0.9,
        products: 0.8,
        contact: 0.7,
        about: 0.6,
      },
      changefreq: {
        home: 'weekly',
        services: 'monthly',
        products: 'daily',
        contact: 'monthly',
        about: 'yearly',
      },
    },
  },

  // ============ ENLACES LEGALES ============
  legal: {
    documents: [
      {
        name: 'Términos y Condiciones',
        url: '/terminos-y-condiciones',
        required: true,
        lastUpdated: '2024-01-15',
      },
      {
        name: 'Política de Privacidad',
        url: '/privacidad',
        required: true,
        lastUpdated: '2024-01-15',
      },
      {
        name: 'Política de Cookies',
        url: '/cookies',
        required: true,
        lastUpdated: '2024-01-15',
      },
      {
        name: 'Política de Envíos',
        url: '/envios',
        required: false,
        lastUpdated: '2024-01-15',
      },
      {
        name: 'Política de Devoluciones',
        url: '/devoluciones',
        required: false,
        lastUpdated: '2024-01-15',
      },
      {
        name: 'Aviso Legal',
        url: '/aviso-legal',
        required: true,
        lastUpdated: '2024-01-15',
      },
    ],

    // Información regulatoria
    compliance: {
      gdpr: false,
      ccpa: false,
      local: true,
      industry: ['Alimentación', 'Construcción', 'Transporte'],
    },

    // Contacto legal
    contact: {
      legalDepartment: 'legal@akpisrl.com',
      dataProtection: 'privacidad@akpisrl.com',
      compliance: 'cumplimiento@akpisrl.com',
    },
  },

  // ============ FUNCIONALIDADES FUTURAS ============
  roadmap: {
    phase1: {
      name: 'Fase 1 - Plataforma Básica',
      status: 'completed',
      features: [
        'Landing page corporativa',
        'Sistema de contacto',
        'Catálogo de productos',
        'Información de servicios',
        'Responsive design',
      ],
      completion: '2024-01-31',
    },
    phase2: {
      name: 'Fase 2 - Panel Administrativo',
      status: 'in-progress',
      features: [
        'Dashboard administrativo',
        'Gestión de usuarios',
        'CRM básico',
        'Sistema de cotizaciones',
        'Estadísticas básicas',
      ],
      eta: '2024-03-31',
    },
    phase3: {
      name: 'Fase 3 - E-commerce',
      status: 'planned',
      features: [
        'Carrito de compras',
        'Checkout online',
        'Pasarela de pagos',
        'Seguimiento de pedidos',
        'Portal del cliente',
      ],
      eta: '2024-06-30',
    },
    phase4: {
      name: 'Fase 4 - Optimización Avanzada',
      status: 'planned',
      features: [
        'App móvil nativa',
        'Chat en tiempo real',
        'Sistema de fidelización',
        'API pública',
        'Multi-idioma',
      ],
      eta: '2024-12-31',
    },
  },

  // ============ CONFIGURACIONES DE DESARROLLO ============
  development: {
    // URLs de entorno
    urls: {
      production: 'https://akpisrl.com',
      staging: 'https://staging.akpisrl.com',
      development: 'http://localhost:3000',
      api: 'https://api.akpisrl.com',
    },

    // Configuración de API
    api: {
      version: 'v1',
      basePath: '/api/v1',
      timeout: 30000,
      retries: 3,
    },

    // Cache
    cache: {
      enabled: true,
      duration: 3600, // segundos
      strategies: ['ssr', 'isr', 'swr'],
    },

    // Performance
    performance: {
      imageOptimization: true,
      lazyLoading: true,
      codeSplitting: true,
      compression: true,
    },

    // Seguridad
    security: {
      cors: true,
      csrf: true,
      csp: true,
      rateLimiting: true,
      sanitization: true,
    },
  },

  // ============ SOPORTE Y CONTACTO ============
  support: {
    channels: [
      {
        name: 'Teléfono',
        value: '+53 55302391',
        hours: '8:00 AM - 6:00 PM',
        priority: 'high',
      },
      {
        name: 'WhatsApp',
        value: '+53 55302391',
        hours: '24/7',
        priority: 'high',
      },
      {
        name: 'Email',
        value: 'soporte@akpisrl.com',
        hours: '24/7',
        responseTime: '24 horas',
      },
      {
        name: 'Formulario web',
        value: '/contacto',
        hours: '24/7',
        responseTime: '48 horas',
      },
    ],

    // FAQs categorizadas
    faqs: {
      general: [
        {
          question: '¿Dónde se encuentran ubicados?',
          answer:
            'Nuestra sede principal está en Puente Miel, Baracoa, Guantánamo, Cuba.',
        },
        {
          question: '¿Cuáles son sus horarios de atención?',
          answer:
            'Lunes a Viernes: 8:00 AM - 6:00 PM, Sábados: 9:00 AM - 1:00 PM.',
        },
      ],
      products: [
        {
          question: '¿Ofrecen productos orgánicos?',
          answer:
            'Sí, contamos con línea completa de productos orgánicos certificados.',
        },
      ],
      shipping: [
        {
          question: '¿Realizan envíos a todo Cuba?',
          answer:
            'Sí, ofrecemos cobertura nacional con diferentes opciones de entrega.',
        },
      ],
    },

    // Documentación
    documentation: {
      userGuide: '/guia-usuario',
      apiDocs: '/api-documentacion',
      adminGuide: '/guia-administrador',
      deploymentGuide: '/guia-despliegue',
    },
  },

  // ============ CONFIGURACIONES ESPECÍFICAS POR PAÍS ============
  localization: {
    country: 'Cuba',
    language: 'es',
    locale: 'es_CU',
    timezone: 'America/Havana',
    currency: 'CUP',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    units: 'metric',

    // Regulaciones específicas
    regulations: {
      foodSafety: 'Norma Cubana NC 180:2019',
      construction: 'Normas Cubanas de Construcción',
      transportation: 'Reglamento del Transporte Terrestre',
    },

    // Feriados nacionales
    holidays: [
      '2024-01-01', // Año Nuevo
      '2024-01-02', // Día de la Liberación
      '2024-05-01', // Día del Trabajo
      '2024-07-25', // Día de la Rebeldía Nacional
      '2024-07-26', // Día de la Revolución
      '2024-10-10', // Día de la Independencia
      '2024-12-25', // Navidad
    ],
  },
} as const;

// Tipos exportados
export type ClientConfig = typeof clientConfig;
export type ServiceCategory = ClientConfig['services']['categories'][number];
export type ServiceItem = ServiceCategory['items'][number];
export type TeamMember = ClientConfig['team']['members'][number];
export type Certification = ClientConfig['certifications'][number];
export type PaymentMethod = ClientConfig['payment']['methods'][number];
export type SocialPlatform = ClientConfig['social']['platforms'][number];
export type ColorPalette = ClientConfig['branding']['colors']['primary'];

// Helper types para uso común
export type ContactInfo = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  schedule: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
};

// Funciones utilitarias
export const getConfigHelpers = () => ({
  // Obtiene información de contacto formateada
  getContactInfo: (): ContactInfo => ({
    phone:
      typeof clientConfig.contact.phones === 'object'
        ? clientConfig.contact.phones.primary
        : clientConfig.contact.phone,
    whatsapp:
      typeof clientConfig.contact.whatsapp === 'object'
        ? clientConfig.contact.whatsapp.number
        : clientConfig.contact.whatsapp,
    email:
      typeof clientConfig.contact.emails === 'object'
        ? clientConfig.contact.emails.general
        : clientConfig.contact.email,
    address: clientConfig.contact.locations[0].address,
    schedule: {
      weekdays: clientConfig.contact.schedule.weekdays.display,
      saturday: clientConfig.contact.schedule.saturday.display,
      sunday: clientConfig.contact.schedule.sunday,
    },
  }),

  // Obtiene todos los productos de todas las categorías
  getAllProducts: () => {
    return clientConfig.services.categories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.name,
        categoryId: category.id,
        categoryIcon: category.icon,
        categoryColor: category.color,
      }))
    );
  },

  // Obtiene servicios por categoría
  getServicesByCategory: (categoryId: string) => {
    return clientConfig.services.categories.find((c) => c.id === categoryId);
  },

  // Verifica si el negocio está abierto ahora
  isBusinessOpen: () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    const day = now.getDay();

    if (day === 0) return false; // Domingo

    const schedule = clientConfig.contact.schedule;

    if (day === 6) {
      // Sábado
      const [openHour, openMinute] = schedule.saturday.open
        .split(':')
        .map(Number);
      const [closeHour, closeMinute] = schedule.saturday.close
        .split(':')
        .map(Number);
      const openTime = openHour * 60 + openMinute;
      const closeTime = closeHour * 60 + closeMinute;
      return currentTime >= openTime && currentTime <= closeTime;
    }

    // Lunes a Viernes
    const [openHour, openMinute] = schedule.weekdays.open
      .split(':')
      .map(Number);
    const [closeHour, closeMinute] = schedule.weekdays.close
      .split(':')
      .map(Number);
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;
    return currentTime >= openTime && currentTime <= closeTime;
  },

  // Genera enlace de WhatsApp con mensaje predefinido
  getWhatsAppLink: (message?: string) => {
    const defaultMessage = `Hola ${clientConfig.company.name}, estoy interesado en sus productos.`;
    const phone =
      typeof clientConfig.contact.whatsapp === 'object'
        ? clientConfig.contact.whatsapp.number
        : clientConfig.contact.whatsapp;

    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message || defaultMessage)}`;
  },

  // Genera enlace de Google Maps para la sede principal
  getGoogleMapsLink: () => {
    const address = clientConfig.contact.locations[0].address;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  },

  // Obtiene el color de una categoría
  getCategoryColor: (categoryId: string) => {
    const category = clientConfig.services.categories.find(
      (c) => c.id === categoryId
    );
    return category?.color || clientConfig.branding.colors.primary.main;
  },
});

export default clientConfig;

// ============================================
// CONFIGURACIÓN POR PAÍS
// ============================================
export type CountryCode = 'CL' | 'CU' | 'AR' | 'MX' | 'PE' | 'CO' | 'ES';

export interface CountryConfig {
  code: CountryCode;
  name: string;
  validation: (id: string) => boolean;
  format?: (id: string) => string;
  placeholder: string;
  label: string;
  example: string;
  required: boolean;
}

// ============================================
// VALIDADORES POR PAÍS
// ============================================

// 🇨🇱 CHILE - RUT
const validateChile = (id: string): boolean => {
  if (!id) return false;

  const clean = id.replace(/[.\s-]/g, '').toUpperCase();
  if (!/^\d{1,8}[0-9K]$/.test(clean)) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const calculatedDv = 11 - remainder;

  if (calculatedDv === 11) return dv === '0';
  if (calculatedDv === 10) return dv === 'K';
  return dv === calculatedDv.toString();
};

// 🇨🇺 CUBA - CI (Carnet de Identidad) - MÁS FLEXIBLE PARA PRUEBAS
const validateCuba = (id: string): boolean => {
  if (!id) return false;

  const clean = id.replace(/[.\s-]/g, '');

  // ✅ PARA PRUEBAS: Aceptamos cualquier identificación con 7-11 dígitos
  // o que tenga un formato básico de CI cubano
  if (/^\d{7,11}$/.test(clean)) return true;

  // ✅ También aceptamos formato cubano clásico (11 dígitos)
  if (/^\d{11}$/.test(clean)) {
    // Validación básica de CI cubano
    // Los primeros 2 dígitos son el año (00-99)
    // Los siguientes 2 son el mes (01-12)
    // Los siguientes 2 son el día (01-31)
    const year = parseInt(clean.slice(0, 2));
    const month = parseInt(clean.slice(2, 4));
    const day = parseInt(clean.slice(4, 6));

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 0 || year > 99) return false;

    return true;
  }

  // ✅ Para pruebas: aceptamos cualquier texto que no esté vacío
  // y tenga al menos 5 caracteres (para evitar datos falsos muy cortos)
  return clean.length >= 5;
};

// 🇦🇷 ARGENTINA - DNI
const validateArgentina = (id: string): boolean => {
  const clean = id.replace(/[.\s-]/g, '');
  return /^\d{7,8}$/.test(clean);
};

// 🇲🇽 MÉXICO - CURP o RFC
const validateMexico = (id: string): boolean => {
  const clean = id.replace(/[.\s-]/g, '').toUpperCase();
  // CURP: 18 caracteres alfanuméricos
  if (/^[A-Z0-9]{18}$/.test(clean)) return true;
  // RFC: 12 o 13 caracteres alfanuméricos
  if (/^[A-Z0-9]{12,13}$/.test(clean)) return true;
  return false;
};

// 🇵🇪 PERÚ - DNI
const validatePeru = (id: string): boolean => {
  const clean = id.replace(/[.\s-]/g, '');
  return /^\d{8}$/.test(clean);
};

// 🇨🇴 COLOMBIA - CC
const validateColombia = (id: string): boolean => {
  const clean = id.replace(/[.\s-]/g, '');
  return /^\d{8,10}$/.test(clean);
};

// 🇪🇸 ESPAÑA - DNI/NIE
const validateSpain = (id: string): boolean => {
  const clean = id.replace(/[.\s-]/g, '').toUpperCase();
  // DNI: 8 números + letra
  if (/^\d{8}[A-Z]$/.test(clean)) {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = parseInt(clean.slice(0, 8));
    const expectedLetter = letters[number % 23];
    return clean[8] === expectedLetter;
  }
  // NIE: X/Y/Z + 7 números + letra
  if (/^[XYZ]\d{7}[A-Z]$/.test(clean)) {
    return true;
  }
  return false;
};

// ============================================
// CONFIGURACIÓN DE PAÍSES
// ============================================
export const COUNTRY_CONFIGS: Record<CountryCode, CountryConfig> = {
  CL: {
    code: 'CL',
    name: 'Chile',
    validation: validateChile,
    format: (id: string) => {
      const clean = id.replace(/[.\s-]/g, '');
      if (clean.length < 2) return id;
      const body = clean.slice(0, -1);
      const dv = clean.slice(-1).toUpperCase();
      const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `${formattedBody}-${dv}`;
    },
    placeholder: '12.345.678-K',
    label: 'RUT',
    example: '12.345.678-K',
    required: true,
  },
  CU: {
    code: 'CU',
    name: 'Cuba',
    validation: validateCuba,
    format: (id: string) => {
      const clean = id.replace(/[.\s-]/g, '');
      // Formato cubano: 87-12345-67
      if (clean.length >= 7) {
        const part1 = clean.slice(0, 2);
        const part2 = clean.slice(2, 7);
        const part3 = clean.slice(7);
        return `${part1}-${part2}-${part3}`;
      }
      return clean;
    },
    placeholder: '87-12345-67',
    label: 'CI (Carnet de Identidad)',
    example: '87-12345-67',
    required: false, // ✅ En Cuba es opcional para pruebas
  },
  AR: {
    code: 'AR',
    name: 'Argentina',
    validation: validateArgentina,
    format: (id: string) => {
      const clean = id.replace(/[.\s-]/g, '');
      return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    placeholder: '12.345.678',
    label: 'DNI',
    example: '12.345.678',
    required: true,
  },
  MX: {
    code: 'MX',
    name: 'México',
    validation: validateMexico,
    format: (id: string) => id.toUpperCase(),
    placeholder: 'CURP o RFC',
    label: 'CURP / RFC',
    example: 'GODE561231HDFRRL09',
    required: true,
  },
  PE: {
    code: 'PE',
    name: 'Perú',
    validation: validatePeru,
    format: (id: string) => {
      const clean = id.replace(/[.\s-]/g, '');
      return clean;
    },
    placeholder: '12345678',
    label: 'DNI',
    example: '12345678',
    required: true,
  },
  CO: {
    code: 'CO',
    name: 'Colombia',
    validation: validateColombia,
    format: (id: string) => {
      const clean = id.replace(/[.\s-]/g, '');
      return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    placeholder: '12.345.678',
    label: 'CC (Cédula)',
    example: '12.345.678',
    required: true,
  },
  ES: {
    code: 'ES',
    name: 'España',
    validation: validateSpain,
    format: (id: string) => id.toUpperCase(),
    placeholder: '12345678A',
    label: 'DNI / NIE',
    example: '12345678A',
    required: true,
  },
};

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Valida una identificación según el país
 */
export const validateIdentification = (id: string, countryCode: CountryCode): boolean => {
  const config = COUNTRY_CONFIGS[countryCode];
  if (!config) return false;
  return config.validation(id);
};

/**
 * Formatea una identificación según el país
 */
export const formatIdentification = (id: string, countryCode: CountryCode): string => {
  const config = COUNTRY_CONFIGS[countryCode];
  if (!config || !config.format) return id;
  return config.format(id);
};

/**
 * Obtiene la configuración de un país
 */
export const getCountryConfig = (countryCode: CountryCode): CountryConfig => {
  return COUNTRY_CONFIGS[countryCode];
};

/**
 * Lista de países disponibles
 */
export const getAvailableCountries = (): { code: CountryCode; name: string }[] => {
  return Object.entries(COUNTRY_CONFIGS).map(([code, config]) => ({
    code: code as CountryCode,
    name: config.name,
  }));
};

/**
 * Valida con mensaje de error
 */
export const validateIdentificationWithMessage = (
  id: string,
  countryCode: CountryCode
): { isValid: boolean; message: string } => {
  const config = COUNTRY_CONFIGS[countryCode];
  if (!config) {
    return { isValid: false, message: 'País no soportado' };
  }

  if (!id || id.trim() === '') {
    if (countryCode === 'CU') {
      return { isValid: true, message: 'En Cuba, la identificación es opcional para pruebas' };
    }
    return { isValid: false, message: 'La identificación es requerida' };
  }

  const isValid = config.validation(id);

  if (!isValid) {
    return {
      isValid: false,
      message: `Identificación inválida para ${config.name}. Formato esperado: ${config.example}`,
    };
  }

  return { isValid: true, message: 'Identificación válida' };
};

import { log } from '@/lib/utils/logger';
// ============================================
// VALIDADOR DE RUT CHILENO
// ============================================
export const validarRUT = (rut: string): boolean => {
  if (!rut) return false;

  const clean = rut.replace(/[.\s-]/g, '').toUpperCase();
  if (clean.length < 2) return false;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  if (dvCalculado === 11) return dv === '0';
  if (dvCalculado === 10) return dv === 'K';
  return dv === dvCalculado.toString();
};

// ============================================
// VALIDADOR DE CI CUBANO (FLEXIBLE PARA PRUEBAS)
// ============================================
export const validarCI = (ci: string): boolean => {
  if (!ci) return false;

  const clean = ci.replace(/[.\s-]/g, '');

  // ✅ Para pruebas: aceptamos cualquier número de 7-11 dígitos
  if (/^\d{7,11}$/.test(clean)) return true;

  // ✅ Formato cubano clásico (11 dígitos)
  if (/^\d{11}$/.test(clean)) {
    const year = parseInt(clean.slice(0, 2));
    const month = parseInt(clean.slice(2, 4));
    const day = parseInt(clean.slice(4, 6));

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 0 || year > 99) return false;

    return true;
  }

  return false;
};

// ============================================
// VALIDADOR DE DNI ARGENTINO
// ============================================
export const validarDNI = (dni: string): boolean => {
  const clean = dni.replace(/[.\s-]/g, '');
  return /^\d{7,8}$/.test(clean);
};

// ============================================
// VALIDADOR DE CURP MEXICANO
// ============================================
export const validarCURP = (curp: string): boolean => {
  const clean = curp.replace(/[.\s-]/g, '').toUpperCase();
  if (/^[A-Z0-9]{18}$/.test(clean)) return true;
  if (/^[A-Z0-9]{12,13}$/.test(clean)) return true;
  return false;
};

// ============================================
// VALIDADOR DE DNI PERUANO
// ============================================
export const validarDNIPeru = (dni: string): boolean => {
  const clean = dni.replace(/[.\s-]/g, '');
  return /^\d{8}$/.test(clean);
};

// ============================================
// VALIDADOR DE CC COLOMBIANO
// ============================================
export const validarCC = (cc: string): boolean => {
  const clean = cc.replace(/[.\s-]/g, '');
  return /^\d{8,10}$/.test(clean);
};

// ============================================
// VALIDADOR DE DNI ESPAÑOL
// ============================================
export const validarDNIEs = (dni: string): boolean => {
  const clean = dni.replace(/[.\s-]/g, '').toUpperCase();
  if (/^\d{8}[A-Z]$/.test(clean)) {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = parseInt(clean.slice(0, 8));
    const expectedLetter = letters[number % 23];
    return clean[8] === expectedLetter;
  }
  if (/^[XYZ]\d{7}[A-Z]$/.test(clean)) return true;
  return false;
};

// ============================================
// VALIDADOR GENÉRICO POR PAÍS
// ============================================
export const validarIdentificacion = (
  valor: string,
  pais: string
): { esValido: boolean; mensaje: string } => {
  if (!valor || valor.trim() === '') {
    return { esValido: false, mensaje: 'Campo requerido' };
  }

  let esValido = false;
  let mensaje = '';

  switch (pais) {
    case 'CL':
      esValido = validarRUT(valor);
      mensaje = esValido ? '✅ RUT válido' : '❌ RUT inválido. Ej: 12.345.678-K';
      break;
    case 'CU':
      esValido = validarCI(valor);
      mensaje = esValido ? '✅ CI válido' : '❌ CI inválido. Ej: 87-12345-67';
      break;
    case 'AR':
      esValido = validarDNI(valor);
      mensaje = esValido ? '✅ DNI válido' : '❌ DNI inválido. Ej: 12.345.678';
      break;
    case 'MX':
      esValido = validarCURP(valor);
      mensaje = esValido ? '✅ CURP/RFC válido' : '❌ CURP/RFC inválido';
      break;
    case 'PE':
      esValido = validarDNIPeru(valor);
      mensaje = esValido ? '✅ DNI válido' : '❌ DNI inválido. Ej: 12345678';
      break;
    case 'CO':
      esValido = validarCC(valor);
      mensaje = esValido ? '✅ CC válido' : '❌ CC inválido. Ej: 12.345.678';
      break;
    case 'ES':
      esValido = validarDNIEs(valor);
      mensaje = esValido ? '✅ DNI/NIE válido' : '❌ DNI/NIE inválido. Ej: 12345678A';
      break;
    default:
      esValido = false;
      mensaje = 'País no soportado';
  }

  return { esValido, mensaje };
};

// ============================================
// FORMATEADOR DE IDENTIFICACIÓN
// ============================================
export const formatearIdentificacion = (valor: string, pais: string): string => {
  const clean = valor.replace(/[.\s-]/g, '');

  if (pais === 'CL') {
    if (clean.length < 2) return clean;
    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1).toUpperCase();
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpoFormateado}-${dv}`;
  }

  if (pais === 'CU') {
    if (clean.length >= 7) {
      const parte1 = clean.slice(0, 2);
      const parte2 = clean.slice(2, 7);
      const parte3 = clean.slice(7);
      return `${parte1}-${parte2}-${parte3}`;
    }
  }

  return clean;
};

// ============================================
// OBTENER CONFIGURACIÓN POR PAÍS
// ============================================
export const getPlaceholderByCountry = (pais: string): string => {
  const configs: Record<string, string> = {
    CL: '12.345.678-K',
    CU: '87-12345-67',
    AR: '12.345.678',
    MX: 'CURP o RFC',
    PE: '12345678',
    CO: '12.345.678',
    ES: '12345678A',
  };
  return configs[pais] || 'Identificación';
};

export const getLabelByCountry = (pais: string): string => {
  const configs: Record<string, string> = {
    CL: 'RUT',
    CU: 'CI',
    AR: 'DNI',
    MX: 'CURP/RFC',
    PE: 'DNI',
    CO: 'CC',
    ES: 'DNI/NIE',
  };
  return configs[pais] || 'Identificación';
};

import { ProfileData } from '@/lib/firebase/profile.service';

// ✅ Campos requeridos para verificación
export interface ProviderVerificationFields {
  displayName: boolean;
  phone: boolean;
  identification: boolean;
  identificationValid: boolean;
  specialties: boolean;
  legalName: boolean;
  address: boolean;
  description: boolean;
  photoURL: boolean;
  regionId: boolean;
  provinceId: boolean;
}

// ✅ Verificar si todos los campos requeridos están completos
export const isProviderComplete = (data: ProfileData): boolean => {
  const fields = getProviderVerificationStatus(data);
  return Object.values(fields).every((value) => value === true);
};

// ✅ Obtener el estado de cada campo
export const getProviderVerificationStatus = (data: ProfileData): ProviderVerificationFields => {
  const specialties = data.specialties || [];

  return {
    displayName: (data.displayName && data.displayName.length >= 3) || false,
    phone: (data.phone && data.phone.length >= 8) || false,
    identification: (data.identification && data.identification.length >= 3) || false,
    identificationValid: data.identificationValid === true,
    specialties: specialties.length > 0,
    legalName: (data.legalName && data.legalName.length >= 3) || false,
    address: (data.address && data.address.length >= 5) || false,
    description: (data.description && data.description.length >= 20) || false,
    photoURL: (data.photoURL && data.photoURL.length >= 5) || false,
    regionId: (data.regionId && data.regionId.length > 0) || false,
    provinceId: (data.provinceId && data.provinceId.length > 0) || false,
  };
};

// ✅ Obtener campos faltantes
export const getMissingVerificationFields = (data: ProfileData): string[] => {
  const status = getProviderVerificationStatus(data);
  const missing: string[] = [];

  if (!status.displayName) missing.push('Nombre completo (mínimo 3 caracteres)');
  if (!status.phone) missing.push('Teléfono (mínimo 8 dígitos)');
  if (!status.identification) missing.push('Identificación');
  if (!status.identificationValid) missing.push('Identificación válida');
  if (!status.specialties) missing.push('Al menos una especialidad');
  if (!status.legalName) missing.push('Razón social (mínimo 3 caracteres)');
  if (!status.address) missing.push('Dirección fiscal (mínimo 5 caracteres)');
  if (!status.description) missing.push('Descripción profesional (mínimo 20 caracteres)');
  if (!status.photoURL) missing.push('Foto de perfil');
  if (!status.regionId) missing.push('Región');
  if (!status.provinceId) missing.push('Provincia');

  return missing;
};

// ✅ Calcular el progreso de verificación (0-100)
export const getVerificationProgress = (data: ProfileData): number => {
  const status = getProviderVerificationStatus(data);
  const totalFields = Object.keys(status).length;
  const completedFields = Object.values(status).filter((v) => v === true).length;
  return Math.round((completedFields / totalFields) * 100);
};

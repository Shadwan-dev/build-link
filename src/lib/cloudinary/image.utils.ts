// lib/cloudinary/image.utils.ts
import { getOptimizedCloudinaryUrl } from './upload.service';

// Función para verificar si una URL es de Cloudinary
export const isCloudinaryUrl = (url: string): boolean => {
  return url?.includes('cloudinary.com') || false;
};

// Función para obtener URL optimizada con diferentes tamaños
export const getImageUrl = (
  url: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'limit' | 'pad';
    quality?: 'auto' | number;
  }
): string => {
  if (!url) return '';

  // Si es Cloudinary, optimizar
  if (isCloudinaryUrl(url)) {
    return getOptimizedCloudinaryUrl(url, options);
  }

  // Si es Firebase o cualquier otra URL, devolverla sin cambios
  return url;
};

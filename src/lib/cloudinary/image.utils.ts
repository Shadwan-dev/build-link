// lib/cloudinary/image.utils.ts

import { getOptimizedCloudinaryUrl } from './upload.service';

export const isCloudinaryUrl = (url: string): boolean => {
  if (!url) return false;
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
};

export const getImageUrl = (
  url: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'limit' | 'pad';
    quality?: 'auto' | number;
    fallback?: string;
  }
): string => {
  if (!url) {
    return options?.fallback || '/images/placeholder.jpg';
  }

  if (isCloudinaryUrl(url)) {
    try {
      return getOptimizedCloudinaryUrl(url, options);
    } catch (error) {
      console.warn('Error optimizando URL de Cloudinary:', error);
      return url;
    }
  }

  return url;
};

export const getThumbnailUrl = (url: string): string => {
  return getImageUrl(url, { width: 200, height: 200, crop: 'fill' });
};

export const getMediumUrl = (url: string): string => {
  return getImageUrl(url, { width: 600, height: 400, crop: 'fill' });
};

export const getLargeUrl = (url: string): string => {
  return getImageUrl(url, { width: 1200, height: 800, crop: 'fill' });
};

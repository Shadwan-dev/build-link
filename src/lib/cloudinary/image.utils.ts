// lib/cloudinary/image.utils.ts
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
      // ✅ Construir URL optimizada manualmente
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        const transformations = [];
        if (options?.width) transformations.push(`w_${options.width}`);
        if (options?.height) transformations.push(`h_${options.height}`);
        if (options?.crop) transformations.push(`c_${options.crop}`);
        if (options?.quality) {
          transformations.push(
            typeof options.quality === 'number' ? `q_${options.quality}` : 'q_auto'
          );
        }
        // Siempre optimizar formato y calidad
        transformations.push('f_auto');
        transformations.push('q_auto');

        const transformStr = transformations.length > 0 ? transformations.join(',') + '/' : '';
        return `${parts[0]}/upload/${transformStr}${parts[1]}`;
      }
      return url;
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

export const getSmallUrl = (url: string): string => {
  return getImageUrl(url, { width: 300, height: 300, crop: 'fill' });
};

export const getMediumUrl = (url: string): string => {
  return getImageUrl(url, { width: 600, height: 400, crop: 'fill' });
};

export const getLargeUrl = (url: string): string => {
  return getImageUrl(url, { width: 1200, height: 800, crop: 'fill' });
};

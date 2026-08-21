// lib/cloudinary/upload.service.ts

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  throw new Error('Faltan variables de entorno de Cloudinary');
}

export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  // Opcional: organizar en carpetas por usuario
  formData.append('folder', 'build-link');

  if (onProgress) {
    onProgress(20);
  }

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error Cloudinary:', errorData);
      throw new Error(errorData.error?.message || 'Error al subir la imagen a Cloudinary');
    }

    if (onProgress) {
      onProgress(80);
    }

    const data = await response.json();

    if (onProgress) {
      onProgress(100);
    }

    return data.secure_url;
  } catch (error) {
    console.error('Error en uploadToCloudinary:', error);
    throw error;
  }
};

// Función para obtener URL optimizada
export const getOptimizedCloudinaryUrl = (
  url: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'limit' | 'pad';
    quality?: 'auto' | number;
  }
): string => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations = [];
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) {
    transformations.push(typeof options.quality === 'number' ? `q_${options.quality}` : 'q_auto');
  }
  // Siempre optimizar formato y calidad
  transformations.push('f_auto');
  transformations.push('q_auto');

  const transformStr = transformations.length > 0 ? transformations.join(',') + '/' : '';
  return `${parts[0]}/upload/${transformStr}${parts[1]}`;
};

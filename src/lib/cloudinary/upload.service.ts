// lib/cloudinary/upload.service.ts

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  console.log('📸 uploadToCloudinary llamado con file:', file.name);

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.error('❌ Faltan variables de entorno:', { CLOUD_NAME, UPLOAD_PRESET });
    throw new Error('Faltan variables de entorno de Cloudinary');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'build-link');

  if (onProgress) onProgress(20);

  try {
    console.log(`📤 Subiendo a Cloudinary: ${CLOUD_NAME}`);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error Cloudinary:', errorData);
      throw new Error(errorData.error?.message || 'Error al subir la imagen');
    }

    if (onProgress) onProgress(80);

    const data = await response.json();
    console.log('✅ Respuesta Cloudinary:', data.secure_url);

    if (onProgress) onProgress(100);

    return data.secure_url;
  } catch (error) {
    console.error('❌ Error en uploadToCloudinary:', error);
    throw error;
  }
};

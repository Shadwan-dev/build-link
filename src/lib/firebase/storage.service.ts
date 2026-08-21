import { log } from '@/lib/utils/logger';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './config';

// ✅ Subir imagen a Firebase Storage
export const uploadImage = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage no está disponible');
    }

    // ✅ Crear referencia única
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);

    // ✅ Subir con progreso
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          log.error('Error subiendo imagen:', error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          log.info('✅ Imagen subida:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    log.error('❌ Error subiendo imagen:', error);
    throw new Error('Error al subir la imagen');
  }
};

// ✅ Subir múltiples imágenes
export const uploadMultipleImages = async (
  files: File[],
  path: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> => {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i], path, (progress) => {
      if (onProgress) {
        onProgress(i, progress);
      }
    });
    urls.push(url);
  }

  return urls;
};

// ✅ Eliminar imagen
export const deleteImage = async (url: string): Promise<void> => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage no está disponible');
    }

    // ✅ Obtener referencia desde la URL
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
    log.info('🗑️ Imagen eliminada:', url);
  } catch (error) {
    log.error('❌ Error eliminando imagen:', error);
    throw new Error('Error al eliminar la imagen');
  }
};

// ✅ Obtener todas las imágenes de una carpeta
export const getImagesFromFolder = async (path: string): Promise<string[]> => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage no está disponible');
    }

    const folderRef = ref(storage, path);
    const result = await listAll(folderRef);

    const urls = await Promise.all(
      result.items.map(async (item) => {
        return await getDownloadURL(item);
      })
    );

    return urls;
  } catch (error) {
    log.error('❌ Error obteniendo imágenes:', error);
    return [];
  }
};

// ✅ Validar archivo de imagen
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // ✅ Tipos permitidos
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato no permitido. Usa JPG, PNG, WEBP o GIF.',
    };
  }

  // ✅ Tamaño máximo (5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `La imagen es demasiado grande. Máximo 5MB. Tamaño actual: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  return { valid: true };
};

// ✅ Comprimir imagen antes de subir (opcional)
export const compressImage = (file: File, maxWidth: number = 1200): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Error comprimiendo imagen'));
            }
          },
          'image/jpeg',
          0.8
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

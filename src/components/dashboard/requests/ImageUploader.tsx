// components/dashboard/requests/ImageUploader.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { uploadToCloudinary } from '@/lib/cloudinary/upload.service';
import { compressImage, validateImageFile } from '@/lib/firebase/storage.service';
import { AlertCircle, FileImage, Loader2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  folder?: string;
}

export const ImageUploader = ({
  images,
  onChange,
  maxImages = 5,
  folder = 'requests',
}: ImageUploaderProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingIndex, setUploadingIndex] = useState(-1);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList) => {
    console.log('📸 handleFileUpload llamado con files:', files.length);

    if (!user) {
      toast.error('Debes iniciar sesión para subir imágenes');
      return;
    }

    const fileArray = Array.from(files);
    const totalImages = images.length + fileArray.length;

    if (totalImages > maxImages) {
      toast.error(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    const newErrors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach((file) => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        newErrors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error(`Error en ${newErrors.length} archivo(s)`);
    }

    if (validFiles.length === 0) return;

    setLoading(true);
    setErrors([]);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < validFiles.length; i++) {
        setUploadingIndex(i);
        setUploadProgress(0);

        let file = validFiles[i];
        if (file.size > 1024 * 1024) {
          file = await compressImage(file);
        }

        console.log(`📸 Subiendo imagen ${i + 1} a Cloudinary...`);

        // ✅ Subir a Cloudinary
        const url = await uploadToCloudinary(file, (progress) => {
          setUploadProgress(progress);
        });

        console.log(`✅ Imagen ${i + 1} subida:`, url);
        uploadedUrls.push(url);
      }

      const newImages = [...images, ...uploadedUrls];
      console.log('📸 URLs totales:', newImages);

      onChange(newImages);
      toast.success(`${uploadedUrls.length} imagen(es) subida(s) correctamente`);
      setUploadProgress(100);
    } catch (error) {
      console.error('❌ Error subiendo imágenes:', error);
      toast.error('Error al subir las imágenes');
    } finally {
      setLoading(false);
      setUploadingIndex(-1);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Área de subida */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
          dragOver
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : images.length > 0
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Subiendo imagen {uploadingIndex + 1}...
            </p>
            <div className="w-full max-w-xs h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(uploadProgress)}%
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-3">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                <Upload className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Arrastra y suelta tus imágenes aquí
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              o haz clic para seleccionar archivos
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span>📸 JPG, PNG, WEBP</span>
              <span>📦 Máx. 5MB</span>
              <span>📊 Máx. {maxImages} imágenes</span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium shadow-sm"
            >
              Seleccionar imágenes
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  handleFileUpload(e.target.files);
                }
              }}
              className="hidden"
            />
          </>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          {images.length} / {maxImages} imágenes subidas
        </p>
      </div>

      {/* Errores */}
      {errors.length > 0 && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4" />
            Errores de validación:
          </p>
          <ul className="text-xs text-red-600 dark:text-red-400 space-y-0.5">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Previsualización */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            >
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3E❌%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {index + 1}
              </div>
              {index === 0 && (
                <div className="absolute top-1 left-1 bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  Portada
                </div>
              )}
            </div>
          ))}
          {images.length < maxImages && !loading && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-1 hover:border-primary-400 transition text-gray-400 hover:text-primary-500"
            >
              <FileImage className="w-6 h-6" />
              <span className="text-[10px]">Agregar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

ImageUploader.displayName = 'ImageUploader';

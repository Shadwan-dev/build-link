'use client';

import { IdentificationValidator } from '@/components/profile/IdentificationValidator';
import { RegionSelector } from '@/components/ui/RegionSelector';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getUserProfile, ProfileData, updateUserProfile } from '@/lib/firebase/profile.service';
import { autoVerifyProvider, getVerificationStatus } from '@/lib/firebase/verification.service';
import { log } from '@/lib/utils/logger';
import {
  getMissingVerificationFields,
  getVerificationProgress,
  isProviderComplete,
} from '@/lib/utils/provider-verification';
import {
  AlertTriangle,
  Building2,
  Camera,
  CheckCircle,
  Loader2,
  Save,
  Shield,
  User,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, firebaseUser, refreshUser } = useAuth();
  const { currentRole } = useRole();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [verification, setVerification] = useState<any>(null);
  const [requestingVerification, setRequestingVerification] = useState(false);

  // ✅ Estado para verificación automática
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const [formData, setFormData] = useState<ProfileData>({
    displayName: '',
    phone: '',
    photoURL: '',
    location: '',
    specialties: [],
    experience: 0,
    description: '',
    identification: '',
    legalName: '',
    address: '',
    country: 'CL',
    identificationValid: false,
    regionId: '',
    provinceId: '',
  });

  const [identificationState, setIdentificationState] = useState({
    value: '',
    isValid: false,
    country: 'CL' as 'CL' | 'CU' | 'AR' | 'MX' | 'PE' | 'CO' | 'ES',
  });

  const isInitialLoad = useRef(true);
  const isProvider = currentRole === 'provider';

  // ============================================
  // CARGAR PERFIL
  // ============================================
  useEffect(() => {
    const loadData = async () => {
      if (!user || !isInitialLoad.current) return;
      isInitialLoad.current = false;

      setLoading(true);
      try {
        const [profileData, verificationData] = await Promise.all([
          getUserProfile(user.uid),
          isProvider ? getVerificationStatus(user.uid) : null,
        ]);

        if (profileData) {
          setProfile(profileData);
          setFormData({
            displayName: profileData.displayName || '',
            phone: profileData.phone || '',
            photoURL: profileData.photoURL || '',
            location: profileData.location || '',
            specialties: profileData.specialties || [],
            experience: profileData.experience || 0,
            description: profileData.description || '',
            identification: profileData.identification || '',
            legalName: profileData.legalName || '',
            address: profileData.address || '',
            country: profileData.country || 'CL',
            identificationValid: profileData.identificationValid || false,
            regionId: profileData.regionId || '',
            provinceId: profileData.provinceId || '',
          });

          setIdentificationState({
            value: profileData.identification || '',
            isValid: profileData.identificationValid || false,
            country: profileData.country || 'CL',
          });
        }

        if (verificationData) {
          setVerification(verificationData);
        }
      } catch (error) {
        log.error('Error cargando datos:', error);
        toast.error('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, isProvider]);

  // ============================================
  // VERIFICACIÓN AUTOMÁTICA - SE EJECUTA EN CADA CAMBIO
  // ============================================
  useEffect(() => {
    if (!isProvider) return;

    // ✅ Calcular progreso y estado
    const progress = getVerificationProgress(formData);
    setVerificationProgress(progress);

    const complete = isProviderComplete(formData);
    setIsComplete(complete);

    if (!complete) {
      const missing = getMissingVerificationFields(formData);
      setMissingFields(missing);
    } else {
      setMissingFields([]);
    }

    // ✅ Si ya está verificado por admin, no hacer nada
    if (verification?.verificationStatus === 'approved') return;

    // ✅ Si está completo y no está pendiente, solicitar verificación automática
    if (complete && verification?.verificationStatus !== 'pending') {
      handleAutoVerify();
    }
  }, [formData, isProvider, verification]);

  // ============================================
  // VERIFICACIÓN AUTOMÁTICA - USANDO EL SERVICIO
  // ============================================
  const handleAutoVerify = useCallback(async () => {
    if (!user || !isProvider) return;
    if (!isComplete) return;
    if (verification?.verificationStatus === 'approved') return;
    if (verification?.verificationStatus === 'pending') return;

    setRequestingVerification(true);
    try {
      // ✅ Usar la función importada
      await autoVerifyProvider(user.uid, {
        uid: user.uid,
        displayName: formData.displayName || '',
        email: user.email || '',
        phone: formData.phone || '',
        identification: formData.identification || '',
        country: formData.country || 'CL',
        legalName: formData.legalName || '',
        address: formData.address || '',
        specialties: formData.specialties || [],
        experience: formData.experience || 0,
        description: formData.description || '',
      });

      // ✅ Recargar estado de verificación
      const updated = await getVerificationStatus(user.uid);
      setVerification(updated);

      toast.success('🎉 ¡Cuenta verificada automáticamente!', {
        icon: '✅',
      });
    } catch (error: any) {
      log.error('Error en verificación automática:', error);
      toast.error('Error al verificar automáticamente');
    } finally {
      setRequestingVerification(false);
    }
  }, [user, isProvider, isComplete, formData, verification]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSpecialtyToggle = useCallback((specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties?.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...(prev.specialties || []), specialty],
    }));
  }, []);

  const handleIdentificationChange = useCallback((value: string, isValid: boolean) => {
    setIdentificationState((prev) => ({
      ...prev,
      value,
      isValid,
    }));

    setFormData((prev) => ({
      ...prev,
      identification: value,
      identificationValid: isValid,
    }));
  }, []);

  const handleCountryChange = useCallback((country: string) => {
    const countryCode = country as 'CL' | 'CU' | 'AR' | 'MX' | 'PE' | 'CO' | 'ES';

    setIdentificationState({
      value: '',
      isValid: false,
      country: countryCode,
    });

    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      identification: '',
      identificationValid: false,
    }));
  }, []);

  const handleRegionChange = useCallback((location: { regionId: string; provinceId: string }) => {
    setFormData((prev) => ({
      ...prev,
      regionId: location.regionId,
      provinceId: location.provinceId,
    }));
  }, []);

  // ============================================
  // GUARDAR PERFIL
  // ============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (isProvider && formData.identification && !formData.identificationValid) {
      toast.error('La identificación no es válida. Verifica el formato.');
      return;
    }

    setSaving(true);
    try {
      const updateData: ProfileData = {
        displayName: formData.displayName,
        phone: formData.phone,
        photoURL: formData.photoURL,
        location: formData.location,
        specialties: formData.specialties || [],
        experience: formData.experience || 0,
        description: formData.description,
        identification: identificationState.value,
        legalName: formData.legalName,
        address: formData.address,
        country: identificationState.country,
        identificationValid: identificationState.isValid,
        regionId: formData.regionId,
        provinceId: formData.provinceId,
      };

      await updateUserProfile(user.uid, updateData, firebaseUser || undefined);
      await refreshUser();
      toast.success('✅ Perfil actualizado correctamente');
    } catch (error) {
      log.error('Error:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const specialties = [
    'Construcción',
    'Albañilería',
    'Carpintería',
    'Techos',
    'Jardinería',
    'Plomería',
    'Electricidad',
    'Pintura',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          👤 Mi Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {isProvider
            ? 'Gestiona tu información profesional y solicita verificación'
            : 'Gestiona tu información personal'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6"
      >
        {/* Foto de perfil */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden">
              {formData.photoURL ? (
                <img
                  src={formData.photoURL}
                  alt={formData.displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition"
              title="Cambiar foto"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sube una foto de perfil profesional
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Ingresa la URL de la imagen</p>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-2 w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+34 600 000 000"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* VALIDACIÓN DE IDENTIFICACIÓN */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📋 Identificación
          </h3>

          <IdentificationValidator
            value={identificationState.value}
            onChange={handleIdentificationChange}
            initialCountry={identificationState.country}
            label="Número de identificación"
            required={isProvider}
          />

          {isProvider && !identificationState.isValid && identificationState.value && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              ⚠️ La identificación debe ser válida para solicitar verificación
            </p>
          )}

          {isProvider && identificationState.isValid && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              ✅ Identificación validada correctamente
            </p>
          )}
        </div>

        {/* Campos para proveedores */}
        {isProvider && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🏗️ Información profesional
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Razón social *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="legalName"
                      value={formData.legalName}
                      onChange={handleChange}
                      placeholder="Nombre de la empresa"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección fiscal *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle, número, ciudad..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Años de experiencia *
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* ✅ SELECTOR DE REGIÓN Y PROVINCIA */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📍 Ubicación
                </h3>

                <RegionSelector
                  value={{
                    regionId: formData.regionId || '',
                    provinceId: formData.provinceId || '',
                  }}
                  onChange={handleRegionChange}
                  label="Región y Provincia"
                  required={isProvider}
                />
              </div>

              {/* Especialidades */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Especialidades *
                </label>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                        formData.specialties?.includes(specialty)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Selecciona al menos una especialidad
                </p>
              </div>

              {/* Descripción */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción profesional *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe tu experiencia, servicios y especialidades..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formData.description?.length || 0}/500 caracteres (mínimo 20)
                </p>
              </div>
            </div>
          </>
        )}

        {/* ✅ BARRA DE PROGRESO DE VERIFICACIÓN - SOLO PARA PROVEEDORES */}
        {isProvider && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-500" />
                Estado de verificación
              </h3>
              {verification?.verificationStatus === 'approved' ? (
                <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Verificada ✓
                </span>
              ) : isComplete ? (
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando...
                </span>
              ) : (
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {verificationProgress}% completado
                </span>
              )}
            </div>

            {/* ✅ Barra de progreso */}
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  verification?.verificationStatus === 'approved'
                    ? 'bg-green-500'
                    : isComplete
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-yellow-500'
                }`}
                style={{
                  width: `${verification?.verificationStatus === 'approved' ? 100 : verificationProgress}%`,
                }}
              />
            </div>

            {/* ✅ Estado actual y campos faltantes */}
            {verification?.verificationStatus === 'approved' ? (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  ¡Tu cuenta está verificada! Disfruta de todos los beneficios.
                </p>
              </div>
            ) : isComplete ? (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando automáticamente tu cuenta...
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Completa todos los campos para verificación automática
                </p>
                {missingFields.length > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300 mb-1">
                      Campos pendientes:
                    </p>
                    <ul className="text-xs text-yellow-600 dark:text-yellow-400 space-y-0.5">
                      {missingFields.map((field, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="text-red-400">•</span>
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

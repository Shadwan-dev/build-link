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
  Clock,
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

  // ✅ Estado para verificación - SOLO VISUAL
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
  // VALIDACIÓN VISUAL (SOLO MUESTRA PROGRESO)
  // ============================================
  useEffect(() => {
    if (!isProvider) return;

    // ✅ Calcular progreso - SOLO VISUAL
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
  }, [formData, isProvider]);

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
  // GUARDAR Y VERIFICAR - UN SOLO PASO
  // ============================================
  // ============================================
  // GUARDAR Y VERIFICAR - UN SOLO PASO
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
      // ✅ 1. Guardar perfil
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

      // ✅ 2. Si es proveedor, verificar automáticamente después de guardar
      if (isProvider) {
        const complete = isProviderComplete(updateData);
        if (complete) {
          setRequestingVerification(true);
          try {
            await autoVerifyProvider(user.uid, {
              uid: user.uid,
              displayName: updateData.displayName || '',
              email: user.email || '',
              phone: updateData.phone || '',
              identification: updateData.identification || '',
              country: updateData.country || 'CL',
              legalName: updateData.legalName || '',
              address: updateData.address || '',
              specialties: updateData.specialties || [],
              experience: updateData.experience || 0,
              description: updateData.description || '',
            });

            // ✅ Recargar estado de verificación
            const updated = await getVerificationStatus(user.uid);
            setVerification(updated);

            if (updated?.verificationStatus === 'approved') {
              toast.success('🎉 ¡Cuenta verificada automáticamente!', {
                icon: '✅',
                duration: 3000,
              });
            } else {
              // ✅ CORREGIDO: usar toast en lugar de toast.info
              toast('📋 Solicitud de verificación enviada', {
                icon: '📋',
                duration: 3000,
              });
            }
          } catch (verifyError) {
            log.error('Error en verificación automática:', verifyError);
            toast.error('Perfil guardado, pero hubo un error en la verificación');
          } finally {
            setRequestingVerification(false);
          }
        } else {
          // ✅ Si no está completo, mostrar qué falta
          const missing = getMissingVerificationFields(updateData);
          toast.error(
            `⚠️ Completa los siguientes campos para verificar tu cuenta:\n${missing.join('\n')}`,
            { duration: 5000 }
          );
        }
      }

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
            ? 'Gestiona tu información profesional. Al guardar, se verificará automáticamente.'
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

        {/* ✅ BARRA DE PROGRESO DE VERIFICACIÓN - SOLO INFORMATIVA */}
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
              ) : verification?.verificationStatus === 'pending' ? (
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                  <Clock className="w-4 h-4 animate-pulse" />
                  Pendiente
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {verificationProgress}% completado
                </span>
              )}
            </div>

            {/* ✅ Barra de progreso */}
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  verification?.verificationStatus === 'approved'
                    ? 'bg-green-500'
                    : verification?.verificationStatus === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-primary-500'
                }`}
                style={{
                  width:
                    verification?.verificationStatus === 'approved'
                      ? 100
                      : verification?.verificationStatus === 'pending'
                        ? 100
                        : verificationProgress,
                }}
              />
            </div>

            {/* ✅ Mensaje informativo */}
            {verification?.verificationStatus === 'approved' ? (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  ¡Tu cuenta está verificada! Disfruta de todos los beneficios.
                </p>
              </div>
            ) : verification?.verificationStatus === 'pending' ? (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 animate-pulse" />
                  Tu solicitud está en revisión. Te notificaremos cuando sea aprobada.
                </p>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {isComplete ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />✅ Todos los campos
                      completos. Guarda para verificar tu cuenta.
                    </span>
                  ) : (
                    <span>⚠️ Completa todos los campos para verificar tu cuenta al guardar.</span>
                  )}
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
              </div>
            )}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={saving || requestingVerification}
            className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving || requestingVerification ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {saving ? 'Guardando...' : 'Verificando...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar y verificar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

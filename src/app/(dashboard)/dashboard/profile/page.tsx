'use client';
import { log } from '@/lib/utils/logger';

import { IdentificationValidator } from '@/components/profile/IdentificationValidator';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getUserProfile, ProfileData, updateUserProfile } from '@/lib/firebase/profile.service';
import { getVerificationStatus, requestVerification } from '@/lib/firebase/verification.service';
import {
  AlertCircle,
  Building2,
  Camera,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Save,
  Shield,
  User,
  XCircle,
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
  // VALIDACIONES PARA VERIFICACIÓN
  // ============================================
  const isFormComplete = useCallback(() => {
    const specialties = formData.specialties || [];
    const experience = formData.experience || 0;
    const legalName = formData.legalName || '';
    const address = formData.address || '';
    const description = formData.description || '';
    const location = formData.location || '';
    const photoURL = formData.photoURL || '';

    return (
      formData.displayName.length >= 3 &&
      formData.phone.length >= 8 &&
      formData.identificationValid === true &&
      specialties.length > 0 &&
      legalName.length >= 3 &&
      address.length >= 5 &&
      description.length >= 20 &&
      location.length >= 3 &&
      photoURL.length >= 5 &&
      experience >= 0
    );
  }, [formData]);

  const getMissingFields = useCallback(() => {
    const missing: string[] = [];
    const specialties = formData.specialties || [];
    const experience = formData.experience || 0;
    const legalName = formData.legalName || '';
    const address = formData.address || '';
    const description = formData.description || '';
    const location = formData.location || '';
    const photoURL = formData.photoURL || '';

    if (formData.displayName.length < 3) missing.push('Nombre completo (mínimo 3 caracteres)');
    if (formData.phone.length < 8) missing.push('Teléfono (mínimo 8 dígitos)');
    if (!formData.identificationValid) missing.push('Identificación válida');
    if (specialties.length === 0) missing.push('Al menos una especialidad');
    if (legalName.length < 3) missing.push('Razón social (mínimo 3 caracteres)');
    if (address.length < 5) missing.push('Dirección fiscal (mínimo 5 caracteres)');
    if (description.length < 20) missing.push('Descripción profesional (mínimo 20 caracteres)');
    if (location.length < 3) missing.push('Ubicación (mínimo 3 caracteres)');
    if (photoURL.length < 5) missing.push('Foto de perfil');
    if (experience < 0) missing.push('Años de experiencia válidos');
    return missing;
  }, [formData]);

  // ============================================
  // SOLICITAR VERIFICACIÓN - CORREGIDA
  // ============================================
  const handleRequestVerification = async () => {
    if (!user || !isProvider) {
      toast.error('Debes ser un proveedor para solicitar verificación');
      return;
    }

    if (!isFormComplete()) {
      const missing = getMissingFields();
      toast.error(`⚠️ Completa los siguientes campos:\n${missing.join('\n')}`);
      return;
    }

    setRequestingVerification(true);
    try {
      // ✅ Solo los campos que existen en VerificationRequest
      await requestVerification({
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

      toast.success('✅ Solicitud de verificación enviada correctamente');
      const updated = await getVerificationStatus(user.uid);
      setVerification(updated);
    } catch (error: any) {
      log.error('Error:', error);
      toast.error(error.message || 'Error al solicitar verificación');
    } finally {
      setRequestingVerification(false);
    }
  };

  // ============================================
  // ✅ RENDER VERIFICACIÓN - MOVIDO DENTRO DEL COMPONENTE
  // ============================================
  const renderVerificationStatus = useCallback(() => {
    if (!isProvider) return null;

    const isComplete = isFormComplete();
    const missingFields = getMissingFields();

    const statusMap: Record<
      string,
      {
        icon: React.ReactNode;
        label: string;
        color: string;
        description: string;
      }
    > = {
      not_requested: {
        icon: <Shield className="w-5 h-5 text-gray-400" />,
        label: 'No verificada',
        color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
        description: isComplete
          ? '¡Listo para solicitar verificación!'
          : 'Completa todos los campos para solicitar verificación',
      },
      pending: {
        icon: <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />,
        label: 'Verificación pendiente',
        color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        description: 'Tu solicitud está siendo revisada por nuestro equipo',
      },
      approved: {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        label: 'Verificada ✓',
        color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        description: '¡Tu cuenta está verificada! Disfruta de todos los beneficios.',
      },
      rejected: {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        label: 'Rechazada',
        color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        description: 'Revisa los motivos y vuelve a solicitar',
      },
    };

    const status = verification?.verificationStatus || 'not_requested';
    const info = statusMap[status] || statusMap['not_requested'];

    return (
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {info.icon}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Estado de verificación</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm px-2 py-0.5 rounded-full ${info.color}`}>
                  {info.label}
                </span>
                {status === 'not_requested' && isComplete && (
                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Todo listo
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{info.description}</p>
            </div>
          </div>

          {/* Botones según estado */}
          {status === 'not_requested' && (
            <button
              onClick={handleRequestVerification}
              disabled={requestingVerification || !isComplete}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm whitespace-nowrap ${
                isComplete
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
              title={!isComplete ? 'Completa todos los campos requeridos' : ''}
            >
              {requestingVerification ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Solicitar verificación
                </>
              )}
            </button>
          )}

          {status === 'pending' && (
            <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>En revisión...</span>
            </div>
          )}

          {status === 'approved' && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>¡Cuenta verificada!</span>
            </div>
          )}

          {status === 'rejected' && (
            <button
              onClick={handleRequestVerification}
              disabled={requestingVerification || !isComplete}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm whitespace-nowrap ${
                isComplete
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {requestingVerification ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Reintentando...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Reintentar
                </>
              )}
            </button>
          )}
        </div>

        {/* Mostrar campos faltantes */}
        {status === 'not_requested' && !isComplete && (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Campos pendientes para solicitar verificación:
            </p>
            <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1">
              {missingFields.map((field, index) => (
                <li key={index}>• {field}</li>
              ))}
            </ul>
          </div>
        )}

        {verification?.verificationNotes && status === 'rejected' && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              ❌ Motivo del rechazo:
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              {verification.verificationNotes}
            </p>
          </div>
        )}
      </div>
    );
  }, [
    isProvider,
    verification,
    requestingVerification,
    isFormComplete,
    getMissingFields,
    handleRequestVerification,
  ]);

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

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ubicación *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ciudad, provincia..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

        {/* Estado de verificación */}
        {renderVerificationStatus()}

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

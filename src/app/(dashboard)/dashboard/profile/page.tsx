'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { getUserProfile, ProfileData, updateUserProfile } from '@/lib/firebase/profile.service';
import { getVerificationStatus, requestVerification } from '@/lib/firebase/verification.service';
import {
  Building2,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  MapPin,
  Save,
  Shield,
  User,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
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
  });

  const isProvider = currentRole === 'provider';

  // Cargar perfil y verificación
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
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
          });
        }

        if (verificationData) {
          setVerification(verificationData);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
        toast.error('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, isProvider]);

  // Manejar cambios en formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties?.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...(prev.specialties || []), specialty],
    }));
  };

  // Guardar perfil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await updateUserProfile(user.uid, formData, firebaseUser || undefined);
      await refreshUser();
      toast.success('✅ Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  // Solicitar verificación
  const handleRequestVerification = async () => {
    if (!user || !isProvider) return;

    // Validar campos requeridos
    if (!formData.identification || !formData.specialties?.length || !formData.legalName) {
      toast.error(
        'Completa todos los campos requeridos (identificación, especialidades, razón social)'
      );
      return;
    }

    setRequestingVerification(true);
    try {
      await requestVerification({
        uid: user.uid,
        displayName: formData.displayName,
        email: user.email || '',
        phone: formData.phone,
        identification: formData.identification,
        legalName: formData.legalName,
        address: formData.address || '',
        specialties: formData.specialties || [],
        experience: formData.experience || 0,
        description: formData.description || '',
      });

      toast.success('✅ Solicitud de verificación enviada');
      // Recargar estado de verificación
      const updated = await getVerificationStatus(user.uid);
      setVerification(updated);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al solicitar verificación');
    } finally {
      setRequestingVerification(false);
    }
  };

  // Renderizar estado de verificación
  const renderVerificationStatus = () => {
    if (!isProvider) return null;

    const statusMap: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
      not_requested: {
        icon: <Shield className="w-5 h-5 text-gray-400" />,
        label: 'No verificada',
        color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      },
      pending: {
        icon: <Clock className="w-5 h-5 text-yellow-500" />,
        label: 'Verificación pendiente',
        color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      },
      approved: {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        label: 'Verificada ✓',
        color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      },
      rejected: {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        label: 'Rechazada',
        color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      },
    };

    const status = verification?.verificationStatus || 'not_requested';
    const info = statusMap[status] || statusMap['not_requested'];

    return (
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {info.icon}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Estado de verificación</p>
              <span className={`text-sm px-2 py-0.5 rounded-full ${info.color}`}>{info.label}</span>
            </div>
          </div>
          {status === 'not_requested' && (
            <button
              onClick={handleRequestVerification}
              disabled={requestingVerification}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2 text-sm"
            >
              {requestingVerification ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              Solicitar verificación
            </button>
          )}
          {status === 'pending' && (
            <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>En revisión...</span>
            </div>
          )}
          {status === 'approved' && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>¡Cuenta verificada!</span>
            </div>
          )}
          {status === 'rejected' && (
            <button
              onClick={handleRequestVerification}
              disabled={requestingVerification}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2 text-sm"
            >
              {requestingVerification ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              Reintentar
            </button>
          )}
        </div>
        {verification?.verificationNotes && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Motivo: {verification.verificationNotes}
          </p>
        )}
      </div>
    );
  };

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
              Teléfono
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
            Ubicación
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
                    Identificación (DNI/NIE/CIF) *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="identification"
                      value={formData.identification}
                      onChange={handleChange}
                      placeholder="12345678A"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
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
                  Dirección fiscal
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
                    Años de experiencia
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
                  Descripción profesional
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
                  {formData.description?.length || 0}/500 caracteres
                </p>
              </div>
            </div>
          </>
        )}

        {/* Estado de verificación (solo proveedores) */}
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

import { updateProfile, User } from 'firebase/auth';
import { doc, Firestore, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './config';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

// ✅ Interface completa con todos los campos
export interface ProfileData {
  displayName: string;
  phone: string;
  photoURL?: string;
  location?: string;
  // Para proveedores
  specialties?: string[];
  experience?: number;
  description?: string;
  identification?: string;
  legalName?: string;
  address?: string;
  // ✅ AÑADIR estos campos para la validación
  country?: string;
  identificationValid?: boolean;
  verificationStatus?: 'not_requested' | 'pending' | 'approved' | 'rejected';
  verificationNotes?: string;
}

// ✅ Obtener perfil de usuario - CON TODOS LOS CAMPOS
export const getUserProfile = async (uid: string): Promise<any> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'users', uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        uid,
        ...data,
        // ✅ Asegurar que los campos de validación existen
        country: data.country || 'CL',
        identificationValid: data.identificationValid || false,
        verificationStatus: data.verificationStatus || 'not_requested',
        verificationNotes: data.verificationNotes || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return null;
  }
};

// ✅ Actualizar perfil de usuario - CON TODOS LOS CAMPOS
export const updateUserProfile = async (
  uid: string,
  data: ProfileData,
  authUser?: User
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'users', uid);

    // ✅ Preparar datos para Firestore
    const updateData: any = {
      displayName: data.displayName,
      phone: data.phone || '',
      photoURL: data.photoURL || '',
      location: data.location || '',
      specialties: data.specialties || [],
      experience: data.experience || 0,
      description: data.description || '',
      identification: data.identification || '',
      legalName: data.legalName || '',
      address: data.address || '',
      // ✅ Incluir campos de validación
      country: data.country || 'CL',
      identificationValid: data.identificationValid || false,
      updatedAt: serverTimestamp(),
    };

    // ✅ Si tiene verificationStatus, actualizarlo
    if (data.verificationStatus) {
      updateData.verificationStatus = data.verificationStatus;
    }
    if (data.verificationNotes) {
      updateData.verificationNotes = data.verificationNotes;
    }

    // ✅ Actualizar en Firestore
    await updateDoc(docRef, updateData);

    // ✅ Si hay authUser, actualizar displayName en Authentication
    if (authUser && data.displayName) {
      try {
        await updateProfile(authUser, {
          displayName: data.displayName,
          photoURL: data.photoURL || null,
        });
      } catch (authError) {
        console.warn('Error actualizando perfil en Auth:', authError);
      }
    }

    // ✅ Si es proveedor, actualizar también en providers
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.role === 'provider') {
        const providerRef = doc(dbInstance, 'providers', uid);
        await updateDoc(providerRef, {
          displayName: data.displayName,
          phone: data.phone || '',
          photoURL: data.photoURL || '',
          location: data.location || '',
          specialties: data.specialties || [],
          experience: data.experience || 0,
          description: data.description || '',
          identification: data.identification || '',
          legalName: data.legalName || '',
          address: data.address || '',
          country: data.country || 'CL',
          identificationValid: data.identificationValid || false,
          updatedAt: serverTimestamp(),
        });
      }
    }

    console.log('✅ Perfil actualizado correctamente');
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    throw new Error('Error al actualizar el perfil');
  }
};

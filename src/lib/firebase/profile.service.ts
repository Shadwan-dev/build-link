import { updateProfile, User } from 'firebase/auth';
import { doc, Firestore, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './config';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

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
  legalName?: string; // ✅ Añadir legalName
  address?: string; // ✅ Añadir address
}

// ✅ Obtener perfil de usuario
export const getUserProfile = async (uid: string): Promise<any> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'users', uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { uid, ...snapshot.data() };
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return null;
  }
};

// ✅ Actualizar perfil de usuario
export const updateUserProfile = async (
  uid: string,
  data: ProfileData,
  authUser?: User
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'users', uid);

    // ✅ Actualizar en Firestore
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    // ✅ Si hay authUser, actualizar displayName en Authentication
    if (authUser && data.displayName) {
      await updateProfile(authUser, {
        displayName: data.displayName,
        photoURL: data.photoURL || null,
      });
    }

    // ✅ Si es proveedor, actualizar también en providers
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.role === 'provider') {
        const providerRef = doc(dbInstance, 'providers', uid);
        await updateDoc(providerRef, {
          displayName: data.displayName,
          phone: data.phone,
          photoURL: data.photoURL || '',
          location: data.location || '',
          specialties: data.specialties || [],
          experience: data.experience || 0,
          description: data.description || '',
          identification: data.identification || '',
          legalName: data.legalName || '', // ✅ Añadir
          address: data.address || '', // ✅ Añadir
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    throw new Error('Error al actualizar el perfil');
  }
};

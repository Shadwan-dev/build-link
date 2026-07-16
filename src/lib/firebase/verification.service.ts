import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';
import { createNotification } from './notification.service';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

export interface ProviderVerification {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  identification: string;
  legalName: string; // ✅ Asegurar que existe
  address: string; // ✅ Asegurar que existe
  specialties: string[];
  experience: number;
  description: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date;
  verificationNotes?: string;
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Solicitar verificación
export const requestVerification = async (
  data: Omit<ProviderVerification, 'isVerified' | 'verificationStatus' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'verifications', data.uid);

    await setDoc(docRef, {
      ...data,
      isVerified: false,
      verificationStatus: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // ✅ Notificar a los admins
    await createNotification(
      'admin',
      '📋 Nueva solicitud de verificación',
      `${data.displayName} ha solicitado verificación como proveedor`,
      'system',
      `/admin/verifications/${data.uid}`
    );
  } catch (error) {
    console.error('Error solicitando verificación:', error);
    throw new Error('Error al solicitar verificación');
  }
};

// ✅ Obtener verificación de un proveedor
export const getVerificationStatus = async (uid: string): Promise<ProviderVerification | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'verifications', uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { uid: snapshot.id, ...snapshot.data() } as ProviderVerification;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo verificación:', error);
    return null;
  }
};

// ✅ Aprobar verificación (Admin)
export const approveVerification = async (uid: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'verifications', uid);

    await updateDoc(docRef, {
      isVerified: true,
      verificationStatus: 'approved',
      verificationDate: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // ✅ Actualizar el provider en la colección providers
    const providerRef = doc(dbInstance, 'providers', uid);
    await updateDoc(providerRef, {
      isVerified: true,
      verificationDate: serverTimestamp(),
    });

    // ✅ Notificar al proveedor
    const verification = await getVerificationStatus(uid);
    if (verification) {
      await createNotification(
        uid,
        '✅ ¡Verificación aprobada!',
        'Tu cuenta ha sido verificada como proveedor. Ahora aparecerás en el listado de profesionales.',
        'system',
        '/dashboard/profile'
      );
    }
  } catch (error) {
    console.error('Error aprobando verificación:', error);
    throw new Error('Error al aprobar verificación');
  }
};

// ✅ Rechazar verificación (Admin)
export const rejectVerification = async (uid: string, reason: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'verifications', uid);

    await updateDoc(docRef, {
      verificationStatus: 'rejected',
      verificationNotes: reason,
      updatedAt: serverTimestamp(),
    });

    // ✅ Notificar al proveedor
    await createNotification(
      uid,
      '❌ Verificación rechazada',
      `Tu solicitud de verificación fue rechazada. Motivo: ${reason}`,
      'system',
      '/dashboard/profile'
    );
  } catch (error) {
    console.error('Error rechazando verificación:', error);
    throw new Error('Error al rechazar verificación');
  }
};

// ✅ Obtener proveedores verificados
export const getVerifiedProviders = async (): Promise<ProviderVerification[]> => {
  try {
    const dbInstance = getDb();
    const verificationsRef = collection(dbInstance, 'verifications');
    const q = query(verificationsRef, where('isVerified', '==', true));

    const snapshot = await getDocs(q);
    const providers: ProviderVerification[] = [];
    snapshot.forEach((doc) => {
      providers.push({ uid: doc.id, ...doc.data() } as ProviderVerification);
    });
    return providers;
  } catch (error) {
    console.error('Error obteniendo proveedores verificados:', error);
    return [];
  }
};

// ✅ Obtener solicitudes pendientes (Admin)
export const getPendingVerifications = async (): Promise<ProviderVerification[]> => {
  try {
    const dbInstance = getDb();
    const verificationsRef = collection(dbInstance, 'verifications');
    const q = query(verificationsRef, where('verificationStatus', '==', 'pending'));

    const snapshot = await getDocs(q);
    const pending: ProviderVerification[] = [];
    snapshot.forEach((doc) => {
      pending.push({ uid: doc.id, ...doc.data() } as ProviderVerification);
    });
    return pending;
  } catch (error) {
    console.error('Error obteniendo solicitudes pendientes:', error);
    return [];
  }
};

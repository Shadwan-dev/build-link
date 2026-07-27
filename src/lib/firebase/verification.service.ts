import { log } from '@/lib/utils/logger';
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

// ✅ Tipo ProviderVerification - CORREGIDO
export interface ProviderVerification {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  identification: string;
  legalName: string;
  address: string;
  specialties: string[];
  experience: number;
  description: string;
  // ✅ Añadir country para saber de qué país es
  country?: string;
  // ✅ Campos de estado
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'not_requested';
  verificationDate?: Date;
  verificationNotes?: string;
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Tipo para la solicitud (sin campos de estado)
export type VerificationRequest = Omit<
  ProviderVerification,
  | 'isVerified'
  | 'verificationStatus'
  | 'createdAt'
  | 'updatedAt'
  | 'verificationDate'
  | 'verificationNotes'
  | 'documents'
>;

// ✅ Solicitar verificación - CORREGIDO
export const requestVerification = async (data: VerificationRequest): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'verifications', data.uid);

    // ✅ Incluir country si viene en los datos
    const verificationData = {
      ...data,
      country: data.country || 'CL',
      isVerified: false,
      verificationStatus: 'pending' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, verificationData);

    // ✅ También actualizar el usuario
    const userRef = doc(dbInstance, 'users', data.uid);
    await updateDoc(userRef, {
      verificationStatus: 'pending',
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

    log.info('✅ Solicitud de verificación enviada para:', data.uid);
  } catch (error) {
    log.error('Error solicitando verificación:', error);
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
    log.error('Error obteniendo verificación:', error);
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

    // ✅ Actualizar el usuario
    const userRef = doc(dbInstance, 'users', uid);
    await updateDoc(userRef, {
      isVerified: true,
      verificationStatus: 'approved',
      verifiedAt: serverTimestamp(),
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
    log.error('Error aprobando verificación:', error);
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

    // ✅ Actualizar usuario
    const userRef = doc(dbInstance, 'users', uid);
    await updateDoc(userRef, {
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
    log.error('Error rechazando verificación:', error);
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
    log.error('Error obteniendo proveedores verificados:', error);
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
    log.error('Error obteniendo solicitudes pendientes:', error);
    return [];
  }
};

// ✅ Verificación automática (sin necesidad de admin) - CORREGIDO
export const autoVerifyProvider = async (uid: string, data: VerificationRequest): Promise<void> => {
  try {
    const dbInstance = getDb();

    // ✅ 1. Crear/Actualizar verificación
    const docRef = doc(dbInstance, 'verifications', uid);
    const verificationData = {
      ...data,
      country: data.country || 'CL',
      isVerified: true, // ✅ Automáticamente verificado
      verificationStatus: 'approved' as const,
      verificationDate: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      verificationNotes: 'Verificación automática - todos los campos completos',
    };

    await setDoc(docRef, verificationData);

    // ✅ 2. Actualizar usuario
    const userRef = doc(dbInstance, 'users', uid);
    await updateDoc(userRef, {
      isVerified: true,
      verificationStatus: 'approved',
      verifiedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // ✅ 3. Actualizar proveedor
    const providerRef = doc(dbInstance, 'providers', uid);
    await updateDoc(providerRef, {
      isVerified: true,
      verificationStatus: 'approved',
      verifiedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // ✅ Asegurar que todos los campos están actualizados
      displayName: data.displayName,
      phone: data.phone,
      specialties: data.specialties,
      experience: data.experience,
      description: data.description,
      identification: data.identification,
      legalName: data.legalName,
      address: data.address,
      country: data.country || 'CL',
    });

    // ✅ 4. Notificar al proveedor
    await createNotification(
      uid,
      '✅ ¡Cuenta verificada automáticamente!',
      'Todos tus datos están completos y tu cuenta ha sido verificada automáticamente. ¡Ya puedes comenzar a recibir solicitudes!',
      'system',
      '/dashboard/profile'
    );

    log.info('✅ Verificación automática completada para:', uid);
  } catch (error) {
    log.error('Error en verificación automática:', error);
    throw new Error('Error al verificar automáticamente');
  }
};

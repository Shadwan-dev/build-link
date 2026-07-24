import { log } from '@/lib/utils/logger';
import { Job, JobApplication } from '@/types/job.types';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  increment,
  orderBy,
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

// ✅ Crear una oferta
export const createJob = async (
  data: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'applications'>
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const jobsRef = collection(dbInstance, 'jobs');
    const docRef = doc(jobsRef);

    const jobData: Job = {
      ...data,
      id: docRef.id,
      views: 0,
      applications: 0,
      status: 'active',
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    await setDoc(docRef, jobData);
    return docRef.id;
  } catch (error) {
    log.error('Error creando oferta:', error);
    throw new Error('Error al crear la oferta');
  }
};

// ✅ Obtener ofertas de un proveedor
export const getProviderJobs = async (providerId: string): Promise<Job[]> => {
  try {
    const dbInstance = getDb();
    const jobsRef = collection(dbInstance, 'jobs');
    const q = query(jobsRef, where('providerId', '==', providerId), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job);
    });
    return jobs;
  } catch (error) {
    log.error('Error obteniendo ofertas:', error);
    return [];
  }
};

// ✅ Obtener ofertas activas (para clientes)
export const getActiveJobs = async (): Promise<Job[]> => {
  try {
    const dbInstance = getDb();
    const jobsRef = collection(dbInstance, 'jobs');
    const q = query(jobsRef, where('status', '==', 'active'), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job);
    });
    return jobs;
  } catch (error) {
    log.error('Error obteniendo ofertas activas:', error);
    return [];
  }
};

// ✅ Obtener ofertas por categoría
export const getJobsByCategory = async (category: string): Promise<Job[]> => {
  try {
    const dbInstance = getDb();
    const jobsRef = collection(dbInstance, 'jobs');
    const q = query(
      jobsRef,
      where('category', '==', category),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job);
    });
    return jobs;
  } catch (error) {
    log.error('Error obteniendo ofertas por categoría:', error);
    return [];
  }
};

// ✅ Obtener una oferta por ID
export const getJobById = async (jobId: string): Promise<Job | null> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'jobs', jobId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      // Incrementar vistas
      await updateDoc(docRef, {
        views: increment(1),
      });
      return { id: snapshot.id, ...snapshot.data() } as Job;
    }
    return null;
  } catch (error) {
    log.error('Error obteniendo oferta:', error);
    return null;
  }
};

// ✅ Actualizar oferta
export const updateJob = async (jobId: string, data: Partial<Job>): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'jobs', jobId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    log.error('Error actualizando oferta:', error);
    throw new Error('Error al actualizar la oferta');
  }
};

// ✅ Eliminar oferta
export const deleteJob = async (jobId: string): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'jobs', jobId);
    await deleteDoc(docRef);
  } catch (error) {
    log.error('Error eliminando oferta:', error);
    throw new Error('Error al eliminar la oferta');
  }
};

// ✅ Aplicar a una oferta (cliente)
export const applyToJob = async (
  jobId: string,
  clientId: string,
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  message: string,
  budget?: number,
  timeline?: string
): Promise<string> => {
  try {
    const dbInstance = getDb();
    const applicationsRef = collection(dbInstance, 'jobApplications');
    const docRef = doc(applicationsRef);

    // Obtener la oferta para saber el proveedor
    const job = await getJobById(jobId);
    if (!job) throw new Error('Oferta no encontrada');

    const applicationData: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'> = {
      jobId,
      clientId,
      clientName,
      clientEmail,
      clientPhone,
      message,
      budget,
      timeline,
      status: 'pending',
    };

    await setDoc(docRef, {
      ...applicationData,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // ✅ Incrementar aplicaciones en la oferta
    const jobRef = doc(dbInstance, 'jobs', jobId);
    await updateDoc(jobRef, {
      applications: increment(1),
    });

    // ✅ Notificar al proveedor
    await createNotification(
      job.providerId,
      '📩 Nueva solicitud para tu oferta',
      `${clientName} ha solicitado tu oferta: ${job.title}`,
      'request',
      `/dashboard/jobs/${jobId}/applications`
    );

    return docRef.id;
  } catch (error) {
    log.error('Error aplicando a oferta:', error);
    throw new Error('Error al aplicar a la oferta');
  }
};

// ✅ Obtener aplicaciones de una oferta
export const getJobApplications = async (jobId: string): Promise<JobApplication[]> => {
  try {
    const dbInstance = getDb();
    const applicationsRef = collection(dbInstance, 'jobApplications');
    const q = query(applicationsRef, where('jobId', '==', jobId), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const applications: JobApplication[] = [];
    snapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() } as JobApplication);
    });
    return applications;
  } catch (error) {
    log.error('Error obteniendo aplicaciones:', error);
    return [];
  }
};

// ✅ Actualizar estado de aplicación
export const updateApplicationStatus = async (
  applicationId: string,
  status: JobApplication['status']
): Promise<void> => {
  try {
    const dbInstance = getDb();
    const docRef = doc(dbInstance, 'jobApplications', applicationId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    log.error('Error actualizando aplicación:', error);
    throw new Error('Error al actualizar la aplicación');
  }
};

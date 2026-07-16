import { Firestore, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './config';

const getDb = (): Firestore => {
  if (!db) throw new Error('Firestore no está disponible');
  return db;
};

export interface ProviderStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  completedJobs: number;
  averageRating: number;
  totalReviews: number;
  estimatedEarnings: number;
  responseRate: number;
}

export interface CategoryStats {
  category: string;
  count: number;
  applications: number;
}

export interface MonthlyStats {
  month: string;
  jobs: number;
  applications: number;
  completed: number;
}

// ✅ Obtener estadísticas del proveedor
export const getProviderStats = async (providerId: string): Promise<ProviderStats> => {
  try {
    const dbInstance = getDb();

    const jobsRef = collection(dbInstance, 'jobs');
    const jobsQuery = query(jobsRef, where('providerId', '==', providerId));
    const jobsSnapshot = await getDocs(jobsQuery);
    const jobs = jobsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const applicationsRef = collection(dbInstance, 'jobApplications');
    const appsQuery = query(applicationsRef);
    const appsSnapshot = await getDocs(appsQuery);
    const applications = appsSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((app: any) => {
        const job = jobs.find((j) => j.id === app.jobId);
        return job !== undefined;
      });

    const ratingsRef = collection(dbInstance, 'ratings');
    const ratingsQuery = query(ratingsRef, where('providerId', '==', providerId));
    const ratingsSnapshot = await getDocs(ratingsQuery);
    const ratings = ratingsSnapshot.docs.map((doc) => doc.data());

    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j: any) => j.status === 'active').length;
    const completedJobs = jobs.filter((j: any) => j.status === 'completed').length;
    const totalApplications = applications.length;
    const completedApplications = applications.filter((a: any) => a.status === 'completed').length;

    const totalReviews = ratings.length;
    const averageRating =
      totalReviews > 0
        ? ratings.reduce((acc: number, r: any) => acc + (r.rating || 0), 0) / totalReviews
        : 0;

    const estimatedEarnings = jobs
      .filter((j: any) => j.status === 'completed')
      .reduce((acc: number, j: any) => acc + (j.budget || 0), 0);

    const responseRate =
      totalApplications > 0 ? Math.round((completedApplications / totalApplications) * 100) : 0;

    return {
      totalJobs,
      activeJobs,
      totalApplications,
      completedJobs,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      estimatedEarnings,
      responseRate,
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return {
      totalJobs: 0,
      activeJobs: 0,
      totalApplications: 0,
      completedJobs: 0,
      averageRating: 0,
      totalReviews: 0,
      estimatedEarnings: 0,
      responseRate: 0,
    };
  }
};

// ✅ Obtener estadísticas por categoría
export const getCategoryStats = async (providerId: string): Promise<CategoryStats[]> => {
  try {
    const dbInstance = getDb();
    const jobsRef = collection(dbInstance, 'jobs');
    const q = query(jobsRef, where('providerId', '==', providerId));
    const snapshot = await getDocs(q);
    const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const categoryMap = new Map<string, { count: number; applications: number }>();

    for (const job of jobs) {
      const jobData = job as any;
      const category = jobData.category || 'Sin categoría';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { count: 0, applications: 0 });
      }
      const stats = categoryMap.get(category)!;
      stats.count += 1;
      stats.applications += jobData.applications || 0;
    }

    return Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      count: stats.count,
      applications: stats.applications,
    }));
  } catch (error) {
    console.error('Error obteniendo estadísticas por categoría:', error);
    return [];
  }
};

// ✅ Obtener estadísticas mensuales
export const getMonthlyStats = async (providerId: string): Promise<MonthlyStats[]> => {
  try {
    const dbInstance = getDb();
    const jobsRef = collection(dbInstance, 'jobs');
    const q = query(jobsRef, where('providerId', '==', providerId), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    const now = new Date();
    const monthStats: MonthlyStats[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = months[date.getMonth()];

      const monthJobs = jobs.filter((j: any) => {
        if (!j.createdAt) return false;
        const jobDate = new Date(j.createdAt.seconds * 1000);
        return (
          jobDate.getMonth() === date.getMonth() && jobDate.getFullYear() === date.getFullYear()
        );
      });

      monthStats.push({
        month: `${monthName} ${date.getFullYear()}`,
        jobs: monthJobs.length,
        applications: monthJobs.reduce((acc: number, j: any) => acc + (j.applications || 0), 0),
        completed: monthJobs.filter((j: any) => j.status === 'completed').length,
      });
    }

    return monthStats;
  } catch (error) {
    console.error('Error obteniendo estadísticas mensuales:', error);
    return [];
  }
};

// ✅ Obtener actividad reciente
export const getRecentActivity = async (
  providerId: string,
  limitCount: number = 10
): Promise<any[]> => {
  try {
    const dbInstance = getDb();
    const activities: any[] = [];

    const applicationsRef = collection(dbInstance, 'jobApplications');
    const appsQuery = query(applicationsRef, orderBy('createdAt', 'desc'));
    const appsSnapshot = await getDocs(appsQuery);

    const jobsRef = collection(dbInstance, 'jobs');
    const jobsQuery = query(jobsRef, where('providerId', '==', providerId));
    const jobsSnapshot = await getDocs(jobsQuery);
    const jobIds = jobsSnapshot.docs.map((doc) => doc.id);

    // ✅ Mapear correctamente los datos de las aplicaciones
    const recentApps: any[] = [];
    appsSnapshot.forEach((doc) => {
      const data = doc.data();
      // ✅ Verificar que el documento tenga jobId y que exista en jobIds
      if (data.jobId && jobIds.includes(data.jobId)) {
        recentApps.push({
          id: doc.id,
          ...data,
        });
      }
    });

    // ✅ Ordenar por fecha y limitar
    recentApps.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    const limitedApps = recentApps.slice(0, limitCount);

    for (const app of limitedApps) {
      const job = jobsSnapshot.docs.find((doc) => doc.id === app.jobId);
      const jobData = job?.data() as any;
      activities.push({
        id: app.id,
        type: 'application',
        title: `Nueva solicitud para "${jobData?.title || 'tu oferta'}"`,
        description: `${app.clientName || 'Un cliente'} ha solicitado tus servicios`,
        time: app.createdAt,
        status: app.status || 'pendiente',
        link: `/dashboard/jobs/${app.jobId}/applications`,
      });
    }

    return activities;
  } catch (error) {
    console.error('Error obteniendo actividad reciente:', error);
    return [];
  }
};

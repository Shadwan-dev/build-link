// app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    // Obtener conteos de todas las colecciones
    const testimonialsQuery = query(
      collection(db, 'testimonials'),
      where('approved', '==', true),
      where('active', '==', true)
    );

    const productsQuery = query(
      collection(db, 'products'),
      where('active', '==', true)
    );

    const contactsQuery = query(
      collection(db, 'contacts'),
      where('status', '!=', 'spam')
    );

    const [testimonialsSnapshot, productsSnapshot, contactsSnapshot] =
      await Promise.all([
        getCountFromServer(testimonialsQuery),
        getCountFromServer(productsQuery),
        getCountFromServer(contactsQuery),
      ]);

    const testimonialsCount = testimonialsSnapshot.data().count;
    const productsCount = productsSnapshot.data().count;
    const contactsCount = contactsSnapshot.data().count;

    const currentYear = new Date().getFullYear();
    const foundationYear = 2022;

    const stats = {
      testimonials: testimonialsCount,
      products: productsCount,
      contacts: contactsCount,
      happyClients: testimonialsCount > 50 ? 500 : testimonialsCount * 10, // Estimación escalada
      yearsActive: currentYear - foundationYear,
      businessLines: 5, // Fijo para AKΠ
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      stats,
      message: 'Estadísticas cargadas correctamente',
    });
  } catch (error: any) {
    console.error('Error obteniendo estadísticas:', error);

    // Datos de fallback
    const currentYear = new Date().getFullYear();
    const fallbackStats = {
      testimonials: 50,
      products: 25,
      contacts: 100,
      happyClients: 500,
      yearsActive: currentYear - 2022,
      businessLines: 5,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: false,
        stats: fallbackStats,
        error: 'Error al obtener estadísticas, usando datos de respaldo',
        details: error.message,
      },
      { status: 200 }
    ); // 200 para que el frontend siempre reciba datos
  }
}

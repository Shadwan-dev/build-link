// app/api/footer/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection, getCountFromServer, query } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    // Obtener estadísticas específicas para el footer
    const contactsQuery = query(collection(db, 'contacts'));
    const productsQuery = query(
      collection(db, 'products'),
      where('active', '==', true)
    );
    const testimonialsQuery = query(
      collection(db, 'testimonials'),
      where('approved', '==', true)
    );
    const servicesQuery = query(
      collection(db, 'services'),
      where('active', '==', true)
    );

    const [
      contactsSnapshot,
      productsSnapshot,
      testimonialsSnapshot,
      servicesSnapshot,
    ] = await Promise.all([
      getCountFromServer(contactsQuery),
      getCountFromServer(productsQuery),
      getCountFromServer(testimonialsQuery),
      getCountFromServer(servicesQuery),
    ]);

    const stats = {
      contacts: contactsSnapshot.data().count,
      products: productsSnapshot.data().count,
      testimonials: testimonialsSnapshot.data().count,
      services: servicesSnapshot.data().count,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      stats,
      message: 'Estadísticas del footer cargadas',
    });
  } catch (error) {
    console.error('Error cargando estadísticas del footer:', error);

    // Datos de fallback
    const fallbackStats = {
      contacts: 100,
      products: 25,
      testimonials: 50,
      services: 5,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: false,
        stats: fallbackStats,
        error: 'Error cargando estadísticas',
      },
      { status: 200 }
    );
  }
}

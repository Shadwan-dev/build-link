// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '12');

    let servicesQuery;
    const servicesRef = collection(db, 'services');

    if (category) {
      servicesQuery = query(
        servicesRef,
        where('category', '==', category),
        where('active', '==', true),
        orderBy('order', 'asc'),
        orderBy('createdAt', 'desc')
      );
    } else {
      servicesQuery = query(
        servicesRef,
        where('active', '==', true),
        orderBy('order', 'asc'),
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(servicesQuery);
    const services = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        description: data.description || '',
        items: data.items || [],
        icon: data.icon || '',
        active: data.active !== undefined ? data.active : true,
        order: data.order || 0,
        category: data.category || '',
        colorScheme: data.colorScheme || 'blue',
        createdAt: data.createdAt
          ? data.createdAt.toDate
            ? data.createdAt.toDate().toISOString()
            : data.createdAt
          : new Date().toISOString(),
        updatedAt: data.updatedAt
          ? data.updatedAt.toDate
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt
          : new Date().toISOString(),
      };
    });

    // Limitar resultados
    const limitedServices = services.slice(0, limit);

    return NextResponse.json({
      success: true,
      services: limitedServices,
      count: limitedServices.length,
      total: services.length,
    });
  } catch (error: any) {
    console.error('Error obteniendo servicios:', error);

    // Datos de fallback
    const fallbackServices = [
      {
        id: 'alimentos',
        name: 'Alimentos Baracoenses',
        description:
          'Productos alimenticios naturales y tradicionales de Baracoa.',
        items: [
          'Aceite de coco virgen',
          'Derivados del cacao',
          'Harinas tradicionales',
          'Conservas naturales',
        ],
        icon: '🍎',
        active: true,
        order: 1,
        category: 'alimentos',
        colorScheme: 'blue',
      },
      {
        id: 'aceites',
        name: 'Aceites y Derivados',
        description:
          'Aceites naturales extraídos mediante procesos tradicionales.',
        items: [
          'Aceite de coco virgen extra',
          'Aceite de coco refinado',
          'Manteca de coco',
        ],
        icon: '🥥',
        active: true,
        order: 2,
        category: 'aceites',
        colorScheme: 'emerald',
      },
      // ... más servicios de fallback
    ];

    return NextResponse.json(
      {
        success: false,
        services: fallbackServices,
        count: fallbackServices.length,
        error: 'Error al obtener servicios, usando datos de respaldo',
        details: error.message,
      },
      { status: 200 }
    );
  }
}

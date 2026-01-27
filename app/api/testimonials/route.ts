// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    console.log('=== API Testimonials llamada ===');

    // Verificar que db esté inicializado
    if (!db) {
      console.error('Firestore no está inicializado');
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const testimonialsRef = collection(db, 'testimonials');
    console.log('Colección testimonialsRef:', testimonialsRef);

    const testimonialsQuery = query(
      testimonialsRef,
      where('approved', '==', true),
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );

    console.log('Ejecutando query...');
    const snapshot = await getDocs(testimonialsQuery);
    console.log('Snapshot obtenido:', snapshot.size, 'documentos');

    const testimonials = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        company: data.company || '',
        position: data.position || '',
        message: data.message || '',
        rating: data.rating || 5,
        approved: data.approved || false,
        active: data.active !== undefined ? data.active : true,
        createdAt: data.createdAt
          ? data.createdAt.toDate
            ? data.createdAt.toDate().toISOString()
            : data.createdAt
          : new Date().toISOString(),
        location: data.location || '',
        product: data.product || '',
        image: data.image || '👤',
      };
    });

    console.log('Testimonios procesados:', testimonials.length);

    return NextResponse.json({
      success: true,
      testimonials,
      count: testimonials.length,
    });
  } catch (error: any) {
    console.error('=== ERROR DETALLADO en testimonials API ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);

    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener testimonios',
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}

// POST para enviar nuevos testimonios
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validación básica
    if (!data.name || !data.company || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    const { addDoc, collection, serverTimestamp } =
      await import('firebase/firestore');

    const testimonialRef = await addDoc(collection(db, 'testimonials'), {
      name: data.name,
      company: data.company,
      position: data.position || '',
      message: data.message,
      rating: data.rating || 5,
      approved: false, // Requiere aprobación manual
      active: true,
      createdAt: serverTimestamp(),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonio enviado para aprobación',
      id: testimonialRef.id,
    });
  } catch (error) {
    console.error('Error enviando testimonio:', error);
    return NextResponse.json(
      { success: false, error: 'Error al enviar testimonio' },
      { status: 500 }
    );
  }
}

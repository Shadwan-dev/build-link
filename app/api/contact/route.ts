// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar datos requeridos
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }

    // Guardar en Firestore
    const contactRef = await addDoc(collection(db, 'contacts'), {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      interest: data.interest || '',
      productType: data.productType || '',
      message: data.message,
      budget: data.budget || '',
      status: 'pending',
      createdAt: serverTimestamp(),
      source: 'website',
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      message: 'Consulta enviada correctamente',
      id: contactRef.id,
    });
  } catch (error) {
    console.error('Error en contacto:', error);
    return NextResponse.json(
      { success: false, error: 'Error al procesar la consulta' },
      { status: 500 }
    );
  }
}

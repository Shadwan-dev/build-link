import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/src/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, fullName, company, phone, role = 'user' } = body;

    if (!uid || !email || !fullName) {
      return NextResponse.json(
        { error: 'Datos requeridos: uid, email, fullName' },
        { status: 400 }
      );
    }

    // Verificar que el usuario existe en Firebase Auth
    const firebaseUser = await auth.getUser(uid);

    if (firebaseUser.email !== email) {
      return NextResponse.json(
        { error: 'Email no coincide con el usuario' },
        { status: 400 }
      );
    }

    // Crear documento del usuario en Firestore
    const userRef = db.collection('users').doc(uid);

    const userData = {
      uid,
      email,
      fullName,
      company: company || '',
      phone: phone || '',
      role,
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await userRef.set(userData, { merge: true });

    // Crear también un documento en la colección pública
    const publicUserRef = db.collection('public_users').doc(uid);
    await publicUserRef.set(
      {
        uid,
        fullName,
        company: company || '',
        role,
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: userData,
    });
  } catch (error: any) {
    console.error('Error en registro de usuario:', error);

    if (error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'Usuario no encontrado en Firebase Auth' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

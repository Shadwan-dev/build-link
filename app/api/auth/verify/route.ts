import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/src/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid } = body;

    if (!uid) {
      return NextResponse.json({ error: 'UID requerido' }, { status: 400 });
    }

    // Obtener el usuario
    const user = await auth.getUser(uid);

    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: 'Email ya está verificado',
        verified: true,
      });
    }

    // Aquí podrías implementar lógica para reenviar verificación
    // Nota: Firebase Admin no tiene método directo para reenviar verificación
    // Esto se hace desde el cliente con sendEmailVerification

    return NextResponse.json({
      success: true,
      message: 'Usuario encontrado, use sendEmailVerification desde el cliente',
      verified: false,
      user: {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error: any) {
    console.error('Error verificando usuario:', error);

    if (error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

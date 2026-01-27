import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/src/lib/firebase-admin';

// Configurar tiempo de expiración de cookies (1 semana)
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días en segundos

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, user } = body;

    if (!token || !user) {
      return NextResponse.json(
        { error: 'Token y usuario requeridos' },
        { status: 400 }
      );
    }

    // Verificar el token con Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);

    // Verificar que el usuario coincida con el token
    if (decodedToken.uid !== user.uid) {
      return NextResponse.json(
        { error: 'Token no coincide con usuario' },
        { status: 401 }
      );
    }

    // Crear la cookie de sesión
    const sessionCookie = await auth.createSessionCookie(token, {
      expiresIn: SESSION_MAX_AGE * 1000, // milisegundos
    });

    // Configurar la cookie en la respuesta
    const response = NextResponse.json(
      {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      },
      { status: 200 }
    );

    // Establecer la cookie de sesión
    response.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });

    // Cookie adicional para información básica del usuario (solo para UI)
    response.cookies.set({
      name: 'user_info',
      value: JSON.stringify({
        email: user.email,
        emailVerified: user.emailVerified,
      }),
      maxAge: SESSION_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Error en sesión:', error);

    // Errores específicos de Firebase
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json({ error: 'Token expirado' }, { status: 401 });
    }

    if (error.code === 'auth/invalid-id-token') {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // Verificar la cookie de sesión
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Obtener información del usuario
    const user = await auth.getUser(decodedClaims.uid);

    return NextResponse.json({
      authenticated: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isAdmin: user.email === process.env.ADMIN_EMAIL,
      },
    });
  } catch (error) {
    console.error('Error verificando sesión:', error);

    // Si la cookie es inválida, limpiarla
    const response = NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );

    response.cookies.delete('session');
    response.cookies.delete('user_info');

    return response;
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Sesión cerrada' },
      { status: 200 }
    );

    // Eliminar cookies de sesión
    response.cookies.delete('session');
    response.cookies.delete('user_info');

    return response;
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}

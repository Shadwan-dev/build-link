import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Sesión cerrada exitosamente' },
      { status: 200 }
    );

    // Eliminar todas las cookies de sesión
    const cookies = ['session', 'user_info', 'firebase_token', 'auth_token'];

    cookies.forEach((cookie) => {
      response.cookies.delete(cookie);
    });

    return response;
  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}

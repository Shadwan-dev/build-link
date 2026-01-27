// middleware.ts (en la raíz del proyecto)
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/src/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`[Middleware] Ruta solicitada: ${pathname}`);

  // ===== RUTAS PÚBLICAS (sin protección) =====
  // Estas rutas siempre son accesibles
  const publicPaths = [
    '/', // Home
    '/auth/login', // Login (protegida por lógica especial)
    '/auth/register', // Registro (protegida por lógica especial)
    '/api/auth/login', // API login
    '/api/auth/register', // API registro
    '/api/auth/session', // API sesión
    '/api/auth/logout', // API logout
  ];

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  // Permitir acceso a archivos estáticos y rutas de API públicas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.includes('.') || // Archivos con extensión
    isPublicPath
  ) {
    return NextResponse.next();
  }

  // ===== VERIFICAR SESIÓN =====
  const sessionCookie = request.cookies.get('session')?.value;

  // ===== RUTAS PROTEGIDAS (requieren autenticación) =====
  const protectedPaths = ['/admin', '/dashboard', '/profile'];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!sessionCookie) {
      console.log('[Middleware] Sin sesión, redirigiendo a login');
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verificar la cookie de sesión
      await auth.verifySessionCookie(sessionCookie, true);
      console.log('[Middleware] Sesión válida, permitiendo acceso');
      return NextResponse.next();
    } catch (error) {
      console.error('[Middleware] Sesión inválida:', error);

      // Limpiar cookies inválidas
      const response = NextResponse.redirect(
        new URL('/auth/login', request.url)
      );
      response.cookies.delete('session');
      response.cookies.delete('user_info');
      return response;
    }
  }

  // ===== RUTAS DE AUTENTICACIÓN (no accesibles si ya estás logueado) =====
  const authPaths = ['/auth/login', '/auth/register'];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthPath && sessionCookie) {
    try {
      await auth.verifySessionCookie(sessionCookie, true);
      console.log('[Middleware] Ya autenticado, redirigiendo a dashboard');
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch {
      // Sesión inválida, permitir acceso a auth
      return NextResponse.next();
    }
  }

  // ===== RUTAS DE API PROTEGIDAS =====
  if (pathname.startsWith('/api/')) {
    const publicApiPaths = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/session',
      '/api/auth/logout',
      '/api/public', // Si tienes APIs públicas
    ];

    const isPublicApi = publicApiPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (!isPublicApi && !sessionCookie) {
      console.log('[Middleware] API protegida sin sesión');
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!isPublicApi && sessionCookie) {
      try {
        await auth.verifySessionCookie(sessionCookie, true);
        return NextResponse.next();
      } catch (error) {
        console.error('[Middleware] API con sesión inválida');
        return NextResponse.json({ error: 'Sesión expirada' }, { status: 401 });
      }
    }
  }

  // ===== POR DEFECTO: PERMITIR ACCESO =====
  // Las rutas que no coincidan con ninguna regla serán accesibles
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes - manejado en el middleware)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const roles = req.cookies.get("user_roles")?.value || "";
 
  const { pathname } = req.nextUrl;

  // Si no hay token y no estamos en /auth, redirigimos
  if (!token && pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Si hay token o estamos en /auth, dejamos pasar
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/otra-ruta-protegida/:path*'], // define rutas que quieras proteger
}

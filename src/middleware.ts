import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const roles = req.cookies.get("user_roles")?.value || "";

  const { pathname } = req.nextUrl;

  // Si no esta logueado y no va a /auth, lo mandamos al login
  if (!token && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Si entra a "/" y tiene token -> lo mando a /home
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Si entra a "/" sin token -> lo mando a /auth
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Proteccion por roles
  if (pathname.startsWith("/admin")) {
    if (!roles.includes("admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/reviewer")) {
    if (!roles.includes("reviewer")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/reviewer/:path*', '/home/:path*'],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const roles = req.cookies.get("user_roles")?.value || "";

  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname.startsWith("/admin/")) {
    if (!token || !roles.includes("admin")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  if (pathname.startsWith("/home")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',              
    '/admin/:path*',  
    '/home/:path*'    
  ],
}

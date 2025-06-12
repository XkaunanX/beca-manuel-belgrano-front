import { NextResponse } from 'next/server' // TODO Acomodar rutas 
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('laravel_session')

  if (request.nextUrl.pathname.startsWith('/home') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
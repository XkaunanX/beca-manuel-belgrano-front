import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value || ''
  const userRolesValue = request.cookies.get('user_roles')?.value || ''
  const userRoles = userRolesValue.split(',')

  const { pathname } = request.nextUrl

  if (pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/', request.url))
  }

  if (pathname.startsWith('/dashboard')) {
    if (!userRoles.includes('admin') && !userRoles.includes('auditor')) {
      return NextResponse.redirect(new URL('/no-autorizado', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!auth).*)', // Aplica a todas las rutas excepto /auth
  ],
}

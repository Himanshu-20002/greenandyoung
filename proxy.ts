import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Stateless in-memory rate limiter per Edge container instance
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API Abuse Protection / Rate Limiter
  if (pathname === '/api/bookings' && request.method === 'POST') {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || (request as any).ip || '127.0.0.1';
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const limit = 5; // Max 5 bookings per minute per IP

    const record = rateLimitMap.get(ip);
    if (!record) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      record.count += 1;
      if (record.count > limit) {
        return NextResponse.json({ error: 'Too many booking requests. Please wait a moment.' }, { status: 429 });
      }
    }
  }

  // Protect Admin Console Routes
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('better-auth.session_token') || request.cookies.get('__secure-better-auth.session_token');
    // In production, enforce authentication checks
    if (!sessionToken && process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/bookings'],
};


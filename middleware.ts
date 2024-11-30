import { NextResponse } from 'next/server';
import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/explore(.*)',
  '/create(.*)',
  '/chat(.*)',
  '/chat/[chatUid]/(.*)',
  '/profile(.*)',
  '/dashboard(.*)',
  '/api(.*)',
  '/account(.*)'
]);

// Extend the clerk middleware to include SEO headers
export default clerkMiddleware((auth, req) => {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Add language detection and content negotiation headers
  response.headers.set('Vary', 'Accept-Language');
  response.headers.set('Content-Language', req.nextUrl.locale || 'en');

  // Check authentication for protected routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  return response;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
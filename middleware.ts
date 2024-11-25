import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
 
const  isProtectedRoute = createRouteMatcher([
  '/explore(.*)',
  '/create(.*)',
  '/chat(.*)',
  '/chat/[chatUid]/(.*)',
  '/profile(.*)',
  '/dashboard(.*)',
  '/api(.*)',
  '/account(.*)'
]);
 
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
 
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
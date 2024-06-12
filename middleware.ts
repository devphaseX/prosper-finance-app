import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const routeProtected = createRouteMatcher(['/']);

export const runtimes = 'nodejs';

export default clerkMiddleware((auth, req) => {
  if (routeProtected(req)) {
    auth().protect();
    return;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

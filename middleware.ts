import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const routeProtected = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  console.log({ a: routeProtected(req) });
  if (routeProtected(req)) {
    auth().protect();
    return;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

import { getAuth } from '@hono/clerk-auth';
import { createMiddleware } from 'hono/factory';
import httpStatus from 'http-status';

export const protectAuth = createMiddleware(async (c, next) => {
  const auth = await getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
  }

  return next();
});

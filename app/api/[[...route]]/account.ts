import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import httpStatus from 'http-status';
import { db } from '@/lib/db/init';
import { accounts, insertAccountSchema } from '@/lib/db/schema';
import { and, arrayContains, eq, inArray, sql } from 'drizzle-orm';
import { z } from 'zod';

const app = new Hono()
  .use(clerkMiddleware())
  .get('/', async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
    }

    const registeredAccounts = await db
      .select({ id: accounts.id, name: accounts.name })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({ data: registeredAccounts });
  })
  .post(
    '/',
    zValidator('json', insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      console.log({ auth });

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
      }

      const form = c.req.valid('json');

      const [newAccount] = await db
        .insert(accounts)
        .values({ ...form, userId: auth.userId })
        .returning();

      return c.json({ data: newAccount });
    }
  )
  .post(
    '/bulk-delete',
    clerkMiddleware(),
    zValidator('json', z.object({ ids: z.string().array() })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthenicated' }, httpStatus.UNAUTHORIZED);
      }

      const deletedAccounts = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        });

      if (!deletedAccounts.length) {
        return c.json({ error: 'ids not found' }, httpStatus.CONFLICT);
      }

      return c.json({ data: deletedAccounts });
    }
  );

export default app;

import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import httpStatus from 'http-status';
import { db } from '@/lib/db/init';
import { categories, insertCategorySchema } from '@/lib/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';
import { withIdSchema } from '@/lib/schema/query';

const categoriesRoute = new Hono()
  .use(clerkMiddleware())
  .get('/', async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
    }

    const retrivedCategories = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .where(eq(categories.userId, auth.userId));

    return c.json({ data: retrivedCategories });
  })
  .get('/:id', zValidator('param', withIdSchema), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
    }

    const { id } = c.req.valid('param');

    const [requestCategory] = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)));

    return c.json({
      data: requestCategory,
    });
  })
  .patch(
    '/:id',
    zValidator('param', withIdSchema),
    zValidator('json', insertCategorySchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
      }

      const [updatedCategory] = await db
        .update(categories)
        .set(values)
        .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))
        .returning();

      if (!updatedCategory) {
        return c.json({ error: 'Not found' }, httpStatus.NOT_FOUND);
      }

      return c.json({ data: updatedCategory });
    }
  )
  .delete('/:id', zValidator('param', withIdSchema), async (c) => {
    const auth = getAuth(c);
    const { id } = c.req.valid('param');

    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
    }

    const [updatedCategory] = await db
      .delete(categories)
      .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))
      .returning({
        id: categories.id,
      });

    if (!updatedCategory) {
      return c.json({ error: 'Not found' }, httpStatus.NOT_FOUND);
    }

    return c.json({ data: updatedCategory });
  })
  .post(
    '/',
    zValidator('json', insertCategorySchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, httpStatus.UNAUTHORIZED);
      }

      const form = c.req.valid('json');

      const [newCategory] = await db
        .insert(categories)
        .values({ ...form, userId: auth.userId })
        .returning();

      return c.json({ data: newCategory });
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

      const deletedCategories = await db
        .delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            inArray(categories.id, values.ids)
          )
        )
        .returning({
          id: categories.id,
        });

      if (!deletedCategories.length) {
        return c.json({ error: 'ids not found' }, httpStatus.CONFLICT);
      }

      return c.json({ data: deletedCategories });
    }
  );

export default categoriesRoute;

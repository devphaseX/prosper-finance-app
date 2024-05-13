import { db } from '@/lib/db/init';
import { accounts } from '@/lib/db/schema';
import { Hono } from 'hono';

const app = new Hono().get('/', async (c) => {
  const registeredAccounts = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts);
  return c.json({ data: registeredAccounts });
});

export default app;

import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import accountRoute from './account';

export const runtime = 'edge';

const app = new Hono()
  .basePath('/api')
  .get('/hello', (c) => {
    return c.json({
      message: 'Hello Next.js!',
    });
  })
  .route('/accounts', accountRoute);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;

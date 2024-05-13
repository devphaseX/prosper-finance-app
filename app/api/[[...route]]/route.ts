import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import accountRoute from './account';
import { HTTPException } from 'hono/http-exception';
import httpStatus from 'http-status';

export const runtime = 'edge';

const app = new Hono()
  .basePath('/api')
  .get('/hello', (c) => {
    return c.json({
      message: 'Hello Next.js!',
    });
  })
  .route('/accounts', accountRoute);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: 'Internal err' }, httpStatus.INTERNAL_SERVER_ERROR);
});

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;

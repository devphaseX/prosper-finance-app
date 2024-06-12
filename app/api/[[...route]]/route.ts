import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import accountRoute from './account';
import categoriesRoute from './categories';
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
  .route('/accounts', accountRoute)
  .route('/categories', categoriesRoute);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.log({ err });

  return c.json({ error: 'Internal err' }, httpStatus.INTERNAL_SERVER_ERROR);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;

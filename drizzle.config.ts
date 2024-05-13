import { defineConfig } from 'drizzle-kit';
import './lib/load-env';
import { env } from './lib/env';

const config = defineConfig({
  schema: './lib/db/schema.ts',
  out: '.lib/db/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});

export default config;

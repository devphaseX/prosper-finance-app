import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '../env';
import * as schema from './schema';

const client = neon(env.DATABASE_URL);

const db = drizzle(client, { schema });

export { db };

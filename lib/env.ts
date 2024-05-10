import { TypeOf, z } from 'zod';

const envSchema = z.object({});

const env = envSchema.parse(process.env);

type Env = TypeOf<typeof envSchema>;

export { env, type Env };

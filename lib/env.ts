import { TypeOf, z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(32),
  CLERK_SECRET_KEY: z.string().min(32),
  CLERK_PUBLISHABLE_KEY: z.string().min(32),
});

const env = envSchema.parse(process.env);

type Env = TypeOf<typeof envSchema>;

export { env, type Env };

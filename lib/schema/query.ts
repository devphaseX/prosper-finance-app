import { z } from 'zod';

const withIdSchema = z.object({
  id: z.string(),
});

export const getAccountByIdQuerySchema = withIdSchema;

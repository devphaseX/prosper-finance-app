import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';

const withTimestamps = {
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
};

export const accounts = pgTable('accounts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  plaidId: text('plaid_id'),
  name: varchar('name', { length: 50 }).notNull(),
  userId: text('user_id').notNull(),
  ...withTimestamps,
});

export const insertAccountSchema = createInsertSchema(accounts, {
  name: z.string().max(50),
});

export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  plaidId: text('plaid_id'),
  name: varchar('name', { length: 50 }).notNull(),
  userId: text('user_id').notNull(),
  ...withTimestamps,
});

export const insertCategorySchema = createInsertSchema(categories, {
  name: z.string().max(50),
});

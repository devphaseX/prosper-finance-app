import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: varchar('name', { length: 50 }).notNull(),
  userId: text('user_id').notNull(),
});

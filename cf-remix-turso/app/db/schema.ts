import { sql } from "drizzle-orm";
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique(),
  name: text('name').notNull(),
  customerId: text('customerId').unique(),
  createdAt: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
});

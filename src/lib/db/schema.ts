import { pgTable, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: numeric('id').primaryKey(), 
  username: text('username').notNull(),
  email: text('email').notNull(),
  googleId: integer('googleId').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export const sessionTable = pgTable('sessions', {
  id: text('id').primaryKey(), 
  userId: numeric('userId').notNull().references(() => userTable.id),
  expiresAt: timestamp('expiresAt', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
});






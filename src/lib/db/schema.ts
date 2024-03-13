import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: varchar('id', { length: 15 }).primaryKey(), 
  username: text('username').notNull(),
  email: text('email').notNull(),
  googleId: varchar('googleId', { length: 21 }).notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export const sessionTable = pgTable('sessions', {
  id: text('id').primaryKey(), 
  userId: varchar('userId').notNull().references(() => userTable.id),
  expiresAt: timestamp('expiresAt', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
});






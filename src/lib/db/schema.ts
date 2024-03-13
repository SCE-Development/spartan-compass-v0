import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

// user table for authentication using google oauth
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  googleId: text('googleId').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

// session table for storing user sessions
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('userId').notNull().references(()=>users.id),
  expiresAt: timestamp('expiresAt', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
});




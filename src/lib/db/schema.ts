import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// user table for authentication using google oauth
export const userTable = pgTable('users', {
  id: text('id').primaryKey(), // lucia wants it to be string type??
  username: text('username').notNull(),
  email: text('email').notNull(),
  googleId: text('googleId').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

// session table for storing user sessions
export const sessionTable = pgTable('sessions', {
  id: text('id').primaryKey(), // lucia wants it to be string type??
  userId: text('userId').notNull().references(()=>userTable.id),
  expiresAt: timestamp('expiresAt', {
    withTimezone: true,
    mode: 'date'
  }).notNull(),
});




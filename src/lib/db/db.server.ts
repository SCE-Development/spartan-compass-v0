import { config } from 'dotenv';
config();

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error('No url');
}

const client = postgres(DATABASE_URL);
export const db = drizzle(client);

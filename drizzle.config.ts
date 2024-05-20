import { config } from 'dotenv';
config();

import type { Config } from 'drizzle-kit';
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error('No url');
}
export default {
	schema: './src/lib/db/schema.ts',
	dialect: 'postgresql',
	out: './src/lib/db/migrations',
	migration: {
		table: 'migrations',
		schema: 'public'
	},
	dbCredentials: {
		url: DATABASE_URL
	}
} as Config;

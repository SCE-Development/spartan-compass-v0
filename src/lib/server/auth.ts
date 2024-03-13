import { Lucia } from 'lucia';
import { Google } from 'arctic';
import { dev } from '$app/environment';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

import { db } from '$lib/db/db.server';
import { userTable, sessionTable } from '$lib/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			google_id: attributes.googleId
		};
	}
});

export const googleAuth = new Google(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	googleId: number;
	username: string;
}

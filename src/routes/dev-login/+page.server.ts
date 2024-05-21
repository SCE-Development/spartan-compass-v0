import { db } from '$lib/db/db.server.js';
import { userTable } from '$lib/db/schema.js';
import { lucia } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const formUsername = String(formData.get('username'));
		const formEmail = String(formData.get('email'));
		console.log(formUsername);
		const userId = generateId(15);

		try {
			await db.insert(userTable).values({
				id: userId,
				username: formUsername,
				email: formEmail,
				createdAt: new Date()
			});
		} catch (e) {
			return fail(500, {
				error: 'Username or email already exists.'
			});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/account');
	}
};

import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

import type { Actions, PageServerLoad } from './$types';

// delete later
export const load: PageServerLoad = async (event) => {
	let user = null;
	if (event.locals.user) {
		user = event.locals.user;
		return {
			user,
			loggedIn: true
		};
	}
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	},
	login: async () => {
		return redirect(302, '/auth');
	}
};

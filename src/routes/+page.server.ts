import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { googleAuth } from '$lib/server/auth';
import { generateState, generateCodeVerifier } from 'arctic';
import { dev } from '$app/environment';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { RequestEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '$lib/formSchema';

export const load: PageServerLoad = async (event: RequestEvent) => {

	const form = await superValidate(zod(schema));
	
	if (event.locals.user) {
		return {
			user: event.locals.user,
			form
		};
	}
};

export const actions: Actions = {
	logout: async (event: RequestEvent) => {
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
	login: async (event) => {
		const state = generateState();
		const codeVerifier = generateCodeVerifier();
		const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
			scopes: ['profile', 'email']
		});

		event.cookies.set('google_state', state, {
			path: '/',
			secure: !dev,
			httpOnly: true,
			maxAge: 60 * 10
		});

		event.cookies.set('code_verifier', codeVerifier, {
			path: '/',
			secure: !dev,
			httpOnly: true,
			maxAge: 60 * 10
		});

		return redirect(302, url.toString());
	},
	search: async (event) => {
		const form = await superValidate(event, zod(schema));
    	console.log(form.data.courseID);
		
		throw redirect(302, `/course/${form.data.courseID}`)
	}
	
};

import { redirect } from '@sveltejs/kit';
import { googleAuth } from '$lib/server/auth';
import { generateState, generateCodeVerifier } from 'arctic';
import { dev } from '$app/environment';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
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
	}
};

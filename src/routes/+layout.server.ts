import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { searchSchema } from '$lib/forms/schema';
import { superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const form = await superValidate(zod(searchSchema));

	if (event.locals.user) {
		return {
			user: event.locals.user,
			form
		};
	}

	return { form };
};

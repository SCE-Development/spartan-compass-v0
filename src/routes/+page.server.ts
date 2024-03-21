import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// delete later
export const load: PageServerLoad = async (event: RequestEvent) => {
	if (event.locals.user) {
		return {
			user: event.locals.user
		};
	}
};

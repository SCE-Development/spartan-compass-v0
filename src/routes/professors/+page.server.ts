import { db } from '$lib/db/db.server';
import { professorsTable } from '$lib/db/schema';

import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const professors = await db.select().from(professorsTable).orderBy(professorsTable.name);

	if (professors.length === 0) {
		error(404, 'No professors found');
	}

	return {
		professors
	};
};

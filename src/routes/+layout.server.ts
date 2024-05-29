import { type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { db } from '$lib/db/db.server';
import { coursesTable, professorsTable } from '$lib/db/schema';
import { asc } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { searchSchema } from '$lib/forms/schema';
import { profSearchSchema } from '$lib/forms/schema';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const result = await db
		.select({
			id: coursesTable.id,
			title: coursesTable.title,
			subject: coursesTable.subject,
			courseNumber: coursesTable.courseNumber,
			description: coursesTable.description
		})
		.from(coursesTable)
		.orderBy(asc(coursesTable.courseNumber));

	const profData = await db
		.select({
			id: professorsTable.id,
			name: professorsTable.name
		})
		.from(professorsTable);

	const form = await superValidate(zod(searchSchema));
	const profForm = await superValidate(zod(profSearchSchema));

	if (event.locals.user) {
		return {
			user: event.locals.user,
			form,
			profForm,
			allCourseData: result,
			professorData: profData
		};
	}
	return { form, profForm, allCourseData: result, professorData: profData };
};

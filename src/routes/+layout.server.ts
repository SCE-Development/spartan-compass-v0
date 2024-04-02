import { type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { db } from '$lib/db/db.server';
import { coursesTable } from '$lib/db/schema';
import { asc } from 'drizzle-orm';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters'; 
import { searchSchema } from '$lib/forms/schema';

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

	const form = await superValidate(zod(searchSchema));
	if (event.locals.user) {
		return {
			user: event.locals.user,
			form,
			allCourseData: result
		};
	}

	return { form, allCourseData: result };
};

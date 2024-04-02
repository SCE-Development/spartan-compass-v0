import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { searchSchema } from '$lib/forms/schema';
import { superValidate } from 'sveltekit-superforms';
import { db } from '$lib/db/db.server';
import { coursesTable } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';

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

export const actions: Actions = {
	search: async (request) => {
		const form = await superValidate(request, zod(searchSchema));
		const courseName = form.data.courseName;
		const courseNum = Number(form.data.courseNumber);
		const courseID = await db
			.select({ id: coursesTable.id })
			.from(coursesTable)
			.where(and(eq(coursesTable.subject, courseName), eq(coursesTable.courseNumber, courseNum)));
		throw redirect(302, `/course/${courseID[0].id}`);
	}
};

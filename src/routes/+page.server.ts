import { dev } from '$app/environment';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { RequestEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db/db.server';
import { coursesTable } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const searchSchema = z.object({
	courseName: z.string(),
	courseNumber: z.string(),
});

export const load: PageServerLoad = async (event: RequestEvent) => {
	const form = await superValidate(zod(searchSchema));
	if (event.locals.user) {
		return {
			user: event.locals.user,
			form
		};
	}
};

export const actions: Actions = {
	search: async (request) => {
		const form = await superValidate(request, zod(searchSchema));
    	console.log(form.data)
		const courseName = form.data.courseName
		const courseNum = Number(form.data.courseNumber)
		const courseID = await db.select({id: coursesTable.id}).from(coursesTable).where(and(eq(coursesTable.subject, courseName), eq(coursesTable.courseNumber, courseNum)))
		console.log(courseID)
		throw redirect(302, `/course/${courseID[0].id}`)
	}
	
};

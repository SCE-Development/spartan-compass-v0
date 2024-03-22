import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { db } from '$lib/db/db.server';
import { coursesTable } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';

const schema = z.object({
	courseSub: z.string(),
	courseNum: z.string()
});
// delete later
export const load: PageServerLoad = async (event: RequestEvent) => {
	const form  = await superValidate(zod(schema));
	if (event.locals.user) {
		return {
			user: event.locals.user,
			form
		};
	}
};

export const actions: Actions = {
    search: async (request) => {
        const form = await superValidate(request, zod(schema));
        console.log(form.data)
        const courseName = form.data.courseSub
        const courseNum = Number(form.data.courseNum)
        const courseID = await db.select({id: coursesTable.id}).from(coursesTable).where(and(eq(coursesTable.subject, courseName), eq(coursesTable.courseNumber, courseNum)))
        console.log(courseID)
        throw redirect(302, `/course/${courseID[0].id}`)
    }
    
};



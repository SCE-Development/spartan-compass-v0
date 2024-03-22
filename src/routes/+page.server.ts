import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { db } from '$lib/db/db.server';
import { coursesTable } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';

const schema = z.object({
	courseName: z.string(),
	courseNumber: z.string()
});
// delete later
export const load: PageServerLoad = async (event: RequestEvent) => {
    const form = await superValidate(zod(schema));
    
    // Always return form
    // Include user in the return object if event.locals.user exists
    return {
        user: event.locals.user ? event.locals.user : null, // or simply event.locals.user to keep it undefined if not logged in
        form
    };
};

export const actions: Actions = {
    search: async (request) => {
        const form = await superValidate(request, zod(schema));
        console.log(form.data)
        const courseName = form.data.courseName
        const courseNum = Number(form.data.courseNumber)
        const courseID = await db.select({id: coursesTable.id}).from(coursesTable).where(and(eq(coursesTable.subject, courseName), eq(coursesTable.courseNumber, courseNum)))
        console.log(courseID)
        throw redirect(302, `/course/${courseID[0].id}`)
    }
    
};



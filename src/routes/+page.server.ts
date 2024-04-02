import { redirect, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { db } from '$lib/db/db.server';
import { coursesTable } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
//import schema  from '$lib/components/Search.svelte';

const schema = z.object({
	courseName: z.string(),
	courseNumber: z.number()
});

export const actions: Actions = {
	search: async (request) => {
		const form = await superValidate(request, zod(schema));
		const courseID = await db
			.select({ id: coursesTable.id })
			.from(coursesTable)
			.where(
				and(
					eq(coursesTable.subject, form.data.courseName),
					eq(coursesTable.courseNumber, form.data.courseNumber)
				)
			);
		throw redirect(302, `/course/${courseID[0].id}`);
	}
};

function orderBy(arg0: any) {
	throw new Error('Function not implemented.');
}

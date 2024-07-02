import { type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { db } from '$lib/db/db.server';
import { coursesTable, professorsTable } from '$lib/db/schema'; 
import { asc } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { professorSearchSchema, searchSchema } from '$lib/forms/schema';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const courseData = await db
		.select({
			id: coursesTable.id,
			title: coursesTable.title,
			subject: coursesTable.subject,
			courseNumber: coursesTable.courseNumber,
			description: coursesTable.description
		})
		.from(coursesTable)
		.orderBy(asc(coursesTable.courseNumber));
	

	const professorData = await db 
		.select({
			id: professorsTable.id,
			name: professorsTable.name,
		})
		.from(professorsTable)
		.orderBy(asc(professorsTable.name));
	const form = await superValidate(zod(searchSchema));
	const professorForm = await superValidate(zod(professorSearchSchema))
	if (event.locals.user) {
		return {
			user: event.locals.user,
			form, 
			professorForm,
			allCourseData: courseData,
			allProfessorData: professorData
		};
	}
	
	return { professorForm, form, allCourseData: courseData , allProfessorData: professorData};
};

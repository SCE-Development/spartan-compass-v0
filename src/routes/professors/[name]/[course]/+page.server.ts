import type { PageServerLoad } from './$types';
import { professorsTable, coursesTable } from '$lib/db/schema';
import { db } from '$lib/db/db.server';
import { eq, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const professorName = params.name.split('-').join(' ');
	const courseName = params.course.split('-').join(' ');

	const professor = await db
		.select()
		.from(professorsTable)
		.where(eq(professorsTable.name, professorName));

	if (!professor[0]) {
		return error(404, 'Professor not found');
	}

	const courseSubject = courseName.split(' ')[0];
	const courseNum = courseName.split(' ')[1];

	const courses = await db
		.select()
		.from(coursesTable)
		.where(
			and(eq(coursesTable.subject, courseSubject), eq(coursesTable.courseNumber, Number(courseNum)))
		);

	if (courses.length === 0) {
		return error(404, 'Professor does not teach this course');
	}

	return {
		professor: professor[0],
		courses
	};
};

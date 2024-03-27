import type { PageServerLoad } from './$types';
import { professorsTable, coursesTable, ratingsTable } from '$lib/db/schema';
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

	const professorId = professor[0].id;

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

	const ratings = await db
		.select()
		.from(ratingsTable)
		.where(
			and(eq(ratingsTable.professorId, professorId), eq(ratingsTable.courseId, courses[0].id))
		);

	const extendedRatings = ratings.map((rating) => {
		return {
			...rating,
			classNum: params.course,
			classTitle: courses[0].title
		};
	});

	return {
		professor: professor[0],
		courses,
		ratings: extendedRatings
	};
};

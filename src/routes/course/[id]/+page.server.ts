import { db } from '$lib/db/db.server';
import { coursesTable, professorsTable, ratingsTable } from '$lib/db/schema';
import { redirect, type Actions } from '@sveltejs/kit';
import { and, eq, inArray } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	courseName: z.string(),
	courseNumber: z.number()
});

export const load = async ({ params }) => {
	const { id } = params;
	const result = await db
		.select({
			id: coursesTable.id,
			title: coursesTable.title,
			subject: coursesTable.subject,
			courseNumber: coursesTable.courseNumber,
			description: coursesTable.description
		})
		.from(coursesTable)
		.where(eq(coursesTable.id, Number(id)));
	const reviews = await db
		.select({
			userId: ratingsTable.userId,
			professorId: ratingsTable.professorId,
			rating: ratingsTable.rating,
			review: ratingsTable.review,
			courseId: ratingsTable.courseId
		})
		.from(ratingsTable)
		.where(eq(ratingsTable.courseId, Number(id)));

	const professorIds = reviews.map((review) => review.professorId);

	interface Professor {
		id: number;
		name: string;
	}

	let professors: Professor[] = [];
	if (professorIds.length > 0) {
		professors = await db
			.select({
				id: professorsTable.id,
				name: professorsTable.name
			})
			.from(professorsTable)
			.where(inArray(professorsTable.id, professorIds));
	}

	const reviewsWithProfessorNames = reviews.map((review) => {
		const professor = professors.find((professor) => professor.id === review.professorId);
		return {
			...review,
			professorName: professor ? professor.name : 'Unknown'
		};
	});

	return {
		courseData: result[0],
		reviewData: reviewsWithProfessorNames
	};
};

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

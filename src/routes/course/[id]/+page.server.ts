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
			courseId: ratingsTable.courseId,
			createdAt: ratingsTable.createdAt
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

	interface Review {
		userId: string;
		professorId: number;
		rating: number;
		review: string;
		courseId: number;
		createdAt: Date;
	}

	// returns map of Reviews grouped by professor, key index corresponds to professorId
	const groupedReviews: { [key: number]: Review[] } = reviews.reduce(
		(accumulator, review) => {
			if (!accumulator[review.professorId]) {
				accumulator[review.professorId] = [];
			}
			accumulator[review.professorId].push(review);

			return accumulator;
		},
		{} as { [key: number]: Review[] }
	);

	// returns map of average ratings by professorId
	const averageRatings = (() => {
		const result: { [professorId: number]: number } = {};
		for (const [professorId, reviews] of Object.entries(groupedReviews)) {
			let totalRating = 0;
			for (const review of reviews) {
				totalRating += review.rating;
			}
			const averageRating = totalRating / reviews.length;
			result[Number(professorId)] = +averageRating.toFixed(1);
		}
		return result;
	})();

	const uniqueProfessors = professors.filter((professor, index, self) => {
		return index === self.findIndex((t) => t.id === professor.id);
	});

	const professorsWithAverageRatings = uniqueProfessors.map((professor) => {
		return {
			...professor,
			averageRating: averageRatings[professor.id]
		};
	});

	return {
		courseData: result[0],
		professorsWithAverageRatings
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

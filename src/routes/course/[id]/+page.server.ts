import { db } from '$lib/db/db.server';
import { coursesTable, professorsTable, ratingsTable } from '$lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

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

	// returns object with average ratings for each professor for the corresponding course
	// contains professorId, professorName, and averageRating
	const averageRatings = (() => {
		const result: { [key: number]: number } = {};
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

	const reviewsWithProfessorNames = reviews.map((review) => {
		const professor = professors.find((professor) => professor.id === review.professorId);
		return {
			...review,
			professorName: professor ? professor.name : 'Unknown',
			courseNumber: result[0].courseNumber,
			subject: result[0].subject
		};
	});

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
		reviewData: reviewsWithProfessorNames,
		professorsWithAverageRatings
	};
};

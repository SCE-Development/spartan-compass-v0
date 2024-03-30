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

	interface Review {
		userId: string;
		professorId: number;
		rating: number;
		review: string;
		courseId: number;
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

	// function that calculates the average rating for each professor, returns map with professorId as key and their average rating as value
	const averageRatings = (() => {
		return Object.entries(groupedReviews).reduce(
			(accumulator, [professorId, reviews]) => {
				const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
				const averageRating = Math.floor(totalRating / reviews.length); // should averageRating be rounded?
				accumulator[Number(professorId)] = averageRating;
				return accumulator;
			},
			{} as { [key: number]: number }
		);
	})();

	const reviewsWithProfessorNames = reviews.map((review) => {
		const professor = professors.find((professor) => professor.id === review.professorId);
		return {
			...review,
			professorName: professor ? professor.name : 'Unknown'
		};
	});

	const uniqueProfessors = professors.filter((professor, index, self) => {
		return index === self.findIndex((t) => t.id === professor.id);
	})

	const professorsWithAverageRatings = uniqueProfessors.map((professor) => {
		return {
			...professor,
			averageRating: averageRatings[professor.id]
		}
	})

	return {
		courseData: result[0],
		reviewData: reviewsWithProfessorNames,
		professorsWithAverageRatings
		
	};
};

import { db } from '$lib/db/db.server';
import { coursesTable, professorsTable, ratingsTable } from '$lib/db/schema';
import { eq, inArray} from 'drizzle-orm';
import { unionAll } from 'drizzle-orm/pg-core'



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
		.where(eq(ratingsTable.courseId, Number(id)))
		
	

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
			.where(inArray(professorsTable.id, professorIds))
			
	}

	const groupedReviews: { [key: number]: any[] } = reviews.reduce((accumulator, review) => {
		// Initialize an array for the professor if it doesn't exist
		if (!accumulator[review.professorId]) {
			accumulator[review.professorId] = [];
		}
		accumulator[review.professorId].push(review);

		return accumulator;
	}, {} as { [key: number]: any[] });

		
	const reviewsWithProfessorNames = reviews.map((review) => {
		const professor = professors.find((professor) => professor.id === review.professorId);
		return {
			...review,
			professorName: professor ? professor.name : 'Unknown'
		};
	});



	return {
		courseData: result[0],
		reviewData: reviewsWithProfessorNames,
		groupedReviews
	};
};

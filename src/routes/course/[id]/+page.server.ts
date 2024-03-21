import { db } from '$lib/db/db.server';
import { coursesTable, professorsCoursesTable, professorsTable, ratingsTable } from '$lib/db/schema';
import { asc, eq, inArray } from 'drizzle-orm';

export const load = async ({params}) => {
	const { id} = params;
	
	//console.log(id);
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

		const professorIds = reviews.map(review => review.professorId);

    // Query professorsTable to get professor names
	let professors: any[] = [];
	if (professorIds.length > 0) {
		// Query professorsTable to get professor names
		professors = await db
			.select({
				id: professorsTable.id,
				name: professorsTable.name
			})
			.from(professorsTable)
			.where(inArray(professorsTable.id, professorIds));
	}
	

    // Map professor names to reviews
    const reviewsWithProfessorNames = reviews.map(review => {
        const professor = professors.find(professor => professor.id === review.professorId);
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

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		
	}
};
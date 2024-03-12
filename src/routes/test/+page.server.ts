import { db } from '$lib/db/db.server';
import { coursesTable, professorsCoursesTable, professorsTable } from '$lib/db/schema';
import { asc, eq, inArray } from 'drizzle-orm';

export const load = async () => {
	const result = await db
		.select({
			id: coursesTable.id,
			title: coursesTable.title,
			subject: coursesTable.subject,
			courseNumber: coursesTable.courseNumber,
			description: coursesTable.description
		})
		.from(coursesTable)
		.orderBy(asc(coursesTable.subject));

	return {
		courseData: result
	};
};

export const actions = {
	search: async ({ request }) => {
		const data = await request.formData();
		const courseId = Number(data.get('courseId'));

		const professorsIds = await db
			.select({
				id: professorsCoursesTable.professorId
			})
			.from(professorsCoursesTable)
			.where(eq(professorsCoursesTable.courseId, courseId));

		const ids = professorsIds.map((professor) => professor.id);

		const professors = await db
			.select({
				id: professorsTable.id,
				name: professorsTable.name,
				department: professorsTable.department
			})
			.from(professorsTable)
			.orderBy(asc(professorsTable.name))
			.where(inArray(professorsTable.id, ids));

		return {
			professors
		};
	}
};

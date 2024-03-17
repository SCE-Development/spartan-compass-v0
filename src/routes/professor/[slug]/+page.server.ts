import { db } from '$lib/db/db.server';
import { professorsTable, coursesTable, professorsCoursesTable } from '$lib/db/schema';
import { eq, asc, inArray } from 'drizzle-orm';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const professorName = params.slug.split('-').join(' ');

  const professor = await db
    .select()
    .from(professorsTable)
    .where(eq(professorsTable.name, professorName))

  if (!professor[0]) {
    return error(404, 'Professor not found');
  }

  const coursesIds = await db
    .select({
      id: professorsCoursesTable.courseId
    })
    .from(professorsCoursesTable)
    .where(eq(professorsCoursesTable.professorId, professor[0].id))

  const courses = await db
    .select({
      id: coursesTable.id,
      title: coursesTable.title,
      subject: coursesTable.subject,
      courseNumber: coursesTable.courseNumber,
      description: coursesTable.description
    })
    .from(coursesTable)
    .orderBy(asc(coursesTable.title))
    .where(inArray(coursesTable.id, coursesIds.map((course) => course.id)));

  return {
    professor: professor[0],
    courses
  };
}
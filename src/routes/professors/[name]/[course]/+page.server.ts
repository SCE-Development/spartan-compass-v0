import type { PageServerLoad } from './$types';
import { professorsCoursesTable, professorsTable, coursesTable } from '$lib/db/schema';
import { db } from '$lib/db/db.server';
import { asc, eq, inArray, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const professorName = params.name.split('-').join(' ');
  const courseName = params.course.split('-').join(' ');

  const professor = await db
    .select()
    .from(professorsTable)
    .where(eq(professorsTable.name, professorName))

  if (!professor[0]) {
    return error(404, 'Professor not found');
  }

  const courseSubject = courseName.split(' ')[0];
  const courseNum = courseName.split(' ')[1];

  const course = await db
    .select()
    .from(coursesTable)
    .where(and(eq(coursesTable.subject, courseSubject), eq(coursesTable.courseNumber, Number(courseNum))))

  if (course.length === 0) {
    return {
      professor: professor[0],
      course: null
    };
  }

  return {
    professor: professor[0],
    course: course[0]
  };
}
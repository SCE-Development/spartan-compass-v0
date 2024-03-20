import { db } from '$lib/db/db.server';
import { professorsTable, coursesTable, professorsCoursesTable, ratingsTable } from '$lib/db/schema';
import { eq, asc, inArray } from 'drizzle-orm';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type ExtendedCourse = {
  id: number;
  title: string;
  subject: string;
  courseNumber: number;
  description: string | null;
  averageRating?: number; 
};

export const load: PageServerLoad = async ({ params }) => {
  const professorName = params.name.split('-').join(' ');

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

  if (coursesIds.length === 0) {
    return {
      professor: professor[0],
      courses: [],
      showCourse: false 
    };
  }

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
  
  const ratings = await db
    .select()
    .from(ratingsTable)
    .where(inArray(ratingsTable.courseId, courses.map((course) => course.id)));

  const extendedCourses: ExtendedCourse[] = courses.map(course => ({
    ...course,
    averageRating: undefined 
  }));

  // average ratings for each course
  extendedCourses.forEach(course => {
    const courseRatings = ratings.filter(rating => rating.courseId === course.id);
    if (courseRatings.length > 0) {
      const totalRating = courseRatings.reduce((acc, curr) => acc + curr.rating, 0);
      const averageRating = totalRating / courseRatings.length;
      course.averageRating = parseFloat(averageRating.toFixed(2)); // Assign calculated averageRating
    }
  });

  console.log(extendedCourses)

  return {
    professor: professor[0],
    courses: extendedCourses,
    showCourse: false
  };
}
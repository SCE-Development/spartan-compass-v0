import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const name = params.name.split('-').join(' ');
  const course = params.course;
  return {
    name,
    course
  };
}
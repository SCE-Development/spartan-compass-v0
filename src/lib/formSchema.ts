import { z } from 'zod';
export const schema = z.object({
	courseName: z.string(),
	courseNumber: z.string(),
	courseID: z.number()
});
	
import { z } from 'zod';

export const searchSchema = z.object({
	courseName: z.string(),
	courseNumber: z.string()
});

export type SearchSchema = typeof searchSchema;

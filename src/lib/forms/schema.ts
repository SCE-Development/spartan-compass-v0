import { z } from 'zod';

export const searchSchema = z.object({
	courseName: z.string(),
	courseNumber: z.string()
});

export const profSearchSchema = z.object({
	profName: z.string()
});

export type SearchSchema = typeof searchSchema;
export type ProfSearchSchema = typeof profSearchSchema;

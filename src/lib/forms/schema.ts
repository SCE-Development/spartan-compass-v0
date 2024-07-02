import { z } from 'zod';

export const searchSchema = z.object({
	courseName: z.string(),
	courseNumber: z.string(),
	
});

export const professorSearchSchema = z.object({
	professorName: z.string()
})

export type SearchSchema = typeof searchSchema;
export type ProfessorSearchSchema = typeof professorSearchSchema

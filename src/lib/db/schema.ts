import { pgTable, serial, text, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const professorsTable = pgTable('professors', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	department: text('department').notNull()
});

export const coursesTable = pgTable('courses', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	subject: text('subject').notNull(),
	courseNumber: integer('course_number').notNull(),
	description: text('description')
});

export const professorsCoursesTable = pgTable(
	'professors_courses',
	{
		professorId: integer('professor_id')
			.notNull()
			.references(() => professorsTable.id),
		courseId: integer('course_id')
			.notNull()
			.references(() => coursesTable.id)
	},
	(table) => ({
		pk: primaryKey({ columns: [table.professorId, table.courseId] })
	})
);

export const professorsCoursesRelations = relations(professorsCoursesTable, ({ one }) => ({
	professor: one(professorsTable, {
		fields: [professorsCoursesTable.professorId],
		references: [professorsTable.id]
	}),
	course: one(coursesTable, {
		fields: [professorsCoursesTable.courseId],
		references: [coursesTable.id]
	})
}));

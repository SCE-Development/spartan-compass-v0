import { pgTable, serial, text, integer, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define the `professors` table with id, name, and department columns.
// - `id` is a serial column used as the primary key.
// - `name` and `department` are text columns that cannot be null.
export const professorsTable = pgTable('professors', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	department: text('department').notNull()
});

// Define the `courses` table with id, title, courseCode, and an optional description.
// - `id` is a serial column and primary key.
// - `title` and `courseCode` are text columns that cannot be null.
// - `description` is an optional text column.
export const coursesTable = pgTable('courses', {
	id: serial('id').primaryKey(),
	subject: text('subject').notNull(),
	courseNumber: integer('course_number').notNull(),
	description: text('description')
});

// Define a join table `professors_courses` to establish a many-to-many relationship
// between `professors` and `courses` through `professorId` and `courseId`.
// Both fields reference the primary keys of their respective tables and cannot be null.
// The combination of `professorId` and `courseId` is used as a composite primary key for this table.
export const professorsCoursesTable = pgTable(
	'professors_courses',
	{
		professorId: integer('professor_id')
			.notNull()
			.references(() => professorsTable.id), // Reference professor's id
		courseId: integer('course_id')
			.notNull()
			.references(() => coursesTable.id) // Reference course's id
	},
	(table) => ({
		pk: primaryKey({ columns: [table.professorId, table.courseId] }) // Composite primary key
	})
);

// Define relationships for the join table. This part of the code specifies
// how records in the `professors_courses` table are related to records in the
// `professors` and `courses` tables, facilitating easier data retrieval and manipulation.
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

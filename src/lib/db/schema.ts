import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
	id: varchar('id', { length: 15 }).primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull(),
	googleId: varchar('googleId', { length: 21 }).notNull(),
	createdAt: timestamp('createdAt').notNull()
});

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: varchar('userId')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expiresAt', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

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

export const ratingsTable = pgTable(
	'reviews', 
	{
		userId: varchar('userId')
			.notNull()
			.references(() => userTable.id),
		professorId: integer('professor_id')
			.notNull()
			.references(() => professorsTable.id),
		rating: integer('rating')
	    	.notNull(),
		courseId: integer('course_id')
			.notNull()
			.references(() => coursesTable.id),
		review: text('review').notNull(),
		createdAt: timestamp('createdAt', {
			withTimezone: true,
			mode: 'date'
		}).notNull()	
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

export const ratingsRelations = relations(ratingsTable, ({ one }) => ({
    user: one(userTable, {
        fields: [ratingsTable.userId],
        references: [userTable.id]
    }),
    professor: one(professorsTable, {
        fields: [ratingsTable.professorId],
        references: [professorsTable.id]
    }),
    course: one(coursesTable, {
        fields: [ratingsTable.courseId],
        references: [coursesTable.id]
    })
}));

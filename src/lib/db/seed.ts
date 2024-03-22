import { db } from './db.server';
import {
	userTable,
	professorsTable,
	coursesTable,
	professorsCoursesTable,
	ratingsTable
} from './schema';
import { eq } from 'drizzle-orm';

const main = async () => {
	try {
		console.log('Seeding database');
		await db.delete(professorsCoursesTable);
		await db.delete(ratingsTable);
		await db.delete(professorsTable);
		await db.delete(coursesTable);
		await db.delete(userTable).where(eq(userTable.id, 'fake-user-id'));

		console.log('Inserting data');

		const user = [
			{
				id: 'fake-user-id',
				username: 'Fake User',
				email: 'fakeuser@gmail.com',
				googleId: 'fake-google-id',
				createdAt: new Date()
			}
		];
		const professors = [
			{ id: 1, name: 'John Smith', department: 'Mathematics' },
			{ id: 2, name: 'Jane Doe', department: 'Science' },
			{ id: 3, name: 'Bob Johnson', department: 'History' },
			{ id: 4, name: 'Alice Williams', department: 'Mathematics' },
			{ id: 5, name: 'Charlie Brown', department: 'Science' },
			{ id: 6, name: 'David Davis', department: 'History' },
			{ id: 7, name: 'Eva Green', department: 'Computer Science' },
			{ id: 8, name: 'Michael Brown', department: 'Engineering' }
		];
		const courses = [
			{
				id: 1,
				title: 'Calculus',
				subject: 'MATH',
				courseNumber: 106,
				description: 'An introductory course to calculus'
			},
			{
				id: 2,
				title: 'Biology',
				subject: 'SCI',
				courseNumber: 105,
				description: 'An introductory course to biology'
			},
			{
				id: 3,
				title: 'World War II',
				subject: 'HIST',
				courseNumber: 101,
				description: 'A course about World War II'
			},
			{
				id: 4,
				title: 'Algebra',
				subject: 'MATH',
				courseNumber: 102,
				description: 'An introductory course to algebra'
			},
			{
				id: 5,
				title: 'Chemistry',
				subject: 'SCI',
				courseNumber: 113,
				description: 'An introductory course to chemistry'
			},
			{
				id: 6,
				title: 'World War I',
				subject: 'HIST',
				courseNumber: 121,
				description: 'A course about World War I'
			},
			{
				id: 7,
				title: 'Advanced Calculus',
				subject: 'MATH',
				courseNumber: 201,
				description: 'An advanced course in calculus'
			},
			{
				id: 8,
				title: 'Advanced Biology',
				subject: 'SCI',
				courseNumber: 241,
				description: 'An advanced course in biology'
			},
			{
				id: 9,
				title: 'The Civil War',
				subject: 'HIST',
				courseNumber: 220,
				description: 'A course about The Civil War'
			},
			{
				id: 10,
				title: 'Introduction to Programming',
				subject: 'COMPSCI',
				courseNumber: 101,
				description: 'An introductory course to programming'
			},
			{
				id: 11,
				title: 'Engineering Principles',
				subject: 'ENG',
				courseNumber: 102,
				description: 'Fundamentals of engineering'
			}
		];
		const professorsCourses = [
			{ professorId: 1, courseId: 1 },
			{ professorId: 1, courseId: 4 },
			{ professorId: 1, courseId: 7 },
			{ professorId: 2, courseId: 2 },
			{ professorId: 2, courseId: 5 },
			{ professorId: 2, courseId: 8 },
			{ professorId: 3, courseId: 3 },
			{ professorId: 3, courseId: 6 },
			{ professorId: 3, courseId: 9 },
			{ professorId: 4, courseId: 1 },
			{ professorId: 4, courseId: 4 },
			{ professorId: 4, courseId: 7 },
			{ professorId: 5, courseId: 2 },
			{ professorId: 5, courseId: 5 },
			{ professorId: 5, courseId: 8 },
			{ professorId: 7, courseId: 10 }, // COMPSCI professor teaching COMPSCI course
			{ professorId: 8, courseId: 11 } // Engineering professor teaching ENG course
		];

		const ratings = [
			{
				id: 1,
				userId: 'fake-user-id',
				professorId: 4, // Alice Williams
				rating: 5,
				courseId: 1, // Calculus
				review: 'Excellent course! The professor made complex topics easily understandable.',
				createdAt: new Date()
			},
			{
				id: 2,
				userId: 'fake-user-id',
				professorId: 4, // Alice Williams
				rating: 4,
				courseId: 4, // Algebra
				review: 'Very informative and well-structured course. Highly recommend.',
				createdAt: new Date()
			},
			{
				id: 3,
				userId: 'fake-user-id',
				professorId: 4, // Alice Williams
				rating: 5,
				courseId: 7, // Advanced Calculus
				review: 'Challenging yet rewarding. Alice Williams is a fantastic teacher.',
				createdAt: new Date()
			},
			{
				id: 4,
				userId: 'fake-user-id',
				professorId: 4,
				rating: 2,
				courseId: 7,
				review: 'hi',
				createdAt: new Date()
			}
		];

		await db.insert(userTable).values(user);
		await db.insert(professorsTable).values(professors);
		await db.insert(coursesTable).values(courses);
		await db.insert(professorsCoursesTable).values(professorsCourses);
		await db.insert(ratingsTable).values(ratings);
		console.log('Database seeded, press Ctrl+C to exit');
	} catch (error) {
		console.error(error);
		throw new Error('Error seeding database');
	}
};

main();

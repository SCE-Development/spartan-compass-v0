CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subject" text NOT NULL,
	"course_number" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors_courses" (
	"professor_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "professors_courses_professor_id_course_id_pk" PRIMARY KEY("professor_id","course_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"department" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors_courses" ADD CONSTRAINT "professors_courses_professor_id_professors_id_fk" FOREIGN KEY ("professor_id") REFERENCES "professors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors_courses" ADD CONSTRAINT "professors_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

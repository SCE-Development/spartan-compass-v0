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
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"professor_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"course_id" integer NOT NULL,
	"review" text NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"googleId" varchar(21),
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors_courses" ADD CONSTRAINT "professors_courses_professor_id_professors_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."professors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors_courses" ADD CONSTRAINT "professors_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_professor_id_professors_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."professors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

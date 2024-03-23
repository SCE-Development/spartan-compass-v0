<script lang="ts">
	import { ChevronsRight } from "lucide-svelte";

	interface Professor {
		id: number;
		name: string;
		department: string;
	};
	
	interface Course {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
		description: string | null;
	}

	let { professor, courses, showCourse }: { professor: Professor, courses: Course[], showCourse: boolean } = $props();
	const initials: string = professor.name
		.split(' ')
		.map((n) => n[0])
		.join('');
	const course = courses[0];
</script>

<div class="mb-4 mt-2 flex w-full justify-center bg-zinc-300">
	<div class="flex w-full items-center overflow-hidden rounded-lg px-8 py-6 xl:w-3/4">
		<div class="avatar placeholder mr-6">
			<div class="w-24 rounded-full bg-base-100 text-neutral-content">
				<span class="text-3xl text-gray-300">{initials}</span>
			</div>
		</div>
		<div class="mr-6 flex-col justify-start">
			<p class="badge rounded-md px-2 py-3">{professor.department}</p>
			<div class="mt-1 text-2xl font-bold text-neutral">{professor.name}</div>
		</div>

		{#if showCourse && course}
			<div class="mr-6 text-base-100">
				<ChevronsRight />
			</div>
			<div class="flex-col justify-center">
				<p class="badge rounded-md px-2 py-3">{course.subject}-{course.courseNumber}</p>
				<div class="mt-1 text-2xl font-bold text-neutral">{course.title}</div>
			</div>
		{/if}
	</div>
</div>

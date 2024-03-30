<script lang="ts">
	import { ChevronsRight } from 'lucide-svelte';
	interface Course {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
		description: string | null;
	}
	let { course }: { course: Course } = $props();
	const courseInitials: string = course.title
		.split(' ')
		.map((n) => n[0])
		.join('');
	const courseName: string = `${course.subject}-${course.courseNumber}`;
</script>

<div class="mb-4 mt-2 flex w-full justify-center bg-zinc-300">
	<div class="flex w-full items-center overflow-hidden rounded-lg px-8 py-6 xl:w-3/4">
		<div class="avatar placeholder mr-6">
			<div class="h-16 w-36 rounded-xl bg-base-100 text-neutral-content">
				<span class="text-2xl text-gray-300">{courseName}</span>
			</div>
		</div>
		<div class="mr-6 flex-col justify-start">
			<p class="badge rounded-md px-2 py-3">{course.subject}</p>
			<div class="mt-1 text-2xl font-bold text-neutral">{course.title}</div>
		</div>

		<div class="mr-6 text-base-100">
			<ChevronsRight />
		</div>
		<div class="flex-col justify-center">
			<p class="badge rounded-md px-2 py-3">{course.courseNumber}</p>
			<div class="mt-1 text-2xl font-bold text-neutral">{course.description}</div>
		</div>
	</div>
</div>

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

	const courseName: string = `${course.subject}-${course.courseNumber}`;
</script>

<div class="flex justify-center w-full mt-2 mb-4 bg-zinc-300 rounded-xl">
	<div class="flex items-center w-full px-8 py-6 overflow-hidden rounded-lg xl:w-4/5">
		<div class="mr-6">
			<div class="rounded-xl bg-base-100 text-neutral-content">
				<p class="p-2 text-2xl font-semibold text-gray-300">{courseName}</p>
			</div>
		</div>
		<div class="flex-col justify-start">
			<p class="px-2 py-3 rounded-md badge">{course.subject}</p>
			<div class="mt-1 text-2xl font-bold text-neutral">{course.title}</div>
		</div>

		<div class="mx-6 text-base-100">
			<ChevronsRight />
		</div>
		<div class="flex-col justify-center">
			<p class="px-2 py-3 rounded-md badge">{course.courseNumber}</p>
			{#if course.description}
				<div class="mt-1 text-2xl font-bold text-neutral">{course.description}</div>
			{/if}
		</div>
	</div>
</div>

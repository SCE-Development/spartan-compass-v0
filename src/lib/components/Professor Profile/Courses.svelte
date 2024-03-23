<script lang="ts">
	import ClassCard from './ClassCard.svelte';

	interface ExtendedCourse {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
		description: string | null;
		averageRating?: number;
	}

	let { courses }: { courses: ExtendedCourse[] } = $props();
</script>

<div class="flex w-screen flex-wrap px-2">
	{#each courses as course}
		<div class="mb-4 w-full px-2 md:w-1/2 xl:w-1/3">
			<ClassCard {course} />
		</div>
	{/each}
</div>

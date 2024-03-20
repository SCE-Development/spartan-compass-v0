<script lang="ts">
	import { enhance } from '$app/forms';

	interface Course {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
	}

	let { courses }: { courses: Course[] } = $props();

	let selectedSubject = $state<string | undefined>(undefined);
	let selectedCourseNumber = $state<number | undefined>(undefined);

	let courseNumbers = $derived(
		courses
			.filter((course) => course.subject === selectedSubject)
			.map((course) => ({ number: course.courseNumber, title: course.title }))
	);

	let selectedCourseId = $derived(
		courses.find(
			(course) => course.subject === selectedSubject && course.courseNumber === selectedCourseNumber
		)?.id
	);
</script>

<form
	method="POST"
	action="?/search"
	class="flex items-center space-x-4"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<select bind:value={selectedSubject} class="select">
		<option value="">Select a subject</option>
		{#each [...new Set(courses.map((course) => course.subject))] as subject}
			<option value={subject}>{subject}</option>
		{/each}
	</select>

	<select bind:value={selectedCourseNumber} class="select" disabled={!selectedSubject}>
		<option value="">Select a course number</option>
		{#each courseNumbers as { number, title }}
			<option value={number}>{number} - {title}</option>
		{/each}
	</select>

	{#if selectedCourseId}
		<input type="hidden" name="courseId" value={selectedCourseId} />
	{/if}

	<button class="btn" type="submit" disabled={!selectedCourseNumber}>Search</button>
</form>

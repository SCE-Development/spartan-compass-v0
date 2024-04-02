<script lang="ts" context="module">
	export interface Course {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
	}
	// export const schema = z.object({
	// courseName: z.string(),
	// courseNumber: z.number()
	// });
</script>

<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { courses, formData }: { courses: Course[]; formData?: Record<string, unknown> } = $props();

	const { form, enhance } = superForm(formData as Record<string, unknown>);

	let courseNumbers = $derived(
		courses
			.filter((course) => course.subject === ($form.courseName as string))
			.map((course) => ({ number: course.courseNumber, title: course.title }))
	);
</script>

<form method="POST" action="?/search" class="flex items-center space-x-4" use:enhance>
	<select name="courseName" bind:value={$form.courseName as string} class="select">
		<option value="">Select a subject</option>
		{#each [...new Set(courses.map((course) => course.subject))] as subject}
			<option value={subject}>{subject}</option>
		{/each}
	</select>

	<select
		name="courseNumber"
		bind:value={$form.courseNumber as string}
		class="select"
		disabled={!$form.courseName}
	>
		<option value="">Select a course number</option>
		{#each courseNumbers as { number, title }}
			<option value={number}>{number} - {title}</option>
		{/each}
	</select>

	<button class="btn" type="submit" disabled={!$form.courseNumber}>Search</button>
</form>

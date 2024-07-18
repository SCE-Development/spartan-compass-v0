<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	export interface Course {
		id: number;
		title: string;
		subject: string;
		courseNumber: number;
	}
</script>

<script lang="ts">
	import type { SearchSchema } from '$lib/forms/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';

	interface Props {
		courses: Course[];
		formData: SuperValidated<Infer<SearchSchema>>;
	}

	let { courses, formData }: Props = $props();

	const { form, enhance } = superForm(formData, {
		invalidateAll: false,
		resetForm: false
	});

	let courseNumbers = $derived(
		courses
			.filter((course) => course.subject === $form.courseName)
			.map((course) => ({ number: course.courseNumber, title: course.title }))
	);

	function handleRedirect() {
		const selectedCourse = courses.find(
			(course) =>
				course.subject === $form.courseName && course.courseNumber === Number($form.courseNumber)
		);
		if (selectedCourse) {
			goto(`/course/${selectedCourse.id}`);
		};
	};

</script>

<select name="courseName" bind:value={$form.courseName} class="select">
	<option value="">Select a subject</option>
	{#each [...new Set(courses.map((course) => course.subject))] as subject}
		<option value={subject}>{subject}</option>
	{/each}
</select>

<select
	name="courseNumber"
	bind:value={$form.courseNumber}
	class="select"
	disabled={!$form.courseName}
>
	<option value="">Select a course number</option>
	{#each courseNumbers as { number, title }}
		<option value={number}>{number} - {title}</option>
	{/each}
</select>

<button class="btn" type="submit" disabled={!$form.courseNumber} onclick={handleRedirect}>Search</button>

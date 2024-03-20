<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { formData } = $props();
	const { form } = superForm(formData as Record<string, unknown>);
</script>

<SuperDebug data={$form} />
<form method="POST" action="?/search">
	<input type="text" name="courseName" bind:value={$form.courseName as string} />
	<input type="text" name="courseNumber" bind:value={$form.courseNumber as string} />
	<input type="number" name="courseID" bind:value={$form.courseID as number} />
	<button type="submit">Search</button>
</form>

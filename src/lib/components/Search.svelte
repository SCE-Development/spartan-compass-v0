<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	let { formData } = $props();
	const { form } = superForm(formData as Record<string, unknown>);
</script>

<form method="POST" action="?/search">
	<input
		type="text"
		name="courseName"
		class="input input-bordered input-accent"
		bind:value={$form.courseName as string}
	/>
	<input
		type="text"
		name="courseNumber"
		class="input input-bordered input-accent"
		bind:value={$form.courseNumber as string}
	/>
	<button type="submit" class="btn btn-ghost">Search</button>
</form>

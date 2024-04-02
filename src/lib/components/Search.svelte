<script lang="ts">
	import type { SearchSchema } from '$lib/forms/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	let { formData }: { formData: SuperValidated<Infer<SearchSchema>> } = $props();
	const { form } = superForm(formData);
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

<script lang="ts" context="module">
	export interface Professor {
		id: number;
		name: string;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ProfessorSearchSchema } from '$lib/forms/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';

	interface Props {
		professors: Professor[];
		formData: SuperValidated<Infer<ProfessorSearchSchema>>; //
	}

	let { professors, formData }: Props = $props();

	const { form } = superForm(formData, {
		invalidateAll: false,
		resetForm: false
	});

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const professorName = formData.get('professorName');
		console.log(`professorName: ${professorName}`);
		goto(`professors/${professorName}`);
	}
</script>

<form onsubmit={handleSubmit} action="/?/professorSearch" class="flex items-center space-x-4">
	<select name="professorName" bind:value={$form.professorName} class="select">
		<option value="">Select a Professor</option>
		{#each professors as professor}
			<option value={professor.name}>{professor.name}</option>
		{/each}
	</select>

	<button class="btn" type="submit" disabled={!$form.professorName}>Search</button>
</form>

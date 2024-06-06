<script lang="ts" context="module">
	export interface Professor {
		id: number;
		name: string;
	}
</script>

<script lang="ts">
	import type { ProfSearchSchema } from '$lib/forms/schema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { goto } from '$app/navigation';
	import SuperDebug from 'sveltekit-superforms';

	interface Props {
		professors: Professor[];
		profFormData: SuperValidated<Infer<ProfSearchSchema>>;
	}

	let { professors, profFormData }: Props = $props();

	const { form } = superForm(profFormData, {
		invalidateAll: false,
		resetForm: false
	});

	let suggestions = $state<Professor[]>([]);

	function handleInput(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value;
		if (inputValue.trim().length > 0) {
			suggestions = professors.filter((professor) =>
				professor.name.toLowerCase().includes(inputValue.toLowerCase())
			);
		} else {
			suggestions = [];
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		goto(`./professors/${$form.profName}`);
	}
</script>

<form method="POST" class="flex items-center space-x-4" onsubmit={handleSubmit}>
	<input
		type="text"
		placeholder="Type professor name"
		class="input input-bordered w-full max-w-xs"
		name="profName"
		bind:value={$form.profName}
		list="profNames"
		oninput={handleInput}
	/>
	<datalist id="profNames">
		{#each suggestions as suggestion}
			<option>{suggestion.name}</option>
		{/each}
	</datalist>

	<button class="btn" type="submit" disabled={!$form.profName}>Search</button>
</form>
<SuperDebug data={$form.profName} />

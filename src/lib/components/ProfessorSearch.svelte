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

	interface Props {
		professors: Professor[];
		profFormData: SuperValidated<Infer<ProfSearchSchema>>;
	}

	let { professors, profFormData }: Props = $props();

	const { form, enhance } = superForm(profFormData, {
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

	function selectProfessor(professor: Professor) {
		$form.profName = professor.name;
		suggestions = [];
	}

	function handleSubmit(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			const inputValue = $form.profName.trim();
			if (inputValue.length > 0) {
				const split = inputValue.replace(' ', '-');
				goto(`./professors/${split}`);
			}
		}
	}
</script>

<form method="POST" action="" class="flex items-center space-x-4" use:enhance>
	<input
		type="text"
		placeholder="Type here"
		class="input input-bordered w-full max-w-xs"
		bind:value={$form.profName}
		oninput={handleInput}
		onkeydown={handleSubmit}
	/>
	<div>
		{#if suggestions.length > 0}
			<ul>
				{#each suggestions.slice(0, 5) as suggestion}
					<li>
						<button type="button" onclick={() => selectProfessor(suggestion)}>
							{suggestion.name}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</form>

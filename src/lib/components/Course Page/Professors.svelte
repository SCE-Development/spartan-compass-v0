<script lang="ts">
	import ProfessorCard from './ProfessorCard.svelte';

	interface ExtendedProfessor {
		id: number;
		name: string;
		averageRating: number;
	}

	let { professors }: { professors: ExtendedProfessor[] } = $props();
</script>

<div class="3xl:grid-cols-4 grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
	{#each professors as professor}
		<ProfessorCard {professor} />
	{/each}
</div>
